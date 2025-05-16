import Link from 'next/link';
import { Map, CheckCircle2, Clock, Calendar, Lightbulb, Users, Zap } from 'lucide-react';

export const metadata = {
  title: 'Development Roadmap - NPC Forge Documentation',
  description: 'Future development plans and features for NPC Forge',
};

export default function RoadmapPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">🛠️ NPC Forge: Development Roadmap</h1>
      
      <p className="lead mb-8 text-gray-700 dark:text-gray-300 text-lg">
        Explore the development trajectory for NPC Forge, including upcoming features, improvements, and long-term vision.
      </p>
      
      <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200 mb-10 dark:bg-indigo-900/20 dark:border-indigo-800">
        <h2 className="text-xl font-semibold mb-2 text-indigo-700 dark:text-indigo-300 flex items-center">
          <Map className="h-5 w-5 mr-2" />
          Current Version: v0.13.0
        </h2>
        <p className="text-indigo-600 dark:text-indigo-400">
          The current version includes a complete character creation wizard, character library system, regeneration capabilities, model selection, and comprehensive editing features.
        </p>
      </div>
      
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-6 text-indigo-700 dark:text-indigo-400 flex items-center">
          <CheckCircle2 className="h-6 w-6 mr-2" />
          Completed Features
        </h2>
        
        <div className="space-y-4">
          <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <h3 className="text-lg font-medium text-green-700 dark:text-green-400 mb-2 flex items-center">
              <CheckCircle2 className="h-5 w-5 mr-2" />
              Character Creation Wizard (v0.13.0) ✓
            </h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
              <li>Step-by-step character creation flow (Concept → Options → Model → Generate)</li>
              <li>Sticky progress bar with clickable navigation</li>
              <li>Welcome popup for first-time users</li>
              <li>Generate Random Character button</li>
              <li>Redesigned character display layout</li>
              <li>Legacy tabbed interface removed</li>
            </ul>
          </div>
          
          <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <h3 className="text-lg font-medium text-green-700 dark:text-green-400 mb-2 flex items-center">
              <CheckCircle2 className="h-5 w-5 mr-2" />
              Character Regeneration (v0.12.0) ✓
            </h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
              <li>Individual character attribute regeneration (name, appearance, personality, backstory)</li>
              <li>Portrait regeneration with model selection</li>
              <li>Quest component regeneration (title, description, reward)</li>
              <li>Dialogue line regeneration</li>
              <li>Item regeneration</li>
              <li>New <code className="bg-gray-100 p-1 rounded dark:bg-gray-800">/api/regenerate</code> endpoint</li>
            </ul>
          </div>
          
          <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <h3 className="text-lg font-medium text-green-700 dark:text-green-400 mb-2 flex items-center">
              <CheckCircle2 className="h-5 w-5 mr-2" />
              Enhanced Library & Storage (v0.11.0) ✓
            </h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
              <li>Model selectors in edit page</li>
              <li>Portrait upload and regeneration buttons</li>
              <li>Direct delete buttons on character cards</li>
              <li>Full IndexedDB migration for character storage</li>
              <li>Resilient database recovery logic</li>
              <li>Enhanced library filtering</li>
            </ul>
          </div>
          
          <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <h3 className="text-lg font-medium text-green-700 dark:text-green-400 mb-2 flex items-center">
              <CheckCircle2 className="h-5 w-5 mr-2" />
              Model Selection & Dark Mode (v0.7.0) ✓
            </h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
              <li>Tiered model system (Standard, Enhanced, Premium)</li>
              <li>Text models: gpt-4o-mini, gpt-4.1-mini, gpt-4o</li>
              <li>Image models: dall-e-2, dall-e-3, gpt-image-1</li>
              <li>Complete dark mode toggle system</li>
              <li>Per-model usage limits with tracking</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-6 text-indigo-700 dark:text-indigo-400 flex items-center">
          <Clock className="h-6 w-6 mr-2" />
          Active Development
        </h2>
        
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg shadow-sm dark:bg-blue-900/20 dark:border-blue-800">
          <h3 className="text-xl font-medium text-blue-700 dark:text-blue-300 mb-3 flex items-center">
            <Zap className="h-5 w-5 mr-2" />
            v0.14.0: "Talk to NPC" Chat Interface (In Progress)
          </h3>
          <p className="text-blue-600 dark:text-blue-400 mb-3 font-medium">
            Goal: Interactive conversations with generated characters
          </p>
          
          <h4 className="font-medium text-blue-700 dark:text-blue-300 mb-2">Planned Features</h4>
          <ul className="list-disc list-inside space-y-1 text-blue-600 dark:text-blue-400">
            <li>Chat interface for generated characters</li>
            <li>AI responses based on character personality</li>
            <li>Conversation history and persistence</li>
            <li>Context-aware responses using character traits</li>
            <li>Usage tracking for chat interactions</li>
            <li>System prompt customization for character consistency</li>
            <li>Chat export functionality</li>
          </ul>
          
          <p className="text-blue-700 dark:text-blue-300 mt-3">
            <strong>Target Release:</strong> Q2 2025
          </p>
        </div>
      </div>
      
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-6 text-indigo-700 dark:text-indigo-400 flex items-center">
          <Calendar className="h-6 w-6 mr-2" />
          Short-Term Roadmap (Next 3-6 Months)
        </h2>
        
        <div className="space-y-6">
          <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <h3 className="text-xl font-medium text-indigo-700 dark:text-indigo-400 mb-3">
              v0.15.0: User Accounts & Cloud Features
            </h3>
            <span className="inline-block bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full font-medium mb-3 dark:bg-yellow-900/30 dark:text-yellow-300">
              High Priority
            </span>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              <strong>Goal:</strong> Optional account system with cloud sync
            </p>
            
            <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Planned Features</h4>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
              <li>Optional account creation and authentication</li>
              <li>Cloud sync for character library</li>
              <li>Cross-device character access</li>
              <li>Public gallery of shared NPCs</li>
              <li>Social features (likes, comments, follows)</li>
              <li>Profile customization options</li>
              <li>Enhanced privacy controls</li>
            </ul>
            
            <p className="text-gray-700 dark:text-gray-300 mt-3">
              <strong>Target Release:</strong> Q3 2025
            </p>
          </div>
          
          <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <h3 className="text-xl font-medium text-indigo-700 dark:text-indigo-400 mb-3">
              v0.16.0: Advanced Generation Features
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              <strong>Goal:</strong> Enhanced character creation capabilities
            </p>
            
            <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Planned Features</h4>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
              <li>Character relationship systems</li>
              <li>Connected character generation (families, groups)</li>
              <li>Character progression tracking</li>
              <li>Alternative versions ("what if" scenarios)</li>
              <li>Batch character generation</li>
              <li>Template creation and sharing</li>
            </ul>
            
            <p className="text-gray-700 dark:text-gray-300 mt-3">
              <strong>Target Release:</strong> Q4 2025
            </p>
          </div>
        </div>
      </div>
      
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-6 text-indigo-700 dark:text-indigo-400 flex items-center">
          <Calendar className="h-6 w-6 mr-2" />
          Medium-Term Roadmap (6-12 Months)
        </h2>
        
        <div className="space-y-6">
          <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <h3 className="text-xl font-medium text-indigo-700 dark:text-indigo-400 mb-3">
              v0.17.0: World Building Tools
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              <strong>Goal:</strong> Expand beyond characters to settings
            </p>
            
            <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Planned Features</h4>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
              <li>Setting and world generation</li>
              <li>Location descriptions with AI images</li>
              <li>Map creation tools</li>
              <li>Cultural context generation</li>
              <li>Historical timeline creation</li>
              <li>Integration with character generation</li>
            </ul>
          </div>
          
          <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <h3 className="text-xl font-medium text-indigo-700 dark:text-indigo-400 mb-3">
              v0.18.0: Game Integration Suite
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              <strong>Goal:</strong> Direct integration with game engines
            </p>
            
            <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Planned Features</h4>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
              <li>Unity plugin with NPC import</li>
              <li>Unreal Engine integration</li>
              <li>Godot support</li>
              <li>VTT integration (Foundry, Roll20)</li>
              <li>TTRPG stat block generation (D&D 5e, Pathfinder)</li>
              <li>Character sheet exports</li>
            </ul>
          </div>
          
          <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <h3 className="text-xl font-medium text-indigo-700 dark:text-indigo-400 mb-3">
              v0.19.0: Advanced AI Features
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              <strong>Goal:</strong> Next-generation character intelligence
            </p>
            
            <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Planned Features</h4>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
              <li>Advanced personality systems</li>
              <li>Dynamic memory and decision patterns</li>
              <li>Character behavior simulation</li>
              <li>Inter-NPC relationship dynamics</li>
              <li>Psychological profiling</li>
              <li>Value system modeling</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-6 text-indigo-700 dark:text-indigo-400 flex items-center">
          <Lightbulb className="h-6 w-6 mr-2" />
          Long-Term Vision (v1.0.0+)
        </h2>
        
        <div className="space-y-6">
          <div className="p-4 bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-lg shadow-sm dark:from-indigo-900/20 dark:to-purple-900/20 dark:border-indigo-800">
            <h3 className="text-xl font-medium text-indigo-700 dark:text-indigo-400 mb-3">
              v1.0.0: Stable Release
            </h3>
            <p className="text-indigo-700 dark:text-indigo-300 mb-3">
              <strong>Goal:</strong> Production-ready platform
            </p>
            
            <h4 className="font-medium text-indigo-800 dark:text-indigo-200 mb-2">Features</h4>
            <ul className="list-disc list-inside space-y-1 text-indigo-600 dark:text-indigo-300">
              <li>Comprehensive testing and stability</li>
              <li>Performance optimization</li>
              <li>Accessibility compliance</li>
              <li>Enhanced documentation</li>
              <li>Tutorial system</li>
              <li>Professional tiers</li>
              <li>Developer API with authentication</li>
              <li>Server-side usage validation</li>
            </ul>
          </div>
          
          <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-3">Post-1.0 Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-indigo-700 dark:text-indigo-400 mb-2">Character Enhancements</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300 text-sm">
                  <li>Voice generation for dialogue</li>
                  <li>3D character model generation</li>
                  <li>AR/VR character visualization</li>
                  <li>Real-time collaboration features</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-indigo-700 dark:text-indigo-400 mb-2">Platform Features</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300 text-sm">
                  <li>Marketplace for templates and assets</li>
                  <li>AI narrator for game sessions</li>
                  <li>Advanced analytics and insights</li>
                  <li>Enterprise solutions</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-6 text-indigo-700 dark:text-indigo-400 flex items-center">
          <Users className="h-6 w-6 mr-2" />
          Community Input & Contributing
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <h3 className="font-medium text-indigo-700 dark:text-indigo-400 mb-2">How to Influence the Roadmap</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
              <li><strong>GitHub Discussions</strong>: Share ideas and vote on features</li>
              <li><strong>Issue Tracker</strong>: Report bugs and suggest improvements</li>
              <li><strong>Email Feedback</strong>: Contact ethanperello@gmail.com</li>
              <li><strong>Community Surveys</strong>: Participate in periodic feature polls</li>
            </ul>
          </div>
          
          <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <h3 className="font-medium text-indigo-700 dark:text-indigo-400 mb-2">Evaluation Criteria</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-2 text-sm">Development priorities are based on:</p>
            <ol className="list-decimal list-inside space-y-1 text-gray-700 dark:text-gray-300 text-sm">
              <li><strong>User Impact</strong>: How many users will benefit</li>
              <li><strong>Technical Feasibility</strong>: Implementation complexity</li>
              <li><strong>Strategic Alignment</strong>: Fits project vision</li>
              <li><strong>Community Interest</strong>: User votes and requests</li>
              <li><strong>Resource Availability</strong>: Development capacity</li>
            </ol>
          </div>
        </div>
      </div>
      
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-6 text-indigo-700 dark:text-indigo-400">Resource Allocation</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg shadow-sm dark:bg-green-900/20 dark:border-green-800">
            <h3 className="font-medium text-green-700 dark:text-green-300 mb-2">Current Focus (80% effort)</h3>
            <ul className="list-disc list-inside space-y-1 text-green-600 dark:text-green-400">
              <li>Chat interface development</li>
              <li>Bug fixes and performance optimization</li>
              <li>Documentation updates</li>
            </ul>
          </div>
          
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg shadow-sm dark:bg-blue-900/20 dark:border-blue-800">
            <h3 className="font-medium text-blue-700 dark:text-blue-300 mb-2">Research & Planning (20% effort)</h3>
            <ul className="list-disc list-inside space-y-1 text-blue-600 dark:text-blue-400">
              <li>User account system architecture</li>
              <li>Game integration prototypes</li>
              <li>Advanced AI feature exploration</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-6 text-indigo-700 dark:text-indigo-400">Success Metrics</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <h3 className="font-medium text-indigo-700 dark:text-indigo-400 mb-2">Development Goals</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
              <li>Feature completion on schedule</li>
              <li>High user satisfaction scores</li>
              <li>Active community engagement</li>
              <li>Stable, bug-free releases</li>
            </ul>
          </div>
          
          <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <h3 className="font-medium text-indigo-700 dark:text-indigo-400 mb-2">User Experience Goals</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
              <li>Intuitive interface design</li>
              <li>Fast generation times</li>
              <li>Reliable character storage</li>
              <li>Positive user feedback</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200 dark:bg-indigo-900/20 dark:border-indigo-800 mb-8">
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
          <li>
            <Link href="/docs/architecture" className="underline hover:text-indigo-800 dark:hover:text-indigo-300">
              Architecture Overview
            </Link>
            {" "}for technical implementation plans
          </li>
        </ul>
        <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
          <em>Last updated: May 2025 — The roadmap is subject to change based on user feedback and development priorities.</em>
        </p>
      </div>
    </div>
  );
}