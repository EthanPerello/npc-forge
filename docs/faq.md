# Frequently Asked Questions

## Getting Started

### What is NPC Forge?
NPC Forge is an AI-powered character generator that creates detailed NPCs with personalities, backstories, quests, dialogue, items, and portraits. It features interactive chat with your characters and AI-powered portrait editing capabilities.

### Do I need an OpenAI API key?
No, you don't need an OpenAI API key to use NPC Forge. The public application is completely free to use with built-in AI capabilities. API keys are only needed by developers who want to run their own local instance of the application.

### How much does it cost to use?
NPC Forge is completely free to use. There are no costs, subscriptions, or payments required. The application includes built-in usage limits to ensure fair access for all users.

### Is my data safe and private?
Yes. All character data, conversations, and portraits are stored locally in your browser using IndexedDB. No personal information is collected or stored on external servers. You have complete control over your data.

### Can I use NPC Forge offline?
No, NPC Forge requires an internet connection to access AI models for character generation, chat responses, and portrait editing. However, once characters are generated, you can view them offline.

## Character Creation

### How do I create my first character?
1. Use the four-step wizard: Concept → Options → Model → Generate
2. For a quick start, click "Generate Random Character" from any step
3. Save interesting characters to your library for future editing and chat
4. Start with Standard models to learn the system before using Premium options

### What makes a good character description?
Be specific and include visual details, personality hints, and background context. For example: "A scarred elven ranger who protects a sacred forest, harboring guilt over a past failure" works better than "an elf ranger."

### How do the model tiers work?
- **Standard**: 50 text/10 image generations monthly, good quality
- **Enhanced**: 30 text/5 image generations monthly, better quality  
- **Premium**: 10 text/3 image generations monthly, highest quality

For complete details, see the [Model Selection Guide](/docs/models).

### Can I edit characters after creating them?
Yes. Click "Edit" on any character to modify traits, regenerate content, edit portraits, or add new elements. You can also chat with characters to develop their personalities further.

## Portrait Features

### How does portrait editing work?
Portrait editing uses AI to modify existing character portraits based on text prompts. You describe the changes you want (like "change hair color to blonde" or "add glasses") and the AI applies them to the image.

### Which models support portrait editing?
Only **gpt-image-1** (Premium tier) provides full portrait editing support. DALL·E 2 and DALL·E 3 do not support editing at all.

### Why can't I edit my character's portrait?
Common reasons:
- Character doesn't have an existing portrait
- You're using a model that doesn't support editing (needs gpt-image-1)
- You've reached your monthly image generation limit
- The character wasn't saved to your library

### What makes a good edit prompt?
Be specific and focus on one change at a time:
- Good: "change shirt to red," "add round glasses," "make them smile"
- Avoid: "make them look cooler" or complex multi-part changes

## Chat System

### How do I chat with my characters?
Click the "Chat" button on character cards in your library, or use "Start Chat" in the character details modal. The AI maintains the character's personality throughout the conversation.

### Do characters remember our conversations?
Yes, each character maintains their own conversation history stored locally in your browser. The AI uses recent messages to maintain context and consistency.

### Can I change AI models during a chat?
Yes, you can switch between Standard, Enhanced, and Premium models mid-conversation. Each response counts against your selected model's monthly limit.

### Why are my character's responses inconsistent?
Try using a higher-tier model (Enhanced or Premium) for better personality consistency. Also ensure your character has detailed personality traits and background information.

## Character Library

### How do I organize my characters?
Use the enhanced filtering system with dropdown filters and smart search. You can search with syntax like "personality: brave" or "occupation: knight" to find specific character types.

### Can I share characters with others?
Yes, use the "Download JSON" button to export character data. Others can import the JSON file into their library. All character data, including portraits, is included in the export.

### How many characters can I save?
There's no hard limit, but performance may slow with very large collections (1000+ characters). The browser's IndexedDB storage is used, which is typically several gigabytes.

### Why did my characters disappear?
Check if:
- Browser data was cleared (characters are stored locally)
- You're using a different browser or device
- Browser storage permissions changed
- IndexedDB became corrupted (try refreshing the page)

## Trait Management

