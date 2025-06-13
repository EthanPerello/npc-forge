# Features Overview

NPC Forge offers comprehensive tools for creating detailed non-player characters for your games, stories, and creative projects.

## Core Features

### Interactive Chat System

• **Real-Time Conversations**: Chat directly with your generated characters
• **Character-Aware Responses**: AI maintains character personality, backstory, and traits during conversations
• **Persistent Chat History**: Conversations automatically saved per character using IndexedDB
• **Dynamic Response Lengths**: AI adjusts response length based on conversation context (1-3 paragraphs)
• **Integrated Chat Access**: Start conversations directly from character cards and library modal
• **Usage Tracking**: Chat generations count against your selected text model tier limits
• **Smart Context Management**: Recent conversation history provided to AI for continuity
• **Error Handling**: Retry functionality for failed messages with clear error categorization

### AI-Powered Portrait Editing

• **Text-Based Editing**: Edit character portraits using natural language prompts
• **Multiple Model Support**: Portrait editing available with gpt-image-1 (Premium tier)
• **Smart Edit Validation**: Automatic validation of edit prompts and model compatibility
• **Seamless Integration**: Edit portraits directly from character edit pages
• **Enhanced Image Processing**: Optimized handling for various image formats and sizes
• **Error Recovery**: Comprehensive error handling with user-friendly feedback
• **Unsaved Changes Warning**: Clear indication when portrait edits haven't been saved

### Advanced Trait Management

• **AI-Generated Traits**: Generate new character traits using AI assistance
• **Individual Trait Regeneration**: Regenerate specific traits without affecting others
• **Smart Trait Filtering**: Automatic exclusion of overly long or sentence-like traits
• **Title Case Formatting**: Consistent trait formatting throughout the application
• **Enhanced Trait Display**: Improved visual presentation and organization
• **Custom Trait Addition**: Add, edit, and remove custom traits in character editor
• **Trait Categories**: Organized trait display with category prefixes for better understanding

### Wizard-Based Character Creation

• **Step-by-Step Process**: Four-step guided creation
  • **Concept Step**: Genre selection and character description
  • **Options Step**: Trait and attribute customization  
  • **Model Step**: AI model selection
  • **Generate Step**: Character generation and results
• **Progress Tracking**: Progress bar with step navigation
• **Welcome Guide**: Interactive tutorial for new users
• **Portrait Toggle**: Option to include or exclude portrait generation
• **Auto-Fill Descriptions**: Genre-based description suggestions
• **Random Generation**: One-click random character creation with customizable options

### Character Library & Management

• **Organized Storage**: IndexedDB-based character storage with automatic backup
• **Advanced Filtering**: Comprehensive trait-based filtering system with dropdown filters
• **Smart Search**: Intelligent search with "category: value" syntax support
• **Export/Import**: JSON export for character data portability
• **Character Editing**: Full edit capabilities for all character attributes
• **Bulk Operations**: Select and manage multiple characters simultaneously
• **Visual Organization**: Grid and list view options with responsive design
• **Automatic Trait Discovery**: Dynamic filter creation based on existing character data

### Model Selection System

• **Three-Tier System**: Standard, Enhanced, and Premium model options
• **Usage Tracking**: Monthly limit monitoring with visual indicators
• **Model-Specific Features**: Different capabilities across tiers
• **Flexible Selection**: Independent text and image model selection
• **Usage Optimization**: Smart recommendations for efficient usage
• **Transparent Limits**: Clear display of remaining generations per tier

### Portrait Generation & Management

• **AI-Generated Portraits**: High-quality character portraits using DALL-E models
• **Multiple Art Styles**: Various artistic styles and rendering options
• **Customizable Options**: Detailed control over portrait generation parameters
• **Portrait Editing**: Advanced text-prompt-based editing capabilities
• **Image Storage**: Efficient IndexedDB storage with automatic loading
• **Quality Options**: Different quality levels based on selected model tier
• **Fallback Systems**: Graceful handling when portraits aren't available

### Content Generation Options

• **Rich Character Profiles**: Comprehensive personality, background, and trait generation
• **Quest Generation**: Dynamic quest creation with objectives and rewards
• **Dialogue Systems**: Character-appropriate dialogue samples and conversation starters
• **Item Generation**: Unique items with descriptions, properties, and lore
• **Relationship Mapping**: Character connections and social dynamics
• **Backstory Creation**: Detailed character histories and motivations

## Technical Features

### Performance & Reliability

• **IndexedDB Storage**: Efficient local storage for characters and portraits
• **Automatic Retry Logic**: Robust error handling with automatic retry mechanisms
• **Request Optimization**: Smart API request management and payload optimization
• **Response Validation**: Comprehensive validation of AI-generated content
• **Loading States**: Clear feedback during generation and processing
• **Error Categorization**: Specific error messages with actionable guidance

### User Interface

• **Responsive Design**: Optimized for desktop, tablet, and mobile devices
• **Dark Mode Support**: Complete dark/light theme system
• **Accessible Design**: WCAG compliant with proper contrast and navigation
• **Intuitive Navigation**: Clear information architecture and user flow
• **Progress Indicators**: Visual feedback for all operations
• **Toast Notifications**: Non-intrusive success and error messaging

### Integration & Extensibility

• **OpenAI API Integration**: Full integration with OpenAI's latest models
• **JSON Export/Import**: Standard format for character data exchange
• **URL-Based Navigation**: Direct links to specific characters and features
• **Documentation System**: Comprehensive in-app documentation
• **Developer Tools**: Debug modes and development utilities

## Usage Statistics & Monitoring

### Monthly Limits by Tier

• **Standard Tier**: 50 text generations, 10 image generations
• **Enhanced Tier**: 30 text generations, 5 image generations  
• **Premium Tier**: 10 text generations, 3 image generations

### Feature Usage Tracking

• All text-based features (character generation, chat, trait generation) count against text model limits
• All image-based features (portrait generation, portrait editing) count against image model limits
• Real-time usage monitoring with visual indicators
• Automatic usage reset monthly
• Grace period handling for usage edge cases

## Quality & Consistency

### AI Model Optimization

• **Prompt Engineering**: Carefully crafted prompts for consistent, high-quality output
• **Context Management**: Smart context handling for character consistency
• **Response Formatting**: Structured output formatting with validation
• **Content Filtering**: Appropriate content generation for all audiences
• **Personality Consistency**: Maintained character voice across all interactions

### Data Validation

• **JSON Schema Validation**: Structured validation of all generated content
• **Content Sanitization**: Safe handling of user input and AI output
• **Format Consistency**: Standardized formatting across all features
• **Error Recovery**: Multiple fallback strategies for malformed responses
• **Quality Assurance**: Built-in checks for content quality and appropriateness

## Related Documentation

• [How to Use NPC Forge](/docs/how-to-use) - Complete creation and editing guide
• [Chat with Characters](/docs/chat) - Detailed conversation guide
• [Character Library](/docs/library) - Library management and trait systems
• [Model Selection](/docs/models) - Understanding AI model tiers and capabilities
• [Generation Options](/docs/generation-options) - Detailed customization including portrait editing
• [API Documentation](/docs/api) - Technical implementation details