# Changelog

All notable changes to NPC Forge will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Implemented complete dark mode toggle system:
  - Created ThemeContext for managing light, dark, and system themes
  - Added a ThemeToggle button for switching themes
  - Integrated theme switching with Tailwind CSS using the .dark class
  - Persisted user theme preference with localStorage
  - Applied smooth theme transitions across the app

### Changed
- Standardized documentation styling across all pages:
  - Consistent header formatting and section structure
  - Unified card layouts, colors, and spacing
  - Standardized text colors, link styles, and content formatting
  - Added consistent "Related Documentation" sections
  - Fixed responsive layout issues on mobile devices
- Corrected Next.js version reference from 15 to 14 throughout documentation
- Fixed date inconsistencies in release information
- Updated ClientLayout to include ThemeProvider and reposition toggle button
- Updated RootLayout to handle dynamic theme colors and suppress hydration warnings
-Enhanced globals.css for dark mode transitions and theme-aware UI components

## [0.2.0] - 2025-04-22

### Added
- Fully integrated documentation system with sidebar and breadcrumb navigation
- New documentation pages in the app:
  - `/docs/how-to-use` – usage walkthrough for new users
  - `/docs/character-examples` – downloadable JSON examples
  - `/docs/generation-options` – full overview of generation settings
  - `/docs/features` – all major and optional features explained
  - `/docs/faq` – frequently asked questions
  - `/docs/dev-setup` – instructions for local setup
  - `/docs/architecture` – system and component structure
  - `/docs/api` – endpoint descriptions and formats
  - `/docs/security` – data handling and localStorage notes
  - `/docs/contributing` – style and structure guidelines
  - `/docs/testing` – setup and test structure
  - `/docs/deployment` – build and deploy to Vercel
  - `/docs/roadmap` – upcoming milestones
  - `/docs/changelog` – version history
  - `/docs/credits` – acknowledgments
  - `/docs/license` – license details
- Corresponding GitHub Markdown files added:
  - `how-to-use.md`, `features.md`, `character-examples.md`, `api.md`, `architecture.md`, `security.md`, `contributing.md`, `testing.md`, `deployment.md`, `roadmap.md`, `changelog.md`, `credits.md`, `license.md`
- Navigation enhancements:
  - Collapsible sidebar with auto-expanding sections
  - Breadcrumb navigation (`DocsNavigation`) synced with route
  - Mobile toggle with backdrop
  - Sticky, scrollable layout with bottom collapse button on desktop
- Success message added after character generation (auto-dismisses after 3 seconds)

### Changed
- Character tab interface now auto-resets to the "Profile" tab after generation
- Refactored `/docs` folder for separation between page and markdown content
- Consolidated and renamed image and asset folders under the documentation system
- Redesigned homepage header: replaced static title text with layered hero layout
- Added full-width character collage image (fanned-cards.png) with responsive styling
- Adjusted header height and layout for better visual balance
- Improved title text with larger typography, custom drop shadow, and enhanced positioning
- Applied custom fade-in-up-slow animation for smoother entry effect

### Fixed
- Welcome guide toggle now functions reliably in dev and production environments
- `useEffect` behavior in `CharacterDisplay` now correctly resets and displays new characters

## [0.1.4] - 2025-04-21

### Added
- Welcome guide component with step-by-step instructions for new users.
- "Get Started" button in the welcome guide that reveals the character creation form.
- Tooltips for form options to help users understand their purpose.
- Success animation triggered after character generation completes.
- More Lucide icons used throughout the UI for visual consistency.
- Enhanced animations and transitions for a smoother user experience.
- Development-only feature: Welcome guide is always visible in development mode for easier testing.

### Changed
- Complete UI redesign with improved layout, spacing, and visual hierarchy.
- Updated color palette to a consistent indigo/blue scheme.
- Redesigned character card with better styling and visual clarity.
- Refined tab interface with improved interaction feedback.
- Replaced emoji-based item icons with consistent Lucide icons.
- Enhanced mobile responsiveness across all screens and components.

### Fixed
- Sub-genre selection now persists when switching between tabs in the character creation form.
- Fixed infinite update loop in the usage limit display component.
- Resolved layout issues affecting mobile views.
- Improved tab behavior and styling consistency.

## [0.1.3] - 2025-04-19

### Added
- Advanced character randomization with support for sub-genres and visual traits.
- Visual trait support in portrait generation for improved consistency and style.
- Usage limit system:
  - Monthly caps per device.
  - Progress tracking and visual feedback.
  - Warning messages for approaching limits.
- Development-only bypass for usage limits.
- New utility functions for trait formatting and visual data processing.
- Input validation and sanitization for safer and more complete data entry.

### Changed
- Replaced "None" with "Not specified" across all dropdowns.
- Improved capitalization and formatting of displayed trait values.
- Enhanced OpenAI prompt structure for better reliability and output clarity.
- Refined occupation list, removing niche roles and organizing by genre.
- Improved genre templates with better sub-genre examples and structure.
- More specific error messages for common API issues.

### Fixed
- Removed underscores and improved capitalization in trait labels.
- Improved portrait generation prompts for consistent formatting and detail.

## [0.1.2] - 2025-04-18

### Added
- "Clear Options" button that preserves custom description and portrait selections.
- Advanced physical traits: height, build, and distinctive features.
- Background & origin options, including social class and homeland.
- Multi-select personality traits system (up to 3 traits).
- Searchable occupation selector with groupings by genre.

### Changed
- Upgraded genre system with expanded sub-genres.
- Introduced Lucide-based icons for genre visual indicators.
- Color-coded UI based on genre categories.
- Reorganized advanced options into clear, logical sections.
- Improved templates with clearer descriptions and examples.

## [0.1.1] - 2025-04-17

### Added
- Portrait customization options:
  - Art style (realistic, anime, comic, etc.)
  - Expression/mood
  - Framing (portrait, bust, full-body)
  - Background style
- Expandable advanced options section.
- Searchable dropdown component for improved UX.
- PWA support: app manifest and installable icons.
- Enhanced Open Graph and metadata for link previews.

### Changed
- UI reorganization for improved clarity and navigation.
- Better dropdown UX with searchable and grouped entries.
- Refined OpenAI prompt construction for portrait generation.

## [0.1.0] - 2025-04-12

### Added
- Initial release with full character generation engine.
- Genre selection with rich templates.
- Basic traits: gender, age, alignment, relationships.
- Quest, dialogue, and item generation options.
- AI-generated portraits via DALL·E 3.
- Export to JSON feature.
- Fully responsive UI for desktop and mobile.

[Unreleased]: https://github.com/EthanPerello/npc-forge/compare/v0.2.0...HEAD
[0.2.0]: https://github.com/EthanPerello/npc-forge/compare/v0.1.4...v0.2.0
[0.1.4]: https://github.com/EthanPerello/npc-forge/compare/v0.1.3...v0.1.4
[0.1.3]: https://github.com/EthanPerello/npc-forge/compare/v0.1.2...v0.1.3
[0.1.2]: https://github.com/EthanPerello/npc-forge/compare/v0.1.1...v0.1.2
[0.1.1]: https://github.com/EthanPerello/npc-forge/compare/v0.1.0...v0.1.1
[0.1.0]: https://github.com/EthanPerello/npc-forge/releases/tag/v0.1.0