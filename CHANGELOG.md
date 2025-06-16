# Changelog

All notable changes to NPC Forge will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed
- Linted codebase with `npx eslint . --fix` to enforce consistent formatting and resolve automatic fixes
- Regeneration outputs for appearance, personality, and backstory hooks now return short, single-paragraph results instead of verbose text
- Trait regeneration updated to preserve special characters (e.g. accented letters) in display and storage
- Model selector on edit page updated to show actual model names instead of only tier labels (e.g., “gpt-4o” instead of “Premium”)
- Model selection buttons restyled for consistent coloring and improved clarity when selected (helps users more easily identify the active model)
  
### Fixed
- Documentation updated across all files to:
  - Correct outdated framework references (e.g., “Next.js 14” → “Next.js 15”)
  - Remove redundant usage tables and move technical details to developer docs
  - Ensure version badge, changelog links, and content match latest release (v0.22.0)
  - Improve formatting, accuracy, and clarity across all remaining `.md` files

## [0.22.0] - 2025-06-13

### Added
- Developer Documentation homepage at `/docs/developer` with dedicated navigation and sidebar highlighting
- Clickable "Developer Docs" section in sidebar with breadcrumb-aware expansion and sub-page structure
- Visual loading indicators for regeneration across all edit page sections (not just traits)
- "Save to Library" → "View Library" dynamic button transition in character generation results step

### Changed
- Sidebar component refactored to integrate "Chat with Characters" link and fully support developer documentation section navigation
- Docs homepage updated to feature main docs and a link to the developer docs landing page
- Additional Traits section updated to:
  - Capitalize category names
  - Display all traits not included in the Basic Info or Character Traits sections
  - Include unsupported traits (e.g. custom personality entries)
- Regenerate button icon reverted to rotating circle (`RotateCcw`) for visual consistency across all edit sections
- Portrait section messaging updated to clarify that only `gpt-image-1` supports editing; DALL·E 2 and 3 do not
- Enhanced breadcrumb navigation under `/docs` to reflect correct hierarchy for developer documentation pages

### Fixed
- Quest regeneration fallback logic improved to handle malformed or non-JSON responses gracefully
- Visual regeneration states now correctly trigger for dialogue, items, quests, and basic info sections
- Developer docs sidebar section now properly expands and highlights based on active route
- Duplicate portrait regeneration status messages removed

## [0.21.0] - 2025-06-12

### Added
- AI-powered portrait editing via text prompts using OpenAI’s `/v1/images/edits` endpoint (supports `gpt-image-1`)
- "Add Generated Trait" button in Additional Traits section to generate a new short trait via AI
- Individual regenerate buttons for each trait in the Additional Traits section

### Changed
- Trait filtering now excludes long or sentence-like traits entirely (instead of truncating them)
- Trait formatting standardized to Title Case throughout the UI
- Additional Traits display logic now matches exactly between the character modal and edit page
- Navigation back to the Library after saving changes is now immediate with no artificial delay

### Fixed
- Traits missing from the edit page but visible in the modal due to inconsistent filtering logic

## [0.20.1] - 2025-06-10

### Added
- Enhanced JSON parsing with multiple fallback strategies to handle malformed AI responses
- Automatic retry logic for IndexedDB image loading with exponential backoff
- Request size validation and payload cleaning to prevent oversized API calls

### Changed
- Character regeneration API response format to match frontend expectations for all field types
- PortraitDisplay component to automatically load images from IndexedDB when image data unavailable
- Character card logic to always use PortraitDisplay instead of showing fallback initials
- Error categorization system with more specific user-friendly messages across all APIs
- Usage limit checking with graceful fallbacks when localStorage is unavailable

### Fixed
- Portrait regeneration returning "Invalid response format" errors on character edit pages
- Character portraits disappearing from library when regenerating character names or other text fields
- Character portraits not appearing in library character cards despite being stored correctly in IndexedDB
- 413 "Payload Too Large" errors during character and portrait regeneration by implementing data cleaning
- Character IDs containing quotes and special characters breaking URL routing and storage operations
- Chat API failures caused by oversized character data being sent to OpenAI endpoints
- JSON parsing failures from malformed AI responses with trailing commas or incomplete formatting
- Network timeout errors during portrait generation not properly triggering retry logic
- Usage limit system errors when localStorage access is restricted or corrupted
- Portrait display cropping issues in library cards cutting off important parts of character images

