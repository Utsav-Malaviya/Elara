#!/bin/bash

echo "🚀 Starting Elara Jewelry Vercel Deployment..."

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g vercel
fi

# Check if user is logged in
if ! vercel whoami &> /dev/null; then
    echo "🔐 Please login to Vercel..."
    vercel login
fi

# Build frontend
echo "📦 Building frontend..."
cd frontend
npm run build
cd ..

# Deploy to Vercel
echo "🚀 Deploying to Vercel..."
vercel --prod

echo "✅ Deployment completed!"
echo "🌐 Your app is now live on Vercel!"
echo "📱 Check the URL above to view your deployed app"
