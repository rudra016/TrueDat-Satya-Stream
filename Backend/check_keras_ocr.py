import keras_ocr
import pandas as pd
pipeline=keras_ocr.pipeline.Pipeline()
results=pipeline.recognize(['testing2.jpeg'])
df=pd.DataFrame(results[0], columns=['text', 'bbox'])

print(df.head())