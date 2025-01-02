import os
from dotenv import load_dotenv
from langchain_community.utilities import GoogleSerperAPIWrapper
import requests
load_dotenv()

os.environ["SERPER_API_KEY"] = os.getenv("SERPER_API_KEY")

def serper_check(text : str):
    search = GoogleSerperAPIWrapper(type="news")
    return search.results(text)

print(serper_check("Nicki Minaj Married to PM Modi?"))