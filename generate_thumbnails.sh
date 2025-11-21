#!/bin/bash

# Script to generate thumbnails for all images, videos, and PDFs
# Two thumbnail types:
# - thumbnail-regular: 846×580px for images (featured grid)
# - thumbnail-carousel: 16:9 aspect ratio for PDFs and videos (carousel)

# Regular thumbnail dimensions (for images)
REGULAR_WIDTH=846
REGULAR_HEIGHT=580

# Carousel thumbnail dimensions (16:9 aspect ratio)
CAROUSEL_WIDTH=400
CAROUSEL_HEIGHT=225  # 400 * 9/16 = 225

ASSETS_DIR="assets"
THUMBNAILS_DIR="$ASSETS_DIR/thumbnails"

# Create thumbnails directory if it doesn't exist
mkdir -p "$THUMBNAILS_DIR"

# Function to generate regular thumbnail for images (846×580px)
generate_image_thumbnail_regular() {
    local input_file="$1"
    local output_file="$2"
    
    echo "Processing image (regular): $input_file"
    sips -z "$REGULAR_HEIGHT" "$REGULAR_WIDTH" "$input_file" --out "$output_file" > /dev/null 2>&1
    
    if [ $? -eq 0 ]; then
        echo "  ✓ Created regular thumbnail: $output_file"
    else
        echo "  ✗ Failed to create thumbnail for: $input_file"
    fi
}

# Function to generate carousel thumbnail for videos (16:9)
generate_video_thumbnail_carousel() {
    local input_file="$1"
    local output_file="$2"
    
    echo "Processing video (carousel): $input_file"
    # Extract first frame and resize to 16:9
    ffmpeg -i "$input_file" -vf "scale=$CAROUSEL_WIDTH:$CAROUSEL_HEIGHT:force_original_aspect_ratio=increase,crop=$CAROUSEL_WIDTH:$CAROUSEL_HEIGHT" -frames:v 1 -y "$output_file" > /dev/null 2>&1
    
    if [ $? -eq 0 ]; then
        echo "  ✓ Created carousel thumbnail: $output_file"
    else
        echo "  ✗ Failed to create thumbnail for: $input_file"
    fi
}

# Function to generate carousel thumbnail for PDFs (16:9)
generate_pdf_thumbnail_carousel() {
    local input_file="$1"
    local output_file="$2"
    
    echo "Processing PDF (carousel): $input_file"
    
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
        # Resize maintaining aspect ratio, then crop to 16:9
        img.thumbnail(($CAROUSEL_WIDTH, $CAROUSEL_HEIGHT), Image.Resampling.LANCZOS)
        
        # Create a new image with exact 16:9 dimensions and paste centered
        new_img = Image.new('RGB', ($CAROUSEL_WIDTH, $CAROUSEL_HEIGHT), (255, 255, 255))
        x_offset = ($CAROUSEL_WIDTH - img.width) // 2
        y_offset = ($CAROUSEL_HEIGHT - img.height) // 2
        new_img.paste(img, (x_offset, y_offset))
        
        # Save as PNG
        new_img.save('$output_file', 'PNG')
        print("  ✓ Created carousel thumbnail: $output_file")
    else:
        print("  ✗ Failed to convert PDF: $input_file")
except Exception as e:
    print(f"  ✗ Error processing PDF: {e}")
    sys.exit(1)
EOF
}

# Process all images (excluding header images) - generate regular thumbnails
echo "=== Processing Images (Regular Thumbnails) ==="
find "$ASSETS_DIR/images" -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" -o -iname "*.gif" \) ! -iname "*header*" | while read -r file; do
    filename=$(basename "$file")
    name="${filename%.*}"
    extension="${filename##*.}"
    output_file="$THUMBNAILS_DIR/${name}_thumbnail_regular.${extension}"
    
    if [ ! -f "$output_file" ]; then
        generate_image_thumbnail_regular "$file" "$output_file"
    else
        echo "  ⊙ Thumbnail already exists: $output_file"
    fi
done

# Process all videos - generate carousel thumbnails (16:9)
echo ""
echo "=== Processing Videos (Carousel Thumbnails) ==="
find "$ASSETS_DIR/videos" -type f \( -iname "*.mov" -o -iname "*.mp4" -o -iname "*.avi" -o -iname "*.mkv" \) | while read -r file; do
    filename=$(basename "$file")
    name="${filename%.*}"
    output_file="$THUMBNAILS_DIR/${name}_thumbnail_carousel.png"
    
    if [ ! -f "$output_file" ]; then
        generate_video_thumbnail_carousel "$file" "$output_file"
    else
        echo "  ⊙ Thumbnail already exists: $output_file"
    fi
done

# Process all PDFs - generate carousel thumbnails (16:9)
echo ""
echo "=== Processing PDFs (Carousel Thumbnails) ==="
find "$ASSETS_DIR/pdfs" -type f -iname "*.pdf" | while read -r file; do
    filename=$(basename "$file")
    name="${filename%.*}"
    output_file="$THUMBNAILS_DIR/${name}_thumbnail_carousel.png"
    
    if [ ! -f "$output_file" ]; then
        generate_pdf_thumbnail_carousel "$file" "$output_file"
    else
        echo "  ⊙ Thumbnail already exists: $output_file"
    fi
done

echo ""
echo "=== Thumbnail generation complete! ==="

