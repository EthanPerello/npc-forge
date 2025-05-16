# NPC Forge

![Site Header](/public/images/site-header.png)

NPC Forge is an AI-powered character generator for games, tabletop RPGs, and storytelling. Create detailed NPCs with personalities, quests, dialogue, items, and AI-generated portraits.

[![Version](https://img.shields.io/badge/version-0.13.1-blue.svg)](https://github.com/EthanPerello/npc-forge/releases)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/built%20with-Next.js%2014-black)](https://nextjs.org/)
[![OpenAI](https://img.shields.io/badge/powered%20by-OpenAI-lightgrey)](https://openai.com/)

## 🚀 Live Demo

Try NPC Forge live at: [https://npc-forge-ethan-perellos-projects.vercel.app/](https://npc-forge-ethan-perellos-projects.vercel.app/)

## ✨ Features

- **Wizard-Based Character Creation**: Step-by-step guided process with progress tracking
- **Character Library**: Save, manage, edit, and organize your NPCs with full CRUD operations
- **AI-Powered Generation**: Create detailed NPCs from simple descriptions or genre templates
- **Multiple AI Models**: Choose from Standard, Enhanced, and Premium tiers for text and images
- **Character Regeneration**: Regenerate individual character attributes, portraits, quests, dialogue, and items
- **AI Portraits**: Generate customizable portraits with multiple styles, moods, and framing options
- **Complete Character Profiles**: 
  - Appearance & personality descriptions
  - Backstory hooks & special abilities
  - Customizable quests with rewards
  - Character-specific dialogue lines
  - Item inventories with rarity options
- **Advanced Customization**: Extensive options including:
  - 4 genres and 16 sub-genres
  - Physical traits, background elements, and personality characteristics
  - Quest types, dialogue tones, and item categories
- **Import/Export**: JSON import/export for character data
- **Dark Mode**: Full dark mode support with persistent preferences
- **Responsive Design**: Works seamlessly on desktop and mobile

## 🔄 New in v0.13.0: Wizard Interface

![Character Creation Wizard](https://via.placeholder.com/800x400/6366f1/ffffff?text=Character+Creation+Wizard)

- **Step-by-Step Creation**: Concept → Options → Model → Generate
- **Progress Tracking**: Sticky progress bar with clickable navigation
- **Quick Generation**: Generate Random Character button for instant results
- **Welcome Guide**: Introduction popup for first-time users

## 📚 Character Library

![Character Library](/public/images/character-library.png)

- Save unlimited characters to your browser storage
- Edit existing characters or create variations
- Search and filter your collection
- Direct action buttons on character cards
- JSON import/export functionality
- Example characters included

## 📋 Documentation

For comprehensive guides and documentation, check out:

- [How to Use NPC Forge](/docs/how-to-use) - Step-by-step guide with the new wizard interface
- [Character Examples](/docs/character-examples) - Sample characters across different genres
- [Features Overview](/docs/features) - Complete list of available features
- [Character Library Guide](/docs/library) - Managing and editing your characters
- [Generation Options](/docs/generation-options) - Detailed breakdown of all settings
- [Model Selection](/docs/models) - Understanding the tier system and model options
- [FAQ](/docs/faq) - Answers to common questions
- [Roadmap](/docs/roadmap) - Future development plans

## 🛠️ Installation & Development

### Prerequisites

- Node.js 18+
- OpenAI API key (for development)

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/EthanPerello/npc-forge.git
   cd npc-forge
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file with your OpenAI API key:
   ```
   OPENAI_API_KEY=your-api-key-here
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

For more detailed developer documentation, see [Dev Setup](/docs/dev-setup).

## 🏗️ Project Architecture

NPC Forge is built with:

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **OpenAI API** - Multiple models for text and image generation
- **IndexedDB** - Local storage for character library and portraits
- **Lucide Icons** - SVG icon components

For more details, check out the [Architecture Documentation](/docs/architecture).

## 🔧 Model Selection

NPC Forge offers tiered model options:

| Tier | Text Model | Image Model | Usage Limit |
|------|------------|-------------|-------------|
| 🟢 Standard | gpt-4o-mini | dall-e-2 | Unlimited |
| 🟡 Enhanced | gpt-4.1-mini | dall-e-3 | 30/month |
| 🔴 Premium | gpt-4o | gpt-image-1 | 10/month |

## 📊 Usage Limits

- **Standard Tier**: Unlimited generations
- **Enhanced Tier**: 30 generations per month
- **Premium Tier**: 10 generations per month
- Limits reset monthly and apply per device

## 🔗 Related Projects

- [Ethan Perello's Portfolio](https://github.com/EthanPerello/ethanperello.github.io) - View more projects by the creator

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👏 Credits

- Created by [Ethan Perello](https://github.com/EthanPerello)
- Character generation powered by [OpenAI API](https://openai.com/)
- Built with [Next.js](https://nextjs.org/) and [Tailwind CSS](https://tailwindcss.com/)
- Icons by [Lucide](https://lucide.dev/)

This project was developed with assistance from AI tools including Claude and ChatGPT, which helped with code generation, debugging, and documentation.

## 🤝 Contributing

Contributions are welcome! Please check out the [Contributing Guidelines](/docs/contributing) before getting started.

For bug reports, feature requests, or questions, please [open an issue](https://github.com/EthanPerello/npc-forge/issues).

## 📞 Contact

For questions or feedback, contact Ethan Perello at [ethanperello@gmail.com](mailto:ethanperello@gmail.com).