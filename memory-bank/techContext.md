# Technical Context

## Technology Stack
- **HTML5**: Semantic markup, no frameworks
- **CSS3**: Modern styling, no preprocessors (Sass/Less)
- **Vanilla JavaScript**: No libraries or frameworks (jQuery, React, etc.)
- **Static Site**: No server-side rendering or build process required

## Development Tools
- **ffmpeg**: Installed via Homebrew for video thumbnail generation
- **pdf2image**: Python library for PDF to image conversion
- **poppler**: Installed via Homebrew (required by pdf2image)
- **sips**: macOS built-in tool for image processing
- **Pillow**: Python library (dependency of pdf2image)

## File Naming Standards
- All asset files: lowercase with underscores (e.g., `ashley_zheng_band-aid_x_spiderman.png`)
- Thumbnails: Original filename + `_thumbnail_regular` or `_thumbnail_carousel` suffix
  - Regular: `{filename}_thumbnail_regular.{ext}` (e.g., `ashley_zheng_band-aid_x_spiderman_thumbnail_regular.png`)
  - Carousel: `{filename}_thumbnail_carousel.png` (e.g., `campaign_thumbnail_carousel.png`)
- Header image: Named `header.png` in `assets/images/`

## Asset Organization
```
assets/
├── images/          # Full-resolution images (including header.png)
├── videos/          # Video files (.mov, .mp4)
├── pdfs/            # PDF documents
└── thumbnails/      # Generated thumbnails (643×450px)
```

## Thumbnail Specifications

### Thumbnail-Regular (Featured Grid)
- **Dimensions**: 846px wide × 580px tall
- **Aspect Ratio**: ~1.46:1 (approximately 3:2 but slightly wider)
- **Usage**: Featured projects grid (images only)
- **Format**: Original image format (PNG/JPG)

### Thumbnail-Carousel (Carousel Section)
- **Dimensions**: 16:9 aspect ratio (width varies, height = width × 9/16)
- **Usage**: Carousel section (PDFs and videos)
- **Format**: PNG (for videos and PDFs)

### Media Type Mapping
- **Images** (tall format) → `thumbnail-regular` (846×580px) - used in featured grid
- **PDFs** (wide format) → `thumbnail-carousel` (16:9) - carousel only
- **Videos** (wide format) → `thumbnail-carousel` (16:9) - carousel only

### Generation
- **Script**: `generate_thumbnails.sh`
- **Tools**: `sips` (images), `ffmpeg` (videos), `pdf2image` (PDFs)
- **Coverage**: All non-header images get regular thumbnails; all videos and PDFs get carousel thumbnails

## Browser Compatibility
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Responsive design tested for:
  - Desktop: Full-width layout
  - Tablet: 1024px breakpoint
  - Mobile: 768px and 480px breakpoints

## Performance Considerations
- No external dependencies (no CDN links, no npm packages)
- Static file serving (can be hosted on any web server)
- Thumbnails pre-generated to reduce processing load
- CSS and JS in single files for simplicity

## Development Environment
- **OS**: macOS (Darwin 23.2.0)
- **Shell**: zsh
- **Package Manager**: Homebrew (for ffmpeg)
- **Python**: pip3 (for pdf2image)

## Deployment Readiness
- Pure static files (HTML, CSS, JS)
- No build process required
- Compatible with any static hosting (GitHub Pages, Netlify, Vercel, AWS S3, etc.)
- No server-side requirements

