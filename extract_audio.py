import moviepy.editor as mp

# Replace the parameter with the location of the video
video = mp.VideoFileClip("output.mp4")

audio = video.audio

# Replace the parameter with the location along with filename
audio.write_audiofile("extracted_audio.mp3")
