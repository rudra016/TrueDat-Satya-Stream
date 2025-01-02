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
from serper_check import serper_check

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
        "quiet": True,  # Suppress output
        "format": "best",  # Get the best quality
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
    

def audio_to_text():
    aai.settings.api_key = os.getenv("AUDIO_TO_TEXT_ASSEMBLYAI")
    transcriber = aai.Transcriber()

    transcript = transcriber.transcribe("output.mp4")
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
        message=audio_to_text()
        result = await fast_check(TextData(text=message))
        return result

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    

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

        return JSONResponse(content={"success": True, "extracted_text": text})
    except Exception as e:
        return JSONResponse(content={"success": False, "error": str(e)})
    
# @app.get("/image_check")
# def image_check():
#     # handling logic of file uploading
#     return image_to_text()
    
@app.get("/text_check")
def text_check():
    #handling logic of writing a text
    return {"message": "Text is written"}


@app.get("/fast_check")
async def fast_check(data: TextData):
    text=data.text
    cleaned_text = clean_text(text)
    entities = find_entity("Is this true?"+" "+cleaned_text)
    return serper_check(cleaned_text)
    
    