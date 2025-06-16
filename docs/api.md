# API Documentation

This comprehensive technical reference documents NPC Forge's internal API structure for developers who want to understand system functionality or contribute to development.

## API Architecture Overview

NPC Forge uses Next.js 15 API routes for all backend functionality with server-side OpenAI integration:

• **Server-Side Processing**: All AI interactions handled server-side for security
• **RESTful Design**: Standard HTTP methods and response patterns
• **JSON Communication**: Structured request/response format throughout
• **Error Handling**: Comprehensive error categorization and user-friendly messaging
• **Free for End Users**: No API keys or costs required for end users

## Core API Endpoints

### Character Generation API

#### `POST /api/generate`

**Purpose**: Creates new characters based on user specifications with AI generation

**Request Format**:
```typescript
{
  // Required Core Fields
  description: string;                    // Character description (2-500 characters)
  include_quests: boolean;                // Generate quest content
  include_dialogue: boolean;              // Generate dialogue options
  include_items: boolean;                 // Generate item inventory
  include_portrait: boolean;              // Generate character portrait
  
  // Optional Character Configuration
  genre?: string;                         // Selected genre category
  sub_genre?: string;                     // Specific sub-genre template
  gender?: string;                        // Character gender option
  age_group?: string;                     // Age category selection
  moral_alignment?: string;               // Good/Neutral/Evil alignment
  relationship_to_player?: string;        // Ally/Enemy/Neutral/etc.
  
  // Advanced Configuration Objects
  advanced_options?: {
    height?: string;                      // Physical height category
    build?: string;                       // Physical build type
    distinctive_features?: string;        // Special physical characteristics
    social_class?: string;                // Social/economic status
    homeland?: string;                    // Origin/background location
    occupation?: string;                  // Character profession
    personality_traits?: string[];        // Selected personality characteristics
  };
  
  // Content Generation Configuration
  quest_options?: {
    num_quests?: number;                  // Number of quests (3-7)
    quest_types?: string[];               // Types of quests to generate
    reward_types?: string[];              // Types of rewards to include
  };
  
  dialogue_options?: {
    num_lines?: number;                   // Number of dialogue lines (5-15)
    dialogue_contexts?: string[];         // Conversation contexts
  };
  
  item_options?: {
    num_items?: number;                   // Number of items (3-10)
    rarity_distribution?: string;         // Item rarity preferences
    item_categories?: string[];           // Types of items to generate
  };
  
  // Portrait Configuration
  portrait_options?: {
    art_style?: string;                   // Visual art style preference
    expression?: string;                  // Character expression/mood
    framing?: string;                     // Portrait composition type
    background?: string;                  // Background style option
  };
  
  // Model Selection
  text_model?: string;                    // Selected text generation model
  image_model?: string;                   // Selected image generation model
}
```

**Response Formats**:

**Success Response (200 OK)**:
```typescript
{
  character: {
    // Core Identity
    id: string;                           // Unique character identifier
    name: string;                         // Generated character name
    age_group: string;                    // Age category
    gender: string;                       // Character gender
    moral_alignment: string;              // Character alignment
    relationship_to_player: string;       // Player relationship
    
    // Generated Content
    appearance: string;                   // Physical description
    personality: string;                  // Personality overview
    backstory_hook: string;               // Background narrative
    
    // Optional Generated Content
    quests?: Array<{
      title: string;                      // Quest name
      description: string;                // Quest details
      reward: string;                     // Quest completion reward
    }>;
    
    dialogue?: string[];                  // Character dialogue options
    
    items?: Array<{
      name: string;                       // Item name
      description: string;                // Item details
      rarity?: string;                    // Item rarity level
    }>;
    
    // Portrait Data
    portrait?: {
      url: string;                        // Generated image URL
      alt_text: string;                   // Accessibility description
      style: string;                      // Art style used
    };
    
    // Metadata
    created_at: string;                   // Creation timestamp
    generation_models: {
      text_model: string;                 // Model used for text
      image_model?: string;               // Model used for image
    };
    
    // Additional Traits
    additional_traits?: Record<string, string>; // AI-generated character traits
  }
}
```

