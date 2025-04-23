# Architecture Overview

This document provides an overview of NPC Forge's architecture, explaining the key components and how they interact to create AI-powered character generation for game developers and storytellers.

## System Architecture

NPC Forge is a Next.js 14 application with a React frontend and serverless API endpoints. It's designed to work primarily as a client-side application that communicates with the OpenAI API for character and portrait generation, with key business logic handled in API routes.

### Key Components

1. **Frontend (Client-Side)**
   - React components for tabbed interface
   - Form handling for character customization
   - State management with React Context
   - Character display and rendering
   - Local storage for usage tracking
   - Welcome guide onboarding flow

2. **Backend (Serverless Functions)**
   - Next.js API routes for OpenAI integration
   - Character generation prompt engineering
   - Portrait generation with DALL-E 3
   - Input validation and sanitization
   - Prompt injection protection
   - Error handling and response formatting

3. **External Services**
   - OpenAI API for text generation (GPT-4o-mini)
   - OpenAI API for image generation (DALL-E 3)
   - Vercel for hosting and deployment

## Project Structure

### Directory Organization

The project follows Next.js 14 App Router conventions with a well-organized structure:

- **Source Code**
  - `/src/app/` - Pages and API routes
  - `/src/components/` - UI components
  - `/src/contexts/` - React Context providers
  - `/src/lib/` - Utilities and core logic

- **Documentation**
  - `/docs/` - Markdown documentation
  - `/docs/images/` - Documentation visuals
  - `/docs/examples/` - Example character JSON
  - `/release-notes/` - Version history

### Frontend Components

The application is organized into reusable components located in the `/src/components/` directory:

- **Core Components**
  - `character-display.tsx`: Renders generated characters
  - `main-form-tabs.tsx`: Manages the form tabs for character creation
  - `portrait-display.tsx`: Handles displaying character portraits
  - `character-form.tsx`: Form for character creation options
  - `usage-limits-notice.tsx`: Shows usage limit information
  - `welcome-guide.tsx`: Onboarding for new users
  - `template-selector.tsx`: Preset character templates

- **Tab Components**
  - `/tabs/character-tab.tsx`: Core character options
  - `/tabs/dialogue-tab.tsx`: Dialogue generation options
  - `/tabs/items-tab.tsx`: Item generation options
  - `/tabs/quests-tab.tsx`: Quest generation options
  - `/tabs/portrait-options.tsx`: Portrait generation settings
  - `/tabs/display/profile-tab.tsx`: Displays character profile
  - `/tabs/display/dialogue-display-tab.tsx`: Shows generated dialogue

### State Management

NPC Forge uses React Context for state management:

- `/src/contexts/character-context.tsx`: Manages character generation state including:
  - Form data for all character options
  - Generated character data
  - Loading and error states
  - Methods for character generation and export
  - Genre and sub-genre selections
  - Usage limit tracking

### API Structure

API endpoints are located in the `/src/app/api/` directory:

- `/src/app/api/generate/route.ts`: Handles character generation requests
  - Validates input data
  - Constructs prompts for GPT-4o-mini
  - Generates portrait descriptions for DALL-E 3
  - Ensures sanitized response formatting
  - Handles API errors and retry logic

## Core Libraries and Utilities

The `/src/lib/` directory contains essential utility modules:

- `/src/lib/openai.ts`: API client wrappers for GPT and DALL-E integration
- `/src/lib/templates.ts`: Prompt templates and default examples
- `/src/lib/types.ts`: Shared TypeScript type definitions
- `/src/lib/usage-limits.ts`: Quota tracking logic using localStorage
- `/src/lib/utils.ts`: General helper functions (formatting, validation)

## Data Flow

1. **User Input Collection**
   - User selects genre, traits, and other options across tabbed interface
   - Form data is managed through the CharacterContext
   - All options are consolidated when generation is triggered

2. **Character Generation Request**
   - Client sends a POST request to the `/api/generate` endpoint with form data
   - The request includes all form data needed for generation
   - Server-side validation checks input data
   - Usage limits are checked (15 generations/month)

3. **OpenAI API Interaction**
   - Server constructs a system prompt based on user selections
   - GPT-4o-mini generates the character text content
   - Character data is parsed and validated for structure

4. **Portrait Generation (if successful)**
   - Character data is used to generate a detailed portrait prompt
   - DALL-E 3 creates an image based on character descriptions with styling cues
   - Portrait URL is added to the character data

5. **Response and Display**
   - Complete character data is returned to the client
   - Character is displayed with tabs for different sections
   - User can view the character in the tabbed UI

6. **Usage Tracking**
   - Generation count is updated in localStorage
   - Visual indicators show remaining generations
   - Warnings displayed when approaching limits

## Detailed Project Structure

