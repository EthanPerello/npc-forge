# Model Selection Guide

This is the authoritative reference for AI models, usage limits, and capabilities in NPC Forge. All usage information in other documentation files references this guide.

## Model Overview

NPC Forge uses two types of AI models with three quality tiers each:
• **Text Models**: Generate character attributes, quests, dialogue, items, chat responses, and traits
• **Image Models**: Create and edit character portraits

Each tier offers different quality levels and monthly usage limits, allowing you to balance output quality with available generations.

## Text Generation Models

### 🟢 Standard Tier: gpt-4o-mini
• **Monthly Limit**: 50 generations
• **Reset Date**: 1st of each month
• **Quality**: Good baseline quality suitable for most characters
• **Best For**: 
  - Regular character creation and experimentation
  - Background NPCs and supporting characters
  - Casual chat conversations
  - Frequent trait generation and editing
  - Testing different character concepts

### 🟡 Enhanced Tier: gpt-4.1-mini  
• **Monthly Limit**: 30 generations
• **Reset Date**: 1st of each month
• **Quality**: Improved detail, narrative consistency, and character depth
• **Best For**:
  - Important story characters requiring depth
  - Meaningful chat conversations about plot or relationships
  - Higher quality quest and dialogue generation
  - Characters central to your campaign or story
  - Targeted trait development for key NPCs

### 🔴 Premium Tier: gpt-4o
• **Monthly Limit**: 10 generations  
• **Reset Date**: 1st of each month
• **Quality**: Highest quality output with rich detail and sophisticated personality development
• **Best For**:
  - Critical main characters and primary antagonists
  - Key story moments and dramatic chat conversations
  - Maximum detail character creation
  - Premium trait development for complex personalities
  - Characters requiring nuanced psychological depth

## Image Generation Models

### 🟢 Standard Tier: DALL-E 2
• **Monthly Limit**: 10 generations
• **Reset Date**: 1st of each month
• **Quality**: Good basic portrait generation with clear character representation
• **Portrait Editing**: Not supported - no editing capabilities
• **Best For**:
  - Quick character visualization
  - Background NPCs requiring portraits
  - Testing portrait concepts

### 🟡 Enhanced Tier: DALL-E 3
• **Monthly Limit**: 5 generations
• **Reset Date**: 1st of each month  
• **Quality**: Improved detail, artistic quality, and visual consistency
• **Portrait Editing**: Not supported - no editing capabilities
• **Best For**:
  - Important character portraits requiring quality
  - Characters with complex visual descriptions
  - Final portraits for key NPCs

### 🔴 Premium Tier: gpt-image-1
• **Monthly Limit**: 3 generations
• **Reset Date**: 1st of each month
• **Quality**: Maximum artistic control, detail, and visual fidelity
• **Portrait Editing**: Full editing support with best results
• **Best For**:
  - Showcase-quality character portraits
  - Characters requiring portrait editing capabilities
  - Complex visual concepts needing highest quality
  - Final portraits for main characters

## Portrait Editing Capabilities

### Model Support for Portrait Editing

**gpt-image-1 (Premium) - ONLY MODEL SUPPORTING EDITING**
• **Full editing support** with reliable, high-quality results
• Handles complex edits: color changes, accessories, clothing modifications, expression changes
• **Edit prompt limit**: Up to 32,000 characters for detailed instructions
• **Best quality** editing with consistent results
• **Supports all edit types**: additions, removals, color changes, style modifications

**dall-e-2 (Standard) - NO EDITING SUPPORT**
• **Cannot be used for portrait editing** operations
• Generate-only model for initial portrait creation
• **No modification capabilities** available
• Must regenerate entirely for changes

**dall-e-3 (Enhanced) - NO EDITING SUPPORT**
• **Cannot be used for portrait editing** operations
• Generate-only model for initial portrait creation
• **No modification capabilities** available
• Must regenerate entirely for changes

### Portrait Editing Use Cases

**Successful Edit Types**:
• **Color Modifications**: Hair color, eye color, clothing colors, skin tone adjustments
• **Accessory Management**: Adding/removing hats, glasses, jewelry, weapons, armor
• **Expression Changes**: Smile adjustments, serious expressions, emotional modifications
• **Clothing Updates**: Outfit changes, adding/removing layers, style modifications
• **Detail Enhancement**: Scars, tattoos, facial hair, age modifications

