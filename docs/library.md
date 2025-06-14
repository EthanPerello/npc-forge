# Character Library Guide

The Character Library is NPC Forge's system for saving, managing, and editing your generated characters, including the enhanced filtering system, interactive chat features, and the portrait editing and trait management capabilities.

## Overview

The Character Library allows you to:
• Save characters locally using IndexedDB
• Edit and modify existing characters
• Start conversations with your characters
• Regenerate specific character elements with enhanced visual feedback (NEW in v0.22.0)
• Edit portraits using AI-powered text prompts
• Generate and manage character traits
• Search and filter your collection with advanced trait filtering
• Import and export characters as JSON
• Manage character portraits and data

## Accessing the Library

Access the Character Library through:
• The "Library" link in the main navigation
• The "Save to Library" button after generating a character (now transitions to "View Library" in v0.22.0)

## Saving Characters

### From Generation

After generating a character:
1. Review your character in the results step
2. Click "Save to Library"
3. The button now dynamically transitions to "View Library" for better navigation (NEW in v0.22.0)
4. The character is saved with all data and portrait

### From Editing

When editing a character:
1. Make your desired changes
2. Click "Save Changes"
3. Updates are saved to your local storage
4. Navigation back to Library is immediate

## Library Interface

### Character Cards

Each character is displayed as a card containing:
• Character portrait (fills container responsively)
• Character name (always visible)
• Trait tags with category prefixes
• Action buttons for common operations

### Character Actions

Each character card includes buttons for:
• **Chat**: Start a conversation with the character
• **View/Edit**: Open character in edit mode
• **Download JSON**: Export character data
• **Download Portrait**: Save character image (if available)
• **Delete**: Remove character from library

### Library Modal

Click any character card to open a detailed modal with:
• Full character profile with tabs
• All character traits and information
• **Start Chat** button for conversations
• Edit, download, and delete options

## Interactive Chat Features

### Starting Conversations

**Multiple ways to begin chatting:**
1. **From Character Cards**: Click the "Chat" button on any character card
2. **From Library Modal**: Click "Start Chat" in the character details modal
3. **Direct Navigation**: Use the enhanced sidebar navigation (NEW in v0.22.0)

### Chat Integration

The library seamlessly integrates with the chat system:
• Chat buttons available on all character cards
• Conversation history maintained per character
• Easy switching between library browsing and chatting
• Character traits and backstory inform chat responses

## Enhanced Filtering System

### Automatic Trait Discovery

• Filter dropdowns are automatically created from your character data
• New traits appear in filters as you save more characters
• Traits are organized into logical categories
• Long or sentence-like traits are automatically excluded for cleaner organization

### Filter Categories

The filter panel is organized into sections:
• **Basic Information**: Genre, gender, age, alignment, relationship
• **Physical Traits**: Species, height, build, physical characteristics
• **Background & Social**: Occupation, social class, homeland
• **Personality**: Personality traits and motivations

### Smart Search

Use the simplified search with trait-specific syntax:
• Search placeholder: "Search characters…"
• `personality: brave` - Find characters with brave personality
• `occupation: knight` - Find all knights
• `genre: fantasy` - Filter by fantasy genre
• `build: muscular` - Find characters with muscular build

### Using Filters

1. Use dropdown filters to narrow by categories
2. Add specific searches using `category: value` syntax
3. Combine multiple filters and search terms
4. Results update in real-time

## Character Editing

### Edit Interface

The edit interface provides comprehensive character modification:
• Edit character name and basic information
• Modify all character attributes
• Regenerate individual elements with enhanced visual feedback (NEW in v0.22.0)
• Manage portraits with editing capabilities
• Generate and manage additional traits
• Add/remove quests, dialogue, and items

### Portrait Management and Editing

**Portrait Options:**
• **Upload**: Add custom portrait images
• **Regenerate**: Create new portraits with different models
• **Edit**: Modify existing portraits using text prompts

**Portrait Editing Features:**
• AI-powered editing using OpenAI's image editing API
• Text-based prompts for describing desired changes
• Support for color changes, accessories, clothing, and expressions
• Model compatibility (gpt-image-1 recommended for best results)
• Clear messaging that only gpt-image-1 supports full editing; DALL·E 2 has limited capabilities, DALL·E 3 doesn't support editing (NEW in v0.22.0)
• Real-time preview of edited portraits

**Portrait Editing Workflow:**
1. Open character in edit mode
2. Navigate to Portrait section
3. Click "Edit Portrait" button (requires existing portrait)
4. Enter text description of desired changes
5. Click "Edit Portrait" to process changes
6. Review results and save if satisfied

