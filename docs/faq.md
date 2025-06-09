# Frequently Asked Questions

## General Questions

### What is NPC Forge?

NPC Forge is an AI-powered tool for creating detailed non-player characters (NPCs) for games, storytelling, and creative projects. It features a step-by-step wizard interface, character library management, interactive chat with characters, and support for multiple AI models to generate character profiles including names, appearance, personality, backstory, quests, dialogue, items, and AI-created portraits.

### Is NPC Forge free to use?

Yes, NPC Forge is free to use with a tiered model system:
• **Standard models**: 50 text generations, 10 image generations per month
• **Enhanced models**: 30 text generations, 5 image generations per month
• **Premium models**: 10 text generations, 3 image generations per month

> **Note**: Chat conversations count against your text model limits

### Do I need to create an account?

No, NPC Forge does not require an account or login. It works immediately in your browser without any signup process. All characters and conversations are stored locally in your browser.

### What happens to my characters and chat conversations?

Your characters and conversations are stored locally in your browser's IndexedDB storage. You can save characters to your personal library, edit them, chat with them, and organize them. We have no access to your generated characters or conversations.

### Which browsers are supported?

NPC Forge works on modern browsers like Chrome, Firefox, Safari, and Edge. The character library and chat features require IndexedDB support, which is available in all modern browsers.

## Chat Features

### How do I start chatting with a character?

There are several ways to begin a conversation:
1. Click the "Chat" button on any character card in your library
2. Open a character's details modal and click "Start Chat"
3. Navigate directly to `/chat/[characterId]` for any saved character

### Do chat conversations count against my usage limits?

Yes, each chat response from your character counts as one generation against your selected text model's monthly limit:
• Standard (gpt-4o-mini): 50 generations per month
• Enhanced (gpt-4.1-mini): 30 generations per month
• Premium (gpt-4o): 10 generations per month

### How does the AI maintain character consistency in chat?

The AI maintains character consistency through:
• System prompts that include character personality, backstory, and all traits
• Recent conversation context (last 15 messages)
• Instructions to stay in character and respond naturally
• Character-specific dialogue tone and background elements

### Can I switch AI models during a conversation?

Yes! You can change the model selection at any time during a conversation. Different models offer different quality levels and count against their respective monthly limits.

### How long are character responses in chat?

Response lengths automatically adjust based on your input:
• Simple greetings ("Hi"): Brief responses (1-2 sentences)
• Casual questions: Moderate responses (2-4 sentences)
• Detailed requests: Fuller responses (1-2 paragraphs)
• Maximum limit: Never exceeds 3 paragraphs

### Are my conversations private?

Yes, completely private. All conversations are stored locally in your browser using IndexedDB. No conversation data is transmitted to or stored on external servers.

### Can I clear chat history?

Yes, you can clear conversation history per character using the "Clear Chat" button in the chat interface. This action cannot be undone.

### What's the message character limit for chat?

You can send messages up to 1000 characters long. The interface shows a character counter to help you stay within the limit.

## Usage & Features

### How does the wizard interface work?

The wizard guides you through four steps:
1. **Concept**: Choose genre and write character description
2. **Options**: Set traits, enable quests/dialogue/items
3. **Model**: Select AI models for text and image generation
4. **Generate**: Create your character and review results

### What's the difference between the model tiers?

• **🟢 Standard**: Good quality, 50 text/10 image generations per month
• **🟡 Enhanced**: Better quality, 30 text/5 image generations per month
• **🔴 Premium**: Highest quality, 10 text/3 image generations per month

### Can I edit characters after creating them?

Yes! The character library includes an editing system where you can:
• Modify any character attribute
• Regenerate specific elements (name, appearance, quests, etc.)
• Add or remove quests, dialogue lines, and items
• Upload or regenerate portraits
• Choose different AI models for regeneration

### How many characters can I save?

You can save characters to your library limited by your browser's storage capacity. They're stored locally using IndexedDB, which can handle thousands of characters.

### Can I export my characters?

Yes, you can export characters as JSON files for backup or transfer between devices.

### What's character regeneration?

Regeneration allows you to update specific parts of existing characters:
• Regenerate individual attributes (name, appearance, personality, backstory)
• Regenerate portraits with different models or styles
• Regenerate specific quest components, dialogue lines, or items
• Choose different AI models for regeneration

### What's the new filtering system?

The enhanced filtering system includes:
• Dropdown filters for character trait categories
• Automatic filter creation based on your character data
• Smart search using "category: value" syntax
• Collapsible filter sections
• Combined filtering and search

## Technical Questions

### How does NPC Forge work?

NPC Forge uses OpenAI's AI models to generate character content. You select from multiple models (gpt-4o-mini, gpt-4o, dall-e-3, etc.) that create text and images based on your inputs.

### Can I use NPC Forge offline?

No, NPC Forge requires an internet connection for character generation and chat. However, once characters are saved to your library, you can view them offline.

