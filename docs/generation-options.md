# Character Generation Options

NPC Forge offers extensive customization options through its wizard-based interface. This guide provides a breakdown of all available settings across the four-step creation process, plus the new portrait editing and trait management features.

## Overview

The character creation wizard consists of four steps:

1. **Concept**: Genre selection and character description
2. **Options**: Trait and attribute customization
3. **Model**: AI model selection
4. **Generate**: Character creation and results

## Step 1: Concept

### Genre Selection

Choose from four main genres with specialized sub-genres:

**Fantasy**: High Fantasy, Dark Fantasy, Urban Fantasy, Sword & Sorcery

**Sci-Fi**: Space Opera, Cyberpunk, Post-Apocalyptic, Hard Sci-Fi

**Historical**: Medieval, Ancient Civilizations, Renaissance, Age of Sail

**Contemporary**: Urban Life, Mystery & Thriller, Supernatural, Slice of Life

### Character Description

Free-text description field for character details. More detailed descriptions typically result in more tailored characters that will have richer personalities for chat conversations and better portraits for editing.

> **Chat & Portrait Consideration**: Well-developed character descriptions create more engaging conversational AI personalities and provide better context for portrait generation and editing.

## Step 2: Options

### Character Trait Options

#### Basic Traits

• **Gender**: Male, Female, Nonbinary, Unknown
• **Age Group**: Child, Teen, Adult, Elder
• **Moral Alignment**: Good, Neutral, Evil
• **Relationship to Player**: Ally, Enemy, Neutral, Mentor, Rival, Betrayer

#### Advanced Options

• **Physical Traits**: Height, build, distinctive features
• **Background Elements**: Social class, homeland/origin
• **Occupation**: Searchable dropdown with genre-specific options
• **Personality Traits**: Multi-select system
• **Additional Traits**: AI-generated or custom traits with individual management

### Content Generation Options

#### Quest Options (if enabled)

• **Number of Quests**: 3-7 quests
• **Quest Types**: Main Quest, Side Quest, Fetch Quest, Combat Quest, Social Quest, Exploration Quest, Puzzle/Riddle, Escort Quest, Collection Quest, Mystery Quest
• **Reward Types**: Balanced, Gold & Currency, Items & Equipment, Information & Clues, Relationships & Favors, Experience & Skills

#### Dialogue Options (if enabled)

• **Number of Lines**: 5-15 lines
• **Dialogue Context**: Introduction, Casual Conversation, Giving Quests, Combat/Conflict, Emotional Scenes, Information/Exposition, Bartering/Trading, Farewell/Parting

#### Item Options (if enabled)

• **Number of Items**: 3-10 items
• **Rarity Distribution**: Balanced, Mostly Common, Mostly Uncommon, Include Rare Items, Themed by Character
• **Item Categories**: Weapons, Armor & Clothing, Potions & Consumables, Scrolls & Books, Tools & Utility Items, Jewelry & Accessories, Artifacts & Relics, Food & Drink, Currency & Valuables, Crafting Materials, Technology & Gadgets (Sci-Fi), Magical Items (Fantasy)

## Step 3: Model Selection

### Text Generation Models

| Tier | Model | Monthly Limit | Best For | Chat Quality |
|------|-------|---------------|----------|--------------|
| 🟢 Standard | gpt-4o-mini | 50/month | Regular use | Good for casual conversation |
| 🟡 Enhanced | gpt-4.1-mini | 30/month | Higher quality | Better character consistency |
| 🔴 Premium | gpt-4o | 10/month | Maximum detail | Superior personality depth |

> **Chat Consideration**: Text model selection affects both character generation and chat conversation quality. Higher tiers provide more consistent character personalities in chat.

### Image Generation Models

| Tier | Model | Monthly Limit | Best For | Portrait Editing |
|------|-------|---------------|----------|------------------|
| 🟢 Standard | dall-e-2 | 10/month | Basic portraits | Limited editing support |
| 🟡 Enhanced | dall-e-3 | 5/month | Better quality | Not supported for editing |
| 🔴 Premium | gpt-image-1 | 3/month | Highest quality | Full editing support |

> **Portrait Editing Note**: Only gpt-image-1 provides reliable portrait editing capabilities with consistent results.

### Portrait Customization

#### Art Style

Realistic, Fantasy Art, Anime/Manga, Comic Book, Pixel Art, Oil Painting, Watercolor, 3D Render

#### Expression/Mood

Neutral, Happy/Smiling, Serious, Angry, Sad, Determined, Mysterious, Heroic

#### Framing

Portrait (Head/Shoulders), Bust (Upper Body), Full Body, Action Pose

#### Background

Plain/Solid Color, Gradient, Themed (Based on Character), Environmental, Abstract

## Step 4: Generate

### Character Generation Process

1. Click "Generate Character" to begin
2. AI processes inputs using selected models
3. Character text is generated first, followed by portrait
4. Results are displayed with tabs for different sections
5. **Save to Library** to enable chat functionality and editing features

### Alternative Options

• **Generate Random Character**: Creates character with random traits
• **New Character**: Starts wizard over with fresh options

### Post-Generation Options

After generating a character, you can:

• **Save to Library**: Store character for editing, chat, and portrait editing
• **Start Chatting**: Begin conversations immediately after saving
• **Download JSON**: Export character data
• **Download Portrait**: Save character image

## Portrait Editing Features (NEW in v0.21.0)

### Accessing Portrait Editing

