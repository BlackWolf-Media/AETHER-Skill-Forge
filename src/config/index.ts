/**
 * Application configuration
 */

export const config = {
  // API Configuration
  api: {
    gemini: {
      apiKey: process.env.GEMINI_API_KEY || '',
      defaultModel: 'gemini-3-flash-preview',
      advancedModel: 'gemini-3.1-pro-preview',
    },
  },

  // Application Settings
  app: {
    name: 'AETHER',
    version: '1.0.0',
    ownerId: 'BW-MEDIA-AI-PROD-001',
  },

  // Limits
  limits: {
    maxSkills: 2,
    maxMcpServers: 4,
    maxFileSize: 10 * 1024 * 1024, // 10MB
    allowedFileTypes: ['image/png', 'image/jpeg', 'image/gif', 'application/pdf', 'text/plain'] as string[],
  },

  // Feature Flags
  features: {
    enableFileUploads: true,
    enableMcpServers: true,
    enableTemplates: true,
  },
} as const;

export type Config = typeof config;
