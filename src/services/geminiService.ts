import { GoogleGenAI } from "@google/genai";
import { AppError, ErrorCodes } from '../errors/AppError';
import { config } from '../config';

const API_KEY = config.api.gemini.apiKey;

if (!API_KEY) {
  console.warn('GEMINI_API_KEY is not configured');
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface FileAttachment {
  data: string;
  mimeType: string;
}

/**
 * Chat with an AI agent using Gemini
 */
export async function chatWithAgent(
  model: string,
  systemInstruction: string,
  history: ChatMessage[],
  message: string
): Promise<string> {
  if (!API_KEY) {
    throw new AppError(
      'GEMINI_API_KEY is not configured. Please add it via the Secrets panel.',
      ErrorCodes.MISSING_API_KEY,
      500
    );
  }

  try {
    const response = await ai.models.generateContent({
      model: model || config.api.gemini.defaultModel,
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

    return response.text || '';
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError(
      'Failed to generate chat response',
      ErrorCodes.EXTERNAL_SERVICE_ERROR,
      503
    );
  }
}

/**
 * Generate skill instructions using AI
 */
export async function generateSkillInstructions(
  name: string, 
  description: string, 
  files?: FileAttachment[]
): Promise<string> {
  if (!API_KEY) {
    throw new AppError(
      'GEMINI_API_KEY is not configured',
      ErrorCodes.MISSING_API_KEY,
      500
    );
  }

  const parts: any[] = [
    { 
      text: `Generate a comprehensive, expert-level AI Skill instructions for an agent based on the following:
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

  try {
    const response = await ai.models.generateContent({ 
      model: config.api.gemini.advancedModel,
      contents: [{ role: 'user', parts }]
    });

    return response.text || '';
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError(
      'Failed to generate skill instructions',
      ErrorCodes.EXTERNAL_SERVICE_ERROR,
      503
    );
  }
}
