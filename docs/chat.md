# Chat with Characters

![Chat Interface](/images/chat-page.png)

NPC Forge's interactive chat feature allows you to have real-time conversations with your generated characters. The AI maintains character personality, backstory, and traits during conversations for authentic interactions.

## Overview

The chat system provides:

• Real-time messaging with your characters
• Character-aware AI responses that maintain personality and backstory
• Persistent conversation history stored locally using IndexedDB
• Dynamic response lengths based on conversation context
• Integrated access from character library and cards
• Usage tracking against your selected text model tier

## Getting Started

### Starting a Chat

There are multiple ways to begin a conversation with a character:

1. **From Character Cards**: Click the **Chat** button on any character card in your library
2. **From Character Library Modal**: Open a character's details and click **Start Chat**
3. **Direct Navigation**: Use the enhanced sidebar navigation (NEW in v0.22.0)
4. **Direct URL Access**: Navigate to `/chat/[characterId]` for any saved character

![Character Library with Chat Buttons](/images/character-library.png)

### Chat Interface

The chat interface includes:

• **Compact Header**: Shows character name, portrait, message count, and navigation
• **Model Selection**: Dropdown to choose AI model (Standard/Enhanced/Premium)
• **Message History**: Scrollable conversation with user and character messages
• **Input Area**: Text field with character counter and send button
• **Chat Controls**: Clear chat and retry message options

## How Chat Works

### Character Consistency

The AI maintains character consistency through system prompts that include:

• Character name, appearance, personality, and backstory
• All selected and generated character traits
• Instructions to stay in character and respond naturally
• Context about character relationships and motivations

### Dynamic Response Lengths

Response lengths automatically adjust based on your input:

• **Simple greetings** ("Hi", "Hello"): Brief responses (1-2 sentences)
• **Casual questions**: Moderate responses (2-4 sentences)
• **Detailed requests** (backstory, explanations): Fuller responses (1-2 paragraphs)
• **Maximum limit**: Never exceeds 3 paragraphs to prevent cutoff

The system analyzes your message length and keywords to determine appropriate response scope.

### Smart Response Handling

• Responses that appear cut off are automatically retried with higher token limits
• Messages are checked for proper sentence completion
• Character-appropriate dialogue tone and style are maintained
• Temperature set to 0.8 for natural, varied responses

## Conversation Storage

### IndexedDB Storage System

Each character maintains their own conversation sessions:

• **Persistent Storage**: Conversations survive browser restarts
• **Per-Character Sessions**: Each character has separate conversation history
• **Message Limits**: Maximum 100 messages per session (automatically trimmed)
• **Local Only**: All data stored in your browser, never transmitted to servers

### Session Management

• **System Messages**: Character context maintained throughout conversations
• **Message Threading**: Recent message context (last 15 messages) sent to AI
• **Auto-Save**: Messages automatically saved as you chat
• **Clear Functionality**: Option to clear conversation history per character

### Data Privacy

All conversations are stored locally in your browser using IndexedDB. No conversation data is transmitted to or stored on external servers. You have complete control over your chat history, and conversations can be cleared at any time.

## Usage Limits and Tracking

### Model Selection for Chat

Chat responses use your selected text generation model:

| Tier | Model | Monthly Limit |
|------|-------|---------------|
| 🟢 Standard | gpt-4o-mini | 50 generations |
| 🟡 Enhanced | gpt-4.1-mini | 30 generations |
| 🔴 Premium | gpt-4o | 10 generations |

> **Note**: Chat conversations count against text model limits

### Usage Tracking

• Each chat message response counts as one generation against your monthly limit
• Usage limits are checked before sending messages to the API
• Usage is incremented only after successful AI responses
• Model selection can be changed during conversations
• Interface shows character count (max 1000 characters per message)

## Chat Features

### Message Management

• **Real-time Messaging**: Instant message sending and receiving
• **Loading Indicators**: Visual feedback while character is "thinking"
• **Message Timestamps**: Time stamps for all messages
• **Error Handling**: Retry options for failed messages
• **Message Length Limits**: 1000 character limit per message with counter

### Interface Features

• **Responsive Design**: Optimized for desktop and mobile devices
• **Compact Layout**: Maximizes space for conversation
• **Portrait Display**: Character portraits in header and messages
• **Keyboard Shortcuts**: Enter to send, Shift+Enter for line breaks
• **Auto-scroll**: Automatically scrolls to newest messages

