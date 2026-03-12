#!/bin/sh
set -e

# Run migrations and start backend
echo "Running Database Migrations..."
cd /app/backend
npm run migrate

echo "Starting Backend API..."
npm run start &
BACKEND_PID=$!

# Start NGINX
echo "Starting NGINX..."
nginx -g 'daemon off;' &
NGINX_PID=$!

# Wait for both processes
wait $BACKEND_PID
wait $NGINX_PID
