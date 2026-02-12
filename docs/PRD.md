# Portfolio Website - Product Requirements Document

## Overview
A clean, modern portfolio website built with plain HTML, CSS, and JavaScript (no frameworks). The design should follow the spacing and card sizing patterns seen in modern e-commerce and streaming platforms, with a focus on showcasing projects through a hero section, featured cards, and a carousel interface.

## Design Inspiration
- **Layout Structure**: Similar to e-commerce product pages with a prominent header section
- **Card Sizing**: Reference the card proportions from streaming service homepages
- **Spacing**: Full-screen layout with generous whitespace and clear visual hierarchy
- **Navigation**: Clean, minimal header with clear content sections

## Core Features

### 1. Header Section
- **Background Image**: 
  - Full-width background image at the top of the page
  - User will select an image from one of their projects to use as the header background
  - Image should be responsive and maintain aspect ratio
  - Consider overlay effects for text readability if needed

### 2. Portfolio Owner Information
- **Title**: Display the portfolio owner's name or title prominently
- **Description**: A text description about the person who owns the portfolio
- Positioned directly below the header image
- Should be clearly readable with appropriate typography

### 3. Featured Projects Section
- **Card Grid**: Display a preset number of project cards (default: 4)
- **Card Layout**: 
  - Each card should display a thumbnail image
  - Cards should be evenly spaced and responsive
  - Card sizing should follow the proportions seen in the reference screenshots
  - Cards should be clickable and lead to individual project pages
- **Visual Design**: 
  - Clean, modern card design
  - Hover states for interactivity
  - Consistent spacing between cards

### 4. Carousel Section
- **Purpose**: Allow users to browse all available projects
- **Functionality**:
  - Horizontal scrolling carousel
  - Contains all projects (not just the featured 4)
  - Each item in the carousel should be clickable
  - Navigation controls (arrows/buttons) to move through the carousel
- **Visual Design**:
  - Similar card styling to featured section
  - Smooth scrolling animation
  - Responsive to different screen sizes

### 5. Project Detail Pages
- **Navigation**: Clicking any card (featured or carousel) navigates to a dedicated project page
- **Content Structure**:
  - **Thumbnail URL**: Used for card display (smaller, optimized image)
  - **Main Media**: The actual item clicked will display either:
    - An image (full resolution)
    - A video (embedded or direct)
  - **Full Text Description**: Complete project description, details, and information
- **Layout**: 
  - Basic scaffold structure (detailed layout to be designed later)
  - Should accommodate both image and video content
  - Text description should be clearly readable

## Technical Requirements

### Technology Stack
- **HTML5**: Semantic markup
- **CSS3**: Modern styling, no preprocessors
- **Vanilla JavaScript**: No frameworks or libraries
- **Responsive Design**: Must work on desktop, tablet, and mobile devices

### Data Structure
Each project should have:
- `id`: Unique identifier
- `title`: Project name/title
- `thumbnailUrl`: URL for card/thumbnail display
- `mediaUrl`: URL for main media (image or video)
- `mediaType`: Either "image" or "video"
- `description`: Full text description of the project

### File Structure
```
/
├── index.html
├── styles.css
├── script.js
├── projects/
│   ├── project-1.html
│   ├── project-2.html
│   └── ...
└── assets/
    ├── images/
    └── videos/
```

## User Experience Flow

1. **Landing Page**:
   - User sees header image with portfolio owner's title and description
   - Featured 4 project cards are visible
   - Carousel below shows all available projects
   
2. **Browsing**:
   - User can scroll through carousel to see all projects
   - User can click any card (featured or carousel) to view project details
   
3. **Project Detail**:
   - User lands on dedicated project page
   - Sees main media (image or video)
   - Reads full project description
   - Can navigate back to main portfolio page

## Visual Specifications

### Spacing
- Generous whitespace between sections
- Consistent padding and margins throughout
- Full-screen layout with appropriate max-widths for content areas

### Typography
- Clean, readable font choices
- Clear hierarchy: Header > Title > Description > Card Titles
- Appropriate font sizes for different screen sizes

### Colors
- Clean, modern color palette
- High contrast for readability
- Subtle hover states and interactions

### Responsive Breakpoints
- Desktop: Full layout with all features visible
- Tablet: Adjusted card grid, carousel remains functional
- Mobile: Stacked layout, touch-friendly carousel

## Implementation Phases

### Phase 1: Core Structure (Current)
- HTML structure for main page
- CSS for layout and styling
- Basic JavaScript for carousel functionality
- Navigation between main page and project detail pages

### Phase 2: Content Integration
- Dynamic project loading
- Media handling (images and videos)
- Project detail page templates

### Phase 3: Polish & Enhancement
- Animations and transitions
- Individual project page layout refinement
- Performance optimization

## Success Criteria
- Clean, professional appearance matching reference designs
- Smooth navigation between pages
- Responsive across all device sizes
- Fast loading times
- Accessible and semantic HTML
- No external dependencies (pure HTML/CSS/JS)

