# Architecture Overview

This document provides an overview of NPC Forge's architecture and key components.

## System Architecture

NPC Forge is a Next.js 14 application with a React frontend and serverless API endpoints. It communicates with the OpenAI API for character and portrait generation, chat conversations, and portrait editing, with local character storage using IndexedDB. The interactive chat system enables real-time character conversations, and the portrait editing system allows AI-powered image modifications.

### Key Components

**Frontend (Client-Side)**
• React wizard interface for character creation
• Character library management with IndexedDB
• Interactive chat system with character conversations
• AI-powered portrait editing interface
• Advanced trait management system
• State management with React Context
• Character editing and regeneration
• Local storage for usage tracking

**Backend (Serverless Functions)**
• Next.js API routes for OpenAI integration
• Character generation and regeneration endpoints
• Chat API with character-aware responses
• Portrait editing API with image modification capabilities
• Trait generation and management endpoints
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
• OpenAI API for chat conversations
• OpenAI Images API for portrait editing
• Vercel for hosting and deployment

## Project Structure

```
npc-forge/
├── src/
│   ├── app/                     # Next.js App Router
│   │   ├── api/                 # API routes
│   │   │   ├── chat/            # Character conversation endpoint
│   │   │   ├── edit-portrait/   # Portrait editing endpoint
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
│   │   │   ├── portrait-section.tsx # Portrait editing interface
│   │   │   └── additional-traits-section.tsx # Trait management
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

### Portrait Editing System

#### Portrait Editing Components

• **Portrait Section**: Enhanced portrait management interface in character edit page
• **Edit Interface**: Text prompt input with model compatibility checking
• **Edit API Integration**: Client-side calls to `/api/edit-portrait` endpoint
• **Model Validation**: Ensures compatible models are selected for editing

#### Portrait Editing Data Flow

1. **Edit Initiation**: User clicks "Edit Portrait" button in character edit interface
2. **Validation**: Check character has existing portrait and compatible model selected
3. **Prompt Input**: User enters text description of desired changes
4. **API Request**: Send character data and edit prompt to `/api/edit-portrait`
5. **Image Processing**: OpenAI processes image editing request
6. **Result Display**: Updated portrait appears in character interface
7. **Save Integration**: Edited portrait saved with character data

### Advanced Trait Management

#### Trait Management Components

• **Additional Traits Section**: Comprehensive trait editing interface
• **Trait Generation**: AI-powered trait creation with individual controls
• **Trait Display**: Standardized formatting and organization
• **Trait Regeneration**: Individual trait regeneration with dedicated buttons

#### Trait Management Data Flow

1. **Trait Display**: Load and display existing character traits
2. **Trait Addition**: User adds custom traits or requests AI generation
3. **API Integration**: Generate new traits via `/api/regenerate` endpoint
4. **Trait Editing**: User modifies trait names and values
5. **Trait Regeneration**: Individual traits regenerated with AI assistance
6. **Trait Organization**: Smart filtering and formatting for display

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
• Portrait management, regeneration, and editing
• Advanced trait management with AI assistance
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

Supports selective character updates including:
• Individual attribute regeneration
• Component-level regeneration (quests, dialogue, items)
• Trait generation and regeneration
• Model switching for regeneration
• Maintaining character data consistency

#### Portrait Editing (`/api/edit-portrait`)

Handles AI-powered portrait modifications with:
• Image editing via OpenAI's `/v1/images/edits` endpoint
• Text prompt processing and validation
• Model compatibility checking (gpt-image-1 recommended)
• Image size and format validation
• Usage limit integration with image models

#### Chat API (`/api/chat`)

Handles character conversations with:
• Character context system prompts
• Dynamic response length adjustment
• Recent conversation history management
• Usage limit integration
• Error handling with automatic retry logic

### Portrait Editing System Architecture

#### API Implementation

• **Endpoint**: `/api/edit-portrait` handles all portrait editing requests
• **Model Support**: Validates compatible models (gpt-image-1 recommended)
• **Image Processing**: Converts character portrait data for OpenAI API
• **Prompt Validation**: Ensures edit prompts meet model requirements
• **Error Handling**: Comprehensive error categorization and user feedback

#### Image Processing Pipeline

1. **Input Validation**: Verify character has existing portrait and valid edit prompt
2. **Model Compatibility**: Check selected model supports editing operations
3. **Usage Verification**: Ensure monthly limits haven't been exceeded
4. **Image Conversion**: Convert portrait data to format required by OpenAI API
5. **API Request**: Send editing request to OpenAI with character portrait and prompt
6. **Response Processing**: Handle edited image data and update character
7. **Usage Tracking**: Increment usage count for successful edits

#### Error Handling

• **Model Compatibility**: Clear warnings for unsupported models
• **Usage Limits**: Integration with existing usage tracking system
• **Network Issues**: Retry logic for temporary connectivity problems
• **Validation Errors**: Specific feedback for prompt and image issues

### Trait Management System Architecture

#### API Integration

• **Regeneration Endpoint**: Enhanced `/api/regenerate` supports trait operations
• **Trait Generation**: New `add_single_trait` and `additional_traits` operations
• **Individual Regeneration**: Supports `regenerate_trait_[key]` operations
• **Validation**: Ensures generated traits meet formatting requirements

#### Trait Processing Pipeline

1. **Trait Request**: User requests new trait generation or regeneration
2. **Context Preparation**: Include character data for appropriate trait generation
3. **AI Generation**: Call OpenAI with trait-specific prompts
4. **Validation**: Ensure generated traits meet length and format requirements
5. **Integration**: Add traits to character data with proper formatting
6. **Display**: Update UI with new traits in standardized format

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

**Text Models (including chat and trait generation):**
• gpt-4o-mini (Standard): 50 generations/month
• gpt-4.1-mini (Enhanced): 30 generations/month
• gpt-4o (Premium): 10 generations/month

**Image Models (including portrait editing):**
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
• Portrait editing integration with image model limits

## Data Flow

### Character Creation Flow

1. **User Input Collection**: Wizard collects data across four steps
2. **Generation Request**: Client sends POST to `/api/generate`
3. **AI Model Interaction**: Server calls OpenAI API with selected models
4. **Response Processing**: Character data returned and displayed
5. **Library Storage**: Optional save to local IndexedDB

### Portrait Editing Flow

1. **Edit Initiation**: User selects "Edit Portrait" from character edit interface
2. **Validation**: Verify character has portrait and compatible model selected
3. **Prompt Input**: User enters text description of desired changes
4. **API Request**: Send character and edit prompt to `/api/edit-portrait`
5. **Image Processing**: OpenAI processes image editing request
6. **Response Handling**: Updated portrait data returned to client
7. **Character Update**: Client updates character with new portrait
8. **Storage**: Edited character saved to IndexedDB

### Trait Management Flow

1. **Trait Request**: User requests new trait generation or regeneration
2. **API Call**: Send trait generation request to `/api/regenerate`
3. **AI Processing**: OpenAI generates trait based on character context
4. **Validation**: Ensure generated trait meets formatting requirements
5. **Integration**: Add trait to character data structure
6. **Display Update**: Update UI with new trait in standardized format
7. **Storage**: Save updated character with new traits

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
• Edit prompt validation and sanitization

### API Security

• Server-side API key storage
• Rate limiting through usage tracking
• Error handling without information leakage
• 60-second timeout for chat requests
• 120-second timeout for portrait editing

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

### Portrait Editing Optimizations

• Image size validation before processing
• Efficient image format conversion
• Caching of original portraits
• Incremental editing workflow
• Model-specific optimization

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
• Trait categorization and search
• Real-time filtering with optimized queries
• Collapsible interface for organization

## Enhanced Error Handling

### JSON Parsing Improvements

• Multiple fallback strategies for malformed AI responses
• Enhanced parsing for responses with trailing commas
• Content cleaning for incomplete formatting
• Graceful degradation when parsing fails

### API Reliability

• Request size validation and payload cleaning
• Automatic retry logic with exponential backoff
• Enhanced error categorization for better user feedback
• Usage limit checking with graceful fallbacks

## Related Documentation

• [API Documentation](/docs/api) - Detailed API specifications including portrait editing
• [Model Selection Guide](/docs/models) - Understanding the tier system and editing capabilities
• [Chat with Characters](/docs/chat) - Chat system usage guide
• [Character Library Guide](/docs/library) - Library usage, filtering, and trait management
• [Generation Options](/docs/generation-options) - Including portrait editing options
• [Development Setup](/docs/dev-setup) - Local development configuration