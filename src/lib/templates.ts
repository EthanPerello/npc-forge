import { TemplateOption } from './types';

export const GENRE_TEMPLATES: TemplateOption[] = [
  {
    id: 'fantasy',
    label: 'Fantasy',
    description: 'Medieval-style worlds with magic, mythical creatures, and epic quests.',
    example: 'A wise old elf who guards an ancient magical artifact'
  },
  {
    id: 'sci-fi',
    label: 'Sci-Fi',
    description: 'Futuristic settings with advanced technology, space travel, and alien species.',
    example: 'A rogue android engineer living on a space station'
  },
  {
    id: 'cyberpunk',
    label: 'Cyberpunk',
    description: 'Dystopian futures with high tech, low life, corporations, and digital realms.',
    example: 'A hacker with cybernetic implants who sells information'
  },
  {
    id: 'western',
    label: 'Western',
    description: 'Frontier settings with gunslingers, outlaws, sheriffs, and dusty towns.',
    example: 'A mysterious bounty hunter with a troubled past'
  },
  {
    id: 'modern',
    label: 'Modern',
    description: 'Contemporary settings with realistic characters and everyday scenarios.',
    example: 'A coffee shop owner who is secretly a retired spy'
  },
  {
    id: 'horror',
    label: 'Horror',
    description: 'Frightening settings with supernatural elements, monsters, and suspense.',
    example: 'A peculiar shopkeeper who deals in cursed antiques'
  }
];

export const getTemplateExample = (genre: string): string => {
  const template = GENRE_TEMPLATES.find(t => t.id === genre);
  return template?.example || '';
};