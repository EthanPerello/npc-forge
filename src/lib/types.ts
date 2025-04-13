export interface Character {
    name: string;
    appearance: string;
    personality: string[];
    items: string[];
    dialogue_lines: string[];
    quest: {
      title: string;
      description: string;
      reward: string;
    };
    special_ability: string;
    image_url?: string;
  }
  
  export type Genre = 'fantasy' | 'sci-fi' | 'cyberpunk' | 'western' | 'modern' | 'horror';
  
  export interface CharacterFormData {
    description: string;
    genre?: Genre;
  }
  
  export interface GenerationResponse {
    character: Character;
    error?: string;
  }
  
  export interface TemplateOption {
    id: Genre;
    label: string;
    description: string;
    example: string;
  }