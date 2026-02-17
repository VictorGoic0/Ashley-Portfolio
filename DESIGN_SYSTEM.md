# Ashley Portfolio - Design System Documentation

## Overview

This design system provides a comprehensive, Apple-inspired aesthetic with warm colors and modern typography for Ashley Zheng's portfolio website. Built with Sass for maintainability and compiled to optimized CSS.

---

## Color Palette

### Primary - Warm Coral/Terracotta
Perfect for CTAs, hover states, and brand accents.

```
Main:   #e07a5f  (Warm coral)
Light:  #f2b9a8  (Soft coral - hover states)
Dark:   #c25f47  (Rich terracotta - active states)
```

**Usage:** Navigation hover, button backgrounds, section title accents, card hover borders

### Secondary - Sage Green
Complementary accent for visual variety.

```
Main:   #81b29a  (Sage green)
Light:  #b8d4c6  (Mint - subtle highlights)
Dark:   #5a8270  (Forest - depth)
```

**Usage:** Secondary CTAs, alternate section accents, subtle highlights

### Neutrals - Warm Grays
Hierarchy and surfaces with warmth.

```
900:  #2c2c2c  (Headings, primary text)
700:  #5a5a5a  (Body text, secondary text)
500:  #8a8a8a  (Muted text, captions)
300:  #d4d4d4  (Borders, dividers)
100:  #f5f5f3  (Light backgrounds)
50:   #fafaf8  (Surfaces, cards)
```

---

## Typography

### Font Family
```css
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
```

### Type Scale (Major Third - 1.250)

| Size | Value | Usage |
|------|-------|-------|
| 3xl | 3.052rem (49px) | Hero titles |
| 2xl | 2.441rem (39px) | Page headings (H1) |
| xl | 1.953rem (31px) | Section titles (H2) |
| lg | 1.563rem (25px) | Subsections (H3) |
| md | 1.25rem (20px) | Small headings |
| base | 1.125rem (18px) | Large body text |
| sm | 1rem (16px) | Body text |
| xs | 0.8rem (12.8px) | Captions, labels |

### Font Weights
- **Normal:** 400 - Body text
- **Medium:** 500 - Navigation, emphasized text
- **Semibold:** 600 - Subheadings
- **Bold:** 700 - Headings, strong emphasis

### Line Heights
- **Tight:** 1.2 - Headings (maximize impact)
- **Base:** 1.5 - Body text (readability)
- **Relaxed:** 1.75 - Long-form content (comfort)

### Letter Spacing
- **Tight:** -0.02em - Large headings (visual tightness)
- **Normal:** 0 - Body text
- **Wide:** 0.05em - Labels, navigation (legibility)

---

## Spacing System

Based on **8px** increments for consistency.

| Token | Value | Common Uses |
|-------|-------|-------------|
| xs | 0.5rem (8px) | Tight spacing, small gaps |
| sm | 1rem (16px) | Button padding, small margins |
| md | 1.5rem (24px) | Card gaps, paragraph spacing |
| lg | 2rem (32px) | Section padding, large margins |
| xl | 3rem (48px) | Hero padding, feature spacing |
| 2xl | 4rem (64px) | Section dividers |
| 3xl | 6rem (96px) | Major section gaps |
| 4xl | 8rem (128px) | Page padding |

### Special Purpose
- **Card Gap:** 1.5rem (24px) - Grid spacing
- **Section Gap:** 6rem (96px) - Between major sections

---

## Layout System

### Bento Grid
Dynamic 12-column grid that respects natural aspect ratios.

#### Portrait Items (9:16)
```scss
.bento-item--9x16 {
  grid-column: span 4;
  grid-row: span 3;
}
```
**Usage:** Vertical videos, portrait print ads

#### Landscape Items (16:9)
```scss
.bento-item--16x9 {
  grid-column: span 6;
  grid-row: span 2;
}
```
**Usage:** Horizontal videos, line sheets (PDFs), landscape images

#### Responsive Behavior
- **Desktop (>1024px):** 12-column grid, 200px rows
- **Tablet (768-1024px):** 8-column grid, 180px rows
- **Mobile (<768px):** 4-column grid, 150px rows

### 2-Column Grid (Print Ads)
Simple equal-width layout for uniform content.
```scss
.project-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
}
```

---

## Components

### Navigation
- **Height:** 80px (desktop), 64px (mobile)
- **Style:** Sticky with backdrop blur
- **Hover:** Warm coral underline animation
- **Typography:** Uppercase, wide letter spacing

