import React from 'react';
import Link from 'next/link';

export default function RoadmapPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Development Roadmap</h1>
      
      <p className="lead mb-8 text-gray-700 dark:text-gray-300">
        This document outlines the planned development trajectory for NPC Forge, including upcoming features,
        improvements, and long-term vision.
      </p>

      {/* Current Version */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Current Version: v0.2.0</h2>
        
        <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
          <p className="mb-4 text-gray-700 dark:text-gray-300">
            The current version (v0.2.0) includes:
          </p>
          <ul className="list-disc pl-6 space-y-1 text-gray-700 dark:text-gray-300">
            <li>Complete character generation engine</li>
            <li>AI portrait generation via DALL·E 3</li>
            <li>Genre and sub-genre templates</li>
            <li>Advanced character customization options</li>
            <li>Quest, dialogue, and item generation</li>
            <li>JSON export functionality</li>
            <li>Usage limits and tracking</li>
            <li>Mobile-responsive design</li>
            <li>Welcome guide for new users</li>
            <li>Comprehensive documentation</li>
          </ul>
        </div>
      </div>

      {/* Short-Term Roadmap */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Short-Term Roadmap (Next 1–3 Months)</h2>

        {/* Version 0.3.0 */}
        <div className="mb-6">
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-xl font-medium mb-3 text-indigo-700 dark:text-indigo-400">
              Version 0.3.0: Character Library
            </h3>
            <span className="inline-block bg-blue-600 text-white text-xs px-2 py-1 rounded-full font-medium dark:bg-blue-900/30 dark:text-blue-300 mb-4">
              High Priority
            </span>
            <p className="text-gray-700 dark:text-gray-300 mb-2"><strong>Goals</strong>: Character management and storage</p>
            <p className="font-medium mb-2 text-gray-700 dark:text-gray-300">Planned Features:</p>
            <ul className="list-disc pl-6 space-y-1 text-gray-700 dark:text-gray-300 mb-4">
              <li>Save/load characters from localStorage</li>
              <li>Library UI for browsing saved characters</li>
              <li>Character categorization and tagging</li>
              <li>Edit character metadata</li>
              <li>Delete and duplicate characters</li>
              <li>Export to additional formats (PDF)</li>
              <li>Character thumbnails in library view</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300"><strong>Target Release</strong>: May 2025</p>
          </div>
        </div>

        {/* Version 0.4.0 */}
        <div className="mb-6">
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-xl font-medium mb-3 text-indigo-700 dark:text-indigo-400">
              Version 0.4.0: "Talk to NPC"
            </h3>
            <span className="inline-block bg-blue-600 text-white text-xs px-2 py-1 rounded-full font-medium dark:bg-blue-900/30 dark:text-blue-300 mb-4">
              High Priority
            </span>
            <p className="text-gray-700 dark:text-gray-300 mb-2"><strong>Goals</strong>: Interactive character conversations</p>
            <p className="font-medium mb-2 text-gray-700 dark:text-gray-300">Planned Features:</p>
            <ul className="list-disc pl-6 space-y-1 text-gray-700 dark:text-gray-300 mb-4">
              <li>Chat interface for generated characters</li>
              <li>AI responses based on character personality</li>
              <li>Conversation history saving</li>
              <li>Context-aware dialogue generation</li>
              <li>In-character answers to player questions</li>
              <li>Emotion indicators for dialogue</li>
              <li>Optional voice read-out (text-to-speech)</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300"><strong>Target Release</strong>: June 2025</p>
          </div>
        </div>
      </div>

      {/* Medium-Term Roadmap */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Medium-Term Roadmap (3–6 Months)</h2>

        {/* Version 0.6.0 */}
        <div className="mb-6">
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-xl font-medium mb-3 text-indigo-700 dark:text-indigo-400">
              Version 0.6.0: Game Integration
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-2"><strong>Goals</strong>: Make characters usable in game development</p>
            <p className="font-medium mb-2 text-gray-700 dark:text-gray-300">Planned Features:</p>
            <ul className="list-disc pl-6 space-y-1 text-gray-700 dark:text-gray-300 mb-4">
              <li>Export formats for Unity, Unreal Engine</li>
              <li>Game system stat blocks (D&D 5e, Pathfinder, etc.)</li>
              <li>Character sheets for tabletop RPGs</li>
              <li>Integration guides for popular game platforms</li>
              <li>Ready-to-use character prefabs</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300"><strong>Target Release</strong>: August 2025</p>
          </div>
        </div>

        {/* Version 0.7.0 */}
        <div className="mb-6">
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-xl font-medium mb-3 text-indigo-700 dark:text-indigo-400">
              Version 0.7.0: Character Sets & Relationships
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-2"><strong>Goals</strong>: Generate interconnected characters</p>
            <p className="font-medium mb-2 text-gray-700 dark:text-gray-300">Planned Features:</p>
            <ul className="list-disc pl-6 space-y-1 text-gray-700 dark:text-gray-300 mb-4">
              <li>Generate multiple related characters</li>
              <li>Define relationship types between characters</li>
              <li>Family trees and organization charts</li>
              <li>Faction and group generation</li>
              <li>Visualization of character relationships</li>
              <li>Shared backstory elements</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300"><strong>Target Release</strong>: September 2025</p>
          </div>
        </div>

        {/* Version 0.8.0 */}
        <div className="mb-6">
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-xl font-medium mb-3 text-indigo-700 dark:text-indigo-400">
              Version 0.8.0: World Context
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-2"><strong>Goals</strong>: Place characters in coherent settings</p>
            <p className="font-medium mb-2 text-gray-700 dark:text-gray-300">Planned Features:</p>
            <ul className="list-disc pl-6 space-y-1 text-gray-700 dark:text-gray-300 mb-4">
              <li>Setting/world generation</li>
              <li>Location descriptions and maps</li>
              <li>Cultural context for characters</li>
              <li>Regional traits and customs</li>
              <li>Historical events affecting characters</li>
              <li>Environment-appropriate gear and abilities</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300"><strong>Target Release</strong>: October 2025</p>
          </div>
        </div>
      </div>

      {/* Long-Term Roadmap */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Long-Term Roadmap (6+ Months)</h2>

        {/* Version 0.9.0 */}
        <div className="mb-6">
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-xl font-medium mb-3 text-indigo-700 dark:text-indigo-400">
              Version 0.9.0: Community Features
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-2"><strong>Goals</strong>: Enable sharing and collaboration</p>
            <p className="font-medium mb-2 text-gray-700 dark:text-gray-300">Planned Features:</p>
            <ul className="list-disc pl-6 space-y-1 text-gray-700 dark:text-gray-300 mb-4">
              <li>Optional accounts system</li>
              <li>Character sharing and embedding</li>
              <li>Community ratings and favorites</li>
              <li>Template sharing</li>
              <li>Featured characters gallery</li>
              <li>Attribution and credits system</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300"><strong>Target Release</strong>: November 2025</p>
          </div>
        </div>

        {/* Version 1.0.0 */}
        <div className="mb-6">
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-xl font-medium mb-3 text-indigo-700 dark:text-indigo-400">
              Version 1.0.0: Full Release
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-2"><strong>Goals</strong>: Polished, production-ready application</p>
            <p className="font-medium mb-2 text-gray-700 dark:text-gray-300">Planned Features:</p>
            <ul className="list-disc pl-6 space-y-1 text-gray-700 dark:text-gray-300 mb-4">
              <li>Comprehensive validation and testing</li>
              <li>Performance optimization</li>
              <li>Accessibility improvements</li>
              <li>Enhanced documentation</li>
              <li>Tutorial system</li>
              <li>Professional account options</li>
              <li>API for developers</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300"><strong>Target Release</strong>: Q1 2026</p>
          </div>
        </div>
      </div>

      {/* Potential Future Features */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Potential Future Features</h2>
        
        <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
          <p className="mb-4 text-gray-700 dark:text-gray-300">
            These features are under consideration but not yet scheduled:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
              <h3 className="text-lg font-medium mb-2 text-indigo-700 dark:text-indigo-400">Character Enhancements</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                <li>Voice generation for dialogue lines</li>
                <li>3D character model generation</li>
                <li>Character development over time (aging, experience)</li>
                <li>Alternate reality versions of characters</li>
              </ul>
            </div>
            
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
              <h3 className="text-lg font-medium mb-2 text-indigo-700 dark:text-indigo-400">World Building</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                <li>Location generation with AI images</li>
                <li>Map creation tools</li>
                <li>Timeline generation for events</li>
                <li>Culture and religion generation</li>
                <li>Language creation tools</li>
              </ul>
            </div>
            
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
              <h3 className="text-lg font-medium mb-2 text-indigo-700 dark:text-indigo-400">Game Integration</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                <li>Direct plugins for Unity, Unreal Engine</li>
                <li>VTT (Virtual Tabletop) integration</li>
                <li>Game dialogue system exports</li>
                <li>AI narrator mode for game masters</li>
                <li>Encounter generation with NPCs</li>
              </ul>
            </div>
            
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
              <h3 className="text-lg font-medium mb-2 text-indigo-700 dark:text-indigo-400">Technical Improvements</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                <li>Offline mode with local AI models</li>
                <li>PWA enhancements</li>
                <li>Mobile apps for iOS and Android</li>
                <li>Voice command interface</li>
                <li>AR/VR character visualization</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Voting & Feedback */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Feature Voting & Feedback</h2>
        
        <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
          <p className="mb-4 text-gray-700 dark:text-gray-300">
            In the future, users will be able to vote on feature priorities through:
          </p>
          <ul className="list-disc pl-6 space-y-1 text-gray-700 dark:text-gray-300 mb-6">
            <li>GitHub Discussions</li>
            <li>In-app feedback forms</li>
            <li>Community surveys</li>
          </ul>
          <p className="mb-4 text-gray-700 dark:text-gray-300">
            Development priorities consider:
          </p>
          <ol className="list-decimal pl-6 space-y-1 text-gray-700 dark:text-gray-300">
            <li>User impact (how many users benefit)</li>
            <li>Technical feasibility</li>
            <li>Development effort required</li>
            <li>Strategic alignment with project goals</li>
          </ol>
        </div>
      </div>
      
      <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200 dark:bg-indigo-900/20 dark:border-indigo-800">
        <h2 className="text-xl font-semibold mb-2 text-indigo-700 dark:text-indigo-300">Related Documentation</h2>
        <ul className="list-disc list-inside space-y-1 text-indigo-600 dark:text-indigo-400">
          <li>
            <Link href="/docs/features" className="underline hover:text-indigo-800 dark:hover:text-indigo-300">
              Features Overview
            </Link>
            {" "}for current capabilities
          </li>
          <li>
            <Link href="/docs/changelog" className="underline hover:text-indigo-800 dark:hover:text-indigo-300">
              Changelog
            </Link>
            {" "}for version history
          </li>
          <li>
            <Link href="/docs/contributing" className="underline hover:text-indigo-800 dark:hover:text-indigo-300">
              Contributing Guidelines
            </Link>
            {" "}for how to help with development
          </li>
        </ul>
        <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
          Last updated: April 22, 2025 — The roadmap is subject to change based on user feedback and development priorities.
        </p>
      </div>
    </div>
  );
}