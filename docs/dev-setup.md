# Development Setup

This guide will help you set up NPC Forge for local development.

## Prerequisites

Before you begin, ensure you have:

• **Node.js** (v18 or newer)
• **npm** (v7 or newer)
• **Git**
• **OpenAI API key** (for development including portrait editing features)

## Setting Up the Development Environment

### 1. Clone the Repository

```bash
git clone https://github.com/EthanPerello/npc-forge.git
cd npc-forge
```

### 2. Install Dependencies

```bash
npm install
```

This installs all necessary dependencies including:
• Next.js 14
• React
• TypeScript
• TailwindCSS
• Lucide React (for icons)
• OpenAI SDK

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory:

```
OPENAI_API_KEY=your_api_key_here
```

> **Note**: Never commit your `.env.local` file to version control! It's already included in `.gitignore`.

### 4. Start the Development Server

```bash
npm run dev
```

This starts the development server at [http://localhost:3000](http://localhost:3000).

## Understanding Development Mode

### Usage Limit Bypass

In development mode, the app may bypass usage limits for testing purposes.

### Character Library

The character library works fully in development mode:
• Characters are saved to IndexedDB in your browser
• All editing and regeneration features are available
• Example characters are pre-loaded for testing
• Chat conversations are fully functional and persistent

### Portrait Editing Features

Portrait editing functionality is available in development mode:
• Edit existing character portraits using text prompts
• Test with different AI models (gpt-image-1 recommended)
• Validate edit prompt processing and error handling
• Test usage limit integration

### Trait Management Features

Trait management features are available in development mode:
• Generate new character traits using AI
• Test individual trait regeneration
• Validate trait formatting and display consistency
• Test integration with existing character data

## Project Structure

Key directories and files:

```
npc-forge/
├── public/                  # Static assets
│   ├── images/              # Application images
│   └── icons/               # App icons and PWA assets
├── src/                     # Source code
│   ├── app/                 # Next.js App Router 
│   │   ├── api/             # API routes
│   │   │   ├── chat/        # Character conversation endpoint
│   │   │   ├── edit-portrait/ # Portrait editing endpoint (NEW)
│   │   │   ├── generate/    # Character generation endpoint
│   │   │   ├── regenerate/  # Character regeneration endpoint
│   │   │   └── proxy-image/ # Image proxy endpoint
│   │   ├── chat/            # Chat interface pages
│   │   │   └── [characterId]/  # Dynamic chat page
│   │   ├── docs/            # Documentation pages
│   │   ├── library/         # Character library pages
│   │   └── page.tsx         # Homepage with wizard
│   ├── components/          # React components
│   │   ├── character-wizard.tsx      # Main wizard component
│   │   ├── edit-page/       # Character editing components
│   │   │   ├── portrait-section.tsx     # Portrait editing interface
│   │   │   └── additional-traits-section.tsx # Trait management interface
│   │   ├── ui/              # Reusable UI components
│   │   └── wizard-steps/    # Individual wizard steps
│   ├── contexts/            # React contexts
│   │   ├── character-context.tsx     # Character state management
│   │   ├── chat-context.tsx         # Chat state management
│   │   └── theme-context.tsx         # Theme/dark mode state
│   └── lib/                 # Utility functions and types
│       ├── character-storage.ts      # IndexedDB operations
│       ├── chat-storage.ts          # IndexedDB chat operations
│       ├── chat-types.ts            # Chat type definitions
│       ├── models.ts                 # Model configuration
│       ├── openai.ts                 # OpenAI API integration
│       ├── types.ts                  # TypeScript type definitions
│       └── utils.ts                  # General utilities
├── .env.local               # Environment variables (create this)
├── next.config.js           # Next.js configuration
├── tailwind.config.js       # Tailwind CSS configuration
└── package.json             # Project dependencies and scripts
```

## Development Workflow

### Creating New Features

1. Create a feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Implement your changes
3. Test your changes thoroughly
4. Submit a pull request

### Creating a Production Build

```bash
npm run build
npm run start
```

This builds an optimized version and starts it locally.

## API Usage Considerations

When developing locally, be mindful of your OpenAI API usage:

• Character generation costs vary by model
• Portrait generation adds additional costs
• **Portrait editing** adds costs for image modification operations
• Chat conversations count against text model limits
• **Trait generation** adds costs for AI-powered trait creation
• Consider using Standard models during development to minimize costs

### Portrait Editing Development Notes

• Portrait editing uses OpenAI's image editing API (`/v1/images/edits`)
• Only `gpt-image-1` provides reliable editing capabilities
• Image size limits: up to 50MB for `gpt-image-1`
• Edit prompt limits: up to 32,000 characters for `gpt-image-1`

### Trait Management Development Notes

• Trait generation uses text generation API with specialized prompts
• Generated traits are validated for format and appropriateness
• Individual trait regeneration allows fine-grained character customization
• Trait operations count against text model usage limits

## Key Development Areas

### Wizard Interface Development

The wizard consists of step components in `src/components/wizard-steps/`:
• `concept-step.tsx`: Genre selection and description
• `options-step.tsx`: Character traits and customization
• `model-step.tsx`: AI model selection
• `results-step.tsx`: Generation results and library saving

### Character Library Development

The library system provides character management:
• `src/components/character-library.tsx`: Main library interface
• `src/lib/character-storage.ts`: IndexedDB operations
• `src/app/library/edit/[id]/page.tsx`: Character editing page

### Chat System Development

The chat system includes:
• Chat interface at `/chat/[characterId]`
• Chat API endpoint at `/api/chat`
• IndexedDB conversation storage
• Character-aware AI responses

### Portrait Editing Development (NEW)

The portrait editing system includes:
• Portrait editing interface in `src/components/edit-page/portrait-section.tsx`
• Portrait editing API endpoint at `/api/edit-portrait`
• Model compatibility validation
• Edit prompt processing and validation

### Trait Management Development (NEW)

The trait management system includes:
• Trait management interface in `src/components/edit-page/additional-traits-section.tsx`
• Enhanced regeneration API support for trait operations
• Trait generation and formatting logic
• Integration with existing character data structures

### Regeneration System

The regeneration system allows updating specific character elements:
• Individual attributes (name, appearance, personality, backstory)
• Portrait images with different models
• **Portrait editing** with text prompts
• Quest components, dialogue lines, and items
• **Individual trait generation and regeneration**

## Common Development Tasks

### Adding a New Character Trait

1. Update the `Character` type in `src/lib/types.ts`
2. Add the trait option to the appropriate wizard step
3. Update the character context to handle the new trait
4. Modify the generation prompts to include the trait
5. Update the character display and editing components

### Adding New AI Models

1. Update model configurations in `src/lib/models.ts`
2. Add model options to the model selection UI
3. Update the API endpoints to handle new models
4. Test with the new models

### Working with Portrait Editing

1. Understand the image editing API integration in `/api/edit-portrait`
2. Test with various edit prompts and image types
3. Validate model compatibility (gpt-image-1 recommended)
4. Handle error cases and user feedback appropriately

### Working with Trait Management

1. Understand the trait generation API integration in `/api/regenerate`
2. Test trait generation with different character contexts
3. Validate trait formatting and display consistency
4. Handle AI generation failures gracefully

## Testing During Development

### Manual Testing Checklist

1. **Wizard Flow**: Test each step of the character creation wizard
2. **Character Library**: Verify saving, loading, editing, and deleting
3. **Chat System**: Test conversation flow, persistence, and character consistency
4. **Portrait Editing**: Test edit interface, processing, and error handling
5. **Trait Management**: Test trait generation, editing, and regeneration
6. **Model Selection**: Test different model combinations
7. **Regeneration**: Verify all regeneration options work correctly
8. **Responsive Design**: Test on different screen sizes
9. **Dark Mode**: Verify theme switching works properly

### Browser Testing

Test in multiple browsers:
• Chrome
• Firefox
• Safari
• Edge

### Feature-Specific Testing

**Portrait Editing Testing:**
• Test with characters that have existing portraits
• Verify model compatibility warnings
• Test various edit prompt types
• Validate error handling for failed edits

**Trait Management Testing:**
• Test AI trait generation functionality
• Verify trait display consistency
• Test individual trait regeneration
• Validate trait formatting and validation

## Troubleshooting

### OpenAI API Issues

If you're experiencing problems with the OpenAI API:

1. Check your API key is valid and has sufficient credits
2. Verify the API is not experiencing downtime
3. Check your network connection
4. Examine the browser console for error messages
5. Try with different model selections

### Character Library Issues

Common library issues:

1. **Characters not saving**: Check IndexedDB permissions and storage space
2. **Slow loading**: Verify browser performance and clear cache if needed
3. **Search not working**: Check for JavaScript errors in console

### Portrait Editing Issues

Common portrait editing issues:

1. **Edit button disabled**: Verify character has existing portrait and compatible model selected
2. **Editing failed**: Check API key permissions, usage limits, and network connectivity
3. **Poor edit results**: Try using gpt-image-1 model and more specific edit prompts

### Trait Management Issues

Common trait management issues:

1. **Traits not generating**: Check text model usage limits and API connectivity
2. **Traits not displaying**: Verify trait formatting meets display requirements
3. **Regeneration not working**: Check usage limits and network connectivity

### Chat System Issues

Common chat issues:

1. **Chat not loading**: Verify character exists in library and IndexedDB is working
2. **Messages not sending**: Check usage limits and network connection
3. **Character responses inconsistent**: Verify character has detailed personality data

### Build Issues

If you encounter build problems:

1. Clear the `.next` folder: `rm -rf .next`
2. Reinstall dependencies: `npm clean-install`
3. Check for TypeScript errors
4. Verify environment variables are set correctly

## Development Tools

### Recommended Extensions (VS Code)

• ES7+ React/Redux/React-Native snippets
• Tailwind CSS IntelliSense
• TypeScript Importer
• Prettier - Code formatter
• ESLint

### Debugging Tools

• React Developer Tools (browser extension)
• IndexedDB viewer in browser dev tools
• Network tab for API call inspection
• Console for error tracking

## Contributing Guidelines

When contributing to NPC Forge:

1. Follow the existing code style and patterns
2. Write TypeScript for all new code
3. Test your changes thoroughly including new features
4. Update documentation for new features
5. Follow the commit message format (see [Contributing Guide](/docs/contributing))

### Testing New Features

**Portrait Editing Contributions:**
• Test with various character types and portrait styles
• Validate edit prompt processing and error handling
• Ensure model compatibility validation works correctly
• Test usage limit integration

**Trait Management Contributions:**
• Test trait generation with different character contexts
• Validate trait formatting and display consistency
• Ensure individual trait regeneration works properly
• Test integration with existing character data

## Performance Considerations

### API Call Optimization

• Batch operations where possible to reduce API calls
• Use appropriate model tiers for different operations
• Implement proper caching for frequently accessed data

### Image Processing Optimization

• Validate image sizes before processing
• Use appropriate image formats and compression
• Handle large images gracefully

### Trait Processing Optimization

• Validate trait data before API calls
• Cache trait generation results when appropriate
• Optimize trait display and filtering operations

## Related Documentation

• [Architecture Overview](/docs/architecture) - System design and components including new APIs
• [Contributing Guidelines](/docs/contributing) - How to contribute including new feature areas
• [API Documentation](/docs/api) - API endpoint details including portrait editing