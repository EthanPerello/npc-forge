# NPC Forge

AI-powered character generator for games using OpenAI's models.

![NPC Forge Preview](https://via.placeholder.com/800x400?text=NPC+Forge+Preview)

## 🎮 [Try the Live Demo](https://npc-forge.vercel.app)

## 🎯 Project Overview

NPC Forge is an AI-powered character generator for games. It allows creators to quickly generate detailed non-playable characters (NPCs) from simple descriptions or genre templates. The tool uses OpenAI's models to create complete character profiles including name, appearance, personality, inventory, abilities, quests, dialogue, and an AI-generated portrait.

### Perfect For:
- Game developers needing quick character concepts
- Tabletop RPG players and game masters
- Creative writers looking for character inspiration
- Anyone building interactive worlds or stories

## 🚀 Features

- **Intuitive Interface**: Simple form for character generation
- **Genre Templates**: Quick-start options for Fantasy, Sci-Fi, Cyberpunk, Western, Modern, and Horror settings
- **AI-Generated Portraits**: Visual representation of characters using DALL-E 3
- **Comprehensive Profiles**: Detailed character information including:
  - Physical appearance
  - Personality traits
  - Special abilities
  - Inventory items
  - Character dialogue
  - Associated quests
- **Tabbed Interface**: Easy navigation between character profile and quest details
- **Export Options**: Download character data as JSON for use in your projects
- **Responsive Design**: Works on desktop and mobile devices

## 🔧 Technologies Used

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **AI Integration**: OpenAI API (GPT-4o-mini for text, DALL-E 3 for images)
- **Architecture**: Clean component separation, context-based state management
- **Deployment**: Vercel

## 🛠️ Development

### Prerequisites
- Node.js 18+
- OpenAI API key

### Setup
1. Clone the repository
   ```bash
   git clone https://github.com/EthanPerello/npc-forge.git
   cd npc-forge
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Create a `.env.local` file with your OpenAI API key
   ```
   OPENAI_API_KEY=your-api-key-here
   ```

4. Start the development server
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📋 Roadmap

- **Core Enhancements**
  - Improved UI components
  - Better state management
  - Enhanced error handling

- **Upcoming Features**
  - Dark/Light Mode Toggle
  - "Talk to NPC" chat interface
  - Character library for saving generated characters
  - Additional export formats (PDF, CSV)
  - Customization options for generated characters

---

Created by [Ethan Perello](https://github.com/EthanPerello)