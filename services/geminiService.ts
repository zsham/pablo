
import { GoogleGenAI, Type } from "@google/genai";
import type { GroupedKeywords } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    informational: {
      type: Type.ARRAY,
      description: "Keywords where the user is looking for information, tutorials, or answers. (e.g., 'how to', 'what is', 'best ways to').",
      items: { type: Type.STRING }
    },
    navigational: {
      type: Type.ARRAY,
      description: "Keywords where the user is trying to find a specific website, brand, or page. (e.g., 'React docs', 'Tailwind CSS login').",
      items: { type: Type.STRING }
    },
    commercial: {
      type: Type.ARRAY,
      description: "Keywords where the user is comparing products, services, or alternatives before a purchase. (e.g., 'React vs Vue', 'best React UI libraries').",
      items: { type: Type.STRING }
    },
    transactional: {
      type: Type.ARRAY,
      description: "Keywords where the user is ready to take a specific action like buying, signing up, or downloading. (e.g., 'hire React developer', 'React course discount').",
      items: { type: Type.STRING }
    }
  },
  required: ['informational', 'navigational', 'commercial', 'transactional']
};

export const generateAndGroupKeywords = async (headKeyword: string): Promise<GroupedKeywords> => {
  const prompt = `
    You are an expert SEO strategist specializing in keyword research.
    Your task is to analyze the head keyword: "${headKeyword}"

    Follow these steps:
    1. Generate a comprehensive list of at least 25 related long-tail keywords. A long-tail keyword must contain three or more words.
    2. Analyze each generated keyword and categorize it based on the user's search intent.
    3. Group these keywords into the four primary intent categories: Informational, Navigational, Commercial, and Transactional.
    4. Ensure each category has at least a few relevant keywords, even if you have to generate more to fit. Do not leave any category empty.
    5. Return the result as a valid JSON object that adheres to the provided schema.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-pro",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.7,
      },
    });

    const jsonText = response.text.trim();
    const parsedJson = JSON.parse(jsonText);
    
    // Validate the structure
    if (
      !parsedJson ||
      typeof parsedJson.informational === 'undefined' ||
      typeof parsedJson.navigational === 'undefined' ||
      typeof parsedJson.commercial === 'undefined' ||
      typeof parsedJson.transactional === 'undefined'
    ) {
        throw new Error("Invalid JSON structure received from API.");
    }

    return parsedJson as GroupedKeywords;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Could not fetch and process keywords from the Gemini API.");
  }
};
