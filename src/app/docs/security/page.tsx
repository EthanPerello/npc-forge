import Link from 'next/link';
import { Shield, Lock, Server, Database, Code, AlertTriangle } from 'lucide-react';

export default function SecurityPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">Security Documentation</h1>
      
      <p className="lead mb-8 text-gray-700 dark:text-gray-300 text-lg">
        This document outlines the security measures implemented in NPC Forge to protect users, data, and system integrity.
      </p>
      
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-700 dark:text-indigo-400">Overview</h2>
        
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          NPC Forge is designed with security in mind, implementing various measures to protect against common web application 
          vulnerabilities while ensuring user data privacy. As a client-side application that interacts with the OpenAI API, 
          it focuses on secure API communication, input validation, and content moderation.
        </p>
      </div>
      
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-700 dark:text-indigo-400">Key Security Measures</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <div className="flex items-center mb-3">
              <Shield className="h-5 w-5 text-indigo-600 mr-2 dark:text-indigo-400" />
              <h3 className="text-lg font-medium text-indigo-700 dark:text-indigo-400">API Security</h3>
            </div>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li>Server-side API calls via Next.js API routes</li>
              <li>API keys never exposed to the client</li>
              <li>Environment variables for sensitive credentials</li>
              <li>Rate limiting via usage tracking</li>
              <li>Secure error handling to prevent information leakage</li>
            </ul>
          </div>
          
          <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <div className="flex items-center mb-3">
              <Code className="h-5 w-5 text-indigo-600 mr-2 dark:text-indigo-400" />
              <h3 className="text-lg font-medium text-indigo-700 dark:text-indigo-400">Input Validation</h3>
            </div>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li>Form input validation before processing</li>
              <li>Sanitization of user-provided text</li>
              <li>Control character removal</li>
              <li>Whitespace normalization</li>
              <li>Input length restrictions where appropriate</li>
            </ul>
          </div>
          
          <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <div className="flex items-center mb-3">
              <AlertTriangle className="h-5 w-5 text-indigo-600 mr-2 dark:text-indigo-400" />
              <h3 className="text-lg font-medium text-indigo-700 dark:text-indigo-400">Content Moderation</h3>
            </div>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li>OpenAI content policy enforcement</li>
              <li>Rejection of harmful, illegal, or explicit content</li>
              <li>Model parameters tuned for appropriate outputs</li>
              <li>System prompts designed for safe content generation</li>
            </ul>
          </div>
          
          <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <div className="flex items-center mb-3">
              <Database className="h-5 w-5 text-indigo-600 mr-2 dark:text-indigo-400" />
              <h3 className="text-lg font-medium text-indigo-700 dark:text-indigo-400">Data Privacy</h3>
            </div>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li>No server-side storage of generated characters</li>
              <li>Local storage only for usage tracking</li>
              <li>No personal data collection</li>
              <li>No user accounts or authentication required</li>
              <li>No tracking or analytics beyond basic usage counts</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-700 dark:text-indigo-400">Code Example: Input Sanitization</h2>
        
        <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm mb-4 dark:bg-gray-800 dark:border-gray-700">
          <div className="bg-gray-800 text-gray-200 p-3 rounded-lg overflow-auto text-sm font-mono dark:bg-gray-900">
{`// Input sanitization function
export function sanitizeUserInput(input: string): string {
    if (!input) return '';
    
    // Remove any control characters
    let sanitized = input.replace(/[\\u0000-\\u001F\\u007F-\\u009F]/g, '');
    
    // Normalize whitespace (but preserve paragraph breaks)
    sanitized = sanitized.replace(/[ \\t\\v\\f]+/g, ' ');
    
    // Trim leading/trailing whitespace
    return sanitized.trim();
}`}
          </div>
        </div>
      </div>
      
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-700 dark:text-indigo-400">Potential Vulnerabilities and Mitigations</h2>
        
        <div className="space-y-4">
          <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <h3 className="text-lg font-medium mb-2 text-indigo-700 dark:text-indigo-400">Prompt Injection</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              <strong>Vulnerability:</strong> Users might attempt to manipulate the AI through carefully crafted inputs that override system instructions.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <strong>Mitigation:</strong> Clear separation between system prompts and user inputs, input sanitization, 
              and model parameters tuned to resist injection.
            </p>
          </div>
          
          <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <h3 className="text-lg font-medium mb-2 text-indigo-700 dark:text-indigo-400">Denial of Service</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              <strong>Vulnerability:</strong> Excessive API calls could lead to rate limiting or increased costs.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <strong>Mitigation:</strong> Client-side usage limits, with future implementation of server-side rate limiting.
            </p>
          </div>
          
          <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <h3 className="text-lg font-medium mb-2 text-indigo-700 dark:text-indigo-400">Content Policy Violations</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              <strong>Vulnerability:</strong> Users might attempt to generate inappropriate or harmful content.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <strong>Mitigation:</strong> Input validation, OpenAI's content filters, and prompt design to encourage appropriate outputs.
            </p>
          </div>
        </div>
      </div>
      
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-700 dark:text-indigo-400">Security Roadmap</h2>
        
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          Future security enhancements planned for NPC Forge include:
        </p>
        
        <div className="space-y-4">
          <div className="p-3 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <p className="font-medium text-indigo-700 dark:text-indigo-400">Server-Side Rate Limiting</p>
            <p className="text-gray-700 text-sm dark:text-gray-300">
              Implementation of more robust rate limiting and IP-based tracking
            </p>
          </div>
          
          <div className="p-3 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <p className="font-medium text-indigo-700 dark:text-indigo-400">Enhanced Validation</p>
            <p className="text-gray-700 text-sm dark:text-gray-300">
              More comprehensive input validation and additional sanitization for complex inputs
            </p>
          </div>
          
          <div className="p-3 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <p className="font-medium text-indigo-700 dark:text-indigo-400">User Accounts and Authentication</p>
            <p className="text-gray-700 text-sm dark:text-gray-300">
              If implemented, will include secure authentication practices and password protection
            </p>
          </div>
        </div>
      </div>
      
      <div className="p-4 bg-red-50 rounded-lg border border-red-200 mb-10 dark:bg-red-900/20 dark:border-red-800">
        <h2 className="text-xl font-semibold mb-2 text-red-700 dark:text-red-300">Security Contact</h2>
        <p className="text-red-700 dark:text-red-400 mb-4">
          If you discover a security vulnerability in NPC Forge, please report it by emailing:
        </p>
        <p className="text-center mb-4">
          <a 
            href="mailto:ethanperello@gmail.com" 
            className="font-medium text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
          >
            ethanperello@gmail.com
          </a>
        </p>
        <p className="text-sm text-red-600 dark:text-red-400">
          Please include a description of the vulnerability, steps to reproduce, potential impact, and suggested mitigations if available.
        </p>
      </div>
      
      <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200 dark:bg-indigo-900/20 dark:border-indigo-800 mb-8">
        <h2 className="text-xl font-semibold mb-2 text-indigo-700 dark:text-indigo-300">Related Documentation</h2>
        <ul className="list-disc list-inside space-y-1 text-indigo-600 dark:text-indigo-400">
          <li>
            <Link href="/docs/api" className="underline hover:text-indigo-800 dark:hover:text-indigo-300">
              API Documentation
            </Link>
            {" "}for details on the API implementation
          </li>
          <li>
            <Link href="/docs/contributing" className="underline hover:text-indigo-800 dark:hover:text-indigo-300">
              Contributing Guidelines
            </Link>
            {" "}for development best practices
          </li>
          <li>
            <Link href="/docs/architecture" className="underline hover:text-indigo-800 dark:hover:text-indigo-300">
              Architecture Overview
            </Link>
            {" "}for high-level system design
          </li>
          <li>
            <Link href="/docs/prompts" className="underline hover:text-indigo-800 dark:hover:text-indigo-300">
              Prompt Engineering
            </Link>
            {" "}for details on secure prompt design
          </li>
        </ul>
      </div>
    </div>
  );
}