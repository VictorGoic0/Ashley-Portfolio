#!/bin/bash

# Script to generate thumbnails for all images, videos, and PDFs
# Thumbnail size: 643x450 (2 per line with 50px gap, wider than tall - 3:2 ratio)

THUMBNAIL_WIDTH=643
THUMBNAIL_HEIGHT=450
ASSETS_DIR="assets"
THUMBNAILS_DIR="$ASSETS_DIR/thumbnails"

# Create thumbnails directory if it doesn't exist
mkdir -p "$THUMBNAILS_DIR"

# Function to generate thumbnail for images
generate_image_thumbnail() {
    local input_file="$1"
    local output_file="$2"
    
    echo "Processing image: $input_file"
    sips -z "$THUMBNAIL_HEIGHT" "$THUMBNAIL_WIDTH" "$input_file" --out "$output_file" > /dev/null 2>&1
    
    if [ $? -eq 0 ]; then
        echo "  ✓ Created thumbnail: $output_file"
    else
        echo "  ✗ Failed to create thumbnail for: $input_file"
    fi
}

# Function to generate thumbnail for videos (extract first frame)
generate_video_thumbnail() {
    local input_file="$1"
    local output_file="$2"
    
    echo "Processing video: $input_file"
    # Extract first frame and resize
    ffmpeg -i "$input_file" -vf "scale=$THUMBNAIL_WIDTH:$THUMBNAIL_HEIGHT:force_original_aspect_ratio=increase,crop=$THUMBNAIL_WIDTH:$THUMBNAIL_HEIGHT" -frames:v 1 -y "$output_file" > /dev/null 2>&1
    
    if [ $? -eq 0 ]; then
        echo "  ✓ Created thumbnail: $output_file"
    else
        echo "  ✗ Failed to create thumbnail for: $input_file"
    fi
}

# Function to generate thumbnail for PDFs (first page)
generate_pdf_thumbnail() {
    local input_file="$1"
    local output_file="$2"
    
    echo "Processing PDF: $input_file"
    
    # Convert first page of PDF to image using pdf2image
    python3 << EOF
from pdf2image import convert_from_path
from PIL import Image
import sys

try:
    # Convert first page
    images = convert_from_path('$input_file', first_page=1, last_page=1, dpi=150)
    if images:
        img = images[0]
        # Resize maintaining aspect ratio, then crop to exact size
        img.thumbnail(($THUMBNAIL_WIDTH, $THUMBNAIL_HEIGHT), Image.Resampling.LANCZOS)
        
        # Create a new image with exact dimensions and paste centered
        new_img = Image.new('RGB', ($THUMBNAIL_WIDTH, $THUMBNAIL_HEIGHT), (255, 255, 255))
        x_offset = ($THUMBNAIL_WIDTH - img.width) // 2
        y_offset = ($THUMBNAIL_HEIGHT - img.height) // 2
        new_img.paste(img, (x_offset, y_offset))
        
        # Save as PNG
        new_img.save('$output_file', 'PNG')
        print("  ✓ Created thumbnail: $output_file")
    else:
        print("  ✗ Failed to convert PDF: $input_file")
except Exception as e:
    print(f"  ✗ Error processing PDF: {e}")
    sys.exit(1)
EOF
}

# Process all images (excluding header images)
echo "=== Processing Images ==="
find "$ASSETS_DIR/images" -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" -o -iname "*.gif" \) ! -iname "*header*" | while read -r file; do
    filename=$(basename "$file")
    name="${filename%.*}"
    extension="${filename##*.}"
    output_file="$THUMBNAILS_DIR/${name}_thumb.${extension}"
    
    if [ ! -f "$output_file" ]; then
        generate_image_thumbnail "$file" "$output_file"
    else
        echo "  ⊙ Thumbnail already exists: $output_file"
    fi
done

# Process all videos
echo ""
echo "=== Processing Videos ==="
find "$ASSETS_DIR/videos" -type f \( -iname "*.mov" -o -iname "*.mp4" -o -iname "*.avi" -o -iname "*.mkv" \) | while read -r file; do
    filename=$(basename "$file")
    name="${filename%.*}"
    output_file="$THUMBNAILS_DIR/${name}_thumb.png"
    
    if [ ! -f "$output_file" ]; then
        generate_video_thumbnail "$file" "$output_file"
    else
        echo "  ⊙ Thumbnail already exists: $output_file"
    fi
done

# Process all PDFs
echo ""
echo "=== Processing PDFs ==="
find "$ASSETS_DIR/pdfs" -type f -iname "*.pdf" | while read -r file; do
    filename=$(basename "$file")
    name="${filename%.*}"
    output_file="$THUMBNAILS_DIR/${name}_thumb.png"
    
    if [ ! -f "$output_file" ]; then
        generate_pdf_thumbnail "$file" "$output_file"
    else
        echo "  ⊙ Thumbnail already exists: $output_file"
    fi
done

echo ""
echo "=== Thumbnail generation complete! ==="

