'use client';

import { ReactNode } from 'react';
import { getAgentConfig } from '@/lib/ai/agents';
import { chatModels } from '@/lib/ai/models';

interface AgentChatWrapperProps {
  children: ReactNode;
  selectedModelId: string;
  className?: string;
}

export function AgentChatWrapper({ children, selectedModelId, className = '' }: AgentChatWrapperProps) {
  // Find the selected model to get agent info
  const selectedModel = chatModels.find(model => model.id === selectedModelId);
  const agentConfig = selectedModel?.agentId ? getAgentConfig(selectedModel.agentId) : null;

  if (!agentConfig) {
    // Default styling for non-agent models
    return <div className={className}>{children}</div>;
  }

  const agentStyles = {
    '--agent-primary': `var(--${agentConfig.ui.primaryColor.replace('text-', '').replace('-', '-')})`,
    '--agent-secondary': `var(--${agentConfig.ui.secondaryColor.replace('text-', '').replace('-', '-')})`,
    '--agent-accent': `var(--${agentConfig.ui.accentColor.replace('bg-', '').replace('-', '-')})`,
    '--agent-bg': `var(--${agentConfig.ui.backgroundColor.replace('bg-', '').replace('-', '-')})`,
    '--agent-border': `var(--${agentConfig.ui.borderColor.replace('border-', '').replace('-', '-')})`,
  } as React.CSSProperties;

  return (
    <div 
      className={`agent-chat-wrapper ${className}`}
      style={agentStyles}
      data-agent={agentConfig.id}
    >
      <div className={`min-h-screen transition-colors duration-300 ${agentConfig.ui.backgroundColor}`}>
        {children}
      </div>
    </div>
  );
}