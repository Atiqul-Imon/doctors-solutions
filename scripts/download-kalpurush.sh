#!/bin/bash

# Script to download Kalpurush font for Bengali text support in PDFs

FONT_DIR="public/fonts/kalpurush"
FONT_FILE="$FONT_DIR/Kalpurush.ttf"

# Create directory if it doesn't exist
mkdir -p "$FONT_DIR"

# Check if font already exists
if [ -f "$FONT_FILE" ]; then
    echo "Kalpurush font already exists at $FONT_FILE"
    exit 0
fi

echo "Downloading Kalpurush font..."

# Try to download from GitHub releases or direct link
# Note: You may need to manually download from https://github.com/potasiyam/Kalpurush
# and place it in public/fonts/kalpurush/Kalpurush.ttf

# Alternative: Download from a CDN or direct link if available
# curl -L -o "$FONT_FILE" "https://github.com/potasiyam/Kalpurush/raw/main/Kalpurush.ttf"

echo ""
echo "Please download Kalpurush font manually:"
echo "1. Visit: https://github.com/potasiyam/Kalpurush"
echo "2. Download Kalpurush.ttf"
echo "3. Place it in: $FONT_DIR/Kalpurush.ttf"
echo ""
echo "Or use this command (if direct link is available):"
echo "curl -L -o $FONT_FILE 'https://github.com/potasiyam/Kalpurush/raw/main/Kalpurush.ttf'"

