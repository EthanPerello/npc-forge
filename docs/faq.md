# Frequently Asked Questions

## General Questions

### What is NPC Forge?
NPC Forge is an AI-powered tool for creating detailed non-player characters (NPCs) for games, storytelling, and creative projects. It features a step-by-step wizard interface, character library management, and support for multiple AI models to generate complete character profiles including names, appearance, personality, backstory, quests, dialogue, items, and AI-created portraits.

### Is NPC Forge free to use?
Yes, NPC Forge is free to use with a tiered model system:
- **Standard models**: Unlimited usage (gpt-4o-mini for text, dall-e-2 for images)
- **Enhanced models**: 30 generations per month (gpt-4.1-mini for text, dall-e-3 for images)
- **Premium models**: 10 generations per month (gpt-4o for text, gpt-image-1 for images)

### Do I need to create an account to use NPC Forge?
No, NPC Forge does not require an account or login. It works immediately in your browser without any signup process. All characters are stored locally in your browser using IndexedDB.

### What happens to my characters after I create them?
Your characters are stored locally in your browser's IndexedDB storage. You can save unlimited characters to your personal library, edit them, and organize them however you like. We have no access to your generated characters.

### Which browsers are supported?
NPC Forge works best on modern browsers like Chrome, Firefox, Safari, and Edge. The character library requires IndexedDB support, which is available in all modern browsers.

## Usage & Features

### How does the wizard interface work?
The wizard guides you through four steps:
1. **Concept**: Choose genre and write character description
2. **Options**: Set traits, enable quests/dialogue/items
3. **Model**: Select AI models for text and image generation
4. **Generate**: Create your character and review results

You can navigate between steps using the progress bar at the top.

### What's the difference between the model tiers?
- **🟢 Standard**: Good quality, unlimited usage, best for regular characters
- **🟡 Enhanced**: Better quality, 30/month limit, ideal for important characters
- **🔴 Premium**: Highest quality, 10/month limit, perfect for main characters

Each tier offers progressively better detail, creativity, and consistency.

### Can I edit characters after creating them?
Yes! The character library includes a full editing system where you can:
- Modify any character attribute
- Regenerate specific elements (name, appearance, quests, etc.)
- Add or remove quests, dialogue lines, and items
- Upload or regenerate portraits
- Choose different AI models for regeneration

### How many characters can I save?
You can save unlimited characters to your library. They're stored locally in your browser using IndexedDB, which provides reliable storage for large amounts of data.

### Can I export my characters?
Yes, you can export characters in several ways:
- **Individual JSON**: Download specific characters as JSON files
- **Character images**: Download character portraits
- **Bulk export**: Export your entire library (feature may vary by version)

### What's character regeneration?
Regeneration allows you to update specific parts of existing characters:
- Regenerate individual attributes (name, appearance, personality, backstory)
- Regenerate portraits with different models or styles
- Regenerate specific quest components, dialogue lines, or items
- Choose different AI models for regeneration

## Technical Questions

### How does NPC Forge work?
NPC Forge uses OpenAI's AI models to generate character content. You select from multiple models (gpt-4o-mini, gpt-4o, dall-e-3, etc.) that create text and images based on your inputs and selections.

### Can I use NPC Forge offline?
No, NPC Forge requires an internet connection because it relies on OpenAI's API services for character generation. However, once characters are saved to your library, you can view them offline.

### What happens to my data?
Your inputs are sent to OpenAI's API to generate content but are not stored on our servers. Generated characters exist only in your browser's local storage. We do not collect, store, or have access to your character data.

### Why does character generation sometimes fail?
Generation might fail due to:
- Network connectivity issues
- OpenAI API temporary limitations or downtime
- Content policy violations in your inputs
- Browser storage issues (rare)

Try refreshing the page or using simpler descriptions if you encounter problems.

### Are there any content restrictions?
Yes, NPC Forge follows OpenAI's content policy, which prohibits generating explicit sexual content, hateful content, or content that promotes illegal activities. Requests that violate these policies will be rejected by the AI models.

