# Development Setup

This guide will help you set up NPC Forge for local development.

## Prerequisites

Before you begin, ensure you have:

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

This installs all necessary dependencies including:
- Next.js 14
- React
- TypeScript
- TailwindCSS
- Lucide React (for icons)
- OpenAI SDK

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
- Characters are saved to IndexedDB in your browser
- All editing and regeneration features are available
- Example characters are pre-loaded for testing

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
│   │   │   ├── generate/    # Character generation endpoint
│   │   │   ├── regenerate/  # Character regeneration endpoint
│   │   │   └── proxy-image/ # Image proxy endpoint
│   │   ├── docs/            # Documentation pages
│   │   ├── library/         # Character library pages
│   │   └── page.tsx         # Homepage with wizard
│   ├── components/          # React components
│   │   ├── character-wizard.tsx      # Main wizard component
│   │   ├── edit-page/       # Character editing components
│   │   ├── ui/              # Reusable UI components
│   │   └── wizard-steps/    # Individual wizard steps
│   ├── contexts/            # React contexts
│   │   ├── character-context.tsx     # Character state management
│   │   └── theme-context.tsx         # Theme/dark mode state
│   └── lib/                 # Utility functions and types
│       ├── character-storage.ts      # IndexedDB operations
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

- Character generation costs vary by model
- Portrait generation adds additional costs
- Consider using Standard models during development to minimize costs

## Key Development Areas

### Wizard Interface Development

The wizard consists of step components in `src/components/wizard-steps/`:
- `concept-step.tsx`: Genre selection and description
- `options-step.tsx`: Character traits and customization
- `model-step.tsx`: AI model selection
- `results-step.tsx`: Generation results and library saving

### Character Library Development

The library system provides character management:
- `src/components/character-library.tsx`: Main library interface
- `src/lib/character-storage.ts`: IndexedDB operations
- `src/app/library/edit/[id]/page.tsx`: Character editing page

### Regeneration System

The regeneration system allows updating specific character elements:
- Individual attributes (name, appearance, personality, backstory)
- Portrait images with different models
- Quest components, dialogue lines, and items

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

## Related Documentation

- [Architecture Overview](/docs/architecture) - System design and components
- [Contributing Guidelines](/docs/contributing) - How to contribute
- [API Documentation](/docs/api) - API endpoint details