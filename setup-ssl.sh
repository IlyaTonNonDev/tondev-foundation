#!/bin/bash

set -e

DOMAIN="tondev.foundation"
EMAIL="your-email@example.com"  # Change this to your email

echo "🔒 Setting up SSL certificate for $DOMAIN..."

# Check if domain is pointing to this server
echo "⏳ Checking DNS..."
PUBLIC_IP=$(curl -s ifconfig.me || curl -s ipinfo.io/ip)
DNS_IP=$(dig +short $DOMAIN | tail -n1 || echo "")

if [ -z "$DNS_IP" ]; then
    echo "⚠️  Warning: Could not resolve $DOMAIN"
    echo "   Please make sure DNS records are configured!"
    read -p "Continue anyway? (y/N) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
elif [ "$PUBLIC_IP" != "$DNS_IP" ]; then
    echo "⚠️  Warning: Domain $DOMAIN ($DNS_IP) does not point to this server ($PUBLIC_IP)"
    echo "   Please update DNS records first!"
    read -p "Continue anyway? (y/N) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Make sure nginx is running
echo "⏳ Starting nginx..."
docker-compose up -d nginx

# Wait for nginx to be ready
sleep 5

# Create directories for certbot
mkdir -p ssl

# Run certbot to obtain certificate
echo "⏳ Obtaining SSL certificate..."
docker-compose run --rm certbot certonly \
    --webroot \
    --webroot-path=/var/www/certbot \
    --email $EMAIL \
    --agree-tos \
    --no-eff-email \
    --force-renewal \
    -d $DOMAIN \
    -d www.$DOMAIN

if [ $? -eq 0 ]; then
    echo "✅ SSL certificate obtained!"
    echo "🔄 Restarting nginx..."
    docker-compose restart nginx
    
    # Start certbot renewal service
    echo "🔄 Starting certbot renewal service..."
    docker-compose --profile ssl up -d certbot
    
    echo "✅ SSL setup complete!"
    echo "🌐 Your site should now be available at https://$DOMAIN"
else
    echo "❌ Failed to obtain SSL certificate"
    echo "   Please check:"
    echo "   1. DNS records are configured correctly"
    echo "   2. Ports 80 and 443 are open in firewall"
    echo "   3. Nginx is running and accessible"
    exit 1
fi

