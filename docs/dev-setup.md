# Development Setup

This guide will help you set up NPC Forge for local development. Follow these steps to get the project running on your machine.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or newer)
- **npm** (v7 or newer)
- **Git**
- **OpenAI API key** (for development)

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

This will install all the necessary dependencies defined in `package.json`, including:
- Next.js 14
- React
- TypeScript
- TailwindCSS
- Lucide React (for icons)
- OpenAI SDK

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory with your OpenAI API key:

```
OPENAI_API_KEY=your_api_key_here
```

This key is required for local development as it allows the application to make requests to OpenAI's API for character generation and portrait creation.

> **Note**: Never commit your `.env.local` file to version control! It's already included in `.gitignore`.

### 4. Start the Development Server

```bash
npm run dev
```

This will start the development server, typically at [http://localhost:3000](http://localhost:3000).

## Understanding Development Mode

NPC Forge includes special features for development:

### Usage Limit Bypass

In development mode, the app bypasses the usage limits for Enhanced and Premium models. The `isDevMode()` function in `src/lib/usage-limits.ts` detects if you're in development and returns unlimited generations for all models.

### Character Library

The character library works fully in development mode:
- Characters are saved to IndexedDB in your browser
- All editing and regeneration features are available
- Example characters are pre-loaded for testing

### Welcome Guide

The welcome guide will always appear in development mode regardless of localStorage, making it easier to test the onboarding flow.

## Project Structure

Here's an overview of the key directories and files:

```
npc-forge/
├── public/                  # Static assets
│   ├── images/              # Images used in the application
│   └── icons/               # App icons and PWA assets
├── src/                     # Source code
│   ├── app/                 # Next.js App Router 
│   │   ├── api/             # API routes
│   │   │   ├── generate/    # Character generation endpoint
│   │   │   ├── regenerate/  # Character regeneration endpoint
│   │   │   └── proxy-image/ # Image proxy endpoint
│   │   ├── docs/            # Documentation pages
│   │   ├── library/         # Character library pages
│   │   │   └── edit/[id]/   # Character editing pages
│   │   └── page.tsx         # Homepage with wizard
│   ├── components/          # React components
│   │   ├── character-wizard.tsx      # Main wizard component
│   │   ├── character-library.tsx     # Library interface
│   │   ├── edit-page/       # Character editing components
│   │   ├── tabs/            # Tab-based components
│   │   ├── ui/              # Reusable UI components
│   │   └── wizard-steps/    # Individual wizard steps
│   ├── contexts/            # React contexts
│   │   ├── character-context.tsx     # Character state management
│   │   └── theme-context.tsx         # Theme/dark mode state
│   └── lib/                 # Utility functions and types
│       ├── character-storage.ts      # IndexedDB operations
│       ├── image-storage.ts          # Portrait storage
│       ├── models.ts                 # Model configuration
│       ├── openai.ts                 # OpenAI API integration
│       ├── templates.ts              # Character templates
│       ├── types.ts                  # TypeScript type definitions
│       ├── usage-limits.ts           # Usage limit tracking
│       └── utils.ts                  # General utilities
├── docs/                    # Documentation (Markdown)
├── .env.local               # Environment variables (create this)
├── next.config.js           # Next.js configuration
├── tailwind.config.js       # Tailwind CSS configuration
└── package.json             # Project dependencies and scripts
```

## Workflow for Development

### Creating New Features

1. Create a feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Implement your changes
3. Test your changes thoroughly (see [Testing Guide](/docs/testing))
4. Submit a pull request

### Running Tests

Currently, the project relies on manual testing. See the [Testing Guide](/docs/testing) for comprehensive testing procedures.

### Creating a Production Build

```bash
npm run build
npm run start
```

This builds an optimized version of the application and starts it locally.

## API Usage Considerations

When developing locally, be mindful of your OpenAI API usage:

- Character generation costs approximately $0.04-0.40 depending on the model
- Portrait generation adds another $0.02-0.25 depending on the model
- Consider using Standard models during development to minimize costs
- The development mode bypass means you won't hit usage limits locally

## Development Features

### Wizard Interface Development

The wizard is the main interface for character creation, consisting of step components in `src/components/wizard-steps/`:
- `concept-step.tsx`: Genre selection and description
- `options-step.tsx`: Character traits and customization
- `model-step.tsx`: AI model selection
- `results-step.tsx`: Generation results and library saving

### Character Library Development

The library system provides comprehensive character management:
- `src/components/character-library.tsx`: Main library interface
- `src/lib/character-storage.ts`: IndexedDB operations
- `src/app/library/edit/[id]/page.tsx`: Character editing page

### Regeneration System

The regeneration system allows updating specific character elements:
- Individual attributes (name, appearance, personality, backstory)
- Portrait images with different models
- Quest components, dialogue lines, and items
- Model selection for regeneration

## Customizing the Application

### Adding New Character Options

1. Add the new option to the appropriate type in `src/lib/types.ts`
2. Update the UI component in the relevant wizard step
3. Modify the form handling in the character context
4. Update the OpenAI prompt in `src/app/api/generate/route.ts`

### Modifying the Character Library

The library system consists of:
- `src/components/character-library.tsx`: Main library interface
- `src/lib/character-storage.ts`: IndexedDB operations
- `src/app/library/edit/[id]/page.tsx`: Character editing page

### Adding New AI Models

1. Update model configurations in `src/lib/models.ts`
2. Add model options to the model selection UI
3. Update the API endpoints to handle new models
4. Test with the new models

## Common Development Tasks

### Adding a New Character Trait

1. Update the `Character` type in `src/lib/types.ts`
2. Add the trait option to the appropriate wizard step
3. Update the character context to handle the new trait
4. Modify the generation prompts to include the trait
5. Update the character display and editing components

### Modifying the Generation Process

The generation flow involves:

1. `src/contexts/character-context.tsx` - Manages wizard state and API calls
2. `src/app/api/generate/route.ts` - Handles the generation API request
3. `src/lib/openai.ts` - Contains the logic for interacting with OpenAI

### Adding New Regeneration Options

1. Update the regeneration types in `src/lib/types.ts`
2. Add regeneration UI to the edit page components
3. Update `src/app/api/regenerate/route.ts` to handle new types
4. Test the regeneration flow thoroughly

### Modifying the Character Storage

The IndexedDB implementation is in `src/lib/character-storage.ts`:
- Character data storage and retrieval
- Search and filtering functionality
- Portrait storage with compression

## Testing During Development

### Manual Testing Checklist

1. **Wizard Flow**: Test each step of the character creation wizard
2. **Character Library**: Verify saving, loading, editing, and deleting
3. **Model Selection**: Test different model combinations
4. **Regeneration**: Verify all regeneration options work correctly
5. **Responsive Design**: Test on different screen sizes
6. **Dark Mode**: Verify theme switching works properly

### Browser Testing

Test in multiple browsers:
- Chrome
- Firefox
- Safari
- Edge

### Performance Testing

Monitor:
- Character generation speed
- Library loading performance
- IndexedDB operations
- Image loading and compression

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

### Build Issues

If you encounter build problems:

1. Clear the `.next` folder: `rm -rf .next`
2. Reinstall dependencies: `npm clean-install`
3. Check for TypeScript errors
4. Verify environment variables are set correctly

## Development Tools

### Recommended Extensions (VS Code)

- ES7+ React/Redux/React-Native snippets
- Tailwind CSS IntelliSense
- TypeScript Importer
- Prettier - Code formatter
- ESLint

### Debugging Tools

- React Developer Tools (browser extension)
- IndexedDB viewer in browser dev tools
- Network tab for API call inspection
- Console for error tracking

## Contributing Guidelines

When contributing to NPC Forge:

1. Follow the existing code style and patterns
2. Write TypeScript for all new code
3. Test your changes thoroughly
4. Update documentation for new features
5. Follow the commit message format (see [Contributing Guide](/docs/contributing))

## Key Development Considerations

### Model Selection Integration

The tiered model system affects various parts of the application:
- Usage tracking per model type
- Model selection UI components
- API endpoint handling for different models
- Regeneration with model switching

### Character State Management

The character context manages:
- Wizard step state and navigation
- Form data across all steps
- Generated character data
- Library operations and search state

### IndexedDB Integration

The storage system provides:
- Reliable character persistence
- Portrait compression and storage
- Search indexing and retrieval
- Error handling and recovery

## Related Documentation

- [Architecture Overview](/docs/architecture) - System design and components
- [Contributing Guidelines](/docs/contributing) - How to contribute
- [Testing Guide](/docs/testing) - Testing procedures
- [API Documentation](/docs/api) - API endpoint details
- [Character Library Guide](/docs/library) - Library system details