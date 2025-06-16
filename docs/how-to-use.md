# How to Use NPC Forge

NPC Forge is an AI-powered character generator that creates detailed NPCs through a step-by-step wizard interface. This comprehensive guide covers character creation, library management, interactive chat, and editing features.

## Getting Started

### First Steps
1. Visit NPC Forge and you'll see a welcome popup for new users
2. Click "Get Started" to begin the character creation wizard
3. The application is completely free to use with built-in AI capabilities
4. All character data is stored locally in your browser for privacy

### Quick Character Creation
• Click **"Generate Random Character"** from any step for instant results
• This creates a character with default settings and takes you to the final step
• Perfect for testing the system or when you need inspiration

## Character Creation Wizard

### Step 1: Concept
**Choose Your Foundation**

![Concept Step Interface](public/images/concept-step.png)

• **Select a Genre**: Fantasy, Sci-Fi, Historical, or Contemporary
• **Pick a Sub-Genre**: 16 specialized templates like High Fantasy, Cyberpunk, Medieval, Mystery & Thriller
• **Write Your Description**: Be specific about appearance, personality, and background

**Example Description**: "A scarred elven ranger who protects a sacred forest, harboring a secret connection to ancient magic that causes plants to grow in her footsteps."

**Tips for Better Results**:
• Include visual details for better portraits
• Mention personality traits or quirks
• Add context about role or background
• 2-3 sentences work better than paragraphs

### Step 2: Options
**Customize Character Details**

![Options Step Interface](public/images/options-step.png)

**Basic Traits**:
• Gender (Male, Female, Nonbinary, Unknown)
• Age Group (Child, Teen, Adult, Elder)
• Moral Alignment (Good, Neutral, Evil)
• Relationship to Player (Ally, Enemy, Neutral, Mentor, Rival, Betrayer)

**Advanced Options** (expandable section):
• **Physical Traits**: Height, build, distinctive features
• **Background**: Social class, homeland/origin
• **Occupation**: Searchable dropdown with genre-specific options
• **Personality Traits**: Multi-select system (unlimited selection)

**Content Generation Options**:
• **Include Quests**: 3-7 quests with customizable types and rewards
• **Include Dialogue**: 5-15 character-appropriate dialogue lines
• **Include Items**: 3-10 items with rarity and category settings
• **Include Portrait**: Toggle AI-generated character artwork

**Using the Controls**:
• **Randomize**: Generates random traits while preserving your description
• **Clear Options**: Resets all fields except description and portrait settings
• Progress bar at top allows jumping between steps

### Step 3: Model Selection
**Choose AI Quality and Usage**

![Model Selection Interface](public/images/model-step.png)

**Text Models** (for character content):
• **Standard (gpt-4o-mini)**: 50 generations/month, good quality
• **Enhanced (gpt-4.1-mini)**: 30 generations/month, better detail
• **Premium (gpt-4o)**: 10 generations/month, highest quality

**Image Models** (for portraits):
• **Standard (dall-e-2)**: 10 generations/month, basic portraits
• **Enhanced (dall-e-3)**: 5 generations/month, improved quality
• **Premium (gpt-image-1)**: 3 generations/month, best quality + editing support

**Portrait Customization Options**:
• Art Style: Realistic, Fantasy Art, Anime, Comic Book, Oil Painting
• Expression: Neutral, Happy, Serious, Angry, Determined, Mysterious
• Framing: Portrait, Bust, Full Body, Action Pose
• Background: Plain, Gradient, Themed, Environmental, Abstract

**Model Selection Tips**:
• Start with Standard models for experimentation
• Use Enhanced/Premium for important characters
• Consider mixing tiers (Standard text + Enhanced image)
• Monitor usage indicators to track monthly limits

### Step 4: Generate
**Create Your Character**

![Generation Results Interface](public/images/generate-step.png)

• Click **"Generate Character"** to start AI processing
• Generation takes 30-120 seconds depending on options and model selection
• Loading message appears after 3 seconds for longer generations
• Results display in tabbed interface: Profile, Quests, Dialogue, Items

**After Generation**:
• **Save to Library**: Stores character locally for editing and chat
• **Download JSON**: Exports character data for backup
• **Download Portrait**: Saves portrait image (if generated)
• **New Character**: Starts wizard over with fresh options

## Character Library

