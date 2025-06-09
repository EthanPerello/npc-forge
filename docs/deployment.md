# Deployment Guide

This document provides instructions for deploying NPC Forge to various environments.

## Deployment Options

NPC Forge is a Next.js application that can be deployed in several ways:

1. **Vercel** (Recommended) - Seamless deployment with Next.js creators
2. **Netlify** - Alternative hosting platform with good Next.js support
3. **Self-hosting** - Deploy to your own server or cloud provider

## Deployment to Vercel

### Prerequisites

• A [GitHub account](https://github.com/signup)
• A [Vercel account](https://vercel.com/signup) (free tier available)
• An [OpenAI API key](https://platform.openai.com/) with sufficient credits

### Deployment Steps

**Fork the repository**

Go to the [NPC Forge repository](https://github.com/EthanPerello/npc-forge) and click "Fork" to create your own copy.

**Create a new project in Vercel**

• Log in to [Vercel](https://vercel.com/)
• Click "Add New" → "Project"
• Import your forked GitHub repository
• Configure the project settings:
  • **Framework Preset**: Next.js
  • **Root Directory**: `./`
  • **Build Command**: Leave as default (`npm run build`)
  • **Output Directory**: Leave as default (`.next`)
  • **Install Command**: Leave as default (`npm install`)

**Set up environment variables**

Add the following environment variable in the Vercel dashboard:

```
OPENAI_API_KEY=your_api_key_here
```

> **Important**: Ensure your OpenAI API key has sufficient credits for both character generation and chat functionality.

**Deploy**

Click "Deploy" and wait for the build to complete. Vercel will automatically handle the build process and optimization.

**Verify the deployment**

Once deployed, Vercel will provide a URL where you can access your application. Test the following:
• Character generation wizard
• Chat functionality with generated characters
• Character library operations
• Portrait generation
• Import/export features

### Vercel Configuration

For optimal performance, consider these Vercel settings:

```json
{
  "functions": {
    "app/api/chat/route.ts": {
      "maxDuration": 60
    },
    "app/api/generate/route.ts": {
      "maxDuration": 120
    },
    "app/api/regenerate/route.ts": {
      "maxDuration": 120
    }
  }
}
```

## Deployment to Netlify

### Prerequisites

• A [GitHub account](https://github.com/signup)
• A [Netlify account](https://app.netlify.com/signup) (free tier available)
• An [OpenAI API key](https://platform.openai.com/)

### Deployment Steps

**Fork the repository**

Go to the [NPC Forge repository](https://github.com/EthanPerello/npc-forge) and click "Fork".

**Create a new site in Netlify**

• Log in to [Netlify](https://app.netlify.com/)
• Click "New site from Git"
• Choose GitHub as your Git provider
• Select your forked repository
• Configure the build settings:
  • **Build command**: `npm run build`
  • **Publish directory**: `.next`
  • **Production branch**: `main`

**Install Next.js plugin**

Add the Essential Next.js plugin in your site settings:
• Go to Site settings → Build & deploy → Build plugins
• Add the "Essential Next.js" plugin

**Set up environment variables**

Go to Site settings → Environment variables and add:

```
OPENAI_API_KEY=your_api_key_here
```

**Configure build settings**

In your repository, create a `netlify.toml` file:

```toml
[build]
  command = "npm run build"
  publish = ".next"

[build.environment]
  NETLIFY_NEXT_PLUGIN_SKIP = "true"

[[plugins]]
  package = "@netlify/plugin-nextjs"

[functions]
  node_bundler = "esbuild"

[[headers]]
  for = "/api/*"
  [headers.values]
    Cache-Control = "no-cache"
```

**Deploy**

Commit and push the `netlify.toml` file to trigger a deployment.

## Self-Hosting

### Prerequisites

• A server with Node.js 18+ installed
• Git
• PM2 or similar process manager (recommended)
• Nginx or Apache for reverse proxy (recommended)
• An [OpenAI API key](https://platform.openai.com/)

### Deployment Steps

**Clone the repository**

```bash
git clone https://github.com/EthanPerello/npc-forge.git
cd npc-forge
```

**Install dependencies**

```bash
npm install
```

**Set up environment variables**

Create a `.env.local` file:

```
OPENAI_API_KEY=your_api_key_here
NODE_ENV=production
```

**Build the application**

```bash
npm run build
```

**Start the server**

**For development/testing:**
```bash
npm start
```

**For production (with PM2):**
```bash
npm install -g pm2
pm2 start npm --name "npc-forge" -- start
pm2 save
pm2 startup
```

The application will be available at `http://localhost:3000`.

**Set up a reverse proxy (recommended)**

**Nginx configuration example:**

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
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout 300;
        proxy_connect_timeout 300;
        proxy_send_timeout 300;
    }

    # Optional: serve static files directly
    location /_next/static/ {
        alias /path/to/npc-forge/.next/static/;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

**Apache configuration example:**

```apache
<VirtualHost *:80>
    ServerName your-domain.com
    
    ProxyPass / http://localhost:3000/
    ProxyPassReverse / http://localhost:3000/
    ProxyPreserveHost On
    
    # Increase timeout for API calls
    ProxyTimeout 300
</VirtualHost>
```

## SSL/TLS Configuration

For production deployments, enable HTTPS:

### Vercel

• Automatic SSL certificates provided
• Custom domains supported with automatic certificate provisioning

### Netlify

• Automatic SSL certificates via Let's Encrypt
• Custom domains supported with one-click SSL

### Self-Hosting

Use Certbot for Let's Encrypt certificates:

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

## Environment Configuration

### Required Environment Variables

```bash
# Required
OPENAI_API_KEY=your_api_key_here

# Optional
NODE_ENV=production              # Set to production for deployed environments
NEXT_PUBLIC_APP_URL=https://your-domain.com  # For absolute URLs if needed
```

### OpenAI API Considerations

• Ensure your API key has sufficient credits for expected usage
• Monitor API usage through the OpenAI dashboard
• Consider setting up usage alerts in your OpenAI account
• Be aware that chat functionality will increase API usage

## Performance Optimization

### Build Optimization

```bash
# Enable production optimizations
npm run build

# For even smaller bundles (if needed)
ANALYZE=true npm run build
```

### Caching Headers

Configure appropriate caching headers for static assets:

```nginx
# Static assets
location /_next/static/ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}

# Images
location /images/ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}

# API routes (no caching)
location /api/ {
    add_header Cache-Control "no-cache, no-store, must-revalidate";
}
```

## Monitoring and Logging

### Application Monitoring

Consider implementing monitoring for:
• API response times (especially for chat and generation endpoints)
• Error rates and types
• Resource usage (memory, CPU)
• OpenAI API usage and costs

### Log Management

For self-hosted deployments:

```bash
# PM2 logging
pm2 logs npc-forge

# Custom log rotation
pm2 install pm2-logrotate
```

## Post-Deployment Tasks

After deploying, perform these verification steps:

### Functionality Testing

**Character Generation**
• Test the complete wizard flow
• Verify all model tiers work correctly
• Test portrait generation with different models

**Chat System**
• Start conversations with different character types
• Test message persistence across browser sessions
• Verify character personality consistency
• Test model switching during conversations

**Character Library**
• Test character saving and loading
• Verify filtering and search functionality
• Test import/export features
• Verify editing and regeneration capabilities

**User Interface**
• Test responsive design on different devices
• Verify dark mode functionality
• Test navigation and accessibility features

### Performance Verification

• Check application load times
• Monitor API response times
• Verify IndexedDB operations are performant
• Test with multiple concurrent users (if applicable)

## Troubleshooting Deployment Issues

### Common Issues

**API Connection Problems:**
• Verify OpenAI API key is correctly set and has credits
• Check network connectivity to OpenAI services
• Ensure API key has necessary permissions

**Build Failures:**
• Check Node.js version compatibility (18+)
• Verify all dependencies are correctly installed
• Review build logs for specific error messages
• Ensure environment variables are properly configured

**Runtime Errors:**
• Check server logs for detailed error messages
• Verify all environment variables are available at runtime
• Test API endpoints individually
• Monitor memory usage and resource constraints

**Chat System Issues:**
• Verify chat API endpoints are accessible
• Check IndexedDB functionality in target browsers
• Test conversation persistence and recovery
• Monitor API timeout configurations

### Performance Issues

• Consider upgrading hosting plan resources
• Optimize images and reduce bundle sizes
• Implement proper caching strategies
• Monitor and optimize API call patterns

## Deployment Checklist

Use this checklist for each deployment:

• Environment variables are correctly configured
• OpenAI API key is valid and has sufficient credits
• Production build completes successfully
• All API endpoints respond correctly
• Character generation wizard works end-to-end
• Chat functionality operates properly
• Character library saves and loads correctly
• Portrait generation functions with all model tiers
• Usage limits are enforced correctly
• Responsive design works on mobile devices
• Dark mode functions properly
• Import/export features work correctly
• Error handling provides appropriate user feedback

## Security Considerations

• API keys are properly secured and not exposed to clients
• HTTPS is enabled for all production deployments
• Input validation is working correctly
• Rate limiting is properly configured
• CORS settings are appropriate for your domain

## Cost Management

### OpenAI API Costs

Monitor and manage API costs:
• Set up billing alerts in your OpenAI account
• Track usage patterns through the OpenAI dashboard
• Consider implementing additional rate limiting if needed
• Monitor chat usage as it can increase API consumption

### Hosting Costs

• Vercel and Netlify offer generous free tiers
• Self-hosting costs depend on server resources and traffic
• Consider CDN usage for static assets in high-traffic scenarios

## Related Documentation

• [Architecture Overview](/docs/architecture) - For system understanding
• [Development Setup](/docs/dev-setup) - For local development
• [Security Documentation](/docs/security) - For security considerations
• [Contributing Guidelines](/docs/contributing) - For development workflow