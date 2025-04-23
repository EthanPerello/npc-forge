# Testing Guide

This document outlines the testing approach for NPC Forge, including manual testing procedures, potential automated testing strategies, and best practices for ensuring quality.

## Current Testing Approach

NPC Forge currently relies on manual testing for quality assurance. This document provides structured procedures to ensure thorough testing across all features.

## Manual Testing Checklist

### Core Functionality

#### Character Generation

- [ ] Basic character generation with minimal inputs
- [ ] Generation with all options specified
- [ ] Generation with different genres and sub-genres
- [ ] Validation of required fields (description)
- [ ] Error handling for invalid inputs
- [ ] Character JSON structure validation

#### Portrait Generation

- [ ] Basic portrait generation
- [ ] Portrait generation with customization options
- [ ] Fallback handling when portrait generation fails
- [ ] Portrait rendering in the UI

#### Usage Limits

- [ ] Proper counting of character generations
- [ ] Correct display of remaining generations
- [ ] Monthly reset functionality
- [ ] Dev mode bypass functionality

### User Interface

#### Form Controls

- [ ] All form inputs work correctly
- [ ] Form validation provides appropriate feedback
- [ ] Tab navigation functions correctly
- [ ] Expandable sections open and close properly
- [ ] Multi-select functionality for personality traits
- [ ] Searchable dropdowns filter correctly

#### Character Display

- [ ] Character information displays correctly
- [ ] Tab system for character details works
- [ ] Portrait displays properly
- [ ] JSON data can be viewed
- [ ] Download functionality works

#### Responsive Design

- [ ] Desktop layout renders correctly
- [ ] Tablet layout adjusts appropriately
- [ ] Mobile layout is usable
- [ ] Touch interactions work on mobile devices

### Edge Cases

- [ ] Extremely long inputs are handled gracefully
- [ ] Special characters and Unicode are supported
- [ ] Very short descriptions still produce reasonable results
- [ ] Failure states are handled with appropriate messaging
- [ ] Network interruptions are handled gracefully

## Test Environment Setup

To properly test NPC Forge, you should have:

1. Access to multiple browsers (Chrome, Firefox, Safari, Edge)
2. Mobile and tablet devices or emulators
3. A valid OpenAI API key for development
4. Different network conditions (good connection, throttled connection)

## Testing Specific Features

### Testing Genre and Sub-genre Selection

1. Select each main genre and verify:
   - Sub-genre options update appropriately
   - Example description updates
   - UI elements reflect the genre selection

2. Select each sub-genre and verify:
   - Example description updates to match
   - Generated characters reflect the sub-genre traits

### Testing Advanced Options

1. Test personality trait selection:
   - Selecting up to 3 traits works
   - Cannot select more than 3 traits
   - Selected traits are reflected in generation

2. Test randomization feature:
   - Randomize button provides different options each time
   - Generated characters reflect randomized options

3. Test clear options:
   - Clear options resets all fields except description
   - Portrait options are preserved when specified

### Testing API Calls

1. Test API response handling:
   - Successful responses render properly
   - Error responses show appropriate messages
   - Timeouts are handled gracefully

2. Test API input validation:
   - Empty descriptions are rejected
   - Invalid enum values are handled
   - Overly long inputs are truncated or rejected

## Manual Testing Procedure

Follow this procedure when testing new features or changes:

1. **Preparation**
   - Start with a clean development environment
   - Ensure you have the latest code
   - Set up the `.env.local` file with your OpenAI API key

2. **Basic Testing**
   - Test the happy path (expected inputs and workflow)
   - Verify outputs match expected results
   - Check UI rendering and interactions

3. **Edge Case Testing**
   - Test with minimal inputs
   - Test with extreme inputs
   - Test with unexpected inputs
   - Test error conditions

4. **Cross-browser Testing**
   - Verify functionality in Chrome, Firefox, Safari, and Edge
   - Check for rendering differences
   - Verify responsive breakpoints work across browsers

5. **Mobile Testing**
   - Test on actual mobile devices if possible
   - Verify touch interactions work
   - Ensure text is readable and forms are usable
   - Test in both portrait and landscape orientations

6. **Documentation Review**
   - Ensure documentation reflects the current behavior
   - Update documentation if needed

## Future Automated Testing

While NPC Forge currently relies on manual testing, future development should include automated testing. Here are recommendations for implementing automated tests:

### Unit Tests

Implement unit tests for:
- Utility functions in `/src/lib/utils.ts`
- Context providers
- API route handlers (mocking OpenAI responses)
- Component props and state management

Recommended tools:
- Jest
- React Testing Library

### Integration Tests

Implement integration tests for:
- Form submission workflows
- Character generation flow
- Navigation and routing

Recommended tools:
- Cypress
- Playwright

### E2E Tests

Implement end-to-end tests for:
- Complete user journeys
- Cross-browser compatibility
- Mobile compatibility

Recommended tools:
- Cypress
- Playwright

### Visual Regression Tests

Consider visual regression tests for:
- UI components
- Generated character cards
- Responsive layouts

Recommended tools:
- Percy
- Chromatic

## Testing Best Practices

1. **Test Early and Often**
   - Test changes as you implement them
   - Don't wait until a feature is complete to test

2. **Document Test Cases**
   - Keep a record of tested scenarios
   - Update test documentation when adding features

3. **Isolate Issues**
   - When finding a bug, create a minimal reproduction
   - Document steps to reproduce issues

4. **Cross-Browser Compatibility**
   - Always test in multiple browsers
   - Pay special attention to Safari and Edge

5. **Accessibility Testing**
   - Test keyboard navigation
   - Check contrast ratios
   - Verify screen reader compatibility

## Reporting Issues

When reporting issues found during testing:

1. **Create a GitHub Issue**
   - Use clear, descriptive titles
   - Include detailed steps to reproduce
   - Specify the expected vs. actual behavior
   - Include screenshots or recordings when possible

2. **Issue Severity**
   - Critical: Application crash, data loss, security vulnerability
   - Major: Feature not working, blocking functionality
   - Minor: Cosmetic issues, non-blocking bugs
   - Enhancement: Suggestions for improvement

## Release Testing

Before each release, perform these additional tests:

1. **Regression Testing**
   - Verify all existing features still work
   - Check for unintended side effects

2. **Performance Testing**
   - Check load times
   - Verify API call efficiency
   - Test with multiple characters generated

3. **Documentation Review**
   - Ensure documentation is up to date
   - Update README and CHANGELOG

4. **Final Cross-Browser Check**
   - Complete test suite in all supported browsers
   - Verify mobile compatibility

## Related Documentation

- [Contributing Guidelines](contributing.md) - For contribution workflows
- [Deployment Guide](deployment.md) - For deployment procedures
- [Architecture Overview](architecture.md) - For system understanding