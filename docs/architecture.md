# Architecture Overview

This document provides an overview of NPC Forge's architecture, explaining the key components and how they interact to create AI-powered character generation for game developers and storytellers.

## System Architecture

NPC Forge is a Next.js 14 application with a React frontend and serverless API endpoints. It's designed as a client-side application that communicates with the OpenAI API for character and portrait generation, with comprehensive character management capabilities.

### Key Components

1. **Frontend (Client-Side)**
   - React wizard interface for character creation
   - Character library management with IndexedDB
   - State management with React Context
   - Character editing and regeneration
   - Local storage for usage tracking and preferences

2. **Backend (Serverless Functions)**
   - Next.js API routes for OpenAI integration
   - Character generation and regeneration endpoints
   - Model selection and tiered usage system
   - Input validation and sanitization
   - Error handling and response formatting

3. **Local Storage**
   - IndexedDB for character library storage
   - Portrait compression and storage
   - Usage limit tracking per model
   - User preferences and settings

4. **External Services**
   - Multiple OpenAI models for text generation
   - Multiple OpenAI models for image generation
   - Vercel for hosting and deployment

## Project Structure

### Directory Organization

The project follows Next.js 14 App Router conventions with a well-organized structure:

```
npc-forge/
├── src/
│   ├── app/                     # Next.js App Router
│   │   ├── api/                 # API routes
│   │   │   ├── generate/        # Character generation endpoint
│   │   │   ├── regenerate/      # Character regeneration endpoint
│   │   │   └── proxy-image/     # Image proxy endpoint
│   │   ├── docs/                # Documentation pages
│   │   ├── library/             # Character library pages
│   │   │   └── edit/[id]/       # Character editing pages
│   │   └── page.tsx             # Homepage with wizard
│   ├── components/              # UI components
│   │   ├── character-wizard.tsx # Main wizard component
│   │   ├── character-library.tsx # Library management
│   │   ├── edit-page/           # Character editing components
│   │   ├── tabs/                # Tab-based components
│   │   ├── ui/                  # Reusable UI components
│   │   └── wizard-steps/        # Individual wizard steps
│   ├── contexts/                # React contexts
│   │   ├── character-context.tsx # Character state management
│   │   └── theme-context.tsx    # Theme/dark mode state
│   └── lib/                     # Utilities and core logic
│       ├── character-storage.ts # IndexedDB operations
│       ├── image-storage.ts     # Portrait storage
│       ├── usage-limits.ts      # Model usage tracking
│       ├── models.ts           # Model configuration
│       ├── openai.ts           # OpenAI API integration
│       └── types.ts            # TypeScript definitions
```

## Frontend Architecture

### Wizard-Based Interface (v0.13.0)

The character creation wizard consists of four main steps:

1. **Concept Step**: Genre selection and description input
2. **Options Step**: Character traits and customization
3. **Model Step**: AI model selection for text and images
4. **Generate Step**: Character generation and results

#### Wizard Components

- `character-wizard.tsx`: Main wizard container
- `wizard-steps/concept-step.tsx`: Genre and description
- `wizard-steps/options-step.tsx`: Character customization
- `wizard-steps/model-step.tsx`: Model selection
- `wizard-steps/results-step.tsx`: Generation results

### Character Library System

#### Storage Architecture

The library uses IndexedDB for reliable local storage:

```typescript
// Database schema
interface CharacterDatabase {
  characters: Character[];          // Character data
  portraits: PortraitData[];       // Compressed images
  metadata: LibraryMetadata;       // Search indices
}

// Storage operations
class CharacterStorage {
  async saveCharacter(character: Character): Promise<void>
  async getCharacter(id: string): Promise<Character>
  async updateCharacter(character: Character): Promise<void>
  async deleteCharacter(id: string): Promise<void>
  async searchCharacters(query: string): Promise<Character[]>
}
```

#### Library Components

- `character-library.tsx`: Main library interface
- `character-card.tsx`: Individual character cards
- `library/filter-panel.tsx`: Search and filtering
- `library/character-viewer-modal.tsx`: Character preview

