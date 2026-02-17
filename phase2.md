# Design System & Portfolio Redesign - Phase 2

## Current State

Looking at your portfolio (screenshot shows Print Ads section with 2-column grid), you have:

- **Section 1**: Print Ads (7 items, 2-column grid) - keeping mostly as-is
- **Section 2**: Line Sheets (3 items, 2-column grid) - to be combined
- **Section 3**: Video Edits (7 items, 2-column grid) - to be combined

## Design System Foundation

### 1. Color Palette (Warm & Inviting)

Based on your preference for warm colors, creating a 3-color system:

```css
/* Primary - Warm Coral/Terracotta */
--color-primary: #e07a5f; /* Main accent, CTAs, highlights */
--color-primary-light: #f2b9a8; /* Hover states, backgrounds */
--color-primary-dark: #c25f47; /* Active states */

/* Secondary - Warm Neutral */
--color-secondary: #81b29a; /* Complementary accent (sage green) */
--color-secondary-light: #b8d4c6;
--color-secondary-dark: #5a8270;

/* Neutral - Warm Grays */
--color-neutral-900: #2c2c2c; /* Headings, body text */
--color-neutral-700: #5a5a5a; /* Secondary text */
--color-neutral-500: #8a8a8a; /* Muted text */
--color-neutral-300: #d4d4d4; /* Borders */
--color-neutral-100: #f5f5f3; /* Backgrounds (current) */
--color-neutral-50: #fafaf8; /* Surfaces, cards */

/* Semantic */
--color-background: #fafaf8;
--color-surface: #ffffff;
--color-text-primary: #2c2c2c;
--color-text-secondary: #5a5a5a;
```

**Usage strategy:**

- Primary coral for nav hover, active states, section accents
- Secondary sage for subtle highlights, alternate CTAs
- Neutrals for text hierarchy and surfaces

### 2. Typography System

Building on your current Apple system font:

```css
/* Type Scale (1.250 - Major Third) */
--font-size-xs: 0.8rem; /* 12.8px - captions, labels */
--font-size-sm: 1rem; /* 16px - body text */
--font-size-base: 1.125rem; /* 18px - large body */
--font-size-md: 1.25rem; /* 20px - small headings */
--font-size-lg: 1.563rem; /* 25px - h3 */
--font-size-xl: 1.953rem; /* 31px - h2 */
--font-size-2xl: 2.441rem; /* 39px - h1 */
--font-size-3xl: 3.052rem; /* 49px - hero */

/* Font Weights */
--font-weight-normal: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
--font-weight-bold: 700;

/* Line Heights */
--line-height-tight: 1.2; /* Headings */
--line-height-base: 1.5; /* Body */
--line-height-relaxed: 1.75; /* Long-form content */

/* Letter Spacing */
--letter-spacing-tight: -0.02em; /* Large headings */
--letter-spacing-normal: 0;
--letter-spacing-wide: 0.05em; /* Labels, nav */
```

### 3. Spacing System (8px base)

Consistent spacing scale for margins, padding, gaps:

```css
--spacing-xs: 0.5rem; /* 8px */
--spacing-sm: 1rem; /* 16px */
--spacing-md: 1.5rem; /* 24px */
--spacing-lg: 2rem; /* 32px */
--spacing-xl: 3rem; /* 48px */
--spacing-2xl: 4rem; /* 64px */
--spacing-3xl: 6rem; /* 96px */
--spacing-4xl: 8rem; /* 128px */

/* Grid gaps */
--gap-card: 1.5rem; /* 24px - card spacing */
--gap-section: 6rem; /* 96px - between sections */
```

## Layout Changes

### Navigation Header

Add sticky header with smooth scroll-to-section links:

```html
<header class="main-header">
  <nav class="main-nav">
    <div class="nav-container">
      <a href="#" class="nav-logo">Ashley Zheng</a>
      <ul class="nav-links">
        <li><a href="#about">About</a></li>
        <li><a href="#print-ads">Print Ads</a></li>
        <li><a href="#projects">Projects</a></li>
      </ul>
    </div>
  </nav>
</header>
```

**Styling:**

- Sticky position, backdrop-blur effect
- Warm coral underline on hover
- Smooth scroll behavior with offset for sticky header
- Height: 80px desktop, 64px mobile

### Enhanced Hero Section

Expand title card with more content:

