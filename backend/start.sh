#!/bin/bash

echo "🚀 Starting Elara Jewelry Backend..."

# Check if MongoDB is running
echo "📊 Checking MongoDB connection..."
if ! nc -z localhost 27017 2>/dev/null; then
    echo "❌ MongoDB is not running. Please start MongoDB first:"
    echo "   mongod"
    exit 1
fi

echo "✅ MongoDB is running"

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Seed the database
echo "🌱 Seeding database with sample products..."
npm run seed

# Start the server
echo "🔥 Starting server..."
npm run dev
