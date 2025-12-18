#!/bin/bash

set -e

echo "🚀 Starting deployment of tondev.foundation..."

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

# Check if .env file exists
if [ ! -f .env ]; then
    echo "⚠️  .env file not found. Creating from .env.example..."
    cp .env.example .env
    echo "📝 Please edit .env file with your configuration before continuing."
    exit 1
fi

# Pull latest changes if in git repository
if [ -d .git ]; then
    echo "📥 Pulling latest changes..."
    git pull origin main || git pull origin master || echo "⚠️  Could not pull changes"
fi

# Build and start containers
echo "🔨 Building and starting containers..."
docker-compose down
docker-compose build --no-cache
docker-compose up -d

# Wait for services to be ready
echo "⏳ Waiting for services to start..."
sleep 10

# Check if services are running
if docker-compose ps | grep -q "Up"; then
    echo "✅ Services are running!"
    echo "🌐 Application should be available at http://$(hostname -I | awk '{print $1}'):5000"
    echo ""
    echo "📋 Next steps:"
    echo "1. Configure DNS records in Netim:"
    echo "   - A record: @ -> $(hostname -I | awk '{print $1}')"
    echo "   - A record: www -> $(hostname -I | awk '{print $1}')"
    echo ""
    echo "2. After DNS propagation, run SSL setup:"
    echo "   ./setup-ssl.sh"
    echo ""
    echo "3. View logs:"
    echo "   docker-compose logs -f"
else
    echo "❌ Some services failed to start. Check logs with: docker-compose logs"
    exit 1
fi


