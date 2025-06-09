# Architecture Overview

This document provides an overview of NPC Forge's architecture and key components.

## System Architecture

NPC Forge is a Next.js 14 application with a React frontend and serverless API endpoints. It communicates with the OpenAI API for character and portrait generation, with local character storage using IndexedDB. The interactive chat system enables real-time character conversations.

### Key Components

**Frontend (Client-Side)**
• React wizard interface for character creation
• Character library management with IndexedDB
• Interactive chat system with character conversations
• State management with React Context
• Character editing and regeneration
• Local storage for usage tracking

**Backend (Serverless Functions)**
• Next.js API routes for OpenAI integration
• Character generation and regeneration endpoints
• Chat API with character-aware responses
• Model selection and usage tracking
• Input validation and error handling

**Local Storage**
• IndexedDB for character library storage
• IndexedDB for chat conversation storage
• Portrait storage with compression
• Usage limit tracking per model
• User preferences

**External Services**
• OpenAI API for text and image generation
• Vercel for hosting and deployment

## Project Structure

```
npc-forge/
├── src/
│   ├── app/                     # Next.js App Router
│   │   ├── api/                 # API routes
│   │   │   ├── chat/            # Character conversation endpoint
│   │   │   ├── generate/        # Character generation endpoint
│   │   │   ├── regenerate/      # Character regeneration endpoint
│   │   │   └── proxy-image/     # Image proxy endpoint
│   │   ├── chat/                # Chat interface pages
│   │   │   └── [characterId]/   # Dynamic chat page
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
│   │   ├── chat-context.tsx    # Chat state management
│   │   └── theme-context.tsx    # Theme/dark mode state
│   └── lib/                     # Utilities and core logic
│       ├── character-storage.ts # IndexedDB character operations
│       ├── chat-storage.ts     # IndexedDB chat operations
│       ├── chat-types.ts       # Chat type definitions
│       ├── models.ts           # Model configuration
│       ├── openai.ts           # OpenAI API integration
│       └── types.ts            # TypeScript definitions
```

## Frontend Architecture

### Wizard-Based Interface

The character creation wizard consists of four main steps:

1. **Concept Step**: Genre selection and description input
2. **Options Step**: Character traits and customization
3. **Model Step**: AI model selection for text and images
4. **Generate Step**: Character generation and results

### Chat System Architecture

#### Chat Interface Components

• **Chat Page**: `/chat/[characterId]` - Main conversation interface
• **Chat Context**: React context for chat state management
• **Chat Storage**: IndexedDB integration for conversation persistence
• **Chat API**: Server-side conversation handling

#### Chat Data Flow

1. **Session Initialization**: Load character and get/create chat session
2. **Message Composition**: User types message with validation
3. **API Request**: Send message to `/api/chat` with character context
4. **AI Processing**: OpenAI generates character-aware response
5. **Response Storage**: Save conversation to IndexedDB
6. **UI Update**: Display response with proper formatting

### Character Library System

#### Storage Architecture

The library uses IndexedDB for local storage:
• Character data with trait indexing
• Compressed portrait images
• Chat conversation sessions per character
• Search indices and trait categories
• Automatic trait discovery for filtering

#### Enhanced Filtering

• Comprehensive trait filtering with dropdown filters
• Automatic filter generation from character data
• Smart search with "category: value" syntax
• Organized filter panel with collapsible sections

### Character Editing System

The edit system provides character modification:
• Individual attribute regeneration
• Portrait management and regeneration
• Quest, dialogue, and item editing
• Model selection for regeneration

## Backend Architecture

### API Endpoints

#### Character Generation (`/api/generate`)

Handles character creation requests with:
• Input validation and sanitization
• Model selection and API calls to OpenAI
• Character data processing and formatting
• Portrait generation with selected image models

#### Character Regeneration (`/api/regenerate`)

Supports selective character updates:
• Individual attribute regeneration
• Component-level regeneration (quests, dialogue, items)
• Model switching for regeneration
• Maintaining character data consistency

#### Chat API (`/api/chat`)

Handles character conversations with:
• Character context system prompts
• Dynamic response length adjustment
• Recent conversation history management
• Usage limit integration
• Error handling with automatic retry logic

### Chat System Architecture

#### System Prompt Generation

• Combines character name, appearance, personality, backstory
• Includes selected and generated character traits
• Maintains character consistency instructions
• Filters out technical metadata

#### Response Length Management

