export interface Character {
    name: string;
    selected_traits: {
      genre?: string;
      gender?: 'male' | 'female' | 'nonbinary' | 'unknown';
      age_group?: 'child' | 'teen' | 'adult' | 'elder';
      moral_alignment?: 'good' | 'neutral' | 'evil';
      relationship_to_player?: 'ally' | 'enemy' | 'neutral' | 'mentor' | 'rival' | 'betrayer';
      species?: string;
      occupation?: string;
      social_class?: string;
      personality_trait?: string;
    };
    added_traits: {
      [key: string]: string; // Additional traits AI added that weren't selected
    };
    appearance: string; // Now a freeform paragraph
    personality: string; // Now a freeform paragraph
    backstory_hook: string; // 1-2 sentence hook
    special_ability?: string;
    items?: string[];
    dialogue_lines?: string[];
    quests?: Quest[];
    image_url?: string;
  }
  
  export interface Quest {
    title: string;
    description: string;
    reward: string;
    type?: string;
  }
  
  export type Genre = 'fantasy' | 'sci-fi' | 'cyberpunk' | 'western' | 'modern' | 'horror';
  
  export interface CharacterFormData {
    description: string;
    include_quests: boolean;
    include_dialogue: boolean;
    include_items: boolean;
    genre?: string;
    gender?: 'male' | 'female' | 'nonbinary' | 'unknown';
    age_group?: 'child' | 'teen' | 'adult' | 'elder';
    moral_alignment?: 'good' | 'neutral' | 'evil';
    relationship_to_player?: 'ally' | 'enemy' | 'neutral' | 'mentor' | 'rival' | 'betrayer';
    advanced_options?: {
      species?: string;
      occupation?: string;
      personality_trait?: string;
      social_class?: string;
    };
    quest_options?: {
      reward_type?: string;
      number_of_quests?: number;
      quest_type?: string;
    };
    dialogue_options?: {
      number_of_lines?: number;
      tone?: string;
      context?: string;
    };
    item_options?: {
      number_of_items?: number;
      rarity_distribution?: string;
      item_categories?: string[];
    };
  }
  
  export interface GenerationResponse {
    character: Character;
    error?: string;
  }
  
  export interface TemplateOption {
    id: string;
    label: string;
    description: string;
    example: string;
  }
  
  // Option interfaces for selects
  export interface GenderOption {
    value: 'male' | 'female' | 'nonbinary' | 'unknown';
    label: string;
  }
  
  export interface AgeGroupOption {
    value: 'child' | 'teen' | 'adult' | 'elder';
    label: string;
  }
  
  export interface AlignmentOption {
    value: 'good' | 'neutral' | 'evil';
    label: string;
  }
  
  export interface RelationshipOption {
    value: 'ally' | 'enemy' | 'neutral' | 'mentor' | 'rival' | 'betrayer';
    label: string;
  }
  
  export interface SpeciesOption {
    value: string;
    label: string;
    genre?: Genre[]; // Optional array of genres this species is most appropriate for
  }
  
  export interface OccupationOption {
    value: string;
    label: string;
    genre?: Genre[]; // Optional array of genres this occupation is most appropriate for
  }
  
  export interface SocialClassOption {
    value: string;
    label: string;
  }
  
  export interface PersonalityOption {
    value: string;
    label: string;
  }
  
  export interface QuestTypeOption {
    value: string;
    label: string;
    description: string;
  }
  
  export interface RewardTypeOption {
    value: string;
    label: string;
  }
  
  export interface DialogueToneOption {
    value: string;
    label: string;
    description: string;
  }
  
  export interface DialogueContextOption {
    value: string;
    label: string;
  }
  
  export interface ItemCategoryOption {
    value: string;
    label: string;
    genre?: Genre[]; // Optional array of genres this item category is most appropriate for
  }
  
  export interface RarityDistributionOption {
    value: string;
    label: string;
    description: string;
  }