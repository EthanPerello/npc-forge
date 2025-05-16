# Contributing Guidelines

Thank you for your interest in contributing to NPC Forge! This document provides guidelines and instructions for contributing to the project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Documentation](#documentation)
- [Testing](#testing)
- [Release Process](#release-process)
- [Communication](#communication)

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code. Please report unacceptable behavior to [ethanperello@gmail.com](mailto:ethanperello@gmail.com).

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

   Prefix your commit messages with one of the following:
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

### CSS/Styling

- Use Tailwind CSS for styling
- Follow the existing color scheme and design patterns
- Ensure responsive design works on mobile devices
- Use semantic HTML elements

### Code Formatting

The project uses ESLint and Prettier for code formatting. Before submitting a PR:

```bash
npm run lint
```

## Documentation

Documentation is an essential part of the project.

### Code Documentation

- Add JSDoc comments for functions and components
- Document complex logic with inline comments
- Update type definitions when making changes

### User Documentation

Update the relevant Markdown files in the `/docs` directory:

- Add new features to `features.md`
- Update usage instructions in `how-to-use.md`
- Add API changes to `api.md`
- Update security information in `security.md`
- Document new model features in `models.md`
- Update library documentation in `library.md`

### README

Keep the README.md up to date with:

- New features
- Changed requirements
- Updated screenshots when the UI changes

## Testing

We currently rely on manual testing. When implementing changes:

1. Test your feature in multiple browsers
2. Test on different screen sizes
3. Test edge cases and failure modes
4. Verify performance is acceptable
5. Test wizard navigation thoroughly
6. Test character library operations
7. Test regeneration features if applicable

### Key Testing Areas

#### Wizard Interface
- Test all step transitions
- Verify data persistence across navigation
- Test progress bar functionality

#### Character Library
- Test CRUD operations
- Verify search and filtering
- Test IndexedDB operations

#### Regeneration Features
- Test individual attribute regeneration
- Test component-level regeneration
- Verify model selection affects output

#### Model Selection
- Test usage limit tracking
- Verify different model combinations
- Test monthly reset functionality

## Release Process

The release process is handled by the project maintainers:

1. Update the CHANGELOG.md with the new version
2. Create a version tag
3. Update the version in package.json
4. Create a GitHub release with release notes

## Communication

- **Issues**: Use GitHub Issues for bug reports and feature requests
- **Discussions**: Use GitHub Discussions for questions and ideas
- **Email**: Contact the maintainer at [ethanperello@gmail.com](mailto:ethanperello@gmail.com) for private inquiries

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

1. Use the bug report template
2. Include clear steps to reproduce
3. Describe the expected behavior
4. Include screenshots if applicable
5. List your browser, OS, and any relevant configuration

## Development Areas

### Core Features
- Wizard interface improvements
- Character library enhancements
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
- Search performance improvements
- Data validation strengthening

## Resources

- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [React Documentation](https://react.dev/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [OpenAI API Documentation](https://platform.openai.com/docs/api-reference)

## Development Tips

### Working with the Wizard
- Maintain state consistency across steps
- Follow the established navigation patterns
- Test with various data combinations

### Character Library Development
- Understand IndexedDB patterns used
- Follow established regeneration patterns
- Test with large character collections

### Model Integration
- Understand the tiered model system
- Test usage limit functionality
- Verify error handling across models

Thank you for contributing to NPC Forge! Your efforts help make the project better for everyone.