## [0.20.0] - 2025-06-09

### Added
- Chat with Character page at `/chat/[characterId]` with real-time messaging
- IndexedDB-based per-character conversation storage
- Dynamic response lengths based on user input, with a configurable cap
- Chat initiation button in character library modal and on character cards
- Usage-limit tracking for chat generations, charged against the selected text-model tier
- Chat documentation page at `/docs/chat`, covering new interactive chat features
- Support for embedded images in markdown documentation

### Changed
- Character library and modal:
  - Portraits fill containers responsively
  - Uniform card sizing with always-visible names
  - Genre badges removed
  - Search bar placeholder simplified to “Search characters…”
  - Clicking cards opens the modal (portrait zoom removed)
- Edit page:
  - Text and image model selectors moved to compact dropdowns at the top
  - Portrait section redesigned for cleaner layout and fewer tips
  - “Unsaved changes” warning expanded to cover all edits
- Model selector UI:
  - Redesigned as compact dropdowns with tier badges
  - Improved contrast in light mode
- Documentation system:
  - Improved layout, typography, and list styling for better readability
  - Enabled full-width display and responsive image support
  - Fixed duplicate descriptions and formatting inconsistencies

### Fixed
- Character IDs containing quotes now generate and route correctly  
- Unified image-loading logic resolves mismatches between library, modal, and edit screens  
- Chat API route enforces per-model usage limits and prevents mid-message truncation

## [0.19.0] - 2025-06-02

### Added
- Automatic documentation content loading system that reads directly from markdown files in docs/ directory
- Related Documentation cross-reference sections to contributing, credits, FAQ, license, and roadmap documentation pages

### Changed
- Documentation system now uses single-source markdown files for easier maintenance and updates
- Documentation content automatically updates when markdown files are modified without requiring component changes
- Roadmap documentation updated to remove emojis for cleaner, professional appearance
- Enhanced markdown rendering with improved visual hierarchy, content grouping, and typography throughout documentation pages

## [0.18.0] - 2025-05-30

### Added
- Comprehensive trait filtering system with dropdown filters for all character trait categories (personality, occupation, species, social class, height, build, homeland, etc.)
- Automatic trait discovery that creates filter dropdowns based on existing character data
- Enhanced trait display system showing all traits with category prefixes (e.g., "Personality: brave", "Occupation: knight")
- Organized filter panel with collapsible interface and categorized sections (Basic Information, Physical Traits, Background & Social, Personality)

### Changed
- Search functionality enhanced to intelligently handle trait-specific queries using "category: value" syntax
- Library filtering logic upgraded to support both dropdown filters and trait search simultaneously
- Filter panel redesigned with expandable sections and improved organization

## [0.17.0] - 2025-05-28

### Added
- Enhanced error handling with automatic retry logic for portrait generation failures
- User-friendly error messages with specific guidance for different failure types (rate limits, timeouts, network issues)
- Comprehensive JSON parsing with multiple fallback strategies to handle malformed AI responses

### Changed
- Portrait generation timeout increased from 90 to 120 seconds with automatic retry on failure
- Character generation now includes timeout protection and enhanced error recovery
- API error categorization system now provides more specific and actionable user guidance

### Fixed
- Portrait generation no longer hangs indefinitely on network timeouts or API connectivity issues
- Character generation failures due to malformed JSON responses with trailing commas or incomplete formatting
- Network timeout errors (ETIMEDOUT) now properly trigger retry logic instead of failing immediately
- Portrait regeneration reliability significantly improved with enhanced error recovery and user feedback

## [0.16.0] - 2025-05-27

### Added
- Unsaved changes warning banner on character edit pages when portrait modifications haven't been saved yet
- Enhanced error handling with retry logic for portrait generation failures
- Model-specific tips and generation status indicators in portrait section

### Changed
- Portrait regeneration on edit pages now requires explicit "Save Changes" action to persist modifications
- Improved error messages for portrait generation with specific guidance for different failure types (rate limits, quotas, network issues)
- Enhanced portrait generation reliability with automatic retry mechanism for temporary API failures