**Edit Prompt Examples**:
```
"change hair color to blonde"
"add round glasses"
"remove the hat"
"make them smile"
"change shirt to red"
"add a beard"
"give them a serious expression"
"add leather armor"
```

## Chat Integration

### How Chat Uses Text Models

Chat conversations utilize the selected text model for generating character responses:
• **Each chat response counts as one generation** against your monthly text model limit
• **Model selection can be changed** during conversations
• **Response quality directly correlates** with selected model tier
• **Character personality consistency** improves with higher tiers

### Chat-Specific Model Performance

**Standard Model (gpt-4o-mini) for Chat**:
• **Response Quality**: Clear, coherent character responses with basic personality consistency
• **Character Voice**: Adequate for general character interactions and world-building
• **Context Understanding**: Good grasp of immediate conversation context
• **Best For**: Daily character interactions, casual conversations, background character dialogue

**Enhanced Model (gpt-4.1-mini) for Chat**:
• **Response Quality**: More nuanced character voice with improved personality depth
• **Character Voice**: Better consistency and understanding of character relationships
• **Context Understanding**: Superior comprehension of character motivations and background
• **Best For**: Important character development conversations, plot discussions, relationship building

**Premium Model (gpt-4o) for Chat**:
• **Response Quality**: Sophisticated character development with excellent personality consistency
• **Character Voice**: Most natural and engaging character interactions
• **Context Understanding**: Deep understanding of character relationships, history, and motivations
• **Best For**: Critical story moments, emotional scenes, main character interactions, complex plot discussions

### Chat Usage Patterns

**Conversation Planning**:
• **Daily Interactions** (Standard): Greetings, small talk, general world-building
• **Character Development** (Enhanced): Exploring backstory, developing relationships, important discussions
• **Key Story Moments** (Premium): Major revelations, emotional scenes, critical decision points

## Trait Management Integration

### Text Models for Trait Generation

**Trait Generation Capabilities**:
• **"Add Generated Trait"** counts as one text generation against monthly limits
• **Individual trait regeneration** counts as one generation per trait
• **Multiple traits generated simultaneously** count as one generation
• **Trait quality** improves with higher model tiers

**Model Performance for Traits**:

**Standard Model**:
• **Quality**: Good basic trait generation appropriate to character context
• **Consistency**: Adequate integration with existing character elements
• **Best For**: Frequent trait additions, experimental character development

**Enhanced Model**: 
• **Quality**: Better trait quality with improved character consistency
• **Consistency**: Superior integration with character personality and background
• **Best For**: Important character trait development, refined character elements

**Premium Model**:
• **Quality**: Highest quality trait generation with nuanced character understanding
• **Consistency**: Excellent contextual appropriateness and character integration
• **Best For**: Critical character traits, complex personality development, main character enhancement

## Usage Tracking and Management

### Monthly Limit System

**Limit Tracking**:
• **Individual tracking** for each model tier (text and image separately)
• **Monthly reset** on the 1st of each month at 00:00 UTC
• **Real-time usage display** in model selection interfaces
• **Warning notifications** when approaching limits

**Usage Calculation**:
• **Character Generation**: Counts against selected text and image models
• **Chat Responses**: Count against selected text model only
• **Portrait Editing**: Counts against selected image model only
• **Trait Operations**: Count against selected text model only
• **Regeneration**: Each operation counts as one generation

**Development Mode**:
• **Usage limits bypassed** in development environment for testing
• **Production deployment** enforces all limits normally
• **Local development** can test all features without limit restrictions

### Strategic Usage Planning

**Efficient Usage Strategies**:

**Model Combination Approaches**:
• **Standard Text + Enhanced Image**: Good balance for most characters
• **Enhanced Text + Standard Image**: Better character depth with basic visualization
• **Premium Text + Premium Image**: Maximum character development with editing capabilities
• **Mixed Regeneration**: Start with Standard, upgrade specific elements with higher tiers

**Monthly Planning**:
• **Early Month**: Experiment with Standard models, create base characters
• **Mid-Month**: Use Enhanced models for important character development
• **End-Month**: Reserve Premium models for critical characters and key moments

