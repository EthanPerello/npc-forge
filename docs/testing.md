# Testing Guide

This document outlines the testing approach for NPC Forge, including manual testing procedures and best practices for ensuring quality across all features including portrait editing and trait management.

## Current Testing Approach

NPC Forge currently relies on manual testing for quality assurance. This document provides structured procedures to ensure thorough testing across all features.

## Manual Testing Checklist

### Core Functionality

#### Character Generation Wizard

• **Concept Step**
  • Genre selection updates sub-genre options correctly
  • Sub-genre selection works for all genres
  • Description field accepts input and persists across navigation
  • Progress bar shows step 1 as active
  • Continue button navigates to Options step

• **Options Step**
  • Basic traits (gender, age, alignment, relationship) can be selected
  • Advanced options expand/collapse correctly
  • Personality traits allow multiple selection
  • Occupation search dropdown functions properly
  • Quest/dialogue/item toggles work
  • Randomize button generates random traits
  • Clear options resets fields but preserves description

• **Model Step**
  • Text model selection displays usage limits correctly
  • Image model selection displays usage limits correctly
  • Portrait customization options function
  • Usage warnings appear when approaching limits

• **Generate Step**
  • Character generation completes successfully
  • Portrait generation works (or fails gracefully)
  • Generated character displays in tabs
  • Save to Library button functions
  • New Character button resets wizard

#### Interactive Chat System

• **Chat Initiation**
  • Chat button appears on character cards in library
  • "Start Chat" button works in character library modal
  • Direct navigation to `/chat/[characterId]` functions correctly
  • Chat page loads character data properly

• **Chat Interface**
  • Message input field accepts text up to 1000 characters
  • Character counter displays correctly
  • Send button enables/disables based on message content
  • Model selector dropdown functions
  • Clear chat button works with confirmation
  • Retry message button appears on errors

• **Conversation Flow**
  • Messages send successfully and appear in conversation
  • Character responses generate and display correctly
  • Loading states show during AI response generation
  • Response lengths vary appropriately based on input complexity
  • Conversation scrolls automatically to newest messages

• **Character Consistency**
  • AI maintains character personality throughout conversations
  • Character traits influence response style and content
  • Backstory elements appear in relevant responses

• **Conversation Persistence**
  • Conversations save automatically as messages are sent
  • Conversations persist across browser sessions
  • Multiple characters maintain separate conversation histories

• **Usage Integration**
  • Chat responses count against selected text model limits
  • Usage warnings appear when approaching monthly limits
  • Model selection can be changed mid-conversation

#### Portrait Editing System (NEW in v0.21.0)

• **Edit Interface Access**
  • "Edit Portrait" button appears in character edit page for characters with existing portraits
  • Button is disabled for characters without portraits
  • Model compatibility warning appears for unsupported models
  • Edit interface toggles correctly between portrait view and edit view

• **Edit Prompt Interface**
  • Text area accepts edit prompts up to model limits (32,000 for gpt-image-1, 1,000 for others)
  • Character counter displays correctly for selected model
  • Edit button enables/disables based on prompt content and model compatibility
  • Cancel button returns to portrait view correctly

• **Model Compatibility**
  • gpt-image-1 shows as fully supported for editing
  • dall-e-2 shows limited editing warning
  • dall-e-3 shows "not supported" warning
  • Model selector properly affects edit availability

• **Edit Processing**
  • Edit requests process correctly with valid prompts
  • Loading states show during editing process
  • Edited portraits appear when processing completes
  • Error messages appear for failed edits with specific guidance

• **Edit Results**
  • Edited portraits display correctly in character interface
  • Original portraits are preserved until save
  • Unsaved changes warning appears when navigating away
  • Save changes persists edited portraits

• **Usage Integration**
  • Portrait edits count against image model limits
  • Usage warnings appear when approaching monthly limits
  • Edit attempts blocked when limits exceeded

#### Advanced Trait Management (NEW in v0.21.0)

• **Additional Traits Display**
  • All additional traits display in organized layout with editable names and values
  • Title Case formatting applied consistently
  • Empty state shown when no additional traits exist
  • Trait display matches between character modal and edit page

