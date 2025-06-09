# How to Use NPC Forge

NPC Forge is an AI-powered character generator featuring a step-by-step wizard interface for creating detailed NPCs. This guide covers the wizard-based creation process, character library management, and interactive chat features.

## Quick Start Guide

### Welcome to the Wizard

When you first visit NPC Forge, you'll see a welcome popup that introduces the wizard interface. The wizard guides you through four steps to create your character.

### Step 1: Concept

![Concept Step Interface](/images/concept-step.png)

**Choose your foundation:**

• **Select a Genre**: Pick from Fantasy, Sci-Fi, Historical, or Contemporary
• **Pick a Sub-Genre**: Choose from 16 specialized templates
• **Write Your Description**: Provide a detailed description of your character

**Example description:**
```
A scarred elven ranger who protects a sacred forest, harboring a secret connection to ancient magic that causes plants to grow in her footsteps.
```

> **Tip**: The more specific your description, the more tailored your character will be.

### Step 2: Options

![Options Step Interface](/images/options-step.png)

**Customize character traits:**

• **Basic Traits**: Set gender, age, moral alignment, and relationship to player
• **Advanced Options** (expandable):
  • Physical traits (height, build, distinctive features)
  • Background (social class, homeland, occupation)
  • Personality traits (multiple selection)
• **Additional Elements**:
  • Enable/disable quests, dialogue, and items
  • Customize quest types, dialogue tone, item categories

> **Navigation Tip**: Use the progress bar at the top to jump between steps.

### Step 3: Model Selection

![Model Selection Interface](/images/model-step.png)

**Choose your AI models:**

| Tier | Text Model | Image Model | Monthly Limit | Best For |
|------|------------|-------------|---------------|----------|
| 🟢 Standard | gpt-4o-mini | dall-e-2 | 50 text / 10 images | Regular use |
| 🟡 Enhanced | gpt-4.1-mini | dall-e-3 | 30 text / 5 images | Higher quality |
| 🔴 Premium | gpt-4o | gpt-image-1 | 10 text / 3 images | Maximum detail |

**Portrait Customization:**

• Art style (realistic, fantasy, anime, etc.)
• Expression/mood (neutral, happy, serious, etc.)
• Framing (portrait, bust, full-body, action)
• Background (plain, gradient, themed, etc.)

### Step 4: Generate

![Generation Results](/images/generate-step.png)

**Create your character:**

• Click **Generate Character** to start the AI generation process
• Watch the progress as your character is created
• Review the complete character profile with tabs for different sections

> **Quick Generation**: Click **Generate Random Character** from any step to create a character with default settings instantly.

## Character Library

### Saving Characters

After generating a character, use the **Save to Library** button to add it to your collection.

### Managing Your Library

![Character Library Interface](/images/character-library.png)

• **Browse Characters**: View all saved characters with visual cards
• **Search & Filter**: Find specific characters by name, genre, or traits
• **Direct Actions**: Each card has buttons for editing, downloading, deleting, and **chatting**
• **Import/Export**: Upload JSON files or download characters for backup

### Enhanced Filtering System

The library features an advanced filtering system:

**Filter Categories:**

• Basic Information (genre, gender, age, alignment)
• Physical Traits (species, height, build)
• Background & Social (occupation, social class, homeland)
• Personality (personality traits, motivations)

**Smart Search:**

Use trait-specific searches:

• `personality: brave` - Find all brave characters
• `occupation: knight` - Find all knights
• `genre: fantasy` - Filter by fantasy genre

**Using Filters:**

1. Use dropdown filters to narrow by categories
2. Add specific searches using `category: value` syntax
3. Combine multiple filters and search terms
4. See results update in real-time

### Editing Characters

**Full editing capabilities:**

• Modify all character attributes
• Add or remove quests, dialogue lines, and items
• Regenerate specific character elements
• Upload or regenerate portraits
• Choose different AI models for regeneration

## Interactive Chat with Characters

### Starting a Conversation

**Multiple ways to begin chatting:**

1. **From Character Cards**: Click the **Chat** button on any character card
2. **From Library Modal**: Open character details and click **Start Chat**
3. **Direct Navigation**: Go to `/chat/[characterId]` for any saved character

### Chat Interface Features

**Compact Design:**

• **Compact Header**: Character portrait and name in header
• **Model Selection**: Message count and model selection
• **Message History**: Scrollable conversation history
• **Input Area**: Text input with character counter (max 1000 characters)
• **Chat Controls**: Clear chat and retry message options

**Model Selection in Chat:**

• Choose between Standard, Enhanced, or Premium models during conversation
• Each response counts against your monthly limit for the selected model
• Switch models mid-conversation based on your available usage

### How Chat Works

**Character Consistency:**

