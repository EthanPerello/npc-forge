# Frequently Asked Questions

## General Questions

### What is NPC Forge?
NPC Forge is an AI-powered tool for creating detailed non-player characters (NPCs) for games, storytelling, and creative projects. It features a step-by-step wizard interface, character library management, and support for multiple AI models to generate character profiles including names, appearance, personality, backstory, quests, dialogue, items, and AI-created portraits.

### Is NPC Forge free to use?
Yes, NPC Forge is free to use with a tiered model system:
- **Standard models**: 50 text generations, 10 image generations per month
- **Enhanced models**: 30 text generations, 5 image generations per month
- **Premium models**: 10 text generations, 3 image generations per month

### Do I need to create an account?
No, NPC Forge does not require an account or login. It works immediately in your browser without any signup process. All characters are stored locally in your browser.

### What happens to my characters?
Your characters are stored locally in your browser's IndexedDB storage. You can save characters to your personal library, edit them, and organize them. We have no access to your generated characters.

### Which browsers are supported?
NPC Forge works on modern browsers like Chrome, Firefox, Safari, and Edge. The character library requires IndexedDB support, which is available in all modern browsers.

## Usage & Features

### How does the wizard interface work?
The wizard guides you through four steps:
1. **Concept**: Choose genre and write character description
2. **Options**: Set traits, enable quests/dialogue/items
3. **Model**: Select AI models for text and image generation
4. **Generate**: Create your character and review results

### What's the difference between the model tiers?
- **🟢 Standard**: Good quality, 50 text/10 image generations per month
- **🟡 Enhanced**: Better quality, 30 text/5 image generations per month
- **🔴 Premium**: Highest quality, 10 text/3 image generations per month

### Can I edit characters after creating them?
Yes! The character library includes an editing system where you can:
- Modify any character attribute
- Regenerate specific elements (name, appearance, quests, etc.)
- Add or remove quests, dialogue lines, and items
- Upload or regenerate portraits
- Choose different AI models for regeneration

### How many characters can I save?
You can save characters to your library limited by your browser's storage capacity. They're stored locally using IndexedDB.

### Can I export my characters?
Yes, you can export characters as JSON files for backup or transfer between devices.

### What's character regeneration?
Regeneration allows you to update specific parts of existing characters:
- Regenerate individual attributes (name, appearance, personality, backstory)
- Regenerate portraits with different models or styles
- Regenerate specific quest components, dialogue lines, or items
- Choose different AI models for regeneration

### What's the new filtering system? (v0.18.0)
The enhanced filtering system includes:
- Dropdown filters for character trait categories
- Automatic filter creation based on your character data
- Smart search using "category: value" syntax
- Collapsible filter sections
- Combined filtering and search

## Technical Questions

### How does NPC Forge work?
NPC Forge uses OpenAI's AI models to generate character content. You select from multiple models (gpt-4o-mini, gpt-4o, dall-e-3, etc.) that create text and images based on your inputs.

### Can I use NPC Forge offline?
No, NPC Forge requires an internet connection for character generation. However, once characters are saved to your library, you can view them offline.

### What happens to my data?
Your inputs are sent to OpenAI's API to generate content but are not stored on our servers. Generated characters exist only in your browser's local storage. We do not collect, store, or have access to your character data.

### Why does character generation sometimes fail?
Generation might fail due to:
- Network connectivity issues
- OpenAI API temporary limitations or downtime
- Content policy violations in your inputs
- Browser storage issues (rare)

### Are there any content restrictions?
Yes, NPC Forge follows OpenAI's content policy, which prohibits generating explicit sexual content, hateful content, or content that promotes illegal activities.

### Why do I have usage limits?
Usage limits help manage API costs while keeping NPC Forge free for everyone. Standard models have the highest limits, while Enhanced and Premium models have lower monthly limits due to higher costs.

## Character Library

### How do I save characters to my library?
After generating a character, click "Save to Library" in the results step. The character will be saved with all its data and portrait.

### Can I organize my characters?
Yes, you can:
- Search characters by name or traits
- Filter by genre and character attributes
- Use the new trait filtering system (v0.18.0)
- Sort and organize your collection

### What if I lose my characters?
Characters are stored in your browser's local storage. They can be lost if:
- You clear your browser data
- You use a different browser or device
- Browser storage is corrupted

**Prevention**: Regularly export important characters as JSON backup files.

### Can I transfer characters between devices?
Currently, characters are stored locally per browser. To transfer:
1. Export characters as JSON from the original device
2. Import the JSON files on the new device

## Model Selection

### Which models should I use?
**For most users:**
- Use Standard models for regular character creation
- Use Enhanced models for important NPCs
- Save Premium models for main characters

### Can I mix different model tiers?
Yes! You can use different tiers for text and image generation.

### How do monthly limits work?
Each model has its own monthly limit that resets on the 1st of each month. Limits are tracked per device/browser.

## Troubleshooting

### Portrait generation failed but my character was created. What happened?
This can happen when:
- The portrait request times out
- The character description contains elements filtered by image models
- There's a temporary issue with the image generation service

You can regenerate the portrait later with different settings or models.

### Characters aren't saving to my library
Check these common issues:
- Make sure you're clicking "Save to Library" after generation
- Verify your browser allows local storage for the site
- Try clearing browser cache and reloading
- Check if you have sufficient browser storage space

### I can't see my saved characters
Try these solutions:
1. Refresh the library page
2. Clear search filters
3. Check if you're using the same browser and device
4. Verify browser storage permissions

### My usage count seems wrong
Usage tracking is per device/browser. If you use multiple browsers or clear browser data, usage counts may appear different.

## Best Practices

### How can I get better character results?
1. **Write detailed descriptions**: Include specific appearance, personality, and background details
2. **Use appropriate model tiers**: Match quality needs with model selection
3. **Be specific with traits**: Choose personality traits that complement each other
4. **Experiment with regeneration**: Try regenerating specific elements for improvement

### How should I manage my character library?
1. **Use descriptive names**: Make characters easy to find later
2. **Export important characters**: Create JSON backups regularly
3. **Use the filtering system**: Take advantage of trait filters for organization
4. **Regular maintenance**: Delete characters you no longer need

## Future Features

### Will there be more features added?
Yes! Planned features include:
- Chat interface to talk with your characters (v0.19.0)
- Optional user accounts with cloud sync (v0.20.0)
- Game integration tools and APIs
- Advanced relationship systems between characters

### Can I request features?
Yes! You can:
- Open an issue on [GitHub](https://github.com/EthanPerello/npc-forge/issues)
- Contact the developer at [ethanperello@gmail.com](mailto:ethanperello@gmail.com)

## Getting Help

### How can I report issues or request features?
- **Bug reports**: Open an issue on [GitHub](https://github.com/EthanPerello/npc-forge/issues)
- **Questions**: Check this FAQ first, then contact support

### Contact Information
For additional support, contact [ethanperello@gmail.com](mailto:ethanperello@gmail.com) with a detailed description of your issue or question.

## Related Documentation

- [How to Use NPC Forge](/docs/how-to-use) - Step-by-step usage guide
- [Features Overview](/docs/features) - Complete feature list
- [Character Library Guide](/docs/library) - Library management and filtering
- [Model Selection Guide](/docs/models) - Understanding AI model tiers
- [Troubleshooting](/docs/testing) - Testing and troubleshooting guide
- [Contributing Guidelines](/docs/contributing) - For reporting issues