• **Trait Addition**
  • "Add Custom Trait" creates editable trait entry
  • "Add Generated Trait" requests AI trait generation
  • Both options create properly formatted trait entries
  • New traits integrate with existing trait display

• **Trait Editing**
  • Trait names can be edited in-place
  • Trait values can be edited in-place
  • Changes persist when switching between fields
  • Edited traits maintain proper formatting

• **Trait Regeneration**
  • Each trait has individual regenerate button
  • Regenerate buttons work independently for each trait
  • Loading states show during trait regeneration
  • Regenerated traits replace existing values
  • Failed regenerations show appropriate error messages

• **Trait Management**
  • Delete buttons remove traits correctly
  • Trait removal updates display immediately
  • Multiple trait operations can be performed sequentially
  • Trait changes integrate with save/unsaved changes system

• **AI Integration**
  • Generated traits match character personality and background
  • Trait generation respects character context
  • Generated traits meet length and format requirements
  • Trait generation counts against text model usage limits

#### Character Library

• **Library Interface**
  • Character cards display correctly with chat buttons
  • Search functionality works
  • Filter by genre/sub-genre functions
  • Character viewer modal opens and displays data
  • Direct action buttons (chat, edit, delete, download) work

• **Enhanced Filtering (v0.18.0)**
  • Trait filtering dropdowns appear and function
  • Smart search with "category: value" syntax works
  • Filter panels are organized and collapsible
  • Automatic trait discovery creates appropriate filters
  • Combined filtering and search work together

• **Character Editing**
  • Edit page loads character data correctly
  • All character fields can be modified
  • Portrait upload/regeneration works
  • Portrait editing interface functions properly
  • Trait management interface works correctly
  • Add/remove quests functions
  • Add/remove dialogue lines works
  • Add/remove items works
  • Individual regeneration buttons work
  • Save changes persists modifications
  • Navigation back to library is immediate

#### Character Regeneration

• **Individual Attribute Regeneration**
  • Name regeneration works
  • Appearance regeneration works
  • Personality regeneration works
  • Backstory regeneration works
  • Model selection affects regeneration quality

• **Component Regeneration**
  • Quest title regeneration
  • Quest description regeneration
  • Quest reward regeneration
  • Full quest regeneration
  • Dialogue line regeneration
  • Item description regeneration

• **Portrait Regeneration**
  • Portrait regeneration with same model
  • Portrait regeneration with different models
  • Portrait options affect regeneration results
  • Loading states show during regeneration

### User Interface

#### Wizard Navigation

• Progress bar correctly shows current step
• Clicking progress bar steps navigates appropriately
• Continue/Back buttons work in all steps
• Sticky footer remains visible during scroll
• Welcome popup appears for first-time users

#### Form Controls

• All form inputs work correctly
• Form validation provides appropriate feedback
• Tab navigation functions correctly
• Expandable sections open and close properly
• Multi-select functionality for personality traits
• Searchable dropdowns filter correctly

#### Model Selection Interface

• Model tiers display correctly with indicators
• Usage limits show current status (50/30/10 text, 10/5/3 images)
• Model descriptions are accurate
• Selection persists across navigation

#### Responsive Design

• Desktop layout renders correctly
• Tablet layout adjusts appropriately
• Mobile layout is usable
• Touch interactions work on mobile devices
• Wizard steps adapt to screen size

### Data Management

#### IndexedDB Storage

• Characters save to library correctly
• Characters load from library correctly
• Character editing saves persist
• Portrait images store and retrieve properly
• Chat conversations save automatically
• Search index functions efficiently
• Database recovery handles corruption

#### Import/Export

• JSON export includes all character data
• JSON import adds characters to library
• Individual character downloads work
• Portrait downloads function correctly

### Usage Limits

• Standard tier shows 50 text/10 images correctly
• Enhanced tier tracks 30 text/5 images limit
• Premium tier tracks 10 text/3 images limit
• Chat responses count against text model limits
• Portrait editing counts against image model limits
• Usage persists across browser sessions
• Monthly reset functionality works
• Development mode bypasses limits

### Edge Cases

