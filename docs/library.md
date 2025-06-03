# Character Library Guide

The Character Library is NPC Forge's system for saving, managing, and editing your generated characters, including the enhanced filtering system introduced in v0.18.0.

## Overview

The Character Library allows you to:
- Save characters locally using IndexedDB
- Edit and modify existing characters
- Regenerate specific character elements
- Search and filter your collection with advanced trait filtering
- Import and export characters as JSON
- Manage character portraits and data

## Accessing the Library

Access the Character Library through:
- The "Library" link in the main navigation
- The "Save to Library" button after generating a character

## Saving Characters

### From Generation
After generating a character:
1. Review your character in the results step
2. Click "Save to Library" 
3. The character is saved with all data and portrait

### From Editing
When editing a character:
1. Make your desired changes
2. Click "Save Changes" 
3. Updates are saved to your local storage

## Library Interface

### Character Cards
Each character is displayed as a card containing:
- Character portrait (if generated)
- Character name
- Genre/sub-genre indicators
- Trait tags with category prefixes (v0.18.0)
- Action buttons for common operations

### Library Actions
Each character card includes buttons for:
- **View/Edit**: Open character in edit mode
- **Download JSON**: Export character data
- **Download Portrait**: Save character image (if available)
- **Delete**: Remove character from library

## Enhanced Filtering System (v0.18.0)

### Automatic Trait Discovery
- Filter dropdowns are automatically created from your character data
- New traits appear in filters as you save more characters
- Traits are organized into logical categories

### Filter Categories
The filter panel is organized into sections:
- **Basic Information**: Genre, gender, age, alignment, relationship
- **Physical Traits**: Species, height, build, physical characteristics
- **Background & Social**: Occupation, social class, homeland
- **Personality**: Personality traits and motivations

### Smart Search
Use trait-specific search syntax:
- `personality: brave` - Find characters with brave personality
- `occupation: knight` - Find all knights
- `genre: fantasy` - Filter by fantasy genre
- `build: muscular` - Find characters with muscular build

### Using Filters
1. Use dropdown filters to narrow by categories
2. Add specific searches using `category: value` syntax
3. Combine multiple filters and search terms
4. Results update in real-time

## Character Editing

### Edit Interface
The edit interface provides character modification:
- Edit character name and basic information
- Modify all character attributes
- Regenerate individual elements
- Manage portraits
- Add/remove quests, dialogue, and items

### Regeneration Features
Regenerate specific character elements:
- Individual attributes (name, appearance, personality, backstory)
- Portraits with different models
- Quest components (title, description, reward)
- Dialogue lines
- Item descriptions

Choose different AI models for regeneration based on your monthly limits:
- Standard: 50 text/10 images per month
- Enhanced: 30 text/5 images per month  
- Premium: 10 text/3 images per month

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
- Character data with trait indexing
- Compressed portrait images
- Search indices and trait categories
- Automatic cleanup of orphaned data

### Performance Features
- Characters loaded as needed
- Portrait compression for storage efficiency
- Indexed search for fast filtering
- Optimized filter operations

## Library Management

### Organization Tips
1. **Consistent Traits**: Use standardized trait values across characters
2. **Complete Profiles**: Fill out relevant trait categories for better filtering
3. **Regular Backups**: Export important characters as JSON files
4. **Descriptive Names**: Use clear, searchable character names

### Using Filtering Effectively
1. **Start Broad**: Begin with genre or basic trait filters
2. **Use Smart Search**: Leverage `category: value` syntax for precision
3. **Combine Methods**: Mix dropdown filters with text search
4. **Organize Collections**: Use consistent traits for related characters

## Troubleshooting

### Common Issues

**Characters not saving**:
- Check browser storage permissions
- Verify sufficient storage space
- Try refreshing the page

**Missing portraits**:
- Portraits may fail to generate due to network issues
- Try regenerating the portrait
- Upload a custom image as backup

**Filtering issues**:
- Traits only appear after characters with those traits are saved
- Check syntax for trait-specific searches (`category: value`)
- Try refreshing the library page

**Search not working**:
- Clear and retry search terms
- Try using trait-specific syntax
- Use dropdown filters first, then add search

## Related Documentation

- [How to Use NPC Forge](/docs/how-to-use) - Complete creation guide
- [Character Examples](/docs/character-examples) - Sample library characters
- [Generation Options](/docs/generation-options) - Customization settings
- [Model Selection Guide](/docs/models) - Understanding AI models
- [Features Overview](/docs/features) - Complete feature list