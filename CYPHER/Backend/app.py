from flask import Flask, request, jsonify
from flask_cors import CORS  # ← import this
import re
import joblib
import requests

app = Flask(__name__)
CORS(app) 

# To load ML model (if using ML in future)
try:
    model = joblib.load("phishing_model.pkl")
except:
    model = None

# External API (Google Safe Browsing - Example)
SAFE_BROWSING_API_KEY = "AIzaSyB5qR3MlifuKxM0JuKZrH1wGYHiu0sqi8Y"
SAFE_BROWSING_URL = "https://safebrowsing.googleapis.com/v4/threatMatches:find"

def check_safe_browsing(url):
    payload = {
        "client": {"clientId": "your-client-id", "clientVersion": "1.0"},
        "threatInfo": {
            "threatTypes": ["MALWARE", "SOCIAL_ENGINEERING"],
            "platformTypes": ["ANY_PLATFORM"],
            "threatEntryTypes": ["URL"],
            "threatEntries": [{"url": url}]
        }
    }
    response = requests.post(f"{SAFE_BROWSING_URL}?key={SAFE_BROWSING_API_KEY}", json=payload)
    return response.json().get("matches") is not None

def analyze_url(url):
    suspicious_patterns = [
        "free", "login", "secure", "verify", "update", "banking",
        "account", "password", "confirm", "-secure", "pay", ".top"
    ]
    if any(term in url.lower() for term in suspicious_patterns):
        return True
    return False

@app.route("/check-url", methods=["POST"])
def check_url():
    data = request.json
    url = data.get("url")

    if not url:
        return jsonify({"error": "No URL provided"}), 400

    is_malicious = check_safe_browsing(url)
    is_suspicious = analyze_url(url)
    ml_prediction = model.predict([url]) if model else [0]

    if is_malicious or is_suspicious or ml_prediction[0] == 1:
        return jsonify({"url": url, "status": "Unsafe"})
    else:
        return jsonify({"url": url, "status": "Safe"})

if __name__ == "__main__":
    app.run(debug=True)
