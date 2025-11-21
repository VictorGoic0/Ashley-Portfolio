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
├── index.html              # Main portfolio page
├── styles.css              # All styling (no preprocessors)
├── script.js               # All JavaScript (vanilla, no frameworks)
├── projects/               # Individual project pages
│   └── project-1.html      # Template for project details
└── assets/
    ├── images/             # Full-resolution images (including header)
    ├── videos/             # Video files
    ├── pdfs/               # PDF documents
    └── thumbnails/         # Generated thumbnails (643x450px)
```

### Card System
- **Featured Grid**: 2-column layout, 50px gap, cards are 643px wide × 450px tall
- **Carousel**: Horizontal scrolling with same card dimensions
- **No Titles**: Cards display only thumbnail images (titles removed per design decision)
- **Responsive**: Adapts to 1 column on mobile, maintains 2 columns on tablet/desktop

### Media Handling
- **Thumbnails**: All non-header media gets 643×450px thumbnails generated automatically
- **Naming Convention**: All files lowercase with underscores (e.g., `ashley_zheng_band-aid_x_spiderman.png`)
- **Thumbnail Generation**: Script uses `sips` (images), `ffmpeg` (videos), `pdf2image` (PDFs)

### Navigation Pattern
- **Card Clicks**: All project cards navigate to detail pages via URL parameters (`?id=X`)
- **Back Navigation**: Project pages include back button to return to main portfolio
- **Carousel**: Horizontal scrolling with prev/next buttons, touch/swipe support

## Design Patterns

### CSS Organization
- Base reset and typography at top
- Component-based styling (header, cards, carousel, etc.)
- Responsive breakpoints at bottom (tablet: 1024px, mobile: 768px, small mobile: 480px)

### JavaScript Structure
- **Carousel Class**: Encapsulates carousel functionality with methods for scrolling, navigation
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

