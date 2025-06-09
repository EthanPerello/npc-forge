# Credits and Acknowledgements

NPC Forge has been made possible through the contributions, tools, and resources from many individuals and organizations. This document acknowledges all those who have helped make this project a reality.

## Core Development

NPC Forge was created and is maintained by:

**Ethan Perello** - Design, Development, Documentation
• GitHub: [EthanPerello](https://github.com/EthanPerello)
• Email: [ethanperello@gmail.com](mailto:ethanperello@gmail.com)

## AI Assistance

NPC Forge's development was significantly assisted by AI tools, particularly in the development of the interactive chat system and comprehensive documentation:

**Claude** (Anthropic) - Assisted with code generation, debugging, documentation writing, architectural design, and chat system implementation

**ChatGPT** (OpenAI) - Helped with code generation, problem-solving, and research

These AI assistants were instrumental in:

• Generating and refactoring code snippets
• Researching design patterns and project architecture
• Developing comprehensive documentation and user guides
• Troubleshooting complex issues and implementation challenges
• Creating UI component templates and responsive designs
• Implementing the chat system architecture and conversation management
• Optimizing IndexedDB integration and data persistence

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

• [OpenAI API](https://openai.com/api/) - For character and portrait generation
  • Text models: gpt-4o-mini, gpt-4.1-mini, gpt-4o
  • Image models: dall-e-2, dall-e-3, gpt-image-1

### Data Storage

• [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API) - Browser storage for characters and conversations
• Browser localStorage - For usage tracking and user preferences

## Character Generation

Character generation and chat functionality are powered by:

• **OpenAI** - Multiple models for text and image generation
• **Character Context System** - Custom prompts that maintain personality consistency
• **Dynamic Response System** - AI responses that adapt to conversation context
• **Usage Management** - Tiered model system with monthly limits

## Example Characters

The example characters showcased in the documentation were created using NPC Forge:

• **Elarion** - Fantasy High Wizard (Enhanced text, Standard image)
• **Kira-7** - Sci-Fi Cybernetic Character (Enhanced text and image)
• **Detective Miles Navarro** - Contemporary Mystery Character (Standard text, Enhanced image)

All character portraits were generated using NPC Forge's AI-powered portrait generation system with various model tiers to demonstrate quality differences.

## Open Source Libraries

NPC Forge relies on numerous open-source libraries and tools:

### Development and Build Tools

• **Vercel** - Hosting and deployment platform
• **ESLint** - Code quality and formatting
• **PostCSS** - CSS processing
• **Autoprefixer** - CSS vendor prefixing

### Browser APIs and Standards

• **IndexedDB** - Client-side database for character and chat storage
• **Web Storage API** - For usage tracking and preferences
• **File API** - For character import/export functionality
• **Intersection Observer API** - For performance optimizations

## Learning Resources

Development of NPC Forge was informed by these resources:

### Technical Documentation

• [Next.js Documentation](https://nextjs.org/docs) - App Router, API routes, and deployment
• [React Documentation](https://react.dev/) - Hooks, context, and component patterns
• [TypeScript Documentation](https://www.typescriptlang.org/docs/) - Type safety and interfaces
• [Tailwind CSS Documentation](https://tailwindcss.com/docs) - Utility classes and responsive design
• [OpenAI API Documentation](https://platform.openai.com/docs/) - Model integration and best practices

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
• **Keyboard Navigation** - Full functionality via keyboard
• **Screen Reader Support** - ARIA labels and proper markup
• **Color Contrast** - Meets WCAG guidelines in both light and dark modes
• **Responsive Design** - Works across devices and screen sizes

## License

NPC Forge is licensed under the MIT License - see the [LICENSE](/docs/license) file for details.

## Data and Privacy

### Content Ownership

• Generated characters and conversations belong to the user
• No user data is collected or stored on external servers
• All character and chat data remains in local browser storage

### Third-Party Services

• OpenAI API services are subject to [OpenAI's Terms of Use](https://openai.com/policies/terms-of-use)
• Character inputs are sent to OpenAI for generation but not stored by NPC Forge
• Conversation data remains entirely local to the user's browser

## Special Thanks

Special thanks to:

• **The Open Source Community** - For creating and maintaining the libraries and tools that make this project possible
• **Beta Testers and Early Users** - For providing valuable feedback and bug reports
• **The TTRPG Community** - For inspiration and understanding of character creation needs
• **Game Developers** - For insights into NPC design and implementation requirements
• **Documentation Contributors** - For helping improve guides and examples
• **Accessibility Advocates** - For ensuring the application is usable by everyone

## Future Acknowledgments

We recognize that this project will continue to grow with community contributions. If you've contributed to NPC Forge and aren't listed here, please contact us to be added.

## Support and Feedback

This project wouldn't be possible without user feedback and community support. We appreciate:

• GitHub issue reports and feature requests
• Documentation improvements and corrections
• Community discussions and suggestions
• Word-of-mouth sharing and recommendations

---

*This project stands on the shoulders of giants in the open source community and would not be possible without the collective effort of countless developers, designers, and creators who have shared their work freely with the world.*

## Contact

For questions about credits or to report missing acknowledgments, contact [ethanperello@gmail.com](mailto:ethanperello@gmail.com).

## Related Documentation

• [License Information](/docs/license) - For detailed license terms
• [Contributing Guidelines](/docs/contributing) - For contribution acknowledgment process
• [Security Documentation](/docs/security) - For security-related acknowledgments