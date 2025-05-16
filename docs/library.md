# Character Library Guide

The Character Library is NPC Forge's system for saving, managing, and editing your generated characters. This comprehensive guide covers all aspects of using the library effectively.

## Overview

The Character Library allows you to:
- Save unlimited characters locally using IndexedDB
- Edit and modify existing characters
- Regenerate specific character elements
- Search and filter your collection
- Import and export characters as JSON
- Manage character portraits and data

![Character Library Overview](/public/images/character-library.png)

## Accessing the Library

You can access the Character Library in several ways:
- Click "Library" in the main navigation
- Use the "Save to Library" button after generating a character
- Access saved characters through the "Continue" option

## Saving Characters

### From Generation
After generating a character in the wizard:
1. Review your character in the results step
2. Click "Save to Library" 
3. The character is automatically saved with name, portrait, and all attributes

### Manual Save
When editing a character:
1. Make your desired changes
2. Click "Save Changes" in the edit interface
3. Updates are immediately saved to your local storage

## Library Interface

### Character Cards

Each character is displayed as a visual card containing:
- **Character Portrait**: AI-generated or uploaded image
- **Character Name**: Primary identifier
- **Genre/Sub-genre Tags**: Visual indicators of character type
- **Action Buttons**: Direct access to common operations

### Library Actions

![Character Library Interface](/public/images/fanned-cards.png)

Each character card includes buttons for:
- **View/Edit**: Open character in edit mode
- **Download JSON**: Export character data
- **Download Portrait**: Save character image
- **Delete**: Remove character from library

## Character Editing

### Edit Interface

![Character Edit Page](/public/images/edit-page.png)

The edit interface provides comprehensive character modification:

#### Basic Information
- Edit character name directly
- Modify description and core attributes
- Update genre and sub-genre classifications

#### Character Attributes
- Regenerate individual attributes (name, appearance, personality, backstory)
- Choose different AI models for regeneration
- Modify any text field manually

#### Character Elements
- **Quests**: Add, remove, or regenerate quests
- **Dialogue**: Modify or regenerate dialogue lines
- **Items**: Update or regenerate character inventory

#### Portrait Management
- Upload custom portraits
- Regenerate portraits with different models
- Choose new art styles or expressions
- Download high-resolution images

### Regeneration Features

#### Individual Attribute Regeneration
Regenerate specific character elements:
1. Click the regenerate icon next to any attribute
2. Choose your preferred AI model (if applicable)
3. Wait for the new content to generate
4. Review and save changes

#### Quest Component Regeneration
Regenerate individual parts of quests:
- Quest title only
- Quest description only  
- Quest reward only
- Complete quest regeneration

#### Model Selection for Regeneration
When regenerating content, you can:
- Choose different text models for attributes
- Select different image models for portraits
- Use higher-tier models for important characters

## Search and Filtering

### Search Functionality
- **Name Search**: Find characters by name
- **Full-Text Search**: Search descriptions and attributes
- **Case-Insensitive**: Search works regardless of capitalization

### Filter Options
- **By Genre**: Filter Fantasy, Sci-Fi, Historical, Contemporary
- **By Sub-Genre**: Narrow down to specific sub-genres
- **By Creation Date**: Sort by newest or oldest first
- **By Last Modified**: Find recently edited characters

### Advanced Filtering
Combine multiple filters:
1. Start with genre filter
2. Add sub-genre specification
3. Use search for specific names or terms
4. Apply date sorting as needed

## Import and Export

### JSON Export
Export individual characters:
1. Click "Download JSON" on any character card
2. Choose save location on your device
3. File contains complete character data including:
   - All attributes and traits
   - Quest, dialogue, and item data
   - Portrait URLs and options
   - Creation and modification timestamps

### JSON Import
Import characters from files:
1. Use "Import Character" option in library
2. Select JSON file from your device
3. Character is added to your library
4. Conflicts with existing names are handled automatically

### Bulk Operations
- **Export All**: Download your entire library as JSON
- **Backup Library**: Create complete library backup
- **Restore from Backup**: Import previously exported library

## Storage and Performance

### IndexedDB Storage
The library uses IndexedDB for reliable storage:
- **Characters**: Full character data stored locally
- **Portraits**: Compressed images stored separately
- **Metadata**: Search indices and timestamps
- **Automatic Cleanup**: Orphaned data removed periodically

### Storage Limits
- **Character Data**: No practical limit on number of characters
- **Portrait Storage**: Automatic compression to optimize space
- **Browser Limits**: Dependent on browser storage quotas
- **Storage Monitoring**: Library displays storage usage information

### Performance Optimization
- **Lazy Loading**: Characters loaded as needed
- **Image Compression**: Portraits automatically compressed
- **Indexed Search**: Fast search through large collections
- **Efficient Updates**: Only changed data is saved

## Library Management

### Organization Tips
1. **Consistent Naming**: Use clear, descriptive names
2. **Genre Organization**: Group related characters by genre
3. **Campaign Folders**: Consider name prefixes for organization
4. **Regular Backups**: Export library periodically

### Maintenance
- **Remove Unused Characters**: Delete characters no longer needed
- **Update Old Characters**: Regenerate with newer models when available
- **Check Storage**: Monitor browser storage usage
- **Validate Data**: Ensure character integrity with test loads

## Troubleshooting

### Common Issues

#### Characters Not Saving
- Check browser storage permissions
- Verify sufficient storage space
- Try refreshing the page and saving again
- Check browser console for error messages

#### Missing Portraits
- Portraits may fail to load due to network issues
- Try regenerating the portrait
- Upload a custom image as backup
- Check browser's image loading settings

#### Search Not Working
- Clear and retry search terms
- Check for typos in search query
- Try filtering by genre first
- Refresh the library view

#### Slow Library Performance
- Reduce number of visible characters with filtering
- Close other browser tabs to free memory
- Clear browser cache if needed
- Consider exporting and removing old characters

### Data Recovery

#### Lost Characters
If characters disappear:
1. Check browser storage settings
2. Look for browser data restoration options
3. Restore from previously exported JSON backup
4. Check if characters were saved to different browser profile

#### Corrupted Data
If library appears corrupted:
1. Try refreshing the page
2. Clear browser cache for the site
3. Use "Reset Database" option if available
4. Restore from backup if necessary

## Advanced Features

### Character Relationships
Track connections between characters:
- Add relationship notes in descriptions
- Use similar names for related characters
- Create character groups with tags
- Export related characters together

### Version Control
Manage character versions:
- Save copies before major edits
- Use descriptive names for versions
- Export before experimenting with regeneration
- Keep backup of important characters

### Integration with Creation
Seamless workflow between creation and library:
- Save immediately after generation
- Edit and regenerate as needed
- Create variations of successful characters
- Build character collections for campaigns

## Privacy and Security

### Local Storage Only
- All characters stored locally in your browser
- No data sent to external servers
- Complete privacy and control over your data
- No account required

### Data Portability
- Full export capabilities
- Standard JSON format for compatibility
- Easy backup and restore process
- Transfer between devices with export/import

## Related Documentation

- [How to Use NPC Forge](/docs/how-to-use) - Complete creation guide
- [Character Examples](/docs/character-examples) - Sample library characters
- [Generation Options](/docs/generation-options) - Customization settings
- [Model Selection Guide](/docs/models) - Understanding AI models
- [FAQ](/docs/faq) - Common questions and answers