**Edit Prompt Examples:**
```
"change hair color to blonde"
"add a red hat"
"remove glasses"
"make them smile"
"change shirt to blue"
"add armor"
```

### Advanced Trait Management

**Additional Traits Section:**
• View all additional character traits in organized layout
• Traits displayed with editable names and values
• Standardized Title Case formatting with proper capitalization (NEW in v0.22.0)
• Consistent display matching character modal

**Trait Management Features:**
• **Add Custom Trait**: Manually create traits with custom names and values
• **Add Generated Trait**: AI generates new traits automatically
• **Individual Regeneration**: Regenerate specific traits with dedicated buttons and enhanced visual feedback (NEW in v0.22.0)
• **Edit Trait Names**: Modify trait categories and names
• **Edit Trait Values**: Update trait descriptions and values
• **Remove Traits**: Delete unwanted traits from character

**Trait Generation:**
• AI-generated traits match character personality and background
• Automatic formatting and validation
• Smart filtering excludes overly long traits
• Integration with existing trait display system

### Regeneration Features

Regenerate specific character elements with enhanced visual feedback (NEW in v0.22.0):
• Individual attributes (name, appearance, personality, backstory)
• Portraits with different models
• Portrait editing with text prompts
• Quest components (title, description, reward)
• Dialogue lines
• Item descriptions
• Individual character traits

Choose different AI models for regeneration based on your monthly limits:
• Standard: 50 text/10 images per month
• Enhanced: 30 text/5 images per month
• Premium: 10 text/3 images per month

**Enhanced User Experience (NEW in v0.22.0):**
• All regeneration buttons now use consistent rotating circle (RotateCcw) icons
• Visual loading indicators show progress for all regeneration operations
• Improved error handling with enhanced fallback logic
• Real-time status updates for all operations

## Import and Export

### JSON Export

Export individual characters:
1. Click "Download JSON" on any character card
2. File contains complete character data including traits and portrait information

### JSON Import

Import characters from files:
1. Use "Import Character" option in library
2. Select JSON file from your device
3. Character is added to your library with traits automatically categorized

## Storage and Performance

### Local Storage

The library uses IndexedDB for storage:
• Character data with trait indexing
• Chat conversation sessions per character
• Compressed portrait images
• Search indices and trait categories
• Automatic cleanup of orphaned data

### Performance Features

• Characters loaded as needed
• Portrait compression for storage efficiency
• Indexed search for fast filtering
• Optimized filter operations
• Responsive card layouts with uniform sizing

## User Interface Improvements

### Enhanced Character Cards

• **Responsive Portraits**: Images fill containers responsively
• **Uniform Card Sizing**: Consistent dimensions across all cards
• **Always-Visible Names**: Character names always displayed prominently
• **Streamlined Design**: Removed genre badges for cleaner appearance
• **Direct Chat Access**: Chat buttons prominently featured on each card

### Improved Library Modal

• **Modal Interactions**: Click cards to open detailed view instead of portrait zoom
• **Chat Integration**: Start Chat button in character details
• **Consistent Layout**: Improved spacing and organization

## Enhanced User Experience (v0.22.0)

### Visual Feedback Improvements

• **Enhanced Loading States**: All regeneration operations show clear visual indicators
• **Consistent Iconography**: Rotating circle (RotateCcw) icons for all regeneration buttons
• **Real-Time Updates**: Immediate feedback for all character operations
• **Better Error Handling**: Enhanced fallback logic for failed operations

### Navigation Enhancements

• **Dynamic Button Transitions**: "Save to Library" → "View Library" transitions for better user flow
• **Integrated Chat Access**: Enhanced sidebar navigation includes direct chat links
• **Improved Organization**: Cleaner layout and better visual hierarchy

### Trait Management Enhancements

• **Proper Capitalization**: All trait categories now display with proper Title Case formatting
• **Enhanced Display Logic**: Additional traits section shows all traits not included in Basic Info or Character Traits sections
• **Better Filtering**: Excludes unsupported traits (e.g., custom personality entries) from filter dropdowns
• **Consistent Formatting**: Standardized trait display between modal and edit page

## Library Management

### Organization Tips

1. **Consistent Traits**: Use standardized trait values across characters
2. **Complete Profiles**: Fill out relevant trait categories for better filtering
3. **Regular Backups**: Export important characters as JSON files
4. **Descriptive Names**: Use clear, searchable character names
5. **Chat Documentation**: Use conversations to develop character relationships
6. **Portrait Consistency**: Use portrait editing to maintain visual consistency

### Using Filtering Effectively

