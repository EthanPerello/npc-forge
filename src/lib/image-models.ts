// Define available OpenAI models for image generation
import { ImageModel, ImageModelConfig } from './types';

// Model configurations with updated limits
export const IMAGE_MODEL_CONFIGS: ImageModelConfig[] = [
  {
    id: 'dall-e-2',
    label: 'Standard',
    description: 'Faster generation with good quality',
    tier: 'cheap',
    emoji: '🟢',
    monthlyLimit: 10 // Updated to 10
  },
  {
    id: 'dall-e-3',
    label: 'Enhanced',
    description: 'Higher quality with more detailed imagery',
    tier: 'mid',
    emoji: '🟡',
    monthlyLimit: 5 // Updated to 5
  },
  {
    id: 'gpt-image-1',
    label: 'Premium',
    description: 'Highest quality with photorealistic results',
    tier: 'premium',
    emoji: '🔴',
    monthlyLimit: 3 // Kept at 3
  }
];

// Default model
export const DEFAULT_IMAGE_MODEL: ImageModel = 'dall-e-2';

// Get config for a specific model
export function getImageModelConfig(model: ImageModel): ImageModelConfig {
  const config = IMAGE_MODEL_CONFIGS.find(c => c.id === model);
  if (!config) {
    // Fall back to default if model not found
    return IMAGE_MODEL_CONFIGS.find(c => c.id === DEFAULT_IMAGE_MODEL)!;
  }
  return config;
}

// Get model by tier
export function getImageModelByTier(tier: 'cheap' | 'mid' | 'premium'): ImageModelConfig {
  const config = IMAGE_MODEL_CONFIGS.find(c => c.tier === tier);
  if (!config) {
    return IMAGE_MODEL_CONFIGS.find(c => c.id === DEFAULT_IMAGE_MODEL)!;
  }
  return config;
}