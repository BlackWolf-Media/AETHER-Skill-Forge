export interface Skill {
  id: string;
  name: string;
  description: string;
  instructions: string;
  examples: Array<{ input: string; output: string }>;
  parameters: Record<string, any>;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Agent {
  id: string;
  name: string;
  role: string;
  skills: string[]; // IDs of skills
  modelIdentifier: string;
  ownerId: string;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  attachments?: string[];
}

export interface EvaluationRun {
  id: string;
  agentId: string;
  skillId: string;
  results: Array<{
    prompt: string;
    output: string;
    status: 'pass' | 'fail' | 'partial';
    score: number;
  }>;
  overallScore: number;
  timestamp: string;
}
