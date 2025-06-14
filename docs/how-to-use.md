# How to Use NPC Forge

NPC Forge is an AI-powered character generator featuring a step-by-step wizard interface for creating detailed NPCs. This guide covers the wizard-based creation process, character library management, interactive chat features, and the portrait editing and trait management capabilities.

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
• Watch the progress with enhanced visual loading indicators (NEW in v0.22.0)
• Review the complete character profile with tabs for different sections
• Use the **Save to Library** button which now transitions to **View Library** for better navigation (NEW in v0.22.0)

> **Quick Generation**: Click **Generate Random Character** from any step to create a character with default settings instantly.

## Character Library

### Saving Characters

After generating a character, use the **Save to Library** button to add it to your collection. The button now dynamically transitions to **View Library** for easier navigation (NEW in v0.22.0).

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
• Regenerate specific character elements with enhanced visual feedback (NEW in v0.22.0)
• Upload, regenerate, or edit portraits with text prompts
• Generate and manage additional character traits
• Choose different AI models for regeneration

## Interactive Chat with Characters

### Starting a Conversation

**Multiple ways to begin chatting:**

1. **From Character Cards**: Click the **Chat** button on any character card
2. **From Library Modal**: Open character details and click **Start Chat**
3. **Direct Navigation**: Use the enhanced navigation in the sidebar (NEW in v0.22.0)

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

## Portrait Editing

### Accessing Portrait Editing

Portrait editing is available in the character edit interface:

1. Open any character in edit mode
2. Navigate to the Portrait section
3. Click **Edit Portrait** (only available with existing portraits)
4. Model must support editing (gpt-image-1 recommended)

### Using Portrait Editing

**Edit Interface:**

• **Edit Prompt Field**: Text area for describing desired changes
• **Character Counter**: Shows remaining characters (max varies by model)
• **Model Compatibility**: Warning shown for unsupported models - only gpt-image-1 fully supports editing (NEW in v0.22.0)
• **Edit Button**: Starts the editing process
• **Cancel Option**: Returns to normal portrait view

**Writing Effective Edit Prompts:**

```
// Color changes
"change hair color to blonde"
"make the eyes green"

// Accessories
"add a red hat"
"remove glasses"
"add a beard"

// Clothing modifications
"change shirt to blue"
"add armor"
"remove the cloak"

// Expression changes
"make them smile"
"give them a serious expression"
```

**Best Practices:**

• Be specific about what you want to change
• Use simple, clear language
• Focus on one major change per edit
• Test with different models to see quality differences

### Portrait Editing Workflow

1. **Select Character**: Open character with existing portrait in edit mode
2. **Access Edit Interface**: Click "Edit Portrait" button
3. **Choose Model**: Ensure compatible model is selected (gpt-image-1 recommended)
4. **Write Prompt**: Describe desired changes clearly
5. **Submit Edit**: Click "Edit Portrait" to start processing
6. **Review Results**: New portrait appears when editing completes
7. **Save Changes**: Use "Save Changes" to persist the edited portrait

## Advanced Trait Management

### Additional Traits Section

The Additional Traits section in character editing provides comprehensive trait management:

**Viewing Traits:**

• All additional character traits displayed with editable keys and values
• Traits shown in Title Case format for consistency with proper capitalization (NEW in v0.22.0)
• Category-based organization when available
• Empty state shown when no additional traits exist

**Adding Traits:**

• **Add Custom Trait**: Manually add trait with custom name and value
• **Add Generated Trait**: AI generates a new trait automatically
• Both options create editable trait entries

**Managing Existing Traits:**

• **Edit Trait Names**: Click trait name field to modify
• **Edit Trait Values**: Click trait value field to modify
• **Regenerate Individual Traits**: Use regenerate button for each trait with enhanced visual feedback (NEW in v0.22.0)
• **Remove Traits**: Use delete button to remove unwanted traits

### Trait Generation Features

**AI-Generated Traits:**

• Click "Add Generated Trait" for AI to create relevant traits
• Generated traits match character personality and background
• Traits automatically formatted and validated
• Integration with existing trait display system

**Individual Trait Regeneration:**

• Each trait has its own regenerate button with consistent rotating circle icons (NEW in v0.22.0)
• Regeneration maintains trait context and character consistency
• Loading states show progress during regeneration
• Error handling for failed regeneration attempts

**Trait Organization:**

• Traits automatically filtered for appropriate length and format
• Long or sentence-like traits excluded from filter dropdowns
• Consistent Title Case formatting throughout interface
• Smart categorization when trait categories are recognizable

## Enhanced User Experience (v0.22.0)

### Improved Visual Feedback

• **Visual Loading Indicators**: All regeneration operations now show clear loading states across all edit page sections
• **Enhanced Button Transitions**: "Save to Library" → "View Library" dynamic transitions in character generation
• **Consistent Icon Design**: Rotating circle (RotateCcw) icons for all regeneration buttons
• **Real-Time Status Updates**: Immediate feedback for all character operations

### Enhanced Navigation

• **Streamlined Sidebar**: Integrated "Chat with Characters" link in main navigation
• **Developer Documentation**: New dedicated developer documentation section with comprehensive guides
• **Better Organization**: Cleaner layout and improved user flow throughout the application

### Portrait Editing Improvements

• **Clear Model Messaging**: Enhanced messaging clarifying that only gpt-image-1 supports full editing capabilities
• **Model Compatibility Warnings**: Better warnings for DALL·E 2 (limited) and DALL·E 3 (not supported)
• **Improved Error Handling**: Better feedback for portrait editing failures

## Advanced Features

### Character Regeneration

**Regenerate individual elements:**

• Character attributes (name, appearance, personality, backstory)
• Portrait with different models or styles
• Portrait editing with text prompts
• Individual quest components (title, description, reward)
• Specific dialogue lines
• Item descriptions
• Individual character traits

**Enhanced Visual Feedback (NEW in v0.22.0):**

1. Open character in edit mode
2. Click the regenerate icon next to any element (now with consistent rotating circle icons)
3. Watch enhanced loading indicators showing regeneration progress
4. Choose your preferred model (if applicable)
5. Wait for the new content to generate with real-time feedback

### Model Selection Tips

• **Standard Tier**: Use for frequent generation and experimentation
• **Enhanced Tier**: Use for important characters requiring higher quality
• **Premium Tier**: Reserve for key NPCs needing maximum detail
• **Chat Usage**: Chat responses count against text model limits
• **Portrait Editing**: Editing counts against image model limits

## Common Workflows

### Quick Character Creation

1. Click **Generate Random Character** from any step
2. Review the generated character
3. Make minor edits if needed
4. Save to library (now with enhanced "View Library" transition)
5. Start chatting with your new character

### Detailed Character Creation

1. Start with Concept step and write a detailed description
2. Set specific traits in Options step
3. Choose appropriate model tier in Model step
4. Generate and review in Generate step with enhanced visual feedback
5. Edit and regenerate elements as needed
6. Begin conversations to develop the character further

### Character Development Through Chat and Editing

1. Create initial character with basic details
2. Save to library and start chatting
3. Explore character background through conversation
4. Edit character based on insights from chat
5. Use portrait editing to refine character appearance
6. Generate additional traits as character develops
7. Continue conversations to develop relationships

### Portrait Enhancement Workflow

1. Generate character with basic portrait
2. Save to library and review portrait quality
3. Open character in edit mode
4. Use "Edit Portrait" to refine appearance with text prompts (gpt-image-1 recommended)
5. Try different edit prompts for various improvements
6. Save changes when satisfied with results

### Trait Development Process

1. Start with basic character generation
2. Review generated traits in edit mode
3. Add custom traits relevant to your story
4. Use "Add Generated Trait" for AI suggestions
5. Regenerate individual traits that need improvement with enhanced visual feedback
6. Organize traits for better character presentation

### Organizing Your Collection

1. **Use Consistent Traits**: Apply similar trait values for related characters
2. **Leverage Filtering**: Use the trait filtering system to organize
3. **Export Collections**: Download related character groups as JSON backups
4. **Chat Documentation**: Use conversations to develop character relationships
5. **Regular Maintenance**: Remove unused characters and update existing ones

## Troubleshooting

### Generation Issues

• **Character generation failed**: Check your internet connection and try again
• **Portrait generation failed**: Try with different portrait options
• **Slow generation**: Higher-tier models take longer; wait patiently

### Portrait Editing Issues

• **Edit button disabled**: Ensure character has existing portrait and compatible model selected
• **Editing failed**: Try simpler edit prompts or use gpt-image-1 model
• **Poor results**: gpt-image-1 provides best editing quality; DALL·E 2 has limited capabilities, DALL·E 3 doesn't support editing

### Library Issues

• **Characters not saving**: Your browser storage might be full; delete old characters
• **Can't edit character**: Make sure it's a user-created character, not an example
• **Lost characters**: Characters are stored locally; they don't sync between devices

### Chat Issues

• **Chat not loading**: Verify the character exists in your library
• **Messages not sending**: Check your monthly usage limits for the selected model
• **Character responses inconsistent**: Try using higher-tier models for better consistency

### Trait Management Issues

• **Traits not appearing**: Check that traits meet length and format requirements
• **Regeneration failed**: Try different prompts or check usage limits
• **Filter issues**: Traits only appear in filters after characters with those traits are saved

### Visual Feedback Issues (NEW)

• **Loading indicators not appearing**: Refresh the page if visual feedback isn't working
• **Button transitions not working**: Ensure JavaScript is enabled in your browser

## Tips for Best Results

### Writing Descriptions

• Be specific about key details (appearance, personality, background)
• Include unique elements that make the character memorable
• Mention any special abilities or distinctive features

### Using Advanced Options

• Select personality traits that complement each other
• Choose occupation that fits the genre and character concept
• Use physical traits to reinforce the character's background

### Portrait Generation and Editing

• Describe visual elements in your character description
• Choose art style that matches your game's aesthetic
• Use themed backgrounds for context
• For editing, be specific about desired changes
• Test different edit prompts for best results
• Use gpt-image-1 for reliable editing results

### Chat Conversations

• Start with simple greetings to establish the character's voice
• Ask about their background and motivations
• Reference character traits in your questions
• Use conversations to develop character relationships
• Switch between model tiers based on conversation importance

### Trait Management

• Use consistent trait naming conventions
• Generate traits that complement existing character elements
• Regularly review and update traits as characters develop
• Use trait regeneration to improve existing traits
• Take advantage of enhanced visual feedback to track regeneration progress

### Library Organization

• Use descriptive names for easy searching
• Apply consistent trait values across your collection
• Take advantage of automatic trait discovery
• Use trait-specific searches to find character archetypes
• Download important character groups as JSON for backup
• Start conversations to test character personalities
• Use portrait editing to maintain visual consistency across your collection

## Related Documentation

• [Character Examples](/docs/character-examples) - See what's possible
• [Chat with Characters](/docs/chat) - Detailed conversation guide
• [Generation Options](/docs/generation-options) - Detailed customization including portrait editing
• [Character Library Guide](/docs/library) - Advanced management and trait features
• [Model Selection Guide](/docs/models) - Understanding AI model differences
• [Features Overview](/docs/features) - Complete feature list including latest additions