### Hero Section
- **Background:** Image with gradient overlay (0.3-0.5 opacity)
- **Content:** Center-aligned, max-width 800px
- **Padding:** 128px vertical (desktop), 96px (mobile)
- **CTAs:** Primary (coral button) + Secondary (outlined)

### Cards
- **Background:** White (#ffffff)
- **Border Radius:** 12px
- **Shadow:** 0 4px 8px rgba(0,0,0,0.1)
- **Hover:** Lift effect (-2px translateY), deeper shadow
- **Image:** Scale 1.05 on hover
- **Overlay:** Fade-in labels with project type

### Project Detail Pages
- **Max Width:** 1200px
- **Padding:** 96px vertical
- **Back Button:** Slide-left animation on hover
- **Media:** Full-width with shadow and rounded corners
- **Content:** Max-width 800px, relaxed line height

---

## Visual Effects

### Shadows
```scss
$shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
$shadow-base: 0 4px 8px rgba(0,0,0,0.1);
$shadow-md: 0 8px 16px rgba(0,0,0,0.12);
$shadow-lg: 0 16px 32px rgba(0,0,0,0.15);
```

### Border Radius
- **Small:** 4px - Labels, tags
- **Base:** 8px - Buttons
- **Medium:** 12px - Cards
- **Large:** 16px - Featured cards
- **XL:** 24px - Hero elements

### Transitions
- **Fast:** 150ms - Instant feedback (buttons)
- **Base:** 250ms - Standard interactions (hover)
- **Slow:** 350ms - Dramatic effects (image scale)

### Backdrop Blur
```scss
backdrop-filter: blur(10px);
background: rgba(255,255,255,0.8);
```
**Usage:** Sticky navigation, overlays

---

## Breakpoints

```scss
$breakpoint-mobile: 480px;    // Small phones
$breakpoint-tablet: 768px;     // Tablets
$breakpoint-desktop: 1024px;   // Laptops
$breakpoint-wide: 1200px;      // Large screens
```

### Responsive Strategy
1. **Mobile-first base styles**
2. **Tablet adjustments** (simplified grids)
3. **Desktop enhancements** (full features)
4. **Wide screens** (optional max-widths)

---

## Usage Guidelines

### Do's
✅ Use spacing tokens consistently  
✅ Follow type scale for hierarchy  
✅ Maintain aspect ratios in bento grid  
✅ Apply warm colors for interactive elements  
✅ Use backdrop blur for overlays  

### Don'ts
❌ Don't mix spacing values (use tokens)  
❌ Don't force aspect ratios (distortion)  
❌ Don't use pure black (#000000)  
❌ Don't skip hover/focus states  
❌ Don't break grid system  

---

## Development

### Sass Structure
```
styles/
├── _variables.scss     # Design tokens
├── _mixins.scss        # Utilities & breakpoints
├── _navigation.scss    # Header & nav
├── _hero.scss          # Hero section
├── _cards.scss         # Card components
├── _bento.scss         # Bento grid
├── _project-detail.scss # Project pages
└── styles.scss         # Main entry (imports all)
```

### Build Commands
```bash
# Compile once
npm run sass:build

# Watch for changes
npm run sass:watch
```

### CSS Output
- **File:** `styles.css`
- **Size:** ~12KB compiled
- **Format:** Includes CSS custom properties for runtime flexibility

---

## Accessibility

- **Focus States:** 2px coral outline with 2px offset
- **Color Contrast:** WCAG AA compliant (4.5:1 minimum)
- **Touch Targets:** Minimum 44×44px (mobile)
- **Semantic HTML:** Proper heading hierarchy
- **Keyboard Navigation:** All interactive elements accessible

---

## Asset Guidelines

### Thumbnails
- **Portrait (9:16):** 600×1067px
- **Landscape (16:9):** 1200×675px
- **Format:** PNG (transparency) or JPG (photos)
- **Quality:** 90% compression
- **Naming:** `{slug}-{aspect}-thumbnail.{ext}`

### Full Assets
- **Images:** Original resolution, optimized PNG/JPG
- **Videos:** MP4 (H.264), faststart flag
- **PDFs:** Vector when possible, max 5MB

---

## Browser Support

- **Chrome/Edge:** Latest 2 versions
- **Firefox:** Latest 2 versions
- **Safari:** Latest 2 versions (macOS & iOS)
- **Mobile:** iOS Safari 14+, Chrome Android 90+

---

## Future Enhancements

Potential additions for Phase 3:
- Dark mode variant
- Animation library
- Custom video player controls
- Advanced image optimization
- Lazy loading system
- SEO metadata templates

---

**Version:** 1.0  
**Last Updated:** February 2026  
**Maintained by:** Ashley Zheng Portfolio Project
