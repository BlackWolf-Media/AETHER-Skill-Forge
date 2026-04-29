import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.GEMINI_API_KEY || "";

const ai = new GoogleGenAI({ apiKey: API_KEY });

export async function chatWithAgent(
  model: string,
  systemInstruction: string,
  history: any[],
  message: string
) {
  if (!API_KEY) {
    throw new Error("GEMINI_API_KEY is not configured. Please add it via the Secrets panel.");
  }

  const response = await ai.models.generateContent({
    model: model || "gemini-3-flash-preview",
    contents: [
      ...history.map(h => ({
        role: h.role === 'assistant' ? 'model' : h.role,
        parts: [{ text: h.content }],
      })),
      { role: 'user', parts: [{ text: message }] }
    ],
    config: {
      systemInstruction,
    }
  });

  return response.text || "";
}

export async function generateSkillInstructions(
    name: string, 
    description: string, 
    files?: { data: string; mimeType: string }[]
) {
  const parts: any[] = [
    { text: `Generate a comprehensive, expert-level AI Skill instructions for an agent based on the following:
      Name: ${name}
      Purpose: ${description}
      
      The output should be structured in Markdown and include:
      1. Trigger conditions (When to use this skill)
      2. Step-by-step logic
      3. Strict constraints
      4. Specific output format requirements
      
      Return only the markdown instructions.` 
    }
  ];

  if (files && files.length > 0) {
    const fileParts = files.map(f => ({
      inlineData: {
        data: f.data,
        mimeType: f.mimeType
      }
    }));
    parts.push(...fileParts);
  }

  const response = await ai.models.generateContent({ 
    model: "gemini-3.1-pro-preview",
    contents: [{ role: 'user', parts }]
  });

  return response.text || "";
}
