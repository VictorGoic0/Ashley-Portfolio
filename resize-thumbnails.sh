#!/bin/bash

ORIGINALS="assets/thumbnails-v2/originals"
OUTPUT="assets/thumbnails-v2"

echo "Resizing thumbnails..."
echo ""

# Portrait 9:16 (600x1067)
echo "Processing 9:16 (portrait) images..."
for file in "$ORIGINALS"/*-9x16-thumbnail.*; do
  if [ -f "$file" ]; then
    filename=$(basename "$file")
    echo "  - $filename"
    convert "$file" -resize 600x1067 -quality 90 "$OUTPUT/$filename"
  fi
done

echo ""
echo "Processing 16:9 (landscape) images..."
# Landscape 16:9 (1200x675)
for file in "$ORIGINALS"/*-16x9-thumbnail.*; do
  if [ -f "$file" ]; then
    filename=$(basename "$file")
    echo "  - $filename"
    convert "$file" -resize 1200x675 -quality 90 "$OUTPUT/$filename"
  fi
done

echo ""
echo "Done! Resized thumbnails are in $OUTPUT"
echo ""
echo "File sizes:"
ls -lh "$OUTPUT"/*.{png,jpg} 2>/dev/null | awk '{print $9, $5}'
