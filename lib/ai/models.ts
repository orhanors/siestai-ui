import { DEFAULT_AGENT } from './agents';

export const DEFAULT_CHAT_MODEL: string = DEFAULT_AGENT;

export interface ChatModel {
  id: string;
  name: string;
  description: string;
  agentId?: string;
  icon?: string;
}

export const chatModels: Array<ChatModel> = [
  {
    id: 'web-search-agent',
    name: 'Web Search Agent',
    description: 'Search the web and find information from various sources',
    agentId: 'web-search-agent',
    icon: '🔍',
  },
  {
    id: 'coding-agent',
    name: 'Coding Agent',
    description: 'Write, debug, and explain code across multiple programming languages',
    agentId: 'coding-agent',
    icon: '💻',
  },
  // Keep existing models for backward compatibility
  {
    id: 'chat-model',
    name: 'Grok Vision',
    description: 'Advanced multimodal model with vision and text capabilities',
  },
  {
    id: 'chat-model-reasoning',
    name: 'Grok Reasoning',
    description:
      'Uses advanced chain-of-thought reasoning for complex problems',
  },
];
