# Character Library Guide

The Character Library is NPC Forge's comprehensive system for saving, organizing, filtering, editing, and managing your generated characters. This guide covers all library features from basic organization to advanced character editing.

## Library Overview

### Core Functions
• **Character Storage**: Save generated characters locally with all data and portraits
• **Organization Tools**: Enhanced filtering and smart search capabilities  
• **Character Editing**: Comprehensive editing interface for all character elements
• **Chat Integration**: Direct conversation access from character cards
• **Data Management**: Import/export capabilities for backup and sharing

### Library Interface Elements

![Character Library Interface](public/images/character-library.png)

• **Character Cards**: Visual grid displaying portraits, names, and trait tags
• **Filter Panel**: Collapsible interface with dropdown filters organized by category
• **Search Bar**: Smart search with general text and trait-specific syntax support
• **Action Buttons**: Direct access to chat, edit, download, and delete functions
• **Character Modal**: Detailed view with complete character information and actions

## Character Storage and Organization

### Saving Characters to Library

**From Character Generation**:
1. Complete the four-step wizard and generate your character
2. Click "Save to Library" button in the results step
3. Character is immediately saved with all generated content and portrait
4. Automatic trait indexing for enhanced filtering capabilities

**Character Data Stored**:
• Complete character profile (name, traits, appearance, personality, backstory)
• Generated content (quests, dialogue, items)
• Portrait image (compressed for storage efficiency)
• Metadata for filtering and search functionality
• Creation timestamp and generation model information

### Library Storage System

**Local Browser Storage**:
• All data stored in IndexedDB for reliability and performance
• Typical storage capacity: Several gigabytes per browser
• Data persists across browser sessions and restarts
• No external server dependencies or data transmission
• Complete user control and privacy

**Storage Optimization**:
• Portrait images compressed automatically for efficient storage
• Character data structured for fast retrieval and filtering
• Automatic cleanup of orphaned data and temporary files
• Database recovery mechanisms for corruption handling

## Enhanced Filtering System

### Automatic Trait Discovery

**Filter Generation Process**:
• Filters automatically created from existing character data in your library
• New traits appear in filter options as you save more characters
• Smart categorization based on trait type and content
• Dynamic filter updates when character data changes

**Filter Categories**:
• **Basic Information**: Genre, sub-genre, gender, age group, moral alignment, relationship
• **Physical Traits**: Species, height, build, distinctive features
• **Background & Social**: Occupation, social class, homeland, cultural background
• **Personality**: Character traits, behavioral patterns, motivations

**Filter Quality Control**:
• Automatically excludes overly long traits (sentences or paragraphs)
• Removes duplicate or near-duplicate trait values
• Filters out non-trait metadata like appearance descriptions
• Maintains clean, usable filter categories

### Filter Interface and Usage

**Filter Panel Organization**:
• Collapsible sections for different trait categories
• Dropdown menus with all available values for each trait type
• Multi-select capability for combining multiple filters
• Clear indicators showing active filters and result counts

**Using Dropdown Filters**:
1. Expand relevant filter category section
2. Select desired values from dropdown menus
3. Multiple selections within a category act as "OR" conditions
4. Multiple categories act as "AND" conditions
5. Results update immediately as filters are applied

**Filter Management**:
• Clear individual filters with "×" buttons
• Reset all filters with "Clear All" option
• Filter state preserved during browsing session
• Filter combinations saved for complex searches

### Smart Search Functionality

**General Text Search**:
• Searches across character names, descriptions, and trait values
• Case-insensitive matching with partial word support
• Searches within generated content (quests, dialogue, items)
• Real-time results as you type

**Trait-Specific Search Syntax**:
• Format: `category: value` for precise trait matching
• Examples:
  - `personality: brave` - Find characters with brave personality trait
  - `occupation: knight` - Find all knight characters
  - `genre: fantasy` - Filter by fantasy genre
  - `build: muscular` - Find characters with muscular build
  - `alignment: good` - Find good-aligned characters

**Advanced Search Techniques**:
• Combine multiple trait searches: `personality: wise occupation: wizard`
• Mix general search with trait syntax: `magic personality: mysterious`
• Use partial matches: `occup: knig` will find knight occupations
• Quotation marks for exact phrases: `"ancient wizard"`

**Search Best Practices**:
• Start with broad searches, then narrow with additional terms
• Use trait syntax for precise filtering by specific characteristics
• Combine search with dropdown filters for maximum precision
• Check spelling and try variations if results are unexpected

## Character Editing and Management

### Accessing Character Edit Mode

**Edit Interface Entry Points**:
• Click "Edit" button on character cards in library grid
• Use "Edit Character" option in character detail modal
• Direct navigation to edit page from character URLs

