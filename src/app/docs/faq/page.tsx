export default function FAQPage() {
    return (
      <div className="prose prose-blue max-w-none dark:prose-invert">
        <h1>Frequently Asked Questions (FAQ)</h1>
  
        <p className="lead text-lg text-gray-600 dark:text-gray-300">
          Find answers to common questions about NPC Forge.
        </p>
  
        <div className="space-y-12 mt-8">
          <section>
            <h2 className="text-2xl font-bold text-indigo-700 dark:text-indigo-400">General Questions</h2>
            
            <div className="space-y-6 mt-4">
              <div className="bg-white p-6 rounded-lg shadow border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                <h3 className="text-xl font-semibold mb-3">What is NPC Forge?</h3>
                <p>
                  NPC Forge is an AI-powered tool for creating detailed non-player characters (NPCs) for games, storytelling, and creative projects. It generates complete character profiles including name, appearance, personality, backstory, and an AI-created portrait.
                </p>
              </div>
  
              <div className="bg-white p-6 rounded-lg shadow border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                <h3 className="text-xl font-semibold mb-3">Is NPC Forge free to use?</h3>
                <p>
                  Yes, NPC Forge is free to use with a limit of 15 character generations per month per device. This limit helps manage API costs while keeping the tool accessible.
                </p>
              </div>
  
              <div className="bg-white p-6 rounded-lg shadow border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                <h3 className="text-xl font-semibold mb-3">Do I need to create an account to use NPC Forge?</h3>
                <p>
                  No, NPC Forge does not require an account or login. It works immediately in your browser without any signup process.
                </p>
              </div>
  
              <div className="bg-white p-6 rounded-lg shadow border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                <h3 className="text-xl font-semibold mb-3">What happens to my characters after I create them?</h3>
                <p>
                  Your characters are not stored on our servers. You need to download them as JSON files to save them. We have no access to your generated characters once you leave the site.
                </p>
              </div>
  
              <div className="bg-white p-6 rounded-lg shadow border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                <h3 className="text-xl font-semibold mb-3">Which browsers are supported?</h3>
                <p>
                  NPC Forge works best on modern browsers like Chrome, Firefox, Safari, and Edge. Make sure you're using an up-to-date browser for the best experience.
                </p>
              </div>
            </div>
          </section>
  
          <section>
            <h2 className="text-2xl font-bold text-indigo-700 dark:text-indigo-400">Usage & Features</h2>
            
            <div className="space-y-6 mt-4">
              <div className="bg-white p-6 rounded-lg shadow border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                <h3 className="text-xl font-semibold mb-3">How many characters can I generate?</h3>
                <p>
                  The free version allows 15 character generations per month per device. This limit resets at the beginning of each month.
                </p>
              </div>
  
              <div className="bg-white p-6 rounded-lg shadow border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                <h3 className="text-xl font-semibold mb-3">Can I edit a character after it's generated?</h3>
                <p>
                  Currently, you cannot directly edit a generated character within NPC Forge. However, you can:
                </p>
                <ol className="list-decimal pl-5 mt-2">
                  <li>Download the character as JSON</li>
                  <li>Make adjustments to your inputs</li>
                  <li>Generate a new character</li>
                </ol>
                <p className="mt-2">
                  A character editing feature is planned for a future release.
                </p>
              </div>
  
              <div className="bg-white p-6 rounded-lg shadow border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                <h3 className="text-xl font-semibold mb-3">Why are my portraits sometimes inconsistent with the character description?</h3>
                <p>
                  While DALL-E 3 is powerful, it may not catch every detail in complex descriptions. For best results:
                </p>
                <ul className="list-disc pl-5 mt-2">
                  <li>Be specific about key visual elements</li>
                  <li>Use the portrait customization options</li>
                  <li>Focus on the most distinctive visual traits</li>
                </ul>
              </div>
  
              <div className="bg-white p-6 rounded-lg shadow border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                <h3 className="text-xl font-semibold mb-3">Can I use the characters I create commercially?</h3>
                <p>
                  Yes, you can use the generated characters for commercial purposes. According to OpenAI's usage policies, content generated by their APIs belongs to the user. However, please check the latest <a href="https://openai.com/policies/terms-of-use" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300">OpenAI Terms of Use</a> for any updates.
                </p>
              </div>
  
              <div className="bg-white p-6 rounded-lg shadow border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                <h3 className="text-xl font-semibold mb-3">How can I save my characters?</h3>
                <p>
                  Click the "Download JSON" button on any generated character to save it to your device. This JSON file contains all character data and can be reimported into other tools.
                </p>
              </div>
            </div>
          </section>
  
          <section>
            <h2 className="text-2xl font-bold text-indigo-700 dark:text-indigo-400">Technical Questions</h2>
            
            <div className="space-y-6 mt-4">
              <div className="bg-white p-6 rounded-lg shadow border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                <h3 className="text-xl font-semibold mb-3">How does NPC Forge work?</h3>
                <p>
                  NPC Forge uses OpenAI's GPT-4o-mini model to generate character text and DALL-E 3 to create portraits. Your inputs and selections are processed into prompts that guide the AI in creating characters that match your specifications.
                </p>
              </div>
  
              <div className="bg-white p-6 rounded-lg shadow border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                <h3 className="text-xl font-semibold mb-3">Can I use NPC Forge offline?</h3>
                <p>
                  No, NPC Forge requires an internet connection to function because it relies on OpenAI's API services.
                </p>
              </div>
  
              <div className="bg-white p-6 rounded-lg shadow border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                <h3 className="text-xl font-semibold mb-3">What happens to my data?</h3>
                <p>
                  Your inputs are sent to OpenAI's API to generate content but are not stored. Generated characters exist only in your browser session until you download them. We do not collect or store character data.
                </p>
              </div>
  
              <div className="bg-white p-6 rounded-lg shadow border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                <h3 className="text-xl font-semibold mb-3">Why does character generation sometimes fail?</h3>
                <p>
                  Generation might fail due to:
                </p>
                <ul className="list-disc pl-5 mt-2">
                  <li>Network issues</li>
                  <li>OpenAI API limitations</li>
                  <li>Content policy violations in your inputs</li>
                  <li>Temporary service disruptions</li>
                </ul>
                <p className="mt-2">
                  Try simplifying your request or trying again later if you encounter problems.
                </p>
              </div>
            </div>
          </section>
  
          <section>
            <h2 className="text-2xl font-bold text-indigo-700 dark:text-indigo-400">Troubleshooting</h2>
            
            <div className="space-y-6 mt-4">
              <div className="bg-white p-6 rounded-lg shadow border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                <h3 className="text-xl font-semibold mb-3">Portrait generation failed but my character was created. What happened?</h3>
                <p>
                  Sometimes the portrait generation may fail while the character text succeeds. This can happen if:
                </p>
                <ul className="list-disc pl-5 mt-2">
                  <li>The portrait request times out</li>
                  <li>The description contains elements that DALL-E filters block</li>
                  <li>There's a temporary issue with the image generation service</li>
                </ul>
                <p className="mt-2">
                  You can still use the character without a portrait, or try generating a new character with adjusted descriptions.
                </p>
              </div>
  
              <div className="bg-white p-6 rounded-lg shadow border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                <h3 className="text-xl font-semibold mb-3">The character generation seems stuck. What should I do?</h3>
                <p>
                  If generation seems to be taking too long (more than 30 seconds):
                </p>
                <ol className="list-decimal pl-5 mt-2">
                  <li>Check your internet connection</li>
                  <li>Refresh the page and try again</li>
                  <li>Try a simpler character description</li>
                  <li>Clear your browser cache and retry</li>
                </ol>
              </div>
  
              <div className="bg-white p-6 rounded-lg shadow border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                <h3 className="text-xl font-semibold mb-3">How can I report issues or request features?</h3>
                <p>
                  You can:
                </p>
                <ul className="list-disc pl-5 mt-2">
                  <li>Open an issue on <a href="https://github.com/EthanPerello/npc-forge/issues" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300">GitHub</a></li>
                  <li>Contact the developer at <a href="mailto:ethanperello@gmail.com" className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300">ethanperello@gmail.com</a></li>
                </ul>
              </div>
            </div>
          </section>
  
          <section>
            <h2 className="text-2xl font-bold text-indigo-700 dark:text-indigo-400">Future Plans</h2>
            
            <div className="space-y-6 mt-4">
              <div className="bg-white p-6 rounded-lg shadow border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                <h3 className="text-xl font-semibold mb-3">Will there be more features added to NPC Forge?</h3>
                <p>
                  Yes! Planned features include:
                </p>
                <ul className="list-disc pl-5 mt-2">
                  <li>Character library for saving and organizing NPCs in your browser</li>
                  <li>Character editing capabilities</li>
                  <li>"Talk to NPC" chat interface for interactive conversations</li>
                  <li>Additional export formats (PDF, card, or image)</li>
                  <li>Integration with popular game engines and tabletop systems</li>
                </ul>
                <p className="mt-2">
                  See the <a href="/docs/roadmap" className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300">Roadmap</a> for more details on upcoming features.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }