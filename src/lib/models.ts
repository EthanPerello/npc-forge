// Define available OpenAI models for character generation
import { OpenAIModel, ModelConfig } from './types';

// Model configurations
export const MODEL_CONFIGS: ModelConfig[] = [
  {
    id: 'gpt-4o-mini',
    label: 'Standard',
    description: 'Balanced option with good quality and speed',
    tier: 'cheap',
    emoji: '🟢',
    monthlyLimit: Infinity // Unlimited for cheapest tier
  },
  {
    id: 'gpt-4.1-mini',
    label: 'Enhanced',
    description: 'Higher quality with more nuanced characters',
    tier: 'mid',
    emoji: '🟡',
    monthlyLimit: 30
  },
  {
    id: 'gpt-4o',
    label: 'Premium',
    description: 'Highest quality for the most detailed characters',
    tier: 'premium',
    emoji: '🔴',
    monthlyLimit: 10
  }
];

// Default model to use if none is specified
export const DEFAULT_MODEL: OpenAIModel = 'gpt-4o-mini';

// Get config for a specific model
export function getModelConfig(model: OpenAIModel): ModelConfig {
  const config = MODEL_CONFIGS.find(c => c.id === model);
  if (!config) {
    // Fall back to default if model not found
    return MODEL_CONFIGS.find(c => c.id === DEFAULT_MODEL)!;
  }
  return config;
}

// Get model by tier
export function getModelByTier(tier: 'cheap' | 'mid' | 'premium'): ModelConfig {
  const config = MODEL_CONFIGS.find(c => c.tier === tier);
  if (!config) {
    return MODEL_CONFIGS.find(c => c.id === DEFAULT_MODEL)!;
  }
  return config;
}