#!/bin/bash

# Simple Python web server script
# Usage: ./serve.sh [port] [directory]

# Default values
PORT=${1:-8000}
DIR=${2:-./website}

echo "Starting Python web server..."
echo "Serving directory: $DIR"
echo "Port: $PORT"
echo "URL: http://localhost:$PORT"
echo "Press Ctrl+C to stop"
echo ""

# Check if directory exists
if [ ! -d "$DIR" ]; then
    echo "Error: Directory '$DIR' does not exist"
    exit 1
fi

# Change to the directory
cd "$DIR"

# Start Python server (works with Python 3)
python3 -m http.server "$PORT"