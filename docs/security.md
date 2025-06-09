# Security Documentation

This document outlines the security measures implemented in NPC Forge to protect users, data, and system integrity.

## Overview

NPC Forge is designed with security in mind as a client-side application that interacts with the OpenAI API. It focuses on secure API communication, input validation, and content moderation.

## Key Security Measures

### API Security

**Server-Side API Calls**
• All OpenAI API calls are made server-side via Next.js API routes
• API keys are never exposed to the client
• Environment variables store sensitive credentials

**Rate Limiting**
• Usage limits help prevent abuse through client-side tracking
• Monthly limits per model tier: 50/30/10 text, 10/5/3 images
• Chat conversations count against text model limits
• Limits reset monthly and are tracked per device

**Error Handling**
• Detailed errors are logged server-side but not exposed to clients
• Generic error messages are returned to users
• Failed API calls are gracefully handled

### Input Validation and Sanitization

**Input Validation**
• All form inputs are validated before processing
• Required fields are checked for presence
• Character descriptions are limited to reasonable lengths
• Chat messages are limited to 1000 characters

**Input Sanitization**
• All free-text inputs are sanitized before processing
• Control characters are removed
• Whitespace is normalized
• Input length is limited where appropriate

### Content Moderation

**OpenAI Content Policy**
• Character generation is subject to OpenAI's content policy
• The API will reject requests for harmful, illegal, or explicit content
• Chat conversations are subject to the same content policy enforcement

**Prompt Design**
• System prompts are designed to generate appropriate content
• Instructions emphasize creating content suitable for game scenarios
• Clear separation between system instructions and user input

**Fallback Systems**
• If portrait generation fails due to content policy, the character is still returned
• Error messages provide context without revealing sensitive details

### Data Privacy

**Local-Only Storage**
• Generated characters are stored locally using IndexedDB
• Chat conversations are stored locally per character
• No character data or conversation history is transmitted to or stored on servers
• Users have complete control over their character data and conversations

**No User Tracking**
• No user accounts or authentication required
• No collection of personal information
• Usage statistics stored locally only

**Data Portability**
• Users can export characters as JSON
• Complete data ownership and portability
• No vendor lock-in for character data

### Frontend Security

**XSS Prevention**
• React's built-in XSS protection for rendering user content
• Input sanitization before processing

**CORS Configuration**
• Appropriate CORS settings to control access to resources
• API routes secured against cross-origin attacks

### Character Regeneration Security

**Regeneration Validation**
• All regeneration requests validate the original character data
• Regeneration maintains data consistency
• Model selection validated against available options

**Controlled Regeneration**
• Users can only regenerate their own locally stored characters
• Regeneration respects usage limits

## Potential Vulnerabilities and Mitigations

### Prompt Injection

**Vulnerability**: Users might attempt to manipulate the AI through carefully crafted inputs.

**Mitigation**:
• Clear separation between system prompts and user inputs
• Input validation and sanitization
• Character regeneration uses validated base character data

### Denial of Service

**Vulnerability**: Excessive API calls could lead to rate limiting or increased costs.

**Mitigation**:
• Client-side usage limits per model tier
• Development mode bypass for testing only
• Input length limitations
• Graceful handling of API failures

### Content Policy Violations

**Vulnerability**: Users might attempt to generate inappropriate content.

**Mitigation**:
• Input validation and sanitization
• OpenAI's built-in content filters
• System prompts designed to encourage appropriate outputs
• Error handling for policy violations

### Local Storage Manipulation

**Vulnerability**: Users could potentially manipulate local character storage.

**Mitigation**:
• Characters stored locally only affect the user's own data
• Character validation on import
• No server-side dependencies on client storage

## Model Selection Security

### Usage Validation

• Client-side usage tracking with local verification
• Model availability checked before generation
• Usage limits enforced per model tier
• Monthly reset mechanisms prevent accumulation

### Model Access Control

• Premium models require explicit selection
• Usage warnings before high-tier model use
• No unauthorized access to model APIs

## Security Contact

If you discover a security vulnerability in NPC Forge, please report it by emailing [ethanperello@gmail.com](mailto:ethanperello@gmail.com). Please include:

1. Description of the vulnerability
2. Steps to reproduce
3. Potential impact
4. Suggested mitigations (if any)

## Security Best Practices for Users

### Character Data Protection

• Regularly export important characters as JSON backups
• Use descriptive filenames for exports
• Store backups securely

### API Key Security (Developers)

• Never commit `.env.local` files to version control
• Use environment-specific API keys
• Monitor API usage for unexpected patterns

### Browser Security

• Keep browser updated for latest security patches
• Use browsers with good security track records
• Be cautious of browser extensions that access local storage

## Related Documentation

• [API Documentation](/docs/api) - For details on the API implementation
• [Contributing Guidelines](/docs/contributing) - For contribution workflows
• [Architecture Overview](/docs/architecture) - For high-level system design