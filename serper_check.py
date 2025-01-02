import os
from dotenv import load_dotenv
from langchain_community.utilities import GoogleSerperAPIWrapper
import requests
load_dotenv()

os.environ["SERPER_API_KEY"] = os.getenv("SERPER_API_KEY")

def serper_check(text : str):
    search = GoogleSerperAPIWrapper()
    response = requests.get(f"https://api.serper.dev/search?q={text}")
    return response.json()