• AI maintains character personality throughout conversations
• Character traits, backstory, and relationships inform responses
• System prompts ensure the character stays in character
• Recent conversation context (last 15 messages) provided to AI

**Dynamic Response Lengths:**

• Simple greetings: Brief responses (1-2 sentences)
• Casual questions: Moderate responses (2-4 sentences)
• Detailed requests: Fuller responses (1-2 paragraphs)
• Maximum limit: Never exceeds 3 paragraphs

### Chat Storage and Privacy

**Local Storage:**

• All conversations stored locally in your browser using IndexedDB
• Per-character conversation sessions
• Messages automatically saved as you chat
• No data transmitted to external servers

**Conversation Management:**

• Clear chat history per character
• Conversations persist between browser sessions
• Maximum 100 messages per session (automatically trimmed)
• Retry failed messages with error handling

## Advanced Features

### Character Regeneration

**Regenerate individual elements:**

• Character attributes (name, appearance, personality, backstory)
• Portrait with different models or styles
• Individual quest components (title, description, reward)
• Specific dialogue lines
• Item descriptions

**How to regenerate:**

1. Open character in edit mode
2. Click the regenerate icon next to any element
3. Choose your preferred model (if applicable)
4. Wait for the new content to generate

### Model Selection Tips

• **Standard Tier**: Use for frequent generation and experimentation
• **Enhanced Tier**: Use for important characters requiring higher quality
• **Premium Tier**: Reserve for key NPCs needing maximum detail
• **Chat Usage**: Chat responses count against text model limits

## Common Workflows

### Quick Character Creation

1. Click **Generate Random Character** from any step
2. Review the generated character
3. Make minor edits if needed
4. Save to library
5. Start chatting with your new character

### Detailed Character Creation

1. Start with Concept step and write a detailed description
2. Set specific traits in Options step
3. Choose appropriate model tier in Model step
4. Generate and review in Generate step
5. Edit and regenerate elements as needed
6. Begin conversations to develop the character further

### Character Development Through Chat

1. Create initial character with basic details
2. Save to library and start chatting
3. Explore character background through conversation
4. Edit character based on insights from chat
5. Continue conversations to develop relationships

### Organizing Your Collection

1. **Use Consistent Traits**: Apply similar trait values for related characters
2. **Leverage Filtering**: Use the trait filtering system to organize
3. **Export Collections**: Download related character groups as JSON backups
4. **Chat Documentation**: Use conversations to develop character relationships

## Troubleshooting

### Generation Issues

• **Character generation failed**: Check your internet connection and try again
• **Portrait generation failed**: Try with different portrait options
• **Slow generation**: Higher-tier models take longer; wait patiently

### Library Issues

• **Characters not saving**: Your browser storage might be full; delete old characters
• **Can't edit character**: Make sure it's a user-created character, not an example
• **Lost characters**: Characters are stored locally; they don't sync between devices

### Chat Issues

• **Chat not loading**: Verify the character exists in your library
• **Messages not sending**: Check your monthly usage limits for the selected model
• **Character responses inconsistent**: Try using higher-tier models for better consistency

### Filtering Issues

• **Traits not appearing in filters**: Traits only appear after characters with those traits are saved
• **Search not working**: Check syntax for trait-specific searches (`category: value`)
• **Inconsistent results**: Check for variations in trait spelling

### Usage Limits

• **Reached monthly limit**: Wait for the monthly reset or use Standard tier
• **Unexpected limit reached**: Check which models you're using and their individual limits
• **Chat usage**: Remember that chat responses count against text model limits

## Tips for Best Results

### Writing Descriptions

• Be specific about key details (appearance, personality, background)
• Include unique elements that make the character memorable
• Mention any special abilities or distinctive features

### Using Advanced Options

• Select personality traits that complement each other
• Choose occupation that fits the genre and character concept
• Use physical traits to reinforce the character's background

### Portrait Generation

• Describe visual elements in your character description
• Choose art style that matches your game's aesthetic
• Use themed backgrounds for context

### Chat Conversations

• Start with simple greetings to establish the character's voice
• Ask about their background and motivations
• Reference character traits in your questions
• Use conversations to develop character relationships
• Switch between model tiers based on conversation importance

### Library Organization

• Use descriptive names for easy searching
• Apply consistent trait values across your collection
• Take advantage of automatic trait discovery
• Use trait-specific searches to find character archetypes
• Download important character groups as JSON for backup
• Start conversations to test character personalities

## Related Documentation

• [Character Examples](/docs/character-examples) - See what's possible
• [Chat with Characters](/docs/chat) - Detailed conversation guide
• [Generation Options](/docs/generation-options) - Detailed customization
• [Character Library Guide](/docs/library) - Advanced management features
• [Model Selection Guide](/docs/models) - Understanding AI model differences
• [Features Overview](/docs/features) - Complete feature list