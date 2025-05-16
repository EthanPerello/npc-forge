import Link from 'next/link';
import { Shield, Lock, Server, AlertTriangle, Eye, Key } from 'lucide-react';

export const metadata = {
  title: 'Security Documentation - NPC Forge Documentation',
  description: 'Security measures, data privacy, and best practices for NPC Forge',
};

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
              <Server className="h-5 w-5 text-indigo-600 mr-2 dark:text-indigo-400" />
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
              <Shield className="h-5 w-5 text-indigo-600 mr-2 dark:text-indigo-400" />
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
              <li>Clear separation between system instructions and user input</li>
            </ul>
          </div>
          
          <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <div className="flex items-center mb-3">
              <Eye className="h-5 w-5 text-indigo-600 mr-2 dark:text-indigo-400" />
              <h3 className="text-lg font-medium text-indigo-700 dark:text-indigo-400">Data Privacy</h3>
            </div>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li>Local-only storage using IndexedDB</li>
              <li>No character data transmitted to or stored on servers</li>
              <li>Users have complete control over their character data</li>
              <li>No user tracking or personal information collection</li>
              <li>No user accounts or authentication required</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-700 dark:text-indigo-400">Input Sanitization</h2>
        
        <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm mb-4 dark:bg-gray-800 dark:border-gray-700">
          <p className="text-gray-700 dark:text-gray-300 mb-3">
            All user inputs are sanitized before processing to prevent security vulnerabilities:
          </p>
          
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
        
        <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
          <h3 className="font-medium text-indigo-700 dark:text-indigo-400 mb-2">JSON Validation</h3>
          <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
            <li>Generated character data is validated against expected structure</li>
            <li>Required fields are checked for presence</li>
            <li>Error handling for malformed JSON responses</li>
          </ul>
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
              model parameters tuned to resist injection, prompt structure designed to maintain control, and character regeneration using validated base character data.
            </p>
          </div>
          
          <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <h3 className="text-lg font-medium mb-2 text-indigo-700 dark:text-indigo-400">Denial of Service</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              <strong>Vulnerability:</strong> Excessive API calls could lead to rate limiting or increased costs.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <strong>Mitigation:</strong> Client-side usage limits per model tier, development mode bypass for testing only, 
              input length limitations, graceful handling of API failures, and future implementation of server-side rate limiting.
            </p>
          </div>
          
          <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <h3 className="text-lg font-medium mb-2 text-indigo-700 dark:text-indigo-400">Content Policy Violations</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              <strong>Vulnerability:</strong> Users might attempt to generate inappropriate or harmful content.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <strong>Mitigation:</strong> Input validation and sanitization, OpenAI's built-in content filters, 
              system prompts designed to encourage appropriate outputs, and error handling for policy violations.
            </p>
          </div>
          
          <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <h3 className="text-lg font-medium mb-2 text-indigo-700 dark:text-indigo-400">Local Storage Manipulation</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              <strong>Vulnerability:</strong> Users could potentially manipulate local character storage.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <strong>Mitigation:</strong> Characters stored locally only affect the user's own data. No shared character galleries to protect, 
              character validation on import, and no server-side dependencies on client storage.
            </p>
          </div>
        </div>
      </div>
      
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-700 dark:text-indigo-400">Model Selection Security</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <h3 className="font-medium text-indigo-700 dark:text-indigo-400 mb-2">Usage Validation</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
              <li>Client-side usage tracking with local verification</li>
              <li>Model availability checked before generation</li>
              <li>Usage limits enforced per model tier</li>
              <li>Monthly reset mechanisms prevent accumulation</li>
            </ul>
          </div>
          
          <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <h3 className="font-medium text-indigo-700 dark:text-indigo-400 mb-2">Model Access Control</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
              <li>Premium models require explicit selection</li>
              <li>Usage warnings before high-tier model use</li>
              <li>No unauthorized access to model APIs</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-700 dark:text-indigo-400">Frontend Security</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <h3 className="font-medium text-indigo-700 dark:text-indigo-400 mb-2">XSS Prevention</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
              <li>React's built-in XSS protection for rendering user content</li>
              <li>Input sanitization before processing</li>
              <li>Content Security Policy headers</li>
            </ul>
          </div>
          
          <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <h3 className="font-medium text-indigo-700 dark:text-indigo-400 mb-2">Clickjacking Protection</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
              <li>X-Frame-Options headers to prevent clickjacking</li>
              <li>Frame-ancestors directive in Content Security Policy</li>
              <li>Appropriate CORS settings to control access to resources</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-700 dark:text-indigo-400">Character Regeneration Security</h2>
        
        <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
          <h3 className="font-medium text-indigo-700 dark:text-indigo-400 mb-2">Controlled Regeneration</h3>
          <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
            <li>All regeneration requests validate the original character data</li>
            <li>Regeneration maintains data consistency</li>
            <li>Model selection validated against available options</li>
            <li>Users can only regenerate their own locally stored characters</li>
            <li>Regeneration respects usage limits</li>
            <li>No ability to regenerate system-generated examples</li>
          </ul>
        </div>
      </div>
      
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-700 dark:text-indigo-400">Security Roadmap</h2>
        
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          Future security enhancements planned for NPC Forge include:
        </p>
        
        <div className="space-y-4">
          <div className="p-3 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <h4 className="font-medium text-indigo-700 dark:text-indigo-400 mb-1">Server-Side Rate Limiting (v0.15.0+)</h4>
            <p className="text-gray-700 text-sm dark:text-gray-300">
              Implementation of robust rate limiting per IP, abuse detection and prevention, enhanced monitoring of API usage
            </p>
          </div>
          
          <div className="p-3 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <h4 className="font-medium text-indigo-700 dark:text-indigo-400 mb-1">Enhanced Input Validation</h4>
            <p className="text-gray-700 text-sm dark:text-gray-300">
              More comprehensive input validation rules, advanced sanitization for complex inputs, regex-based content filtering
            </p>
          </div>
          
          <div className="p-3 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <h4 className="font-medium text-indigo-700 dark:text-indigo-400 mb-1">Optional User Accounts (v0.15.0)</h4>
            <p className="text-gray-700 text-sm dark:text-gray-300">
              If implemented, will include secure authentication practices, password hashing and salting (bcrypt), 
              session management with JWT, optional multi-factor authentication
            </p>
          </div>
          
          <div className="p-3 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <h4 className="font-medium text-indigo-700 dark:text-indigo-400 mb-1">Content Moderation Improvements</h4>
            <p className="text-gray-700 text-sm dark:text-gray-300">
              Enhanced prompt injection detection, community reporting mechanisms (if sharing features added), 
              automated content review processes
            </p>
          </div>
        </div>
      </div>
      
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-700 dark:text-indigo-400">Data Protection & Compliance</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <h3 className="font-medium text-indigo-700 dark:text-indigo-400 mb-2">Data Protection</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
              <li>GDPR compliance through local-only storage</li>
              <li>No data retention policies needed (user-controlled)</li>
              <li>Right to deletion through local storage management</li>
            </ul>
          </div>
          
          <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <h3 className="font-medium text-indigo-700 dark:text-indigo-400 mb-2">API Usage</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
              <li>Compliance with OpenAI's Terms of Service</li>
              <li>Responsible AI usage practices</li>
              <li>Content policy adherence</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-700 dark:text-indigo-400">Security Best Practices for Users</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <h3 className="font-medium text-indigo-700 dark:text-indigo-400 mb-2">Character Data Protection</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
              <li>Regularly export important characters as JSON backups</li>
              <li>Use descriptive filenames for exports</li>
              <li>Store backups securely</li>
            </ul>
          </div>
          
          <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <h3 className="font-medium text-indigo-700 dark:text-indigo-400 mb-2">Browser Security</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
              <li>Keep browser updated for latest security patches</li>
              <li>Use browsers with good security track records</li>
              <li>Be cautious of browser extensions that access local storage</li>
            </ul>
          </div>
          
          <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <h3 className="font-medium text-indigo-700 dark:text-indigo-400 mb-2">API Key Security (Developers)</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
              <li>Never commit <code className="bg-gray-100 p-1 rounded dark:bg-gray-800">.env.local</code> files to version control</li>
              <li>Use environment-specific API keys</li>
              <li>Monitor API usage for unexpected patterns</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="p-4 bg-red-50 rounded-lg border border-red-200 mb-10 dark:bg-red-900/20 dark:border-red-800">
        <h2 className="text-xl font-semibold mb-2 text-red-700 dark:text-red-300 flex items-center">
          <Key className="h-5 w-5 mr-2" />
          Security Contact
        </h2>
        <p className="text-red-700 dark:text-red-400 mb-4">
          If you discover a security vulnerability in NPC Forge, please report it by emailing:
        </p>
        <p className="text-center mb-4">
          <a 
            href="mailto:ethanperello@gmail.com" 
            className="font-medium text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 text-lg"
          >
            ethanperello@gmail.com
          </a>
        </p>
        <p className="text-sm text-red-600 dark:text-red-400">
          Please include a description of the vulnerability, steps to reproduce, potential impact, and suggested mitigations if available. 
          We take all security reports seriously and will respond as quickly as possible.
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
            <Link href="/docs/library" className="underline hover:text-indigo-800 dark:hover:text-indigo-300">
              Character Library Guide
            </Link>
            {" "}for local storage management
          </li>
        </ul>
      </div>
    </div>
  );
}