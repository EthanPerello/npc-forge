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
   - Usage limits help prevent abuse through client-side tracking
   - Standard tier: Unlimited usage
   - Enhanced tier: 30 generations per month
   - Premium tier: 10 generations per month
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
   - Character descriptions are limited to reasonable lengths

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
   - Clear separation between system instructions and user input

3. **Fallback Systems**
   - If portrait generation fails due to content policy, the character is still returned
   - Error messages provide context without revealing sensitive details

### Data Privacy

1. **Local-Only Storage**
   - Generated characters are stored locally using IndexedDB
   - No character data is transmitted to or stored on servers
   - Users have complete control over their character data

2. **No User Tracking**
   - No user accounts or authentication required
   - No collection of personal information
   - No tracking or analytics beyond basic usage counts
   - Usage statistics stored locally only

3. **Data Portability**
   - Users can export characters as JSON
   - Complete data ownership and portability
   - No vendor lock-in for character data

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

### Character Regeneration Security

1. **Regeneration Validation**
   - All regeneration requests validate the original character data
   - Regeneration maintains data consistency
   - Model selection validated against available options

2. **Controlled Regeneration**
   - Users can only regenerate their own locally stored characters
   - Regeneration respects usage limits
   - No ability to regenerate system-generated examples

## Potential Vulnerabilities and Mitigations

### Prompt Injection

**Vulnerability**: Users might attempt to manipulate the AI through carefully crafted inputs that override system instructions.

**Mitigation**:
- Clear separation between system prompts and user inputs
- Input validation and sanitization
- Model parameters tuned to resist injection
- Prompt structure designed to maintain control
- Character regeneration uses validated base character data

### Denial of Service

**Vulnerability**: Excessive API calls could lead to rate limiting or increased costs.

**Mitigation**:
- Client-side usage limits per model tier
- Development mode bypass for testing only
- Input length limitations
- Graceful handling of API failures
- Future implementation of server-side rate limiting

### Content Policy Violations

**Vulnerability**: Users might attempt to generate inappropriate or harmful content.

**Mitigation**:
- Input validation and sanitization
- OpenAI's built-in content filters
- System prompts designed to encourage appropriate outputs
- Error handling for policy violations

### Local Storage Manipulation

**Vulnerability**: Users could potentially manipulate local character storage.

**Mitigation**:
- Characters stored locally only affect the user's own data
- No shared character galleries to protect
- Character validation on import
- No server-side dependencies on client storage

## Model Selection Security

### Usage Validation
- Client-side usage tracking with local verification
- Model availability checked before generation
- Usage limits enforced per model tier
- Monthly reset mechanisms prevent accumulation

### Model Access Control
- Premium models require explicit selection
- Usage warnings before high-tier model use
- No unauthorized access to model APIs

## Security Roadmap

Future security enhancements planned for NPC Forge include:

### Server-Side Rate Limiting (v0.15.0+)
- Implementation of robust rate limiting per IP
- Abuse detection and prevention
- Enhanced monitoring of API usage

### Enhanced Input Validation
- More comprehensive input validation rules
- Advanced sanitization for complex inputs
- Regex-based content filtering

### Optional User Accounts (v0.15.0)
- If implemented, will include:
  - Secure authentication practices
  - Password hashing and salting (bcrypt)
  - Session management with JWT
  - Optional multi-factor authentication

### Content Moderation Improvements
- Enhanced prompt injection detection
- Community reporting mechanisms (if sharing features added)
- Automated content review processes

## Security Monitoring

### Error Logging
- Server-side error logging for security events
- API failure tracking and analysis
- No user data included in error logs

### Usage Analytics
- Basic usage statistics for performance monitoring
- No personally identifiable information collected
- Local storage for usage tracking only

## Security Contact

If you discover a security vulnerability in NPC Forge, please report it by emailing [ethanperello@gmail.com](mailto:ethanperello@gmail.com). Please include:

1. Description of the vulnerability
2. Steps to reproduce
3. Potential impact
4. Suggested mitigations (if any)

We take all security reports seriously and will respond as quickly as possible.

## Security Best Practices for Users

### Character Data Protection
- Regularly export important characters as JSON backups
- Use descriptive filenames for exports
- Store backups securely

### API Key Security (Developers)
- Never commit `.env.local` files to version control
- Use environment-specific API keys
- Monitor API usage for unexpected patterns

### Browser Security
- Keep browser updated for latest security patches
- Use browsers with good security track records
- Be cautious of browser extensions that access local storage

## Compliance and Standards

### Data Protection
- GDPR compliance through local-only storage
- No data retention policies needed (user-controlled)
- Right to deletion through local storage management

### API Usage
- Compliance with OpenAI's Terms of Service
- Responsible AI usage practices
- Content policy adherence

## Related Documentation

- [API Documentation](/docs/api) - For details on the API implementation
- [Contributing Guidelines](/docs/contributing) - For contribution workflows
- [Architecture Overview](/docs/architecture) - For high-level system design
- [Character Library Guide](/docs/library) - For local storage management