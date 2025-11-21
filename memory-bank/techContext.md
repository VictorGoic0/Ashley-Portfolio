# Technical Context

## Technology Stack
- **HTML5**: Semantic markup, no frameworks
- **CSS3**: Modern styling, no preprocessors (Sass/Less)
- **Vanilla JavaScript**: No libraries or frameworks (jQuery, React, etc.)
- **Static Site**: No server-side rendering or build process required

## Development Tools
- **ffmpeg**: Installed via Homebrew for video thumbnail generation
- **pdf2image**: Python library for PDF to image conversion
- **sips**: macOS built-in tool for image processing
- **Pillow**: Python library (dependency of pdf2image)

## File Naming Standards
- All asset files: lowercase with underscores (e.g., `ashley_zheng_band-aid_x_spiderman.png`)
- Thumbnails: Original filename + `_thumb` suffix (e.g., `ashley_zheng_band-aid_x_spiderman_thumb.png`)
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
- **Dimensions**: 643px wide × 450px tall (wider than tall, ~3:2 ratio)
- **Format**: PNG for videos/PDFs, original format for images
- **Generation**: Automated via `generate_thumbnails.sh` script
- **Coverage**: All non-header images, all videos, all PDFs

## Browser Compatibility
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Responsive design tested for:
  - Desktop: 1400px max-width containers
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