```html
<!-- Wrap all content sections in <main> for semantic HTML -->
<main>
  <section class="hero-section" id="about">
    <div class="hero-background"></div>
    <div class="hero-content">
      <h1 class="hero-title">Ashley Zheng</h1>
      <p class="hero-subtitle">Creative Designer & Art Director</p>
      <p class="hero-description">
        Crafting compelling visual narratives through print design, brand
        identity, and motion graphics. Specializing in consumer goods, lifestyle
        brands, and editorial design.
      </p>
      <div class="hero-cta">
        <a href="#projects" class="btn-primary">View Work</a>
        <a href="#about" class="btn-secondary">About Me</a>
      </div>
    </div>
  </section>
  
  <!-- Print Ads and Projects sections will be inside <main> -->
</main>
```

**Layout changes:**

- Overlay text on header image with gradient for readability
- Center-aligned content with max-width constraint
- Two-button CTA (primary coral, secondary outlined)
- More vertical padding (120px top/bottom)

### Section 1: Print Ads (Mostly Unchanged)

Keep 2-column grid but add:

- Section ID for nav anchor: `id="print-ads"`
- Warm accent color for section title
- Slight gap increase to 32px for breathing room

### Section 2+3: Combined Bento-Box Layout

Merge Line Sheets + Video Edits into single "Projects" section:

**Grid structure** (CSS Grid with named areas):

```css
.bento-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 24px;
  grid-auto-rows: 200px; /* Base row height */
}

/* Item sizing based on aspect ratio */
.bento-item-tall {
  /* Line sheets (portrait PDFs) */
  grid-column: span 4;
  grid-row: span 3; /* Taller cards */
}

.bento-item-wide {
  /* Videos (16:9) */
  grid-column: span 6;
  grid-row: span 2; /* Standard height */
}

.bento-item-feature {
  /* Hero spotlight item */
  grid-column: span 8;
  grid-row: span 3;
}
```

**Suggested layout pattern** (10 items):

```
Row 1-2: [Feature Video (8 cols × 3 rows)] [Line Sheet (4 cols × 3 rows)]
Row 3-4: [Video (6 cols × 2)] [Video (6 cols × 2)]
Row 5-6: [Line Sheet (4 cols × 3)] [Video (6 cols × 2)] [remaining items...]
```

**Visual enhancements:**

- Cards have warm coral border on hover
- Overlay label (e.g., "Line Sheet" or "Video Edit") on hover
- Staggered fade-in animations
- Subtle parallax scroll effect on images

## Sass Setup for CSS Variables

**Why Sass?** We'll use Sass (SCSS syntax) to organize our design system cleanly with variables, mixins, and partial files. Sass compiles to regular CSS, so no runtime overhead.

### Setup Process:
1. Install Sass: `npm install -g sass` (or use VS Code Live Sass Compiler extension)
2. Create `styles.scss` (replaces `styles.css`)
3. Create `_variables.scss` for design tokens
4. Compile: `sass styles.scss styles.css --watch`

**File Structure:**
```
styles/
├── _variables.scss    # Design tokens (colors, typography, spacing)
├── _mixins.scss       # Reusable mixins (responsive breakpoints, etc.)
├── _navigation.scss   # Nav header styles
├── _hero.scss         # Hero section styles
├── _cards.scss        # Card components
├── _bento.scss        # Bento grid layout
└── styles.scss        # Main file (imports all partials)
```

**Example `_variables.scss`:**
```scss
// Colors
$color-primary: #e07a5f;
$color-primary-light: #f2b9a8;
$color-primary-dark: #c25f47;

$color-secondary: #81b29a;
$color-secondary-light: #b8d4c6;
$color-secondary-dark: #5a8270;

// Typography
$font-size-xs: 0.8rem;
$font-size-sm: 1rem;
// ... etc
```

**CSS Custom Properties output:**
Sass will compile to CSS with `:root` variables, giving us both the organization benefits of Sass AND the runtime flexibility of CSS custom properties:

```css
:root {
  --color-primary: #e07a5f;
  --color-primary-light: #f2b9a8;
  /* ... */
}
```

## Implementation Files

### `styles.scss` (was `styles.css`)

**Changes:**

1. Convert to Sass, import partials at top
2. Add CSS custom properties from variables (`:root` block)
3. Add `.main-header` and `.main-nav` styles
4. Update `.hero-section` with enhanced layout
5. Update `.project-section` for Print Ads tweaks
6. Add `.bento-grid` and `.bento-item-*` classes
7. Update responsive breakpoints for bento grid collapse

### `index.html`

**Changes:**

