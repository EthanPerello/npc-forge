'use client';

import { useCharacter } from '@/contexts/character-context';
import Select from '@/components/ui/select';
import { DialogueToneOption, DialogueContextOption } from '@/lib/types';

// Dialogue tone options
const dialogueToneOptions: DialogueToneOption[] = [
  { value: 'any', label: 'Any Tone', description: 'Let the AI choose an appropriate tone' },
  { value: 'friendly', label: 'Friendly', description: 'Warm, welcoming, and approachable' },
  { value: 'formal', label: 'Formal', description: 'Proper, respectful, and distant' },
  { value: 'mysterious', label: 'Mysterious', description: 'Cryptic, enigmatic, and intriguing' },
  { value: 'aggressive', label: 'Aggressive', description: 'Hostile, threatening, or intimidating' },
  { value: 'cautious', label: 'Cautious', description: 'Wary, suspicious, and guarded' },
  { value: 'eccentric', label: 'Eccentric', description: 'Odd, quirky, or unusual speech patterns' },
  { value: 'scholarly', label: 'Scholarly', description: 'Intellectual, academic, uses complex vocabulary' },
  { value: 'humorous', label: 'Humorous', description: 'Witty, funny, or sarcastic' },
  { value: 'sad', label: 'Melancholic', description: 'Sad, wistful, or regretful' }
];

// Dialogue context options
const dialogueContextOptions: DialogueContextOption[] = [
  { value: 'any', label: 'Any Context' },
  { value: 'first_meeting', label: 'First Meeting' },
  { value: 'quest_giving', label: 'Giving a Quest' },
  { value: 'quest_progress', label: 'Discussing Quest Progress' },
  { value: 'quest_completion', label: 'Quest Completion' },
  { value: 'bargaining', label: 'Bargaining/Trading' },
  { value: 'combat', label: 'During Combat' },
  { value: 'casual', label: 'Casual Conversation' }
];

// Number of lines options
const lineNumberOptions = [
  { value: '3', label: '3 lines' },
  { value: '5', label: '5 lines' },
  { value: '7', label: '7 lines' },
  { value: '10', label: '10 lines' }
];

export default function DialogueTab() {
  const { formData, updateFormData } = useCharacter();
  
  // Initialize dialogue options if they don't exist
  if (!formData.dialogue_options) {
    updateFormData({
      dialogue_options: {
        number_of_lines: 3,
        tone: undefined,
        context: undefined
      }
    });
  }
  
  // Handle dialogue tone change
  const handleToneChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateFormData({ 
      dialogue_options: { 
        ...formData.dialogue_options,
        tone: e.target.value || undefined
      } 
    });
  };
  
  // Handle dialogue context change
  const handleContextChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateFormData({ 
      dialogue_options: { 
        ...formData.dialogue_options,
        context: e.target.value || undefined
      } 
    });
  };
  
  // Handle number of lines change
  const handleNumberChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateFormData({ 
      dialogue_options: { 
        ...formData.dialogue_options,
        number_of_lines: parseInt(e.target.value) || 3
      } 
    });
  };
  
  return (
    <div className="space-y-6">
      <p className="text-sm text-gray-600 dark:text-gray-400">
        Configure the dialogue lines this character will speak.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Number of Lines */}
        <Select
          label="Number of Dialogue Lines"
          options={lineNumberOptions}
          value={String(formData.dialogue_options?.number_of_lines || 3)}
          onChange={handleNumberChange}
        />
        
        {/* Dialogue Tone */}
        <Select
          label="Dialogue Tone"
          options={dialogueToneOptions}
          value={formData.dialogue_options?.tone || ''}
          onChange={handleToneChange}
          helperText="How the character speaks"
        />
        
        {/* Dialogue Context */}
        <Select
          label="Dialogue Context"
          options={dialogueContextOptions}
          value={formData.dialogue_options?.context || ''}
          onChange={handleContextChange}
          helperText="The situation in which dialogue occurs"
        />
      </div>
      
      {/* Tone Description */}
      {formData.dialogue_options?.tone && formData.dialogue_options.tone !== 'any' && (
        <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 text-sm dark:bg-gray-800 dark:border-gray-700">
          <p className="text-gray-700 dark:text-gray-300">
            {dialogueToneOptions.find(opt => opt.value === formData.dialogue_options?.tone)?.description}
          </p>
        </div>
      )}
      
      {/* Dialogue Example */}
      <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <h3 className="text-sm font-medium text-gray-700 mb-2 dark:text-gray-300">Example Dialogue Format:</h3>
        <div className="space-y-2 text-gray-600 dark:text-gray-400 text-sm">
          <p className="italic">
            "Greetings, traveler! Have you come seeking treasures from distant lands?"
          </p>
          <p className="italic">
            "Hmph, don't waste my time unless you have something valuable to trade."
          </p>
          <p className="italic">
            "Return to me when you've found the ancient scroll... if you survive, that is."
          </p>
        </div>
      </div>
    </div>
  );
}