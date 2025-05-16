import Link from 'next/link';
import Image from 'next/image';
import { Database, Edit, Search, Filter, Upload, Download, RotateCcw, Save } from 'lucide-react';

export const metadata = {
  title: 'Character Library Guide - NPC Forge',
  description: 'Complete guide to using the NPC Forge character library system for saving, managing, and editing generated characters.',
};

export default function LibraryPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">Character Library Guide</h1>
      
      <p className="lead mb-8 text-gray-700 dark:text-gray-300 text-lg">
        The Character Library is NPC Forge's system for saving, managing, and editing your generated characters. This comprehensive guide covers all aspects of using the library effectively.
      </p>
      
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-700 dark:text-indigo-400">Overview</h2>
        
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          The Character Library allows you to:
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="font-medium text-indigo-700 dark:text-indigo-400 mb-2 flex items-center">
              <Save className="h-4 w-4 mr-2" />
              Save & Store
            </h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300 text-sm">
              <li>Save unlimited characters locally using IndexedDB</li>
              <li>Automatic portrait storage with compression</li>
              <li>Complete character data preservation</li>
            </ul>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="font-medium text-indigo-700 dark:text-indigo-400 mb-2 flex items-center">
              <Edit className="h-4 w-4 mr-2" />
              Edit & Modify
            </h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300 text-sm">
              <li>Edit and modify existing characters</li>
              <li>Regenerate specific character elements</li>
              <li>Add/remove quests, dialogue, and items</li>
            </ul>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="font-medium text-indigo-700 dark:text-indigo-400 mb-2 flex items-center">
              <Search className="h-4 w-4 mr-2" />
              Search & Filter
            </h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300 text-sm">
              <li>Search and filter your collection</li>
              <li>Genre-based filtering</li>
              <li>Full-text search across character data</li>
            </ul>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="font-medium text-indigo-700 dark:text-indigo-400 mb-2 flex items-center">
              <Download className="h-4 w-4 mr-2" />
              Import & Export
            </h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300 text-sm">
              <li>Import and export characters as JSON</li>
              <li>Download character portraits</li>
              <li>Bulk operations and backups</li>
            </ul>
          </div>
        </div>
        
        <div className="my-4 border rounded-lg overflow-hidden shadow-md">
          <Image
            src="/images/character-library.png"
            alt="Character Library Overview"
            width={800}
            height={500}
            className="w-full"
          />
        </div>
      </div>
      
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-700 dark:text-indigo-400">Accessing the Library</h2>
        
        <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
          <p className="mb-4 text-gray-700 dark:text-gray-300">
            You can access the Character Library in several ways:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
            <li>Click <strong>Library</strong> in the main navigation</li>
            <li>Use the <strong>Save to Library</strong> button after generating a character</li>
            <li>Access saved characters through the wizard's <strong>Continue</strong> option</li>
          </ul>
        </div>
      </div>
      
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-700 dark:text-indigo-400">Saving Characters</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-lg font-medium mb-3 text-indigo-700 dark:text-indigo-400">From Generation</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-2">After generating a character in the wizard:</p>
            <ol className="list-decimal list-inside space-y-1 text-gray-700 dark:text-gray-300">
              <li>Review your character in the results step</li>
              <li>Click <strong>Save to Library</strong></li>
              <li>Character is automatically saved with name, portrait, and all attributes</li>
            </ol>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-lg font-medium mb-3 text-indigo-700 dark:text-indigo-400">Manual Save</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-2">When editing a character:</p>
            <ol className="list-decimal list-inside space-y-1 text-gray-700 dark:text-gray-300">
              <li>Make your desired changes</li>
              <li>Click <strong>Save Changes</strong> in the edit interface</li>
              <li>Updates are immediately saved to local storage</li>
            </ol>
          </div>
        </div>
      </div>
      
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-700 dark:text-indigo-400">Library Interface</h2>
        
        <div className="space-y-6">
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-lg font-medium mb-3 text-indigo-700 dark:text-indigo-400">Character Cards</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Each character is displayed as a visual card containing:
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300 mb-4">
              <li><strong>Character Portrait</strong>: AI-generated or uploaded image</li>
              <li><strong>Character Name</strong>: Primary identifier</li>
              <li><strong>Genre/Sub-genre Tags</strong>: Visual indicators of character type</li>
              <li><strong>Action Buttons</strong>: Direct access to common operations</li>
            </ul>
            
            <div className="my-4 border rounded-lg overflow-hidden shadow-md">
              <Image
                src="/images/fanned-cards.png"
                alt="Character Library Interface"
                width={800}
                height={500}
                className="w-full"
              />
            </div>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-lg font-medium mb-3 text-indigo-700 dark:text-indigo-400">Library Actions</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Each character card includes buttons for:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                  <li><strong>View/Edit</strong>: Open character in edit mode</li>
                  <li><strong>Download JSON</strong>: Export character data</li>
                </ul>
              </div>
              <div>
                <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                  <li><strong>Download Portrait</strong>: Save character image</li>
                  <li><strong>Delete</strong>: Remove character from library</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-700 dark:text-indigo-400">Character Editing</h2>
        
        <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 mb-6">
          <h3 className="text-lg font-medium mb-3 text-indigo-700 dark:text-indigo-400">Edit Interface</h3>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            The edit interface provides comprehensive character modification:
          </p>
          
          <div className="my-4 border rounded-lg overflow-hidden shadow-md">
            <Image
              src="/images/edit-page.png"
              alt="Character Edit Page"
              width={800}
              height={500}
              className="w-full"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Basic Information</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300 text-sm">
                <li>Edit character name directly</li>
                <li>Modify description and core attributes</li>
                <li>Update genre and sub-genre classifications</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Character Attributes</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300 text-sm">
                <li>Regenerate individual attributes</li>
                <li>Choose different AI models for regeneration</li>
                <li>Modify any text field manually</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Character Elements</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300 text-sm">
                <li><strong>Quests</strong>: Add, remove, or regenerate quests</li>
                <li><strong>Dialogue</strong>: Modify or regenerate dialogue lines</li>
                <li><strong>Items</strong>: Update or regenerate character inventory</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Portrait Management</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300 text-sm">
                <li>Upload custom portraits</li>
                <li>Regenerate portraits with different models</li>
                <li>Choose new art styles or expressions</li>
                <li>Download high-resolution images</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
          <h3 className="text-lg font-medium mb-3 text-indigo-700 dark:text-indigo-400 flex items-center">
            <RotateCcw className="h-5 w-5 mr-2" />
            Regeneration Features
          </h3>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Individual Attribute Regeneration</h4>
              <p className="text-gray-700 dark:text-gray-300 mb-2">Regenerate specific character elements:</p>
              <ol className="list-decimal list-inside space-y-1 text-gray-700 dark:text-gray-300">
                <li>Click the regenerate icon next to any attribute</li>
                <li>Choose your preferred AI model (if applicable)</li>
                <li>Wait for the new content to generate</li>
                <li>Review and save changes</li>
              </ol>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Quest Component Regeneration</h4>
              <p className="text-gray-700 dark:text-gray-300 mb-2">Regenerate individual parts of quests:</p>
              <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                <li>Quest title only</li>
                <li>Quest description only</li>
                <li>Quest reward only</li>
                <li>Complete quest regeneration</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Model Selection for Regeneration</h4>
              <p className="text-gray-700 dark:text-gray-300">When regenerating content, you can:</p>
              <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                <li>Choose different text models for attributes</li>
                <li>Select different image models for portraits</li>
                <li>Use higher-tier models for important characters</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-700 dark:text-indigo-400">Search and Filtering</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-lg font-medium mb-3 text-indigo-700 dark:text-indigo-400 flex items-center">
              <Search className="h-5 w-5 mr-2" />
              Search Functionality
            </h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
              <li><strong>Name Search</strong>: Find characters by name</li>
              <li><strong>Full-Text Search</strong>: Search descriptions and attributes</li>
              <li><strong>Case-Insensitive</strong>: Search works regardless of capitalization</li>
            </ul>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-lg font-medium mb-3 text-indigo-700 dark:text-indigo-400 flex items-center">
              <Filter className="h-5 w-5 mr-2" />
              Filter Options
            </h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
              <li><strong>By Genre</strong>: Filter Fantasy, Sci-Fi, Historical, Contemporary</li>
              <li><strong>By Sub-Genre</strong>: Narrow down to specific sub-genres</li>
              <li><strong>By Creation Date</strong>: Sort by newest or oldest first</li>
              <li><strong>By Last Modified</strong>: Find recently edited characters</li>
            </ul>
          </div>
        </div>
        
        <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 mt-4">
          <h3 className="text-lg font-medium mb-3 text-indigo-700 dark:text-indigo-400">Advanced Filtering</h3>
          <p className="text-gray-700 dark:text-gray-300 mb-2">Combine multiple filters:</p>
          <ol className="list-decimal list-inside space-y-1 text-gray-700 dark:text-gray-300">
            <li>Start with genre filter</li>
            <li>Add sub-genre specification</li>
            <li>Use search for specific names or terms</li>
            <li>Apply date sorting as needed</li>
          </ol>
        </div>
      </div>
      
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-700 dark:text-indigo-400">Import and Export</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-lg font-medium mb-3 text-indigo-700 dark:text-indigo-400 flex items-center">
              <Download className="h-5 w-5 mr-2" />
              JSON Export
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-2">Export individual characters:</p>
            <ol className="list-decimal list-inside space-y-1 text-gray-700 dark:text-gray-300">
              <li>Click "Download JSON" on any character card</li>
              <li>Choose save location on your device</li>
              <li>File contains complete character data including:</li>
            </ol>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300 ml-4 mt-2">
              <li>All attributes and traits</li>
              <li>Quest, dialogue, and item data</li>
              <li>Portrait URLs and options</li>
              <li>Creation and modification timestamps</li>
            </ul>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-lg font-medium mb-3 text-indigo-700 dark:text-indigo-400 flex items-center">
              <Upload className="h-5 w-5 mr-2" />
              JSON Import
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-2">Import characters from files:</p>
            <ol className="list-decimal list-inside space-y-1 text-gray-700 dark:text-gray-300">
              <li>Use "Import Character" option in library</li>
              <li>Select JSON file from your device</li>
              <li>Character is added to your library</li>
              <li>Conflicts with existing names are handled automatically</li>
            </ol>
          </div>
        </div>
        
        <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 mt-4">
          <h3 className="text-lg font-medium mb-3 text-indigo-700 dark:text-indigo-400">Bulk Operations</h3>
          <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
            <li><strong>Export All</strong>: Download your entire library as JSON</li>
            <li><strong>Backup Library</strong>: Create complete library backup</li>
            <li><strong>Restore from Backup</strong>: Import previously exported library</li>
          </ul>
        </div>
      </div>
      
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-700 dark:text-indigo-400">Storage and Performance</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-lg font-medium mb-3 text-indigo-700 dark:text-indigo-400 flex items-center">
              <Database className="h-5 w-5 mr-2" />
              IndexedDB Storage
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-2">The library uses IndexedDB for reliable storage:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
              <li><strong>Characters</strong>: Full character data stored locally</li>
              <li><strong>Portraits</strong>: Compressed images stored separately</li>
              <li><strong>Metadata</strong>: Search indices and timestamps</li>
              <li><strong>Automatic Cleanup</strong>: Orphaned data removed periodically</li>
            </ul>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-lg font-medium mb-3 text-indigo-700 dark:text-indigo-400">Storage Limits</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
              <li><strong>Character Data</strong>: No practical limit on number of characters</li>
              <li><strong>Portrait Storage</strong>: Automatic compression to optimize space</li>
              <li><strong>Browser Limits</strong>: Dependent on browser storage quotas</li>
              <li><strong>Storage Monitoring</strong>: Library displays storage usage information</li>
            </ul>
          </div>
        </div>
        
        <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 mt-4">
          <h3 className="text-lg font-medium mb-3 text-indigo-700 dark:text-indigo-400">Performance Optimization</h3>
          <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
            <li><strong>Lazy Loading</strong>: Characters loaded as needed</li>
            <li><strong>Image Compression</strong>: Portraits automatically compressed</li>
            <li><strong>Indexed Search</strong>: Fast search through large collections</li>
            <li><strong>Efficient Updates</strong>: Only changed data is saved</li>
          </ul>
        </div>
      </div>
      
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-700 dark:text-indigo-400">Library Management</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-lg font-medium mb-3 text-indigo-700 dark:text-indigo-400">Organization Tips</h3>
            <ol className="list-decimal list-inside space-y-1 text-gray-700 dark:text-gray-300">
              <li><strong>Consistent Naming</strong>: Use clear, descriptive names</li>
              <li><strong>Genre Organization</strong>: Group related characters by genre</li>
              <li><strong>Campaign Folders</strong>: Consider name prefixes for organization</li>
              <li><strong>Regular Backups</strong>: Export library periodically</li>
            </ol>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-lg font-medium mb-3 text-indigo-700 dark:text-indigo-400">Maintenance</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
              <li><strong>Remove Unused Characters</strong>: Delete characters no longer needed</li>
              <li><strong>Update Old Characters</strong>: Regenerate with newer models when available</li>
              <li><strong>Check Storage</strong>: Monitor browser storage usage</li>
              <li><strong>Validate Data</strong>: Ensure character integrity with test loads</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-700 dark:text-indigo-400">Troubleshooting</h2>
        
        <div className="space-y-6">
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-lg font-medium mb-3 text-indigo-700 dark:text-indigo-400">Common Issues</h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Characters Not Saving</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                  <li>Check browser storage permissions</li>
                  <li>Verify sufficient storage space</li>
                  <li>Try refreshing the page and saving again</li>
                  <li>Check browser console for error messages</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Missing Portraits</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                  <li>Portraits may fail to load due to network issues</li>
                  <li>Try regenerating the portrait</li>
                  <li>Upload a custom image as backup</li>
                  <li>Check browser's image loading settings</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Search Not Working</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                  <li>Clear and retry search terms</li>
                  <li>Check for typos in search query</li>
                  <li>Try filtering by genre first</li>
                  <li>Refresh the library view</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Slow Library Performance</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                  <li>Reduce number of visible characters with filtering</li>
                  <li>Close other browser tabs to free memory</li>
                  <li>Clear browser cache if needed</li>
                  <li>Consider exporting and removing old characters</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="text-lg font-medium mb-3 text-indigo-700 dark:text-indigo-400">Data Recovery</h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Lost Characters</h4>
                <p className="text-gray-700 dark:text-gray-300 mb-2">If characters disappear:</p>
                <ol className="list-decimal list-inside space-y-1 text-gray-700 dark:text-gray-300">
                  <li>Check browser storage settings</li>
                  <li>Look for browser data restoration options</li>
                  <li>Restore from previously exported JSON backup</li>
                  <li>Check if characters were saved to different browser profile</li>
                </ol>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Corrupted Data</h4>
                <p className="text-gray-700 dark:text-gray-300 mb-2">If library appears corrupted:</p>
                <ol className="list-decimal list-inside space-y-1 text-gray-700 dark:text-gray-300">
                  <li>Try refreshing the page</li>
                  <li>Clear browser cache for the site</li>
                  <li>Use "Reset Database" option if available</li>
                  <li>Restore from backup if necessary</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-4 bg-green-50 rounded-lg border border-green-200 dark:bg-green-900/20 dark:border-green-800 mb-8">
        <h2 className="text-xl font-semibold mb-2 text-green-700 dark:text-green-300">Best Practices</h2>
        <ul className="list-disc list-inside space-y-1 text-green-600 dark:text-green-400">
          <li><strong>Regular Backups</strong>: Export your library monthly or before major changes</li>
          <li><strong>Descriptive Names</strong>: Use clear, searchable character names</li>
          <li><strong>Organized Structure</strong>: Group characters by campaign or story</li>
          <li><strong>Version Management</strong>: Save character versions before major edits</li>
          <li><strong>Storage Monitoring</strong>: Keep an eye on browser storage usage</li>
        </ul>
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
            <Link href="/docs/character-examples" className="underline hover:text-indigo-800 dark:hover:text-indigo-300">
              Character Examples
            </Link>
            {" "}– Sample library characters
          </li>
          <li>
            <Link href="/docs/generation-options" className="underline hover:text-indigo-800 dark:hover:text-indigo-300">
              Generation Options
            </Link>
            {" "}– Customization settings
          </li>
          <li>
            <Link href="/docs/models" className="underline hover:text-indigo-800 dark:hover:text-indigo-300">
              Model Selection Guide
            </Link>
            {" "}– Understanding AI models
          </li>
          <li>
            <Link href="/docs/faq" className="underline hover:text-indigo-800 dark:hover:text-indigo-300">
              FAQ
            </Link>
            {" "}– Common questions and answers
          </li>
        </ul>
      </div>
    </div>
  );
}