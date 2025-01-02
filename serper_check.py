import os
from dotenv import load_dotenv
from langchain_community.utilities import GoogleSerperAPIWrapper
import requests
load_dotenv()

os.environ["SERPER_API_KEY"] = os.getenv("SERPER_API_KEY")

def serper_check_news(text : str):
    search = GoogleSerperAPIWrapper(type="news")
    return search.results(text)

def serper_check_search(text : str):
    search = GoogleSerperAPIWrapper(type="search")
    return search.results(text)