**Error Response (400/500)**:
```typescript
{
  error: string;                          // Technical error message
  character: null;                        // Null character data
  errorType: string;                      // Error category classification
  userMessage: string;                    // User-friendly error description
  details?: {
    field?: string;                       // Problematic field if validation error
    suggestion?: string;                  // Suggested resolution
  }
}
```

**Error Categories**:
• `validation_error`: Invalid input parameters
• `usage_limit_exceeded`: Monthly generation limits reached
• `api_error`: OpenAI API issues (rate limits, service issues)
• `content_policy_violation`: Generated content blocked by content filters
• `timeout_error`: Generation took too long and timed out
• `network_error`: Connection issues with external services

### Character Regeneration API

#### `POST /api/regenerate`

**Purpose**: Regenerates specific character elements or adds new content to existing characters

**Request Format**:
```typescript
{
  // Required Fields
  character: Character;                   // Complete existing character object
  field: string;                          // Regeneration target specification
  
  // Optional Configuration
  model?: string;                         // Text model for regeneration
  portraitOptions?: {                     // Portrait-specific options
    art_style?: string;
    expression?: string;
    framing?: string;
    background?: string;
  };
  
  // Advanced Options
  regeneration_context?: {
    preserve_relationships?: boolean;     // Maintain character relationships
    maintain_core_identity?: boolean;     // Keep essential character elements
    enhancement_focus?: string;           // Specific improvement area
  };
}
```

**Supported Regeneration Fields**:

**Character Attributes**:
• `name` - Generate new character name
• `appearance` - Regenerate physical description
• `personality` - Create new personality description
• `backstory_hook` - Generate new background narrative

**Portrait Operations**:
• `portrait` - Regenerate character portrait with new settings

**Content Elements**:
• `quest_[index]_title` - Regenerate specific quest title
• `quest_[index]_description` - Regenerate quest description
• `quest_[index]_reward` - Regenerate quest reward
• `quest_[index]` - Regenerate complete quest
• `dialogue_[index]` - Regenerate specific dialogue line
• `item_[index]` - Regenerate specific item

**Trait Management**:
• `additional_traits` - Generate multiple new traits
• `add_single_trait` - Generate one new trait
• `regenerate_trait_[traitKey]` - Regenerate specific existing trait

**Response Format**: Same as generation API, returning updated character object

### Portrait Editing API

#### `POST /api/edit-portrait`

**Purpose**: Edit existing character portraits using AI-powered image modification

**Request Format**:
```typescript
{
  // Required Fields
  character: Character;                   // Character with existing portrait
  editPrompt: string;                     // Natural language edit description
  
  // Optional Configuration
  imageModel?: string;                    // Image model for editing (gpt-image-1 only)
  
  // Advanced Edit Options
  editOptions?: {
    preserve_style?: boolean;             // Maintain original art style
    enhancement_mode?: boolean;           // Focus on improvements vs changes
    iteration_count?: number;             // Number of edit attempts (1-3)
  };
}
```

**Edit Prompt Guidelines**:
• **Maximum Length**: 32,000 characters (gpt-image-1)
• **Effective Prompts**: Clear, specific descriptions of desired changes
• **Supported Edits**: Color changes, accessories, clothing, expressions, backgrounds
• **Edit Examples**:
  - `"change hair color to blonde"`
  - `"add round glasses"`
  - `"remove the hat"`
  - `"make them smile"`
  - `"change shirt to red"`

**Model Support**:
• **gpt-image-1**: Full editing support with high-quality results
• **dall-e-2**: No editing support
• **dall-e-3**: No editing support

**Response Format**:
```typescript
{
  success: boolean;                       // Edit operation success status
  character: Character;                   // Updated character with edited portrait
  editMetadata?: {
    originalPrompt: string;               // Original edit request
    processingTime: number;               // Edit processing duration
    modelUsed: string;                    // AI model used for editing
  };
  error?: string;                         // Error message if edit failed
}
```

### Interactive Chat API

#### `POST /api/chat`

**Purpose**: Generate AI responses for character conversations maintaining personality consistency

