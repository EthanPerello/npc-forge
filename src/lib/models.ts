// Define available OpenAI models
import { OpenAIModel, ModelConfig } from './types';

// Model configurations with updated limits
export const MODEL_CONFIGS: ModelConfig[] = [
  {
    id: 'gpt-4o-mini',
    label: 'Standard',
    description: 'Balanced mix of speed and quality',
    tier: 'cheap',
    emoji: '🟢',
    monthlyLimit: 50 // Updated to 50 (was 30)
  },
  {
    id: 'gpt-4.1-mini',
    label: 'Enhanced',
    description: 'Better quality with more detail',
    tier: 'mid',
    emoji: '🟡',
    monthlyLimit: 30 // Kept at 30
  },
  {
    id: 'gpt-4o',
    label: 'Premium',
    description: 'Highest quality with maximum detail',
    tier: 'premium',
    emoji: '🔴',
    monthlyLimit: 10 // Updated to 10 (was 5)
  }
];

// Default model
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