import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getPlanetDetails = async (planetName: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Tell me an interesting, scientific, yet concise fact about the planet ${planetName}. Keep it under 60 words.`,
    });

    return response.text || "Could not retrieve planet data at this time.";
  } catch (error) {
    console.error("Error fetching from Gemini:", error);
    return `Detailed information about ${planetName} is currently unavailable. Please check your API key configuration.`;
  }
};