**Request Format**:
```typescript
{
  // Required Fields
  characterId: string;                    // Unique character identifier
  character: Character;                   // Complete character object
  messages: ChatMessage[];                // Previous conversation history
  newMessage: string;                     // User's current message (max 1000 chars)
  model: string;                          // Selected AI model for response
  
  // Optional Configuration
  conversationContext?: {
    maxContextMessages?: number;          // Number of previous messages to include (default: 15)
    responseStylePreference?: string;     // Preferred response style or length
    emotionalContext?: string;            // Current conversation emotional state
  };
}
```

**ChatMessage Interface**:
```typescript
{
  id: string;                             // Unique message identifier
  role: 'user' | 'character';             // Message sender type
  content: string;                        // Message text content
  timestamp: string;                      // Message creation time
  characterId: string;                    // Associated character ID
  metadata?: {
    modelUsed?: string;                   // AI model for character responses
    processingTime?: number;              // Response generation time
    tokenCount?: number;                  // Message token usage
  };
}
```

**Response Format**:
```typescript
{
  success: boolean;                       // Response generation success
  message: ChatMessage;                   // Generated character response
  conversationMetadata?: {
    totalMessages: number;                // Total conversation length
    characterConsistencyScore?: number;   // Personality consistency rating
    responseQuality?: string;             // Response quality assessment
  };
  error?: string;                         // Error message if generation failed
}
```

**Character Response Features**:
• **Personality Consistency**: Responses reflect character traits, occupation, and background
• **Dynamic Length**: Response length adapts to conversation context and input complexity
• **Contextual Awareness**: AI uses recent conversation history for coherent responses
• **Character Voice**: Maintains consistent speech patterns and personality throughout

### Image Proxy API

#### `GET /api/proxy-image?url={imageUrl}`

**Purpose**: Proxy external image URLs for CORS compatibility and caching

**Query Parameters**:
• `url` (required): External image URL to proxy

**Response**: Image data with appropriate headers for browser compatibility

**Use Cases**:
• Loading OpenAI-generated portraits from external URLs
• Handling CORS restrictions for image display
• Caching frequently accessed images

## Security and Privacy

### Server-Side Security

**API Security**:
• OpenAI API keys stored securely in environment variables
• Keys never exposed to client-side code
• Server-side validation of all API requests
• Automatic key rotation support for production deployments

**Request Authentication**:
• No user authentication required (free public application)
• Request validation through input sanitization
• Rate limiting through usage tracking
• Content filtering through OpenAI moderation

### Input Validation and Sanitization

**Request Validation**:
• **Character Description**: Length limits (2-500 characters), content filtering
• **Chat Messages**: Maximum 1000 characters, inappropriate content detection
• **Edit Prompts**: Model-specific length limits, content policy compliance
• **File Uploads**: Image format validation, size limits, security scanning

**Data Sanitization**:
• HTML/script tag removal from text inputs
• Special character encoding for safe processing
• JSON structure validation for complex requests
• Binary data validation for image uploads

### Content Moderation

**OpenAI Integration**:
• All generated content subject to OpenAI's content policy
• Automatic content filtering for inappropriate material
• Real-time moderation of user inputs and AI outputs
• Appeals process for false positive content blocks

**Safety Measures**:
• Character generation limited to appropriate content
• Chat conversations monitored for policy compliance
• Portrait generation subject to image content guidelines
• User input preprocessing to prevent policy violations

## Usage Tracking and Limits

### Monthly Limit System

**Limit Structure**:
• **Text Models**: 50 (Standard), 30 (Enhanced), 10 (Premium) generations per month
• **Image Models**: 10 (Standard), 5 (Enhanced), 3 (Premium) generations per month
• **Reset Schedule**: Monthly limits reset on 1st of each month at 00:00 UTC
• **Tracking Granularity**: Individual operation tracking per model type

**Usage Calculation**:
• **Character Generation**: Counts against both text and image models (if portrait included)
• **Regeneration**: Each operation counts as one generation against relevant model
• **Chat Responses**: Count against text model limits only
• **Portrait Editing**: Counts against image model limits only
• **Trait Operations**: Count against text model limits

