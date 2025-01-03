import yt_dlp
import subprocess

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

def record_live_stream(stream_url, duration=30, output_file="output.mp4"):
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

youtube_url = "https://www.youtube.com/watch?v=gadjsB5BkK4"
try:
    stream_url = get_live_stream_url(youtube_url)
    print(f"Live Stream URL: {stream_url}")
    record_live_stream(stream_url, duration=30, output_file="output.mp4")
except Exception as e:
    print(f"Error: {e}")