### Fixed
- Portrait regeneration no longer auto-saves changes without user confirmation on character edit pages
- Portrait generation errors now provide actionable feedback instead of generic failure messages
- API error handling now properly categorizes different types of failures (authentication, rate limits, server errors)
- Improved timeout handling and base64 validation for portrait generation requests
- Mobile stepper display now shows only step numbers on small screens to prevent text overflow and improve readability
- Random character generation now properly respects user's content type selections (portraits, quests, dialogue, items)
- Random character generation now correctly counts against monthly usage limits like regular character generation

## [0.15.1] - 2025-05-26

### Changed
- Save to Library button now shows success notification and keeps users on current page instead of redirecting to Library
- Success messages now appear as centered toast notifications that auto-dismiss after 5 seconds

### Fixed
- Premium portrait generation now works correctly with `gpt-image-1` model
- Field regeneration on character edit pages now works reliably without errors
- AI-generated content no longer includes unwanted formatting or prefixes in regenerated fields

## [0.15.0] - 2025-05-23

### Added
- `EditPageFooter` component to support consistent navigation on the Edit screen.

### Changed
- Improved navigation layout:
  - Added header to the Edit and Library pages for a consistent experience across views.
  - On mobile:
    - The header now auto-closes when the sidebar opens.
    - The stepper is now hidden when the sidebar is open to reduce visual clutter.
    - Adjusted spacing to ensure the sidebar toggle does not overlap the header title.
- Enhanced user flow:
  - Added a "Back to Library" button after character generation for quicker navigation.
- Refactored Edit Page layout:
  - Integrated a sticky footer for persistent navigation actions on the Edit page.
  - Simplified and polished existing edit-page components for clarity and reusability (e.g., `HeaderSection`, `PortraitSection`, `CharacterTraitsSection`, etc.).

## [0.14.0] - 2025-05-22

### Changed
- Rewrote random character generation logic to bypass delayed state updates and directly pass generated data to the API.
- Updated generation limits:
  - Text models: 50 (Standard), 30 (Enhanced), 10 (Premium)
  - Portrait models: 10 (Standard), 5 (Enhanced), 3 (Premium)
- Adjusted layout in the results step to a single-column format when no portrait is generated.
- Updated default text in the character description input field for clarity and consistency.
- Adjusted layout in the results step and character modal to a single-column format when no portrait is present.

### Added
- `include_portrait` toggle in concept step, allowing users to enable or disable portrait generation.

## [0.13.1] - 2025-05-16

### Changed
- Rewrote and updated all public documentation to match the current v0.13.0 features:
  - Wizard-based character creation flow
  - Model selection system with tiers and usage limits
  - Regeneration tools for character attributes, portraits, quests, and dialogue
  - Character library guide, advanced options, and updated architecture explanations
- Updated sidebar navigation to reflect current documentation structure:
  - Removed obsolete links (`changelog`, `prompts`)
  - Added new sections: Character Library and Model Selection

### Added
- New documentation sections:
  - Character Library
  - Model Selection
  - Regeneration overview
- Updated main documentation landing page for improved navigation

### Removed
- Deprecated documentation pages: `changelog/` and `prompts/`

## [0.13.0] - 2025-05-15

### Added
- Redesigned character creation flow with a new step-by-step wizard interface:
  - Four steps: Concept, Options, Model, Generate
  - Sticky top progress bar with clickable navigation
  - Welcome popup for first-time users introducing the flow
- Generate Random Character button that creates a default character and navigates directly to the final step
- Sticky footer rebuilt for the new wizard layout:
  - Step-aware controls for Continue, Back, and New Character
  - Progress indicators consistent across steps
- Revised character display layout:
  - Name, portrait, trait tags, and action buttons grouped on the left
  - Profile, quests, dialogue, and items shown in tabbed content on the right

### Changed
- Character creation form replaced: old tabbed layout removed in favor of a guided wizard experience
- Trait tags in character display and library modal now use Label: Value format and exclude non-trait metadata (e.g. appearance, personality, backstory)
- Header layout and image adjusted to ensure all five character faces are clearly visible across screen sizes
- Genre selection no longer auto-fills the description field

### Removed
- Legacy tabbed character creation interface and related components (e.g. main-form-tabs.tsx, character-form.tsx)

## [0.12.1] - 2025-05-14

### Fixed
- Fixed bug where character generation would trigger automatically without clicking the Generate button.
- Fixed issue where character portraits would disappear after saving to the library.
- Fixed bug causing stale portraits to appear after regeneration due to improper state and cache management.

