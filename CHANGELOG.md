# Changelog

All notable changes to NPC Forge will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Welcome guide component with step-by-step instructions for new users
- Success animation when character is successfully generated
- Tooltips for form options to explain their purpose
- Enhanced animations and transitions for better user experience
- More Lucide icons throughout UI for consistent visual language
- "Get Started" button in welcome guide that reveals the character creation form
- Development mode enhancement: Welcome guide always shows in development environment for easier testing and development

### Changed
- Completely overhauled UI design with improved visual hierarchy and styling
- Enhanced color scheme with consistent indigo/blue palette
- Improved layout and spacing for better readability
- Redesigned character card display with consistent styling
- Enhanced tab interface with improved visual feedback
- Improved mobile responsiveness across all components
- Replaced emoji item icons with consistent Lucide icons

### Fixed
- Mobile responsiveness and layout issues
- Improved tab interface behavior and styling
- Fixed infinite update loop in usage limit display

## [0.1.3] - 2025-04-19

### Added
- Enhanced character randomization to include advanced options and sub-genres
- Improved image generation with support for visual traits and prompt enhancements
- Usage limit system with monthly caps, progress tracking, and warning notices
- Developer tools: bypass generation limits in dev mode
- New utility functions for trait formatting and visual processing
- Input validation and sanitization for improved data safety and completeness

### Changed
- All dropdowns now use "Not specified" instead of "None"
- Improved formatting and capitalization of trait values
- Reworked genre templates with expanded sub-genres and clearer examples
- Better OpenAI prompt design for resilience and clarity
- Refined occupation list by genre; removed niche/uncommon roles
- Enhanced error handling with more specific messages

### Fixed
- Removed underscores and improved formatting in trait displays
- Improved consistency in portrait generation prompts and responses

## [0.1.2] - 2025-04-18

### Added
- "Clear Options" button that preserves description and portrait options
- Advanced physical traits section (height, build, distinctive features)
- Background & origin options (social class, homeland)
- Multi-select personality traits system (up to 3 traits)
- Searchable occupation dropdown with genre-based grouping

### Changed
- Enhanced genre system with four core genres and sub-genres
- Replaced emoji icons with Lucide-based icons for genres
- Implemented color-coded UI for genre categories
- Updated templates.ts with improved examples and descriptions
- Reorganized advanced options UI with logical sections

## [0.1.1] - 2025-04-17

### Added
- Portrait customization options:
  - Art style selection (realistic, fantasy, anime, comic book, etc.)
  - Mood/expression options
  - Framing options (portrait, bust, full-body)
  - Background style selection
- Expandable UI component for advanced options sections
- Searchable dropdown component for improved selection interfaces
- PWA support with app manifest and icons
- Enhanced metadata and Open Graph images

### Changed
- Reorganized UI for better user experience
- Improved dropdown components for more intuitive selection
- Enhanced OpenAI prompt engineering for portraits

## [0.1.0] - 2025-04-12

### Added
- Initial release with core character generation functionality
- Genre template selection
- Basic character traits (gender, age, alignment, relationship)
- Quest generation options
- Dialogue generation options
- Item generation options
- AI-generated portraits using DALL-E 3
- JSON export functionality
- Responsive design for desktop and mobile