![Character Edit Interface](public/images/edit-page.png)

**Edit Page Layout**:
• Model selectors at top for choosing regeneration models
• Organized sections for different character elements
• Save/cancel controls with unsaved changes warnings
• Navigation breadcrumbs for easy library return

### Comprehensive Character Editing

**Basic Information Editing**:
• **Character Name**: Direct text editing with validation
• **Character Description**: Full description modification
• **Core Traits**: Gender, age, alignment, relationship status modification
• **Advanced Traits**: Physical characteristics, background elements, personality traits

**Content Element Management**:
• **Quest Management**: Add new quests, edit existing ones, remove unwanted quests
• **Dialogue Editing**: Modify dialogue lines, add character-appropriate options
• **Item Management**: Edit item descriptions, add new items, organize inventory
• **Individual Regeneration**: Regenerate specific elements without affecting others

**Regeneration Controls**:
• **Attribute Regeneration**: Name, appearance, personality, backstory with model selection
• **Content Regeneration**: Individual quest components, dialogue lines, item descriptions
• **Bulk Regeneration**: Multiple elements simultaneously with progress tracking
• **Regeneration History**: Track changes and compare versions

### Portrait Management and Editing

**Portrait Operations**:
• **Upload Custom Portraits**: Replace AI-generated images with custom artwork
• **Regenerate Portraits**: Create new AI portraits with different models or styles
• **Portrait Editing**: Modify existing portraits using text-based prompts
• **Portrait Download**: Save portrait images to device storage

**Portrait Editing Features** (gpt-image-1 only):
• **Text-Based Editing**: Describe changes in natural language
• **Edit Categories**: Color changes, accessories, clothing, expressions, backgrounds
• **Edit Prompt Examples**:
  - `"change hair color to blonde"`
  - `"add round glasses"`
  - `"remove the hat"`
  - `"make them smile"`
  - `"change shirt to blue"`
  - `"add a beard"`

**Portrait Editing Workflow**:
1. Select character with existing portrait in edit mode
2. Navigate to Portrait section
3. Ensure gpt-image-1 model is selected for full editing support
4. Enter specific edit prompt describing desired changes
5. Click "Edit Portrait" and wait for processing (30-90 seconds)
6. Review results and save changes if satisfied

### Advanced Trait Management

**Additional Traits Section**:
• **Trait Display**: All additional character traits in organized layout
• **Trait Formatting**: Consistent Title Case formatting throughout interface
• **Trait Editing**: Edit trait names and values directly in interface
• **Trait Organization**: Automatic grouping and categorization when possible

**Trait Management Operations**:
• **Add Generated Trait**: AI creates contextually appropriate new traits
• **Add Custom Trait**: Manually create trait with custom name and value
• **Individual Trait Regeneration**: Regenerate specific traits independently
• **Trait Editing**: Modify existing trait names and values
• **Trait Removal**: Delete unwanted or incorrect traits

**AI Trait Generation**:
• **Context-Aware Generation**: AI analyzes existing character elements
• **Character Consistency**: Generated traits match personality and background
• **Genre Appropriateness**: Traits fit selected genre and setting
• **Roleplay Enhancement**: Traits designed to add depth and story hooks

**Trait Generation Process**:
1. Click "Add Generated Trait" in Additional Traits section
2. AI analyzes character context and generates appropriate trait
3. Trait appears as editable entry in trait list
4. Can be further edited, regenerated, or removed as needed
5. Trait automatically integrates with filtering system

## Chat System Integration

### Chat Access Points

**Starting Conversations**:
• **Character Card Buttons**: Direct "Chat" button on each character card
• **Library Modal**: "Start Chat" button in character detail view
• **Edit Page Integration**: Chat access from character editing interface
• **Enhanced Navigation**: Chat links in improved sidebar navigation

**Chat Features from Library**:
• **Character Context**: Full character data automatically loaded into chat
• **Conversation Persistence**: Chat history maintained per character
• **Model Selection**: Choose AI model tier for conversation quality
• **Seamless Integration**: Switch between library browsing and chatting

### Chat and Character Development

**Using Chat for Character Enhancement**:
• **Personality Exploration**: Discover character traits through conversation
• **Backstory Development**: Explore character history and motivations
• **Relationship Building**: Develop character connections and dynamics
• **Character Testing**: Verify personality consistency and voice

**Chat-Informed Editing**:
• **Trait Refinement**: Edit character traits based on conversation insights
• **Personality Adjustment**: Modify character elements to match developed voice
• **Content Enhancement**: Add quests or dialogue based on chat interactions
• **Character Evolution**: Track character development over time

## Data Management and Portability

### Export Capabilities

