# Testing Guide

This document outlines the testing approach for NPC Forge, including manual testing procedures, potential automated testing strategies, and best practices for ensuring quality.

## Current Testing Approach

NPC Forge currently relies on manual testing for quality assurance. This document provides structured procedures to ensure thorough testing across all features.

## Manual Testing Checklist

### Core Functionality

#### Character Generation Wizard

- [ ] **Concept Step**
  - [ ] Genre selection updates sub-genre options correctly
  - [ ] Sub-genre selection works for all genres
  - [ ] Description field accepts input and persists across navigation
  - [ ] Progress bar shows step 1 as active
  - [ ] Continue button navigates to Options step

- [ ] **Options Step**
  - [ ] Basic traits (gender, age, alignment, relationship) can be selected
  - [ ] Advanced options expand/collapse correctly
  - [ ] Personality traits allow multiple selection (unlimited)
  - [ ] Occupation search dropdown functions properly
  - [ ] Quest/dialogue/item toggles work
  - [ ] Randomize button generates random traits
  - [ ] Clear options resets fields but preserves description
  - [ ] Progress bar navigation allows jumping to other steps

- [ ] **Model Step**
  - [ ] Text model selection displays usage limits correctly
  - [ ] Image model selection displays usage limits correctly
  - [ ] Portrait customization options function
  - [ ] Usage warnings appear when approaching limits
  - [ ] Progress bar shows step 3 as active

- [ ] **Generate Step**
  - [ ] Character generation completes successfully
  - [ ] Portrait generation works (or fails gracefully)
  - [ ] Generated character displays in tabs
  - [ ] Save to Library button functions
  - [ ] New Character button resets wizard

#### Character Library

- [ ] **Library Interface**
  - [ ] Character cards display correctly
  - [ ] Search functionality works
  - [ ] Filter by genre/sub-genre functions
  - [ ] Character viewer modal opens and displays data
  - [ ] Direct action buttons (edit, delete, download) work

- [ ] **Character Editing**
  - [ ] Edit page loads character data correctly
  - [ ] All character fields can be modified
  - [ ] Portrait upload/regeneration works
  - [ ] Add/remove quests functions
  - [ ] Add/remove dialogue lines works
  - [ ] Add/remove items works
  - [ ] Individual regeneration buttons work
  - [ ] Save changes persists modifications

#### Character Regeneration

- [ ] **Individual Attribute Regeneration**
  - [ ] Name regeneration works
  - [ ] Appearance regeneration works
  - [ ] Personality regeneration works
  - [ ] Backstory regeneration works
  - [ ] Model selection affects regeneration quality

- [ ] **Component Regeneration**
  - [ ] Quest title regeneration
  - [ ] Quest description regeneration
  - [ ] Quest reward regeneration
  - [ ] Full quest regeneration
  - [ ] Dialogue line regeneration
  - [ ] Item description regeneration

- [ ] **Portrait Regeneration**
  - [ ] Portrait regeneration with same model
  - [ ] Portrait regeneration with different models
  - [ ] Portrait options affect regeneration results
  - [ ] Loading states show during regeneration

### User Interface

#### Wizard Navigation

- [ ] Progress bar correctly shows current step
- [ ] Clicking progress bar steps navigates appropriately
- [ ] Continue/Back buttons work in all steps
- [ ] Sticky footer remains visible during scroll
- [ ] Welcome popup appears for first-time users

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

#### Model Selection Interface

- [ ] Model tiers display correctly with indicators
- [ ] Usage limits show current status
- [ ] Model descriptions are accurate
- [ ] Selection persists across navigation

#### Responsive Design

- [ ] Desktop layout renders correctly
- [ ] Tablet layout adjusts appropriately
- [ ] Mobile layout is usable
- [ ] Touch interactions work on mobile devices
- [ ] Wizard steps adapt to screen size

### Data Management

#### IndexedDB Storage

- [ ] Characters save to library correctly
- [ ] Characters load from library correctly
- [ ] Character editing saves persist
- [ ] Portrait images store and retrieve properly
- [ ] Search index functions efficiently
- [ ] Database recovery handles corruption

#### Import/Export

- [ ] JSON export includes all character data
- [ ] JSON import adds characters to library
- [ ] Individual character downloads work
- [ ] Portrait downloads function correctly

### Usage Limits

- [ ] Standard tier shows unlimited correctly
- [ ] Enhanced tier tracks 30/month limit
- [ ] Premium tier tracks 10/month limit
- [ ] Usage persists across browser sessions
- [ ] Monthly reset functionality works
- [ ] Development mode bypasses limits

### Edge Cases

- [ ] Extremely long inputs are handled gracefully
- [ ] Special characters and Unicode are supported
- [ ] Very short descriptions still produce reasonable results
- [ ] Failure states are handled with appropriate messaging
- [ ] Network interruptions are handled gracefully
- [ ] Empty character library displays appropriately

## Test Environment Setup

To properly test NPC Forge, you should have:

1. Access to multiple browsers (Chrome, Firefox, Safari, Edge)
2. Mobile and tablet devices or emulators
3. A valid OpenAI API key for development
4. Different network conditions (good connection, throttled connection)

## Testing Specific Features

### Testing the Wizard Interface