• Extremely long inputs are handled gracefully
• Special characters and Unicode are supported
• Very short descriptions still produce reasonable results
• Failure states are handled with appropriate messaging
• Network interruptions are handled gracefully
• Empty character library displays appropriately

## Test Environment Setup

To properly test NPC Forge, you should have:

1. Access to multiple browsers (Chrome, Firefox, Safari, Edge)
2. Mobile and tablet devices or emulators
3. A valid OpenAI API key for development
4. Different network conditions (good connection, throttled connection)

## Testing Specific Features

### Testing Portrait Editing System (NEW in v0.21.0)

**Model Compatibility Testing**:
• Test editing availability with each image model
• Verify gpt-image-1 shows full editing support
• Verify dall-e-2 shows limited editing warning
• Verify dall-e-3 shows no editing support

**Edit Prompt Testing**:
• Test various edit prompt types (color changes, accessories, clothing, expressions)
• Test extremely long prompts near model limits
• Test empty or invalid prompts
• Test prompts with special characters

**Edit Processing Testing**:
• Test successful edits with clear, specific prompts
• Test failed edits due to content policy
• Test network interruption during editing
• Test multiple sequential edits on same portrait

**Usage Integration Testing**:
• Verify edits count against image model limits
• Test editing when approaching usage limits
• Test editing when usage limits exceeded
• Verify usage warnings appear appropriately

### Testing Advanced Trait Management (NEW in v0.21.0)

**Trait Display Testing**:
• Verify all additional traits display correctly
• Test trait display consistency between modal and edit page
• Verify Title Case formatting applied consistently
• Test empty state when no additional traits exist

**Trait Generation Testing**:
• Test "Add Generated Trait" functionality
• Verify generated traits match character context
• Test trait generation with different character types
• Verify trait generation counts against text model usage

**Trait Editing Testing**:
• Test editing trait names and values
• Test adding custom traits manually
• Test removing traits individually
• Test multiple trait operations in sequence

**Trait Regeneration Testing**:
• Test individual trait regeneration buttons
• Verify regenerated traits maintain character consistency
• Test regeneration failures and error handling
• Verify regeneration counts against text model usage

### Testing the Interactive Chat System

**Character Consistency Testing**:
• Create characters with distinct personalities
• Verify responses match character traits and backstory
• Test with different character archetypes

**Conversation Flow Testing**:
• Test various input lengths and complexities
• Verify response length adaptation
• Test conversation continuity and context awareness

**Persistence Testing**:
• Start conversation, close browser, reopen and verify history
• Test multiple conversations with different characters
• Verify conversation isolation between characters

**Model Integration Testing**:
• Test conversations with all three model tiers
• Switch models mid-conversation and verify quality differences
• Test usage limit integration with chat responses

### Testing the Enhanced Filtering System (v0.18.0)

**Filter Creation Testing**:
• Create characters with various traits
• Verify filters automatically appear for new traits
• Test filter categorization and organization

**Search Functionality Testing**:
• Test general text search
• Test trait-specific search syntax (`category: value`)
• Test combined filtering and search

**Filter Panel Testing**:
• Test collapsible sections
• Verify filter organization by category
• Test filter clearing functionality

### Testing Model Selection

**Usage Limit Testing**:
• Generate characters with different model combinations
• Verify usage counts increment correctly (50/30/10 text, 10/5/3 images)
• Test chat usage counting against text model limits
• Test portrait editing usage counting against image model limits
• Test behavior when approaching limits
• Verify monthly reset functionality

**Model Quality Testing**:
• Compare outputs between model tiers
• Test mixed model selections

### Testing Character Regeneration

**Individual Regeneration**:
• Test each regeneration type separately
• Verify only selected elements change
• Test with different models
• Verify loading states and error handling

**Component Regeneration**:
• Test quest component regeneration
• Verify dialogue and item regeneration
• Test add/remove functionality with regeneration

## Manual Testing Procedure

1. **Preparation**
   • Start with a clean development environment
   • Ensure you have the latest code
   • Set up the `.env.local` file with your OpenAI API key
   • Clear browser cache and IndexedDB if testing storage

