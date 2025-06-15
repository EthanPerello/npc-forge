# Testing Guide

This document outlines testing procedures for NPC Forge contributors using Next.js 15's development environment.

## Core Testing Areas

### Character Generation Wizard
• Test all four steps (Concept, Options, Model, Generate)
• Verify progress navigation and form persistence
• Test with different model combinations
• Verify character data displays correctly

### Interactive Chat System
• Test chat initiation from character cards and library
• Verify message sending and character responses
• Test conversation persistence across browser sessions
• Confirm usage tracking against text model limits

### Portrait Editing
• Test edit interface with gpt-image-1 model
• Verify model compatibility warnings for other models
• Test various edit prompts and processing
• Confirm usage integration with image model limits

### Trait Management
• Test AI trait generation and individual regeneration
• Verify trait editing and formatting consistency
• Test custom trait addition and removal
• Confirm integration with character display

### Character Library
• Test character saving, loading, and editing
• Verify enhanced filtering and smart search
• Test import/export functionality
• Confirm regeneration features work correctly

## Testing Procedure

### 1. Environment Setup
• Start clean development environment
• Set up `.env.local` with valid OpenAI API key (for developers only)
• Clear browser cache and IndexedDB if needed

### 2. Basic Functionality
• Complete character creation wizard
• Save character to library
• Start chat conversation
• Test portrait editing (if character has portrait)
• Add/regenerate traits

### 3. Edge Cases
• Test with long inputs and special characters
• Test network interruption scenarios
• Verify error handling and user feedback
• Test usage limit enforcement (in production mode)

### 4. Cross-Browser Testing
• Verify functionality in Chrome, Firefox, Safari, Edge
• Test responsive design on different screen sizes
• Confirm mobile touch interactions work

## Performance Testing

• Monitor character generation response times
• Test library performance with multiple characters
• Verify smooth UI animations and transitions
• Check API call optimization

## Common Issues

**Generation Failures**: Check API key validity and credits (for developers)
**Chat Not Working**: Verify character exists and IndexedDB is functional
**Portrait Editing Disabled**: Ensure character has existing portrait and compatible model
**Trait Issues**: Check text model usage limits and API connectivity

## Development vs Production Testing

### Development Mode
• **Usage Limits**: Bypassed for unlimited testing
• **API Costs**: Developer's OpenAI account is charged
• **Error Handling**: More detailed error messages for debugging
• **Performance**: May be slower due to development optimizations

### Production Mode (Public App)
• **Usage Limits**: Monthly limits enforced per user
• **API Costs**: Free for end users
• **Error Handling**: User-friendly error messages
• **Performance**: Optimized for production use

## Testing New Features

When contributing new features:
• Test with various character types and configurations
• Verify integration with existing features
• Test error handling and edge cases
• Ensure responsive design and accessibility
• Update documentation for new functionality

## Security Testing

### Input Validation
• Test with malicious input strings
• Verify XSS prevention
• Test file upload security (for portrait editing)
• Confirm proper sanitization

### Data Privacy
• Verify no data is transmitted to external servers
• Test local storage isolation
• Confirm data export/import security
• Test browser storage permissions

## Automated Testing Considerations

### Unit Testing
• Test utility functions and data processing
• Verify model configuration logic
• Test input validation functions
• Confirm data transformation accuracy

### Integration Testing
• Test API endpoint functionality
• Verify database operations
• Test external service integration
• Confirm error handling paths

### End-to-End Testing
• Test complete user workflows
• Verify cross-component interactions
• Test session persistence
• Confirm responsive behavior

## Error Scenario Testing

### Network Issues
• Test offline functionality
• Verify graceful degradation
• Test reconnection handling
• Confirm error message clarity

### API Failures
• Test rate limiting scenarios
• Verify timeout handling
• Test malformed response handling
• Confirm retry logic

### Browser Limitations
• Test storage quota limits
• Verify IndexedDB availability
• Test browser compatibility
• Confirm fallback behaviors

## Performance Benchmarks

### Character Generation
• **Text Only**: 10-30 seconds
• **With Portrait**: 30-120 seconds
• **Chat Response**: 5-15 seconds
• **Portrait Editing**: 30-90 seconds

### Library Operations
• **Character Load**: < 1 second
• **Search Results**: < 500ms
• **Filter Updates**: < 200ms
• **Export/Import**: 1-5 seconds

## Accessibility Testing

### Keyboard Navigation
• Test tab order and focus indicators
• Verify keyboard shortcuts work
• Test screen reader compatibility
• Confirm ARIA label accuracy

### Visual Accessibility
• Test color contrast ratios
• Verify text scaling behavior
• Test with reduced motion preferences
• Confirm responsive text sizing

## Mobile Testing

### Touch Interactions
• Test tap targets and gestures
• Verify scroll behavior
• Test virtual keyboard handling
• Confirm orientation changes

### Performance
• Test on slower devices
• Verify memory usage
• Test network efficiency
• Confirm battery impact

## Quality Assurance Checklist

### Functionality
- [ ] Character generation works across all steps
- [ ] Chat conversations maintain character personality
- [ ] Portrait editing produces expected results
- [ ] Library operations save and load correctly
- [ ] Usage limits are tracked accurately

### User Experience
- [ ] Interface is intuitive and responsive
- [ ] Error messages are helpful and clear
- [ ] Loading states provide appropriate feedback
- [ ] Navigation flows logically between features

### Performance
- [ ] Page loads quickly across devices
- [ ] Large character collections perform well
- [ ] Memory usage remains reasonable
- [ ] Network requests are optimized

### Security
- [ ] User data remains private and local
- [ ] Input validation prevents malicious content
- [ ] Error handling doesn't leak sensitive information
- [ ] API keys are properly secured (for developers)

## Testing Documentation

When testing new features:
• Document test procedures and results
• Include screenshots of key functionality
• Note any browser-specific behaviors
• Record performance measurements
• Update user guides with new features

## Continuous Testing

### Regression Testing
• Test existing features after updates
• Verify backward compatibility
• Confirm data migration works
• Test upgrade paths

### User Acceptance Testing
• Gather feedback from actual users
• Test with realistic usage patterns
• Verify feature completeness
• Confirm documentation accuracy

## Related Documentation

• [Contributing Guidelines](/docs/contributing) - Development workflow
• [Development Setup](/docs/dev-setup) - Local environment setup
• [Security Documentation](/docs/security) - Security testing considerations