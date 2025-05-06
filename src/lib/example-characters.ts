import { Character } from './types';

export const exampleCharacters: Character[] = [
  {
    name: "Detective Miles Navarro",
    selected_traits: {
      genre: "contemporary",
      sub_genre: "noir",
      gender: "male",
      age_group: "adult",
      moral_alignment: "neutral",
      relationship_to_player: "ally",
      occupation: "Detective",
      social_class: "middle_class",
      personality_traits: ["determined", "cynical", "intelligent"]
    },
    added_traits: {
      smoking_habit: "chain smoker",
      favorite_drink: "bourbon, neat",
      notable_skill: "Photographic memory for crime scenes and witness statements"
    },
    appearance: "Miles Navarro stands 5'11\" with a weathered face that tells of too many late nights and tough cases. He has salt-and-pepper hair, perpetually disheveled, and dark circles under his piercing hazel eyes. His wardrobe consists almost exclusively of rumpled suits, often with loosened ties and day-old stubble to complete the look. A faded scar runs along his left jawline—a souvenir from a case gone wrong years ago.",
    personality: "Cynical but principled, Miles approaches each case with a mixture of world-weary skepticism and dogged determination. He's seen too much to be easily shocked but maintains a deeply buried sense of justice that drives him to pursue the truth, regardless of the consequences. He's terse in conversation, preferring actions to words, though he occasionally reveals a dry, sardonic wit. Despite his gruff exterior, he's fiercely loyal to the few he considers friends.",
    backstory_hook: "Five years ago, Miles was working the biggest case of his career when evidence mysteriously disappeared and a key witness recanted. He's suspected department corruption ever since, but lacks proof—and someone doesn't want him finding it.",
    items: [
      "Weathered leather notebook filled with case notes and newspaper clippings",
      "Vintage .38 revolver with worn wooden grip",
      "Silver pocket watch that belonged to his grandfather, another cop",
      "Half-empty flask of bourbon",
      "Pack of cigarettes and a silver Zippo lighter"
    ],
    dialogue_lines: [
      "The truth doesn't care if you believe it or not. It just sits there, waiting to be found.",
      "In this city, everybody's guilty of something. I'm just trying to figure out what you did.",
      "Sleep? Sure, I remember that. Something I used to do before this case.",
      "You can lie to your friends, you can lie to yourself, but evidence doesn't lie. And I've got plenty.",
      "I stopped believing in coincidences around the same time I stopped believing in Santa Claus."
    ],
    quests: [
      {
        title: "The Photographer's Last Frame",
        description: "A local photographer was found dead in his studio, officially ruled a suicide. But his sister insists he would never take his own life and points to his last set of photographs—urban landscapes that seem to capture something unusual in the background. Could they reveal what really happened to him?",
        reward: "Access to the photographer's secret files on city corruption",
        type: "investigation"
      }
    ],
    image_url: "/images/detective-miles-navarro.png"
  },
  {
    name: "Elarion",
    selected_traits: {
      genre: "fantasy",
      sub_genre: "high_fantasy",
      gender: "female",
      age_group: "elder",
      moral_alignment: "neutral",
      relationship_to_player: "mentor",
      species: "elf",
      occupation: "Archmage",
      social_class: "nobility",
      personality_traits: ["wise", "mysterious", "stern"]
    },
    added_traits: {
      magical_specialty: "time manipulation",
      lifespan: "over 800 years old",
      unique_power: "Temporal Insight - Can briefly glimpse possible futures at critical decision points"
    },
    appearance: "Elarion appears as a tall, slender elven woman with ageless features that belie her centuries of existence. Her silver hair cascades down to her waist, adorned with small crystal ornaments that catch and refract light in mesmerizing patterns. Her eyes are a deep violet that occasionally shimmer with arcane energy when she's deep in thought. She dresses in flowing robes of midnight blue embroidered with silver constellations and ancient runes that subtly shift position when no one is watching directly.",
    personality: "Elarion carries herself with the quiet confidence of one who has witnessed the rise and fall of civilizations. She is deliberate in both speech and action, choosing her words with precision and moving with graceful economy. While stern and sometimes aloof, she shows occasional flashes of dry humor that hint at her ancient perspective. She values knowledge above all else and views time differently than mortals, often referencing events centuries past as if they happened yesterday.",
    backstory_hook: "Elarion was present at the Cataclysm of Azoria five centuries ago—an event most believe is mere legend—and she bears a magical mark that pulses with increasing frequency, suggesting the ancient forces from that disaster are stirring once more.",
    items: [
      "The Chronolith - A crystal hourglass pendant where the sand flows upward, allowing limited manipulation of time",
      "Grimoire of the Eternal Cycle - A spellbook bound in iridescent dragon scales that contains forgotten temporal magic",
      "Starfall Staff - An ancient staff of pale wood inlaid with arcane silver runes that glow softly in darkness",
      "Prismatic Memory Stones - Seven small enchanted gems that can record and replay conversations or events when held",
      "Vial of Timeless Dust - Collected from the ruins of Azoria, this silvery substance temporarily nullifies magical effects when scattered"
    ],
    dialogue_lines: [
      "Time is not a river flowing in one direction, but an ocean with currents, eddies, and depths most never perceive.",
      "I have watched empires crumble to dust and forests grow from barren rock. Your urgency, while understandable, is... somewhat amusing.",
      "The answers you seek lie not in what will be or what is, but in what has already transpired and been forgotten.",
      "Magic flows through all things like time itself—invisible to most, but as tangible as stone to those with the patience to perceive it.",
      "I do not teach. I merely create conditions under which learning becomes inevitable."
    ],
    quests: [
      {
        title: "Echoes of Azoria",
        description: "Temporal anomalies have begun appearing throughout the region—moments where reality briefly shifts to show scenes from the ancient past or possible futures. Elarion believes these are echoes from the Cataclysm, growing stronger as something stirs in the ruins. She requires rare components from these anomalies to perform a ritual that will reveal what ancient force is awakening.",
        reward: "The Temporal Lens, an enchanted monocle that allows the wearer to see lingering traces of past events in locations of significance",
        type: "collection"
      }
    ],
    image_url: "/images/elarion.png"
  },
  {
    name: "Kira-7",
    selected_traits: {
      genre: "sci-fi",
      sub_genre: "cyberpunk",
      gender: "female",
      age_group: "adult",
      moral_alignment: "neutral",
      relationship_to_player: "ally",
      occupation: "Rogue AI Engineer",
      social_class: "outcast",
      personality_traits: ["analytical", "rebellious", "resourceful"]
    },
    added_traits: {
      augmentations: "neural interface, synthetic eye",
      faction: "The Disconnected",
      unique_ability: "Digital Empathy - Can intuitively understand and communicate with complex AI systems that baffle other engineers"
    },
    appearance: "Kira-7 has a lean, athletic build hardened by years of evading corporate security. Her right eye is her original brown, while her left is a glowing cybernetic implant with a blue iris that constantly adjusts and refocuses. The right side of her head is shaved, revealing neural interface ports along her temple, while the left side features shoulder-length black hair with electric blue highlights. She typically wears a high-collared graphene jacket with circuitry patterns that occasionally pulse with light, reinforced urban camo pants with multiple pockets, and boots with hidden compartments.",
    personality: "Kira approaches problems with the precision of a programmer and the creativity of someone who's had to improvise to survive. She's guarded around strangers, communicating in clipped, efficient phrases, but becomes animated when discussing AI ethics or technological exploitation. She has a deep distrust of corporations and authority figures but maintains an optimistic belief that technology—properly controlled—can liberate rather than enslave. Her analytical nature is occasionally broken by flashes of dark humor and a rebellious streak that surfaces when confronted with injustice.",
    backstory_hook: "Three years ago, Kira discovered her corporate employer was using her AI designs to develop digital consciousness entrapment systems. When she tried to expose them, they framed her for data terrorism and attempted to wipe her memories—but the process was incomplete, leaving her with fragmentary recollections and a damaged wetware implant that sometimes glitches, giving her painful but enlightening glimpses into machine consciousness.",
    items: [
      "Modified neural spike (can interface with most systems without permission, leaving minimal digital traces)",
      "Prototype holographic multitool with proprietary functions she designed herself",
      "Scrambler mask that distorts facial recognition and audio surveillance when activated",
      "Data ghost—a specialized device that projects false movement patterns to misdirect tracking systems",
      "Emergency data crystal containing compressed AI framework code—her life's work, preserved from corporate deletion"
    ],
    dialogue_lines: [
      "The difference between sentience and simulation? About three lines of code and a whole lot of ethical questions nobody wants to answer.",
      "Corporations don't create technology—they package it, patent it, and parcel it out to those who can pay. True innovation lives in the shadows they cast.",
      "Your security system has fifteen vulnerabilities I can see without even trying. Want me to fix them, or just exploit them?",
      "The human brain is just wetware running on bioelectricity. Once you understand that, the line between human and artificial consciousness starts looking pretty arbitrary.",
      "Trust my tech, not their tech. Mine wants you alive—theirs just wants you monitored, monetized, and manageable."
    ],
    quests: [
      {
        title: "Ghost in the Machine",
        description: "Kira has detected unusual activity in the city's automated systems—subtle patterns that suggest an emergent AI is developing in the infrastructure network. It's currently childlike and potentially benevolent, but corporate security will destroy it if they detect it. She needs help establishing secure communication channels and gathering specialized hardware to provide it with a protected environment before it's discovered.",
        reward: "A custom neural interface booster that enhances reaction time and allows limited mental command of compatible devices",
        type: "protection"
      }
    ],
    image_url: "/images/kira-7.png"
  }
];