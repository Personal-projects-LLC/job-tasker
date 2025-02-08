#!/bin/bash

# Function to cleanup processes
cleanup() {
    echo "Cleaning up processes..."
    if [ ! -z "$SERVER_PID" ]; then
        echo "Killing server process $SERVER_PID"
        kill $SERVER_PID 2>/dev/null || true
    fi
    exit $TEST_EXIT_CODE
}

# Set up trap for cleanup
trap cleanup EXIT INT TERM

# Initialize exit code
TEST_EXIT_CODE=1

# Build the application
echo "Building application..."
npm run build

# Start the server in background
echo "Starting server..."
npm run start:ci &
SERVER_PID=$!

# Wait for the server to be ready
echo "Waiting for server to be ready..."
COUNTER=0
MAX_TRIES=30
while ! curl -s http://localhost:3000 > /dev/null; do
    if [ $COUNTER -gt $MAX_TRIES ]; then
        echo "Server failed to start after $MAX_TRIES seconds"
        cleanup
    fi
    sleep 1
    let COUNTER++
    echo "Waiting... ($COUNTER/$MAX_TRIES)"
done

echo "Server is ready. Running tests..."
# Run the tests
npm run cypress:run
TEST_EXIT_CODE=$?

echo "Tests completed with exit code: $TEST_EXIT_CODE"
cleanup