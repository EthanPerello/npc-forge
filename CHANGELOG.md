# Changelog

All notable changes to NPC Forge will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed
- Improved mobile UI with optimized sticky footer layout
- Enhanced character library responsiveness on small screens
- Added larger touch targets for improved mobile usability

## [0.3.1] - May 5, 2025

### Added
- Sticky footer with Generate Character, Clear Options, and Randomize buttons
- Auto-fill message when description is populated based on genre selection (persists until changed)
- Generate Character button now appears both on main page and in sticky footer
- Example quest format in the Quests tab similar to other tabs
- Loading message as floating notification that appears above the sticky footer
- Delete character button in library detail view
- Ability to add, edit, and remove custom traits in character editor

### Changed
- Items tab rarity distribution now defaults to "Any" instead of "Balanced"
- Example characters can now be edited and deleted from library
- Description field automatically updates when genre changes (if not manually edited)
- Updated usage text at bottom of main page to accurately reflect tiered model system
- Removed example description box from the character description field

### Fixed
- Example characters now appear in library on first visit without requiring refresh
- Different background colors for genre vs sub-genre indicators in library
- Fixed JSON viewer text color in light mode
- Character traits now display properly in edit page with all options available
- Improved character edit page with better organization of fields
- Individual containers for quests in edit page for better visual separation

## [0.3.0] - 2025-05-04

### Added
- Character Library system:
  - New dedicated page for viewing, managing, and filtering saved characters
  - Interactive character cards with detailed view on click
  - Character editing functionality for user-created characters
  - Ability to delete characters from the library
  - Example characters preloaded in the library
- Save character functionality from character display screen
- JSON import/export capabilities:
  - Download characters as JSON files
  - Upload JSON files to add characters to the library
- Search and filter functionality in the Character Library:
  - Text search across character names and properties
  - Genre-based filtering
- Storage system using localStorage for persistent character data
- Updated sidebar navigation with Character Library link
- Integrated Vercel Analytics for automatic page view tracking

### Changed
- Refactored `globals.css` by consolidating and cleaning up redundant or conflicting style rules. No visual changes expected.
- Fixed various styling issues in light mode

## [0.2.3] - 2025-05-02

### Changed
- Replaced all native `<select>` elements across the app with a custom full-width dropdown using the existing `ui/select.tsx` component for consistent styling and improved accessibility.

### Fixed
- Fixed portrait generation issue for gpt-image-1 by switching quality parameter from "hd" to "high"
- Fixed numerous contrast issues in light mode across the application:
  - Updated "Get Started", "Generate Character", and "Download JSON" buttons to maintain readability in light mode
  - Improved text visibility for selected personality traits, quest type labels, and subgenre options
  - Darkened API endpoint and contributing file references for better contrast
  - Enhanced text on changelog version numbers and roadmap priority badges
  - Ensured clear feedback for "Character generation may take a second…" and "Character successfully generated!" messages in light mode
  - Corrected contrast of selected model generation badges (e.g., "∞ left") in both character and image model selectors

## [0.2.2] - 2025-05-01

### Added
- New CSS utility classes: `text-description`, `bg-secondary`, `border-theme`, and additional variants for consistent theme support
- Example-specific selectors in `globals.css` to improve the readability of dynamic example content in light mode

### Changed
- Refactored theme styling system to use standardized CSS variables and utility classes (`bg-card`, `text-muted`, `border-theme`, etc.) for consistent appearance across light and dark modes
- Simplified randomization logic in `character-form.tsx` to eliminate fragile state timing patterns
- Updated global styles to improve visibility for UI elements like subgenre text, welcome guide examples, and tabbed panels in light mode

### Fixed
- Fixed portrait generation errors by omitting unsupported parameters for DALL·E-2 and conditionally applying model-specific options
- Corrected the randomize button behavior to ensure the character description updates reliably alongside the selected genre
- Improved text contrast and accessibility in light mode across multiple components, including form labels, documentation content, and example text

## [0.2.1] - 2025-04-29

### Added
- Delayed feedback message system:
  - Displays after 3 seconds of character generation to manage user expectations
- Model selector for text generation:
  - Supports `gpt-4o-mini`, `gpt-4.1-mini`, and `gpt-4o` with usage tiers and monthly limits
- Image model selector for portraits:
  - Supports `dall-e-2`, `dall-e-3`, and `gpt-image-1` with matching tier system
- Visual model selection UI:
  - Tiered design with emoji indicators (🟢🟡🔴), model names, and descriptions
