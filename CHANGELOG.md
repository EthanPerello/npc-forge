# Changelog

All notable changes to NPC Forge will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),  
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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