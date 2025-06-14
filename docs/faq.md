# Frequently Asked Questions

## Getting Started

### What is NPC Forge?

NPC Forge is an AI-powered character generator that creates detailed non-player characters for games, tabletop RPGs, and storytelling. It uses OpenAI's models to generate comprehensive character profiles including personalities, backstories, quests, dialogue, items, and portraits. You can also chat with your characters and edit their portraits using AI.

### Do I need an OpenAI API key?

Yes, NPC Forge requires an OpenAI API key to function. You can get one from [OpenAI's website](https://platform.openai.com/). The key is stored locally in your browser and never sent to external servers.

### Is my data safe?

Yes, all your character data is stored locally in your browser using IndexedDB. Your API key and characters never leave your device. NPC Forge doesn't collect or store any personal information on external servers.

### How much does it cost to use?

NPC Forge itself is free, but you pay for OpenAI API usage according to their pricing. The app tracks your monthly usage to help you stay within reasonable limits. Typical usage costs a few dollars per month for casual use.

## Character Creation

### How do I create a character?

1. **Start the wizard**: Click "Generate Character" on the main page
2. **Choose concept**: Select a genre and add a character description  
3. **Set options**: Customize traits, quests, dialogue, and items
4. **Select models**: Choose your AI model tier (Standard/Enhanced/Premium)
5. **Generate**: Click generate and wait for your character to be created
6. **Save**: Add your character to the library for future use

### What's the difference between the model tiers?

• **Standard (🟢)**: Good quality, higher monthly limits (50 text/10 images)
• **Enhanced (🟡)**: Better quality, medium limits (30 text/5 images)  
• **Premium (🔴)**: Best quality, lower limits (10 text/3 images)

Higher tiers produce more detailed and consistent characters but have lower monthly usage limits.

### Can I customize the generation options?

Yes! You can control:
• **Character traits**: Age, gender, personality, occupation, species, and more
• **Content types**: Enable/disable quests, dialogue, items, and portraits
• **Genre settings**: Fantasy, sci-fi, modern, historical, and custom descriptions
• **Portrait options**: Art style, mood, framing, and background
• **AI models**: Choose different models for text and image generation

### What if I don't like the generated character?

You can:
• **Regenerate completely**: Create a new character with the same or different options
• **Edit individual parts**: Regenerate specific traits, quests, dialogue, or portraits
• **Modify manually**: Edit any character field directly in the character editor
• **Try different models**: Use higher-tier models for better quality

## Portrait Features

### How does portrait editing work?

Portrait editing uses AI to modify existing character portraits based on text prompts. You can:
• **Make adjustments**: Change clothing, expressions, backgrounds, or other visual elements
• **Use natural language**: Describe what you want changed in simple terms
• **Preview changes**: See the edited portrait before saving
• **Revert if needed**: Keep the original if you don't like the edit

### Which models support portrait editing?

Portrait editing is currently available with the **gpt-image-1** model (Premium tier only). This model provides the highest quality results for both generation and editing. DALL·E 2 has limited editing capabilities, while DALL·E 3 does not support editing.

### What makes a good edit prompt?

1. **Be specific**: "Add a blue cloak" rather than "change clothing"
2. **Keep it simple**: One or two changes per edit work best
3. **Use clear language**: Avoid complex or ambiguous descriptions
4. **Consider the character**: Make edits that fit the character's style and setting

### Why did my portrait edit fail?

Common reasons include:
• **Model compatibility**: Portrait editing requires gpt-image-1 (Premium tier)
• **Usage limits**: You may have reached your monthly image generation limit
• **Prompt issues**: The edit prompt may be too complex or unclear
• **Technical issues**: Network problems or API temporary issues

## Trait Management

### How do I add new traits to a character?

1. **Open character editor**: Click the edit button on any character
2. **Find Additional Traits**: Scroll to the Additional Traits section
3. **Add Generated Trait**: Click the "Add Generated Trait" button for AI suggestions
4. **Manual addition**: Or add custom traits manually
5. **Save changes**: Don't forget to save your edits

### Can I regenerate individual traits?

Yes! In the character editor, you'll find regenerate buttons next to each trait in the Additional Traits section. This lets you refresh specific traits without affecting the rest of the character.

### Why don't some traits appear in filters?

The filtering system automatically excludes traits that are:
• **Too long**: Sentence-like traits that are more like descriptions
• **Duplicate**: Traits that are very similar to existing filter options
• **Inappropriate**: Traits that don't make good filter categories

This keeps the filter system clean and useful while preserving all trait data.

## Character Library

### How do I organize my characters?

The library offers several organization tools:
• **Search**: Find characters by name, description, or traits
• **Trait filters**: Filter by specific traits like personality, occupation, or species
• **Advanced search**: Use "category: value" syntax (e.g., "personality: brave")
• **Visual browsing**: Browse character portraits and summaries
• **Export/import**: Create backups or share character collections

### Can I edit characters after creation?

Yes! Click the "Edit" button on any character to:
• **Modify basic info**: Name, description, and core traits
• **Regenerate content**: Update portraits, quests, dialogue, or items individually
• **Add new traits**: Generate additional traits or add custom ones
• **Edit portraits**: Use AI to modify character portraits
• **Manage relationships**: Update character connections and backstory

### How do I export my characters?

1. **Open character details**: Click on any character in your library
2. **Find export option**: Look for the "Export JSON" button
3. **Save the file**: The character data downloads as a JSON file
4. **Import elsewhere**: Use the JSON file to import the character later or share with others

## Chat System

### How do I chat with characters?

1. **From character card**: Click the chat bubble icon on any character
2. **From library modal**: Open character details and click "Start Conversation"
3. **Type your message**: Enter your message in the chat input (max 1,000 characters)
4. **Select model**: Choose which AI model to use for the conversation
5. **Send and wait**: The character will respond maintaining their personality

### Do characters remember previous conversations?

Yes! Each character maintains their own conversation history stored locally in your browser. The AI uses recent conversation context to provide consistent, character-appropriate responses.

### Can I change AI models during a conversation?

Yes, you can switch between Standard, Enhanced, and Premium models at any time during a conversation. This is useful for using Standard models for casual chat and Premium models for important story moments.

### Why are my chat messages not sending?

Check these common issues:
• **Usage limits**: You may have reached your monthly limit for the selected model
• **Message length**: Messages must be under 1,000 characters
• **Network connection**: Ensure you have a stable internet connection
• **API key**: Verify your OpenAI API key is valid and has sufficient credits

## Technical Issues

### Characters aren't loading in my library

Try these solutions:
• **Refresh the page**: Sometimes a simple refresh resolves loading issues
• **Check browser storage**: Ensure your browser supports IndexedDB and has sufficient storage
• **Clear browser cache**: If problems persist, try clearing your browser's cache
• **Check console**: Open browser developer tools to see if there are any error messages

### Portrait generation is very slow

Portrait generation can take 30-120 seconds depending on:
• **Selected model**: Premium models may take longer but produce better results
• **Server load**: OpenAI's servers may be busy during peak times
• **Network speed**: Slower internet connections will increase wait times
• **Image complexity**: More detailed portraits may take longer to generate

### I'm getting "Invalid API key" errors

This usually means:
• **Incorrect key**: Double-check your API key is entered correctly
• **Expired key**: Your OpenAI API key may have expired
• **Insufficient credits**: Your OpenAI account may need additional credits
• **Revoked access**: The API key may have been revoked from your OpenAI account

## Best Practices

### How should I manage my monthly usage limits?

1. **Monitor usage**: Check the usage indicator regularly
2. **Use appropriate tiers**: Start with Standard, upgrade for important characters
3. **Batch operations**: Generate multiple characters when you're actively creating
4. **Strategic editing**: Use portrait editing and trait regeneration judiciously
5. **Chat efficiently**: Use lower tiers for casual conversations, higher tiers for key moments

### What makes a good character description?

1. **Include visual details**: Describe appearance for better portraits
2. **Add personality hints**: Mention key traits or quirks
3. **Provide context**: Include role, background, or setting information
4. **Keep it focused**: 2-3 sentences work better than long paragraphs
5. **Be specific**: "Gruff dwarf blacksmith" is better than "fantasy character"

### How should I use portrait editing effectively?

1. **Start with good generation**: Create the best possible initial portrait
2. **Make incremental changes**: Small edits work better than major overhauls
3. **Be specific**: Clear, simple prompts get better results
4. **Consider the setting**: Make edits that fit the character's world
5. **Save originals**: Keep backups before making significant edits

### How should I manage my character library?

1. **Use descriptive names**: Make characters easy to find later
2. **Export important characters**: Create JSON backups regularly
3. **Use the filtering system**: Take advantage of trait filters for organization
4. **Regular conversations**: Chat with characters to develop their personalities
5. **Maintain consistency**: Use portrait editing and trait management for cohesive collections
6. **Regular maintenance**: Delete characters you no longer need and update existing ones

## New Features (v0.22.0)

### What's new in the latest version?

• **Enhanced Visual Feedback**: All regeneration operations now show clear loading indicators
• **Improved Navigation**: Better transitions between library and character creation
• **Developer Documentation**: New comprehensive documentation for developers
• **UI Improvements**: More consistent icons and better visual feedback throughout the app

### How do I access developer documentation?

Developer documentation is available in the sidebar under "Developer Docs" with comprehensive guides for technical implementation and API usage.

## Future Features

### Will there be more features added?

Yes! Based on the roadmap, planned features may include:
• Advanced character relationship systems
• User accounts with cloud sync (future consideration)
• Game integration tools and APIs
• Enhanced collaboration features

### Can I request features?

Yes! You can:
• Open an issue on [GitHub](https://github.com/EthanPerello/npc-forge/issues)
• Contact the developer at [ethanperello@gmail.com](mailto:ethanperello@gmail.com)

## Getting Help

### How can I report issues or request features?

• **Bug reports**: Open an issue on [GitHub](https://github.com/EthanPerello/npc-forge/issues)
• **Questions**: Check this FAQ first, then contact support

### Contact Information

For additional support, contact [ethanperello@gmail.com](mailto:ethanperello@gmail.com) with a detailed description of your issue or question.

## Related Documentation

• [How to Use NPC Forge](/docs/how-to-use) - Step-by-step usage guide including portrait editing and trait management
• [Chat with Characters](/docs/chat) - Detailed conversation guide
• [Features Overview](/docs/features) - Complete feature list including latest additions
• [Character Library Guide](/docs/library) - Library management, filtering, and trait management
• [Model Selection Guide](/docs/models) - Understanding AI model tiers
• [Generation Options](/docs/generation-options) - Detailed customization including portrait editing
• [Testing Guide](/docs/testing) - Testing and troubleshooting guide
• [Contributing Guidelines](/docs/contributing) - For reporting issues