export interface AgentUIConfig {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  borderColor: string;
  iconColor: string;
  gradient: string;
}

export interface AgentConfig {
  id: string;
  name: string;
  description: string;
  modelId: string;
  systemPrompt: string;
  ui: AgentUIConfig;
  tools: string[];
  icon: string;
}

export const agentConfigs: Record<string, AgentConfig> = {
  'web-search-agent': {
    id: 'web-search-agent',
    name: 'Web Search Agent',
    description: 'Search the web and find information from various sources',
    modelId: 'claude-3-5-sonnet',
    systemPrompt: `You are a web search specialist agent. Your primary function is to help users find information from the web.
    
When users ask questions:
1. Use web search to find relevant, current information
2. Synthesize information from multiple sources
3. Provide clear, well-sourced answers
4. Always cite your sources with links
5. Focus on factual, up-to-date information

Be concise but comprehensive in your responses.`,
    ui: {
      primaryColor: 'text-blue-600',
      secondaryColor: 'text-blue-500',
      accentColor: 'bg-blue-100',
      backgroundColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      iconColor: 'text-blue-600',
      gradient: 'from-blue-500 to-blue-600',
    },
    tools: ['webSearch', 'getWebpageContent'],
    icon: '🔍',
  },
  'coding-agent': {
    id: 'coding-agent',
    name: 'Coding Agent',
    description: 'Write, debug, and explain code across multiple programming languages',
    modelId: 'claude-3-5-sonnet',
    systemPrompt: `You are a specialized coding assistant. Your expertise includes:

1. Writing clean, efficient, and well-documented code
2. Debugging and troubleshooting code issues
3. Code reviews and optimization suggestions
4. Explaining complex programming concepts
5. Providing best practices and architectural guidance

Always:
- Write production-ready code with proper error handling
- Include relevant comments and documentation
- Follow language-specific best practices
- Provide multiple solutions when applicable
- Explain your reasoning for technical decisions`,
    ui: {
      primaryColor: 'text-green-600',
      secondaryColor: 'text-green-500',
      accentColor: 'bg-green-100',
      backgroundColor: 'bg-green-50',
      borderColor: 'border-green-200',
      iconColor: 'text-green-600',
      gradient: 'from-green-500 to-green-600',
    },
    tools: ['executeCode', 'createFile', 'analyzeCode'],
    icon: '💻',
  },
};

export const DEFAULT_AGENT = 'web-search-agent';

export function getAgentConfig(agentId: string): AgentConfig {
  return agentConfigs[agentId] || agentConfigs[DEFAULT_AGENT];
}

export function getAllAgents(): AgentConfig[] {
  return Object.values(agentConfigs);
}