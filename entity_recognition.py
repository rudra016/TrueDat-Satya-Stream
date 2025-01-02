import spacy

# Load the small model
def find_entity(text):
    nlp = spacy.load("en_core_web_sm")
    doc = nlp(text)
    entities=""
    for ent in doc.ents:
        entities+=ent.text+" "
    return entities