### What happens to my data?

Your inputs are sent to OpenAI's API to generate content but are not stored on our servers. Generated characters and conversations exist only in your browser's local storage. We do not collect, store, or have access to your character data or conversations.

### Why does character generation sometimes fail?

Generation might fail due to:
• Network connectivity issues
• OpenAI API temporary limitations or downtime
• Content policy violations in your inputs
• Browser storage issues (rare)

### Are there any content restrictions?

Yes, NPC Forge follows OpenAI's content policy, which prohibits generating explicit sexual content, hateful content, or content that promotes illegal activities.

### Why do I have usage limits?

Usage limits help manage API costs while keeping NPC Forge free for everyone. Standard models have the highest limits, while Enhanced and Premium models have lower monthly limits due to higher costs.

## Character Library

### How do I save characters to my library?

After generating a character, click "Save to Library" in the results step. The character will be saved with all its data and portrait.

### Can I organize my characters?

Yes, you can:
• Search characters by name or traits
• Filter by genre and character attributes
• Use the new trait filtering system
• Sort and organize your collection
• Start conversations with any character

### What if I lose my characters?

Characters are stored in your browser's local storage. They can be lost if:
• You clear your browser data
• You use a different browser or device
• Browser storage is corrupted

**Prevention**: Regularly export important characters as JSON backup files.

### Can I transfer characters between devices?

Currently, characters are stored locally per browser. To transfer:
1. Export characters as JSON from the original device
2. Import the JSON files on the new device

## Model Selection

### Which models should I use?

**For most users:**
• Use Standard models for regular character creation and casual chat
• Use Enhanced models for important NPCs and meaningful conversations
• Save Premium models for main characters and crucial interactions

### Can I mix different model tiers?

Yes! You can use different tiers for text and image generation, and switch models during chat conversations.

### How do monthly limits work?

Each model has its own monthly limit that resets on the 1st of each month. Limits are tracked per device/browser. Chat responses count against text model limits.

## Troubleshooting

### Character generation failed but my character was created. What happened?

This can happen when:
• The portrait request times out
• The character description contains elements filtered by image models
• There's a temporary issue with the image generation service

You can regenerate the portrait later with different settings or models.

### Characters aren't saving to my library

Check these common issues:
• Make sure you're clicking "Save to Library" after generation
• Verify your browser allows local storage for the site
• Try clearing browser cache and reloading
• Check if you have sufficient browser storage space

### I can't see my saved characters

Try these solutions:
1. Refresh the library page
2. Clear search filters
3. Check if you're using the same browser and device
4. Verify browser storage permissions

### Chat not loading or working

Try these solutions:
1. Verify the character exists in your library
2. Check your monthly usage limits for the selected model
3. Refresh the browser
4. Clear browser cache and try again

### My usage count seems wrong

Usage tracking is per device/browser. If you use multiple browsers or clear browser data, usage counts may appear different.

### Character responses seem inconsistent in chat

Try these solutions:
1. Use higher-tier models (Enhanced or Premium) for more consistent responses
2. Provide more context in your messages
3. Reference character traits and background in your questions
4. Check that the character has detailed personality and backstory information

## Best Practices

### How can I get better character results?

1. **Write detailed descriptions**: Include specific appearance, personality, and background details
2. **Use appropriate model tiers**: Match quality needs with model selection
3. **Be specific with traits**: Choose personality traits that complement each other
4. **Experiment with regeneration**: Try regenerating specific elements for improvement

### How can I have better conversations with characters?

1. **Start simple**: Begin with greetings to establish the character's voice
2. **Ask about their background**: Reference character traits and backstory
3. **Be specific**: Ask detailed questions to get more comprehensive responses
4. **Stay in character context**: Reference previous conversations and character relationships
5. **Use appropriate models**: Higher-tier models provide more consistent character voices

### How should I manage my character library?

1. **Use descriptive names**: Make characters easy to find later
2. **Export important characters**: Create JSON backups regularly
3. **Use the filtering system**: Take advantage of trait filters for organization
4. **Regular conversations**: Chat with characters to develop their personalities
5. **Regular maintenance**: Delete characters you no longer need

## Future Features

### Will there be more features added?

Yes! Based on the roadmap, planned features may include:
• User accounts with cloud sync (future consideration)
• Game integration tools and APIs
• Advanced relationship systems between characters

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

• [How to Use NPC Forge](/docs/how-to-use) - Step-by-step usage guide including chat
• [Chat with Characters](/docs/chat) - Detailed conversation guide
• [Features Overview](/docs/features) - Complete feature list
• [Character Library Guide](/docs/library) - Library management and filtering
• [Model Selection Guide](/docs/models) - Understanding AI model tiers
• [Testing Guide](/docs/testing) - Testing and troubleshooting guide
• [Contributing Guidelines](/docs/contributing) - For reporting issues