import pytesseract
from PIL import Image
value=Image.open('testing.jpeg')
pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"
text=pytesseract.image_to_string(value)

print("Extracted Data is: \n", text) 