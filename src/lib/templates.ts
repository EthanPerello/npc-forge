import { TemplateOption, SubGenreOption } from './types';

// Define the core genres with their sub-genres
export const GENRE_TEMPLATES: TemplateOption[] = [
  {
    id: 'fantasy',
    label: 'Fantasy',
    description: 'Worlds with magic, mythical creatures, and epic quests. Includes medieval fantasy, high fantasy, and magical realms.',
    example: 'A wise old elf who guards an ancient magical artifact deep in the enchanted forest. They possess powerful magic but have sworn to only use it to protect the natural balance.',
    subGenres: [
      { id: 'high_fantasy', label: 'High Fantasy', description: 'Elaborate magical worlds with epic conflicts between good and evil' },
      { id: 'dark_fantasy', label: 'Dark Fantasy', description: 'Grim settings with dangerous magic and morally ambiguous characters' },
      { id: 'urban_fantasy', label: 'Urban Fantasy', description: 'Modern settings where magic and supernatural elements exist alongside our world' }
    ]
  },
  {
    id: 'sci-fi',
    label: 'Science Fiction',
    description: 'Futuristic settings with advanced technology, space travel, and scientific themes. Includes space opera, cyberpunk, and post-apocalyptic worlds.',
    example: 'A rogue android engineer living on a space station who modifies tech beyond legal limits. They have developed unique upgrades that give them an edge but also make them a target for corporate security forces.',
    subGenres: [
      { id: 'space_opera', label: 'Space Opera', description: 'Epic adventures across galaxies with advanced civilizations and technology' },
      { id: 'cyberpunk', label: 'Cyberpunk', description: 'Dystopian futures with high technology, corporate control, and social inequality' },
      { id: 'post_apocalyptic', label: 'Post-Apocalyptic', description: 'Settings after global catastrophes where survivors adapt to harsh new realities' }
    ]
  },
  {
    id: 'historical',
    label: 'Historical',
    description: 'Settings based on actual historical periods from ancient civilizations to recent history. Includes medieval, renaissance, and various cultural settings.',
    example: 'A skilled cartographer in 15th century Portugal who dreams of joining exploratory voyages. They have developed a reputation for accurate maps and have begun collecting stories from sailors about uncharted lands beyond the known world.',
    subGenres: [
      { id: 'medieval', label: 'Medieval', description: 'European Middle Ages with knights, castles, and feudal society' },
      { id: 'ancient', label: 'Ancient Civilizations', description: 'Egyptian, Roman, Greek or other ancient cultures' },
      { id: 'renaissance', label: 'Renaissance', description: 'Period of artistic and intellectual revival in Europe' },
      { id: 'pirate_age', label: 'Age of Piracy', description: 'Golden age of piracy with sea adventures and treasure hunting' }
    ]
  },
  {
    id: 'contemporary',
    label: 'Contemporary',
    description: 'Modern-day settings with realistic characters and scenarios, possibly with supernatural or thriller elements added.',
    example: 'A coffee shop owner in a busy city who is secretly a retired intelligence operative. They have created a new life but occasionally use their skills to help people in trouble who come to their café seeking refuge.',
    subGenres: [
      { id: 'modern_realistic', label: 'Modern Realistic', description: 'Everyday settings with realistic characters and situations' },
      { id: 'supernatural', label: 'Contemporary Supernatural', description: 'Modern world with hidden supernatural elements' },
      { id: 'thriller', label: 'Modern Thriller', description: 'Present-day settings with suspense, crime, or espionage' },
      { id: 'horror', label: 'Horror', description: 'Modern settings with frightening or unsettling elements' }
    ]
  }
];

// Get the full example based on genre ID
export function getTemplateExample(genreId: string): string {
  // First check if it's a main genre
  const mainGenre = GENRE_TEMPLATES.find(t => t.id === genreId);
  if (mainGenre?.example) {
    return mainGenre.example;
  }
  
  // If not found, check if it's a sub-genre
  for (const genre of GENRE_TEMPLATES) {
    if (genre.subGenres) {
      for (const subGenre of genre.subGenres) {
        if (subGenre.id === genreId) {
          // If no specific example for the sub-genre, use the main genre example
          return subGenre.example || genre.example;
        }
      }
    }
  }
  
  // Return a default example if nothing found
  return 'A unique character with an interesting background and motivations. Consider their appearance, personality, and role in the world.';
}

// Get the parent genre of a sub-genre
export function getParentGenre(subGenreId: string): string | undefined {
  for (const genre of GENRE_TEMPLATES) {
    if (genre.subGenres) {
      if (genre.subGenres.some(sub => sub.id === subGenreId)) {
        return genre.id;
      }
    }
  }
  return undefined;
}

// Get all sub-genres for a specific genre
export function getSubGenres(genreId: string): SubGenreOption[] {
  const genre = GENRE_TEMPLATES.find(g => g.id === genreId);
  return genre?.subGenres || [];
}

// Get all sub-genres across all genres
export function getAllSubGenres(): SubGenreOption[] {
  let allSubGenres: SubGenreOption[] = [];
  
  GENRE_TEMPLATES.forEach(genre => {
    if (genre.subGenres) {
      // Add the parent genre id to each sub-genre for reference
      const subGenresWithParent = genre.subGenres.map(sub => ({
        ...sub,
        parentGenreId: genre.id
      }));
      
      allSubGenres = [...allSubGenres, ...subGenresWithParent];
    }
  });
  
  return allSubGenres;
}