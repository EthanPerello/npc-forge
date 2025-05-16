# NPC Forge Features

NPC Forge offers a comprehensive set of tools for creating rich, detailed non-player characters for your games, stories, and creative projects. This document outlines all available features.

## Core Features

### Wizard-Based Character Creation (v0.13.0)

![Character Creation Steps](/public/images/concept-step.png)

- **Step-by-Step Process**: Guided creation through four distinct steps
  - **Concept Step**: Genre selection and character description
  - **Options Step**: Detailed trait and attribute customization  
  - **Model Step**: AI model selection for text and images
  - **Generate Step**: Character generation and results display
- **Progress Tracking**: Sticky progress bar with clickable navigation between steps
- **Welcome Guide**: Introduction popup for first-time users
- **Quick Generation**: "Generate Random Character" button for instant results
- **Step-Aware Controls**: Context-sensitive footer with Continue, Back, and New Character buttons

### Character Library System

![Character Library](/public/images/character-library.png)

- **Complete CRUD Operations**: Create, Read, Update, Delete characters
- **Local Storage**: Uses IndexedDB for reliable character storage
- **Character Management**:
  - Save generated characters to your library
  - Edit existing characters with full customization
  - Delete characters with direct action buttons
  - Search and filter your collection
- **Import/Export**: JSON import/export for character data
- **Example Characters**: Pre-loaded sample characters for inspiration
- **Character Cards**: Visual cards with portraits and quick actions

### Character Regeneration (v0.12.0)

- **Individual Attribute Regeneration**: Regenerate specific character elements
  - Name
  - Appearance
  - Personality
  - Backstory
- **Portrait Regeneration**: Update character portraits with different models
- **Component-Level Regeneration**:
  - Individual quest elements (title, description, reward)
  - Dialogue lines
  - Item descriptions
- **Loading States**: Visual feedback during regeneration
- **Success/Error Messages**: Clear feedback for regeneration operations

### AI-Powered Character Generation

- **Multiple AI Models**: Choose from different quality tiers
- **Rich Text Descriptions**: Detailed paragraphs for appearance, personality, and backstory
- **Backstory Hooks**: Concise hooks that set up character motivations
- **Special Abilities**: Unique powers or skills that make each character distinctive

### AI Portrait Generation

- **Multiple Image Models**: dall-e-2, dall-e-3, and gpt-image-1
- **Portrait Customization**: Control art style, mood, framing, and background
- **Visual Consistency**: Images match character descriptions and traits
- **Portrait Storage**: Images saved locally with IndexedDB

### Comprehensive Character Elements

- **Quest Generation**: Create quests including title, description, reward, and type
- **Dialogue Lines**: Generate character-specific dialogue with customizable tone and context
- **Item Inventories**: Create lists of items with customizable categories and rarity

## Customization Options

### Genre & Template System

- **Core Genres**: Fantasy, Science Fiction, Historical, Contemporary
- **Sub-Genres**: 16 specialized templates within each core genre:
  - **Fantasy**: High Fantasy, Dark Fantasy, Urban Fantasy, Sword & Sorcery
  - **Sci-Fi**: Space Opera, Cyberpunk, Post-Apocalyptic, Hard Sci-Fi
  - **Historical**: Medieval, Ancient Civilizations, Renaissance, Age of Sail
  - **Contemporary**: Urban Life, Mystery & Thriller, Supernatural, Slice of Life

### Model Selection System (v0.7.0)

![Model Selection](/public/images/model-step.png)

| Tier | Text Model | Image Model | Monthly Limit | Best For |
|------|------------|-------------|---------------|----------|
| 🟢 Standard | gpt-4o-mini | dall-e-2 | Unlimited | Frequent generations |
| 🟡 Enhanced | gpt-4.1-mini | dall-e-3 | 30/month | Higher quality |
| 🔴 Premium | gpt-4o | gpt-image-1 | 10/month | Maximum detail |

### Character Trait Customization

#### Basic Traits
- **Gender**: Male, Female, Nonbinary, Unknown
- **Age Group**: Child, Teen, Adult, Elder
- **Moral Alignment**: Good, Neutral, Evil
- **Relationship to Player**: Ally, Enemy, Neutral, Mentor, Rival, Betrayer

#### Advanced Options
- **Physical Traits**
  - Height (Very Short to Very Tall)
  - Build (Thin/Slender to Heavy/Large)
  - Distinctive Features (custom text input)
- **Background Elements**
  - Social Class (Lower Class to Upper Class/Nobility)
  - Homeland/Origin (custom text input)
- **Occupation**: Searchable dropdown with genre-specific options
- **Personality Traits**: Multi-select system (unlimited selection)

### Quest Customization

