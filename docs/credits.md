# Credits and Acknowledgements

NPC Forge has been made possible through the contributions, tools, and resources from many individuals and organizations. This document acknowledges all those who have helped make this project a reality.

## Core Development

NPC Forge was created and is maintained by:

**Ethan Perello** - Design, Development, Documentation
• GitHub: [EthanPerello](https://github.com/EthanPerello)
• Email: [ethanperello@gmail.com](mailto:ethanperello@gmail.com)

## AI Assistance

NPC Forge's development was significantly assisted by AI tools, particularly in the development of the interactive chat system, portrait editing features, trait management capabilities, and comprehensive documentation:

**Claude** (Anthropic) - Assisted with code generation, debugging, documentation writing, architectural design, chat system implementation, portrait editing system design, and trait management features

**ChatGPT** (OpenAI) - Helped with code generation, problem-solving, and research

These AI assistants were instrumental in:

• Generating and refactoring code snippets for core functionality
• Researching design patterns and project architecture
• Developing comprehensive documentation and user guides
• Troubleshooting complex issues and implementation challenges
• Creating UI component templates and responsive designs
• Implementing the chat system architecture and conversation management
• Optimizing IndexedDB integration and data persistence
• **Designing and implementing the portrait editing system with OpenAI's image editing API**
• **Creating the trait management interface and AI integration**
• **Developing error handling and user feedback systems for new features**
• **Implementing usage tracking and limit management for new capabilities**

All AI-generated content was thoroughly reviewed, tested, and customized to ensure quality, security, and alignment with project goals.

## Technologies

NPC Forge is built on these primary technologies:

### Core Framework

• [Next.js](https://nextjs.org/) - React framework for production
• [React](https://react.dev/) - UI library for building user interfaces
• [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript superset

### Styling and UI

• [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
• [Lucide Icons](https://lucide.dev/) - Beautiful and consistent icon library

### AI and Generation

• [OpenAI API](https://openai.com/api/) - For character and portrait generation, chat conversations, and portrait editing
  • Text models: gpt-4o-mini, gpt-4.1-mini, gpt-4o
  • Image models: dall-e-2, dall-e-3, gpt-image-1
  • **Image editing API**: `/v1/images/edits` for portrait modifications
  • **Chat completions API**: For character conversations and trait generation

### Data Storage

• [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API) - Browser storage for characters, conversations, and portraits
• Browser localStorage - For usage tracking and user preferences

## Character Generation and Enhancement

Character generation, chat functionality, portrait editing, and trait management are powered by:

• **OpenAI** - Multiple models for text and image generation and editing
• **Character Context System** - Custom prompts that maintain personality consistency
• **Dynamic Response System** - AI responses that adapt to conversation context
• **Portrait Editing System** - AI-powered image modifications using text prompts
• **Trait Management System** - AI-powered trait generation and regeneration
• **Usage Management** - Tiered model system with monthly limits

## Example Characters

The example characters showcased in the documentation were created using NPC Forge:

• **Elarion** - Fantasy High Elf Wizard (Enhanced text, Enhanced image, edited for magical elements)
• **Kira-7** - Sci-Fi Cybernetic Character (Enhanced text and image, edited for cybernetic enhancements)
• **Detective Miles Navarro** - Contemporary Mystery Character (Standard text, Enhanced image, edited for professional details)

All character portraits were generated using NPC Forge's AI-powered portrait generation system with various model tiers to demonstrate quality differences, and subsequently enhanced using the portrait editing system to showcase advanced customization capabilities.

## Open Source Libraries

NPC Forge relies on numerous open-source libraries and tools:

### Development and Build Tools

• **Vercel** - Hosting and deployment platform
• **ESLint** - Code quality and formatting
• **PostCSS** - CSS processing
• **Autoprefixer** - CSS vendor prefixing

### Browser APIs and Standards

• **IndexedDB** - Client-side database for character, chat, and portrait storage
• **Web Storage API** - For usage tracking and preferences
• **File API** - For character import/export functionality
• **Intersection Observer API** - For performance optimizations
• **Canvas API** - For image processing and portrait editing workflows

## Learning Resources

Development of NPC Forge was informed by these resources:

### Technical Documentation

• [Next.js Documentation](https://nextjs.org/docs) - App Router, API routes, and deployment
• [React Documentation](https://react.dev/) - Hooks, context, and component patterns
• [TypeScript Documentation](https://www.typescriptlang.org/docs/) - Type safety and interfaces
• [Tailwind CSS Documentation](https://tailwindcss.com/docs) - Utility classes and responsive design
• [OpenAI API Documentation](https://platform.openai.com/docs/) - Model integration, chat completions, and image editing best practices
• **[OpenAI Images API Documentation](https://platform.openai.com/docs/api-reference/images)** - Image generation and editing capabilities

### Design and UX Resources

• [MDN Web Docs](https://developer.mozilla.org/) - Web standards and browser APIs
• [React Accessibility Guidelines](https://react.dev/learn/accessibility) - Inclusive design practices
• [Web Content Accessibility Guidelines (WCAG)](https://www.w3.org/WAG/) - Accessibility standards

## Community and Inspiration

### Open Source Community

• The broader React and Next.js communities for sharing knowledge and best practices
• The TypeScript community for type safety patterns and conventions
• The Tailwind CSS community for design system approaches

### Gaming and TTRPG Communities

• Tabletop RPG communities for inspiration on character creation needs
• Game development communities for understanding NPC design requirements
• Storytelling communities for narrative structure and character development insights

## Version History Contributors

### v0.21.0: Portrait Editing & Advanced Trait Management

• **Portrait editing interface** design and implementation with OpenAI image editing API integration
• **Advanced trait management system** with AI-powered trait generation and individual regeneration
• **Enhanced user experience** with improved trait display and immediate library navigation
• **Comprehensive error handling** for new portrait editing and trait management features

### v0.20.1: API Reliability & System Stability

• **Enhanced JSON parsing** with multiple fallback strategies for improved reliability
• **Automatic retry logic** for IndexedDB operations and API calls
• **Request validation** and payload cleaning to prevent API errors
• **Error categorization** improvements for better user feedback

### v0.20.0: Interactive Chat System

• Chat interface design and implementation
• Character-aware AI conversation system
• IndexedDB chat storage and persistence
• Dynamic response length optimization
• Usage tracking integration for chat features

### v0.19.0: Documentation System Overhaul

• Automatic markdown content loading system
• Enhanced visual hierarchy and professional styling
• Cross-reference navigation system
• Comprehensive user and developer guides

### v0.18.0: Enhanced Filtering System

• Comprehensive trait filtering with automatic discovery
• Smart search with category syntax support
• Organized filter panel with collapsible sections
• Enhanced trait display with category prefixes

### Earlier Versions (v0.1.0 - v0.17.0)

• Core character generation wizard implementation
• AI model integration and tiered system
• Character library with IndexedDB storage
• Portrait generation and customization
• Character regeneration capabilities
• Dark mode and responsive design
• Import/export functionality

## Accessibility

NPC Forge strives to be accessible to all users:

• **Semantic HTML** - Proper heading structure and element usage
• **Keyboard Navigation** - Full functionality via keyboard including new editing features
• **Screen Reader Support** - ARIA labels and proper markup for all interfaces
• **Color Contrast** - Meets WCAG guidelines in both light and dark modes
• **Responsive Design** - Works across devices and screen sizes
• **Form Accessibility** - Proper labeling and validation for portrait editing and trait management forms

## License

NPC Forge is licensed under the MIT License - see the [LICENSE](/docs/license) file for details.

## Data and Privacy

### Content Ownership

• Generated characters, conversations, and edited portraits belong to the user
• No user data is collected or stored on external servers
• All character, chat, and portrait data remains in local browser storage

### Third-Party Services

• OpenAI API services are subject to [OpenAI's Terms of Use](https://openai.com/policies/terms-of-use)
• Character inputs and chat messages are sent to OpenAI for generation but not stored by NPC Forge
• **Portrait editing requests are processed by OpenAI's image editing API but not stored by NPC Forge**
• Conversation and portrait data remains entirely local to the user's browser

## Special Thanks

Special thanks to:

• **The Open Source Community** - For creating and maintaining the libraries and tools that make this project possible
• **Beta Testers and Early Users** - For providing valuable feedback and bug reports, especially for portrait editing and trait management features
• **The TTRPG Community** - For inspiration and understanding of character creation and enhancement needs
• **Game Developers** - For insights into NPC design, visual consistency, and implementation requirements
• **Documentation Contributors** - For helping improve guides and examples including new feature documentation
• **Accessibility Advocates** - For ensuring the application is usable by everyone, including new interface elements
• **AI Research Community** - For advancing the technologies that enable portrait editing, trait generation, and conversational AI

## Future Acknowledgments

We recognize that this project will continue to grow with community contributions. If you've contributed to NPC Forge and aren't listed here, please contact us to be added.

## Support and Feedback

This project wouldn't be possible without user feedback and community support. We appreciate:

• GitHub issue reports and feature requests including feedback on new features
• Documentation improvements and corrections
• Community discussions and suggestions about portrait editing and trait management
• Word-of-mouth sharing and recommendations

---

*This project stands on the shoulders of giants in the open source community and would not be possible without the collective effort of countless developers, designers, and creators who have shared their work freely with the world. The addition of advanced AI capabilities for portrait editing and trait management represents the continued evolution of accessible creative tools.*

## Contact

For questions about credits or to report missing acknowledgments, contact [ethanperello@gmail.com](mailto:ethanperello@gmail.com).

## Related Documentation

• [License Information](/docs/license) - For detailed license terms
• [Contributing Guidelines](/docs/contributing) - For contribution acknowledgment process
• [Security Documentation](/docs/security) - For security-related acknowledgments