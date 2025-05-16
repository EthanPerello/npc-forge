# Model Selection Guide

NPC Forge offers multiple AI models with different capabilities and usage limits. This guide explains the tiered model system, helps you choose the right models for your needs, and provides tips for optimizing your usage.

## Overview

NPC Forge uses two types of AI models:
- **Text Models**: For generating character attributes, quests, dialogue, and items
- **Image Models**: For creating character portraits

Each type offers three tiers with different quality levels and usage limits.

![Model Selection Interface](/public/images/model-step.png)

## Text Generation Models

### 🟢 Standard Tier: gpt-4o-mini
- **Usage Limit**: Unlimited
- **Best For**: Regular character creation, experimentation, quick generation
- **Quality**: Good baseline quality for most use cases
- **Speed**: Fast generation times
- **Cost**: Most economical option

**When to Use Standard:**
- Creating multiple characters for playtesting
- Generating NPCs for quick encounters
- Experimenting with different character concepts
- Building your initial character library

### 🟡 Enhanced Tier: gpt-4.1-mini
- **Usage Limit**: 30 generations per month
- **Best For**: Important characters requiring higher quality
- **Quality**: Improved detail and narrative consistency
- **Speed**: Moderate generation times
- **Features**: Better personality depth, more creative backstories

**When to Use Enhanced:**
- Creating main story NPCs
- Characters with complex backstories
- Important recurring characters
- When you need more detailed descriptions

### 🔴 Premium Tier: gpt-4o
- **Usage Limit**: 10 generations per month
- **Best For**: Critical characters needing maximum detail
- **Quality**: Highest quality output with rich detail
- **Speed**: Longer generation times
- **Features**: Most sophisticated character development, complex personalities

**When to Use Premium:**
- Primary antagonists or protagonists
- Major campaign characters
- Characters central to your story
- When maximum quality is essential

## Image Generation Models

### 🟢 Standard Tier: DALL-E 2
- **Usage Limit**: Unlimited
- **Resolution**: 1024x1024 pixels
- **Style Adherence**: Good basic portrait generation
- **Best For**: Quick character visualization, concept art

**When to Use DALL-E 2:**
- Creating portraits for all characters in your library
- Generating reference images quickly
- Experimenting with different character appearances
- Building visual character collections

### 🟡 Enhanced Tier: DALL-E 3
- **Usage Limit**: 30 generations per month
- **Resolution**: 1024x1024 pixels
- **Style Adherence**: Improved detail and artistic quality
- **Best For**: Important character portraits, detailed artwork

**When to Use DALL-E 3:**
- Main character portraits
- Characters requiring specific artistic styles
- High-quality images for presentations
- Detailed character visualization

### 🔴 Premium Tier: gpt-image-1
- **Usage Limit**: 10 generations per month
- **Resolution**: High quality with enhanced detail
- **Style Adherence**: Maximum artistic control and quality
- **Best For**: Showcase-quality character art

**When to Use gpt-image-1:**
- Hero characters and main villains
- Professional-quality character art
- Characters for published content
- Maximum artistic fidelity required

## Usage Strategy

### Monthly Planning

**Standard Strategy** (Most Users):
- Use unlimited Standard models for most characters
- Reserve Enhanced tier for 5-10 important characters per month
- Save Premium tier for 2-3 critical characters

**Balanced Strategy** (Regular Users):
- Mix of Standard and Enhanced for variety
- Use Premium sparingly for special occasions
- Monitor usage throughout the month

**Premium Strategy** (Quality-Focused):
- Primarily Enhanced and Premium models
- Standard only for quick concepts
- Careful planning of monthly generation budget

### Model Combination Tips

**Efficient Combinations:**
- Standard Text + Enhanced Image: Good balance of quality and usage
- Enhanced Text + Standard Image: Better descriptions with quick visualization
- Premium Text + Enhanced Image: Maximum character depth with quality portraits

**Cost-Effective Approach:**
- Generate with Standard models first
- Regenerate important characters with higher tiers
- Use Enhanced/Premium selectively for final versions

## Usage Tracking

