# Model Selection Guide

NPC Forge offers multiple AI models with different capabilities and usage limits. This guide explains the tiered model system and helps you choose the right models for your needs.

## Overview

NPC Forge uses two types of AI models:
• **Text Models**: For generating character attributes, quests, dialogue, items, **chat conversations**, and **trait generation**
• **Image Models**: For creating character portraits and **portrait editing**

Each type offers three tiers with different quality levels and monthly usage limits.

## Text Generation Models

### 🟢 Standard Tier: gpt-4o-mini

• **Monthly Limit**: 50 generations
• **Best For**: Regular character creation, casual conversations, experimentation, frequent trait generation
• **Quality**: Good baseline quality for most use cases
• **Chat Usage**: Suitable for everyday character interactions
• **Trait Generation**: Good for basic trait creation and regeneration

### 🟡 Enhanced Tier: gpt-4.1-mini

• **Monthly Limit**: 30 generations
• **Best For**: Important characters, meaningful conversations, higher quality content, targeted trait development
• **Quality**: Improved detail and narrative consistency
• **Chat Usage**: Better character voice consistency and depth
• **Trait Generation**: More sophisticated and character-appropriate traits

### 🔴 Premium Tier: gpt-4o

• **Monthly Limit**: 10 generations
• **Best For**: Critical characters, key story moments, maximum detail, premium trait development
• **Quality**: Highest quality output with rich detail
• **Chat Usage**: Most consistent character personality and sophisticated responses
• **Trait Generation**: Most nuanced and contextually appropriate traits

## Image Generation Models

### 🟢 Standard Tier: DALL-E 2

• **Monthly Limit**: 10 generations
• **Quality**: Good basic portrait generation
• **Best For**: Quick character visualization
• **Portrait Editing**: Limited editing capabilities, basic modifications only

### 🟡 Enhanced Tier: DALL-E 3

• **Monthly Limit**: 5 generations
• **Quality**: Improved detail and artistic quality
• **Best For**: Important character portraits
• **Portrait Editing**: Not supported for editing operations

### 🔴 Premium Tier: gpt-image-1

• **Monthly Limit**: 3 generations
• **Quality**: Maximum artistic control and quality
• **Best For**: Showcase-quality character art, characters requiring portrait editing
• **Portrait Editing**: Full editing support with best results

## Portrait Editing Capabilities

### Model Support for Portrait Editing

**gpt-image-1 (Premium) - RECOMMENDED**
• Full editing support with reliable results
• Handles complex edits (color changes, accessories, clothing, expressions)
• Best quality and most consistent editing results
• Support for detailed edit prompts up to 32,000 characters

**dall-e-2 (Standard) - LIMITED**
• Basic editing capabilities
• Simple modifications may work
• Inconsistent results and quality
• Limited prompt support (1,000 characters)

**dall-e-3 (Enhanced) - NOT SUPPORTED**
• No editing capabilities available
• Cannot be used for portrait modifications
• Generate-only model for initial portraits

### Portrait Editing Use Cases

**Color Modifications:**
• Hair color changes
• Eye color adjustments  
• Clothing color updates
• Skin tone adjustments

**Accessory Management:**
• Adding hats, glasses, jewelry
• Removing unwanted accessories
• Facial hair modifications
• Armor and equipment additions

**Expression Changes:**
• Smile adjustments
• Serious or angry expressions
• Emotional state modifications
• Subtle facial feature changes

**Clothing Updates:**
• Shirt and outfit changes
• Adding or removing layers
• Style modifications
• Period-appropriate clothing

## Chat Integration

### How Chat Uses Models

When chatting with characters, the **text models** are used to generate responses:
• Each chat response counts as **one generation** against your monthly text model limit
• You can switch between models during conversations
• Higher-tier models provide more consistent character personalities
• Response quality and character voice depth improve with higher tiers

### Chat-Specific Model Considerations

**Standard Model for Chat:**
• Good for casual conversations and everyday interactions
• Suitable for background characters and quick exchanges
• Most efficient use of monthly limits

