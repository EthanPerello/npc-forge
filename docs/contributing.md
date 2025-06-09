# Contributing Guidelines

Thank you for your interest in contributing to NPC Forge! This document provides guidelines and instructions for contributing to the project.

## Getting Started

### Prerequisites

• Node.js v18 or newer
• npm v7 or newer
• Git
• An OpenAI API key for testing
• A GitHub account

### Setting Up the Development Environment

**Fork the repository**

Click the "Fork" button at the top right of the [NPC Forge repository](https://github.com/EthanPerello/npc-forge).

**Clone your fork**

```bash
git clone https://github.com/YOUR-USERNAME/npc-forge.git
cd npc-forge
```

**Add the upstream remote**

```bash
git remote add upstream https://github.com/EthanPerello/npc-forge.git
```

**Install dependencies**

```bash
npm install
```

**Create a .env.local file**

```bash
OPENAI_API_KEY=your_api_key_here
```

**Start the development server**

```bash
npm run dev
```

## Development Workflow

### Branching Strategy

We use a simplified GitFlow workflow:

• `main`: The main branch that always reflects production-ready code
• `feature/name`: Feature branches for new features and non-critical bugs
• `fix/name`: Fix branches for critical bug fixes

### Working on a Feature or Bug Fix

**Create a new branch from main**

```bash
git checkout main
git pull upstream main
git checkout -b feature/your-feature-name
# or for fixes
git checkout -b fix/bug-description
```

**Make your changes**

Implement your feature or bug fix following the coding standards below.

**Test your changes**

• Test character generation and editing functionality
• Test chat features if your changes affect conversations
• Verify library operations (save, load, filter, search)
• Test on both desktop and mobile interfaces
• Ensure dark mode compatibility

**Commit your changes**

Follow the commit message format:

```bash
git add .
git commit -m "feat: add character library feature"
# or for fixes
git commit -m "fix: resolve portrait generation error"
```

**Commit Message Prefixes:**
• `feat:` for new features
• `fix:` for bug fixes
• `docs:` for documentation changes
• `style:` for formatting changes
• `refactor:` for code refactoring
• `test:` for adding tests
• `chore:` for maintenance tasks

**Keep your branch updated**

```bash
git fetch upstream
git rebase upstream/main
```

**Push your changes**

```bash
git push origin feature/your-feature-name
```

## Pull Request Process

**Create a Pull Request**

Go to the [NPC Forge repository](https://github.com/EthanPerello/npc-forge) and click "New Pull Request".

**Fill in the Pull Request template**

Provide:
• A clear and concise description of your changes
• The issue number(s) your PR addresses (if applicable)
• Screenshots or examples if applicable
• Notes on testing performed
• Any breaking changes or dependencies

**Update documentation**

• Add your changes to the "Unreleased" section of CHANGELOG.md
• Update relevant documentation files if your changes affect user-facing features
• Include code comments for complex logic

**Wait for review**

A maintainer will review your PR and provide feedback. Make any requested changes by adding new commits to your branch.

**Merge**

Once approved, a maintainer will merge your PR.

## Coding Standards

### TypeScript

• Use TypeScript for all new code
• Define interfaces for all data structures
• Use explicit typing instead of `any` where possible
• Use optional chaining and nullish coalescing when appropriate
• Follow existing type definitions in `src/lib/types.ts` and `src/lib/chat-types.ts`

### React

• Use functional components with hooks
• Keep components small and focused on a single responsibility
• Use React Context for state that needs to be shared across components
• Follow the established file structure and naming conventions
• Use proper error boundaries for robust error handling

### Component Development Guidelines

**Wizard Interface Components:**
• Follow the established step pattern in `src/components/wizard-steps/`
• Maintain consistent navigation and progress tracking
• Ensure responsive design across all steps
• Test with various character configurations

**Chat System Components:**
• Follow patterns established in chat page and context
• Ensure character consistency in AI responses
• Handle loading states and error conditions gracefully
• Test conversation flow and message persistence

**Character Library Components:**
• Maintain IndexedDB integration patterns
• Follow the established component structure in `src/components/edit-page/`
• Ensure regeneration features work consistently
• Support the enhanced filtering system
• Test with large character collections

### CSS/Styling

• Use Tailwind CSS for styling
• Follow the existing color scheme and design patterns
• Ensure responsive design works on mobile devices
• Use semantic HTML elements
• Test in both light and dark modes
• Maintain consistency with the established design system

### Code Formatting

The project uses ESLint for code quality. Before submitting a PR:

```bash
npm run lint
```

## Testing Guidelines

### Manual Testing Requirements

Before submitting a PR, test the following areas:

**Core Functionality:**
• Character generation wizard (all four steps)
• Character library operations (save, load, edit, delete)
• Character regeneration features
• Import/export functionality

**Chat System (if applicable):**
• Starting conversations from character cards and library
• Message sending and receiving
• Character personality consistency
• Conversation persistence
• Model selection during chat

**User Interface:**
• Responsive design on different screen sizes
• Dark mode functionality
• Navigation between pages
• Error handling and user feedback

**Advanced Features:**
• Enhanced filtering system with trait categories
• Search functionality with smart syntax
• Portrait generation and management
• Usage limit tracking and enforcement

### Chat System Testing

When working on chat-related functionality:

**Character Consistency Testing:**
• Verify AI maintains character personality
• Test with different character types and traits
• Ensure backstory integration in responses

**Conversation Flow Testing:**
• Test message persistence across browser sessions
• Verify loading states and error handling
• Test conversation clearing functionality

**Usage Integration Testing:**
• Verify chat counts against model limits
• Test model switching during conversations
• Ensure usage warnings appear appropriately

## Key Development Areas

### Core Features

• Wizard interface improvements and optimizations
• Character library enhancements with filtering and search
• Regeneration system refinements and new capabilities
• Model selection optimization and new model support

### Chat System

• Conversation interface improvements
• Character personality consistency enhancements
• Message handling and storage optimizations
• Integration with character library features

### UI/UX Improvements

• Responsive design enhancements
• Accessibility improvements and compliance
• Performance optimizations
• Dark mode refinements and consistency

### API Integration

• New model support and integration
• Enhanced error handling and user feedback
• Usage tracking improvements and accuracy
• Rate limiting enhancements

### Storage & Data

• IndexedDB optimizations and reliability
• Import/export enhancements
• Search and filtering performance improvements
• Data validation and error recovery

## Feature Development Guidelines

### Before Starting a Feature

1. **Check Existing Issues**: Search for related issues or feature requests
2. **Discuss Approach**: Comment on issues or create a discussion for major features
3. **Review Architecture**: Understand how your feature fits into the existing system
4. **Plan Testing**: Consider how you'll test your feature thoroughly

### When Implementing Features

1. **Follow Established Patterns**: Use existing component and data flow patterns
2. **Consider Edge Cases**: Handle error conditions and unusual input
3. **Maintain Consistency**: Follow established UI patterns and terminology
4. **Document Changes**: Update relevant documentation files

## Bug Reports

When submitting a bug report:

1. **Use Clear Titles**: Describe the issue concisely
2. **Provide Steps to Reproduce**: Include clear, numbered steps
3. **Describe Expected Behavior**: What should happen vs. what actually happens
4. **Include Screenshots**: Visual aids help diagnose UI issues
5. **List Environment Details**: Browser, OS, and relevant configuration
6. **Check for Duplicates**: Search existing issues first

## Feature Requests

Before submitting a feature request:

1. **Check Existing Issues**: See if the feature has been requested
2. **Review the Roadmap**: Check if it's already planned
3. **Consider Project Goals**: Ensure alignment with project vision

When submitting a feature request:

1. **Describe the Problem**: What user need does this address?
2. **Suggest a Solution**: Provide implementation ideas if possible
3. **Provide Examples**: Include mockups or detailed descriptions
4. **Indicate Willingness**: State if you're willing to implement it

## Documentation Contributions

We welcome documentation improvements:

• **Fix Typos**: Small corrections are always appreciated
• **Improve Clarity**: Make instructions clearer and more comprehensive
• **Add Examples**: Provide more examples and use cases
• **Update Screenshots**: Keep visual guides current with the interface
• **Translate**: Help make documentation accessible to more users

## Communication

### Channels

• **Issues**: Use GitHub Issues for bug reports and feature requests
• **Discussions**: Use GitHub Discussions for questions and ideas
• **Email**: Contact the maintainer at [ethanperello@gmail.com](mailto:ethanperello@gmail.com) for private inquiries

### Guidelines

• Be respectful and constructive in all communications
• Provide context and background for your questions or suggestions
• Search existing issues and discussions before creating new ones
• Use clear, descriptive titles and descriptions

## Code of Conduct

This project adheres to a code of conduct that ensures a welcoming environment for all contributors. By participating, you agree to:

• Be respectful and inclusive
• Focus on constructive feedback
• Help create a positive community
• Report any inappropriate behavior

Thank you for contributing to NPC Forge! Your efforts help make the project better for everyone.

## Related Documentation

• [Development Setup](/docs/dev-setup) - Local environment configuration
• [Architecture Overview](/docs/architecture) - System design and components
• [Testing Guide](/docs/testing) - Comprehensive testing procedures
• [Security Documentation](/docs/security) - Security considerations and practices