from fastapi import FastAPI, File, HTTPException, UploadFile
import yt_dlp
import subprocess
import moviepy.editor as mp
import assemblyai as aai
import pytesseract
from PIL import Image
from dotenv import load_dotenv
from clean_text import clean_text
from entity_recognition import find_entity
from pydantic import BaseModel
import os
import io
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from serper_check import serper_check_news, serper_check_search
from initial_screen import predict
import tempfile
from moviepy.editor import VideoFileClip
load_dotenv()


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Replace with your React app's URL
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

class TextData(BaseModel):
    text: str

def get_live_stream_url(youtube_url):
    ydl_opts = {
        "quiet": True,  
        "format": "best",  
        "cookies": "./youtube_cookies.txt",  
    }

    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        info_dict = ydl.extract_info(youtube_url, download=False)
        if "is_live" in info_dict and info_dict["is_live"]:
            live_stream_url = info_dict["url"]  # Extract the live stream URL
            return live_stream_url
        else:
            raise ValueError("The provided YouTube URL is not a live stream.")

def record_live_stream(stream_url, duration=60, output_file="output.mp4"):
    command = [
        "ffmpeg",
        "-i", stream_url,
        "-c", "copy",
        "-t", str(duration),
        output_file,
    ]
    try:
        print("Running FFmpeg command...")
        subprocess.run(command, check=True)
        print(f"Live stream recorded successfully: {output_file}")
    except subprocess.CalledProcessError as e:
        print(f"Error recording live stream: {e}")
        
def video_to_audio():
    video = mp.VideoFileClip("output.mp4")

    audio = video.audio
    audio.write_audiofile("extracted_audio.mp3")       
        
def fix_and_process_video(video_file):
    temp_fd, temp_path = tempfile.mkstemp(suffix=".mp4")
    fixed_fd, fixed_path = tempfile.mkstemp(suffix=".mp4")
    try:
        with os.fdopen(temp_fd, 'wb') as temp_video:
            temp_video.write(video_file.read())

        # Fix video format using FFmpeg
        subprocess.run(
            ["ffmpeg", "-i", temp_path, "-c:v", "libx264", "-preset", "fast", fixed_path],
            check=True
        )

        # Process the fixed video
        video = VideoFileClip(fixed_path)
        audio = video.audio
        audio.write_audiofile("extracted_audio.mp3")
    finally:
        if os.path.exists(temp_path):
            os.remove(temp_path)
        if os.path.exists(fixed_path):
            os.remove(fixed_path)
    

def audio_to_text():
    aai.settings.api_key = os.getenv("AUDIO_TO_TEXT_ASSEMBLYAI")
    transcriber = aai.Transcriber()

    # Transcribe the provided file
    transcript = transcriber.transcribe("extracted_audio.mp3")
    return transcript.text  

def image_to_text():
 value=Image.open('testing.jpeg')
 pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"
 text=pytesseract.image_to_string(value)

 return text


# Root endpoint to provide a welcome message
@app.get("/")
def root():
    return {"message": "Welcome to the live stream recorder!"}


# Video check endpoint that processes the YouTube URL

@app.get("/video_check")
async def video_check(youtube_url: str):
    try:
        # Get live stream URL
        stream_url = get_live_stream_url(youtube_url)
        # Record the live stream for 30 seconds
        record_live_stream(stream_url, duration=30, output_file="output.mp4")
        video_to_audio()
        message = audio_to_text()

        # Initial check (First model prediction)
        result1 = await initial_check(TextData(text=message))
        
        # Fast check (Second source verification)
        result2 = await fast_check_news(TextData(text=message))
        
        # Merge the results into a single response
        combined_result = {
            "initial_check": result1,
            "fast_check": result2
        }
        
        return combined_result

    except Exception as e:
        return {"error": str(e)}
    
@app.post("/video_upload")
async def video_upload(file: UploadFile = File(...)):
     try:
        video_data = await file.read()
        video_file = io.BytesIO(await file.read())
       
        fix_and_process_video(video_file)  
        
        # Convert audio to text
        message = audio_to_text()
        result1 = await initial_check(TextData(text=message))
        result2 = await fast_check_news(TextData(text=message))
    
        combined_result = {
            "initial_check": result1,
            "fast_check": result2
        }
        
        return combined_result
     except Exception as e:
        return {"error": str(e)}

@app.post("/image_check")
async def image_check(file: UploadFile = File(...)):
    try:
        # Read the uploaded file
        content = await file.read()
        image = Image.open(io.BytesIO(content))

        # Tesseract OCR setup
        pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"

        # Extract text from the image
        text = pytesseract.image_to_string(image)
        result1= await initial_check(TextData(text=text))
        result2=await fast_check_search(TextData(text=text))
        
        combined_result={
            "initial_check": result1,
            "fast_check": result2
        }
        return combined_result
    
    except Exception as e:
        return JSONResponse(content={"success": False, "error": str(e)})
    

    

@app.post("/text_check")
async def text_check(text_data: TextData):
    # Handling logic for text
    cleaned_text = clean_text(text_data.text)
    combined_result = {
        "initial_check": await initial_check(TextData(text=cleaned_text)),
        "fast_check": await fast_check_news(TextData(text=cleaned_text))
    }
    return {"result": combined_result}


@app.post("/audio_check")
async def audio_check(file: UploadFile = File(...)):
    try:
        # Read the uploaded audio file
        audio_bytes = await file.read()

        # Convert audio to text (implement the function)
        transcription = audio_to_text(audio_bytes)

        # Perform checks on the transcribed text
        result1 = await initial_check(TextData(text=transcription))
        result2 = await fast_check_news(TextData(text=transcription))

        # Combine the results
        combined_result = {
            "initial_check": result1,
            "fast_check": result2
        }

        return {"result": combined_result}

    except Exception as e:
        return {"error": str(e)}
    
@app.get("/initial_check")   #The initial check is done here
async def initial_check(data: TextData):
   result= predict(data.text)    
   return {"result": result}


@app.get("/fast_check_news")
async def fast_check_news(data: TextData):
    text=data.text
    cleaned_text = clean_text(text)
    return serper_check_news(cleaned_text)


@app.get("/fast_check_search")
async def fast_check_search(data: TextData):
    text=data.text
    cleaned_text = clean_text(text)
    return serper_check_search(cleaned_text)