**Enhanced Model for Chat:**
• Better for important character development conversations
• More consistent character voice and personality
• Improved understanding of character context and traits

**Premium Model for Chat:**
• Best for critical story moments and main character interactions
• Highest quality character voice and personality consistency
• Most sophisticated understanding of character relationships and background

## Trait Generation Integration

### Text Models for Trait Generation

**Standard Model (gpt-4o-mini):**
• Good for basic trait generation and regeneration
• Suitable for frequent trait additions
• Adequate quality for most trait needs

**Enhanced Model (gpt-4.1-mini):**
• Better trait quality and character consistency
• More sophisticated trait selection
• Improved integration with existing character elements

**Premium Model (gpt-4o):**
• Highest quality trait generation
• Most contextually appropriate traits
• Best understanding of character nuance and depth

### Trait Generation Usage

• **Add Generated Trait**: Counts as one text generation
• **Regenerate Individual Traits**: Each regeneration counts as one text generation  
• **Multiple Trait Generation**: Generating several traits at once counts as one generation
• **Model Selection**: Choose appropriate tier based on character importance

## Usage Strategy

### Monthly Planning

**Recommended Strategy**:
• Use Standard models for most characters and casual chat
• Reserve Enhanced tier for important characters and meaningful conversations
• Save Premium tier for critical main characters and key story interactions
• Plan portrait editing carefully with gpt-image-1's limited monthly quota

### Model Combination Tips

**Efficient Combinations**:
• Standard Text + Enhanced Image: Good balance for most characters
• Enhanced Text + Standard Image: Better character depth with quick visualization
• Premium Text + Premium Image: Maximum character development with editing capabilities

**Chat-Focused Strategy**:
• Start conversations with Standard model to establish character voice
• Switch to Enhanced/Premium for important character development moments
• Use Premium sparingly for crucial story revelations or emotional scenes

**Portrait Editing Strategy**:
• Generate initial portraits with dall-e-3 for quality
• Reserve gpt-image-1 for characters needing editing
• Plan edits carefully due to low monthly limits
• Use editing for refinements rather than complete redesigns

## Usage Tracking

### Monthly Limits

Each model tier has individual monthly limits:
• Limits reset on the 1st of each month
• Tracking is per device/browser
• Development mode bypasses limits for testing
• **Chat conversations count against text model limits**
• **Portrait editing counts against image model limits**
• **Trait generation counts against text model limits**

### Limit Display

The interface shows:
• Remaining generations for each model
• Current month's usage
• Warning when approaching limits
• Chat usage integration with text model tracking
• Portrait editing integration with image model tracking

## Regeneration with Models

When editing characters, you can:
• Regenerate individual attributes with different text models
• Update portraits with different image models
• Edit portraits using text prompts with compatible image models
• Generate new traits with selected text models
• Mix and match models for optimal results

### Regeneration Strategy

1. **Start with Standard**: Generate initial character
2. **Identify Key Areas**: Determine which aspects need improvement
3. **Selective Upgrade**: Regenerate specific elements with higher-tier models
4. **Portrait Enhancement**: Use gpt-image-1 for portrait editing when needed
5. **Final Polish**: Use Premium models for critical final touches

## Chat Usage Patterns

### Conversation Planning

**Daily Interactions** (Standard Model):
• Casual greetings and small talk
• Basic character interactions
• General world-building conversations

**Character Development** (Enhanced Model):
• Exploring character backstory and motivations
• Developing character relationships
• Important plot-related discussions

**Key Story Moments** (Premium Model):
• Major character revelations
• Emotional or dramatic scenes
• Critical decision points in your story

### Response Quality Differences

**Standard Model Chat Responses:**
• Clear, coherent character responses
• Basic personality consistency
• Good for general interactions

**Enhanced Model Chat Responses:**
• More nuanced character voice
• Better personality depth and consistency
• Improved understanding of character context

**Premium Model Chat Responses:**
• Sophisticated character development
• Excellent personality consistency
• Deep understanding of character relationships and background
• Most natural and engaging conversations