## [0.12.0] - 2025-05-09

### Added
- Character regeneration capabilities in the edit page:
  - Individual character attributes (name, appearance, personality, backstory)
  - Portrait images with selected model support
  - Quest regeneration with component-level control (title, description, reward)
  - Dialogue line regeneration with proper formatting
  - Item regeneration with character-appropriate descriptions
- Loading states and visual feedback for all regeneration actions
- Success/error feedback messages for regeneration operations
- New API endpoint (/api/regenerate) for handling OpenAI regeneration requests

### Changed
- Improved character edit page with regenerate buttons for all editable fields
- Enhanced portrait display with loading animation during regeneration
- Updated model selectors to control which AI model is used for regeneration
- Added small amount of padding under buttons at bottom of character modal

### Fixed
- Prevented infinite update loops in portrait display component
- Fixed portrait disappearing after saving to library or viewing a character

## [0.11.1] - 2025-05-08

### Changed
- Improved image handling across display, storage, and context components

### Fixed
- UI consistency improvements:
  - Icon/text color consistency in buttons across light/dark themes
  - Delete button text color in light mode to ensure white text on red background
  - Misaligned icon and badge in image model selector
  - Unnecessary padding below modal buttons in character viewer
  - Consistent coloring for button icons to match text in all themes
- Character card enhancements:
  - All action buttons (edit, download JSON, download portrait, delete) are now visible directly on each card
  - Portrait download button moved to top-left corner for better layout
- Layout fixes:
  - Extra padding to ensure the GitHub link and footer content are not cut off
  - Sticky footer showing behind character modals
  - Model selection card layouts and alignment

## [0.11.0] - 2025-05-07

### Added
- Model selectors for text and image regeneration on the edit character page
- Upload and regenerate portrait buttons in the editor (always visible regardless of image state)
- Download portrait button on the main character display
- Delete button directly on character cards in the library list (no need to open modal)
- Full character data storage in IndexedDB, replacing localStorage
- Resilient IndexedDB storage with object store validation and database recovery logic
- "Reset Database" option when IndexedDB errors are detected
- Welcome Guide redesigned with updated visuals, icons, and steps for new users

### Changed
- Portrait controls in the editor moved below the image for better UX and layout
- Portrait now persists after saving a character to the library
- Example characters now appear immediately on first load (no refresh needed)
- Filter dropdowns in the character library now use consistent UI components (Select, SearchableSelect)
- Modal layout spacing improved to prevent sticky footer overlap on mobile and desktop
- "Enhanced" label in the portrait model selector now aligned correctly with the card

### Fixed
- Character portraits now appear correctly in library detail view when a character is clicked
- Prevented duplicate example characters from appearing in the library
- React hook ordering violation in the CharacterLibraryPage component
- localStorage quota errors by completing the IndexedDB migration for all character data

### Removed
- Redundant "Import Character" button from the top of the library page
- "Usage varies by model tier..." footer banner from the main screen

## [0.10.0] - 2025-05-06

### Added
- Ability to add and remove quests, dialogue lines, and items in the character editor
- Regeneration buttons for newly added elements (quests, dialogue, items)
- Regeneration controls for individual sections of a quest (e.g., title, reward, description)
- Option to regenerate character portraits from the editor
- Character portrait storage switched from localStorage to IndexedDB for improved reliability and capacity
- IndexedDB utilities for saving, retrieving, and deleting portrait images
- Automatic compression and storage of portrait images as base64 when saving to library
- IndexedDB integration into character card, display, edit page, and context provider

### Changed
- Improved mobile layout of character library cards and footer actions
- Refactored sticky footer into a responsive standalone component
- Updated character editor and creation form to allow unlimited trait selection

### Removed
- "Special Ability" field from character profiles
- 3-trait limit for personality traits in both the editor and advanced options dropdown

## [0.9.0] - 2025-05-05

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

### Fixed
- Example characters now appear in library on first visit without requiring refresh
- Different background colors for genre vs sub-genre indicators in library
- JSON viewer text color in light mode
- Character traits now display properly in edit page with all options available
- Character edit page with better organization of fields
- Individual containers for quests in edit page for better visual separation

### Removed
- Example description box from the character description field

## [0.8.0] - 2025-05-04

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

## [0.7.2] - 2025-05-02

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

