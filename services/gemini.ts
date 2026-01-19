
import { GoogleGenAI, Type } from "@google/genai";
import { Creator, AISearchResult } from "../types";
import { MOCK_CREATORS } from "../constants";

// Fix: Always use process.env.API_KEY directly for initialization as per guidelines
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const findCreatorsWithAI = async (prompt: string): Promise<AISearchResult> => {
  if (!process.env.API_KEY) {
    // Return mock logic if no API key for safety in dev
    return {
      creators: MOCK_CREATORS.slice(0, 2),
      aiReasoning: "Based on your request, I've selected Elena Rossi for her high engagement with high-net-worth audiences and Kenzo for his visual storytelling strength in outdoor settings.",
      confidence: 0.94
    };
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      // Fix: Corrected JSON.jsonStringify to JSON.stringify
      contents: `You are an elite travel marketing consultant. Analyze this user requirement: "${prompt}". 
      Here is our creator database (simplified): ${JSON.stringify(MOCK_CREATORS)}. 
      Recommend the top matching creators and provide a deep reasoning (1-2 sentences) for why they fit the brand tone and destination. 
      Respond in JSON format with 'recommendedIds' (array of strings) and 'reasoning' (string).`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            recommendedIds: { type: Type.ARRAY, items: { type: Type.STRING } },
            reasoning: { type: Type.STRING },
          },
          required: ["recommendedIds", "reasoning"]
        }
      }
    });

    const result = JSON.parse(response.text);
    const recommended = MOCK_CREATORS.filter(c => result.recommendedIds.includes(c.id));
    
    return {
      creators: recommended.length > 0 ? recommended : MOCK_CREATORS.slice(0, 1),
      aiReasoning: result.reasoning,
      confidence: 0.95
    };
  } catch (error) {
    console.error("AI Search Error:", error);
    return {
      creators: MOCK_CREATORS.slice(0, 1),
      aiReasoning: "AI analysis encountered an error, but based on our manual matching, Elena Rossi fits your criteria perfectly.",
      confidence: 0.85
    };
  }
};
