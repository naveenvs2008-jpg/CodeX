
import { GoogleGenAI } from "@google/genai";

// Initialize the Google GenAI client using only the environment variable.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getAIFeedback = async (question: string, answer: string) => {
  try {
    // @google/genai: Use gemini-3-pro-preview for complex reasoning and coding feedback tasks.
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `You are a coding mentor. Review this student's pseudocode or logic for the following coding question:
      
      Question: ${question}
      Student Answer: ${answer}
      
      Provide a 2-sentence constructive feedback. Keep it encouraging and point out any major logic flaws if they exist.`,
      config: {
        temperature: 0.7
      }
    });
    
    // Extract generated text directly from the response object property.
    return response.text || "Good effort! Keep practicing.";
  } catch (error) {
    console.error("AI Feedback error:", error);
    return "Awesome job submitting today's logic!";
  }
};