1. **Start Broad**: Begin with genre or basic trait filters
2. **Use Smart Search**: Leverage `category: value` syntax for precision
3. **Combine Methods**: Mix dropdown filters with text search
4. **Organize Collections**: Use consistent traits for related characters

### Portrait Editing Workflow

1. **Create Characters**: Generate characters with initial portraits
2. **Save to Library**: Add characters to your collection
3. **Review Portraits**: Identify portraits that need refinement
4. **Edit Portraits**: Use text prompts to modify specific aspects (gpt-image-1 recommended)
5. **Maintain Consistency**: Ensure portraits match your campaign aesthetic

### Trait Management Workflow

1. **Generate Characters**: Create characters with basic traits
2. **Review Traits**: Examine additional traits in edit mode
3. **Add Custom Traits**: Include story-specific traits manually
4. **Generate AI Traits**: Use AI to suggest relevant traits
5. **Organize Traits**: Edit and format traits for consistency
6. **Filter and Search**: Use traits to organize your collection

### Chat Integration Workflow

1. **Create Characters**: Generate characters using the wizard
2. **Save to Library**: Add characters to your collection
3. **Start Conversations**: Use chat buttons to begin interactions
4. **Develop Characters**: Use conversations to explore character depth
5. **Edit and Refine**: Update character details based on chat insights
6. **Maintain Relationships**: Use chat history to track character development

## Advanced Features

### Bulk Operations

• Export multiple characters by selecting and downloading JSON files
• Use consistent trait values across character collections
• Organize related characters using similar trait structures

### Character Development

• Use chat conversations to discover new character traits
• Edit portraits to reflect character development over time
• Generate additional traits based on character growth
• Maintain character consistency across long campaigns

### Collection Management

• Use trait filtering to organize character types (allies, enemies, NPCs)
• Create character groups using consistent homeland or faction traits
• Manage campaign-specific characters with custom traits

## Troubleshooting

### Common Issues

**Characters not saving**:
• Check browser storage permissions
• Verify sufficient storage space
• Try refreshing the page

**Missing portraits**:
• Portraits may fail to generate due to network issues
• Try regenerating the portrait with different models
• Use portrait editing to fix minor issues
• Upload a custom image as backup

**Portrait editing not working**:
• Ensure character has existing portrait
• Check that gpt-image-1 model is selected for best results
• Verify monthly image model limits haven't been exceeded
• Try simpler edit prompts

**Chat not working**:
• Verify the character exists in your library
• Check that you haven't reached monthly usage limits
• Try refreshing the browser

**Trait management issues**:
• Traits may not appear in filters if they're too long
• Check that trait names and values are properly formatted
• Regenerate traits if they don't match character personality

**Visual feedback issues (NEW)**:
• Loading indicators not appearing: refresh the page
• Button transitions not working: ensure JavaScript is enabled

**Filtering issues**:
• Traits only appear after characters with those traits are saved
• Check syntax for trait-specific searches (`category: value`)
• Try refreshing the library page

**Search not working**:
• Clear and retry search terms
• Try using trait-specific syntax
• Use dropdown filters first, then add search

## Best Practices

### Character Organization

• Use consistent naming conventions for related characters
• Apply similar trait structures to character groups
• Regular maintenance of trait values for better filtering
• Export character collections for backup and sharing

### Portrait Management

• Generate initial portraits with appropriate art styles
• Use portrait editing for minor adjustments rather than complete redesigns
• Maintain consistent art style across character collections
• Test different edit prompts to understand model capabilities
• Use gpt-image-1 for reliable editing results

### Trait Development

• Balance AI-generated traits with custom traits for character depth
• Use trait regeneration to improve inconsistent traits
• Organize traits by importance and relevance to your story
• Regular review and cleanup of unnecessary traits
• Take advantage of enhanced visual feedback for trait operations

### Chat Integration

• Start conversations immediately after character creation
• Use chat to explore character background and motivations
• Reference character traits in conversations for consistency
• Document character development through ongoing conversations

### Enhanced User Experience (v0.22.0)

• Take advantage of improved visual feedback for all operations
• Use dynamic button transitions for better navigation flow
• Leverage enhanced trait capitalization for better organization
• Utilize improved error handling for more reliable operations

## Related Documentation

• [How to Use NPC Forge](/docs/how-to-use) - Complete creation, chat, and editing guide
• [Chat with Characters](/docs/chat) - Detailed conversation guide
• [Character Examples](/docs/character-examples) - Sample library characters
• [Generation Options](/docs/generation-options) - Customization settings including portrait editing
• [Model Selection Guide](/docs/models) - Understanding AI models for editing and generation
• [Features Overview](/docs/features) - Complete feature list including trait management