### How do I add new traits to characters?
In the character editor, use the Additional Traits section:
- "Add Generated Trait" for AI suggestions
- "Add Custom Trait" for manual entries
- Individual regenerate buttons for existing traits

### Why don't some traits appear in filters?
The filtering system automatically excludes traits that are too long, contain full sentences, or are duplicates. This keeps the filter system clean while preserving all trait data.

### Can I regenerate individual traits?
Yes, each trait in the Additional Traits section has its own regenerate button. This counts as one generation against your text model limit.

## Technical Issues

### Character generation failed - what should I check?
1. Check your internet connection
2. Ensure you haven't exceeded monthly usage limits
3. Try simplifying your character description
4. Try different model selections
5. Refresh the page and try again

### Portrait generation is very slow
Portrait generation typically takes 30-120 seconds depending on the selected model and server load. Premium models may take longer but produce better results. This is normal behavior.

### Chat isn't working properly
Common solutions:
- Verify the character exists in your library
- Check that your browser supports IndexedDB
- Ensure you haven't reached your text model usage limits
- Try refreshing the page and starting a new conversation

### Characters aren't saving to my library
Check:
- Browser storage permissions and available space
- IndexedDB functionality (try other web apps that use local storage)
- Browser extensions that might block local storage
- Try using a different browser to isolate the issue

### My usage limits seem wrong
Usage limits reset on the 1st of each month. If limits seem incorrect:
- Check which model tier you're looking at (text vs. image)
- Verify the current date (limits reset monthly)
- Remember that chat responses count against text model limits
- Portrait editing counts against image model limits

## Feature-Specific Questions

### Can I use characters in my commercial projects?
Yes, generated characters and their content belong to you according to OpenAI's terms of service. However, always check the current [OpenAI Terms of Use](https://openai.com/policies/terms-of-use) for the most up-to-date information.

### Does NPC Forge work on mobile devices?
Yes, NPC Forge is fully responsive and works on tablets and smartphones. The interface adapts to smaller screens while maintaining full functionality.

### Can I backup my character library?
Export individual characters as JSON files for backup. For bulk backup, use your browser's developer tools to export IndexedDB data, though this requires technical knowledge.

### Is there a way to import characters from other tools?
Currently, NPC Forge only supports importing characters from its own JSON export format. Characters from other tools would need to be recreated using the wizard.

### Can I customize the AI prompts used for generation?
No, the AI prompts are built into the system to ensure consistent, high-quality results. However, you can influence generation through detailed character descriptions and trait selections.

## Troubleshooting Specific Errors

### "Usage limit exceeded" error
- Check which model you're using and its monthly limit
- Verify the current date (limits reset on the 1st)
- Consider switching to a model with remaining usage
- Wait for the monthly reset if all limits are reached

### "Generation failed" errors
- Try simplifying your character description
- Check your internet connection stability
- Verify service availability
- Try different model selections

### Portrait editing not working
- Ensure you're using gpt-image-1 model
- Verify the character has an existing portrait
- Check your image model usage limits
- Try simpler edit prompts

## Best Practices

### How should I manage my monthly usage limits?
- Start with Standard models for experimentation
- Use Enhanced models for important characters
- Reserve Premium models for critical main characters
- Plan usage around monthly cycles

### What's the best workflow for creating characters?
1. Create base character with Standard models
2. Save to library if you like the results
3. Use editing features to refine and improve
4. Start conversations to develop personality
5. Use portrait editing to perfect appearance

### How can I get better results from character generation?
- Write specific, detailed character descriptions
- Use appropriate genre and sub-genre selections
- Select relevant traits and occupations
- Choose model tiers based on character importance
- Iterate using editing and regeneration features

### Should I use portrait editing or regenerate portraits?
- **Portrait editing**: For small changes to existing portraits (color, accessories, expressions)
- **Portrait regeneration**: For completely different looks or when editing isn't supported

## Related Documentation

• [How to Use NPC Forge](/docs/how-to-use) - Complete user guide
• [Model Selection Guide](/docs/models) - Detailed model information and usage limits
• [Character Examples](/docs/character-examples) - See what's possible with different approaches
• [Generation Options](/docs/generation-options) - Detailed customization reference