Portrait editing is available after saving characters to your library:

1. Open any character with an existing portrait in edit mode
2. Navigate to the Portrait section
3. Click **Edit Portrait** button
4. Ensure compatible model is selected (gpt-image-1 recommended)

### Portrait Editing Interface

**Edit Prompt Field:**
• Text area for describing desired changes
• Character counter shows remaining characters (varies by model)
• Maximum length: 32,000 characters for gpt-image-1, 1,000 for others

**Model Compatibility:**
• Warning displays for unsupported models
• gpt-image-1 provides best editing results
• dall-e-2 has limited editing capabilities
• dall-e-3 does not support editing

### Writing Effective Edit Prompts

**Color Changes:**
```
"change hair color to blonde"
"make the eyes green"
"change shirt to red"
```

**Adding Accessories:**
```
"add a red hat"
"add glasses"
"add a beard"
"add armor"
```

**Removing Elements:**
```
"remove glasses"
"remove the hat"
"remove facial hair"
```

**Expression Changes:**
```
"make them smile"
"give them a serious expression"
"make them look angry"
```

**Clothing Modifications:**
```
"change shirt to blue"
"add a cloak"
"remove the jacket"
"add medieval armor"
```

### Portrait Editing Best Practices

**Effective Prompts:**
• Be specific about what you want to change
• Use simple, clear language
• Focus on one major change per edit
• Reference colors, objects, and expressions directly

**Model Selection:**
• Use gpt-image-1 for best results
• Test with different models to understand capabilities
• Consider usage limits when choosing models

**Workflow Tips:**
• Start with small changes to test results
• Make incremental edits rather than major overhauls
• Save edited portraits before making additional changes
• Keep original portraits as backup

### Portrait Editing Usage

**Usage Limits:**
• Standard (dall-e-2): 10 edits per month
• Enhanced (dall-e-3): 5 edits per month (not recommended for editing)
• Premium (gpt-image-1): 3 edits per month

**Cost Considerations:**
• Portrait editing counts against image model limits
• Plan edits carefully to maximize monthly usage
• Consider which characters need editing most

## Advanced Trait Management (NEW in v0.21.0)

### Additional Traits System

The Additional Traits section in character editing provides comprehensive trait management:

**Viewing Traits:**
• All additional character traits displayed in organized layout
• Traits shown with consistent Title Case formatting
• Long or sentence-like traits automatically excluded from display
• Category prefixes help organize trait types

**Adding Generated Traits:**
• **"Add Generated Trait"** button generates new AI-powered traits
• Traits generated based on existing character personality and background
• Generated traits automatically formatted and integrated
• Uses selected text model for trait generation

**Individual Trait Regeneration:**
• **Regenerate buttons** next to each trait for individual updates
• Regenerate specific traits without affecting others
• Maintains character consistency while refreshing specific aspects
• Each regeneration counts against text model usage limits

### Trait Management Best Practices

**Generating New Traits:**
• Use higher-tier models for more creative and fitting traits
• Generate traits that complement existing character personality
• Review generated traits and remove any that don't fit
• Balance trait quantity with character focus

**Regenerating Traits:**
• Regenerate traits that seem out of character or repetitive
• Use regeneration to refresh stale or overused traits
• Consider character development when updating traits
• Maintain consistency with core character concept

**Trait Organization:**
• Use trait categories to understand character aspects
• Remove traits that are too long or sentence-like
• Keep trait lists focused and relevant
• Balance different trait types (personality, skills, background)

## Chat Integration

### How Chat Uses Models

When chatting with characters, the **text models** are used to generate responses:
• Each chat response counts as **one generation** against your monthly text model limit
• You can switch between models during conversations
• Higher-tier models provide more consistent character personalities
• Response quality and character voice depth improve with higher tiers

### Chat-Specific Model Considerations

**Standard (gpt-4o-mini):**
• Good for casual conversation and exploration
• Basic character personality consistency
• Suitable for frequent, low-stakes interactions

**Enhanced (gpt-4.1-mini):**
• Better character voice consistency
• More nuanced responses and personality depth
• Good balance of quality and usage limits

**Premium (gpt-4o):**
• Superior character personality depth and consistency
• Complex conversation handling and emotional nuance
• Best for important story moments and character development

## Usage Optimization Strategies

### Efficient Model Usage

**Start Low, Upgrade High:**
• Generate characters with Standard tier
• Use Enhanced/Premium for important regenerations
• Chat with Standard, upgrade for key conversations

**Strategic Feature Usage:**
• Reserve portrait editing for most important characters
• Use trait generation/regeneration judiciously
• Plan character conversations around monthly limits

**Batch Operations:**
• Generate multiple characters when actively creating
• Edit multiple character aspects in single sessions
• Plan character development sessions around usage limits

### Monthly Limit Management

**Track Usage:**
• Monitor usage indicators regularly
• Plan character creation around monthly cycles
• Balance different feature types (text vs. image)

**Prioritize Features:**
• Character generation: High priority
• Chat conversations: Medium priority
• Portrait editing: Use for key characters
• Trait management: Use for character refinement

## Related Documentation

• [How to Use NPC Forge](/docs/how-to-use) - Complete creation and editing guide
• [Chat with Characters](/docs/chat) - Interactive conversation guide
• [Character Library](/docs/library) - Library management and trait systems
• [Model Selection](/docs/models) - Understanding AI model tiers and capabilities
• [Features Overview](/docs/features) - Complete feature list including latest additions