### Error Handling

The chat system handles various error types:

• **Rate Limits**: Automatic retry suggestions for temporary limits
• **Usage Quotas**: Clear messaging when monthly limits are reached
• **Network Issues**: Retry options for connection problems
• **Content Policy**: Graceful handling of content policy violations

## Enhanced Navigation (v0.22.0)

### Improved Chat Access

• **Integrated Sidebar**: Enhanced navigation includes direct "Chat with Characters" link
• **Better Organization**: Cleaner layout and improved user flow throughout the application
• **Dynamic Transitions**: Improved navigation between chat and other features

### Chat Integration

• **Seamless Library Integration**: Easy switching between library browsing and chatting
• **Enhanced User Flow**: Better transitions from character creation to chat
• **Improved Visual Feedback**: Consistent iconography and loading states

## Advanced Features

### Conversation Context

• **Character Memory**: AI maintains awareness of character traits throughout conversation
• **Recent Context**: Last 15 messages provided to AI for context
• **System Prompts**: Character details automatically included in every response
• **Trait Integration**: Character occupation, personality, and background inform responses

### Technical Implementation

• **API Integration**: `/api/chat` endpoint handles character conversations
• **IndexedDB Storage**: Robust local storage with error recovery
• **State Management**: React context for chat state management
• **Model Flexibility**: Support for switching between AI models mid-conversation

## Troubleshooting

### Common Issues

**Chat not loading:**
• Check that the character exists in your library
• Refresh the page if the character data fails to load
• Verify browser supports IndexedDB

**Messages not sending:**
• Check your monthly usage limits for the selected model
• Verify message is under 1000 characters
• Check internet connection

**Character responses seem inconsistent:**
• Character context is maintained through system prompts
• Recent conversation history provides context
• Try using higher-tier models for more consistent responses

### Performance Tips

• **Model Selection**: Use Standard tier for casual conversations, Enhanced/Premium for important interactions
• **Message Length**: Longer, detailed questions get more comprehensive responses
• **Context Clarity**: Reference previous conversation topics for better continuity

## Best Practices

### Effective Chat Usage

**Starting Conversations:**
• Begin with simple greetings to establish character voice
• Ask about character background and motivations
• Reference character traits in your questions

**Developing Characters:**
• Use conversations to explore character depth
• Ask about relationships and past experiences
• Test character responses to different situations

**Managing Conversations:**
• Use higher-tier models for important story moments
• Switch models based on conversation importance
• Clear chat history when starting new story arcs

### Model Selection Strategy

**Standard Model Usage:**
• Daily character interactions
• Casual conversations and world-building
• Background character interactions

**Enhanced Model Usage:**
• Important character development
• Exploring character relationships
• Plot-relevant discussions

**Premium Model Usage:**
• Critical story moments
• Emotional scenes and revelations
• Main character interactions

### Character Development Through Chat

**Exploration Techniques:**
• Ask about character fears and motivations
• Explore character relationships and history
• Test character reactions to hypothetical situations

**Character Consistency:**
• Reference established character traits
• Maintain conversation continuity
• Use character-appropriate language and topics

**Story Integration:**
• Use conversations to develop plot elements
• Explore character connections to your world
• Document important revelations for future reference

## Integration with Other Features

### Character Library Integration

• **Direct Access**: Chat buttons on all character cards
• **Modal Integration**: Start chat from character details modal
• **Seamless Navigation**: Easy switching between library and chat

### Character Editing Integration

• **Trait Development**: Use chat insights to develop character traits
• **Portrait Context**: Character conversations can inform portrait editing
• **Character Refinement**: Edit characters based on chat interactions

### Character Generation Integration

• **Immediate Chat**: Start conversations right after character creation
• **Character Testing**: Use chat to verify character personality
• **Quick Development**: Develop characters through conversation

## Related Documentation

• [How to Use NPC Forge](/docs/how-to-use) - Complete creation and library guide
• [Character Library Guide](/docs/library) - Managing your character collection
• [Model Selection Guide](/docs/models) - Understanding AI model differences
• [Features Overview](/docs/features) - Complete feature list
• [API Documentation](/docs/api) - Technical implementation details