### Monitoring Your Limits

The interface displays:
- Remaining generations for each model
- Current month's usage
- Most constrained model when multiple are selected
- Warning indicators when approaching limits

### Monthly Reset

All usage limits reset on the 1st of each month at 00:00 UTC.

### Development Mode Override

In development environments, usage limits are bypassed for testing purposes.

## Regeneration with Models

### Selective Regeneration

When editing characters, you can:
- Regenerate individual attributes with different text models
- Update portraits with different image models
- Mix and match models for optimal results

### Regeneration Strategy

1. **Start with Standard**: Generate initial character with unlimited model
2. **Identify Key Areas**: Determine which aspects need improvement
3. **Selective Upgrade**: Regenerate specific elements with higher-tier models
4. **Final Polish**: Use Premium models for critical final touches

## Quality Differences

### Text Model Comparison

**Character Depth:**
- Standard: Basic but functional character profiles
- Enhanced: More nuanced personalities and backstories
- Premium: Rich, complex character development

**Narrative Consistency:**
- Standard: Generally consistent within character
- Enhanced: Better internal logic and coherence
- Premium: Seamless narrative integration

**Creative Details:**
- Standard: Straightforward descriptions
- Enhanced: More creative and interesting details
- Premium: Highly creative and unique elements

### Image Model Comparison

**Visual Quality:**
- DALL-E 2: Clear, recognizable portraits
- DALL-E 3: Enhanced detail and artistic quality
- gpt-image-1: Maximum visual fidelity and style control

**Style Adherence:**
- DALL-E 2: Basic style interpretation
- DALL-E 3: Better understanding of artistic styles
- gpt-image-1: Precise style and mood control

## Best Practices

### Efficient Usage

1. **Plan Your Month**: Identify which characters need higher-tier models
2. **Start Low, Upgrade High**: Generate with Standard, regenerate important parts with Premium
3. **Batch Similar Characters**: Generate related characters together for consistency
4. **Save Premium for Finals**: Use highest tier for completed, final characters

### Quality Optimization

1. **Detailed Descriptions**: Provide rich context regardless of model tier
2. **Specific Traits**: Well-defined characteristics improve output quality
3. **Iterative Improvement**: Use regeneration to refine character elements
4. **Model Matching**: Match model tier to character importance

### Cost Management

1. **Track Usage**: Monitor your monthly consumption regularly
2. **Strategic Saving**: Reserve high-tier models for month-end if needed
3. **Standard First**: Use unlimited Standard models for experimentation
4. **Selective Regeneration**: Only regenerate elements that need improvement

## Troubleshooting

### Model Selection Issues

**Model Not Available:**
- Check if you've reached monthly limit
- Verify model selection in interface
- Try refreshing the page

**Unexpected Quality:**
- Ensure you're using the expected model tier
- Check character description detail
- Try regenerating with more specific traits

**Generation Failures:**
- Higher-tier models may be temporarily unavailable
- Try falling back to lower tier
- Check network connection and retry

## Model Comparison Table

| Aspect | Standard | Enhanced | Premium |
|--------|----------|----------|---------|
| **Text Quality** | Good | Better | Best |
| **Image Quality** | Good | Better | Best |
| **Usage Limit** | Unlimited | 30/month | 10/month |
| **Generation Speed** | Fast | Medium | Slower |
| **Detail Level** | Basic | Enhanced | Maximum |
| **Best Use** | Regular use | Important characters | Critical characters |

## Future Model Updates

NPC Forge regularly evaluates new AI models and may add:
- New model tiers with different capabilities
- Specialized models for specific character types
- Updated models with improved performance
- Regional model availability

Stay updated through:
- Release notes
- Documentation updates
- In-app announcements

## Related Documentation

- [How to Use NPC Forge](/docs/how-to-use) - Complete creation guide
- [Generation Options](/docs/generation-options) - Detailed customization
- [Character Library](/docs/library) - Managing characters and regeneration
- [API Documentation](/docs/api) - Technical model selection details
- [Roadmap](/docs/roadmap) - Future model improvements