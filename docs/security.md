# Security Documentation

This document outlines the security measures implemented in NPC Forge to protect users, data, and system integrity.

## Overview

NPC Forge is designed with security in mind as a client-side application built with Next.js 15 that interacts with the OpenAI API. It focuses on secure API communication, input validation, content moderation, and includes security measures for portrait editing and trait management features.

## Key Security Measures

### API Security

**Server-Side API Calls**
• All OpenAI API calls are made server-side via Next.js API routes
• API keys are never exposed to the client
• Environment variables store sensitive credentials securely
• Portrait editing API calls handled securely server-side

**Free Service Security**
• Application provides free access to AI capabilities without requiring user credentials
• Usage limits prevent abuse while maintaining fair access
• Monthly limits per model tier: 50/30/10 text, 10/5/3 images
• Chat conversations count against text model limits
• Portrait editing counts against image model limits
• Trait generation counts against text model limits
• Limits reset monthly and are tracked per device

**Error Handling**
• Detailed errors are logged server-side but not exposed to clients
• Generic error messages are returned to users
• Failed API calls are gracefully handled
• Enhanced error categorization prevents information leakage

### Input Validation and Sanitization

**Input Validation**
• All form inputs are validated before processing
• Required fields are checked for presence
• Character descriptions are limited to reasonable lengths
• Chat messages are limited to 1000 characters
• Portrait edit prompts are validated for length and content
• Trait values are validated for format and appropriateness

**Input Sanitization**
• All free-text inputs are sanitized before processing
• Control characters are removed
• Whitespace is normalized
• Special characters are handled appropriately
• Input length is limited where appropriate
• Portrait edit prompts are sanitized for security

### Content Moderation

**OpenAI Content Policy**
• Character generation is subject to OpenAI's content policy
• Chat conversations are subject to content policy enforcement
• Portrait editing requests are filtered through OpenAI's moderation
• Trait generation follows content policy guidelines
• The API will reject requests for harmful, illegal, or explicit content

**Prompt Design**
• System prompts are designed to generate appropriate content
• Instructions emphasize creating content suitable for game scenarios
• Clear separation between system instructions and user input
• Portrait editing prompts include safety guidelines
• Trait generation prompts prevent inappropriate content

**Fallback Systems**
• If portrait generation fails due to content policy, the character is still returned
• If portrait editing fails, the original portrait is preserved
• If trait generation fails, existing traits are maintained
• Error messages provide context without revealing sensitive details

### Portrait Editing Security (v0.21.0)

**Image Processing Security**
• Portrait editing requests are validated for image format and size
• Image data is sanitized before processing
• Maximum image size limits enforced (50MB for gpt-image-1)
• Image format validation prevents malicious file uploads

**Edit Prompt Security**
• Edit prompts are sanitized and validated before processing
• Prompt length limits enforced per model (32,000 for gpt-image-1)
• Content filtering applied to edit prompts
• Malicious prompt detection and blocking

**Model Validation**
• Only supported models are allowed for editing operations
• Model compatibility is verified before processing
• Unsupported model attempts are blocked with clear messaging

**Usage Validation**
• Portrait editing requests are subject to usage limits
• Limits are verified before processing expensive operations
• Rate limiting prevents abuse of editing features

### Trait Management Security (v0.21.0)

**Trait Generation Security**
• AI-generated traits are subject to content filtering
• Trait values are validated for appropriate length and content
• Malicious trait generation attempts are blocked
• Generated traits are sanitized before storage

**Trait Validation**
• Custom trait names and values are validated
• Length limits enforced for trait data
• Special characters are handled appropriately
• Trait data is sanitized before processing

### Data Privacy

**Local-Only Storage**
• Generated characters are stored locally using IndexedDB
• Chat conversations are stored locally per character
• Portrait data is stored locally with compression
• Trait data is stored locally with character information
• No character data or conversation history is transmitted to or stored on servers
• Users have complete control over their character data and conversations

**No User Tracking**
• No user accounts or authentication required
• No collection of personal information
• Usage statistics stored locally only
• No tracking of user behavior or preferences

**Data Portability**
• Users can export characters as JSON
• Complete data ownership and portability
• No vendor lock-in for character data
• Portrait data included in exports when available

### Frontend Security

**XSS Prevention**
• React's built-in XSS protection for rendering user content
• Input sanitization before processing
• Content validation for trait display
• Safe rendering of user-generated content

