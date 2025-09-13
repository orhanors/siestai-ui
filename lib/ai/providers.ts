import {
  customProvider,
  extractReasoningMiddleware,
  wrapLanguageModel,
} from 'ai';
import { gateway } from '@ai-sdk/gateway';
import { anthropic } from '@ai-sdk/anthropic';
import { isTestEnvironment } from '../constants';

export const myProvider = isTestEnvironment
  ? (() => {
      const {
        artifactModel,
        chatModel,
        reasoningModel,
        titleModel,
      } = require('./models.mock');
      return customProvider({
        languageModels: {
          'chat-model': chatModel,
          'chat-model-reasoning': reasoningModel,
          'title-model': titleModel,
          'artifact-model': artifactModel,
          'web-search-agent': chatModel,
          'coding-agent': chatModel,
          'claude-3-5-sonnet': chatModel,
        },
      });
    })()
  : customProvider({
      languageModels: {
        'chat-model': gateway.languageModel('xai/grok-2-vision-1212'),
        'chat-model-reasoning': wrapLanguageModel({
          model: gateway.languageModel('xai/grok-3-mini'),
          middleware: extractReasoningMiddleware({ tagName: 'think' }),
        }),
        'title-model': anthropic('claude-3-5-sonnet-20241022'),
        'artifact-model': anthropic('claude-3-5-sonnet-20241022'),
        // Agent models using Anthropic
        'web-search-agent': anthropic('claude-3-5-sonnet-20241022'),
        'coding-agent': anthropic('claude-3-5-sonnet-20241022'),
        'claude-3-5-sonnet': anthropic('claude-3-5-sonnet-20241022'),
      },
    });