**Limit Enforcement**:
• Client-side usage tracking with real-time validation
• Server-side verification before expensive operations
• Grace period handling for near-limit situations
• Clear error messaging when limits exceeded

### Development Environment

**Testing Support**:
• Usage limits bypassed in development mode
• Full feature testing without limit restrictions
• Production behavior simulation available
• Comprehensive error testing capabilities

## Error Handling and Recovery

### Error Classification System

**Error Types and Handling**:

**Validation Errors (400)**:
• **Cause**: Invalid input parameters, missing required fields, format violations
• **Response**: Detailed field-specific error messages with correction guidance
• **Recovery**: Client-side validation improvement, user input correction

**Usage Limit Errors (429)**:
• **Cause**: Monthly generation limits exceeded for selected model tier
• **Response**: Clear limit information with reset date and alternative model suggestions
• **Recovery**: Wait for monthly reset, switch to available model tier

**API Integration Errors (502/503)**:
• **Cause**: OpenAI API issues, rate limiting, service unavailability
• **Response**: Automatic retry with exponential backoff, user-friendly status updates
• **Recovery**: Automatic retry logic, temporary feature degradation, status page monitoring

**Content Policy Errors (400)**:
• **Cause**: Generated content blocked by content moderation systems
• **Response**: Policy violation explanation with content modification suggestions
• **Recovery**: Content adjustment, alternative generation approaches

**Timeout Errors (408)**:
• **Cause**: Generation or processing operations exceeding time limits
• **Response**: Timeout notification with retry option and alternative approaches
• **Recovery**: Automatic retry with simplified parameters, alternative model selection

### Automatic Recovery Systems

**Retry Logic**:
• **Exponential Backoff**: Progressive delay increase for repeated failures
• **Circuit Breaker**: Temporary service degradation during widespread issues
• **Graceful Degradation**: Feature-specific fallbacks during partial service failures
• **User Communication**: Clear status updates during recovery operations

**Data Recovery**:
• **Partial Success Handling**: Save successful elements even if some operations fail
• **Transaction Rollback**: Revert incomplete operations to maintain data consistency
• **Cache Recovery**: Restore from cached data during temporary service issues
• **Manual Recovery**: User-initiated retry options for failed operations

## Performance Optimization

### Response Time Optimization

**API Performance Targets**:
• **Character Generation**: 10-30 seconds (text), 30-120 seconds (with portrait)
• **Chat Responses**: 5-15 seconds per message
• **Portrait Editing**: 30-90 seconds depending on complexity
• **Regeneration**: 5-20 seconds per element

**Optimization Strategies**:
• **Parallel Processing**: Simultaneous generation of independent elements
• **Caching**: Frequent data caching for improved response times
• **Request Optimization**: Efficient API call structuring and batching
• **Resource Management**: Optimal server resource allocation

### Scalability Considerations

**Architecture Scalability**:
• **Serverless Functions**: Next.js API routes with automatic scaling
• **Stateless Design**: No server-side session management
• **Database Optimization**: Efficient client-side storage with IndexedDB
• **CDN Integration**: Static asset optimization and global distribution

## Development Integration

### Testing API Endpoints

**Local Development**:
• Full API functionality available in development environment
• Environment variable configuration for API keys (developers only)
• Comprehensive error simulation for testing
• Debug mode with detailed logging and response inspection

**API Testing Tools**:
• **Curl Examples**: Command-line testing scripts for all endpoints
• **Postman Collection**: Pre-configured API testing collection
• **Integration Tests**: Automated testing suite for API functionality
• **Load Testing**: Performance testing tools and benchmarks

### Contributing to API Development

**Development Guidelines**:
• Follow existing API patterns and response formats
• Implement comprehensive error handling and validation
• Add appropriate documentation for new endpoints
• Include test coverage for new functionality

**Code Standards**:
• TypeScript interfaces for all request/response formats
• Consistent error handling patterns across endpoints
• Input validation and sanitization for security
• Performance monitoring and optimization

## Related Documentation

• [Architecture Overview](/docs/architecture) - High-level system design and API integration
• [Security Documentation](/docs/security) - Detailed security measures and best practices
• [Development Setup](/docs/dev-setup) - Local development environment configuration