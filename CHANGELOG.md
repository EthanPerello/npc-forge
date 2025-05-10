# Changelog

All notable changes to NPC Forge will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Character regeneration capabilities in the edit page:
  - Ability to regenerate individual character attributes (name, appearance, personality, backstory)
  - Support for regenerating portrait images with selected model
  - Quest regeneration with options for entire quest or specific parts (title, description, reward)
  - Dialogue line regeneration with proper formatting
  - Item regeneration with character-appropriate descriptions
- Loading states and visual feedback for all regeneration actions
- Success/error feedback messages for regeneration operations
- New API endpoint (/api/regenerate) for handling OpenAI regeneration requests

### Changed
- Improved character edit page with regenerate buttons for all editable fields
- Enhanced portrait display with loading animation during regeneration
- Updated model selectors to control which AI model is used for regeneration
- - Added small amount of padding under buttons at button of character modal

### Fixed
- Prevented infinite update loops in portrait display component
- Fixed portrait disappearing after saving to library or viewing a character

## [0.3.4] - 2025-05-08

### Fixed
- Improved image handling across display, storage, and context components
- UI consistency improvements:
  - Fixed icon/text color consistency in buttons across light/dark themes
  - Fixed delete button text color in light mode to ensure white text on red background
  - Fixed misaligned icon and badge in image model selector
  - Fixed unnecessary padding below modal buttons in character viewer
  - Added consistent coloring for button icons to match text in all themes
- Character card enhancements:
  - All action buttons (edit, download JSON, download portrait, delete) are now visible directly on each card
  - Portrait download button moved to top-left corner for better layout
- Layout fixes:
  - Added extra padding to ensure the GitHub link and footer content are not cut off
  - Fixed sticky footer showing behind character modals
  - Improved model selection card layouts and alignment

## [0.3.3] - 2025-05-07

### Added
- Model selectors for text and image regeneration on the edit character page
- Upload and regenerate portrait buttons in the editor, always visible regardless of image state
- Download portrait button on the main character display
- Delete button added directly to character cards in the library list (no need to open modal)
- Full character data (not just images) now stored in IndexedDB, replacing localStorage
- Resilient IndexedDB storage with object store validation and database recovery logic
- New "Reset Database" option added when IndexedDB errors are detected
- Welcome Guide redesigned with updated visuals, icons, and steps for new users

### Changed
- Portrait controls in the editor moved below the image for better UX and layout
- Portrait now persists after saving a character to the library (no more disappearing image)
- Example characters now appear immediately on first load (no refresh needed)
- Filter dropdowns in the character library now use consistent UI components (e.g. `Select`, `SearchableSelect`)
- Modal layout spacing improved to prevent sticky footer overlap on mobile and desktop
- "Enhanced" label in the portrait model selector now aligned correctly with the card

### Removed
- Redundant "Import Character" button from the top of the library page
- "Usage varies by model tier..." footer banner from the main screen

### Fixed
- Character portraits now appear correctly in library detail view when a character is clicked
- Prevented duplicate example characters from appearing in the library
- Fixed React hook ordering violation in the CharacterLibraryPage component
- Resolved localStorage quota errors by completing the IndexedDB migration for all character data

## [0.3.2] - 2025-05-06

### Added
- Ability to add and remove quests, dialogue lines, and items in the character editor
- Regeneration buttons for newly added elements (quests, dialogue, items)
- Regeneration controls for individual sections of a quest (e.g., title, reward, description)
- Option to regenerate character portraits from the editor
- Switched character portrait storage from localStorage to IndexedDB for improved reliability and capacity
- Implemented IndexedDB utilities for saving, retrieving, and deleting portrait images
- Automatically compresses and stores portrait images as base64 when saving to library
- Integrated IndexedDB into character card, display, edit page, and context provider

### Changed
- Improved mobile layout of character library cards and footer actions
- Refactored sticky footer into a responsive standalone component
- Updated character editor and creation form to allow unlimited trait selection
- Removed 3-trait limit for personality traits in both the editor and advanced options dropdown

### Removed
- "Special Ability" field from character profiles

## [0.3.1] - 2025-05-05

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

### Removed
- Example description box from the character description field

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
- Refactored `globals.css` by consolidating and cleaning up redundant style rules

### Fixed
- Various styling issues in light mode

## [0.2.3] - 2025-05-02

### Changed
- Replaced all native `<select>` elements across the app with a custom full-width dropdown using the existing `ui/select.tsx` component for consistent styling and improved accessibility

### Fixed
- Portrait generation issue for gpt-image-1 by switching quality parameter from "hd" to "high"
- Numerous contrast issues in light mode across the application:
  - Buttons such as "Get Started", "Generate Character", and "Download JSON" now maintain readability
  - Selected personality traits, quest type labels, and subgenre options have improved text visibility
  - API endpoint and contributing file references have darker text for better contrast
  - Changelog version numbers and roadmap priority badges have enhanced clarity
  - User feedback messages like "Character generation may take a second..." now display properly
  - Selected model generation badges (e.g., "∞ left") have corrected contrast in all selectors

