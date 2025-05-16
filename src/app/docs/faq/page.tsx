import Link from 'next/link';

export default function FAQPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Frequently Asked Questions</h1>
      
      <p className="lead mb-8 text-gray-700 dark:text-gray-300">
        Find answers to common questions about NPC Forge.
      </p>
      
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">General Questions</h2>
        
        <div className="space-y-6">
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-xl font-medium mb-3 text-indigo-700 dark:text-indigo-400">What is NPC Forge?</h3>
            <p className="text-gray-700 dark:text-gray-300">
              NPC Forge is an AI-powered tool for creating detailed non-player characters (NPCs) for games, storytelling, and creative projects. It features a step-by-step wizard interface, character library management, and support for multiple AI models to generate complete character profiles including names, appearance, personality, backstory, quests, dialogue, items, and AI-created portraits.
            </p>
          </div>

          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-xl font-medium mb-3 text-indigo-700 dark:text-indigo-400">Is NPC Forge free to use?</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              Yes, NPC Forge is free to use with a tiered model system:
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
              <li><strong>Standard models</strong>: Unlimited usage (gpt-4o-mini for text, dall-e-2 for images)</li>
              <li><strong>Enhanced models</strong>: 30 generations per month (gpt-4.1-mini for text, dall-e-3 for images)</li>
              <li><strong>Premium models</strong>: 10 generations per month (gpt-4o for text, gpt-image-1 for images)</li>
            </ul>
          </div>

          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-xl font-medium mb-3 text-indigo-700 dark:text-indigo-400">Do I need to create an account to use NPC Forge?</h3>
            <p className="text-gray-700 dark:text-gray-300">
              No, NPC Forge does not require an account or login. It works immediately in your browser without any signup process. All characters are stored locally in your browser using IndexedDB.
            </p>
          </div>

          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-xl font-medium mb-3 text-indigo-700 dark:text-indigo-400">What happens to my characters after I create them?</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Your characters are stored locally in your browser's IndexedDB storage. You can save unlimited characters to your personal library, edit them, and organize them however you like. We have no access to your generated characters.
            </p>
          </div>

          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-xl font-medium mb-3 text-indigo-700 dark:text-indigo-400">Which browsers are supported?</h3>
            <p className="text-gray-700 dark:text-gray-300">
              NPC Forge works best on modern browsers like Chrome, Firefox, Safari, and Edge. The character library requires IndexedDB support, which is available in all modern browsers.
            </p>
          </div>
        </div>
      </div>
      
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Usage & Features</h2>
        
        <div className="space-y-6">
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-xl font-medium mb-3 text-indigo-700 dark:text-indigo-400">How does the wizard interface work?</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              The wizard guides you through four steps:
            </p>
            <ol className="list-decimal list-inside space-y-1 text-gray-700 dark:text-gray-300">
              <li><strong>Concept</strong>: Choose genre and write character description</li>
              <li><strong>Options</strong>: Set traits, enable quests/dialogue/items</li>
              <li><strong>Model</strong>: Select AI models for text and image generation</li>
              <li><strong>Generate</strong>: Create your character and review results</li>
            </ol>
            <p className="text-gray-700 dark:text-gray-300 mt-3">
              You can navigate between steps using the progress bar at the top.
            </p>
          </div>

          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-xl font-medium mb-3 text-indigo-700 dark:text-indigo-400">What's the difference between the model tiers?</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
              <li><strong>🟢 Standard</strong>: Good quality, unlimited usage, best for regular characters</li>
              <li><strong>🟡 Enhanced</strong>: Better quality, 30/month limit, ideal for important characters</li>
              <li><strong>🔴 Premium</strong>: Highest quality, 10/month limit, perfect for main characters</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 mt-3">
              Each tier offers progressively better detail, creativity, and consistency.
            </p>
          </div>

          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-xl font-medium mb-3 text-indigo-700 dark:text-indigo-400">Can I edit characters after creating them?</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              Yes! The character library includes a full editing system where you can:
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
              <li>Modify any character attribute</li>
              <li>Regenerate specific elements (name, appearance, quests, etc.)</li>
              <li>Add or remove quests, dialogue lines, and items</li>
              <li>Upload or regenerate portraits</li>
              <li>Choose different AI models for regeneration</li>
            </ul>
          </div>

          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-xl font-medium mb-3 text-indigo-700 dark:text-indigo-400">How many characters can I save?</h3>
            <p className="text-gray-700 dark:text-gray-300">
              You can save unlimited characters to your library. They're stored locally in your browser using IndexedDB, which provides reliable storage for large amounts of data.
            </p>
          </div>

          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-xl font-medium mb-3 text-indigo-700 dark:text-indigo-400">Can I export my characters?</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              Yes, you can export characters in several ways:
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
              <li><strong>Individual JSON</strong>: Download specific characters as JSON files</li>
              <li><strong>Character images</strong>: Download character portraits</li>
              <li><strong>Bulk export</strong>: Export your entire library (feature may vary by version)</li>
            </ul>
          </div>

          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-xl font-medium mb-3 text-indigo-700 dark:text-indigo-400">What's character regeneration?</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              Regeneration allows you to update specific parts of existing characters:
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
              <li>Regenerate individual attributes (name, appearance, personality, backstory)</li>
              <li>Regenerate portraits with different models or styles</li>
              <li>Regenerate specific quest components, dialogue lines, or items</li>
              <li>Choose different AI models for regeneration</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Technical Questions</h2>
        
        <div className="space-y-6">
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-xl font-medium mb-3 text-indigo-700 dark:text-indigo-400">How does NPC Forge work?</h3>
            <p className="text-gray-700 dark:text-gray-300">
              NPC Forge uses OpenAI's AI models to generate character content. You select from multiple models (gpt-4o-mini, gpt-4o, dall-e-3, etc.) that create text and images based on your inputs and selections.
            </p>
          </div>

          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-xl font-medium mb-3 text-indigo-700 dark:text-indigo-400">Can I use NPC Forge offline?</h3>
            <p className="text-gray-700 dark:text-gray-300">
              No, NPC Forge requires an internet connection because it relies on OpenAI's API services for character generation. However, once characters are saved to your library, you can view them offline.
            </p>
          </div>

          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-xl font-medium mb-3 text-indigo-700 dark:text-indigo-400">What happens to my data?</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Your inputs are sent to OpenAI's API to generate content but are not stored on our servers. Generated characters exist only in your browser's local storage until you download them. We do not collect, store, or have access to your character data.
            </p>
          </div>

          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-xl font-medium mb-3 text-indigo-700 dark:text-indigo-400">Why does character generation sometimes fail?</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              Generation might fail due to:
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
              <li>Network connectivity issues</li>
              <li>OpenAI API temporary limitations or downtime</li>
              <li>Content policy violations in your inputs</li>
              <li>Browser storage issues (rare)</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 mt-3">
              Try refreshing the page or using simpler descriptions if you encounter problems.
            </p>
          </div>

          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-xl font-medium mb-3 text-indigo-700 dark:text-indigo-400">Are there any content restrictions?</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Yes, NPC Forge follows OpenAI's content policy, which prohibits generating explicit sexual content, hateful content, or content that promotes illegal activities. Requests that violate these policies will be rejected by the AI models.
            </p>
          </div>

          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-xl font-medium mb-3 text-indigo-700 dark:text-indigo-400">Why do I have usage limits?</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Usage limits help manage API costs while keeping NPC Forge free for everyone. Standard models have unlimited usage, while Enhanced and Premium models have monthly limits because they cost more to operate.
            </p>
          </div>
        </div>
      </div>

      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Character Library</h2>
        
        <div className="space-y-6">
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-xl font-medium mb-3 text-indigo-700 dark:text-indigo-400">How do I save characters to my library?</h3>
            <p className="text-gray-700 dark:text-gray-300">
              After generating a character, click "Save to Library" in the results step. The character will be automatically saved with all its data and portrait.
            </p>
          </div>

          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-xl font-medium mb-3 text-indigo-700 dark:text-indigo-400">Can I organize my characters?</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              Yes, you can:
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
              <li>Search characters by name or description</li>
              <li>Filter by genre and sub-genre</li>
              <li>Sort by creation or modification date</li>
              <li>Use descriptive names for easy organization</li>
            </ul>
          </div>

          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-xl font-medium mb-3 text-indigo-700 dark:text-indigo-400">What if I lose my characters?</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              Characters are stored in your browser's local storage. They can be lost if:
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
              <li>You clear your browser data</li>
              <li>You use a different browser or device</li>
              <li>Browser storage is corrupted</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 mt-3">
              <strong>Prevention:</strong> Regularly export important characters as JSON backup files.
            </p>
          </div>

          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-xl font-medium mb-3 text-indigo-700 dark:text-indigo-400">Can I transfer characters between devices?</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              Currently, characters are stored locally per browser. To transfer:
            </p>
            <ol className="list-decimal list-inside space-y-1 text-gray-700 dark:text-gray-300">
              <li>Export characters as JSON from the original device</li>
              <li>Import the JSON files on the new device</li>
            </ol>
          </div>
        </div>
      </div>

      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Model Selection</h2>
        
        <div className="space-y-6">
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-xl font-medium mb-3 text-indigo-700 dark:text-indigo-400">Which models should I use?</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              <strong>For most users:</strong>
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
              <li>Use Standard models for regular character creation</li>
              <li>Use Enhanced models for important NPCs</li>
              <li>Save Premium models for main characters</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 mt-3">
              <strong>Model selection tips:</strong>
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
              <li>Start with Standard models and regenerate with higher tiers if needed</li>
              <li>Match model tier to character importance in your story/game</li>
              <li>Monitor your monthly usage to optimize efficiency</li>
            </ul>
          </div>

          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-xl font-medium mb-3 text-indigo-700 dark:text-indigo-400">Can I mix different model tiers?</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Yes! You can use different tiers for text and image generation. For example, Enhanced text with Standard image, or vice versa.
            </p>
          </div>

          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-xl font-medium mb-3 text-indigo-700 dark:text-indigo-400">How do monthly limits work?</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Each model has its own monthly limit that resets on the 1st of each month. Limits are tracked per device/browser, not per user account.
            </p>
          </div>
        </div>
      </div>
      
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Troubleshooting</h2>
        
        <div className="space-y-6">
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-xl font-medium mb-3 text-indigo-700 dark:text-indigo-400">Portrait generation failed but my character was created. What happened?</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              This can happen when:
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
              <li>The portrait request times out</li>
              <li>The character description contains elements that image models filter out</li>
              <li>There's a temporary issue with the image generation service</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 mt-3">
              You can regenerate the portrait later with different settings or models.
            </p>
          </div>

          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-xl font-medium mb-3 text-indigo-700 dark:text-indigo-400">The character generation seems stuck. What should I do?</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              If generation takes too long (more than 60 seconds):
            </p>
            <ol className="list-decimal list-inside space-y-1 text-gray-700 dark:text-gray-300">
              <li>Check your internet connection</li>
              <li>Try refreshing the page</li>
              <li>Use a simpler character description</li>
              <li>Try a different model tier</li>
            </ol>
          </div>

          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-xl font-medium mb-3 text-indigo-700 dark:text-indigo-400">Characters aren't saving to my library</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              Check these common issues:
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
              <li>Make sure you're clicking "Save to Library" after generation</li>
              <li>Verify your browser allows local storage for the site</li>
              <li>Try clearing browser cache and reloading</li>
              <li>Check if you have sufficient browser storage space</li>
            </ul>
          </div>

          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-xl font-medium mb-3 text-indigo-700 dark:text-indigo-400">I can't see my saved characters</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              Try these solutions:
            </p>
            <ol className="list-decimal list-inside space-y-1 text-gray-700 dark:text-gray-300">
              <li>Refresh the library page</li>
              <li>Clear search filters</li>
              <li>Check if you're using the same browser and device</li>
              <li>Verify browser storage permissions</li>
            </ol>
          </div>

          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-xl font-medium mb-3 text-indigo-700 dark:text-indigo-400">My usage count seems wrong</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Usage tracking is per device/browser. If you use multiple browsers or clear browser data, usage counts may appear different. Each browser tracks usage independently.
            </p>
          </div>
        </div>
      </div>

      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Best Practices</h2>
        
        <div className="space-y-6">
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-xl font-medium mb-3 text-indigo-700 dark:text-indigo-400">How can I get better character results?</h3>
            <ol className="list-decimal list-inside space-y-1 text-gray-700 dark:text-gray-300">
              <li><strong>Write detailed descriptions</strong>: Include specific appearance, personality, and background details</li>
              <li><strong>Use appropriate model tiers</strong>: Match quality needs with model selection</li>
              <li><strong>Be specific with traits</strong>: Choose personality traits that complement each other</li>
              <li><strong>Experiment with regeneration</strong>: Try regenerating specific elements for improvement</li>
            </ol>
          </div>

          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-xl font-medium mb-3 text-indigo-700 dark:text-indigo-400">How should I manage my character library?</h3>
            <ol className="list-decimal list-inside space-y-1 text-gray-700 dark:text-gray-300">
              <li><strong>Use descriptive names</strong>: Make characters easy to find later</li>
              <li><strong>Export important characters</strong>: Create JSON backups regularly</li>
              <li><strong>Organize by campaign/story</strong>: Use naming conventions for related characters</li>
              <li><strong>Regular maintenance</strong>: Delete characters you no longer need</li>
            </ol>
          </div>

          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-xl font-medium mb-3 text-indigo-700 dark:text-indigo-400">What's the best model selection strategy?</h3>
            <ol className="list-decimal list-inside space-y-1 text-gray-700 dark:text-gray-300">
              <li><strong>Start with Standard</strong>: Generate initial versions with unlimited models</li>
              <li><strong>Selective upgrades</strong>: Regenerate key elements with higher-tier models</li>
              <li><strong>Budget planning</strong>: Plan your monthly Enhanced/Premium usage</li>
              <li><strong>Quality matching</strong>: Use higher tiers for more important characters</li>
            </ol>
          </div>
        </div>
      </div>

      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Future Features</h2>
        
        <div className="space-y-6">
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-xl font-medium mb-3 text-indigo-700 dark:text-indigo-400">Will there be more features added?</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              Yes! Planned features include:
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
              <li>Chat interface to talk with your characters (v0.14.0)</li>
              <li>Optional user accounts with cloud sync (v0.15.0)</li>
              <li>Game integration tools and APIs</li>
              <li>Advanced relationship systems between characters</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 mt-3">
              See the <Link href="/docs/roadmap" className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300">Roadmap</Link> for detailed future plans.
            </p>
          </div>

          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-xl font-medium mb-3 text-indigo-700 dark:text-indigo-400">Will there be a premium version?</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Currently, there are no plans for a paid tier. The tiered model system provides quality options while keeping the core functionality free for everyone.
            </p>
          </div>

          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-xl font-medium mb-3 text-indigo-700 dark:text-indigo-400">Can I request features?</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              Yes! You can:
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
              <li>Open an issue on <a href="https://github.com/EthanPerello/npc-forge/issues" className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300" target="_blank" rel="noopener noreferrer">GitHub</a></li>
              <li>Contact the developer at <a href="mailto:ethanperello@gmail.com" className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300">ethanperello@gmail.com</a></li>
              <li>Participate in community discussions</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 mt-3">
              Feature requests are evaluated based on user demand, technical feasibility, and project goals.
            </p>
          </div>
        </div>
      </div>

      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Getting Help</h2>
        
        <div className="space-y-6">
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-xl font-medium mb-3 text-indigo-700 dark:text-indigo-400">How can I report issues or request features?</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
              <li><strong>Bug reports</strong>: Open an issue on <a href="https://github.com/EthanPerello/npc-forge/issues" className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300" target="_blank" rel="noopener noreferrer">GitHub</a></li>
              <li><strong>Feature requests</strong>: Use GitHub discussions or email</li>
              <li><strong>General questions</strong>: Check this FAQ first, then contact support</li>
            </ul>
          </div>

          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-xl font-medium mb-3 text-indigo-700 dark:text-indigo-400">Where can I find more help?</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
              <li><Link href="/docs/how-to-use" className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300">How to Use Guide</Link> - Complete wizard walkthrough</li>
              <li><Link href="/docs/library" className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300">Character Library Guide</Link> - Library management</li>
              <li><Link href="/docs/models" className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300">Model Selection Guide</Link> - Understanding model tiers</li>
              <li><Link href="/docs/character-examples" className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300">Character Examples</Link> - Sample characters</li>
              <li><Link href="/docs/generation-options" className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300">Generation Options</Link> - Detailed customization</li>
            </ul>
          </div>

          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-xl font-medium mb-3 text-indigo-700 dark:text-indigo-400">Contact Information</h3>
            <p className="text-gray-700 dark:text-gray-300">
              For additional support, contact <a href="mailto:ethanperello@gmail.com" className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300">ethanperello@gmail.com</a> with a detailed description of your issue or question.
            </p>
          </div>
        </div>
      </div>
      
      <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200 dark:bg-indigo-900/20 dark:border-indigo-800">
        <h2 className="text-xl font-semibold mb-2 text-indigo-700 dark:text-indigo-300">Related Documentation</h2>
        <ul className="list-disc list-inside space-y-1 text-indigo-600 dark:text-indigo-400">
          <li>
            <Link href="/docs/how-to-use" className="underline hover:text-indigo-800 dark:hover:text-indigo-300">
              How to Use NPC Forge
            </Link>
            {" "}for step-by-step instructions
          </li>
          <li>
            <Link href="/docs/features" className="underline hover:text-indigo-800 dark:hover:text-indigo-300">
              Features Overview
            </Link>
            {" "}for a complete list of features
          </li>
          <li>
            <Link href="/docs/generation-options" className="underline hover:text-indigo-800 dark:hover:text-indigo-300">
              Generation Options
            </Link>
            {" "}for details on customization settings
          </li>
        </ul>
      </div>
    </div>
  );
}