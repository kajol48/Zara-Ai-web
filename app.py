from flask import Flask, render_template, request, jsonify
from transformers import pipeline
import requests
import os

app = Flask(__name__)
generator = pipeline("text-generation", model="csebuetnlp/bangla-gpt2")

# Your Bhashini and Google Speech-to-Text API keys
BHASHINI_API = os.getenv("BHASHINI_API")
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/generate", methods=["POST"])
def generate():
    text = request.json.get("text")
    if not text:
        return jsonify({"error": "No input text"}), 400
    result = generator(text, max_length=100, do_sample=True)
    response = result[0]["generated_text"]
    return jsonify({"response": response})

@app.route("/tts", methods=["POST"])
def tts():
    text = request.json.get("text")
    headers = {
        "Content-Type": "application/json"
    }
    payload = {
        "input": text,
        "voice": "bn_female_1",
        "lang": "bn"
    }
    bhashini_url = "https://tts.bhashini.gov.in/api/tts"
    response = requests.post(bhashini_url, json=payload, headers=headers)
    if response.status_code == 200:
        return jsonify({"audio_url": response.json().get("audio_url")})
    return jsonify({"error": "TTS failed"}), 500

if __name__ == "__main__":
    app.run(debug=True)
