# NPC Forge Features

NPC Forge offers tools for creating detailed non-player characters for your games, stories, and creative projects.

## Core Features

### Wizard-Based Character Creation (v0.13.0)

- **Step-by-Step Process**: Four-step guided creation
  - **Concept Step**: Genre selection and character description
  - **Options Step**: Trait and attribute customization  
  - **Model Step**: AI model selection
  - **Generate Step**: Character generation and results
- **Progress Tracking**: Progress bar with step navigation
- **Welcome Guide**: Introduction popup for new users
- **Quick Generation**: "Generate Random Character" button

### Character Library System (v0.8.0+)

- **CRUD Operations**: Create, Read, Update, Delete characters
- **Local Storage**: IndexedDB for character storage
- **Character Management**: Save, edit, and delete characters
- **Import/Export**: JSON import/export for character data
- **Example Characters**: Pre-loaded sample characters

### Enhanced Filtering System (v0.18.0)

- **Trait Filtering**: Dropdown filters for character trait categories
- **Automatic Discovery**: Filters created from existing character data
- **Enhanced Display**: Traits shown with category prefixes (e.g., "Personality: brave")
- **Organized Interface**: Collapsible filter sections
- **Smart Search**: "category: value" syntax for searches
- **Combined Filtering**: Use multiple filters and search simultaneously

### Character Regeneration (v0.12.0)

- **Individual Attribute Regeneration**: Name, appearance, personality, backstory
- **Portrait Regeneration**: Update portraits with different models
- **Component-Level Regeneration**: Individual quest, dialogue, and item elements
- **Model Selection**: Choose different AI models for regeneration

### AI-Powered Generation

- **Multiple AI Models**: Standard, Enhanced, and Premium tiers
- **Character Profiles**: Appearance, personality, and backstory descriptions
- **Backstory Hooks**: Character motivation setup
- **Quest Generation**: Quests with title, description, and reward
- **Dialogue Lines**: Character-specific dialogue
- **Item Inventories**: Character items with descriptions

### AI Portrait Generation

- **Multiple Image Models**: dall-e-2, dall-e-3, and gpt-image-1
- **Portrait Customization**: Art style, mood, framing, and background options
- **Portrait Storage**: Images saved locally

## Customization Options

### Genre System

- **Core Genres**: Fantasy, Science Fiction, Historical, Contemporary
- **Sub-Genres**: 16 specialized templates within each genre

### Model Selection System (v0.7.0)

| Tier | Text Model | Image Model | Monthly Limit |
|------|------------|-------------|---------------|
| 🟢 Standard | gpt-4o-mini | dall-e-2 | 50 text / 10 images |
| 🟡 Enhanced | gpt-4.1-mini | dall-e-3 | 30 text / 5 images |
| 🔴 Premium | gpt-4o | gpt-image-1 | 10 text / 3 images |

### Character Trait Options

#### Basic Traits
- **Gender**: Male, Female, Nonbinary, Unknown
- **Age Group**: Child, Teen, Adult, Elder
- **Moral Alignment**: Good, Neutral, Evil
- **Relationship to Player**: Ally, Enemy, Neutral, Mentor, Rival, Betrayer

#### Advanced Options
- **Physical Traits**: Height, build, distinctive features
- **Background Elements**: Social class, homeland/origin
- **Occupation**: Searchable dropdown with genre-specific options
- **Personality Traits**: Multi-select system

### Content Customization

- **Quest Options**: Number, types, and reward types
- **Dialogue Options**: Number of lines, tone, and context
- **Item Options**: Number, rarity distribution, and categories
- **Portrait Options**: Art style, expression, framing, and background

## User Interface Features

### Character Editing (v0.10.0+)

- **Full Editing**: Modify all character attributes
- **Add/Remove Elements**: Quests, dialogue, and items
- **Regeneration Controls**: Regenerate specific elements
- **Portrait Management**: Upload or regenerate portraits

### UI Enhancements

- **Dark Mode Support**: Theme toggle with persistence
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Loading Feedback**: Progress indicators during generation
- **Success Notifications**: Visual feedback after actions

### Library Management

- **Search and Filtering**: Find characters by traits and attributes
- **Character Cards**: Visual display with portraits and actions
- **Direct Actions**: Edit, download, and delete buttons
- **Collection Organization**: Use filtering to organize large collections

## Technical Features

### Storage & Performance

- **IndexedDB Integration**: Reliable local storage
- **Portrait Compression**: Automatic image compression
- **Database Recovery**: Error handling and recovery
- **Efficient Filtering**: Optimized search and filter performance

### API Integration

- **Multiple OpenAI Models**: Support for various text and image models
- **Regeneration API**: Dedicated endpoint for character updates
- **Error Handling**: Graceful API failure handling
- **Usage Tracking**: Per-model usage limit tracking

### Security & Privacy

- **Local Storage Only**: No server storage of character data
- **Input Sanitization**: Protection against malicious inputs
- **Privacy-First**: No personal data collection

## Usage Management

- **Per-Model Tracking**: Individual quotas for different AI models
- **Visual Indicators**: Clear display of remaining generations
- **Monthly Reset**: Automatic limit reset each month
- **Development Bypass**: Testing mode for developers

## Related Documentation

- [How to Use NPC Forge](/docs/how-to-use) - Step-by-step usage guide
- [Character Library Guide](/docs/library) - Library management and filtering
- [Generation Options](/docs/generation-options) - Detailed customization
- [Model Selection Guide](/docs/models) - Understanding AI model tiers