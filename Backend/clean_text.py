import re
from nltk.corpus import stopwords
import nltk
nltk.download('stopwords')

def clean_text(text: str) -> str:
    
    # Convert to lowercase
    text = text.lower()
    
    # Remove special characters and numbers
    text = re.sub(r"[^a-z\s]", "", text)
    
    # Remove extra spaces
    text = re.sub(r"\s+", " ", text).strip()
    
    # Optional: Remove stopwords
    #stop_words = set(stopwords.words("english"))
    #text = " ".join([word for word in text.split() if word not in stop_words])  Let's try doing it later
    
    return text
