# Contributing Guidelines

Thank you for your interest in contributing to NPC Forge! This document provides guidelines and instructions for contributing to the project.

## Table of Contents

- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Communication](#communication)

## Getting Started

### Prerequisites

- Node.js v18 or newer
- npm v7 or newer
- Git
- An OpenAI API key for testing
- A GitHub account

### Setting Up the Development Environment

1. **Fork the repository**

   Click the "Fork" button at the top right of the [NPC Forge repository](https://github.com/EthanPerello/npc-forge).

2. **Clone your fork**

   ```bash
   git clone https://github.com/YOUR-USERNAME/npc-forge.git
   cd npc-forge
   ```

3. **Add the upstream remote**

   ```bash
   git remote add upstream https://github.com/EthanPerello/npc-forge.git
   ```

4. **Install dependencies**

   ```bash
   npm install
   ```

5. **Create a .env.local file**

   ```bash
   OPENAI_API_KEY=your_api_key_here
   ```

6. **Start the development server**

   ```bash
   npm run dev
   ```

## Development Workflow

### Branching Strategy

We use a simplified GitFlow workflow:

- `main`: The main branch that always reflects production-ready code
- `feature/name`: Feature branches for new features and non-critical bugs
- `fix/name`: Fix branches for critical bug fixes

### Working on a Feature or Bug Fix

1. **Create a new branch from main**

   ```bash
   git checkout main
   git pull upstream main
   git checkout -b feature/your-feature-name
   # or for fixes
   git checkout -b fix/bug-description
   ```

2. **Make your changes**

   Implement your feature or bug fix.

3. **Commit your changes**

   Follow the commit message format:

   ```bash
   git add .
   git commit -m "feat: add character library feature"
   # or for fixes
   git commit -m "fix: resolve portrait generation error"
   ```

   Prefix your commit messages with:
   - `feat:` for new features
   - `fix:` for bug fixes
   - `docs:` for documentation changes
   - `style:` for formatting changes
   - `refactor:` for code refactoring
   - `test:` for adding tests
   - `chore:` for maintenance tasks

4. **Keep your branch updated**

   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

5. **Push your changes**

   ```bash
   git push origin feature/your-feature-name
   ```

## Pull Request Process

1. **Create a Pull Request**

   Go to the [NPC Forge repository](https://github.com/EthanPerello/npc-forge) and click "New Pull Request".

2. **Fill in the Pull Request template**

   Provide:
   - A clear and concise description of your changes
   - The issue number(s) your PR addresses
   - Screenshots or examples if applicable
   - Any notes on testing or dependencies

3. **Wait for review**

   A maintainer will review your PR and provide feedback. Make any requested changes by adding new commits to your branch.

4. **Update the CHANGELOG**

   Add your changes to the "Unreleased" section of CHANGELOG.md following the Keep a Changelog format.

5. **Merge**

   Once approved, a maintainer will merge your PR.

## Coding Standards

### TypeScript

- Use TypeScript for all new code
- Define interfaces for all data structures
- Use explicit typing instead of `any` where possible
- Use optional chaining and nullish coalescing when appropriate

### React

- Use functional components with hooks
- Keep components small and focused
- Use React Context for state that needs to be shared across components
- Follow the React file structure of the existing project

### Wizard Interface Components

When working with the wizard interface:
- Follow the established step pattern in `src/components/wizard-steps/`
- Maintain consistent navigation and progress tracking
- Ensure responsive design across all steps

### Character Library Components

When modifying library features:
- Maintain IndexedDB integration patterns
- Follow the established component structure in `src/components/edit-page/`
- Ensure regeneration features work consistently
- Support the enhanced filtering system (v0.18.0)

### CSS/Styling

- Use Tailwind CSS for styling
- Follow the existing color scheme and design patterns
- Ensure responsive design works on mobile devices
- Use semantic HTML elements

### Code Formatting

The project uses ESLint for code formatting. Before submitting a PR:

```bash
npm run lint
```

## Key Development Areas

### Core Features
- Wizard interface improvements
- Character library enhancements with filtering
- Regeneration system refinements
- Model selection optimization

### UI/UX Improvements
- Responsive design enhancements
- Accessibility improvements
- Performance optimizations
- Dark mode refinements

### API Integration
- New model support
- Enhanced error handling
- Usage tracking improvements
- Rate limiting enhancements

### Storage & Data
- IndexedDB optimizations
- Import/export enhancements
- Search and filtering performance improvements
- Data validation strengthening

## Feature Requests

Before submitting a feature request:

1. Check if the feature already exists
2. Search existing issues and discussions
3. Consider if the feature aligns with the project goals

When submitting a feature request:

1. Clearly describe the problem the feature solves
2. Suggest a solution if possible
3. Provide examples or mockups if applicable
4. Indicate if you're willing to implement it yourself

## Bug Reports

When submitting a bug report:

1. Use clear, descriptive titles
2. Include clear steps to reproduce
3. Describe the expected behavior
4. Include screenshots if applicable
5. List your browser, OS, and any relevant configuration

## Communication

- **Issues**: Use GitHub Issues for bug reports and feature requests
- **Discussions**: Use GitHub Discussions for questions and ideas
- **Email**: Contact the maintainer at [ethanperello@gmail.com](mailto:ethanperello@gmail.com) for private inquiries

## Development Tips

### Working with the Wizard
- Maintain state consistency across steps
- Follow the established navigation patterns
- Test with various data combinations

### Character Library Development
- Understand IndexedDB patterns used
- Follow established regeneration patterns
- Test with large character collections
- Support the enhanced filtering system

### Model Integration
- Understand the tiered model system (50/30/10 text, 10/5/3 images per month)
- Test usage limit functionality
- Verify error handling across models

## Resources

- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [React Documentation](https://react.dev/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [OpenAI API Documentation](https://platform.openai.com/docs/api-reference)

Thank you for contributing to NPC Forge! Your efforts help make the project better for everyone.