• **Simple greetings** (< 20 chars): 150 tokens
• **Medium questions** (20-100 chars): 200-350 tokens
• **Detailed requests** (> 100 chars): 600 tokens
• **Maximum cap**: 800 tokens with automatic retry for cutoff

#### Context Management

• Recent conversation context (last 15 messages)
• System message with character details
• Message role tracking (user/assistant/system)
• Conversation trimming (100 message limit per session)

### Model Selection System

#### Tiered Model Architecture

**Text Models (including chat):**
• gpt-4o-mini (Standard): 50 generations/month
• gpt-4.1-mini (Enhanced): 30 generations/month
• gpt-4o (Premium): 10 generations/month

**Image Models:**
• dall-e-2 (Standard): 10 generations/month
• dall-e-3 (Enhanced): 5 generations/month
• gpt-image-1 (Premium): 3 generations/month

#### Usage Tracking

Client-side tracking with monthly limits:
• Per-model usage counts
• Monthly reset on the 1st
• Local storage persistence
• Development mode bypass
• Chat integration with text model limits

## Data Flow

### Character Creation Flow

1. **User Input Collection**: Wizard collects data across four steps
2. **Generation Request**: Client sends POST to `/api/generate`
3. **AI Model Interaction**: Server calls OpenAI API with selected models
4. **Response Processing**: Character data returned and displayed
5. **Library Storage**: Optional save to local IndexedDB

### Chat Conversation Flow

1. **Chat Initialization**: Load character and create/get chat session
2. **Message Input**: User types message with length validation
3. **Usage Check**: Verify monthly limits before API call
4. **Context Preparation**: Create system prompt and conversation history
5. **API Request**: Send to `/api/chat` with character data
6. **Response Generation**: OpenAI generates character-aware response
7. **Response Processing**: Handle cutoff detection and retry logic
8. **Storage Update**: Save messages to IndexedDB
9. **UI Update**: Display response with proper formatting

### Character Regeneration Flow

1. **Regeneration Request**: User selects element to regenerate
2. **Selective Regeneration**: Only specified element is updated
3. **Update and Storage**: Updated character returned and saved

## Security Architecture

### Input Security

• Input sanitization and validation
• Protection against malicious inputs
• Content filtering through OpenAI moderation
• Message length limits (1000 characters for chat)

### API Security

• Server-side API key storage
• Rate limiting through usage tracking
• Error handling without information leakage
• 60-second timeout for chat requests

### Data Privacy

• Local-only character and chat storage
• No server-side data collection
• Complete user control over data
• IndexedDB encryption by browser

## Performance Optimizations

### Client-Side Optimizations

• IndexedDB for efficient character and chat storage
• Portrait compression for storage efficiency
• Trait indexing for fast filtering
• Lazy loading of character data
• Message pagination for large conversations

### API Optimizations

• Optimized prompts for token efficiency
• Model-specific configurations
• Retry logic for transient failures
• Dynamic response length adjustment
• Graceful error handling

## Storage Architecture

### IndexedDB Implementation

**Character Storage:**
• Reliable local storage for characters and portraits
• Trait indexing for filtering performance
• Automatic compression for images
• Database recovery and error handling

**Chat Storage:**
• Per-character conversation sessions
• Message history with automatic trimming
• System prompt persistence
• Conversation context management

### Filtering System

• Dynamic filter generation from character data
• Efficient trait categorization and search
• Real-time filtering with optimized queries
• Collapsible interface for organization

## Chat System Implementation Details

### Conversation Management

• **Session Creation**: Automatic session creation per character
• **Message Threading**: Chronological message storage
• **Context Limits**: 15 recent messages for API context
• **Storage Limits**: 100 messages per session with automatic trimming

### Error Handling

• **Rate Limit Detection**: Automatic retry suggestions
• **Quota Management**: Integration with existing usage system
• **Network Issues**: Retry functionality with user feedback
• **Response Validation**: Cutoff detection and automatic retry

### User Experience

• **Real-time Messaging**: Instant message display
• **Loading States**: Visual feedback during AI generation
• **Character Consistency**: Personality maintenance across conversations
• **Mobile Optimization**: Responsive chat interface

## Related Documentation

• [API Documentation](/docs/api) - Detailed API specifications
• [Model Selection Guide](/docs/models) - Understanding the tier system
• [Chat with Characters](/docs/chat) - Chat system usage guide
• [Character Library Guide](/docs/library) - Library usage and filtering
• [Development Setup](/docs/dev-setup) - Local development configuration