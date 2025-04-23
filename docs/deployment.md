# Deployment Guide

This document provides instructions for deploying NPC Forge to various environments, including Vercel (the recommended platform) and self-hosting options.

## Deployment Options

NPC Forge is a Next.js application that can be deployed in several ways:

1. **Vercel** (Recommended) - Seamless deployment with the creators of Next.js
2. **Netlify** - Alternative hosting with similar features to Vercel
3. **Self-hosting** - Deploy to your own server or cloud provider
4. **Static Export** - Generate static files for hosting anywhere

## Deployment to Vercel

### Prerequisites

- A [GitHub account](https://github.com/signup)
- A [Vercel account](https://vercel.com/signup) (free tier available)
- An [OpenAI API key](https://platform.openai.com/)

### Deployment Steps

1. **Fork the repository**

   Go to the [NPC Forge repository](https://github.com/EthanPerello/npc-forge) and click the "Fork" button to create your own copy.

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

   Once deployed, Vercel will provide a URL where you can access your application. Open the URL to verify that everything is working correctly.

## Deployment to Netlify

### Prerequisites

- A [GitHub account](https://github.com/signup)
- A [Netlify account](https://app.netlify.com/signup) (free tier available)
- An [OpenAI API key](https://platform.openai.com/)

### Deployment Steps

1. **Fork the repository**

   Go to the [NPC Forge repository](https://github.com/EthanPerello/npc-forge) and click the "Fork" button to create your own copy.

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

   In your repository, create a `netlify.toml` file with the following content:

   ```toml
   [build]
     command = "npm run build"
     publish = ".next"

   [[plugins]]
     package = "@netlify/plugin-nextjs"
   ```

5. **Deploy**

   Commit and push the `netlify.toml` file to trigger a deployment.

6. **Verify the deployment**

   Netlify will provide a URL where you can access your application. Open the URL to verify that everything is working correctly.

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

   Create a `.env.local` file with your OpenAI API key:

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

7. **Set up HTTPS (recommended)**

   Use Let's Encrypt to obtain a free SSL certificate for your domain.

## Static Export (For Static Hosting)

Next.js allows exporting to static HTML, which can be hosted on any static hosting service.

### Export Steps

1. **Modify next.config.js**

   Update your `next.config.js` to enable static exports:

   ```js
   /** @type {import('next').NextConfig} */
   const nextConfig = {
     output: 'export',
     // Note: Static exports sacrifice some dynamic features
     images: {
       unoptimized: true,
     },
   };
   
   module.exports = nextConfig;
   ```

2. **Update API routes**

   Since static exports don't support API routes, you'll need to modify the application to use client-side API calls directly to OpenAI. This is a significant change and requires careful implementation.

3. **Build and export**

   ```bash
   npm run build
   ```

   The exported files will be in the `out` directory.

4. **Host the static files**

   Upload the contents of the `out` directory to any static hosting service like GitHub Pages, Amazon S3, or Netlify.

## Continuous Deployment

### GitHub Actions

You can set up continuous deployment using GitHub Actions:

1. Create a `.github/workflows/deploy.yml` file:

   ```yaml
   name: Deploy to Vercel
   
   on:
     push:
       branches: [ main ]
   
   jobs:
     deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v2
         
         - name: Deploy to Vercel
           uses: amondnet/vercel-action@v20
           with:
             vercel-token: ${{ secrets.VERCEL_TOKEN }}
             vercel-org-id: ${{ secrets.ORG_ID }}
             vercel-project-id: ${{ secrets.PROJECT_ID }}
             vercel-args: '--prod'
   ```

2. Set up the required secrets in your GitHub repository settings.

## Post-Deployment Tasks

After deploying, perform these tasks:

1. **Test the application thoroughly**
   - Test character generation
   - Test portrait generation
   - Verify usage limits work correctly
   - Check all UI elements and interactions

2. **Set up monitoring (optional)**
   - Consider adding application monitoring like Sentry
   - Set up uptime monitoring

3. **Configure analytics (optional)**
   - Set up privacy-friendly analytics like Plausible or Umami

## Troubleshooting Deployment Issues

### API Connection Issues

- Verify your OpenAI API key is correctly set in environment variables
- Check that your account has sufficient API credits
- Ensure there are no CORS issues for client-side calls

### Build Failures

- Check build logs for errors
- Ensure all dependencies are correctly installed
- Verify your Node.js version matches requirements

### Performance Issues

- Consider increasing your hosting plan resources
- Implement caching strategies where appropriate
- Optimize image loading and delivery

## Deployment Checklist

Use this checklist for each deployment:

- [ ] Environment variables are correctly set
- [ ] Production build completes successfully
- [ ] API endpoints are functional
- [ ] Character generation works
- [ ] Portrait generation works
- [ ] Usage limits function correctly
- [ ] UI is responsive on different devices
- [ ] Security headers are properly configured

## Related Documentation

- [Architecture Overview](architecture.md) - For system understanding
- [Contributing Guidelines](contributing.md) - For development workflow
- [Security Documentation](security.md) - For security considerations