**CORS Configuration**
• Appropriate CORS settings to control access to resources
• API routes secured against cross-origin attacks
• Image proxy endpoint with proper CORS handling

### Character Regeneration Security

**Regeneration Validation**
• All regeneration requests validate the original character data
• Regeneration maintains data consistency
• Model selection validated against available options
• Trait regeneration includes content validation

**Controlled Regeneration**
• Users can only regenerate their own locally stored characters
• Regeneration respects usage limits
• Portrait editing requires explicit user consent
• Trait regeneration is subject to content guidelines

## Enhanced Security Measures (v0.20.1)

### Request Size Validation

**Payload Size Limits**
• Maximum request size enforced (10MB for regeneration, 50MB for portrait editing)
• Automatic payload cleaning to prevent oversized requests
• Character data sanitization before API calls
• Image size validation for portrait editing

**Data Cleaning**
• Character data is cleaned before API transmission
• Large base64 image data removed from requests where not needed
• Special character handling in character names and IDs
• Malformed data detection and cleaning

### Enhanced Error Handling

**Error Categorization**
• Comprehensive error classification system
• User-friendly error messages without technical details
• Specific guidance for different error types
• Prevention of information leakage through error messages

**Robust Parsing**
• Multiple fallback strategies for JSON parsing
• Handling of malformed API responses
• Content cleaning for incomplete data
• Graceful degradation when parsing fails

## Potential Vulnerabilities and Mitigations

### Prompt Injection

**Vulnerability**: Users might attempt to manipulate the AI through carefully crafted inputs including edit prompts.

**Mitigation**:
• Clear separation between system prompts and user inputs
• Input validation and sanitization for all user content
• Character regeneration uses validated base character data
• Portrait edit prompts are sanitized and validated
• Trait generation prompts are filtered for appropriate content

### Denial of Service

**Vulnerability**: Excessive API calls could lead to service degradation.

**Mitigation**:
• Client-side usage limits per model tier
• Development mode bypass for testing only
• Input length limitations for all user content
• Graceful handling of API failures
• Request size validation and cleaning

### Content Policy Violations

**Vulnerability**: Users might attempt to generate inappropriate content including through portrait editing.

**Mitigation**:
• Input validation and sanitization for all content types
• OpenAI's built-in content filters for all API calls
• System prompts designed to encourage appropriate outputs
• Error handling for policy violations
• Portrait editing subject to content policy

### Local Storage Manipulation

**Vulnerability**: Users could potentially manipulate local character storage.

**Mitigation**:
• Characters stored locally only affect the user's own data
• Character validation on import
• No server-side dependencies on client storage
• Data integrity checks for corrupted data

### Image Processing Vulnerabilities

**Vulnerability**: Malicious image data could potentially cause issues in portrait editing.

**Mitigation**:
• Image format validation before processing
• Image size limits to prevent resource exhaustion
• Secure image data handling and transmission
• Error handling for corrupted image data

## Model Selection Security

### Usage Validation

• Client-side usage tracking with local verification
• Model availability checked before generation
• Usage limits enforced per model tier
• Monthly reset mechanisms prevent accumulation
• Portrait editing usage tracked separately

### Model Access Control

• Premium models require explicit selection
• Usage warnings before high-tier model use
• Model compatibility validation for editing features

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
• Be cautious with imported character files from untrusted sources

### Portrait Editing Security

• Use clear, appropriate language in edit prompts
• Avoid sharing edit prompts that might contain sensitive information
• Be aware that portrait editing counts against usage limits
• Report any concerning AI-generated content

### Browser Security

• Keep browser updated for latest security patches
• Use browsers with good security track records
• Be cautious of browser extensions that access local storage
• Clear sensitive data if using shared computers

## Trait Management Security

### Trait Generation Safety

• AI-generated traits are subject to content filtering
• Users can edit or remove inappropriate traits
• Trait generation respects usage limits
• Generated traits are validated for appropriateness

### Custom Trait Security

• User-created traits are validated for length and content
• Malicious trait data is filtered out
• Trait data is sanitized before storage
• No sensitive information should be stored in traits

## Related Documentation

• [API Documentation](/docs/api) - For details on API implementation including portrait editing
• [Contributing Guidelines](/docs/contributing) - For contribution workflows
• [Architecture Overview](/docs/architecture) - For high-level system design including security architecture