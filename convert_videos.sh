#!/bin/bash

# Convert all .mov files to .mp4 using ffmpeg
# Usage: ./convert_videos.sh

# Check if ffmpeg is installed
if ! command -v ffmpeg &> /dev/null; then
    echo "Error: ffmpeg is not installed"
    echo "Install it with: brew install ffmpeg"
    exit 1
fi

# Directory containing the videos
VIDEO_DIR="assets/videos"

# Check if directory exists
if [ ! -d "$VIDEO_DIR" ]; then
    echo "Error: Directory $VIDEO_DIR does not exist"
    exit 1
fi

# Convert each .mov file to .mp4
echo "Converting .mov files to .mp4..."
for mov_file in "$VIDEO_DIR"/*.mov; do
    # Check if any .mov files exist
    if [ ! -e "$mov_file" ]; then
        echo "No .mov files found in $VIDEO_DIR"
        exit 0
    fi
    
    # Get the filename without extension
    filename=$(basename "$mov_file" .mov)
    mp4_file="$VIDEO_DIR/$filename.mp4"
    
    echo "Converting $filename.mov to $filename.mp4..."
    
    # Convert with H.264 codec for maximum browser compatibility
    # -c:v libx264: Use H.264 video codec
    # -pix_fmt yuv420p: Use pixel format compatible with all browsers
    # -c:a aac: Use AAC audio codec
    # -b:a 128k: Audio bitrate
    # -movflags +faststart: Enable fast start for web playback
    ffmpeg -i "$mov_file" \
        -c:v libx264 \
        -pix_fmt yuv420p \
        -c:a aac \
        -b:a 128k \
        -movflags +faststart \
        -y \
        "$mp4_file"
    
    if [ $? -eq 0 ]; then
        echo "✓ Successfully converted $filename.mov"
    else
        echo "✗ Failed to convert $filename.mov"
    fi
done

echo ""
echo "Conversion complete!"
echo ""
echo "Next steps:"
echo "1. Test the .mp4 files in your browser"
echo "2. If they work, you can delete the .mov files"
echo "3. Run: node generate_project_pages.js"

