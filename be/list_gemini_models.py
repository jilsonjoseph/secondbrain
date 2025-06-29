import os
import google.generativeai
from dotenv import load_dotenv

load_dotenv()

google.generativeai.configure(api_key=os.getenv("GEMINI_API_KEY"))

def list_gemini_models():
    try:
        print("Fetching available Gemini models...")
        models = google.generativeai.list_models()
        
        print("Models supporting 'generateContent':")
        found_models = False
        for m in models:
            if "generateContent" in m.supported_generation_methods:
                print(f"  - Name: {m.name}, Supported Methods: {m.supported_generation_methods}")
                found_models = True
        
        if not found_models:
            print("  No models found supporting 'generateContent'.")

    except Exception as e:
        print(f"Error listing models: {e}")

if __name__ == "__main__":
    list_gemini_models()