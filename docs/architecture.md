# Architecture Overview

This document provides an overview of NPC Forge's architecture, explaining the key components and how they interact.

## System Architecture

NPC Forge is a Next.js application with a React frontend and serverless API endpoints. It's designed to work as a client-side application that communicates with the OpenAI API for character generation.


### Key Components

1. **Frontend (Client-Side)**
   - React components for user interface
   - Form handling for character options
   - State management with React Context
   - Character display and rendering
   - Local storage for usage tracking

2. **Backend (Serverless Functions)**
   - Next.js API routes for OpenAI integration
   - Character generation logic
   - Portrait generation logic
   - Input validation and sanitization
   - Error handling

3. **External Services**
   - OpenAI API for text generation (GPT-4o-mini)
   - OpenAI API for image generation (DALL-E 3)

## Component Structure

### Frontend Components

The application is organized into reusable components located in the `/src/components/` directory:

- **Main Components**
  - `CharacterDisplay.tsx`: Renders generated characters
  - `MainFormTabs.tsx`: Manages the form tabs for character creation
  - `PortraitDisplay.tsx`: Handles displaying character portraits
  - `UsageLimitsNotice.tsx`: Shows usage limit information

- **Tab Components**
  - `CharacterTab.tsx`: Core character options
  - `QuestsTab.tsx`: Quest generation options
  - `DialogueTab.tsx`: Dialogue generation options
  - `ItemsTab.tsx`: Item generation options

- **UI Components**
  - `Button.tsx`: Reusable button component
  - `Select.tsx`: Dropdown select component
  - `SearchableSelect.tsx`: Enhanced select with search functionality
  - `TabInterface.tsx`: Tabbed interface component
  - `ExpandableSection.tsx`: Collapsible section component

- **Documentation Components**
  - `DocsSidebar.tsx`: Documentation navigation sidebar
  - `DocsNavigation.tsx`: Breadcrumb navigation for docs

### State Management

NPC Forge uses React Context for state management:

- `CharacterContext.tsx`: Manages character generation state including:
  - Form data for all character options
  - Generated character data
  - Loading and error states
  - Methods for character generation and export

### API Structure

API endpoints are located in the `/src/app/api/` directory:

- `/api/generate/route.ts`: Handles character generation requests
  - Validates input data
  - Constructs prompts for OpenAI
  - Processes and returns generated character data

## Data Flow

1. **User Input Collection**
   - User selects genre, traits, and other options
   - Form data is managed through the CharacterContext
   - All options are consolidated when generation is triggered

2. **Character Generation Request**
   - Client sends a POST request to the `/api/generate` endpoint
   - The request includes all form data needed for generation
   - Server-side validation checks input data

3. **OpenAI API Interaction**
   - Server constructs a system prompt based on user selections
   - GPT-4o-mini generates the character text content
   - Character data is parsed and validated

4. **Portrait Generation (if successful)**
   - Character data is used to generate a portrait prompt
   - DALL-E 3 creates an image based on character descriptions
   - Portrait URL is added to the character data

5. **Response and Display**
   - Complete character data is returned to the client
   - Character is displayed with tabs for different sections
   - User can download the character as JSON

## Key Files and Directories

```
npc-forge/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── generate/
│   │   │       └── route.ts  # API endpoint for generation
│   │   ├── docs/             # Documentation pages
│   │   ├── page.tsx          # Main application page
│   │   └── layout.tsx        # Root layout with global elements
│   ├── components/           # UI components
│   │   ├── (various files)   # Individual components
│   │   ├── tabs/             # Tab components
│   │   └── ui/               # Reusable UI components
│   ├── contexts/
│   │   └── character-context.tsx  # State management
│   └── lib/                  # Utilities and core logic
│       ├── openai.ts         # OpenAI API integration
│       ├── templates.ts      # Character templates
│       ├── types.ts          # TypeScript type definitions
│       ├── usage-limits.ts   # Usage limit tracking
│       └── utils.ts          # Utility functions
├── public/                   # Static assets
├── docs/                     # Documentation (Markdown)
└── (config files)            # Various configuration files
```

## Core Libraries and Dependencies

NPC Forge relies on several key libraries:

- **Next.js**: React framework for both frontend and API routes
- **React**: UI library for building the interface
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **OpenAI**: SDK for API integration
- **Lucide React**: SVG icon components

## Performance Considerations

NPC Forge includes several optimizations:

1. **Efficient API Usage**
   - Uses GPT-4o-mini to balance quality and cost
   - Carefully constructed prompts to minimize token usage
   - Validation to prevent unnecessary API calls

2. **Client-Side Optimizations**
   - Lazy loading of components when appropriate
   - Optimized image loading for portraits
   - Responsive design for different devices

3. **Error Handling**
   - Graceful fallbacks for API failures
   - Portrait generation is isolated from character generation
   - Informative error messages for users

## Security Considerations

The application includes several security measures:

1. **Input Validation**
   - All user inputs are validated before processing
   - Sanitization to prevent malicious inputs
   - Rate limiting through usage quotas

2. **API Security**
   - Environment variables for API keys
   - Server-side API calls to protect credentials
   - Content filtering through OpenAI's moderation

3. **Data Privacy**
   - No server-side storage of generated characters
   - Local storage for usage tracking only
   - No personal data collection

## Future Architecture Considerations

Future versions of NPC Forge may include:

1. **Database Integration**
   - Character storage and library features
   - User accounts and authentication
   - Shared character collections

2. **Enhanced Caching**
   - CDN caching for static assets
   - Caching strategies for repeated requests
   - Performance metrics and optimization

3. **Additional Services**
   - Voice synthesis integration
   - Game engine export formats
   - Character relationship mapping

For more detailed information about the codebase, see the [API Documentation](api.md) and [Contributing Guidelines](contributing.md).