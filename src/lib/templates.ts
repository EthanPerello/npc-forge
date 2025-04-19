import { TemplateOption, SubGenreOption } from './types';

// Define the core genres with their sub-genres
export const GENRE_TEMPLATES: TemplateOption[] = [
  {
    id: 'fantasy',
    label: 'Fantasy',
    description: 'Worlds with magic, mythical creatures, and epic quests. Includes medieval fantasy, high fantasy, and magical realms.',
    example: 'A wise old elf who guards an ancient magical artifact deep in the enchanted forest. They possess powerful magic but have sworn to only use it to protect the natural balance.',
    subGenres: [
      { id: 'high_fantasy', label: 'High Fantasy', description: 'Epic worlds with elaborate magic systems, mythical races, and cosmic struggles between good and evil', example: 'An elven archmage who has lived for centuries and serves as an advisor to the royal court. They hold ancient knowledge about a dormant power awakening in the world.' },
      { id: 'dark_fantasy', label: 'Dark Fantasy', description: 'Grim settings with dangerous magic, mortal peril, and morally complex characters', example: 'A witch hunter who was cursed by the very creatures they hunt. Their body is slowly transforming, forcing them to use forbidden magic to maintain their humanity.' },
      { id: 'urban_fantasy', label: 'Urban Fantasy', description: 'Modern settings where magic and supernatural elements exist alongside our contemporary world', example: 'A detective who can see the ghosts of murder victims, helping them solve their final cases while hiding their abilities from their colleagues.' },
      { id: 'sword_sorcery', label: 'Sword & Sorcery', description: 'Focus on personal battles and adventures rather than world-threatening conflicts', example: 'A wandering mercenary with a legendary blade who takes on dangerous contracts, caring more about gold than glory while hiding a mysterious past.' }
    ]
  },
  {
    id: 'sci-fi',
    label: 'Science Fiction',
    description: 'Futuristic settings with advanced technology, space travel, and scientific themes. Includes space opera, cyberpunk, and post-apocalyptic worlds.',
    example: 'A rogue android engineer living on a space station who modifies tech beyond legal limits. They have developed unique upgrades that give them an edge but also make them a target for corporate security forces.',
    subGenres: [
      { id: 'space_opera', label: 'Space Opera', description: 'Epic adventures across galaxies with advanced civilizations, interstellar travel, and grand conflicts', example: 'A starship captain from a declining empire who discovers an ancient alien technology that could shift the balance of power across the galaxy.' },
      { id: 'cyberpunk', label: 'Cyberpunk', description: 'Near-future dystopias with high technology, corporate control, mega-cities, and social inequality', example: 'A hacker with illegal neural implants who makes a living stealing corporate data but stumbles upon information that puts them in the crosshairs of the most powerful megacorp.' },
      { id: 'post_apocalyptic', label: 'Post-Apocalyptic', description: 'Settings after global catastrophes where survivors adapt to harsh new realities', example: 'A wasteland scavenger who has developed immunity to the radiation that destroyed civilization, making them invaluable to communities but hunted by those who want to study them.' },
      { id: 'hard_scifi', label: 'Hard Sci-Fi', description: 'Scientifically rigorous futures based on plausible technological advancement', example: 'A terraforming scientist on Mars who has developed a revolutionary method to accelerate atmospheric conversion, attracting both corporate and political attention.' }
    ]
  },
  {
    id: 'historical',
    label: 'Historical',
    description: 'Settings based on actual historical periods from ancient civilizations to recent history. Includes medieval, renaissance, and various cultural settings.',
    example: 'A skilled cartographer in 15th century Portugal who dreams of joining exploratory voyages. They have developed a reputation for accurate maps and have begun collecting stories from sailors about uncharted lands beyond the known world.',
    subGenres: [
      { id: 'medieval', label: 'Medieval', description: 'European Middle Ages with knights, castles, feudal society, and religious influence', example: 'A royal physician trained in Arabic medicine whose unorthodox methods cause suspicion amongst the court but earn the king\'s favor.' },
      { id: 'ancient', label: 'Ancient Civilizations', description: 'Egyptian, Roman, Greek or other ancient cultures with their distinct societies and conflicts', example: 'A Roman engineer who designs aqueducts and has been tasked with bringing water to a rebellious frontier town that sits on valuable resources.' },
      { id: 'renaissance', label: 'Renaissance', description: 'Period of artistic and intellectual revival in Europe with political intrigue and cultural advancement', example: 'An apprentice to a famous artist in Florence who has a talent for forgery and becomes entangled in a conspiracy involving powerful banking families.' },
      { id: 'age_of_sail', label: 'Age of Sail', description: 'Era of naval exploration, piracy, trade, and colonial expansion', example: 'A navigator who was the sole survivor of a shipwreck and now serves on a merchant vessel, hiding the truth about what happened to their previous crew.' }
    ]
  },
  {
    id: 'contemporary',
    label: 'Contemporary',
    description: 'Modern-day settings with realistic characters and scenarios, possibly with supernatural or thriller elements added.',
    example: 'A coffee shop owner in a busy city who is secretly a retired intelligence operative. They have created a new life but occasionally use their skills to help people in trouble who come to their café seeking refuge.',
    subGenres: [
      { id: 'urban_life', label: 'Urban Life', description: 'Everyday settings in modern cities with realistic characters and relatable challenges', example: 'A food truck owner who uses their business as a way to reconnect with their neighborhood and heal community divisions, while struggling with their own financial problems.' },
      { id: 'mystery', label: 'Mystery & Thriller', description: 'Contemporary settings featuring crimes, investigations, suspense, and intrigue', example: 'A forensic analyst with an uncanny ability to reconstruct crime scenes who is called in to consult on a case that bears similarities to their own past trauma.' },
      { id: 'supernatural', label: 'Contemporary Supernatural', description: 'Modern world with hidden supernatural elements coexisting alongside everyday life', example: 'A paramedic who can sense how much time a person has left to live, using this ability to prioritize patients while keeping their gift a secret from colleagues.' },
      { id: 'slice_of_life', label: 'Slice of Life', description: 'Focus on everyday experiences and relationships with minimal plot', example: 'A retired teacher who volunteers at a community center, forming connections with people from different walks of life and helping them navigate their personal challenges.' }
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