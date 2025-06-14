# NPC Forge

![Site Header](public/images/site-header.png)

NPC Forge is an AI-powered character generator for games, tabletop RPGs, and storytelling. Create detailed NPCs with personalities, quests, dialogue, items, and AI-generated portraits. Features interactive conversations with your characters and advanced portrait editing capabilities!

[![Version](https://img.shields.io/badge/version-0.22.0-blue.svg)](https://github.com/EthanPerello/npc-forge/releases)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/built%20with-Next.js%2014-black)](https://nextjs.org/)

## ✨ Features

- **AI-Powered Character Generation**: Create detailed NPCs with unique personalities, backgrounds, and traits
- **Interactive Chat System**: Have conversations with your generated characters
- **Portrait Editing**: Edit character portraits with AI-powered text prompts
- **Advanced Trait Management**: Generate and customize character traits with AI assistance
- **Comprehensive Library**: Store, organize, and filter your character collection
- **Multiple AI Models**: Choose from different AI model tiers for optimal quality and usage
- **Export & Import**: Save characters as JSON for external use
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🚀 Quick Start

1. Clone the repository:
   ```bash
   git clone https://github.com/EthanPerello/npc-forge.git
   cd npc-forge
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file:
   ```
   OPENAI_API_KEY=your-api-key-here
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## 🔧 Model Selection

| Tier | Text Model | Image Model | Monthly Limit |
|------|------------|-------------|---------------|
| 🟢 Standard | gpt-4o-mini | dall-e-2 | 50 text / 10 images |
| 🟡 Enhanced | gpt-4.1-mini | dall-e-3 | 30 text / 5 images |
| 🔴 Premium | gpt-4o | gpt-image-1 | 10 text / 3 images |

*Note: Chat conversations and portrait editing count against your selected model limits*

## 📖 Documentation

Comprehensive documentation is available at `/docs` including:

- **[How to Use](/docs/how-to-use)** - Complete user guide with chat and editing features
- **[Character Examples](/docs/character-examples)** - Sample characters and use cases  
- **[Character Library](/docs/library)** - Library management and advanced filtering
- **[Chat with Characters](/docs/chat)** - Interactive conversation guide
- **[Model Selection](/docs/models)** - Understanding AI model tiers
- **[Generation Options](/docs/generation-options)** - Detailed customization guide
- **[Features Overview](/docs/features)** - Complete feature list including latest additions
- **[API Documentation](/docs/api)** - Technical API reference
- **[Development Setup](/docs/dev-setup)** - Local development guide
- **[Contributing](/docs/contributing)** - How to contribute
- **[FAQ](/docs/faq)** - Frequently asked questions

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👏 Credits

- Created by [Ethan Perello](https://github.com/EthanPerello)
- Character generation powered by [OpenAI API](https://openai.com/)
- Built with [Next.js](https://nextjs.org/) and [Tailwind CSS](https://tailwindcss.com/)
- Icons by [Lucide](https://lucide.dev/)

## 🤝 Contributing

For bug reports, feature requests, or questions, please [open an issue](https://github.com/EthanPerello/npc-forge/issues).

For development contributions, see our [Contributing Guide](/docs/contributing).

## 📞 Contact

For questions or feedback, contact Ethan Perello at [ethanperello@gmail.com](mailto:ethanperello@gmail.com).