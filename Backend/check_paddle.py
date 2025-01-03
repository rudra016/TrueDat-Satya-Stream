from paddleocr import PaddleOCR

ocr = PaddleOCR(use_angle_cls=True)  # Initialize the model
results = ocr.ocr('testing2.jpeg', cls=True)

for line in results[0]:
    print(f"Detected text: {line[1][0]}, Confidence: {line[1][1]}")