## [0.2.2] - 2025-05-01

### Added
- New CSS utility classes: `text-description`, `bg-secondary`, `border-theme`, and additional variants for consistent theme support
- Example-specific selectors in `globals.css` to improve dynamic content readability in light mode

### Changed
- Refactored theme styling system to use standardized CSS variables and utility classes
- Simplified randomization logic in `character-form.tsx` to eliminate state timing patterns
- Updated global styles to improve visibility for UI elements in light mode

### Fixed
- Portrait generation errors when using unsupported parameters for DALL·E-2
- Randomize button behavior to ensure character description updates with selected genre
- Text contrast and accessibility in light mode across multiple components

## [0.2.1] - 2025-04-29

### Added
- Delayed feedback message system that displays after 3 seconds of character generation
- Model selector for text generation with tiered options:
  - Supports `gpt-4o-mini`, `gpt-4.1-mini`, and `gpt-4o` 
  - Includes usage tiers and monthly limits
- Image model selector for portraits with tiered options:
  - Supports `dall-e-2`, `dall-e-3`, and `gpt-image-1`
  - Matches tier system of text models
- Visual model selection UI with emoji indicators (🟢🟡🔴), model names, and descriptions
- Per-model usage limits tracked in localStorage with automatic monthly resets
- Unlimited usage option for the cheapest tier models
- Development bypass for all usage limits to facilitate testing
- Complete dark mode toggle system with:
  - ThemeContext for state management across the app
  - ThemeToggle button for switching between themes
  - Tailwind CSS integration using the .dark class
  - Theme preference persistence via localStorage
  - Smooth transitions between theme states

### Changed
- Refactored context and form components to support model selection
- Simplified tier display while retaining full model name transparency
- Updated usage-limit utilities for both image and text models
- Standardized documentation styling with consistent headers, layouts, and formatting
- Corrected Next.js version reference from 15 to 14 throughout documentation
- Fixed date inconsistencies in release information
- Updated layouts to support theme context and toggle button placement
- Enhanced globals.css for better theme transition support
- Improved usage limit display to show the most constrained selected model

## [0.2.0] - 2025-04-22

### Added
- Fully integrated documentation system with sidebar and breadcrumb navigation
- New documentation pages covering all aspects of the application:
  - Usage guides, character examples, and generation options
  - Features overview, FAQs, and developer setup instructions
  - Architecture documentation, API references, and security notes
  - Contributing guidelines, testing procedures, and deployment instructions
  - Roadmap, changelog, credits, and license information
- Corresponding GitHub Markdown files for all documentation pages
- Enhanced navigation features including collapsible sidebar and breadcrumb trails
- Success message that appears after character generation (auto-dismisses after 3 seconds)

### Changed
- Character tab interface now auto-resets to the "Profile" tab after generation
- Refactored documentation folder structure and file organization
- Consolidated image assets for better organization
- Redesigned homepage header with layered hero layout and collage image
- Improved typography and animations throughout the interface

### Fixed
- Welcome guide toggle now functions reliably in all environments
- Character display now correctly resets and updates with new character data

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

[Unreleased]: https://github.com/EthanPerello/npc-forge/compare/v0.3.4...HEAD
[0.3.4]: https://github.com/EthanPerello/npc-forge/compare/v0.3.3...v0.3.4
[0.3.3]: https://github.com/EthanPerello/npc-forge/compare/v0.3.2...v0.3.3
[0.3.2]: https://github.com/EthanPerello/npc-forge/compare/v0.3.1...v0.3.2
[0.3.1]: https://github.com/EthanPerello/npc-forge/compare/v0.3.0...v0.3.1
[0.3.0]: https://github.com/EthanPerello/npc-forge/compare/v0.2.3...v0.3.0
[0.2.3]: https://github.com/EthanPerello/npc-forge/compare/v0.2.2...v0.2.3
[0.2.2]: https://github.com/EthanPerello/npc-forge/compare/v0.2.1...v0.2.2
[0.2.1]: https://github.com/EthanPerello/npc-forge/compare/v0.2.0...v0.2.1
[0.2.0]: https://github.com/EthanPerello/npc-forge/compare/v0.1.4...v0.2.0
[0.1.4]: https://github.com/EthanPerello/npc-forge/compare/v0.1.3...v0.1.4
[0.1.3]: https://github.com/EthanPerello/npc-forge/compare/v0.1.2...v0.1.3
[0.1.2]: https://github.com/EthanPerello/npc-forge/compare/v0.1.1...v0.1.2
[0.1.1]: https://github.com/EthanPerello/npc-forge/compare/v0.1.0...v0.1.1
[0.1.0]: https://github.com/EthanPerello/npc-forge/releases/tag/v0.1.0