- **Number of Quests**: 1-3 quests per character
- **Quest Types**: Fetch/Collect, Defeat/Combat, Rescue/Escort, Deliver/Courier, Investigate/Mystery, Exploration, Crafting/Building, Stealth/Heist, Diplomatic
- **Reward Types**: Money/Currency, Item/Equipment, Information/Knowledge, Reputation/Standing, Skill/Training, Companion/Ally, Property/Land

### Dialogue Customization

- **Number of Lines**: 3-10 dialogue lines
- **Dialogue Tone**: Friendly, Formal, Mysterious, Aggressive, Cautious, Eccentric, Scholarly, Humorous, Melancholic
- **Dialogue Context**: First Meeting, Giving a Quest, Discussing Quest Progress, Quest Completion, Bargaining/Trading, During Combat, Casual Conversation

### Item Customization

- **Number of Items**: 3-10 items
- **Rarity Distribution**: Balanced, Mostly Common, Mostly Uncommon, Include Rare Items, Themed by Character
- **Item Categories**: Weapons, Armor & Clothing, Potions & Consumables, Scrolls & Books, Tools & Utility Items, Jewelry & Accessories, Artifacts & Relics, Food & Drink, Currency & Valuables, Crafting Materials, Technology & Gadgets (Sci-Fi), Magical Items (Fantasy)

### Portrait Customization

- **Art Style**: Realistic, Fantasy Art, Anime/Manga, Comic Book, Pixel Art, Oil Painting, Watercolor, 3D Render
- **Expression/Mood**: Neutral, Happy/Smiling, Serious, Angry, Sad, Determined, Mysterious, Heroic
- **Framing**: Portrait (Head/Shoulders), Bust (Upper Body), Full Body, Action Pose
- **Background**: Plain/Solid Color, Gradient, Themed (Based on Character), Environmental, Abstract

## Utility Features

### Character Editing (v0.10.0+)

![Character Edit Page](/public/images/edit-page.png)

- **Full Character Editing**: Modify all character attributes
- **Add/Remove Elements**: Dynamically add or remove quests, dialogue, and items
- **Regeneration Controls**: Regenerate specific character elements
- **Portrait Management**: Upload or regenerate character portraits
- **Model Selection**: Choose different AI models for regeneration

### User Interface Enhancements

- **Dark Mode Support**: Complete dark mode toggle with theme persistence
- **Responsive Design**: Optimized for desktop, tablet, and mobile
- **Sticky Footer**: Quick access to generation controls
- **Auto-fill Features**: Genre descriptions update automatically
- **Loading Notifications**: Floating messages during character generation
- **Success Animations**: Visual feedback after character creation

### Randomization & Management

- **Randomize Options**: Quickly generate random traits for inspiration
- **Clear Options**: Reset all character traits while preserving description and portrait settings

### Usage Management

- **Per-Model Usage Tracking**: Individual quotas for different AI models
- **Visual Indicators**: Clear display of remaining generations
- **Development Bypass**: Unlimited usage in development mode
- **Monthly Reset**: Automatic limit reset at month start

## Technical Features

### API Integration

- **Multiple OpenAI Models**: Support for various text and image generation models
- **Regeneration API**: Dedicated `/api/regenerate` endpoint for character updates
- **Error Handling**: Graceful fallbacks for API failures
- **Content Filtering**: Through OpenAI's moderation system

### Storage & Performance

- **IndexedDB Integration**: Reliable local storage for characters and portraits
- **Database Recovery**: Resilient storage with validation and recovery logic
- **Portrait Compression**: Automatic compression and storage of portrait images
- **Efficient API Usage**: Optimized prompts to minimize token consumption

### Security & Privacy

- **No Server Storage**: Characters stored only locally
- **Input Sanitization**: Prevents malicious inputs
- **Client-Side Limits**: Usage tracking without external dependencies
- **Privacy-First**: No personal data collection or tracking

## Upcoming Features

These features are planned for future releases:

- **"Talk to NPC" Chat Interface** (v0.14.0): Interactive conversations with your characters
- **User Accounts & Cloud Features** (v0.15.0): Account creation and cloud sync
- **Game Integration API** (v1.0.0): RESTful API for accessing characters
- **Advanced Character Features**: Voice generation, 3D models, character relationships
- **World Building Tools**: Setting generation, maps, and cultural context

See the [Roadmap](/docs/roadmap) for more details on upcoming features.

## Related Documentation

- [How to Use NPC Forge](/docs/how-to-use) - Step-by-step usage guide
- [Character Library Guide](/docs/library) - Managing your character collection
- [Generation Options](/docs/generation-options) - Detailed customization options
- [Character Examples](/docs/character-examples) - Sample generated characters
- [Model Selection Guide](/docs/models) - Understanding AI model tiers