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
              NPC Forge is an AI-powered tool for creating detailed non-player characters (NPCs) for games, storytelling, and creative projects. It generates complete character profiles including name, appearance, personality, backstory, and an AI-created portrait.
            </p>
          </div>

          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-xl font-medium mb-3 text-indigo-700 dark:text-indigo-400">Is NPC Forge free to use?</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Yes, NPC Forge is free to use with a limit of 15 character generations per month per device. This limit helps manage API costs while keeping the tool accessible.
            </p>
          </div>

          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-xl font-medium mb-3 text-indigo-700 dark:text-indigo-400">Do I need to create an account to use NPC Forge?</h3>
            <p className="text-gray-700 dark:text-gray-300">
              No, NPC Forge does not require an account or login. It works immediately in your browser without any signup process.
            </p>
          </div>

          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-xl font-medium mb-3 text-indigo-700 dark:text-indigo-400">What happens to my characters after I create them?</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Your characters are not stored on our servers. You need to download them as JSON files to save them. We have no access to your generated characters once you leave the site.
            </p>
          </div>

          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-xl font-medium mb-3 text-indigo-700 dark:text-indigo-400">Which browsers are supported?</h3>
            <p className="text-gray-700 dark:text-gray-300">
              NPC Forge works best on modern browsers like Chrome, Firefox, Safari, and Edge. Make sure you're using an up-to-date browser for the best experience.
            </p>
          </div>
        </div>
      </div>
      
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Usage & Features</h2>
        
        <div className="space-y-6">
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-xl font-medium mb-3 text-indigo-700 dark:text-indigo-400">How many characters can I generate?</h3>
            <p className="text-gray-700 dark:text-gray-300">
              The free version allows 15 character generations per month per device. This limit resets at the beginning of each month.
            </p>
          </div>

          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-xl font-medium mb-3 text-indigo-700 dark:text-indigo-400">Can I edit a character after it's generated?</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Currently, you cannot directly edit a generated character within NPC Forge. However, you can:
            </p>
            <ol className="list-decimal pl-6 mt-2 space-y-1 text-gray-700 dark:text-gray-300">
              <li>Download the character as JSON</li>
              <li>Make adjustments to your inputs</li>
              <li>Generate a new character</li>
            </ol>
            <p className="mt-2 text-gray-700 dark:text-gray-300">
              A character editing feature is planned for a future release.
            </p>
          </div>

          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-xl font-medium mb-3 text-indigo-700 dark:text-indigo-400">Why are my portraits sometimes inconsistent with the character description?</h3>
            <p className="text-gray-700 dark:text-gray-300">
              While DALL-E 3 is powerful, it may not catch every detail in complex descriptions. For best results:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-700 dark:text-gray-300">
              <li>Be specific about key visual elements</li>
              <li>Use the portrait customization options</li>
              <li>Focus on the most distinctive visual traits</li>
            </ul>
          </div>

          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-xl font-medium mb-3 text-indigo-700 dark:text-indigo-400">Can I use the characters I create commercially?</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Yes, you can use the generated characters for commercial purposes. According to OpenAI's usage policies, content generated by their APIs belongs to the user. However, please check the latest <a href="https://openai.com/policies/terms-of-use" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300">OpenAI Terms of Use</a> for any updates.
            </p>
          </div>

          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-xl font-medium mb-3 text-indigo-700 dark:text-indigo-400">How can I save my characters?</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Click the "Download JSON" button on any generated character to save it to your device. This JSON file contains all character data and can be reimported into other tools.
            </p>
          </div>
        </div>
      </div>
      
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Technical Questions</h2>
        
        <div className="space-y-6">
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-xl font-medium mb-3 text-indigo-700 dark:text-indigo-400">How does NPC Forge work?</h3>
            <p className="text-gray-700 dark:text-gray-300">
              NPC Forge uses OpenAI's GPT-4o-mini model to generate character text and DALL-E 3 to create portraits. Your inputs and selections are processed into prompts that guide the AI in creating characters that match your specifications.
            </p>
          </div>

          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-xl font-medium mb-3 text-indigo-700 dark:text-indigo-400">Can I use NPC Forge offline?</h3>
            <p className="text-gray-700 dark:text-gray-300">
              No, NPC Forge requires an internet connection to function because it relies on OpenAI's API services.
            </p>
          </div>

          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-xl font-medium mb-3 text-indigo-700 dark:text-indigo-400">What happens to my data?</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Your inputs are sent to OpenAI's API to generate content but are not stored. Generated characters exist only in your browser session until you download them. We do not collect or store character data.
            </p>
          </div>

          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-xl font-medium mb-3 text-indigo-700 dark:text-indigo-400">Why does character generation sometimes fail?</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Generation might fail due to:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-700 dark:text-gray-300">
              <li>Network issues</li>
              <li>OpenAI API limitations</li>
              <li>Content policy violations in your inputs</li>
              <li>Temporary service disruptions</li>
            </ul>
            <p className="mt-2 text-gray-700 dark:text-gray-300">
              Try simplifying your request or trying again later if you encounter problems.
            </p>
          </div>
        </div>
      </div>
      
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Troubleshooting</h2>
        
        <div className="space-y-6">
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-xl font-medium mb-3 text-indigo-700 dark:text-indigo-400">Portrait generation failed but my character was created. What happened?</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Sometimes the portrait generation may fail while the character text succeeds. This can happen if:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-700 dark:text-gray-300">
              <li>The portrait request times out</li>
              <li>The description contains elements that DALL-E filters block</li>
              <li>There's a temporary issue with the image generation service</li>
            </ul>
            <p className="mt-2 text-gray-700 dark:text-gray-300">
              You can still use the character without a portrait, or try generating a new character with adjusted descriptions.
            </p>
          </div>

          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-xl font-medium mb-3 text-indigo-700 dark:text-indigo-400">The character generation seems stuck. What should I do?</h3>
            <p className="text-gray-700 dark:text-gray-300">
              If generation seems to be taking too long (more than 30 seconds):
            </p>
            <ol className="list-decimal pl-6 mt-2 space-y-1 text-gray-700 dark:text-gray-300">
              <li>Check your internet connection</li>
              <li>Refresh the page and try again</li>
              <li>Try a simpler character description</li>
              <li>Clear your browser cache and retry</li>
            </ol>
          </div>

          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-xl font-medium mb-3 text-indigo-700 dark:text-indigo-400">How can I report issues or request features?</h3>
            <p className="text-gray-700 dark:text-gray-300">
              You can:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-700 dark:text-gray-300">
              <li>Open an issue on <a href="https://github.com/EthanPerello/npc-forge/issues" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300">GitHub</a></li>
              <li>Contact the developer at <a href="mailto:ethanperello@gmail.com" className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300">ethanperello@gmail.com</a></li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Future Plans</h2>
        
        <div className="space-y-6">
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-xl font-medium mb-3 text-indigo-700 dark:text-indigo-400">Will there be more features added to NPC Forge?</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Yes! Planned features include:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-700 dark:text-gray-300">
              <li>Character library for saving and organizing NPCs in your browser</li>
              <li>Character editing capabilities</li>
              <li>"Talk to NPC" chat interface for interactive conversations</li>
              <li>Additional export formats (PDF, card, or image)</li>
              <li>Integration with popular game engines and tabletop systems</li>
            </ul>
            <p className="mt-2 text-gray-700 dark:text-gray-300">
              See the <Link href="/docs/roadmap" className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300">Roadmap</Link> for more details on upcoming features.
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