### Saving and Organizing Characters
**Character Storage**:
• All characters saved locally in your browser using IndexedDB
• Includes character data, portraits, and later chat conversations
• No data is sent to external servers
• Characters persist across browser sessions

**Library Interface**:
• Character cards show portrait, name, and trait tags
• Action buttons on each card: Chat, Edit, Download JSON, Download Portrait, Delete
• Click character cards to open detailed modal view
• Search bar at top for finding specific characters

### Enhanced Filtering and Search
**Automatic Trait Discovery**:
• Filter dropdowns automatically created from your character data
• Organized into categories: Basic Info, Physical Traits, Background, Personality
• New traits appear in filters as you save more characters

**Smart Search Functionality**:
• General text search across all character data
• Trait-specific syntax: `personality: brave`, `occupation: knight`, `genre: fantasy`
• Combine multiple filters and search terms
• Results update in real-time as you type

**Using Filters Effectively**:
• Use dropdown filters to narrow by trait categories
• Combine with search for precise results like "fantasy characters who are mentors"
• Filter panels are collapsible for better organization
• Clear all filters with reset button

### Character Editing
**Accessing Edit Mode**:
• Click "Edit" button on character cards
• Edit page provides comprehensive character modification tools
• Model selectors at top allow choosing different AI models for regeneration

**Available Edits**:
• **Basic Information**: Name, description, core traits
• **Character Content**: Modify quests, dialogue, and items
• **Add/Remove Elements**: Add new quests, dialogue lines, or items
• **Individual Regeneration**: Regenerate specific character elements
• **Portrait Management**: Upload, regenerate, or edit portraits
• **Trait Management**: Add, edit, or regenerate character traits

**Regeneration Features**:
• Individual attributes (name, appearance, personality, backstory)
• Quest components (title, description, reward separately)
• Dialogue lines and item descriptions
• Portrait regeneration with different models
• Each regeneration counts against selected model's monthly limit

### Import and Export
**Exporting Characters**:
• Click "Download JSON" on character cards
• Files contain complete character data including traits and portrait information
• Use for backup, sharing, or moving between devices

**Importing Characters**:
• Use import option in library interface
• Select JSON files from your device
• Characters added to library with all data intact
• Trait data automatically integrated into filtering system

## Interactive Chat System

### Starting Conversations
**Multiple Ways to Begin**:
• Click **"Chat"** button on character cards in library
• Use **"Start Chat"** button in character detail modal
• Navigate directly to `/chat/[characterId]` URL
• Chat links available in enhanced sidebar navigation

**Chat Interface Features**:
• Character portrait and name in compact header
• Model selection dropdown (Standard/Enhanced/Premium)
• Message input with 1000 character limit and counter
• Scrollable conversation history
• Clear chat and retry message options

### How Chat Works
**Character Consistency**:
• AI maintains character personality using all trait data, backstory, and relationships
• Recent conversation context (last 15 messages) provided for continuity
• Responses reflect character occupation, background, and personality traits
• System prompts ensure character stays in character throughout conversation

**Dynamic Response System**:
• Simple greetings: Brief responses (1-2 sentences)
• Casual questions: Moderate responses (2-4 sentences)
• Detailed requests: Fuller responses (1-2 paragraphs)
• Maximum 3 paragraphs to prevent response cutoff

**Model Quality Differences**:
• **Standard**: Basic personality consistency, good for casual conversation
• **Enhanced**: Better character voice and depth, improved context understanding
• **Premium**: Sophisticated personality depth, excellent consistency, nuanced responses

### Conversation Management
**Persistent Storage**:
• All conversations saved locally per character
• History survives browser restarts and device changes
• Maximum 100 messages per session (automatically trimmed)
• Each character maintains separate conversation history

**Usage Integration**:
• Each chat response counts as one generation against text model monthly limit
• Can switch between model tiers mid-conversation
• Usage warnings appear when approaching monthly limits
• Model selection affects response quality

**Chat Best Practices**:
• Start with simple greetings to establish character voice
• Ask about character background and motivations
• Reference character traits in your questions for consistency
• Use higher-tier models for important story moments
• Switch models based on conversation importance

## Portrait Editing

### Accessing Portrait Editing
**Requirements**:
• Character must have an existing portrait
• Only gpt-image-1 (Premium image model) supports full editing
• dall-e-2 and dall-e-3 do not support editing at all