### Why do I have usage limits?
Usage limits help manage API costs while keeping NPC Forge free for everyone. Standard models have unlimited usage, while Enhanced and Premium models have monthly limits because they cost more to operate.

## Character Library

### How do I save characters to my library?
After generating a character, click "Save to Library" in the results step. The character will be automatically saved with all its data and portrait.

### Can I organize my characters?
Yes, you can:
- Search characters by name or description
- Filter by genre and sub-genre
- Sort by creation or modification date
- Use descriptive names for easy organization

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

**Model selection tips:**
- Start with Standard models and regenerate with higher tiers if needed
- Match model tier to character importance in your story/game
- Monitor your monthly usage to optimize efficiency

### Can I mix different model tiers?
Yes! You can use different tiers for text and image generation. For example, Enhanced text with Standard image, or vice versa.

### How do monthly limits work?
Each model has its own monthly limit that resets on the 1st of each month. Limits are tracked per device/browser, not per user account.

## Troubleshooting

### Portrait generation failed but my character was created. What happened?
This can happen when:
- The portrait request times out
- The character description contains elements that image models filter out
- There's a temporary issue with the image generation service

You can regenerate the portrait later with different settings or models.

### The character generation seems stuck. What should I do?
If generation takes too long (more than 60 seconds):
1. Check your internet connection
2. Try refreshing the page
3. Use a simpler character description
4. Try a different model tier

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
Usage tracking is per device/browser. If you use multiple browsers or clear browser data, usage counts may appear different. Each browser tracks usage independently.

## Best Practices

### How can I get better character results?
1. **Write detailed descriptions**: Include specific appearance, personality, and background details
2. **Use appropriate model tiers**: Match quality needs with model selection
3. **Be specific with traits**: Choose personality traits that complement each other
4. **Experiment with regeneration**: Try regenerating specific elements for improvement

### How should I manage my character library?
1. **Use descriptive names**: Make characters easy to find later
2. **Export important characters**: Create JSON backups regularly
3. **Organize by campaign/story**: Use naming conventions for related characters
4. **Regular maintenance**: Delete characters you no longer need

### What's the best model selection strategy?
1. **Start with Standard**: Generate initial versions with unlimited models
2. **Selective upgrades**: Regenerate key elements with higher-tier models
3. **Budget planning**: Plan your monthly Enhanced/Premium usage
4. **Quality matching**: Use higher tiers for more important characters

## Future Features

### Will there be more features added?
Yes! Planned features include:
- Chat interface to talk with your characters (v0.14.0)
- Optional user accounts with cloud sync (v0.15.0)
- Game integration tools and APIs
- Advanced relationship systems between characters

See the [Roadmap](/docs/roadmap) for detailed future plans.

### Will there be a premium version?
Currently, there are no plans for a paid tier. The tiered model system provides quality options while keeping the core functionality free for everyone.

### Can I request features?
Yes! You can:
- Open an issue on [GitHub](https://github.com/EthanPerello/npc-forge/issues)
- Contact the developer at [ethanperello@gmail.com](mailto:ethanperello@gmail.com)
- Participate in community discussions

Feature requests are evaluated based on user demand, technical feasibility, and project goals.

## Getting Help

### How can I report issues or request features?
- **Bug reports**: Open an issue on [GitHub](https://github.com/EthanPerello/npc-forge/issues)
- **Feature requests**: Use GitHub discussions or email
- **General questions**: Check this FAQ first, then contact support

### Where can I find more help?
- [How to Use Guide](/docs/how-to-use) - Complete wizard walkthrough
- [Character Library Guide](/docs/library) - Library management
- [Model Selection Guide](/docs/models) - Understanding model tiers
- [Character Examples](/docs/character-examples) - Sample characters
- [Generation Options](/docs/generation-options) - Detailed customization

### Contact Information
For additional support, contact [ethanperello@gmail.com](mailto:ethanperello@gmail.com) with a detailed description of your issue or question.