2. **Basic Wizard Testing**
   • Test the happy path (expected inputs and workflow)
   • Complete character creation with standard options
   • Save character to library
   • Verify outputs match expected results

3. **Advanced Feature Testing**
   • Test model selection variations
   • Test character regeneration features
   • Test library management operations
   • Test enhanced filtering system
   • Test chat system functionality
   • Test portrait editing functionality
   • Test trait management features
   • Test edge cases and error conditions

4. **Cross-browser Testing**
   • Verify functionality in Chrome, Firefox, Safari, and Edge
   • Check for rendering differences
   • Verify responsive breakpoints work across browsers

5. **Mobile Testing**
   • Test on actual mobile devices if possible
   • Verify touch interactions work
   • Ensure text is readable and forms are usable
   • Test in both portrait and landscape orientations

## Performance Testing

### Generation Performance

• Monitor character generation times across different models
• Test concurrent generation requests
• Verify API timeout handling

### Portrait Editing Performance

• Monitor portrait editing processing times
• Test multiple sequential edits
• Verify image size handling and optimization

### Library Performance

• Test library loading with large numbers of characters
• Monitor search and filtering performance with complex queries
• Verify IndexedDB operation efficiency

### UI Performance

• Test wizard navigation speed
• Monitor rendering performance on different devices
• Verify smooth animations and transitions

## Troubleshooting

### Generation Issues

• **Failed Generation**: Check internet connection, try simpler descriptions
• **Portrait Issues**: Reduce portrait specifications or try different art style
• **Unexpected Results**: Refine description or adjust trait selections

### Portrait Editing Issues

• **Edit Button Disabled**: Verify character has existing portrait and compatible model selected
• **Editing Failed**: Try simpler edit prompts, check usage limits, verify network connection
• **Poor Edit Results**: Use gpt-image-1 for best editing quality, try more specific prompts

### Trait Management Issues

• **Traits Not Generating**: Check text model usage limits, verify network connection
• **Traits Not Displaying**: Ensure traits meet length requirements, refresh character edit page
• **Regeneration Failed**: Check usage limits, try simpler trait concepts

### Library Issues

• **Characters not saving**: Check IndexedDB permissions and storage space
• **Slow loading**: Verify browser performance and clear cache if needed
• **Search not working**: Check for JavaScript errors in console

### Chat Issues

• **Chat not loading**: Verify character exists in library, check browser IndexedDB support
• **Messages not sending**: Check usage limits, verify network connection
• **Character responses inconsistent**: Try higher-tier models, verify character has detailed personality data

### Limit Issues

• **Reached Limit**: Wait for monthly reset or switch to Standard tier
• **Unexpected Usage**: Check which models are selected and their individual limits

### Filtering Issues

• **Missing Filters**: Ensure characters with those traits are saved to library
• **Search Not Working**: Check trait-specific search syntax
• **Slow Performance**: Test with smaller character collections

## Error Handling Testing

### Portrait Editing Error Handling

• **Model Compatibility Errors**: Test with unsupported models
• **Usage Limit Errors**: Test editing when limits exceeded
• **Network Errors**: Test editing with poor connectivity
• **Validation Errors**: Test with invalid prompts or missing data

### Trait Management Error Handling

• **Generation Failures**: Test when AI fails to generate appropriate traits
• **Usage Limit Errors**: Test trait generation when limits exceeded
• **Validation Errors**: Test with extremely long or inappropriate trait values

### Enhanced Error Handling (v0.20.1)

• **JSON Parsing**: Test with malformed API responses
• **Request Size**: Test with oversized character data
• **Network Timeouts**: Test with poor connectivity
• **IndexedDB Errors**: Test with corrupted storage

## Related Documentation

• [How to Use NPC Forge](/docs/how-to-use) - Complete user guide including portrait editing and trait management
• [Features Overview](/docs/features) - Complete feature list including latest additions
• [Character Library Guide](/docs/library) - Library management, trait management, and filtering features
• [API Documentation](/docs/api) - Technical implementation including portrait editing endpoint
• [Contributing Guidelines](/docs/contributing) - For contribution workflows