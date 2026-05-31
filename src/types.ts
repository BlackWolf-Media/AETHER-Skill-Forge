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
  category?: string;
  customCode?: string;
}

export interface Agent {
  id: string;
  name: string;
  role: string;
  skills: string[]; // IDs of skills
  modelIdentifier: string;
  ownerId: string;
  status?: 'active' | 'inactive' | 'training';
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

export interface MCPConfig {
  id: string;
  name: string;
  url: string;
  type: string;
  category: string;
}
