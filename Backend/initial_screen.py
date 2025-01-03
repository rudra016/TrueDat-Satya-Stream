import pickle

def load_model_and_vectorizer():
    # Load the Naive Bayes model
    with open('model.pkl', 'rb') as model_file:
        model = pickle.load(model_file)
    
    # Load the TF-IDF vectorizer
    with open('tfidf_vectorizer.pkl', 'rb') as vectorizer_file:
        tfidf = pickle.load(vectorizer_file)
    
    return model, tfidf

def predict(text):
    if isinstance(text, str):
        text = [text]
    model, tfidf = load_model_and_vectorizer()

    X = tfidf.transform(text)
    prediction = model.predict(X)
    return {"prediction": prediction.tolist()}

    
