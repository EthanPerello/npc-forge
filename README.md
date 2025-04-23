# NPC Forge

![Site Header](/public/images/site-header.png)

NPC Forge is an AI-powered character generator for games, tabletop RPGs, and storytelling. Create detailed NPCs with personalities, quests, dialogue, items, and AI-generated portraits.

[![Version](https://img.shields.io/badge/version-0.2.0-blue.svg)](https://github.com/EthanPerello/npc-forge/releases)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/built%20with-Next.js%2015-black)](https://nextjs.org/)
[![OpenAI](https://img.shields.io/badge/powered%20by-OpenAI-lightgrey)](https://openai.com/)

## 🚀 Live Demo

Try NPC Forge live at: [https://npc-forge-ethan-perellos-projects.vercel.app/](https://npc-forge-ethan-perellos-projects.vercel.app/)

## ✨ Features

- Create detailed NPCs from simple descriptions or genre templates
- Generate AI portraits with customizable style, mood, and framing
- Build complete character profiles with:
  - Appearance & personality descriptions
  - Backstory hooks & special abilities
  - Customizable quests with rewards
  - Character-specific dialogue lines
  - Item inventories with rarity options
- Customize using an extensive set of options:
  - Choose from 4 genres and 16 sub-genres
  - Set traits like gender, age, alignment, and more
  - Specify physical attributes and background elements
  - Select personality traits
- Export characters as JSON for use in your projects
- Responsive design works on desktop and mobile

![NPC Forge Screenshot](/public/images/character-tab-results.png)

## 📋 Documentation

For comprehensive guides and documentation, check out:

- [How to Use NPC Forge](/docs/how-to-use.md) - Step-by-step guide to creating characters
- [Character Examples](/docs/character-examples.md) - Sample characters across different genres
- [Features Overview](/docs/features.md) - Complete list of available features
- [Generation Options](/docs/generation-options.md) - Detailed breakdown of customization options
- [FAQ](/docs/faq.md) - Answers to common questions
- [Roadmap](/docs/roadmap.md) - Future development plans

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

For more detailed developer documentation, see [Dev Setup](/docs/dev-setup.md).

## 🏗️ Project Architecture

NPC Forge is built with:

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **OpenAI API** - GPT-4o-mini for text generation, DALL-E 3 for images
- **Lucide Icons** - SVG icon components

For more details, check out the [Architecture Documentation](/docs/architecture.md).

## 📊 Usage Limits

NPC Forge has a limit of 15 character generations per month per device to manage API costs. This applies to the hosted version only. If you run your own instance with your API key, you can set your own limits.

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

Contributions are welcome! Please check out the [Contributing Guidelines](/docs/contributing.md) before getting started.

For bug reports, feature requests, or questions, please [open an issue](https://github.com/EthanPerello/npc-forge/issues).

## 📞 Contact

For questions or feedback, contact Ethan Perello at [ethanperello@gmail.com](mailto:ethanperello@gmail.com).