## Portrait Editing Workflow

### Planning Portrait Edits

**Before Editing:**
1. **Assess Current Portrait**: Identify specific improvements needed
2. **Choose Model**: Ensure gpt-image-1 is selected for best results
3. **Plan Edits**: Write clear, specific edit prompts
4. **Check Limits**: Verify monthly image model usage

**During Editing:**
1. **Start Simple**: Begin with basic modifications
2. **Be Specific**: Use clear, descriptive edit prompts
3. **Test Incrementally**: Make one change at a time
4. **Review Results**: Evaluate each edit before proceeding

**After Editing:**
1. **Save Changes**: Preserve edited portraits immediately
2. **Document Edits**: Note successful edit prompts for future reference
3. **Plan Future Edits**: Consider additional improvements needed

## Quality Differences

### Text Model Comparison

• **Standard**: Basic but functional character profiles, conversations, and traits
• **Enhanced**: More nuanced personalities, backstories, chat responses, and sophisticated traits
• **Premium**: Rich, complex character development, sophisticated conversations, and highly contextual traits

### Image Model Comparison

• **DALL-E 2**: Clear, recognizable portraits with basic editing capabilities
• **DALL-E 3**: Enhanced detail and artistic quality (no editing support)
• **gpt-image-1**: Maximum visual fidelity, style control, and full editing capabilities

### Portrait Editing Quality

• **dall-e-2**: Basic edits may work but results are inconsistent
• **dall-e-3**: No editing capabilities available
• **gpt-image-1**: Professional-quality editing with reliable results

## Best Practices

### Efficient Usage

1. **Plan Your Month**: Identify which characters need higher-tier models
2. **Start Low, Upgrade High**: Generate with Standard, regenerate important parts with Premium
3. **Monitor Usage**: Track your monthly consumption across all features
4. **Strategic Chat**: Use appropriate model tiers based on conversation importance
5. **Smart Portrait Editing**: Reserve gpt-image-1 for characters that truly need editing

### Chat-Specific Tips

1. **Model Switching**: Change models during conversations based on the importance of the interaction
2. **Character Voice**: Higher-tier models maintain more consistent character personalities
3. **Context Awareness**: Premium models better understand character relationships and background
4. **Conversation Flow**: Start with Standard to establish baseline, upgrade for key moments

### Portrait Editing Best Practices

1. **Model Selection**: Use gpt-image-1 for all portrait editing needs
2. **Clear Prompts**: Write specific, detailed edit descriptions
3. **Incremental Changes**: Make small adjustments rather than major overhauls
4. **Plan Carefully**: Consider edit needs during initial portrait generation
5. **Save Originals**: Keep copies of original portraits before editing

### Trait Management Tips

1. **Appropriate Models**: Match trait generation model to character importance
2. **Batch Generation**: Generate multiple traits at once when possible
3. **Strategic Regeneration**: Use higher-tier models for key character traits
4. **Consistent Quality**: Use same model tier for related characters

## Model Comparison Table

| Aspect | Standard | Enhanced | Premium |
|--------|----------|----------|---------|
| **Text Monthly Limit** | 50 | 30 | 10 |
| **Image Monthly Limit** | 10 | 5 | 3 |
| **Text Quality** | Good | Better | Best |
| **Image Quality** | Good | Better | Best |
| **Chat Personality** | Basic | Consistent | Sophisticated |
| **Portrait Editing** | Limited | Not Supported | Full Support |
| **Trait Generation** | Basic | Enhanced | Premium |
| **Best Use** | Regular characters | Important characters | Critical characters |

## Related Documentation

• [How to Use NPC Forge](/docs/how-to-use) - Complete creation, chat, and editing guide
• [Chat with Characters](/docs/chat) - Detailed conversation guide
• [Generation Options](/docs/generation-options) - Detailed customization including portrait editing
• [Character Library](/docs/library) - Managing characters, traits, and conversations
• [Features Overview](/docs/features) - Complete feature list including portrait editing