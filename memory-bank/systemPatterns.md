# System Patterns

## Architecture Overview
The portfolio follows a simple, static site architecture with:
- **Main Page** (`index.html`): Landing page with header, owner info, and three category sections (Print Ads, Line Sheets, Video Edits)
- **Project Pages** (`projects/{project-id}.html`): 17 individual project detail pages
- **Project Data** (`projects.js`): Centralized data structure for all projects
- **Assets Organization**: Structured directories for images, videos (MP4), PDFs, and thumbnails

## Key Technical Decisions

### File Structure
```
/
├── index.html              # Main portfolio page (three-section layout); source of truth for project links and thumbnails
├── styles.css              # All styling (no preprocessors, full-width, grid-based)
├── script.js               # Minimal navigation logic (carousel removed)
├── generate_thumbnails.sh  # Thumbnail generation script (if used)
├── projects/               # Individual project pages (17 files, kebab-case names)
│   ├── spider-man-band-aid.html
│   ├── prose.html
│   ├── anythingec-detailing-supplies.html
│   ├── anythingec-car-meet.html
│   ├── ferrero-rocher.html
│   ├── little-caesars-pizza-ad.html
│   ├── starke-technologies.html
│   ├── eden-presley-mantra.html
│   ├── eden-presley-one-of-a-kind.html
│   ├── eden-presley-rock.html
│   ├── campaign.html
│   ├── creative-video-project-1.html … creative-video-project-4.html
│   ├── fall-campaign.html
│   └── spring-campaign.html
└── assets/
    ├── images/             # Full-resolution images (e.g. {slug}-image.png, header.png)
    ├── videos/             # Video files (.mp4, kebab-case)
    ├── pdfs/               # PDF documents (kebab-case)
    └── thumbnails/         # Thumbnails ({slug}-thumbnail.png or .jpg)
```

### Card System
- **Three Section Layout**: All sections use identical 2-column grid layout
  - **Print Ads Section**: 7 projects (images and print ad PDFs)
  - **Line Sheets Section**: 3 projects (PDF line sheets)
  - **Video Edits Section**: 7 projects (video content)
- **Grid Properties**: 2-column layout, 50px gap, full-width, uses `thumbnail-regular` class (846×580px, ~1.46:1 ratio)
- **No Titles**: Cards display only thumbnail images (titles removed per design decision)
- **Responsive**: Adapts to 1 column on mobile, maintains 2 columns on tablet/desktop
- **Layout**: Full-width (no max-width constraints)
- **No Carousel**: All projects displayed in static grid sections

### Media Handling
- **Thumbnail Types**:
  - `thumbnail-regular`: 846×580px (~1.46:1 ratio) - used in all three sections
  - `thumbnail-carousel`: 16:9 aspect ratio - available but not currently used
- **Media Type Mapping**:
  - All sections use `thumbnail-regular` class regardless of media type
  - Thumbnails can be from regular or carousel sources depending on what's available
- **Video Format**: MP4 (H.264 codec, AAC audio) for universal browser support
- **Naming Convention**: Kebab-case; thumbnails `{slug}-thumbnail.{ext}` (e.g. `spider-man-band-aid-thumbnail.png`, `campaign-thumbnail.png`)
- **Thumbnail Generation**: Script uses `sips` (images), `ffmpeg` (videos), `pdf2image` (PDFs)
- **Video Conversion**: ffmpeg converts .mov to .mp4 with H.264 codec and faststart flag

### Navigation Pattern
- **Card Clicks**: All project cards link directly to project HTML files (`projects/{id}.html`)
- **Back Navigation**: Project pages include back button to return to main portfolio
- **Static Grid Sections**: All projects visible in three category-based sections
  - No scrolling required - all projects immediately visible
  - Simple, straightforward navigation

### Project Data / Content Source
- **Index as source of truth**: `index.html` contains all project card links (`projects/{slug}.html`) and thumbnail paths (`assets/thumbnails/{slug}-thumbnail.{ext}`). No `projects.js` in use.
- **Project pages**: Each project HTML file references its own media (image path, PDF path, or video source) using kebab-case asset names.

## Design Patterns

### CSS Organization
- Base reset and typography at top
- Component-based styling (header, cards, carousel, etc.)
- Responsive breakpoints at bottom (tablet: 1024px, mobile: 768px, small mobile: 480px)

### JavaScript Structure
- **Minimal JavaScript**: Carousel functionality removed
- **Event Handlers**: Card click navigation to project detail pages
- **DOM Ready**: All initialization happens on `DOMContentLoaded` (if needed)

### Responsive Strategy
- **Desktop**: Full 2-column grid, full carousel functionality
- **Tablet**: Maintains 2-column grid, adjusted card heights
- **Mobile**: Single column, touch-optimized carousel

## Component Relationships
- **Header Section** → Sets visual tone, uses background image
- **Owner Info** → Provides context about portfolio owner
- **Print Ads Section** → Displays 7 print advertisement projects
- **Line Sheets Section** → Displays 3 line sheet PDF projects
- **Video Edits Section** → Displays 7 video editing projects
- **Project Cards** → Shared component used across all three sections
- **Project Detail Pages** → Display full media and descriptions

