import whisper

def transcribe_audio_with_whisper(audio_file):
    # Load the Whisper model (e.g., "base", "small", "medium", or "large")
    model = whisper.load_model("base")
    result = model.transcribe(audio_file)
    return result["text"]

audio_file = "extracted_audio.mp3"  # Replace with the path to your audio file
transcription = transcribe_audio_with_whisper(audio_file)
print("Transcription:")
print(transcription)

