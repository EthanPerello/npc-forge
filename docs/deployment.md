# Deployment Guide

This guide covers deploying your own instance of NPC Forge to production environments.

**Note**: End users can access the public version of NPC Forge at no cost without any setup. This guide is for developers who want to deploy their own instance.

## Recommended: Vercel Deployment

### Prerequisites
• GitHub account
• Vercel account (free tier available)
• OpenAI API key with sufficient credits (for your deployment)

### Deployment Steps

**1. Fork the Repository**
Fork the [NPC Forge repository](https://github.com/EthanPerello/npc-forge) on GitHub.

**2. Create Vercel Project**
• Connect your GitHub account to Vercel
• Import your forked repository
• Use default Next.js settings

**3. Configure Environment Variables**
Add in Vercel dashboard:
```
OPENAI_API_KEY=your_api_key_here
```

**4. Deploy**
Vercel automatically builds and deploys your application.

**5. Verify**
Test all features:
• Character generation wizard
• Chat functionality
• Portrait editing
• Character library operations

## Alternative: Netlify

### Quick Setup
• Connect GitHub repository to Netlify
• Add Essential Next.js plugin
• Set environment variable: `OPENAI_API_KEY`
• Deploy with default settings

## Self-Hosting

### Basic Setup
```bash
git clone https://github.com/YOUR-USERNAME/npc-forge.git
cd npc-forge
npm install
npm run build
npm start
```

### Environment Variables
```
OPENAI_API_KEY=your_api_key_here
NODE_ENV=production
```

### Production with PM2
```bash
npm install -g pm2
pm2 start npm --name "npc-forge" -- start
pm2 save
pm2 startup
```

## SSL/HTTPS

• **Vercel/Netlify**: Automatic SSL certificates
• **Self-hosted**: Use Certbot for Let's Encrypt certificates

## Post-Deployment Checklist

✅ Character generation works end-to-end  
✅ Chat functionality operates correctly  
✅ Portrait editing processes successfully  
✅ Library saves and loads characters  
✅ Usage limits are enforced  
✅ Responsive design works on mobile  
✅ Dark mode functions properly

## Monitoring

• Monitor OpenAI API usage and costs for your deployment
• Set up error tracking for API failures
• Check application performance and load times

## Cost Considerations

**OpenAI API Costs** (for your deployment):
• Character generation: Varies by model tier selected
• Chat conversations: Cost based on model and conversation length
• Portrait editing: Image model costs per edit operation
• Set usage limits to control costs

## Troubleshooting

**API Issues**: Verify OpenAI key and credits for your account
**Build Failures**: Check Node.js version (18+) and dependencies
**Runtime Errors**: Review server logs and environment variables

## Related Documentation

• [Development Setup](/docs/dev-setup) - Local development guide
• [Security Documentation](/docs/security) - Security considerations