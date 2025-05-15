'use client';

import { useCharacter } from '@/contexts/character-context';
import Select from '@/components/ui/select';
import ImageModelSelector from '@/components/image-model-selector';
import { DEFAULT_IMAGE_MODEL } from '@/lib/image-models';
import { ImageModel } from '@/lib/types';

// Options for portrait customization with "Not specified" as first option
const artStyleOptions = [
  { value: '', label: 'Not specified' },
  { value: 'realistic', label: 'Realistic' },
  { value: 'fantasy', label: 'Fantasy Art' },
  { value: 'anime', label: 'Anime/Manga' },
  { value: 'comic', label: 'Comic Book' },
  { value: 'pixel', label: 'Pixel Art' },
  { value: 'oil-painting', label: 'Oil Painting' },
  { value: 'watercolor', label: 'Watercolor' },
  { value: '3d-render', label: '3D Render' },
];

const moodOptions = [
  { value: '', label: 'Not specified' },
  { value: 'neutral', label: 'Neutral' },
  { value: 'happy', label: 'Happy/Smiling' },
  { value: 'serious', label: 'Serious' },
  { value: 'angry', label: 'Angry' },
  { value: 'sad', label: 'Sad' },
  { value: 'determined', label: 'Determined' },
  { value: 'mysterious', label: 'Mysterious' },
  { value: 'heroic', label: 'Heroic' },
];

const framingOptions = [
  { value: '', label: 'Not specified' },
  { value: 'portrait', label: 'Portrait (Head/Shoulders)' },
  { value: 'bust', label: 'Bust (Upper Body)' },
  { value: 'full-body', label: 'Full Body' },
  { value: 'action', label: 'Action Pose' },
];

const backgroundOptions = [
  { value: '', label: 'Not specified' },
  { value: 'plain', label: 'Plain/Solid Color' },
  { value: 'gradient', label: 'Gradient' },
  { value: 'themed', label: 'Themed (Based on Character)' },
  { value: 'environment', label: 'Environmental' },
  { value: 'abstract', label: 'Abstract' },
];

export default function PortraitOptions() {
  const { formData, updateFormData } = useCharacter();
  
  // Initialize portrait options if they don't exist
  if (!formData.portrait_options) {
    updateFormData({
      portrait_options: {
        art_style: '',
        mood: '',
        framing: '',
        background: ''
      }
    });
  }
  
  // Handle image model change
  const handleImageModelChange = (model: ImageModel) => {
    updateFormData({ 
      portrait_options: { 
        ...(formData.portrait_options || {}),
        art_style: formData.portrait_options?.art_style || '',
        mood: formData.portrait_options?.mood || '',
        framing: formData.portrait_options?.framing || '',
        background: formData.portrait_options?.background || '',
        image_model: model
      } 
    });
  };
  
  // Handle option changes
  const handleArtStyleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    updateFormData({ 
      portrait_options: { 
        ...(formData.portrait_options || {}),
        art_style: value
      } 
    });
  };
  
  const handleMoodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    updateFormData({ 
      portrait_options: { 
        ...(formData.portrait_options || {}),
        mood: value
      } 
    });
  };
  
  const handleFramingChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    updateFormData({ 
      portrait_options: { 
        ...(formData.portrait_options || {}),
        framing: value
      } 
    });
  };
  
  const handleBackgroundChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    updateFormData({ 
      portrait_options: { 
        ...(formData.portrait_options || {}),
        background: value
      } 
    });
  };
  
  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
        Customize how the AI portrait of your character will be generated.
      </p>
      
      {/* Image Model Selector */}
      <ImageModelSelector 
        value={(formData.portrait_options?.image_model as ImageModel) || DEFAULT_IMAGE_MODEL}
        onChange={handleImageModelChange}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select
          id="art-style"
          label="Art Style"
          options={artStyleOptions}
          value={formData.portrait_options?.art_style || ''}
          onChange={handleArtStyleChange}
          helperText="Visual style of the character portrait"
        />
        
        <Select
          id="mood"
          label="Expression/Mood"
          options={moodOptions}
          value={formData.portrait_options?.mood || ''}
          onChange={handleMoodChange}
          helperText="Character's facial expression"
        />
        
        <Select
          id="framing"
          label="Framing"
          options={framingOptions}
          value={formData.portrait_options?.framing || ''}
          onChange={handleFramingChange}
          helperText="How much of the character is shown"
        />
        
        <Select
          id="background"
          label="Background"
          options={backgroundOptions}
          value={formData.portrait_options?.background || ''}
          onChange={handleBackgroundChange}
          helperText="Style of the portrait's background"
        />
      </div>
      
      {/* Updated tip with higher contrast text */}
      <div className="mt-4 p-3 bg-blue-50 text-blue-900 rounded-md text-sm font-semibold dark:bg-blue-900/30 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
        <p>
          <strong>Tip:</strong> For best results, only specify the options that are important to you. 
          The AI can often create better portraits when given some creative freedom.
        </p>
      </div>
    </div>
  );
}