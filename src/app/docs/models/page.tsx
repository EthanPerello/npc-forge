import Link from 'next/link';
import Image from 'next/image';
import { Cpu, Zap, Star, BarChart3, DollarSign, Timer } from 'lucide-react';

export const metadata = {
  title: 'Model Selection Guide - NPC Forge',
  description: 'Complete guide to NPC Forge AI model tiers, usage strategies, and optimization tips for text and image generation.',
};

export default function ModelsPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">Model Selection Guide</h1>
      
      <p className="lead mb-8 text-gray-700 dark:text-gray-300 text-lg">
        NPC Forge offers multiple AI models with different capabilities and usage limits. This guide explains the tiered model system, helps you choose the right models for your needs, and provides tips for optimizing your usage.
      </p>
      
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-700 dark:text-indigo-400">Overview</h2>
        
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          NPC Forge uses two types of AI models:
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="font-medium text-indigo-700 dark:text-indigo-400 mb-2 flex items-center">
              <Cpu className="h-5 w-5 mr-2" />
              Text Models
            </h3>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              For generating character attributes, quests, dialogue, and items
            </p>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="font-medium text-indigo-700 dark:text-indigo-400 mb-2 flex items-center">
              <Star className="h-5 w-5 mr-2" />
              Image Models
            </h3>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              For creating character portraits
            </p>
          </div>
        </div>
        
        <p className="text-gray-700 dark:text-gray-300">
          Each type offers three tiers with different quality levels and usage limits.
        </p>
        
        <div className="my-4 border rounded-lg overflow-hidden shadow-md">
          <Image
            src="/images/model-step.png"
            alt="Model Selection Interface"
            width={800}
            height={500}
            className="w-full"
          />
        </div>
      </div>
      
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-700 dark:text-indigo-400">Text Generation Models</h2>
        
        <div className="space-y-6">
          <div className="p-4 border-2 border-green-200 rounded-lg shadow-sm dark:border-green-800">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-medium text-green-700 dark:text-green-400 flex items-center">
                🟢 Standard Tier: gpt-4o-mini
              </h3>
              <div className="flex items-center space-x-2">
                <Zap className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium text-green-600 dark:text-green-400">Unlimited</span>
              </div>
            </div>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300 mb-3">
              <li><strong>Usage Limit</strong>: Unlimited</li>
              <li><strong>Best For</strong>: Regular character creation, experimentation, quick generation</li>
              <li><strong>Quality</strong>: Good baseline quality for most use cases</li>
              <li><strong>Speed</strong>: Fast generation times</li>
              <li><strong>Cost</strong>: Most economical option</li>
            </ul>
            <div className="bg-green-50 p-3 rounded-md dark:bg-green-900/20">
              <h4 className="font-medium text-green-800 dark:text-green-300 mb-1">When to Use Standard:</h4>
              <ul className="list-disc list-inside space-y-1 text-green-700 dark:text-green-400 text-sm">
                <li>Creating multiple characters for playtesting</li>
                <li>Generating NPCs for quick encounters</li>
                <li>Experimenting with different character concepts</li>
                <li>Building your initial character library</li>
              </ul>
            </div>
          </div>
          
          <div className="p-4 border-2 border-yellow-200 rounded-lg shadow-sm dark:border-yellow-800">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-medium text-yellow-700 dark:text-yellow-400 flex items-center">
                🟡 Enhanced Tier: gpt-4.1-mini
              </h3>
              <div className="flex items-center space-x-2">
                <BarChart3 className="h-4 w-4 text-yellow-600" />
                <span className="text-sm font-medium text-yellow-600 dark:text-yellow-400">30/month</span>
              </div>
            </div>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300 mb-3">
              <li><strong>Usage Limit</strong>: 30 generations per month</li>
              <li><strong>Best For</strong>: Important characters requiring higher quality</li>
              <li><strong>Quality</strong>: Improved detail and narrative consistency</li>
              <li><strong>Speed</strong>: Moderate generation times</li>
              <li><strong>Features</strong>: Better personality depth, more creative backstories</li>
            </ul>
            <div className="bg-yellow-50 p-3 rounded-md dark:bg-yellow-900/20">
              <h4 className="font-medium text-yellow-800 dark:text-yellow-300 mb-1">When to Use Enhanced:</h4>
              <ul className="list-disc list-inside space-y-1 text-yellow-700 dark:text-yellow-400 text-sm">
                <li>Creating main story NPCs</li>
                <li>Characters with complex backstories</li>
                <li>Important recurring characters</li>
                <li>When you need more detailed descriptions</li>
              </ul>
            </div>
          </div>
          
          <div className="p-4 border-2 border-red-200 rounded-lg shadow-sm dark:border-red-800">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-medium text-red-700 dark:text-red-400 flex items-center">
                🔴 Premium Tier: gpt-4o
              </h3>
              <div className="flex items-center space-x-2">
                <Star className="h-4 w-4 text-red-600" />
                <span className="text-sm font-medium text-red-600 dark:text-red-400">10/month</span>
              </div>
            </div>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300 mb-3">
              <li><strong>Usage Limit</strong>: 10 generations per month</li>
              <li><strong>Best For</strong>: Critical characters needing maximum detail</li>
              <li><strong>Quality</strong>: Highest quality output with rich detail</li>
              <li><strong>Speed</strong>: Longer generation times</li>
              <li><strong>Features</strong>: Most sophisticated character development, complex personalities</li>
            </ul>
            <div className="bg-red-50 p-3 rounded-md dark:bg-red-900/20">
              <h4 className="font-medium text-red-800 dark:text-red-300 mb-1">When to Use Premium:</h4>
              <ul className="list-disc list-inside space-y-1 text-red-700 dark:text-red-400 text-sm">
                <li>Primary antagonists or protagonists</li>
                <li>Major campaign characters</li>
                <li>Characters central to your story</li>
                <li>When maximum quality is essential</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-700 dark:text-indigo-400">Image Generation Models</h2>
        
        <div className="space-y-6">
          <div className="p-4 border-2 border-green-200 rounded-lg shadow-sm dark:border-green-800">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-medium text-green-700 dark:text-green-400 flex items-center">
                🟢 Standard Tier: DALL-E 2
              </h3>
              <div className="flex items-center space-x-2">
                <Zap className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium text-green-600 dark:text-green-400">Unlimited</span>
              </div>
            </div>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300 mb-3">
              <li><strong>Usage Limit</strong>: Unlimited</li>
              <li><strong>Resolution</strong>: 1024x1024 pixels</li>
              <li><strong>Style Adherence</strong>: Good basic portrait generation</li>
              <li><strong>Best For</strong>: Quick character visualization, concept art</li>
            </ul>
            <div className="bg-green-50 p-3 rounded-md dark:bg-green-900/20">
              <h4 className="font-medium text-green-800 dark:text-green-300 mb-1">When to Use DALL-E 2:</h4>
              <ul className="list-disc list-inside space-y-1 text-green-700 dark:text-green-400 text-sm">
                <li>Creating portraits for all characters in your library</li>
                <li>Generating reference images quickly</li>
                <li>Experimenting with different character appearances</li>
                <li>Building visual character collections</li>
              </ul>
            </div>
          </div>
          
          <div className="p-4 border-2 border-yellow-200 rounded-lg shadow-sm dark:border-yellow-800">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-medium text-yellow-700 dark:text-yellow-400 flex items-center">
                🟡 Enhanced Tier: DALL-E 3
              </h3>
              <div className="flex items-center space-x-2">
                <BarChart3 className="h-4 w-4 text-yellow-600" />
                <span className="text-sm font-medium text-yellow-600 dark:text-yellow-400">30/month</span>
              </div>
            </div>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300 mb-3">
              <li><strong>Usage Limit</strong>: 30 generations per month</li>
              <li><strong>Resolution</strong>: 1024x1024 pixels</li>
              <li><strong>Style Adherence</strong>: Improved detail and artistic quality</li>
              <li><strong>Best For</strong>: Important character portraits, detailed artwork</li>
            </ul>
            <div className="bg-yellow-50 p-3 rounded-md dark:bg-yellow-900/20">
              <h4 className="font-medium text-yellow-800 dark:text-yellow-300 mb-1">When to Use DALL-E 3:</h4>
              <ul className="list-disc list-inside space-y-1 text-yellow-700 dark:text-yellow-400 text-sm">
                <li>Main character portraits</li>
                <li>Characters requiring specific artistic styles</li>
                <li>High-quality images for presentations</li>
                <li>Detailed character visualization</li>
              </ul>
            </div>
          </div>
          
          <div className="p-4 border-2 border-red-200 rounded-lg shadow-sm dark:border-red-800">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-medium text-red-700 dark:text-red-400 flex items-center">
                🔴 Premium Tier: gpt-image-1
              </h3>
              <div className="flex items-center space-x-2">
                <Star className="h-4 w-4 text-red-600" />
                <span className="text-sm font-medium text-red-600 dark:text-red-400">10/month</span>
              </div>
            </div>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300 mb-3">
              <li><strong>Usage Limit</strong>: 10 generations per month</li>
              <li><strong>Resolution</strong>: High quality with enhanced detail</li>
              <li><strong>Style Adherence</strong>: Maximum artistic control and quality</li>
              <li><strong>Best For</strong>: Showcase-quality character art</li>
            </ul>
            <div className="bg-red-50 p-3 rounded-md dark:bg-red-900/20">
              <h4 className="font-medium text-red-800 dark:text-red-300 mb-1">When to Use gpt-image-1:</h4>
              <ul className="list-disc list-inside space-y-1 text-red-700 dark:text-red-400 text-sm">
                <li>Hero characters and main villains</li>
                <li>Professional-quality character art</li>
                <li>Characters for published content</li>
                <li>Maximum artistic fidelity required</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-700 dark:text-indigo-400">Usage Strategy</h2>
        
        <div className="space-y-6">
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-lg font-medium mb-3 text-indigo-700 dark:text-indigo-400">Monthly Planning</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-3 bg-blue-50 rounded-lg border border-blue-200 dark:bg-blue-900/20 dark:border-blue-800">
                <h4 className="font-medium text-blue-800 dark:text-blue-300 mb-2">Standard Strategy</h4>
                <p className="text-blue-700 dark:text-blue-400 text-sm mb-2">(Most Users)</p>
                <ul className="list-disc list-inside space-y-1 text-blue-700 dark:text-blue-400 text-sm">
                  <li>Use unlimited Standard models for most characters</li>
                  <li>Reserve Enhanced tier for 5-10 important characters per month</li>
                  <li>Save Premium tier for 2-3 critical characters</li>
                </ul>
              </div>
              
              <div className="p-3 bg-purple-50 rounded-lg border border-purple-200 dark:bg-purple-900/20 dark:border-purple-800">
                <h4 className="font-medium text-purple-800 dark:text-purple-300 mb-2">Balanced Strategy</h4>
                <p className="text-purple-700 dark:text-purple-400 text-sm mb-2">(Regular Users)</p>
                <ul className="list-disc list-inside space-y-1 text-purple-700 dark:text-purple-400 text-sm">
                  <li>Mix of Standard and Enhanced for variety</li>
                  <li>Use Premium sparingly for special occasions</li>
                  <li>Monitor usage throughout the month</li>
                </ul>
              </div>
              
              <div className="p-3 bg-orange-50 rounded-lg border border-orange-200 dark:bg-orange-900/20 dark:border-orange-800">
                <h4 className="font-medium text-orange-800 dark:text-orange-300 mb-2">Premium Strategy</h4>
                <p className="text-orange-700 dark:text-orange-400 text-sm mb-2">(Quality-Focused)</p>
                <ul className="list-disc list-inside space-y-1 text-orange-700 dark:text-orange-400 text-sm">
                  <li>Primarily Enhanced and Premium models</li>
                  <li>Standard only for quick concepts</li>
                  <li>Careful planning of monthly generation budget</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-lg font-medium mb-3 text-indigo-700 dark:text-indigo-400">Model Combination Tips</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Efficient Combinations:</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                  <li><strong>Standard Text + Enhanced Image</strong>: Good balance of quality and usage</li>
                  <li><strong>Enhanced Text + Standard Image</strong>: Better descriptions with quick visualization</li>
                  <li><strong>Premium Text + Enhanced Image</strong>: Maximum character depth with quality portraits</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Cost-Effective Approach:</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                  <li>Generate with Standard models first</li>
                  <li>Regenerate important characters with higher tiers</li>
                  <li>Use Enhanced/Premium selectively for final versions</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-700 dark:text-indigo-400">Usage Tracking</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-lg font-medium mb-3 text-indigo-700 dark:text-indigo-400 flex items-center">
              <BarChart3 className="h-5 w-5 mr-2" />
              Monitoring Your Limits
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-2">The interface displays:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
              <li>Remaining generations for each model</li>
              <li>Current month's usage</li>
              <li>Most constrained model when multiple are selected</li>
              <li>Warning indicators when approaching limits</li>
            </ul>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-lg font-medium mb-3 text-indigo-700 dark:text-indigo-400 flex items-center">
              <Timer className="h-5 w-5 mr-2" />
              Monthly Reset
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-2">All usage limits reset on the 1st of each month at 00:00 UTC.</p>
            <div className="bg-yellow-50 p-3 rounded-md border border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800">
              <p className="text-yellow-800 dark:text-yellow-300 text-sm">
                <strong>Development Mode Override:</strong> In development environments, usage limits are bypassed for testing purposes.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-700 dark:text-indigo-400">Regeneration with Models</h2>
        
        <div className="space-y-6">
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-lg font-medium mb-3 text-indigo-700 dark:text-indigo-400">Selective Regeneration</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-2">When editing characters, you can:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
              <li>Regenerate individual attributes with different text models</li>
              <li>Update portraits with different image models</li>
              <li>Mix and match models for optimal results</li>
            </ul>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-lg font-medium mb-3 text-indigo-700 dark:text-indigo-400">Regeneration Strategy</h3>
            <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300">
              <li><strong>Start with Standard</strong>: Generate initial character with unlimited model</li>
              <li><strong>Identify Key Areas</strong>: Determine which aspects need improvement</li>
              <li><strong>Selective Upgrade</strong>: Regenerate specific elements with higher-tier models</li>
              <li><strong>Final Polish</strong>: Use Premium models for critical final touches</li>
            </ol>
          </div>
        </div>
      </div>
      
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-700 dark:text-indigo-400">Quality Differences</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-lg font-medium mb-3 text-indigo-700 dark:text-indigo-400">Text Model Comparison</h3>
            
            <div className="space-y-3">
              <div>
                <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-1">Character Depth:</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300 text-sm">
                  <li><strong>Standard</strong>: Basic but functional character profiles</li>
                  <li><strong>Enhanced</strong>: More nuanced personalities and backstories</li>
                  <li><strong>Premium</strong>: Rich, complex character development</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-1">Narrative Consistency:</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300 text-sm">
                  <li><strong>Standard</strong>: Generally consistent within character</li>
                  <li><strong>Enhanced</strong>: Better internal logic and coherence</li>
                  <li><strong>Premium</strong>: Seamless narrative integration</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-1">Creative Details:</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300 text-sm">
                  <li><strong>Standard</strong>: Straightforward descriptions</li>
                  <li><strong>Enhanced</strong>: More creative and interesting details</li>
                  <li><strong>Premium</strong>: Highly creative and unique elements</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-lg font-medium mb-3 text-indigo-700 dark:text-indigo-400">Image Model Comparison</h3>
            
            <div className="space-y-3">
              <div>
                <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-1">Visual Quality:</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300 text-sm">
                  <li><strong>DALL-E 2</strong>: Clear, recognizable portraits</li>
                  <li><strong>DALL-E 3</strong>: Enhanced detail and artistic quality</li>
                  <li><strong>gpt-image-1</strong>: Maximum visual fidelity and style control</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-1">Style Adherence:</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300 text-sm">
                  <li><strong>DALL-E 2</strong>: Basic style interpretation</li>
                  <li><strong>DALL-E 3</strong>: Better understanding of artistic styles</li>
                  <li><strong>gpt-image-1</strong>: Precise style and mood control</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-700 dark:text-indigo-400">Best Practices</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-lg font-medium mb-3 text-indigo-700 dark:text-indigo-400">Efficient Usage</h3>
            <ol className="list-decimal list-inside space-y-1 text-gray-700 dark:text-gray-300">
              <li><strong>Plan Your Month</strong>: Identify which characters need higher-tier models</li>
              <li><strong>Start Low, Upgrade High</strong>: Generate with Standard, regenerate important parts with Premium</li>
              <li><strong>Batch Similar Characters</strong>: Generate related characters together for consistency</li>
              <li><strong>Save Premium for Finals</strong>: Use highest tier for completed, final characters</li>
            </ol>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-lg font-medium mb-3 text-indigo-700 dark:text-indigo-400">Quality Optimization</h3>
            <ol className="list-decimal list-inside space-y-1 text-gray-700 dark:text-gray-300">
              <li><strong>Detailed Descriptions</strong>: Provide rich context regardless of model tier</li>
              <li><strong>Specific Traits</strong>: Well-defined characteristics improve output quality</li>
              <li><strong>Iterative Improvement</strong>: Use regeneration to refine character elements</li>
              <li><strong>Model Matching</strong>: Match model tier to character importance</li>
            </ol>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-lg font-medium mb-3 text-indigo-700 dark:text-indigo-400">Cost Management</h3>
            <ol className="list-decimal list-inside space-y-1 text-gray-700 dark:text-gray-300">
              <li><strong>Track Usage</strong>: Monitor your monthly consumption regularly</li>
              <li><strong>Strategic Saving</strong>: Reserve high-tier models for month-end if needed</li>
              <li><strong>Standard First</strong>: Use unlimited Standard models for experimentation</li>
              <li><strong>Selective Regeneration</strong>: Only regenerate elements that need improvement</li>
            </ol>
          </div>
        </div>
      </div>
      
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-700 dark:text-indigo-400">Model Comparison Table</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 dark:border-gray-700">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800">
                <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left">Aspect</th>
                <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-center">🟢 Standard</th>
                <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-center">🟡 Enhanced</th>
                <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-center">🔴 Premium</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-medium">Text Quality</td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-center">Good</td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-center">Better</td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-center">Best</td>
              </tr>
              <tr>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-medium">Image Quality</td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-center">Good</td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-center">Better</td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-center">Best</td>
              </tr>
              <tr>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-medium">Usage Limit</td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-center">Unlimited</td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-center">30/month</td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-center">10/month</td>
              </tr>
              <tr>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-medium">Generation Speed</td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-center">Fast</td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-center">Medium</td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-center">Slower</td>
              </tr>
              <tr>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-medium">Detail Level</td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-center">Basic</td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-center">Enhanced</td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-center">Maximum</td>
              </tr>
              <tr>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-medium">Best Use</td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-center">Regular use</td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-center">Important characters</td>
                <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-center">Critical characters</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-700 dark:text-indigo-400">Troubleshooting</h2>
        
        <div className="space-y-4">
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-lg font-medium mb-2 text-indigo-700 dark:text-indigo-400">Model Selection Issues</h3>
            <div className="space-y-2">
              <div>
                <strong className="text-gray-800 dark:text-gray-200">Model Not Available:</strong>
                <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300 text-sm ml-4">
                  <li>Check if you've reached monthly limit</li>
                  <li>Verify model selection in interface</li>
                  <li>Try refreshing the page</li>
                </ul>
              </div>
              
              <div>
                <strong className="text-gray-800 dark:text-gray-200">Unexpected Quality:</strong>
                <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300 text-sm ml-4">
                  <li>Ensure you're using the expected model tier</li>
                  <li>Check character description detail</li>
                  <li>Try regenerating with more specific traits</li>
                </ul>
              </div>
              
              <div>
                <strong className="text-gray-800 dark:text-gray-200">Generation Failures:</strong>
                <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300 text-sm ml-4">
                  <li>Higher-tier models may be temporarily unavailable</li>
                  <li>Try falling back to lower tier</li>
                  <li>Check network connection and retry</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 dark:bg-blue-900/20 dark:border-blue-800 mb-8">
        <h2 className="text-xl font-semibold mb-2 text-blue-700 dark:text-blue-300">Future Model Updates</h2>
        <p className="text-blue-600 dark:text-blue-400 mb-2">
          NPC Forge regularly evaluates new AI models and may add:
        </p>
        <ul className="list-disc list-inside space-y-1 text-blue-600 dark:text-blue-400">
          <li>New model tiers with different capabilities</li>
          <li>Specialized models for specific character types</li>
          <li>Updated models with improved performance</li>
          <li>Regional model availability</li>
        </ul>
        <p className="mt-3 text-blue-600 dark:text-blue-400 text-sm">
          Stay updated through release notes, documentation updates, and in-app announcements.
        </p>
      </div>
      
      <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200 dark:bg-indigo-900/20 dark:border-indigo-800 mb-8">
        <h2 className="text-xl font-semibold mb-2 text-indigo-700 dark:text-indigo-300">Related Documentation</h2>
        <ul className="list-disc list-inside space-y-1 text-indigo-600 dark:text-indigo-400">
          <li>
            <Link href="/docs/how-to-use" className="underline hover:text-indigo-800 dark:hover:text-indigo-300">
              How to Use NPC Forge
            </Link>
            {" "}– Complete creation guide
          </li>
          <li>
            <Link href="/docs/generation-options" className="underline hover:text-indigo-800 dark:hover:text-indigo-300">
              Generation Options
            </Link>
            {" "}– Detailed customization
          </li>
          <li>
            <Link href="/docs/library" className="underline hover:text-indigo-800 dark:hover:text-indigo-300">
              Character Library
            </Link>
            {" "}– Managing characters and regeneration
          </li>
          <li>
            <Link href="/docs/api" className="underline hover:text-indigo-800 dark:hover:text-indigo-300">
              API Documentation
            </Link>
            {" "}– Technical model selection details
          </li>
          <li>
            <Link href="/docs/roadmap" className="underline hover:text-indigo-800 dark:hover:text-indigo-300">
              Roadmap
            </Link>
            {" "}– Future model improvements
          </li>
        </ul>
      </div>
    </div>
  );
}