**Edit Interface**:
• Available in character edit pages for compatible characters
• Text area for describing desired changes
• Character counter shows remaining prompt length (varies by model)
• Model compatibility warnings for unsupported models

### Using Portrait Editing
**Writing Effective Edit Prompts**:
• Be specific about changes: "change hair color to blonde", "add glasses"
• Focus on one major change per edit: avoid complex multi-part edits
• Use clear language: "make them smile" rather than "happier expression"
• Examples of successful edits:
  - Color changes: "change shirt to red", "make eyes green"
  - Accessories: "add a hat", "remove glasses", "add armor"
  - Expressions: "make them smile", "give serious expression"

**Edit Process**:
• Enter clear description of desired changes
• Click "Edit Portrait" to start processing
• Editing takes 30-90 seconds
• Results appear when processing completes
• Original portrait preserved until you save changes

**Usage and Limits**:
• Portrait edits count against image model monthly limits
• gpt-image-1 supports up to 32,000 character prompts
• Usage warnings appear when approaching limits
• Failed edits don't count against usage

## Advanced Trait Management

### Additional Traits System
**Trait Display**:
• All additional character traits shown in organized layout
• Consistent Title Case formatting throughout interface
• Editable names and values for custom traits
• Empty state displayed when no additional traits exist

**Adding New Traits**:
• **"Add Generated Trait"**: AI creates contextually appropriate traits
• **Custom Traits**: Manually add trait names and values
• Both options create properly formatted, editable entries
• New traits integrate with existing display and filtering

**Managing Existing Traits**:
• Edit trait names and values in-place
• Individual regenerate buttons for each trait
• Delete unwanted traits
• Multiple trait operations can be performed in sequence

### AI Trait Generation
**How It Works**:
• AI analyzes character personality, background, and occupation
• Generates traits that enhance roleplay and character depth
• Maintains consistency with existing character elements
• Produces appropriately formatted trait entries

**Usage Considerations**:
• Trait generation counts against text model monthly limits
• Generated traits match character context and genre
• Can regenerate individual traits if results don't fit
• Traits integrate with library filtering system

## Tips for Best Results

### Character Creation Strategy
• **Start Simple**: Create basic character, then enhance with editing features
• **Be Specific**: Detailed descriptions produce more tailored characters
• **Use All Content Types**: Quests, dialogue, and items add roleplay depth
• **Plan Model Usage**: Use Standard for testing, Enhanced/Premium for important characters

### Library Organization
• **Consistent Naming**: Use descriptive character names for easy searching
• **Strategic Traits**: Apply relevant traits for better filtering
• **Regular Backups**: Export important characters as JSON files
• **Trait Management**: Use AI generation to add depth to existing characters

### Chat Development
• **Start Conversations Early**: Begin chatting immediately after character creation
• **Explore Backstory**: Ask about character history and motivations
• **Reference Traits**: Mention character occupation and background in conversations
• **Model Strategy**: Use appropriate tiers based on conversation importance

### Portrait Workflow
• **Generate First**: Start with AI portrait generation
• **Edit Incrementally**: Make small adjustments rather than major changes
• **Plan Edits**: Consider what visual elements would enhance your character
• **Use Premium Model**: gpt-image-1 provides best editing results

## Troubleshooting Common Issues

### Character Generation
• **Failed Generation**: Check internet connection and try again
• **Unexpected Results**: Try more specific descriptions or different trait combinations
• **Slow Generation**: Portrait generation can take up to 2 minutes

### Chat Problems
• **Chat Not Loading**: Verify character exists in library and browser supports IndexedDB
• **Messages Not Sending**: Check usage limits and network connection
• **Inconsistent Responses**: Use higher-tier models or add more personality details

### Portrait Issues
• **Edit Button Disabled**: Ensure character has existing portrait and compatible model selected
• **Editing Failed**: Check usage limits, try simpler prompts, verify network connection
• **Poor Results**: Use gpt-image-1 model and more specific edit descriptions

### Library Issues
• **Characters Not Saving**: Check browser storage permissions and available space
• **Search Not Working**: Clear browser cache and refresh page
• **Missing Characters**: Verify IndexedDB isn't corrupted

## Related Documentation

• [Character Examples](/docs/character-examples) - Real examples of generated characters
• [Generation Options](/docs/generation-options) - Detailed customization reference
• [Model Selection Guide](/docs/models) - Complete model information and usage limits
• [Chat with Characters](/docs/chat) - Advanced chat features and strategies