**Feature-Specific Strategies**:
• **Character Creation**: Use Standard for testing, Enhanced/Premium for final versions
• **Chat Conversations**: Start with Standard, upgrade for important story moments
• **Portrait Editing**: Plan edits carefully due to limited Premium image generations
• **Trait Management**: Use Standard for frequent additions, Enhanced/Premium for key character traits

## Usage Limit Comparison Table

| Feature | Standard Monthly | Enhanced Monthly | Premium Monthly |
|---------|------------------|------------------|-----------------|
| **Text Model Limit** | 50 generations | 30 generations | 10 generations |
| **Image Model Limit** | 10 generations | 5 generations | 3 generations |
| **Character Creation** | ✅ Unlimited variety | ✅ Better quality | ✅ Highest quality |
| **Chat Conversations** | ✅ Casual interactions | ✅ Character development | ✅ Key story moments |
| **Portrait Editing** | ❌ Not supported | ❌ Not supported | ✅ Full support |
| **Trait Generation** | ✅ Frequent additions | ✅ Quality improvements | ✅ Premium development |
| **Best Use Case** | Regular characters | Important characters | Critical characters |

## Model Selection Recommendations

### For New Users
1. **Start with Standard models** to learn the system and experiment
2. **Create several test characters** to understand quality differences
3. **Try different combinations** of text and image model tiers
4. **Gradually use Enhanced/Premium** for characters you want to keep

### For Regular Users
1. **Use Standard models** for background NPCs and experimentation
2. **Reserve Enhanced models** for important story characters
3. **Save Premium models** for main characters and critical moments
4. **Plan usage around monthly cycles** for optimal distribution

### For Campaign Managers
1. **Standard Tier**: Shopkeepers, guards, random encounters
2. **Enhanced Tier**: Recurring NPCs, faction leaders, important allies
3. **Premium Tier**: Main antagonists, key story characters, party mentors

### For Writers and Content Creators
1. **Standard Tier**: Background characters, world-building NPCs
2. **Enhanced Tier**: Secondary characters, supporting cast
3. **Premium Tier**: Protagonists, primary antagonists, central figures

## Quality Comparison Examples

### Text Generation Quality Differences

**Character Description Generation**:
• **Standard**: "Marcus is a thoughtful monk who values knowledge and questions authority."
• **Enhanced**: "Marcus embodies scholarly curiosity beneath a humble exterior, his gentle demeanor concealing profound theological questions that challenge orthodox doctrine."
• **Premium**: "Brother Marcus moves through the monastery with deliberate quietude, his ink-stained fingers betraying countless hours spent not merely copying sacred texts, but wrestling with their deeper implications—a scholar whose faith is deepened rather than diminished by intellectual honesty."

### Image Generation Quality Differences

**Portrait Generation Results**:
• **Standard (DALL-E 2)**: Clear, recognizable portraits with basic detail and good color accuracy
• **Enhanced (DALL-E 3)**: Improved artistic quality, better lighting, more sophisticated composition and detail
• **Premium (gpt-image-1)**: Maximum visual fidelity, superior artistic control, exceptional detail and style consistency

## Technical Considerations

### Model Performance Characteristics

**Response Time Expectations**:
• **Text Generation**: 10-30 seconds for character content
• **Image Generation**: 30-120 seconds depending on model and complexity
• **Chat Responses**: 5-15 seconds for conversational responses
• **Portrait Editing**: 30-90 seconds for image modifications

**Model Availability**:
• **All models available 24/7** through OpenAI infrastructure
• **Temporary slowdowns possible** during high-demand periods
• **Automatic retry logic** for transient failures
• **Error handling** with user-friendly feedback

### Integration Details

**API Integration**:
• **Server-side processing** for all model interactions
• **Secure API key handling** without client exposure
• **Usage validation** before expensive operations
• **Error categorization** for specific user guidance

## Related Documentation

• [How to Use NPC Forge](/docs/how-to-use) - Complete user guide including model selection
• [Character Examples](/docs/character-examples) - See quality differences across model tiers
• [Generation Options](/docs/generation-options) - Detailed customization options
• [Chat with Characters](/docs/chat) - Chat-specific model usage strategies