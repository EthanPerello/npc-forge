# Testing Guide

This document outlines the testing approach for NPC Forge, including manual testing procedures and best practices for ensuring quality.

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
  - [ ] Personality traits allow multiple selection
  - [ ] Occupation search dropdown functions properly
  - [ ] Quest/dialogue/item toggles work
  - [ ] Randomize button generates random traits
  - [ ] Clear options resets fields but preserves description

- [ ] **Model Step**
  - [ ] Text model selection displays usage limits correctly
  - [ ] Image model selection displays usage limits correctly
  - [ ] Portrait customization options function
  - [ ] Usage warnings appear when approaching limits

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

- [ ] **Enhanced Filtering (v0.18.0)**
  - [ ] Trait filtering dropdowns appear and function
  - [ ] Smart search with "category: value" syntax works
  - [ ] Filter panels are organized and collapsible
  - [ ] Automatic trait discovery creates appropriate filters
  - [ ] Combined filtering and search work together

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

#### Model Selection Interface

- [ ] Model tiers display correctly with indicators
- [ ] Usage limits show current status (50/30/10 text, 10/5/3 images)
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

- [ ] Standard tier shows 50 text/10 images correctly
- [ ] Enhanced tier tracks 30 text/5 images limit
- [ ] Premium tier tracks 10 text/3 images limit
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

### Testing the Enhanced Filtering System (v0.18.0)

1. **Filter Creation Testing**:
   - Create characters with various traits
   - Verify filters automatically appear for new traits
   - Test filter categorization and organization

2. **Search Functionality Testing**:
   - Test general text search
   - Test trait-specific search syntax (`category: value`)
   - Test combined filtering and search

3. **Filter Panel Testing**:
   - Test collapsible sections
   - Verify filter organization by category
   - Test filter clearing functionality

### Testing Model Selection

1. **Usage Limit Testing**:
   - Generate characters with different model combinations
   - Verify usage counts increment correctly (50/30/10 text, 10/5/3 images)
   - Test behavior when approaching limits
   - Verify monthly reset functionality

2. **Model Quality Testing**:
   - Compare outputs between model tiers
   - Test mixed model selections

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

## Manual Testing Procedure

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
   - Test enhanced filtering system
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

## Performance Testing

### Generation Performance

- Monitor character generation times across different models
- Test concurrent generation requests
- Verify API timeout handling

### Library Performance

- Test library loading with large numbers of characters
- Monitor search and filtering performance with complex queries
- Verify IndexedDB operation efficiency

### UI Performance

- Test wizard navigation speed
- Monitor rendering performance on different devices
- Verify smooth animations and transitions

## Troubleshooting

### Generation Issues

- **Failed Generation**: Check internet connection, try simpler descriptions
- **Portrait Issues**: Reduce portrait specifications or try different art style
- **Unexpected Results**: Refine description or adjust trait selections

### Limit Issues

- **Reached Limit**: Wait for monthly reset or switch to Standard tier
- **Unexpected Usage**: Check which models are selected and their individual limits

### Filtering Issues

- **Missing Filters**: Ensure characters with those traits are saved to library
- **Search Not Working**: Check trait-specific search syntax
- **Slow Performance**: Test with smaller character collections

## Related Documentation

- [How to Use NPC Forge](/docs/how-to-use) - Complete user guide
- [Features Overview](/docs/features) - Complete feature list
- [Character Library Guide](/docs/library) - Library management features
- [Contributing Guidelines](/docs/contributing) - For contribution workflows