**Character Export Options**:
• **Individual Export**: Download single characters as JSON files
• **Bulk Export**: Multiple character selection for batch download
• **Complete Data**: Exports include all character data and portrait information
• **Cross-Platform Compatibility**: JSON format works across different devices

**Export Data Contents**:
• Complete character profile and generated content
• Portrait image data (base64 encoded)
• Character traits and filtering metadata
• Creation and modification timestamps
• Model information and generation settings

**Export Workflow**:
1. Click "Download JSON" on character cards or in character modal
2. Choose download location on your device
3. File contains complete character data for backup or sharing
4. Can be imported into any NPC Forge installation

### Import Functionality

**Character Import Process**:
• **File Selection**: Choose JSON files from device storage
• **Data Validation**: Automatic validation of file format and content
• **Library Integration**: Characters added to library with full functionality
• **Conflict Resolution**: Handling of duplicate character names or IDs

**Import Sources**:
• **Backup Files**: Restore characters from previous exports
• **Shared Characters**: Import characters shared by other users
• **Cross-Device Transfer**: Move characters between different devices
• **Collaboration**: Share character collections between team members

**Import Considerations**:
• **Portrait Storage**: Large portrait files may affect import speed
• **Trait Integration**: Imported character traits automatically added to filters
• **Data Integrity**: Validation ensures imported characters work properly
• **Storage Impact**: Consider available browser storage when importing large collections

### Data Backup and Recovery

**Backup Strategies**:
• **Regular Exports**: Schedule periodic character exports for safety
• **Incremental Backups**: Export new or modified characters regularly
• **Collection Snapshots**: Export entire character collections at major milestones
• **Cloud Storage**: Store exported JSON files in cloud services for accessibility

**Recovery Procedures**:
• **Data Loss Recovery**: Import backed-up characters after data loss
• **Corruption Handling**: Database recovery tools and procedures
• **Migration Support**: Moving characters between browsers or devices
• **Version Management**: Managing multiple versions of character collections

## Performance Optimization

### Library Performance

**Large Collection Management**:
• **Efficient Loading**: Characters loaded as needed for performance
• **Search Optimization**: Indexed searching for fast results even with large collections
• **Filter Performance**: Optimized filter operations for responsive interface
• **Memory Management**: Automatic cleanup of unused data and resources

**Storage Optimization**:
• **Portrait Compression**: Automatic image compression for storage efficiency
• **Data Deduplication**: Elimination of duplicate trait values and metadata
• **Index Maintenance**: Automatic search index updates and optimization
• **Cleanup Procedures**: Regular maintenance of storage and temporary files

### User Experience Optimization

**Interface Responsiveness**:
• **Progressive Loading**: Character cards load incrementally for faster display
• **Search Debouncing**: Optimized search input handling for smooth typing
• **Filter Updates**: Real-time filter results without performance impact
• **Smooth Transitions**: Optimized animations and state changes

**Mobile Optimization**:
• **Touch Interface**: Optimized touch controls for mobile devices
• **Responsive Layout**: Adaptive interface for different screen sizes
• **Performance Scaling**: Adjusted performance for mobile hardware limitations
• **Network Consideration**: Efficient data usage for mobile connections

## Advanced Library Features

### Collection Organization Strategies

**Character Categorization**:
• **Campaign Organization**: Group characters by game campaign or story
• **Role-Based Grouping**: Organize by character function (ally, enemy, neutral)
• **Setting Classification**: Group by fantasy realm, sci-fi universe, historical period
• **Importance Levels**: Distinguish main characters from background NPCs

**Tagging Strategies**:
• **Consistent Naming**: Use standardized character names for easy searching
• **Strategic Traits**: Apply relevant traits for effective filtering
• **Genre Consistency**: Maintain consistent genre and setting tags
• **Update Maintenance**: Regular review and updating of character traits

### Advanced Search Techniques

**Complex Filtering**:
• **Multi-Category Combinations**: Use multiple filter categories simultaneously
• **Search + Filter Combinations**: Combine text search with dropdown filters
• **Exclusion Searching**: Find characters without specific traits
• **Range Filtering**: Filter by numeric or ordered values

**Collection Analytics**:
• **Character Distribution**: Understanding character type distribution in collection
• **Trait Analysis**: Identifying common traits and patterns
• **Usage Tracking**: Monitoring which characters are used most frequently
• **Collection Health**: Identifying incomplete or outdated character data

## Related Documentation

• [How to Use NPC Forge](/docs/how-to-use) - Basic character creation and library usage
• [Chat with Characters](/docs/chat) - Detailed chat system features and integration
• [Character Examples](/docs/character-examples) - Examples showcasing library features
• [Model Selection Guide](/docs/models) - Model capabilities for editing and regeneration