1. Add semantic `<header class="main-header">` with nav after `<body>`
2. Wrap all content in `<main>` tag
3. Replace `.owner-info` section with enhanced `.hero-section` (with id="about")
4. Add `id="print-ads"` to Print Ads section
5. Merge Line Sheets + Video Edits sections into single bento-grid section:
   - Section title: "Projects" or "Featured Work"
   - Single `.bento-grid` container with 10 items
   - Each card gets bento class based on aspect ratio: `.bento-item-tall` or `.bento-item-wide`
   - Add `id="projects"` for nav anchor

### Sass Partials (new files in `styles/` folder)

- `_variables.scss` - All design tokens
- `_mixins.scss` - Breakpoint mixins, utility mixins
- `_navigation.scss` - Header and nav styles
- `_hero.scss` - Hero section styles  
- `_cards.scss` - Card component styles
- `_bento.scss` - Bento grid system

## Responsive Strategy

**Desktop (>1200px):** Full 12-column bento grid
**Tablet (768-1200px):** 8-column grid, some items stack
**Mobile (<768px):** 4-column grid, all items span full width or half-width, vertical stacking

## Documentation

Create `DESIGN_SYSTEM.md` with:

- Color palette swatches and usage guidelines
- Typography scale with examples
- Spacing system reference
- Component patterns (buttons, cards, nav)
- Code snippets for common patterns

## Testing Checklist

- [ ] Nav links scroll smoothly to sections with correct offset
- [ ] Hero CTA buttons have proper hover states
- [ ] Bento grid items maintain aspect ratios at all breakpoints
- [ ] Warm color accents appear consistently (nav hover, section titles, button hovers)
- [ ] Typography hierarchy is clear across all sections
- [ ] Mobile navigation collapses appropriately
- [ ] All 17 projects are visible and clickable in new layout

## Implementation Tasks

### Phase 2A: Setup & Foundation
- [ ] **Set up Sass compilation** (npm/VS Code extension, create `styles/` folder structure)
- [ ] **Create `_variables.scss`** with all design tokens (colors, typography, spacing)
- [ ] **Create `_mixins.scss`** with responsive breakpoint mixins
- [ ] **Regenerate all thumbnails with proper aspect ratios**:
  - Go through each asset (images, PDFs, videos)
  - Determine natural aspect ratio
  - Generate new thumbnails that respect aspect ratio (no cropping/distortion)
  - Save to new `assets/thumbnails-v2/` folder
  - Document aspect ratio for each asset (for bento grid sizing)
  - Update thumbnail script if needed

### Phase 2B: Layout & Structure
- [ ] **Add semantic HTML structure**: Wrap content in `<header>` and `<main>` tags
- [ ] **Implement sticky navigation header** with section links and smooth scroll
- [ ] **Enhance hero section** with expanded content, subtitle, description, and dual CTAs
- [ ] **Add section ID** and minor styling updates to Print Ads section
- [ ] **Create bento-box grid system** with adaptive sizing classes (`.bento-item-tall`, `.bento-item-wide`, etc.)
- [ ] **Merge Line Sheets + Video Edits** into single Projects section with bento layout
- [ ] **Implement responsive breakpoints** for bento grid collapse (12-col → 8-col → 4-col)

### Phase 2C: Polish & Documentation
- [ ] **Apply design system** throughout (colors, typography, spacing)
- [ ] **Test responsive behavior** at all breakpoints
- [ ] **Create DESIGN_SYSTEM.md** with design tokens and usage guidelines
- [ ] **Update memory bank** with new design system and structure

---

## Phase 3 Preview (Future Work)

After completing Phase 2, we'll tackle:

### Phase 3A: Project Detail Pages
- Redesign individual project pages (`projects/*.html`)
- Create consistent template with better image/video/PDF display
- Add project metadata (date, client, role, tools used)
- Improve typography and layout on detail pages
- Add "Next Project" navigation

### Phase 3B: SEO & Optimization
- Add SEO best practices to all pages:
  - Meta descriptions, Open Graph tags, Twitter cards
  - Semantic HTML improvements
  - Alt text for all images
  - Structured data (JSON-LD for portfolio/person)
- Main page optimization:
  - Page title, meta description
  - H1 hierarchy
  - Internal linking structure
- Performance optimization:
  - Lazy loading for images below fold
  - Video thumbnail optimization
  - Minimize render-blocking resources

### Phase 3C: External Links & CTAs
- Link print ads and projects to live websites where relevant
- Add client website links (if permitted)
- Add case study links (if available)
- Contact/hire me CTA in hero and footer
- Social media links (LinkedIn, Behance, etc.)