### Character Editing System

#### Edit Page Architecture

The edit system provides comprehensive character modification:

- **Header Section**: Character name and basic info
- **Portrait Section**: Image management and regeneration
- **Character Traits**: Attribute editing and regeneration
- **Elements Sections**: Quests, dialogue, items management

#### Edit Components

- `edit-page/header-section.tsx`: Name and basic info
- `edit-page/portrait-section.tsx`: Portrait management
- `edit-page/character-traits-section.tsx`: Trait editing
- `edit-page/quests-section.tsx`: Quest management
- `edit-page/dialogue-section.tsx`: Dialogue editing
- `edit-page/items-section.tsx`: Item management

### State Management

#### Character Context

```typescript
interface CharacterContextType {
  // Wizard state
  currentStep: number
  wizardData: WizardFormData
  generatedCharacter: Character | null
  
  // Library state
  savedCharacters: Character[]
  searchQuery: string
  filters: LibraryFilters
  
  // Operations
  generateCharacter: () => Promise<void>
  regenerateAttribute: (attribute: string) => Promise<void>
  saveCharacter: (character: Character) => Promise<void>
  updateCharacter: (character: Character) => Promise<void>
}
```

#### Theme Context

```typescript
interface ThemeContextType {
  isDarkMode: boolean
  toggleDarkMode: () => void
}
```

## Backend Architecture

### API Endpoints

#### Character Generation (`/api/generate`)

```typescript
interface GenerationRequest {
  description: string
  genre?: string
  sub_genre?: string
  // Character traits
  text_model?: string
  image_model?: string
  // Additional options...
}

interface GenerationResponse {
  character: Character
  usage: ModelUsage
}
```

#### Character Regeneration (`/api/regenerate`)

```typescript
interface RegenerationRequest {
  characterData: Character
  regenerationType: 'character' | 'portrait' | 'quest' | 'dialogue' | 'item'
  targetIndex?: number
  questComponent?: 'title' | 'description' | 'reward'
  textModel?: string
  imageModel?: string
}
```

### Model Selection System

#### Tiered Model Architecture

```typescript
interface ModelTier {
  id: string
  name: string
  model: string
  limit: number | null
  cost: number
  description: string
}

const TEXT_MODELS: ModelTier[] = [
  { id: 'standard', model: 'gpt-4o-mini', limit: null },
  { id: 'enhanced', model: 'gpt-4.1-mini', limit: 30 },
  { id: 'premium', model: 'gpt-4o', limit: 10 }
]

const IMAGE_MODELS: ModelTier[] = [
  { id: 'standard', model: 'dall-e-2', limit: null },
  { id: 'enhanced', model: 'dall-e-3', limit: 30 },
  { id: 'premium', model: 'gpt-image-1', limit: 10 }
]
```

#### Usage Tracking

```typescript
interface ModelUsage {
  [modelName: string]: {
    count: number
    monthKey: string
    lastUpdated: string
  }
}

class UsageLimits {
  getModelUsage(modelName: string): UsageData
  canUseModel(modelName: string): boolean
  incrementUsage(modelName: string): void
  resetMonthlyUsage(): void
}
```

## Data Flow

### Character Creation Flow

1. **User Input Collection**
   - Wizard collects data across four steps
   - Form validation at each step
   - Model selection with usage limit checking

2. **Generation Request**
   - Client sends POST to `/api/generate`
   - Server validates and sanitizes input
   - System prompt constructed based on selections

3. **AI Model Interaction**
   - Text generation with selected model
   - Character data parsing and validation
   - Portrait generation with selected image model

4. **Response Processing**
   - Character data returned to client
   - Usage limits updated
   - Character displayed in results step

5. **Library Storage** (Optional)
   - User can save character to library
   - Character and portrait stored in IndexedDB
   - Search indices updated

### Character Regeneration Flow

1. **Regeneration Request**
   - User selects element to regenerate
   - Model selection for regeneration
   - Request sent to `/api/regenerate`

2. **Selective Regeneration**
   - Only specified element is regenerated
   - Original character data preserved
   - New content integrated into character