- Per-model usage limits:
  - Tracked in localStorage, with automatic resets per month
  - Unlimited usage for the cheapest tier
- Development bypass for all usage limits for testing purposes
- Implemented complete dark mode toggle system:
  - Created ThemeContext for managing light, dark, and system themes
  - Added a ThemeToggle button for switching themes
  - Integrated theme switching with Tailwind CSS using the .dark class
  - Persisted user theme preference with localStorage
  - Applied smooth theme transitions across the app

### Changed
- Refactored context and form components to support model selection
- Simplified tier display while retaining full model name transparency
- Updated usage-limit utilities for both image and text models
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
- Enhanced globals.css for dark mode transitions and theme-aware UI components
- Usage limit display and notification components now compare the user's selected text and image models
- Displays whichever selected model has fewer remaining generations (e.g., "7 Portrait Premium generations remaining")

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
- Welcome guide component with step-by-step instructions for new users
- "Get Started" button in the welcome guide that reveals the character creation form
- Tooltips for form options to help users understand their purpose
- Success animation triggered after character generation completes
- More Lucide icons used throughout the UI for visual consistency
- Enhanced animations and transitions for a smoother user experience
- Development-only feature: Welcome guide is always visible in development mode for easier testing

### Changed
- Complete UI redesign with improved layout, spacing, and visual hierarchy
- Updated color palette to a consistent indigo/blue scheme
- Redesigned character card with better styling and visual clarity
- Refined tab interface with improved interaction feedback
- Replaced emoji-based item icons with consistent Lucide icons
- Enhanced mobile responsiveness across all screens and components

### Fixed
- Sub-genre selection now persists when switching between tabs in the character creation form
- Fixed infinite update loop in the usage limit display component
- Resolved layout issues affecting mobile views
- Improved tab behavior and styling consistency

## [0.1.3] - 2025-04-19

### Added
- Advanced character randomization with support for sub-genres and visual traits
- Visual trait support in portrait generation for improved consistency and style
- Usage limit system:
  - Monthly caps per device
  - Progress tracking and visual feedback
  - Warning messages for approaching limits
- Development-only bypass for usage limits
- New utility functions for trait formatting and visual data processing
- Input validation and sanitization for safer and more complete data entry

### Changed
- Replaced "None" with "Not specified" across all dropdowns
- Improved capitalization and formatting of displayed trait values
- Enhanced OpenAI prompt structure for better reliability and output clarity
- Refined occupation list, removing niche roles and organizing by genre
- Improved genre templates with better sub-genre examples and structure
- More specific error messages for common API issues

### Fixed
- Removed underscores and improved capitalization in trait labels
- Improved portrait generation prompts for consistent formatting and detail

## [0.1.2] - 2025-04-18

### Added
- "Clear Options" button that preserves custom description and portrait selections
- Advanced physical traits: height, build, and distinctive features
- Background & origin options, including social class and homeland
- Multi-select personality traits system (up to 3 traits)
- Searchable occupation selector with groupings by genre

### Changed
- Upgraded genre system with expanded sub-genres
- Introduced Lucide-based icons for genre visual indicators
- Color-coded UI based on genre categories
- Reorganized advanced options into clear, logical sections
- Improved templates with clearer descriptions and examples

## [0.1.1] - 2025-04-17

### Added
- Portrait customization options:
  - Art style (realistic, anime, comic, etc.)
  - Expression/mood
  - Framing (portrait, bust, full-body)
  - Background style
- Expandable advanced options section
- Searchable dropdown component for improved UX
- PWA support: app manifest and installable icons
- Enhanced Open Graph and metadata for link previews

### Changed
- UI reorganization for improved clarity and navigation
- Better dropdown UX with searchable and grouped entries
- Refined OpenAI prompt construction for portrait generation

## [0.1.0] - 2025-04-12

### Added
- Initial release with full character generation engine
- Genre selection with rich templates
- Basic traits: gender, age, alignment, relationships
- Quest, dialogue, and item generation options
- AI-generated portraits via DALL·E 3
- Export to JSON feature
- Fully responsive UI for desktop and mobile

[Unreleased]: https://github.com/EthanPerello/npc-forge/compare/v0.3.1...HEAD
[0.3.1]: https://github.com/EthanPerello/npc-forge/compare/v0.3.0...v0.3.1
[0.1.0]: https://github.com/EthanPerello/npc-forge/releases/tag/v0.1.0