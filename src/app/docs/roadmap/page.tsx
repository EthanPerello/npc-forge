import React from 'react';
import Link from 'next/link';

export default function RoadmapPage() {
  return (
    <div className="prose prose-blue dark:prose-invert max-w-none px-6 py-8">

      {/* Page Title */}
      <h1 className="text-4xl font-extrabold mb-4">Development Roadmap</h1>
      <p className="lead text-lg text-gray-600 dark:text-gray-300 mb-8">
        This document outlines the planned development trajectory for NPC Forge, including upcoming features,
        improvements, and long-term vision.
      </p>

      {/* Current Version */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-indigo-700 dark:text-indigo-400 mb-4">
          Current Version: v0.2.0
        </h2>
        <p className="mb-4">
          The current version (v0.2.0) includes:
        </p>
        <ul className="list-disc pl-6 space-y-1 text-gray-700 dark:text-gray-300">
          <li>Complete character generation engine</li>
          <li>AI portrait generation</li>
          <li>Genre and sub-genre templates</li>
          <li>Advanced character customization options</li>
          <li>Quest, dialogue, and item generation</li>
          <li>JSON export</li>
          <li>Usage limits and tracking</li>
          <li>Mobile-responsive design</li>
          <li>Welcome guide for new users</li>
          <li>Complete documentation</li>
        </ul>
      </section>

      {/* Short-Term Roadmap */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-indigo-700 dark:text-indigo-400 mb-4">
          Short-Term Roadmap (Next 1–3 Months)
        </h2>

        {/* Version 0.3.0 */}
        <div className="mb-8 bg-white p-6 rounded-lg shadow border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
          <h3 className="text-xl font-semibold text-indigo-700 dark:text-indigo-400 mb-2">
            Version 0.3.0: Character Library
          </h3>
          <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full dark:bg-blue-900/30 dark:text-blue-300 mb-4">
            High Priority
          </span>
          <p className="mb-2"><strong>Goals</strong>: Character management and storage</p>
          <p className="font-medium mb-2">Planned Features:</p>
          <ul className="list-disc pl-6 space-y-1 text-gray-700 dark:text-gray-300 mb-4">
            <li>Save/load characters from localStorage</li>
            <li>Library UI for browsing saved characters</li>
            <li>Character categorization and tagging</li>
            <li>Edit character metadata</li>
            <li>Delete and duplicate characters</li>
            <li>Export to additional formats (PDF)</li>
            <li>Character thumbnails in library view</li>
          </ul>
          <p><strong>Target Release</strong>: May 2025</p>
        </div>

        {/* Version 0.4.0 */}
        <div className="mb-8 bg-white p-6 rounded-lg shadow border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
          <h3 className="text-xl font-semibold text-indigo-700 dark:text-indigo-400 mb-2">
            Version 0.4.0: “Talk to NPC”
          </h3>
          <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full dark:bg-blue-900/30 dark:text-blue-300 mb-4">
            High Priority
          </span>
          <p className="mb-2"><strong>Goals</strong>: Interactive character conversations</p>
          <p className="font-medium mb-2">Planned Features:</p>
          <ul className="list-disc pl-6 space-y-1 text-gray-700 dark:text-gray-300 mb-4">
            <li>Chat interface for generated characters</li>
            <li>AI responses based on character personality</li>
            <li>Conversation history saving</li>
            <li>Context-aware dialogue generation</li>
            <li>In-character answers to player questions</li>
            <li>Emotion indicators for dialogue</li>
            <li>Optional voice read-out (text-to-speech)</li>
          </ul>
          <p><strong>Target Release</strong>: June 2025</p>
        </div>

        {/* Version 0.5.0 */}
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
            Version 0.5.0: Enhanced Portraits
          </h3>
          <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full dark:bg-gray-700 dark:text-gray-300 mb-4">
            Medium Priority
          </span>
          <p className="mb-2"><strong>Goals</strong>: Better visual character representations</p>
          <p className="font-medium mb-2">Planned Features:</p>
          <ul className="list-disc pl-6 space-y-1 text-gray-700 dark:text-gray-300">
            <li>Multiple portrait generation options</li>
            <li>Alternative pose/expression options</li>
            <li>Character editing from portrait feedback</li>
            <li>Portrait style consistency improvements</li>
            <li>Portrait regeneration without full character regeneration</li>
            <li>Portrait gallery for each character</li>
          </ul>
          <p className="mt-4"><strong>Target Release</strong>: July 2025</p>
        </div>
      </section>

      {/* Medium-Term Roadmap */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-indigo-700 dark:text-indigo-400 mb-4">
          Medium-Term Roadmap (3–6 Months)
        </h2>

        {/* Version 0.6.0 */}
        <div className="mb-8 bg-white p-6 rounded-lg shadow border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
          <h3 className="text-xl font-semibold text-indigo-700 dark:text-indigo-400 mb-2">
            Version 0.6.0: Game Integration
          </h3>
          <p className="mb-2"><strong>Goals</strong>: Make characters usable in game development</p>
          <p className="font-medium mb-2">Planned Features:</p>
          <ul className="list-disc pl-6 space-y-1 text-gray-700 dark:text-gray-300 mb-4">
            <li>Export formats for Unity, Unreal Engine</li>
            <li>Game system stat blocks (D&D 5e, Pathfinder, etc.)</li>
            <li>Character sheets for tabletop RPGs</li>
            <li>Integration guides for popular game platforms</li>
            <li>Ready-to-use character prefabs</li>
          </ul>
          <p><strong>Target Release</strong>: August 2025</p>
        </div>

        {/* Version 0.7.0 */}
        <div className="mb-8 bg-white p-6 rounded-lg shadow border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
          <h3 className="text-xl font-semibold text-indigo-700 dark:text-indigo-400 mb-2">
            Version 0.7.0: Character Sets & Relationships
          </h3>
          <p className="mb-2"><strong>Goals</strong>: Generate interconnected characters</p>
          <p className="font-medium mb-2">Planned Features:</p>
          <ul className="list-disc pl-6 space-y-1 text-gray-700 dark:text-gray-300 mb-4">
            <li>Generate multiple related characters</li>
            <li>Define relationship types between characters</li>
            <li>Family trees and organization charts</li>
            <li>Faction and group generation</li>
            <li>Visualization of character relationships</li>
            <li>Shared backstory elements</li>
          </ul>
          <p><strong>Target Release</strong>: September 2025</p>
        </div>

        {/* Version 0.8.0 */}
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
          <h3 className="text-xl font-semibold text-indigo-700 dark:text-indigo-400 mb-2">
            Version 0.8.0: World Context
          </h3>
          <p className="mb-2"><strong>Goals</strong>: Place characters in coherent settings</p>
          <p className="font-medium mb-2">Planned Features:</p>
          <ul className="list-disc pl-6 space-y-1 text-gray-700 dark:text-gray-300">
            <li>Setting/world generation</li>
            <li>Location descriptions and maps</li>
            <li>Cultural context for characters</li>
            <li>Regional traits and customs</li>
            <li>Historical events affecting characters</li>
            <li>Environment-appropriate gear and abilities</li>
          </ul>
          <p className="mt-4"><strong>Target Release</strong>: October 2025</p>
        </div>
      </section>

      {/* Long-Term Roadmap */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-indigo-700 dark:text-indigo-400 mb-4">
          Long-Term Roadmap (6+ Months)
        </h2>

        {/* Version 0.9.0 */}
        <div className="mb-8 bg-white p-6 rounded-lg shadow border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
          <h3 className="text-xl font-semibold text-indigo-700 dark:text-indigo-400 mb-2">
            Version 0.9.0: Community Features
          </h3>
          <p className="mb-2"><strong>Goals</strong>: Enable sharing and collaboration</p>
          <p className="font-medium mb-2">Planned Features:</p>
          <ul className="list-disc pl-6 space-y-1 text-gray-700 dark:text-gray-300">
            <li>Optional accounts system</li>
            <li>Character sharing and embedding</li>
            <li>Community ratings and favorites</li>
            <li>Template sharing</li>
            <li>Featured characters gallery</li>
            <li>Attribution and credits system</li>
          </ul>
          <p className="mt-4"><strong>Target Release</strong>: November 2025</p>
        </div>

        {/* Version 1.0.0 */}
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
          <h3 className="text-xl font-semibold text-indigo-700 dark:text-indigo-400 mb-2">
            Version 1.0.0: Full Release
          </h3>
          <p className="mb-2"><strong>Goals</strong>: Polished, production-ready application</p>
          <p className="font-medium mb-2">Planned Features:</p>
          <ul className="list-disc pl-6 space-y-1 text-gray-700 dark:text-gray-300">
            <li>Comprehensive validation and testing</li>
            <li>Performance optimization</li>
            <li>Accessibility improvements</li>
            <li>Enhanced documentation</li>
            <li>Tutorial system</li>
            <li>Professional account options</li>
            <li>API for developers</li>
          </ul>
          <p className="mt-4"><strong>Target Release</strong>: Q1 2026</p>
        </div>
      </section>

      {/* Potential Future Features */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-indigo-700 dark:text-indigo-400 mb-4">
          Potential Future Features
        </h2>
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          These features are under consideration but not yet scheduled:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-5 rounded-lg shadow border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <h3 className="text-lg font-bold text-indigo-700 dark:text-indigo-400 mb-2">Character Enhancements</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Voice generation for dialogue lines</li>
              <li>Animation capabilities for portraits</li>
              <li>3D character model generation</li>
              <li>Character development over time (aging, experience)</li>
              <li>Alternate reality versions of characters</li>
            </ul>
          </div>
          <div className="bg-white p-5 rounded-lg shadow border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <h3 className="text-lg font-bold text-indigo-700 dark:text-indigo-400 mb-2">World Building</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Location generation with AI images</li>
              <li>Map creation tools</li>
              <li>Timeline generation for events</li>
              <li>Culture and religion generation</li>
              <li>Language creation tools</li>
            </ul>
          </div>
          <div className="bg-white p-5 rounded-lg shadow border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <h3 className="text-lg font-bold text-indigo-700 dark:text-indigo-400 mb-2">Game Integration</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Direct plugins for Unity, Unreal Engine</li>
              <li>VTT (Virtual Tabletop) integration</li>
              <li>Game dialogue system exports</li>
              <li>AI narrator mode for game masters</li>
              <li>Encounter generation with NPCs</li>
            </ul>
          </div>
          <div className="bg-white p-5 rounded-lg shadow border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <h3 className="text-lg font-bold text-indigo-700 dark:text-indigo-400 mb-2">Technical Improvements</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Offline mode with local AI models</li>
              <li>PWA enhancements</li>
              <li>Mobile apps for iOS and Android</li>
              <li>Voice command interface</li>
              <li>AR/VR character visualization</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Feature Voting & Feedback */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-indigo-700 dark:text-indigo-400 mb-4">
          Feature Voting & Feedback
        </h2>
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          In the future, users will be able to vote on feature priorities through:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300 mb-6">
          <li>GitHub Discussions</li>
          <li>In-app feedback forms</li>
          <li>Community surveys</li>
        </ul>
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          Development priorities consider:
        </p>
        <ol className="list-decimal pl-6 space-y-2 text-gray-700 dark:text-gray-300">
          <li>User impact (how many users benefit)</li>
          <li>Technical feasibility</li>
          <li>Development effort required</li>
          <li>Strategic alignment with project goals</li>
        </ol>
        <div className="mt-6 p-4 bg-indigo-50 rounded-lg dark:bg-indigo-900/30">
          <h3 className="text-lg font-bold text-indigo-700 dark:text-indigo-400 mb-2">Provide Feedback</h3>
          <p className="text-gray-700 dark:text-gray-300 mb-2">
            To provide feedback on the roadmap or suggest new features:
          </p>
          <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300">
            <li>
              <Link href="https://github.com/EthanPerello/npc-forge/issues" className="underline">
                Open issues on GitHub
              </Link>
            </li>
            <li>
              <Link href="mailto:ethanperello@gmail.com" className="underline">
                Contact the developer
              </Link>
            </li>
          </ul>
        </div>
      </section>

      {/* Footer */}
      <div className="text-center text-sm text-gray-500 dark:text-gray-400">
        <p>Last updated: April 22, 2025</p>
        <p>The roadmap is subject to change based on user feedback and development priorities.</p>
      </div>
    </div>
  );
}
