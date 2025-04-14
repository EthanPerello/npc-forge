import { TemplateOption } from './types';

export const GENRE_TEMPLATES: TemplateOption[] = [
  {
    id: 'fantasy',
    label: 'Fantasy',
    description: 'Medieval-style worlds with magic, mythical creatures, and epic quests. Perfect for wizards, knights, elves, and dragons.',
    example: 'A wise old elf who guards an ancient magical artifact deep in the enchanted forest. They possess powerful magic but have sworn to only use it to protect the natural balance.'
  },
  {
    id: 'sci-fi',
    label: 'Sci-Fi',
    description: 'Futuristic settings with advanced technology, space travel, and alien species. Ideal for engineers, pilots, androids, and explorers.',
    example: 'A rogue android engineer living on a space station who modifies tech beyond legal limits. They have developed unique upgrades that give them an edge but also make them a target.'
  },
  {
    id: 'cyberpunk',
    label: 'Cyberpunk',
    description: 'Dystopian futures with high tech, low life, corporations, and digital realms. Great for hackers, corporate agents, street samurai, and fixers.',
    example: 'A cybernetically enhanced hacker with a reputation for acquiring and selling classified information. They have connections throughout the city but are haunted by a job gone wrong.'
  },
  {
    id: 'western',
    label: 'Western',
    description: 'Frontier settings with gunslingers, outlaws, sheriffs, and dusty towns. Perfect for creating frontier characters in harsh environments.',
    example: 'A mysterious bounty hunter with scars from past conflicts who rarely speaks about their history. They are known for always getting their target but following a personal code of justice.'
  },
  {
    id: 'modern',
    label: 'Modern',
    description: 'Contemporary settings with realistic characters and everyday scenarios, but with interesting twists and backgrounds.',
    example: 'A coffee shop owner in a busy city who is secretly a retired intelligence operative. They have created a new life but occasionally use their skills to help people in trouble.'
  },
  {
    id: 'horror',
    label: 'Horror',
    description: 'Frightening settings with supernatural elements, monsters, and suspense. Great for creating eerie or unsettling characters.',
    example: 'A peculiar antique shop owner who deals in cursed or haunted objects. They know the history and danger of each item but have mysterious reasons for collecting them.'
  },
  {
    id: 'post-apocalyptic',
    label: 'Post-Apocalyptic',
    description: 'Worlds after a major catastrophe where survivors struggle in harsh new realities. Perfect for wasteland wanderers, settlement leaders, and scavengers.',
    example: 'A resourceful scavenger who travels between isolated settlements, trading salvaged technology and information about threats. They have developed unique survival skills and knowledge of safe routes.'
  },
  {
    id: 'steampunk',
    label: 'Steampunk',
    description: 'Victorian-era aesthetics with advanced steam-powered technology, airships, and mechanical wonders.',
    example: 'An eccentric inventor who creates extraordinary mechanical devices powered by steam and mysterious crystals. Their workshop is filled with half-finished contraptions and rare components.'
  },
  {
    id: 'superhero',
    label: 'Superhero',
    description: 'Worlds where individuals with extraordinary abilities exist, either hiding among normal society or operating openly.',
    example: 'A vigilante with the ability to temporarily borrow the skills of anyone they touch. They work as a gymnastics instructor by day, fighting crime at night while wrestling with the ethics of their power.'
  },
  {
    id: 'historical',
    label: 'Historical',
    description: 'Characters set in actual historical periods, from ancient civilizations to more recent history, with realistic details.',
    example: 'An apprentice mapmaker in the 15th century who dreams of joining exploratory voyages. They have developed a reputation for accuracy and have begun collecting stories from sailors about lands beyond the known world.'
  },
  {
    id: 'military',
    label: 'Military',
    description: 'Characters in military organizations, whether modern, historical, or fictional, with appropriate ranks and specializations.',
    example: 'A veteran special forces sergeant who now trains recruits, known for their demanding standards but genuine care for their soldiers. They carry physical and emotional scars from a mission that went catastrophically wrong.'
  },
  {
    id: 'pirate',
    label: 'Pirate',
    description: 'Swashbuckling characters from the golden age of piracy, with ships, treasure hunts, and nautical adventures.',
    example: 'A former naval navigator who became a pirate after being betrayed by their government. They have developed a reputation for fair treatment of captives and maintain a strict code among their diverse crew.'
  }
];

export const getTemplateExample = (genre: string): string => {
  const template = GENRE_TEMPLATES.find(t => t.id === genre);
  return template?.example || '';
};