3. **Update and Storage**
   - Updated character returned
   - Changes reflected in edit interface
   - Library storage updated if saved

## Security Architecture

### Input Security

```typescript
// Input sanitization
function sanitizeUserInput(input: string): string {
  // Remove control characters
  let sanitized = input.replace(/[\u0000-\u001F\u007F-\u009F]/g, '')
  
  // Normalize whitespace
  sanitized = sanitized.replace(/[ \t\v\f]+/g, ' ')
  
  return sanitized.trim()
}
```

### API Security

- Server-side API key storage
- Input validation and sanitization
- Rate limiting through usage tracking
- Error handling without information leakage

### Data Privacy

- No server-side character storage
- Local IndexedDB storage only
- No personal data collection
- Complete user control over data

## Performance Optimizations

### Client-Side Optimizations

1. **IndexedDB Usage**
   - Efficient character storage and retrieval
   - Indexed search capabilities
   - Portrait compression for storage efficiency

2. **Image Handling**
   - Automatic portrait compression
   - Lazy loading of character images
   - Image proxy for CORS handling

3. **State Management**
   - Efficient React Context usage
   - Selective re-rendering with memoization
   - Local state for transient UI state

### API Optimizations

1. **Prompt Engineering**
   - Optimized prompts for token efficiency
   - Model-specific prompt variations
   - Minimal API calls through regeneration

2. **Error Handling**
   - Graceful degradation for failed generations
   - Retry logic for transient failures
   - Fallback options for API issues

## Extensibility

### Plugin Architecture Potential

The architecture supports future extensions:

1. **Model Plugins**: Support for additional AI models
2. **Storage Plugins**: Alternative storage backends
3. **Export Plugins**: Multiple export formats
4. **Game Engine Plugins**: Direct integration support

### API Expansion

The current API structure supports:

1. **Additional Endpoints**: New generation types
2. **Webhook Support**: Real-time updates
3. **Batch Operations**: Multiple character processing
4. **External Integrations**: Third-party service connections

## Development Patterns

### Component Architecture

```typescript
// Component pattern with hooks
function CharacterLibrary() {
  const { characters, searchQuery } = useCharacterContext()
  const [filteredCharacters, setFilteredCharacters] = useState<Character[]>([])
  
  // Search and filter logic
  useEffect(() => {
    const filtered = characters.filter(character =>
      character.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    setFilteredCharacters(filtered)
  }, [characters, searchQuery])
  
  return (
    <div className="character-library">
      {filteredCharacters.map(character => (
        <CharacterCard key={character.id} character={character} />
      ))}
    </div>
  )
}
```

### Error Boundary Pattern

```typescript
class CharacterErrorBoundary extends React.Component {
  state = { hasError: false, error: null }
  
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }
  
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Character generation error:', error, errorInfo)
  }
  
  render() {
    if (this.state.hasError) {
      return <CharacterErrorFallback error={this.state.error} />
    }
    
    return this.props.children
  }
}
```

## Future Architecture Considerations

### Planned Enhancements

1. **Chat Integration** (v0.14.0)
   - WebSocket connections for real-time chat
   - Character personality integration
   - Conversation history storage

2. **User Accounts** (v0.15.0)
   - Authentication system integration
   - Cloud storage synchronization
   - Multi-device character access

3. **Game Integration** (v1.0.0)
   - RESTful API for external access
   - WebHook support for real-time updates
   - SDK for game engine integration

### Scalability Considerations

1. **Serverless Architecture**: Current design scales automatically
2. **Edge Computing**: Potential CDN integration for images
3. **Database Optimization**: Efficient IndexedDB usage patterns
4. **API Rate Limiting**: Server-side enforcement for production

## Related Documentation

- [API Documentation](/docs/api) - Detailed API specifications
- [Model Selection Guide](/docs/models) - Understanding the tier system
- [Character Library Guide](/docs/library) - Library usage and management
- [Development Setup](/docs/dev-setup) - Local development configuration
- [Contributing Guidelines](/docs/contributing) - Architecture contribution standards