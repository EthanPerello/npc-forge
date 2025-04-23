import Link from 'next/link';
import { Beaker, CheckCircle, AlertCircle, Monitor } from 'lucide-react';

export default function TestingPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Testing Guide</h1>
      
      <p className="lead mb-8">
        This document outlines the testing approach for NPC Forge, including manual testing procedures, potential automated testing strategies, and best practices for ensuring quality.
      </p>
      
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Current Testing Approach</h2>
        
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          NPC Forge currently relies on manual testing for quality assurance. This document provides structured procedures to ensure thorough testing across all features.
        </p>
        
        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 mb-6 dark:bg-blue-900/20 dark:border-blue-800">
          <h3 className="text-lg font-medium text-blue-800 mb-2 dark:text-blue-300 flex items-center">
            <Beaker className="h-5 w-5 mr-2" />
            Testing Philosophy
          </h3>
          <p className="text-blue-700 dark:text-blue-400">
            Our approach prioritizes thorough testing of the user experience and API integrations to ensure that character generation delivers consistent, high-quality results while maintaining a smooth, intuitive interface.
          </p>
        </div>
      </div>
      
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Manual Testing Checklist</h2>
        
        <div className="space-y-8">
          {/* Core Functionality */}
          <div>
            <h3 className="text-xl font-medium mb-3 text-indigo-700 dark:text-indigo-300">Core Functionality</h3>
            
            <div className="space-y-4">
              <div className="p-4 border border-gray-200 rounded-lg dark:border-gray-700">
                <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Character Generation</h4>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 relative top-0.5">
                      <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600" />
                    </div>
                    <span className="ml-2 text-gray-700 dark:text-gray-300">Basic character generation with minimal inputs</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 relative top-0.5">
                      <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600" />
                    </div>
                    <span className="ml-2 text-gray-700 dark:text-gray-300">Generation with all options specified</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 relative top-0.5">
                      <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600" />
                    </div>
                    <span className="ml-2 text-gray-700 dark:text-gray-300">Generation with different genres and sub-genres</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 relative top-0.5">
                      <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600" />
                    </div>
                    <span className="ml-2 text-gray-700 dark:text-gray-300">Validation of required fields (description)</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 relative top-0.5">
                      <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600" />
                    </div>
                    <span className="ml-2 text-gray-700 dark:text-gray-300">Error handling for invalid inputs</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 relative top-0.5">
                      <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600" />
                    </div>
                    <span className="ml-2 text-gray-700 dark:text-gray-300">Character JSON structure validation</span>
                  </li>
                </ul>
              </div>
              
              <div className="p-4 border border-gray-200 rounded-lg dark:border-gray-700">
                <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Portrait Generation</h4>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 relative top-0.5">
                      <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600" />
                    </div>
                    <span className="ml-2 text-gray-700 dark:text-gray-300">Basic portrait generation</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 relative top-0.5">
                      <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600" />
                    </div>
                    <span className="ml-2 text-gray-700 dark:text-gray-300">Portrait generation with customization options</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 relative top-0.5">
                      <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600" />
                    </div>
                    <span className="ml-2 text-gray-700 dark:text-gray-300">Fallback handling when portrait generation fails</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 relative top-0.5">
                      <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600" />
                    </div>
                    <span className="ml-2 text-gray-700 dark:text-gray-300">Portrait rendering in the UI</span>
                  </li>
                </ul>
              </div>
              
              <div className="p-4 border border-gray-200 rounded-lg dark:border-gray-700">
                <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Usage Limits</h4>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 relative top-0.5">
                      <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600" />
                    </div>
                    <span className="ml-2 text-gray-700 dark:text-gray-300">Proper counting of character generations</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 relative top-0.5">
                      <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600" />
                    </div>
                    <span className="ml-2 text-gray-700 dark:text-gray-300">Correct display of remaining generations</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 relative top-0.5">
                      <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600" />
                    </div>
                    <span className="ml-2 text-gray-700 dark:text-gray-300">Monthly reset functionality</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 relative top-0.5">
                      <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600" />
                    </div>
                    <span className="ml-2 text-gray-700 dark:text-gray-300">Dev mode bypass functionality</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* User Interface */}
          <div>
            <h3 className="text-xl font-medium mb-3 text-indigo-700 dark:text-indigo-300">User Interface</h3>
            
            <div className="space-y-4">
              <div className="p-4 border border-gray-200 rounded-lg dark:border-gray-700">
                <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Form Controls</h4>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 relative top-0.5">
                      <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600" />
                    </div>
                    <span className="ml-2 text-gray-700 dark:text-gray-300">All form inputs work correctly</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 relative top-0.5">
                      <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600" />
                    </div>
                    <span className="ml-2 text-gray-700 dark:text-gray-300">Form validation provides appropriate feedback</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 relative top-0.5">
                      <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600" />
                    </div>
                    <span className="ml-2 text-gray-700 dark:text-gray-300">Tab navigation functions correctly</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 relative top-0.5">
                      <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600" />
                    </div>
                    <span className="ml-2 text-gray-700 dark:text-gray-300">Expandable sections open and close properly</span>
                  </li>
                </ul>
              </div>
              
              <div className="p-4 border border-gray-200 rounded-lg dark:border-gray-700">
                <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Responsive Design</h4>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 relative top-0.5">
                      <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600" />
                    </div>
                    <span className="ml-2 text-gray-700 dark:text-gray-300">Desktop layout renders correctly</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 relative top-0.5">
                      <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600" />
                    </div>
                    <span className="ml-2 text-gray-700 dark:text-gray-300">Tablet layout adjusts appropriately</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 relative top-0.5">
                      <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600" />
                    </div>
                    <span className="ml-2 text-gray-700 dark:text-gray-300">Mobile layout is usable</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 relative top-0.5">
                      <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600" />
                    </div>
                    <span className="ml-2 text-gray-700 dark:text-gray-300">Touch interactions work on mobile devices</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Edge Cases */}
          <div>
            <h3 className="text-xl font-medium mb-3 text-indigo-700 dark:text-indigo-300">Edge Cases</h3>
            
            <div className="p-4 border border-gray-200 rounded-lg dark:border-gray-700">
              <ul className="space-y-2">
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 relative top-0.5">
                    <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600" />
                  </div>
                  <span className="ml-2 text-gray-700 dark:text-gray-300">Extremely long inputs are handled gracefully</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 relative top-0.5">
                    <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600" />
                  </div>
                  <span className="ml-2 text-gray-700 dark:text-gray-300">Special characters and Unicode are supported</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 relative top-0.5">
                    <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600" />
                  </div>
                  <span className="ml-2 text-gray-700 dark:text-gray-300">Very short descriptions still produce reasonable results</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 relative top-0.5">
                    <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600" />
                  </div>
                  <span className="ml-2 text-gray-700 dark:text-gray-300">Failure states are handled with appropriate messaging</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 relative top-0.5">
                    <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600" />
                  </div>
                  <span className="ml-2 text-gray-700 dark:text-gray-300">Network interruptions are handled gracefully</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Manual Testing Procedure</h2>
        
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          Follow this procedure when testing new features or changes:
        </p>
        
        <div className="space-y-4">
          <div className="p-4 bg-indigo-50 rounded-lg dark:bg-indigo-900/20">
            <h3 className="text-lg font-medium mb-2 text-indigo-700 dark:text-indigo-300 flex items-center">
              <CheckCircle className="h-5 w-5 mr-2" />
              Preparation
            </h3>
            <ul className="list-disc list-inside space-y-1 text-indigo-600 dark:text-indigo-400">
              <li>Start with a clean development environment</li>
              <li>Ensure you have the latest code</li>
              <li>Set up the <code className="bg-indigo-100 p-1 rounded dark:bg-indigo-800">.env.local</code> file with your OpenAI API key</li>
            </ul>
          </div>
          
          <div className="p-4 bg-indigo-50 rounded-lg dark:bg-indigo-900/20">
            <h3 className="text-lg font-medium mb-2 text-indigo-700 dark:text-indigo-300 flex items-center">
              <CheckCircle className="h-5 w-5 mr-2" />
              Basic Testing
            </h3>
            <ul className="list-disc list-inside space-y-1 text-indigo-600 dark:text-indigo-400">
              <li>Test the happy path (expected inputs and workflow)</li>
              <li>Verify outputs match expected results</li>
              <li>Check UI rendering and interactions</li>
            </ul>
          </div>
          
          <div className="p-4 bg-indigo-50 rounded-lg dark:bg-indigo-900/20">
            <h3 className="text-lg font-medium mb-2 text-indigo-700 dark:text-indigo-300 flex items-center">
              <AlertCircle className="h-5 w-5 mr-2" />
              Edge Case Testing
            </h3>
            <ul className="list-disc list-inside space-y-1 text-indigo-600 dark:text-indigo-400">
              <li>Test with minimal inputs</li>
              <li>Test with extreme inputs</li>
              <li>Test with unexpected inputs</li>
              <li>Test error conditions</li>
            </ul>
          </div>
          
          <div className="p-4 bg-indigo-50 rounded-lg dark:bg-indigo-900/20">
            <h3 className="text-lg font-medium mb-2 text-indigo-700 dark:text-indigo-300 flex items-center">
              <Monitor className="h-5 w-5 mr-2" />
              Cross-browser Testing
            </h3>
            <ul className="list-disc list-inside space-y-1 text-indigo-600 dark:text-indigo-400">
              <li>Verify functionality in Chrome, Firefox, Safari, and Edge</li>
              <li>Check for rendering differences</li>
              <li>Verify responsive breakpoints work across browsers</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Future Automated Testing</h2>
        
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          While NPC Forge currently relies on manual testing, future development should include automated testing. Here are recommendations for implementing automated tests:
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 border border-gray-200 rounded-lg dark:border-gray-700">
            <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Unit Tests</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-2">Implement unit tests for:</p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 text-sm">
              <li>Utility functions in <code className="bg-gray-100 p-1 rounded dark:bg-gray-800">/src/lib/utils.ts</code></li>
              <li>Context providers</li>
              <li>API route handlers (mocking OpenAI responses)</li>
              <li>Component props and state management</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 mt-2 text-sm">Recommended tools:</p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 text-sm">
              <li>Jest</li>
              <li>React Testing Library</li>
            </ul>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg dark:border-gray-700">
            <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Integration Tests</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-2">Implement integration tests for:</p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 text-sm">
              <li>Form submission workflows</li>
              <li>Character generation flow</li>
              <li>Navigation and routing</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 mt-2 text-sm">Recommended tools:</p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 text-sm">
              <li>Cypress</li>
              <li>Playwright</li>
            </ul>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg dark:border-gray-700">
            <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-2">E2E Tests</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-2">Implement end-to-end tests for:</p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 text-sm">
              <li>Complete user journeys</li>
              <li>Cross-browser compatibility</li>
              <li>Mobile compatibility</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 mt-2 text-sm">Recommended tools:</p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 text-sm">
              <li>Cypress</li>
              <li>Playwright</li>
            </ul>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg dark:border-gray-700">
            <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Visual Regression Tests</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-2">Consider visual regression tests for:</p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 text-sm">
              <li>UI components</li>
              <li>Generated character cards</li>
              <li>Responsive layouts</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 mt-2 text-sm">Recommended tools:</p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 text-sm">
              <li>Percy</li>
              <li>Chromatic</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 dark:bg-blue-900/20 dark:border-blue-800">
        <h2 className="text-xl font-semibold mb-2 text-blue-700 dark:text-blue-300">Related Documentation</h2>
        <ul className="list-disc list-inside space-y-1 text-blue-600 dark:text-blue-400">
          <li>
            <Link href="/docs/contributing" className="underline hover:text-blue-800 dark:hover:text-blue-300">
              Contributing Guidelines
            </Link>
            {" "}for contribution workflows
          </li>
          <li>
            <Link href="/docs/deployment" className="underline hover:text-blue-800 dark:hover:text-blue-300">
              Deployment Guide
            </Link>
            {" "}for deployment procedures
          </li>
          <li>
            <Link href="/docs/architecture" className="underline hover:text-blue-800 dark:hover:text-blue-300">
              Architecture Overview
            </Link>
            {" "}for system understanding
          </li>
        </ul>
      </div>
    </div>
  );
}