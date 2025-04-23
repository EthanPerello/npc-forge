# Security Documentation

This document outlines the security measures implemented in NPC Forge to protect users, data, and system integrity.

## Overview

NPC Forge is designed with security in mind, implementing various measures to protect against common web application vulnerabilities while ensuring user data privacy. As a client-side application that interacts with the OpenAI API, it focuses on secure API communication, input validation, and content moderation.

## Key Security Measures

### API Security

1. **Server-Side API Calls**
   - All OpenAI API calls are made server-side via Next.js API routes
   - API keys are never exposed to the client
   - Environment variables store sensitive credentials

2. **Rate Limiting**
   - Usage limits (15 generations per month) help prevent abuse
   - Client-side tracking through localStorage provides basic rate limiting
   - Future versions may implement server-side rate limiting

3. **Error Handling**
   - Detailed errors are logged server-side but not exposed to clients
   - Generic error messages are returned to users
   - Failed API calls are gracefully handled

### Input Validation and Sanitization

1. **Input Validation**
   - All form inputs are validated before processing
   - Required fields are checked for presence
   - Enumerations (like gender, age group, etc.) are validated against allowed values

2. **Input Sanitization**
   - All free-text inputs are sanitized before processing
   - Control characters are removed
   - Whitespace is normalized
   - Input length is limited where appropriate

```typescript
// Input sanitization function
export function sanitizeUserInput(input: string): string {
    if (!input) return '';
    
    // Remove any control characters
    let sanitized = input.replace(/[\u0000-\u001F\u007F-\u009F]/g, '');
    
    // Normalize whitespace (but preserve paragraph breaks)
    sanitized = sanitized.replace(/[ \t\v\f]+/g, ' ');
    
    // Trim leading/trailing whitespace
    return sanitized.trim();
}
```

3. **JSON Validation**
   - Generated character data is validated against expected structure
   - Required fields are checked for presence
   - Error handling for malformed JSON responses

### Content Moderation

1. **OpenAI Content Policy**
   - Character generation is subject to OpenAI's content policy
   - The API will reject requests for harmful, illegal, or explicit content
   - Model parameters are tuned to generate appropriate content

2. **Prompt Design**
   - System prompts are designed to generate appropriate content
   - Instructions emphasize creating content suitable for game scenarios

3. **Fallback Systems**
   - If portrait generation fails due to content policy, the character is still returned
   - Error messages provide context without revealing sensitive details

### Data Privacy

1. **No Server-Side Storage**
   - Generated characters are not stored on the server
   - No database is used for character data
   - Users must download their characters as JSON to save them

2. **Local Storage Usage**
   - Only usage tracking information is stored in localStorage
   - No personal data is collected or stored
   - Data is periodically reset (monthly for usage counts)

3. **No Account System**
   - No user accounts or authentication required
   - No collection of personal information
   - No tracking or analytics beyond basic usage counts

### Frontend Security

1. **XSS Prevention**
   - React's built-in XSS protection for rendering user content
   - Input sanitization before processing
   - Content Security Policy headers

2. **Clickjacking Protection**
   - X-Frame-Options headers to prevent clickjacking
   - Frame-ancestors directive in Content Security Policy

3. **CORS Configuration**
   - Appropriate CORS settings to control access to resources
   - API routes secured against cross-origin attacks

## Potential Vulnerabilities and Mitigations

### Prompt Injection

**Vulnerability**: Users might attempt to manipulate the AI through carefully crafted inputs that override system instructions.

**Mitigation**:
- Clear separation between system prompts and user inputs
- Input validation and sanitization
- Model parameters tuned to resist injection
- Prompt structure designed to maintain control

### Denial of Service

**Vulnerability**: Excessive API calls could lead to rate limiting or increased costs.

**Mitigation**:
- Client-side usage limits
- Future implementation of server-side rate limiting
- Vercel's built-in DDoS protection

### Content Policy Violations

**Vulnerability**: Users might attempt to generate inappropriate or harmful content.

**Mitigation**:
- Input validation
- OpenAI's content filters
- Reporting mechanisms for inappropriate content
- Prompt design to encourage appropriate outputs

## Security Roadmap

Future security enhancements planned for NPC Forge include:

1. **Server-Side Rate Limiting**
   - Implementation of more robust rate limiting
   - IP-based tracking to prevent circumvention of limits

2. **Enhanced Validation**
   - More comprehensive input validation
   - Additional sanitization for complex inputs

3. **User Accounts and Authentication**
   - If implemented, will include:
     - Secure authentication practices
     - Password hashing and salting
     - Session management
     - Multi-factor authentication options

4. **Community Content Moderation**
   - If sharing features are added, will include:
     - Report mechanisms
     - Content review processes
     - Automated filtering

## Security Contact

If you discover a security vulnerability in NPC Forge, please report it by emailing [ethanperello@gmail.com](mailto:ethanperello@gmail.com). Please include:

1. Description of the vulnerability
2. Steps to reproduce
3. Potential impact
4. Suggested mitigations (if any)

We take all security reports seriously and will respond as quickly as possible.

## Related Documentation

- [API Documentation](api.md) - For details on the API implementation
- [Contributing Guidelines](contributing.md) - For contribution workflows
- [Architecture Overview](architecture.md) - For high-level system design