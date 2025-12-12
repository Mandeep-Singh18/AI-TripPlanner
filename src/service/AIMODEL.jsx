
import { initializeApp } from "firebase/app";
import { getAI, getGenerativeModel, GoogleAIBackend } from "firebase/ai";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  temperature: 1,
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseModel: "gemini-2.5-flash",
  responseMimeType: "application/json"
};



// Initialize FirebaseApp
const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);

// Initialize the Gemini Developer API backend service
const ai = getAI(firebaseApp, { backend: new GoogleAIBackend() });

// Create a `GenerativeModel` instance with a model that supports your use case
const model = getGenerativeModel(ai, { model: "gemini-2.5-flash" });

// Wrap in an async function so you can use await
export async function generateTravelPlan(prompt) {
  try {
    const structuredPrompt = `${prompt}
         Please provide the response in the following JSON format:
        {
          "hotels": [
            {
              "HotelName": "string",
              "HotelAddress": "string",
              "Price": "string",
              "descriptions": "string",
              "rating": number,
              "hotel_image_url": "string",
              "geo_coordinates": {
                "latitude": number,
                "longitude": number
              }
            }
          ],
          "itinerary": [
            {
              "day": number,
              "activities": [
                {
                  "time": "string",
                  "activity": "string",
                  "description": "string",
                  "location": "string"
                }
              ]
            }
          ]
        }`;
    const result = await model.generateContent({
      // The contents must be an array of content objects
      contents: [{
        role: "user",
        parts: [{ text: structuredPrompt }]
      }],
      generationConfig: {
        temperature: 0.9,
        topK: 64,
        topP: 0.95,
        maxOutputTokens: 8192
      }
    });
    return result;
  } catch (error) {
    console.error("Error generating travel plan:", error);
    throw error;
  }
}

