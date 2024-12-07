from django.shortcuts import render
from django.http import JsonResponse
import nltk
from nltk.stem import WordNetLemmatizer
import pickle
import numpy as np
from tensorflow.keras.models import load_model
import json
import random

# Load your chatbot model and other necessary data
model = load_model('models/chatbot_model_dnn.h5')  # Replace with the path to your RNN model
diseases_data = json.loads(open('datasets/health.json').read())
words = pickle.load(open('models/words_dnn.pkl', 'rb'))
classes = pickle.load(open('models/classes_dnn.pkl', 'rb'))
lemmatizer = WordNetLemmatizer()

def clean_up_sentence(sentence):
    sentence_words = nltk.word_tokenize(sentence)
    sentence_words = [lemmatizer.lemmatize(word.lower()) for word in sentence_words]
    return sentence_words

def bow(sentence, words, show_details=True):
    sentence_words = clean_up_sentence(sentence)
    bag = [0] * len(words)
    for s in sentence_words:
        for i, w in enumerate(words):
            if w == s:
                bag[i] = 1
                if show_details:
                    print("found in bag: %s" % w)
    return np.array(bag)


def predict_disease(sentence, model, diseases):
    p = bow(sentence, words, show_details=False)
    res = model.predict(np.array([p]))[0]
    predicted_class_index = np.argmax(res)

    disease_name = classes[predicted_class_index]
    disease_info = next(item for item in diseases['diseases'] if item["name"] == disease_name)

    return disease_name, disease_info["description"], disease_info["treatments"]


def get_chatbot_response(user_input):
    cleaned_input = clean_up_sentence(user_input)

    # Predict disease based on user input
    predicted_disease, description, treatments = predict_disease(user_input, model, diseases_data)

    response = f"Predicted Disease: {predicted_disease}\nDescription: {description}\nTreatments: {', '.join(treatments)}"

    return response


def chatbot(request):
    if request.method == 'POST':
        user_input = request.POST.get('user_input', '')
        response = get_chatbot_response(user_input)
        print(response)
        return JsonResponse({'response': response})
    else:
        return JsonResponse({'error': 'Invalid request method'})


def index(request):
    # Render the index.html file
    return render(request, 'index.html')