1. **Navigation Testing**:
   - Complete the full wizard flow multiple times
   - Navigate backwards and forwards between steps
   - Test direct navigation via progress bar
   - Verify data persistence across navigation

2. **Step Completion Testing**:
   - Test each step with minimal data
   - Test each step with maximal data
   - Test validation on required fields

### Testing Model Selection

1. **Usage Limit Testing**:
   - Generate characters with different model combinations
   - Verify usage counts increment correctly
   - Test behavior when approaching limits
   - Verify monthly reset functionality

2. **Model Quality Testing**:
   - Compare outputs between model tiers
   - Test mixed model selections (e.g., Standard text + Enhanced image)

### Testing Character Regeneration

1. **Individual Regeneration**:
   - Test each regeneration type separately
   - Verify only selected elements change
   - Test with different models
   - Verify loading states and error handling

2. **Component Regeneration**:
   - Test quest component regeneration
   - Verify dialogue and item regeneration
   - Test add/remove functionality with regeneration

### Testing Library Management

1. **CRUD Operations**:
   - Create characters and save to library
   - Read/view characters from library
   - Update characters through editing
   - Delete characters from library

2. **Search and Filtering**:
   - Test search with various queries
   - Test filter combinations
   - Verify results update in real-time

## Manual Testing Procedure

Follow this procedure when testing new features or changes:

1. **Preparation**
   - Start with a clean development environment
   - Ensure you have the latest code
   - Set up the `.env.local` file with your OpenAI API key
   - Clear browser cache and IndexedDB if testing storage

2. **Basic Wizard Testing**
   - Test the happy path (expected inputs and workflow)
   - Complete character creation with standard options
   - Save character to library
   - Verify outputs match expected results

3. **Advanced Feature Testing**
   - Test model selection variations
   - Test character regeneration features
   - Test library management operations
   - Test edge cases and error conditions

4. **Cross-browser Testing**
   - Verify functionality in Chrome, Firefox, Safari, and Edge
   - Check for rendering differences
   - Verify responsive breakpoints work across browsers

5. **Mobile Testing**
   - Test on actual mobile devices if possible
   - Verify touch interactions work
   - Ensure text is readable and forms are usable
   - Test in both portrait and landscape orientations

6. **Performance Testing**
   - Monitor generation times across models
   - Test library performance with many characters
   - Verify IndexedDB operations are efficient

## Testing Scenarios

### Character Generation Scenarios

1. **Minimal Input Character**
   - Only description provided
   - Default model selections
   - Basic traits only

2. **Fully Customized Character**
   - Detailed description
   - All advanced options filled
   - Premium models selected
   - All components enabled

3. **Different Genre Characters**
   - Test each main genre
   - Test multiple sub-genres
   - Verify genre-specific templates work

### Regeneration Scenarios

1. **Selective Regeneration**
   - Regenerate only appearance
   - Regenerate specific quest components
   - Change models between regenerations

2. **Bulk Regeneration**
   - Regenerate multiple elements
   - Test regeneration performance
   - Verify data consistency

### Library Scenarios

1. **Small Library (< 10 characters)**
   - Test basic operations
   - Verify search and filtering

2. **Large Library (50+ characters)**
   - Test performance
   - Test search efficiency
   - Test scroll and pagination behavior

## Future Automated Testing

While NPC Forge currently relies on manual testing, future development should include automated testing. Here are recommendations for implementing automated tests:

### Unit Tests

Implement unit tests for:
- Utility functions in `/src/lib/utils.ts`
- Context providers and state management
- API route handlers (mocking OpenAI responses)
- Character storage operations

Recommended tools:
- Jest
- React Testing Library

### Integration Tests

Implement integration tests for:
- Wizard flow completion
- Character library operations
- Regeneration workflows
- Model selection and usage tracking

Recommended tools:
- Cypress
- Playwright

### E2E Tests

Implement end-to-end tests for:
- Complete user journeys
- Cross-browser compatibility
- Mobile functionality

Recommended tools:
- Cypress
- Playwright

### Visual Regression Tests

Consider visual regression tests for:
- Wizard step interfaces
- Character display layouts
- Library grid layouts

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

## Performance Testing

### Generation Performance

- Monitor character generation times across different models
- Test concurrent generation requests
- Verify API timeout handling

### Library Performance

- Test library loading with large numbers of characters
- Monitor search performance with complex queries
- Verify IndexedDB operation efficiency

### UI Performance

- Test wizard navigation speed
- Monitor rendering performance on different devices
- Verify smooth animations and transitions

## Release Testing

Before each release, perform these additional tests:

1. **Regression Testing**
   - Verify all existing features still work
   - Check for unintended side effects

2. **Integration Testing**
   - Test the complete user workflow
   - Verify all features work together correctly

3. **Documentation Review**
   - Ensure documentation is up to date
   - Update README and CHANGELOG

4. **Final Cross-Browser Check**
   - Complete test suite in all supported browsers
   - Verify mobile compatibility

## Related Documentation

- [Contributing Guidelines](/docs/contributing) - For contribution workflows
- [Development Setup](/docs/dev-setup) - For development environment
- [Architecture Overview](/docs/architecture) - For system understanding
- [Character Library Guide](/docs/library) - For library feature testing