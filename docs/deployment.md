# Deployment Guide

This document provides instructions for deploying NPC Forge to various environments.

## Deployment Options

NPC Forge is a Next.js application that can be deployed in several ways:

1. **Vercel** (Recommended) - Seamless deployment with Next.js creators
2. **Netlify** - Alternative hosting platform
3. **Self-hosting** - Deploy to your own server or cloud provider

## Deployment to Vercel

### Prerequisites

- A [GitHub account](https://github.com/signup)
- A [Vercel account](https://vercel.com/signup) (free tier available)
- An [OpenAI API key](https://platform.openai.com/)

### Deployment Steps

1. **Fork the repository**

   Go to the [NPC Forge repository](https://github.com/EthanPerello/npc-forge) and click "Fork" to create your own copy.

2. **Create a new project in Vercel**

   - Log in to [Vercel](https://vercel.com/)
   - Click "Add New" → "Project"
   - Import your forked GitHub repository
   - Configure the project:
     - Framework Preset: Next.js
     - Root Directory: ./
     - Build Command: Leave as default
     - Output Directory: Leave as default

3. **Set up environment variables**

   Add the following environment variable:
   
   ```
   OPENAI_API_KEY=your_api_key_here
   ```

4. **Deploy**

   Click "Deploy" and wait for the build to complete.

5. **Verify the deployment**

   Once deployed, Vercel will provide a URL where you can access your application.

## Deployment to Netlify

### Prerequisites

- A [GitHub account](https://github.com/signup)
- A [Netlify account](https://app.netlify.com/signup) (free tier available)
- An [OpenAI API key](https://platform.openai.com/)

### Deployment Steps

1. **Fork the repository**

   Go to the [NPC Forge repository](https://github.com/EthanPerello/npc-forge) and click "Fork".

2. **Create a new site in Netlify**

   - Log in to [Netlify](https://app.netlify.com/)
   - Click "New site from Git"
   - Choose GitHub as your Git provider
   - Select your forked repository
   - Configure the build settings:
     - Build command: `npm run build`
     - Publish directory: `.next`

3. **Set up environment variables**

   Go to Site settings → Environment variables and add:
   
   ```
   OPENAI_API_KEY=your_api_key_here
   ```

4. **Update build settings for Next.js**

   In your repository, create a `netlify.toml` file:

   ```toml
   [build]
     command = "npm run build"
     publish = ".next"

   [[plugins]]
     package = "@netlify/plugin-nextjs"
   ```

5. **Deploy**

   Commit and push the `netlify.toml` file to trigger a deployment.

## Self-Hosting

### Prerequisites

- A server with Node.js 18+ installed
- Git
- An [OpenAI API key](https://platform.openai.com/)

### Deployment Steps

1. **Clone the repository**

   ```bash
   git clone https://github.com/EthanPerello/npc-forge.git
   cd npc-forge
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env.local` file:

   ```
   OPENAI_API_KEY=your_api_key_here
   ```

4. **Build the application**

   ```bash
   npm run build
   ```

5. **Start the server**

   ```bash
   npm start
   ```

   The application will be available at `http://localhost:3000`.

6. **Set up a reverse proxy (optional but recommended)**

   Use Nginx or Apache as a reverse proxy to serve your application securely.

   Example Nginx configuration:

   ```nginx
   server {
       listen 80;
       server_name your-domain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
       }
   }
   ```

## Post-Deployment Tasks

After deploying, perform these tasks:

1. **Test the application thoroughly**
   - Test character generation
   - Test portrait generation
   - Verify model selection works correctly
   - Check all UI elements and interactions

2. **Monitor performance**
   - Check application load times
   - Monitor API response times
   - Verify character library functionality

## Troubleshooting Deployment Issues

### API Connection Issues

- Verify your OpenAI API key is correctly set in environment variables
- Check that your account has sufficient API credits
- Ensure the API key has the necessary permissions

### Build Failures

- Check build logs for errors
- Ensure all dependencies are correctly installed
- Verify your Node.js version matches requirements (18+)

### Performance Issues

- Consider increasing your hosting plan resources
- Optimize images and assets where possible
- Monitor network requests and API calls

## Deployment Checklist

Use this checklist for each deployment:

- [ ] Environment variables are correctly set
- [ ] Production build completes successfully
- [ ] API endpoints are functional
- [ ] Character generation works
- [ ] Portrait generation works
- [ ] Usage limits function correctly
- [ ] UI is responsive on different devices

## Related Documentation

- [Architecture Overview](architecture.md) - For system understanding
- [Contributing Guidelines](contributing.md) - For development workflow
- [Security Documentation](security.md) - For security considerations
- [Development Setup](dev-setup.md) - For local development