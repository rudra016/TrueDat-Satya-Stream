import assemblyai as aai

aai.settings.api_key = "ADD KEY HERE"
transcriber = aai.Transcriber()

transcript = transcriber.transcribe("output.mp4")
# transcript = transcriber.transcribe("./my-local-audio-file.wav")

print(transcript.text)