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
- Next.js
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

In development mode, the app bypasses the 15 generations per month limit. The `isDevMode()` function in `src/lib/usage-limits.ts` detects if you're in development and returns unlimited generations.

### Welcome Guide

The welcome guide will always appear in development mode regardless of localStorage, making it easier to test and develop.

### Local Storage

Character generation counts and preferences are stored in your browser's localStorage. You can clear this data from your browser's developer tools if needed.

## File Structure

Here's an overview of the key directories and files:

```
npc-forge/
├── public/                  # Static assets
│   ├── images/              # Images used in the application
│   └── images/docs/         # Documentation images
├── src/                     # Source code
│   ├── app/                 # Next.js App Router 
│   │   ├── api/             # API routes
│   │   │   └── generate/    # Character generation endpoint
│   │   ├── docs/            # Documentation pages
│   │   └── page.tsx         # Homepage
│   ├── components/          # React components
│   │   ├── tabs/            # Tab-based components
│   │   └── ui/              # Reusable UI components
│   ├── contexts/            # React contexts
│   │   └── character-context.tsx   # Character state management
│   └── lib/                 # Utility functions and types
│       ├── openai.ts        # OpenAI API integration
│       ├── templates.ts     # Character templates
│       ├── types.ts         # TypeScript type definitions
│       ├── usage-limits.ts  # Usage limit tracking
│       └── utils.ts         # General utilities
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
3. Test your changes thoroughly
4. Submit a pull request

### Running Tests

```bash
npm run test
```

### Creating a Production Build

```bash
npm run build
npm run start
```

This builds an optimized version of the application and starts it locally.

## API Usage Considerations

When developing locally, be mindful of your OpenAI API usage:

- Each character generation costs approximately $0.04
- Portrait generation adds another $0.04-$0.08 
- Consider implementing a mock API response during heavy development to avoid costs

## Customizing the Application

### Modifying Templates

Character templates are defined in `src/lib/templates.ts`. You can modify these to add new genres or change existing ones.

### Updating the UI

The application uses TailwindCSS for styling. You can customize the theme in `tailwind.config.js`.

### Adding New Features

The project follows a component-based architecture. When adding new features:

1. Create new components in the appropriate directory
2. Update types in `src/lib/types.ts` if necessary
3. Modify the character context if you're changing state management
4. Update API routes if you're adding new functionality that requires server interaction

## Common Development Tasks

### Adding a New Character Option

1. Add the new option to the appropriate type in `src/lib/types.ts`
2. Create or update the UI component in `src/components/`
3. Update the form handling in the character context
4. Modify the OpenAI prompt in `src/app/api/generate/route.ts` to include the new option

### Modifying the Character Generation Process

The generation flow involves:

1. `src/contexts/character-context.tsx` - Manages state and API calls
2. `src/app/api/generate/route.ts` - Handles the API request
3. `src/lib/openai.ts` - Contains the logic for interacting with OpenAI

Modify these files to change how characters are generated.

## Deployment

The project is set up for easy deployment to Vercel:

1. Push your changes to GitHub
2. Connect your Vercel account to your GitHub repository
3. Add your environment variables (OPENAI_API_KEY) in the Vercel dashboard
4. Deploy!

For other hosting platforms, build the application with `npm run build` and serve the resulting output.

## Troubleshooting

### OpenAI API Issues

If you're experiencing problems with the OpenAI API:

1. Check your API key is valid and has sufficient credits
2. Verify the API is not experiencing downtime
3. Check your network connection
4. Examine the API response for error messages

### Next.js Development Problems

Common Next.js issues:

1. Clear the `.next` folder: `rm -rf .next`
2. Reinstall dependencies: `npm install`
3. Restart the development server

## Getting Help

If you encounter any issues during development:

- Check the [GitHub issues](https://github.com/EthanPerello/npc-forge/issues) to see if others have faced similar problems
- Open a new issue with a detailed description of your problem
- Contact the developer at [ethanperello@gmail.com](mailto:ethanperello@gmail.com)