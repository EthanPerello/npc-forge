# Architecture Overview

This document provides a comprehensive overview of NPC Forge's system architecture, technical components, and design decisions for developers and contributors.

## System Architecture Overview

NPC Forge is built as a modern web application using Next.js 15 with a client-side focus and serverless backend integration:

• **Frontend Architecture**: React-based client application with local data storage
• **Backend Architecture**: Next.js API routes providing serverless functions
• **AI Integration**: Server-side OpenAI API communication for security and performance
• **Data Storage**: Client-side IndexedDB for privacy and offline capability
• **Deployment Model**: Static generation with serverless function deployment

### High-Level Architecture Diagram

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│                 │    │                  │    │                 │
│   React Client  │◄──►│  Next.js API     │◄──►│   OpenAI API    │
│                 │    │  Routes          │    │                 │
│                 │    │                  │    │                 │
└─────────┬───────┘    └──────────────────┘    └─────────────────┘
          │
          ▼
┌─────────────────┐
│                 │
│   IndexedDB     │
│   Local Storage │
│                 │
└─────────────────┘
```

## Frontend Architecture

### React Application Structure

**Component Hierarchy**:
```
App (layout.tsx)
├── Character Wizard (character-wizard.tsx)
│   ├── Concept Step (concept-step.tsx)
│   ├── Options Step (options-step.tsx)
│   ├── Model Step (model-step.tsx)
│   └── Results Step (results-step.tsx)
├── Character Library (library/page.tsx)
│   ├── Character Cards (character-card.tsx)
│   ├── Filter Panel (filter-panel.tsx)
│   └── Character Modal (character-viewer-modal.tsx)
├── Character Edit (library/edit/[id]/page.tsx)
│   ├── Portrait Section (portrait-section.tsx)
│   ├── Traits Section (additional-traits-section.tsx)
│   ├── Quests Section (quests-section.tsx)
│   └── Other Edit Sections
├── Chat Interface (chat/[characterId]/page.tsx)
└── Documentation (docs/*)
```

**State Management Architecture**:
• **React Context**: Global state for character data, chat sessions, and theme
• **Local Component State**: Form inputs, UI state, temporary data
• **Persistent Storage**: IndexedDB for character library and conversation history
• **URL State**: Navigation state and deep linking support

### Key React Contexts

**CharacterContext**:
```typescript
interface CharacterContextType {
  currentCharacter: Character | null;
  setCurrentCharacter: (character: Character) => void;
  savedCharacters: Character[];
  saveCharacter: (character: Character) => Promise<void>;
  deleteCharacter: (id: string) => Promise<void>;
  updateCharacter: (id: string, updates: Partial<Character>) => Promise<void>;
}
```

**ChatContext**:
```typescript
interface ChatContextType {
  conversations: Record<string, ChatMessage[]>;
  sendMessage: (characterId: string, message: string, model: string) => Promise<void>;
  clearConversation: (characterId: string) => void;
  getConversation: (characterId: string) => ChatMessage[];
}
```

**ThemeContext**:
```typescript
interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  systemPreference: 'light' | 'dark';
}
```

### Component Design Patterns

**Wizard Pattern**:
• Step-based navigation with progress tracking
• State preservation across navigation
• Validation at each step boundary
• Flexible navigation allowing step jumping

**Modal Pattern**:
• Character detail viewing with overlay interface
• Action buttons for character operations
• Responsive design for mobile and desktop
• Keyboard navigation and accessibility support

**Edit Pattern**:
• In-place editing with validation
• Regeneration controls with loading states
• Unsaved changes detection and warnings
• Model selection for quality control

## Backend Architecture

### Next.js API Routes

**API Route Structure**:
```
/api
├── /generate (POST)          # Character generation
├── /regenerate (POST)        # Character element regeneration
├── /chat (POST)              # Chat message processing
├── /edit-portrait (POST)     # Portrait editing
└── /proxy-image (GET)        # Image proxy for CORS
```

**Serverless Function Design**:
• **Stateless Functions**: No server-side session management
• **Environment Isolation**: Secure API key handling
• **Error Handling**: Comprehensive error categorization and logging
• **Performance Optimization**: Efficient OpenAI API integration

### OpenAI API Integration

**Model Integration Architecture**:
```typescript
interface ModelConfiguration {
  textModels: {
    standard: 'gpt-4o-mini';
    enhanced: 'gpt-4.1-mini';
    premium: 'gpt-4o';
  };
  imageModels: {
    standard: 'dall-e-2';
    enhanced: 'dall-e-3';
    premium: 'gpt-image-1';
  };
}
```

**Request Processing Flow**:
1. **Input Validation**: Sanitize and validate all user inputs
2. **Usage Verification**: Check monthly limits and model availability
3. **Prompt Construction**: Build model-specific prompts with character context
4. **AI Processing**: Send requests to OpenAI with error handling and retries
5. **Response Processing**: Parse and validate AI responses
6. **Data Formatting**: Structure response data for client consumption

**Security Measures**:
• **API Key Protection**: Server-side storage with environment variable isolation
• **Input Sanitization**: Comprehensive cleaning of user inputs
• **Content Filtering**: OpenAI moderation integration
• **Rate Limiting**: Usage tracking and enforcement

## Data Storage Architecture

### IndexedDB Implementation

**Database Structure**:
```typescript
interface NPCForgeDatabase {
  characters: {
    key: string;              // Character ID
    value: Character;         // Complete character data
    indexes: {
      'by-name': string;      // Character name index
      'by-genre': string;     // Genre filtering
      'by-traits': string[];  // Trait-based filtering
    };
  };
  
  conversations: {
    key: string;              // Conversation ID
    value: ChatMessage[];     // Message history
    indexes: {
      'by-character': string; // Character ID index
      'by-timestamp': number; // Temporal ordering
    };
  };
  
  portraits: {
    key: string;              // Portrait ID
    value: Blob;              // Compressed image data
    indexes: {
      'by-character': string; // Character association
    };
  };
}
```

**Storage Optimization**:
• **Image Compression**: Automatic portrait compression for storage efficiency
• **Incremental Updates**: Partial character updates without full data rewrite
• **Garbage Collection**: Automatic cleanup of orphaned data
• **Index Maintenance**: Real-time search index updates

### Data Consistency and Recovery

**Consistency Measures**:
• **Atomic Operations**: Database transactions for data integrity
• **Validation**: Schema validation for all stored data
• **Backup Systems**: Automatic data backup during critical operations
• **Conflict Resolution**: Handling of concurrent data modifications

**Recovery Systems**:
• **Database Recovery**: Automatic database recreation after corruption
• **Data Migration**: Version-compatible data format evolution
• **Error Handling**: Graceful degradation during storage failures
• **Manual Recovery**: User-initiated data recovery options

## Frontend Data Flow

### Character Creation Flow

```
User Input → Wizard Steps → Validation → API Request → AI Processing → Response Handling → Storage → UI Update
```

**Detailed Flow**:
1. **User Input Collection**: Wizard interface captures user preferences
2. **Client-Side Validation**: Input validation and sanitization
3. **API Request Construction**: Format data for backend processing
4. **Server Processing**: AI generation through OpenAI integration
5. **Response Handling**: Parse and validate AI-generated content
6. **Local Storage**: Save character data to IndexedDB
7. **UI Updates**: Display results and update application state

### Chat System Data Flow

```
User Message → Context Loading → API Request → AI Response → Storage → UI Update → Context Update
```

**Chat Processing**:
1. **Message Input**: User types message with character limit validation
2. **Context Loading**: Retrieve character data and conversation history
3. **Request Preparation**: Format chat request with character context
4. **AI Processing**: Generate character response maintaining personality
5. **Response Storage**: Save conversation to local storage
6. **UI Update**: Display new messages and update conversation state

### Character Editing Flow

```
Edit Action → Data Loading → Modification → Validation → API Request (optional) → Storage → UI Update
```

**Edit Processing**:
1. **Data Loading**: Load complete character data for editing
2. **Modification Interface**: Present editable character elements
3. **Change Detection**: Track modifications and validate inputs
4. **Regeneration (Optional)**: AI-powered content regeneration
5. **Data Storage**: Save changes to IndexedDB
6. **UI Synchronization**: Update all UI elements reflecting changes

## Security Architecture

### Client-Side Security

**Input Security**:
• **XSS Prevention**: React's built-in XSS protection and content sanitization
• **Content Validation**: Client-side validation with server-side verification
• **Safe Rendering**: Controlled rendering of user-generated content
• **Input Sanitization**: Cleaning of all text inputs before processing

**Data Security**:
• **Local Storage Only**: No transmission of sensitive data to external servers
• **Encryption**: Browser-provided encryption for IndexedDB storage
• **Access Control**: Origin-based access control for storage
• **Privacy Protection**: No tracking or analytics collection

### Server-Side Security

**API Security**:
• **Environment Variables**: Secure API key storage and access
• **Request Validation**: Comprehensive input validation and sanitization
• **Error Handling**: Secure error responses without information leakage
• **Rate Limiting**: Usage-based request limiting and throttling

**Content Security**:
• **Content Moderation**: OpenAI content policy enforcement
• **Prompt Engineering**: Safe prompt construction preventing injection
• **Response Filtering**: Validation of AI-generated content
• **Policy Compliance**: Adherence to content generation guidelines

## Performance Architecture

### Frontend Performance

**Optimization Strategies**:
• **Code Splitting**: Automatic route-based code splitting with Next.js
• **Lazy Loading**: Dynamic imports for large components
• **Image Optimization**: Automatic image compression and format optimization
• **Caching**: Browser caching for static assets and API responses

**Runtime Performance**:
• **Virtual Scrolling**: Efficient rendering of large character lists
• **Debounced Search**: Optimized search input handling
• **Memoization**: React optimization for expensive computations
• **IndexedDB Optimization**: Efficient database queries and indexing

### Backend Performance

**API Optimization**:
• **Connection Pooling**: Efficient OpenAI API connection management
• **Request Batching**: Combine multiple operations where possible
• **Caching**: Response caching for repeated requests
• **Timeout Management**: Appropriate timeout settings for different operations

**Resource Management**:
• **Memory Optimization**: Efficient memory usage in serverless functions
• **CPU Optimization**: Optimized processing algorithms
• **Network Optimization**: Minimized data transfer and compression
• **Error Recovery**: Fast recovery from transient failures

## Scalability Architecture

### Horizontal Scalability

**Client Scalability**:
• **Static Generation**: Pre-built pages for optimal performance
• **CDN Distribution**: Global content delivery for reduced latency
• **Client-Side Storage**: Reduced server load through local data management
• **Progressive Enhancement**: Graceful degradation for various client capabilities

**Server Scalability**:
• **Serverless Functions**: Automatic scaling with demand
• **Stateless Design**: No session management or server-side state
• **Database Independence**: Client-side storage eliminates database bottlenecks
• **API Efficiency**: Optimized API calls and response handling

### Vertical Scalability

**Resource Optimization**:
• **Memory Efficiency**: Optimized data structures and processing
• **CPU Efficiency**: Algorithmic optimization for complex operations
• **Storage Efficiency**: Compressed data storage and efficient indexing
• **Network Efficiency**: Minimized data transfer and optimal protocols

## Technology Stack Integration

### Core Technologies

**Frontend Stack**:
• **Next.js 15**: React framework with App Router and server components
• **React 18**: UI library with concurrent features and hooks
• **TypeScript**: Type-safe development with comprehensive type definitions
• **Tailwind CSS**: Utility-first styling with responsive design

**Backend Stack**:
• **Next.js API Routes**: Serverless function implementation
• **OpenAI SDK**: Official OpenAI API integration library
• **Node.js Runtime**: Server-side JavaScript execution environment

**Storage Stack**:
• **IndexedDB**: Client-side database for structured data storage
• **Local Storage**: Simple key-value storage for preferences
• **File API**: Browser file handling for import/export functionality

### Development Tools

**Development Environment**:
• **TypeScript Compiler**: Static type checking and compilation
• **ESLint**: Code quality and style enforcement
• **Prettier**: Automatic code formatting
• **Hot Reload**: Development server with live updates

**Build and Deployment**:
• **Vercel**: Optimized deployment platform for Next.js
• **Webpack**: Module bundling and optimization
• **PostCSS**: CSS processing and optimization
• **Tree Shaking**: Unused code elimination

## Future Architecture Considerations

### Planned Enhancements

**Feature Scalability**:
• **Plugin Architecture**: Extensible system for additional features
• **API Expansion**: Additional AI service integration capabilities
• **Data Export**: Enhanced export formats for game engine integration
• **Collaboration Features**: Multi-user character sharing and collaboration

**Performance Improvements**:
• **Service Workers**: Offline functionality and background processing
• **WebAssembly**: Performance-critical operations optimization
• **Advanced Caching**: Sophisticated caching strategies for improved performance
• **Progressive Web App**: Enhanced mobile experience and installation

### Technology Evolution

**Framework Updates**:
• **React Concurrent Features**: Advanced React capabilities integration
• **Next.js Evolution**: Latest Next.js features and optimizations
• **Web Standards**: Modern web API adoption and feature enhancement
• **AI Integration**: Advanced AI model integration and capabilities

## Related Documentation

• [API Documentation](/docs/api) - Detailed API specifications and integration
• [Security Documentation](/docs/security) - Comprehensive security measures and practices
• [Development Setup](/docs/dev-setup) - Local development environment configuration