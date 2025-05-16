import Link from 'next/link';
import { Beaker, CheckCircle, AlertCircle, Monitor, TestTube2, Bug } from 'lucide-react';

export const metadata = {
  title: 'Testing Guide - NPC Forge Documentation',
  description: 'Manual testing procedures and quality assurance for NPC Forge',
};

export default function TestingPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">Testing Guide</h1>
      
      <p className="lead mb-8 text-gray-700 dark:text-gray-300 text-lg">
        This document outlines the testing approach for NPC Forge, including manual testing procedures, potential automated testing strategies, and best practices for ensuring quality.
      </p>
      
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-700 dark:text-indigo-400">Current Testing Approach</h2>
        
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          NPC Forge currently relies on manual testing for quality assurance. This document provides structured procedures to ensure thorough testing across all features.
        </p>
        
        <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-lg mb-6 dark:bg-indigo-900/20 dark:border-indigo-800">
          <h3 className="text-lg font-medium text-indigo-700 mb-2 dark:text-indigo-300 flex items-center">
            <Beaker className="h-5 w-5 mr-2" />
            Testing Philosophy
          </h3>
          <p className="text-indigo-600 dark:text-indigo-400">
            Our approach prioritizes thorough testing of the user experience and API integrations to ensure that character generation delivers consistent, high-quality results while maintaining a smooth, intuitive interface.
          </p>
        </div>
      </div>
      
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-700 dark:text-indigo-400">Manual Testing Checklist</h2>
        
        <div className="space-y-8">
          {/* Core Functionality */}
          <div>
            <h3 className="text-xl font-medium mb-4 text-indigo-700 dark:text-indigo-400">Core Functionality</h3>
            
            <div className="space-y-4">
              <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
                <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-3">Character Generation Wizard</h4>
                <div className="space-y-3">
                  <div>
                    <p className="font-medium text-indigo-700 dark:text-indigo-400 mb-2">Concept Step</p>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <div className="flex-shrink-0 h-5 w-5 relative top-0.5">
                          <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600" />
                        </div>
                        <span className="ml-2 text-gray-700 dark:text-gray-300">Genre selection updates sub-genre options correctly</span>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 h-5 w-5 relative top-0.5">
                          <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600" />
                        </div>
                        <span className="ml-2 text-gray-700 dark:text-gray-300">Description field accepts input and persists across navigation</span>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 h-5 w-5 relative top-0.5">
                          <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600" />
                        </div>
                        <span className="ml-2 text-gray-700 dark:text-gray-300">Progress bar shows step 1 as active</span>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 h-5 w-5 relative top-0.5">
                          <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600" />
                        </div>
                        <span className="ml-2 text-gray-700 dark:text-gray-300">Continue button navigates to Options step</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <p className="font-medium text-indigo-700 dark:text-indigo-400 mb-2">Options Step</p>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <div className="flex-shrink-0 h-5 w-5 relative top-0.5">
                          <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600" />
                        </div>
                        <span className="ml-2 text-gray-700 dark:text-gray-300">Basic traits (gender, age, alignment, relationship) can be selected</span>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 h-5 w-5 relative top-0.5">
                          <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600" />
                        </div>
                        <span className="ml-2 text-gray-700 dark:text-gray-300">Advanced options expand/collapse correctly</span>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 h-5 w-5 relative top-0.5">
                          <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600" />
                        </div>
                        <span className="ml-2 text-gray-700 dark:text-gray-300">Personality traits allow multiple selection (unlimited)</span>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 h-5 w-5 relative top-0.5">
                          <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600" />
                        </div>
                        <span className="ml-2 text-gray-700 dark:text-gray-300">Occupation search dropdown functions properly</span>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 h-5 w-5 relative top-0.5">
                          <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600" />
                        </div>
                        <span className="ml-2 text-gray-700 dark:text-gray-300">Randomize button generates random traits</span>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 h-5 w-5 relative top-0.5">
                          <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600" />
                        </div>
                        <span className="ml-2 text-gray-700 dark:text-gray-300">Clear options resets fields but preserves description</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <p className="font-medium text-indigo-700 dark:text-indigo-400 mb-2">Model Step</p>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <div className="flex-shrink-0 h-5 w-5 relative top-0.5">
                          <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600" />
                        </div>
                        <span className="ml-2 text-gray-700 dark:text-gray-300">Text model selection displays usage limits correctly</span>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 h-5 w-5 relative top-0.5">
                          <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600" />
                        </div>
                        <span className="ml-2 text-gray-700 dark:text-gray-300">Image model selection displays usage limits correctly</span>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 h-5 w-5 relative top-0.5">
                          <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600" />
                        </div>
                        <span className="ml-2 text-gray-700 dark:text-gray-300">Portrait customization options function</span>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 h-5 w-5 relative top-0.5">
                          <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600" />
                        </div>
                        <span className="ml-2 text-gray-700 dark:text-gray-300">Usage warnings appear when approaching limits</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <p className="font-medium text-indigo-700 dark:text-indigo-400 mb-2">Generate Step</p>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <div className="flex-shrink-0 h-5 w-5 relative top-0.5">
                          <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600" />
                        </div>
                        <span className="ml-2 text-gray-700 dark:text-gray-300">Character generation completes successfully</span>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 h-5 w-5 relative top-0.5">
                          <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600" />
                        </div>
                        <span className="ml-2 text-gray-700 dark:text-gray-300">Portrait generation works (or fails gracefully)</span>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 h-5 w-5 relative top-0.5">
                          <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600" />
                        </div>
                        <span className="ml-2 text-gray-700 dark:text-gray-300">Generated character displays in tabs</span>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 h-5 w-5 relative top-0.5">
                          <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600" />
                        </div>
                        <span className="ml-2 text-gray-700 dark:text-gray-300">Save to Library button functions</span>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 h-5 w-5 relative top-0.5">
                          <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600" />
                        </div>
                        <span className="ml-2 text-gray-700 dark:text-gray-300">New Character button resets wizard</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
                <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-3">Character Library</h4>
                <div className="space-y-3">
                  <div>
                    <p className="font-medium text-indigo-700 dark:text-indigo-400 mb-2">Library Interface</p>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <div className="flex-shrink-0 h-5 w-5 relative top-0.5">
                          <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600" />
                        </div>
                        <span className="ml-2 text-gray-700 dark:text-gray-300">Character cards display correctly</span>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 h-5 w-5 relative top-0.5">
                          <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600" />
                        </div>
                        <span className="ml-2 text-gray-700 dark:text-gray-300">Search functionality works</span>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 h-5 w-5 relative top-0.5">
                          <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600" />
                        </div>
                        <span className="ml-2 text-gray-700 dark:text-gray-300">Filter by genre/sub-genre functions</span>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 h-5 w-5 relative top-0.5">
                          <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600" />
                        </div>
                        <span className="ml-2 text-gray-700 dark:text-gray-300">Character viewer modal opens and displays data</span>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 h-5 w-5 relative top-0.5">
                          <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600" />
                        </div>
                        <span className="ml-2 text-gray-700 dark:text-gray-300">Direct action buttons (edit, delete, download) work</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <p className="font-medium text-indigo-700 dark:text-indigo-400 mb-2">Character Editing</p>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <div className="flex-shrink-0 h-5 w-5 relative top-0.5">
                          <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600" />
                        </div>
                        <span className="ml-2 text-gray-700 dark:text-gray-300">Edit page loads character data correctly</span>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 h-5 w-5 relative top-0.5">
                          <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600" />
                        </div>
                        <span className="ml-2 text-gray-700 dark:text-gray-300">All character fields can be modified</span>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 h-5 w-5 relative top-0.5">
                          <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600" />
                        </div>
                        <span className="ml-2 text-gray-700 dark:text-gray-300">Portrait upload/regeneration works</span>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 h-5 w-5 relative top-0.5">
                          <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600" />
                        </div>
                        <span className="ml-2 text-gray-700 dark:text-gray-300">Add/remove quests functions</span>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 h-5 w-5 relative top-0.5">
                          <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600" />
                        </div>
                        <span className="ml-2 text-gray-700 dark:text-gray-300">Add/remove dialogue lines works</span>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 h-5 w-5 relative top-0.5">
                          <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600" />
                        </div>
                        <span className="ml-2 text-gray-700 dark:text-gray-300">Add/remove items works</span>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 h-5 w-5 relative top-0.5">
                          <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600" />
                        </div>
                        <span className="ml-2 text-gray-700 dark:text-gray-300">Individual regeneration buttons work</span>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 h-5 w-5 relative top-0.5">
                          <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600" />
                        </div>
                        <span className="ml-2 text-gray-700 dark:text-gray-300">Save changes persists modifications</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
                <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-3">Character Regeneration</h4>
                <div className="space-y-3">
                  <div>
                    <p className="font-medium text-indigo-700 dark:text-indigo-400 mb-2">Individual Attribute Regeneration</p>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <div className="flex-shrink-0 h-5 w-5 relative top-0.5">
                          <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600" />
                        </div>
                        <span className="ml-2 text-gray-700 dark:text-gray-300">Name regeneration works</span>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 h-5 w-5 relative top-0.5">
                          <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600" />
                        </div>
                        <span className="ml-2 text-gray-700 dark:text-gray-300">Appearance regeneration works</span>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 h-5 w-5 relative top-0.5">
                          <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600" />
                        </div>
                        <span className="ml-2 text-gray-700 dark:text-gray-300">Personality regeneration works</span>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 h-5 w-5 relative top-0.5">
                          <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600" />
                        </div>
                        <span className="ml-2 text-gray-700 dark:text-gray-300">Backstory regeneration works</span>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 h-5 w-5 relative top-0.5">
                          <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600" />
                        </div>
                        <span className="ml-2 text-gray-700 dark:text-gray-300">Model selection affects regeneration quality</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <p className="font-medium text-indigo-700 dark:text-indigo-400 mb-2">Component Regeneration</p>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <div className="flex-shrink-0 h-5 w-5 relative top-0.5">
                          <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600" />
                        </div>
                        <span className="ml-2 text-gray-700 dark:text-gray-300">Quest title regeneration</span>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 h-5 w-5 relative top-0.5">
                          <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600" />
                        </div>
                        <span className="ml-2 text-gray-700 dark:text-gray-300">Quest description regeneration</span>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 h-5 w-5 relative top-0.5">
                          <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600" />
                        </div>
                        <span className="ml-2 text-gray-700 dark:text-gray-300">Quest reward regeneration</span>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 h-5 w-5 relative top-0.5">
                          <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600" />
                        </div>
                        <span className="ml-2 text-gray-700 dark:text-gray-300">Full quest regeneration</span>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 h-5 w-5 relative top-0.5">
                          <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600" />
                        </div>
                        <span className="ml-2 text-gray-700 dark:text-gray-300">Dialogue line regeneration</span>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 h-5 w-5 relative top-0.5">
                          <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600" />
                        </div>
                        <span className="ml-2 text-gray-700 dark:text-gray-300">Item description regeneration</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <p className="font-medium text-indigo-700 dark:text-indigo-400 mb-2">Portrait Regeneration</p>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <div className="flex-shrink-0 h-5 w-5 relative top-0.5">
                          <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600" />
                        </div>
                        <span className="ml-2 text-gray-700 dark:text-gray-300">Portrait regeneration with same model</span>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 h-5 w-5 relative top-0.5">
                          <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600" />
                        </div>
                        <span className="ml-2 text-gray-700 dark:text-gray-300">Portrait regeneration with different models</span>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 h-5 w-5 relative top-0.5">
                          <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600" />
                        </div>
                        <span className="ml-2 text-gray-700 dark:text-gray-300">Portrait options affect regeneration results</span>
                      </li>
                      <li className="flex items-start">
                        <div className="flex-shrink-0 h-5 w-5 relative top-0.5">
                          <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600" />
                        </div>
                        <span className="ml-2 text-gray-700 dark:text-gray-300">Loading states show during regeneration</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* User Interface */}
          <div>
            <h3 className="text-xl font-medium mb-4 text-indigo-700 dark:text-indigo-400">User Interface</h3>
            
            <div className="space-y-4">
              <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
                <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-3">Wizard Navigation</h4>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 relative top-0.5">
                      <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600" />
                    </div>
                    <span className="ml-2 text-gray-700 dark:text-gray-300">Progress bar correctly shows current step</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 relative top-0.5">
                      <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600" />
                    </div>
                    <span className="ml-2 text-gray-700 dark:text-gray-300">Clicking progress bar steps navigates appropriately</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 relative top-0.5">
                      <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600" />
                    </div>
                    <span className="ml-2 text-gray-700 dark:text-gray-300">Continue/Back buttons work in all steps</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 relative top-0.5">
                      <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600" />
                    </div>
                    <span className="ml-2 text-gray-700 dark:text-gray-300">Sticky footer remains visible during scroll</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 relative top-0.5">
                      <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600" />
                    </div>
                    <span className="ml-2 text-gray-700 dark:text-gray-300">Welcome popup appears for first-time users</span>
                  </li>
                </ul>
              </div>
              
              <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
                <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-3">Form Controls</h4>
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
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 relative top-0.5">
                      <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600" />
                    </div>
                    <span className="ml-2 text-gray-700 dark:text-gray-300">Multi-select functionality for personality traits</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 relative top-0.5">
                      <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600" />
                    </div>
                    <span className="ml-2 text-gray-700 dark:text-gray-300">Searchable dropdowns filter correctly</span>
                  </li>
                </ul>
              </div>
              
              <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
                <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-3">Character Display</h4>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 relative top-0.5">
                      <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600" />
                    </div>
                    <span className="ml-2 text-gray-700 dark:text-gray-300">Character information displays correctly</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 relative top-0.5">
                      <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600" />
                    </div>
                    <span className="ml-2 text-gray-700 dark:text-gray-300">Tab system for character details works</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 relative top-0.5">
                      <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600" />
                    </div>
                    <span className="ml-2 text-gray-700 dark:text-gray-300">Portrait displays properly</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 relative top-0.5">
                      <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600" />
                    </div>
                    <span className="ml-2 text-gray-700 dark:text-gray-300">JSON data can be viewed</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 relative top-0.5">
                      <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600" />
                    </div>
                    <span className="ml-2 text-gray-700 dark:text-gray-300">Download functionality works</span>
                  </li>
                </ul>
              </div>
              
              <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
                <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-3">Model Selection Interface</h4>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 relative top-0.5">
                      <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600" />
                    </div>
                    <span className="ml-2 text-gray-700 dark:text-gray-300">Model tiers display correctly with indicators</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 relative top-0.5">
                      <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600" />
                    </div>
                    <span className="ml-2 text-gray-700 dark:text-gray-300">Usage limits show current status</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 relative top-0.5">
                      <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600" />
                    </div>
                    <span className="ml-2 text-gray-700 dark:text-gray-300">Model descriptions are accurate</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 relative top-0.5">
                      <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600" />
                    </div>
                    <span className="ml-2 text-gray-700 dark:text-gray-300">Selection persists across navigation</span>
                  </li>
                </ul>
              </div>
              
              <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
                <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-3">Responsive Design</h4>
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
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 relative top-0.5">
                      <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600" />
                    </div>
                    <span className="ml-2 text-gray-700 dark:text-gray-300">Wizard steps adapt to screen size</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Data Management */}
          <div>
            <h3 className="text-xl font-medium mb-4 text-indigo-700 dark:text-indigo-400">Data Management</h3>
            
            <div className="space-y-4">
              <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
                <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-3">IndexedDB Storage</h4>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 relative top-0.5">
                      <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600" />
                    </div>
                    <span className="ml-2 text-gray-700 dark:text-gray-300">Characters save to library correctly</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 relative top-0.5">
                      <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600" />
                    </div>
                    <span className="ml-2 text-gray-700 dark:text-gray-300">Characters load from library correctly</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 relative top-0.5">
                      <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600" />
                    </div>
                    <span className="ml-2 text-gray-700 dark:text-gray-300">Character editing saves persist</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 relative top-0.5">
                      <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600" />
                    </div>
                    <span className="ml-2 text-gray-700 dark:text-gray-300">Portrait images store and retrieve properly</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 relative top-0.5">
                      <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600" />
                    </div>
                    <span className="ml-2 text-gray-700 dark:text-gray-300">Search index functions efficiently</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 relative top-0.5">
                      <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600" />
                    </div>
                    <span className="ml-2 text-gray-700 dark:text-gray-300">Database recovery handles corruption</span>
                  </li>
                </ul>
              </div>
              
              <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
                <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-3">Import/Export</h4>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 relative top-0.5">
                      <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600" />
                    </div>
                    <span className="ml-2 text-gray-700 dark:text-gray-300">JSON export includes all character data</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 relative top-0.5">
                      <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600" />
                    </div>
                    <span className="ml-2 text-gray-700 dark:text-gray-300">JSON import adds characters to library</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 relative top-0.5">
                      <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600" />
                    </div>
                    <span className="ml-2 text-gray-700 dark:text-gray-300">Individual character downloads work</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 relative top-0.5">
                      <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600" />
                    </div>
                    <span className="ml-2 text-gray-700 dark:text-gray-300">Portrait downloads function correctly</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Usage Limits */}
          <div>
            <h3 className="text-xl font-medium mb-4 text-indigo-700 dark:text-indigo-400">Usage Limits</h3>
            
            <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
              <ul className="space-y-2">
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 relative top-0.5">
                    <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600" />
                  </div>
                  <span className="ml-2 text-gray-700 dark:text-gray-300">Standard tier shows unlimited correctly</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 relative top-0.5">
                    <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600" />
                  </div>
                  <span className="ml-2 text-gray-700 dark:text-gray-300">Enhanced tier tracks 30/month limit</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 relative top-0.5">
                    <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600" />
                  </div>
                  <span className="ml-2 text-gray-700 dark:text-gray-300">Premium tier tracks 10/month limit</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 relative top-0.5">
                    <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600" />
                  </div>
                  <span className="ml-2 text-gray-700 dark:text-gray-300">Usage persists across browser sessions</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 relative top-0.5">
                    <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600" />
                  </div>
                  <span className="ml-2 text-gray-700 dark:text-gray-300">Monthly reset functionality works</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 relative top-0.5">
                    <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600" />
                  </div>
                  <span className="ml-2 text-gray-700 dark:text-gray-300">Development mode bypasses limits</span>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Edge Cases */}
          <div>
            <h3 className="text-xl font-medium mb-4 text-indigo-700 dark:text-indigo-400">Edge Cases</h3>
            
            <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
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
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 relative top-0.5">
                    <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600" />
                  </div>
                  <span className="ml-2 text-gray-700 dark:text-gray-300">Empty character library displays appropriately</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-700 dark:text-indigo-400">Test Environment Setup</h2>
        
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          To properly test NPC Forge, you should have:
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <h3 className="font-medium text-indigo-700 dark:text-indigo-400 mb-2">Required Tools</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
              <li>Access to multiple browsers (Chrome, Firefox, Safari, Edge)</li>
              <li>Mobile and tablet devices or emulators</li>
              <li>A valid OpenAI API key for development</li>
              <li>Different network conditions (good connection, throttled connection)</li>
            </ul>
          </div>
          
          <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <h3 className="font-medium text-indigo-700 dark:text-indigo-400 mb-2">Testing Environment</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
              <li>Clean IndexedDB state</li>
              <li>Fresh browser cache</li>
              <li>Known usage limit states</li>
              <li>Multiple test characters for library testing</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-700 dark:text-indigo-400">Manual Testing Procedure</h2>
        
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          Follow this procedure when testing new features or changes:
        </p>
        
        <div className="space-y-4">
          <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <h3 className="text-lg font-medium mb-2 text-indigo-700 dark:text-indigo-400 flex items-center">
              <CheckCircle className="h-5 w-5 mr-2" />
              Preparation
            </h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
              <li>Start with a clean development environment</li>
              <li>Ensure you have the latest code</li>
              <li>Set up the <code className="bg-gray-100 p-1 rounded dark:bg-gray-800">.env.local</code> file with your OpenAI API key</li>
              <li>Clear browser cache and IndexedDB if testing storage</li>
            </ul>
          </div>
          
          <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <h3 className="text-lg font-medium mb-2 text-indigo-700 dark:text-indigo-400 flex items-center">
              <CheckCircle className="h-5 w-5 mr-2" />
              Basic Wizard Testing
            </h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
              <li>Test the happy path (expected inputs and workflow)</li>
              <li>Complete character creation with standard options</li>
              <li>Save character to library</li>
              <li>Verify outputs match expected results</li>
            </ul>
          </div>
          
          <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <h3 className="text-lg font-medium mb-2 text-indigo-700 dark:text-indigo-400 flex items-center">
              <TestTube2 className="h-5 w-5 mr-2" />
              Advanced Feature Testing
            </h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
              <li>Test model selection variations</li>
              <li>Test character regeneration features</li>
              <li>Test library management operations</li>
              <li>Test edge cases and error conditions</li>
            </ul>
          </div>
          
          <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <h3 className="text-lg font-medium mb-2 text-indigo-700 dark:text-indigo-400 flex items-center">
              <Monitor className="h-5 w-5 mr-2" />
              Cross-browser Testing
            </h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
              <li>Verify functionality in Chrome, Firefox, Safari, and Edge</li>
              <li>Check for rendering differences</li>
              <li>Verify responsive breakpoints work across browsers</li>
            </ul>
          </div>
          
          <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <h3 className="text-lg font-medium mb-2 text-indigo-700 dark:text-indigo-400 flex items-center">
              <Monitor className="h-5 w-5 mr-2" />
              Mobile Testing
            </h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
              <li>Test on actual mobile devices if possible</li>
              <li>Verify touch interactions work</li>
              <li>Ensure text is readable and forms are usable</li>
              <li>Test in both portrait and landscape orientations</li>
            </ul>
          </div>
          
          <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <h3 className="text-lg font-medium mb-2 text-indigo-700 dark:text-indigo-400 flex items-center">
              <Beaker className="h-5 w-5 mr-2" />
              Performance Testing
            </h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
              <li>Monitor generation times across models</li>
              <li>Test library performance with many characters</li>
              <li>Verify IndexedDB operations are efficient</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-700 dark:text-indigo-400">Testing Scenarios</h2>
        
        <div className="space-y-6">
          <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <h3 className="text-lg font-medium text-indigo-700 dark:text-indigo-400 mb-3">Character Generation Scenarios</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Minimal Input Character</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300 text-sm">
                  <li>Only description provided</li>
                  <li>Default model selections</li>
                  <li>Basic traits only</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Fully Customized Character</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300 text-sm">
                  <li>Detailed description</li>
                  <li>All advanced options filled</li>
                  <li>Premium models selected</li>
                  <li>All components enabled</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Different Genre Characters</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300 text-sm">
                  <li>Test each main genre</li>
                  <li>Test multiple sub-genres</li>
                  <li>Verify genre-specific templates work</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <h3 className="text-lg font-medium text-indigo-700 dark:text-indigo-400 mb-3">Regeneration Scenarios</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Selective Regeneration</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300 text-sm">
                  <li>Regenerate only appearance</li>
                  <li>Regenerate specific quest components</li>
                  <li>Change models between regenerations</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Bulk Regeneration</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300 text-sm">
                  <li>Regenerate multiple elements</li>
                  <li>Test regeneration performance</li>
                  <li>Verify data consistency</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <h3 className="text-lg font-medium text-indigo-700 dark:text-indigo-400 mb-3">Library Scenarios</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Small Library (&lt; 10 characters)</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300 text-sm">
                  <li>Test basic operations</li>
                  <li>Verify search and filtering</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Large Library (50+ characters)</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300 text-sm">
                  <li>Test performance</li>
                  <li>Test search efficiency</li>
                  <li>Test scroll and pagination behavior</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-700 dark:text-indigo-400">Future Automated Testing</h2>
        
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          While NPC Forge currently relies on manual testing, future development should include automated testing. Here are recommendations for implementing automated tests:
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Unit Tests</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-2">Implement unit tests for:</p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 text-sm">
              <li>Utility functions in <code className="bg-gray-100 p-1 rounded dark:bg-gray-800">/src/lib/utils.ts</code></li>
              <li>Context providers and state management</li>
              <li>API route handlers (mocking OpenAI responses)</li>
              <li>Character storage operations</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 mt-2 text-sm">Recommended tools:</p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 text-sm">
              <li>Jest</li>
              <li>React Testing Library</li>
            </ul>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Integration Tests</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-2">Implement integration tests for:</p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 text-sm">
              <li>Wizard flow completion</li>
              <li>Character library operations</li>
              <li>Regeneration workflows</li>
              <li>Model selection and usage tracking</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 mt-2 text-sm">Recommended tools:</p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 text-sm">
              <li>Cypress</li>
              <li>Playwright</li>
            </ul>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
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
          
          <div className="p-4 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700">
            <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Visual Regression Tests</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-2">Consider visual regression tests for:</p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 text-sm">
              <li>Wizard step interfaces</li>
              <li>Character display layouts</li>
              <li>Library grid layouts</li>
            </ul>
            <p className="text-gray-700 dark:text-gray-300 mt-2 text-sm">Recommended tools:</p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 text-sm">
              <li>Percy</li>
              <li>Chromatic</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-700 dark:text-indigo-400">Testing Best Practices</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
              <li><strong>Test Early and Often</strong>: Test changes as you implement them</li>
              <li><strong>Document Test Cases</strong>: Keep a record of tested scenarios</li>
              <li><strong>Isolate Issues</strong>: When finding a bug, create a minimal reproduction</li>
            </ul>
          </div>
          
          <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
              <li><strong>Cross-Browser Compatibility</strong>: Always test in multiple browsers</li>
              <li><strong>Accessibility Testing</strong>: Test keyboard navigation and screen reader compatibility</li>
              <li><strong>Performance Awareness</strong>: Monitor generation times and library performance</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-700 dark:text-indigo-400">Reporting Issues</h2>
        
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg shadow-sm mb-6 dark:bg-red-900/20 dark:border-red-800">
          <h3 className="text-lg font-medium text-red-700 dark:text-red-300 mb-2 flex items-center">
            <Bug className="h-5 w-5 mr-2" />
            When reporting issues found during testing:
          </h3>
          
          <div className="space-y-3">
            <div>
              <h4 className="font-medium text-red-700 dark:text-red-300 mb-1">Create a GitHub Issue</h4>
              <ul className="list-disc list-inside space-y-1 text-red-600 dark:text-red-400 text-sm">
                <li>Use clear, descriptive titles</li>
                <li>Include detailed steps to reproduce</li>
                <li>Specify the expected vs. actual behavior</li>
                <li>Include screenshots or recordings when possible</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-red-700 dark:text-red-300 mb-1">Issue Severity</h4>
              <ul className="list-disc list-inside space-y-1 text-red-600 dark:text-red-400 text-sm">
                <li><strong>Critical</strong>: Application crash, data loss, security vulnerability</li>
                <li><strong>Major</strong>: Feature not working, blocking functionality</li>
                <li><strong>Minor</strong>: Cosmetic issues, non-blocking bugs</li>
                <li><strong>Enhancement</strong>: Suggestions for improvement</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-700 dark:text-indigo-400">Release Testing</h2>
        
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          Before each release, perform these additional tests:
        </p>
        
        <div className="space-y-4">
          <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <h3 className="font-medium text-indigo-700 dark:text-indigo-400 mb-2">Regression Testing</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
              <li>Verify all existing features still work</li>
              <li>Check for unintended side effects</li>
            </ul>
          </div>
          
          <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <h3 className="font-medium text-indigo-700 dark:text-indigo-400 mb-2">Integration Testing</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
              <li>Test the complete user workflow</li>
              <li>Verify all features work together correctly</li>
            </ul>
          </div>
          
          <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <h3 className="font-medium text-indigo-700 dark:text-indigo-400 mb-2">Documentation Review</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
              <li>Ensure documentation is up to date</li>
              <li>Update README and CHANGELOG</li>
            </ul>
          </div>
          
          <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <h3 className="font-medium text-indigo-700 dark:text-indigo-400 mb-2">Final Cross-Browser Check</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
              <li>Complete test suite in all supported browsers</li>
              <li>Verify mobile compatibility</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200 dark:bg-indigo-900/20 dark:border-indigo-800 mb-8">
        <h2 className="text-xl font-semibold mb-2 text-indigo-700 dark:text-indigo-300">Related Documentation</h2>
        <ul className="list-disc list-inside space-y-1 text-indigo-600 dark:text-indigo-400">
          <li>
            <Link href="/docs/contributing" className="underline hover:text-indigo-800 dark:hover:text-indigo-300">
              Contributing Guidelines
            </Link>
            {" "}for contribution workflows
          </li>
          <li>
            <Link href="/docs/dev-setup" className="underline hover:text-indigo-800 dark:hover:text-indigo-300">
              Development Setup
            </Link>
            {" "}for environment configuration and local setup
          </li>
          <li>
            <Link href="/docs/architecture" className="underline hover:text-indigo-800 dark:hover:text-indigo-300">
              Architecture Overview
            </Link>
            {" "}for system understanding
          </li>
          <li>
            <Link href="/docs/library" className="underline hover:text-indigo-800 dark:hover:text-indigo-300">
              Character Library Guide
            </Link>
            {" "}for library feature testing
          </li>
        </ul>
      </div>
    </div>
  );
}