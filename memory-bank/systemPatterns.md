# System Patterns

## Architecture Overview
The portfolio follows a simple, static site architecture with:
- **Main Page** (`index.html`): Landing page with header, owner info, featured projects grid, and carousel
- **Project Pages** (`projects/project-*.html`): Individual project detail pages
- **Assets Organization**: Structured directories for images, videos, PDFs, and thumbnails

## Key Technical Decisions

### File Structure
```
/
├── index.html              # Main portfolio page (content populated)
├── styles.css              # All styling (no preprocessors, full-width)
├── script.js               # All JavaScript (vanilla, infinite scroll carousel)
├── generate_thumbnails.sh  # Thumbnail generation script
├── projects/               # Individual project pages
│   └── project-1.html      # Template for project details
└── assets/
    ├── images/             # Full-resolution images (including header.png)
    ├── videos/             # Video files
    ├── pdfs/               # PDF documents
    └── thumbnails/         # Generated thumbnails (regular & carousel)
```

### Card System
- **Featured Grid**: 2-column layout, 50px gap, full-width, uses `thumbnail-regular` (846×580px, ~1.46:1 ratio)
  - Currently displays 4 image projects
  - Cards use semantic IDs based on filenames
- **Carousel**: Infinite scroll with `thumbnail-carousel` (16:9 aspect ratio, 400×225px desktop)
  - Currently displays all 12 projects (5 PDFs + 7 videos)
  - Seamless looping with cloned cards
- **No Titles**: Cards display only thumbnail images (titles removed per design decision)
- **Responsive**: Adapts to 1 column on mobile, maintains 2 columns on tablet/desktop
- **Layout**: Full-width (no max-width constraints)

### Media Handling
- **Thumbnail Types**:
  - `thumbnail-regular`: 846×580px (big squares, ~1.46:1 ratio) - for images (tall format)
  - `thumbnail-carousel`: 16:9 aspect ratio - for PDFs and videos (wide format)
- **Media Type Mapping**:
  - **Images** → `thumbnail-regular` (used in featured grid)
  - **PDFs** → `thumbnail-carousel` (wide format, carousel only)
  - **Videos** → `thumbnail-carousel` (wide format, carousel only)
- **Naming Convention**: 
  - Regular: `{filename}_thumbnail_regular.{ext}`
  - Carousel: `{filename}_thumbnail_carousel.{ext}`
- **Thumbnail Generation**: Script uses `sips` (images), `ffmpeg` (videos), `pdf2image` (PDFs)

### Navigation Pattern
- **Card Clicks**: All project cards navigate to detail pages via URL parameters (`?id=X`)
- **Back Navigation**: Project pages include back button to return to main portfolio
- **Carousel**: Infinite scroll with prev/next buttons, touch/swipe support
  - Clones cards at beginning and end for seamless looping
  - Automatically jumps to real cards when reaching clones
  - No visible boundaries - continuous scrolling experience

## Design Patterns

### CSS Organization
- Base reset and typography at top
- Component-based styling (header, cards, carousel, etc.)
- Responsive breakpoints at bottom (tablet: 1024px, mobile: 768px, small mobile: 480px)

### JavaScript Structure
- **Carousel Class**: Encapsulates carousel functionality with infinite scroll
  - Clones cards for seamless looping
  - Handles transition events to jump between real and cloned cards
  - Methods for scrolling, navigation, dimension calculation
- **Event Handlers**: Centralized setup for card clicks and navigation
- **DOM Ready**: All initialization happens on `DOMContentLoaded`

### Responsive Strategy
- **Desktop**: Full 2-column grid, full carousel functionality
- **Tablet**: Maintains 2-column grid, adjusted card heights
- **Mobile**: Single column, touch-optimized carousel

## Component Relationships
- **Header Section** → Sets visual tone, uses background image
- **Owner Info** → Provides context about portfolio owner
- **Featured Grid** → Highlights key projects (first 4)
- **Carousel** → Shows all available projects
- **Project Cards** → Shared component used in both featured and carousel sections
- **Project Detail Pages** → Display full media and descriptions