```
npc-forge/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── generate/
│   │   │       └── route.ts          # API endpoint for generation
│   │   ├── docs/                     # Documentation pages
│   │   │   └── [various pages]       # Individual doc pages
│   │   ├── globals.css               # Global styles
│   │   ├── layout.tsx                # Root layout
│   │   ├── manifest.ts               # PWA manifest
│   │   └── page.tsx                  # Main application page
│   ├── components/
│   │   ├── character-card.tsx        # Character summary card
│   │   ├── character-display.tsx     # Character display component
│   │   ├── character-form.tsx        # Form for character creation
│   │   ├── docs-navigation.tsx       # Documentation navigation
│   │   ├── docs-sidebar.tsx          # Documentation sidebar
│   │   ├── json-viewer.tsx           # JSON formatting display
│   │   ├── main-form-tabs.tsx        # Tab container for form
│   │   ├── portrait-display.tsx      # Portrait image display
│   │   ├── template-selector.tsx     # Character template picker
│   │   ├── usage-limit-display.tsx   # Shows usage metrics
│   │   ├── usage-limits-notice.tsx   # Usage warning display
│   │   ├── welcome-guide.tsx         # Onboarding component
│   │   ├── ui/                       # Reusable UI components
│   │   │   └── [various components]  # Buttons, inputs, etc.
│   │   └── tabs/                     # Tab components
│   │       ├── character-tab.tsx     # Character options tab
│   │       ├── dialogue-tab.tsx      # Dialogue options tab
│   │       ├── items-tab.tsx         # Items options tab
│   │       ├── quests-tab.tsx        # Quests options tab
│   │       ├── portrait-options.tsx  # Portrait settings
│   │       └── display/              # Result display tabs
│   │           └── [various tabs]    # Result display components
│   ├── contexts/
│   │   └── character-context.tsx     # Main state management
│   └── lib/
│       ├── openai.ts                 # OpenAI API integration
│       ├── templates.ts              # Character templates
│       ├── types.ts                  # TypeScript definitions
│       ├── usage-limits.ts           # Usage tracking logic
│       └── utils.ts                  # Utility functions
├── public/                           # Static assets
│   ├── images/                       # Documentation images
│   ├── icons/                        # App icons
│   └── [various files]               # Favicons, etc.
├── docs/                             # Documentation markdown
│   ├── images/                       # Documentation images
│   ├── examples/                     # Example character JSON
│   └── [various markdown files]      # Documentation content
└── [config files]                    # Configuration files
```

## Security Considerations

The application includes several security measures:

1. **Input Validation and Sanitization**
   - All user inputs are validated before processing
   - Sanitization to prevent malicious inputs
   - Input formatting to prevent prompt injection attacks

2. **API Security**
   - Environment variables for API keys
   - Server-side API calls to protect credentials
   - Content filtering through OpenAI's moderation

3. **Usage Limiting**
   - Client-side usage tracking (15 generations/month)
   - Visual indicators for remaining usage
   - Prevents excessive API consumption

4. **Error Handling**
   - Graceful error handling with user feedback
   - Structured response validation
   - Fallback mechanisms for API failures

5. **Data Privacy**
   - No server-side storage of generated characters
   - Local storage for usage tracking only
   - No personal data collection

## Core Libraries and Dependencies

NPC Forge relies on several key libraries:

- **Next.js 14**: React framework with App Router
- **React**: UI library with hooks for state management
- **TypeScript**: Type-safe JavaScript development
- **Tailwind CSS**: Utility-first CSS framework
- **OpenAI**: SDK for API integration (GPT-4o-mini and DALL-E 3)
- **Lucide React**: SVG icon components

## Performance Considerations

NPC Forge includes several optimizations:

1. **Efficient API Usage**
   - Uses GPT-4o-mini to balance quality and cost
   - Carefully constructed prompts to minimize token usage
   - Validation to prevent unnecessary API calls

2. **Client-Side Optimizations**
   - Responsive design for different devices
   - Optimized image loading for portraits
   - Progressive form unlock flow

3. **Error Handling**
   - Graceful fallbacks for API failures
   - Portrait generation is isolated from character generation
   - Informative error messages for users

## Future Architecture Considerations

Future versions of NPC Forge may include:

1. **Character Library (v0.3.0)**
   - Save/load from localStorage
   - Rename/delete characters
   - Export/import character files
   - Share links

2. **User Interaction (v0.4.0)**
   - "Talk to NPC" chat functionality
   - Character personality in system prompt
   - Chat usage limits and tracking

3. **Full Release Features (v1.0.0)**
   - Server-side usage validation
   - Game engine exports (Unity, Unreal, JSON)
   - TTRPG support (D&D 5e, Pathfinder)
   - Relationship mapping (NPC connection graph)

For more detailed information about the codebase, see the [API Documentation](/docs/api), [Prompt Engineering](/docs/prompts), and [Development Roadmap](/docs/roadmap).