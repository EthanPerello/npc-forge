# Architecture Overview

This document provides an overview of NPC Forge's architecture and key components.

## System Architecture

NPC Forge is a Next.js 14 application with a React frontend and serverless API endpoints. It communicates with the OpenAI API for character and portrait generation, with local character storage using IndexedDB.

### Key Components

1. **Frontend (Client-Side)**
   - React wizard interface for character creation
   - Character library management with IndexedDB
   - State management with React Context
   - Character editing and regeneration
   - Local storage for usage tracking

2. **Backend (Serverless Functions)**
   - Next.js API routes for OpenAI integration
   - Character generation and regeneration endpoints
   - Model selection and usage tracking
   - Input validation and error handling

3. **Local Storage**
   - IndexedDB for character library storage
   - Portrait storage with compression
   - Usage limit tracking per model
   - User preferences

4. **External Services**
   - OpenAI API for text and image generation
   - Vercel for hosting and deployment

## Project Structure

```
npc-forge/
├── src/
│   ├── app/                     # Next.js App Router
│   │   ├── api/                 # API routes
│   │   ├── docs/                # Documentation pages
│   │   ├── library/             # Character library pages
│   │   └── page.tsx             # Homepage with wizard
│   ├── components/              # UI components
│   │   ├── character-wizard.tsx # Main wizard component
│   │   ├── edit-page/           # Character editing components
│   │   ├── tabs/                # Tab-based components
│   │   ├── ui/                  # Reusable UI components
│   │   └── wizard-steps/        # Individual wizard steps
│   ├── contexts/                # React contexts
│   │   ├── character-context.tsx # Character state management
│   │   └── theme-context.tsx    # Theme/dark mode state
│   └── lib/                     # Utilities and core logic
│       ├── character-storage.ts # IndexedDB operations
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

### Character Library System

#### Storage Architecture

The library uses IndexedDB for local storage:
- Character data with trait indexing
- Compressed portrait images
- Search indices and trait categories
- Automatic trait discovery for filtering (v0.18.0)

#### Enhanced Filtering (v0.18.0)

- Comprehensive trait filtering with dropdown filters
- Automatic filter generation from character data
- Smart search with "category: value" syntax
- Organized filter panel with collapsible sections

### Character Editing System

The edit system provides character modification:
- Individual attribute regeneration
- Portrait management and regeneration  
- Quest, dialogue, and item editing
- Model selection for regeneration

## Backend Architecture

### API Endpoints

#### Character Generation (`/api/generate`)

Handles character creation requests with:
- Input validation and sanitization
- Model selection and API calls to OpenAI
- Character data processing and formatting
- Portrait generation with selected image models

#### Character Regeneration (`/api/regenerate`)

Supports selective character updates:
- Individual attribute regeneration
- Component-level regeneration (quests, dialogue, items)
- Model switching for regeneration
- Maintaining character data consistency

### Model Selection System

#### Tiered Model Architecture

**Text Models:**
- gpt-4o-mini (Standard): 50 generations/month
- gpt-4.1-mini (Enhanced): 30 generations/month
- gpt-4o (Premium): 10 generations/month

**Image Models:**
- dall-e-2 (Standard): 10 generations/month
- dall-e-3 (Enhanced): 5 generations/month
- gpt-image-1 (Premium): 3 generations/month

#### Usage Tracking

Client-side tracking with monthly limits:
- Per-model usage counts
- Monthly reset on the 1st
- Local storage persistence
- Development mode bypass

## Data Flow

### Character Creation Flow

1. **User Input Collection**: Wizard collects data across four steps
2. **Generation Request**: Client sends POST to `/api/generate`
3. **AI Model Interaction**: Server calls OpenAI API with selected models
4. **Response Processing**: Character data returned and displayed
5. **Library Storage**: Optional save to local IndexedDB

### Character Regeneration Flow

1. **Regeneration Request**: User selects element to regenerate
2. **Selective Regeneration**: Only specified element is updated
3. **Update and Storage**: Updated character returned and saved

## Security Architecture

### Input Security
- Input sanitization and validation
- Protection against malicious inputs
- Content filtering through OpenAI moderation

### API Security
- Server-side API key storage
- Rate limiting through usage tracking
- Error handling without information leakage

### Data Privacy
- Local-only character storage
- No server-side data collection
- Complete user control over data

## Performance Optimizations

### Client-Side Optimizations
- IndexedDB for efficient character storage
- Portrait compression for storage efficiency
- Trait indexing for fast filtering
- Lazy loading of character data

### API Optimizations
- Optimized prompts for token efficiency
- Model-specific configurations
- Retry logic for transient failures
- Graceful error handling

## Storage Architecture

### IndexedDB Implementation
- Reliable local storage for characters and portraits
- Trait indexing for filtering performance
- Automatic compression for images
- Database recovery and error handling

### Filtering System (v0.18.0)
- Dynamic filter generation from character data
- Efficient trait categorization and search
- Real-time filtering with optimized queries
- Collapsible interface for organization

## Related Documentation

- [API Documentation](/docs/api) - Detailed API specifications
- [Model Selection Guide](/docs/models) - Understanding the tier system
- [Character Library Guide](/docs/library) - Library usage and filtering
- [Development Setup](/docs/dev-setup) - Local development configuration