## [0.7.1] - 2025-05-01

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

## [0.7.0] - 2025-04-29

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
- Complete dark mode toggle system:
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
- Updated layouts to support theme context and toggle button placement
- Enhanced globals.css for better theme transition support
- Improved usage limit display to show the most constrained selected model

### Fixed
- Next.js version reference from 15 to 14 throughout documentation
- Date inconsistencies in release information

## [0.6.0] - 2025-04-22

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

## [0.5.0] - 2025-04-21

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
- Enhanced mobile responsiveness across all screens and components
- Replaced emoji-based item icons with consistent Lucide icons

### Fixed
- Sub-genre selection now persists when switching between tabs in the character creation form
- Infinite update loop in the usage limit display component
- Layout issues affecting mobile views
- Tab behavior and styling consistency

## [0.4.0] - 2025-04-19

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
- Underscores and improved capitalization in trait labels
- Portrait generation prompts for consistent formatting and detail

## [0.3.0] - 2025-04-18

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

## [0.2.0] - 2025-04-17

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

[Unreleased]: https://github.com/EthanPerello/npc-forge/compare/v0.22.0...HEAD
[0.22.0]: https://github.com/EthanPerello/npc-forge/compare/v0.21.0...v0.22.0
[0.21.0]: https://github.com/EthanPerello/npc-forge/compare/v0.20.1...v0.21.0
[0.20.1]: https://github.com/EthanPerello/npc-forge/compare/v0.20.0...v0.20.1
[0.20.0]: https://github.com/EthanPerello/npc-forge/compare/v0.19.0...v0.20.0
[0.19.0]: https://github.com/EthanPerello/npc-forge/compare/v0.18.0...v0.19.0
[0.18.0]: https://github.com/EthanPerello/npc-forge/compare/v0.17.0...v0.18.0
[0.17.0]: https://github.com/EthanPerello/npc-forge/compare/v0.16.0...v0.17.0
[0.16.0]: https://github.com/EthanPerello/npc-forge/compare/v0.15.1...v0.16.0
[0.15.1]: https://github.com/EthanPerello/npc-forge/compare/v0.15.0...v0.15.1
[0.15.0]: https://github.com/EthanPerello/npc-forge/compare/v0.14.0...v0.15.0
[0.14.0]: https://github.com/EthanPerello/npc-forge/compare/v0.13.2...v0.14.0
[0.13.2]: https://github.com/EthanPerello/npc-forge/compare/v0.13.1...v0.13.2
[0.13.1]: https://github.com/EthanPerello/npc-forge/compare/v0.13.0...v0.13.1
[0.13.0]: https://github.com/EthanPerello/npc-forge/compare/v0.12.1...v0.13.0
[0.12.1]: https://github.com/EthanPerello/npc-forge/compare/v0.12.0...v0.12.1
[0.12.0]: https://github.com/EthanPerello/npc-forge/compare/v0.11.1...v0.12.0
[0.11.1]: https://github.com/EthanPerello/npc-forge/compare/v0.11.0...v0.11.1
[0.11.0]: https://github.com/EthanPerello/npc-forge/compare/v0.10.0...v0.11.0
[0.10.0]: https://github.com/EthanPerello/npc-forge/compare/v0.9.0...v0.10.0
[0.9.0]: https://github.com/EthanPerello/npc-forge/compare/v0.8.0...v0.9.0
[0.8.0]: https://github.com/EthanPerello/npc-forge/compare/v0.7.2...v0.8.0
[0.7.2]: https://github.com/EthanPerello/npc-forge/compare/v0.7.1...v0.7.2
[0.7.1]: https://github.com/EthanPerello/npc-forge/compare/v0.7.0...v0.7.1
[0.7.0]: https://github.com/EthanPerello/npc-forge/compare/v0.6.0...v0.7.0
[0.6.0]: https://github.com/EthanPerello/npc-forge/compare/v0.5.0...v0.6.0
[0.5.0]: https://github.com/EthanPerello/npc-forge/compare/v0.4.0...v0.5.0
[0.4.0]: https://github.com/EthanPerello/npc-forge/compare/v0.3.0...v0.4.0
[0.3.0]: https://github.com/EthanPerello/npc-forge/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/EthanPerello/npc-forge/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/EthanPerello/npc-forge/releases/tag/v0.1.0