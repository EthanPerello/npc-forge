# Development Setup

This guide will help you set up NPC Forge for local development.

## Prerequisites

Before you begin, ensure you have:

• **Node.js** (v18 or newer)
• **npm** (v7 or newer)
• **Git**
• **OpenAI API key** (required for local development only)

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
• Next.js 15
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

> **Note**: This API key is only needed for local development. End users of the public application don't need their own API keys.

> **Important**: Never commit your `.env.local` file to version control! It's already included in `.gitignore`.

### 4. Start the Development Server

```bash
npm run dev
```

This starts the development server at [http://localhost:3000](http://localhost:3000).

## Understanding Development Mode

### Usage Limit Bypass

In development mode, usage limits are bypassed, allowing unlimited testing of all features without restrictions.

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

```
npc-forge/
├── src/app/                 # Next.js 15 App Router
│   ├── api/                 # API endpoints
│   ├── chat/[characterId]/  # Chat pages
│   ├── docs/                # Documentation
│   ├── library/             # Character library
│   └── page.tsx             # Homepage
├── src/components/          # React components
├── src/contexts/            # State management
├── src/lib/                 # Utilities and types
├── .env.local               # Environment variables (create this)
└── package.json             # Dependencies
```

## Development Workflow

### Creating New Features

1. Create a feature branch: `git checkout -b feature/your-feature-name`
2. Implement your changes
3. Test thoroughly
4. Submit a pull request

### Testing Your Changes

• Character generation wizard (all steps)
• Character library operations  
• Chat functionality
• Portrait editing features
• Trait management features
• Responsive design and dark mode

## API Usage Considerations

Be mindful of OpenAI API usage during development:
• Character generation costs vary by model
• Chat conversations count against your API quota
• Portrait editing uses image model quotas
• Development mode bypasses app usage limits but not OpenAI billing
• Consider using Standard models to minimize costs

## Common Development Tasks

### Adding New Character Traits
1. Update `Character` type in `src/lib/types.ts`
2. Add trait option to wizard step
3. Update character context and generation prompts
4. Update display components

### Adding New AI Models
1. Update model configurations in `src/lib/models.ts`
2. Add model options to selection UI
3. Update API endpoints
4. Test with new models

## Troubleshooting

**OpenAI API Issues**: Check API key validity, credits, and network connection
**Character Library Issues**: Verify IndexedDB permissions and browser performance
**Build Issues**: Clear `.next` folder, reinstall dependencies, check TypeScript errors

## Cost Management for Developers

When developing locally:
• Use Standard tier models for most testing
• Test key features with Enhanced/Premium models
• Monitor your OpenAI usage dashboard
• Set billing alerts in your OpenAI account

## Related Documentation

• [Contributing Guidelines](/docs/contributing) - Development workflow and standards
• [Architecture Overview](/docs/architecture) - System design and components