# HOME PAGE VISUAL & RESPONSIVE AUDIT

## 1. Executive Summary

- Overall status: NEEDS WORK
- Critical problems: 2
- High priority: 5
- Medium priority: 8
- Low priority: 4



## 2. Home.jsx Architecture

Home
 ├── MotionWarningOverlay (condition: reducedMotionDetected && !motionWarningDismissed)
 ├── Intro
 │    ├── DisplacementSphere (lazy-loaded)
 │    ├── DecoderText (animated name)
 │    ├── Heading (role + disciplines)
 │    ├── ScrollIndicator (desktop)
 │    └── MobileScrollIndicator (mobile)
 ├── ProjectSummary (TRIAD)
 │    ├── Index (01)
 │    ├── Title
 │    ├── Description
 │    ├── Button
 │    ├── Preview (Katakana SVG + Model + Loader)
 │    └── Details
 ├── ProjectSummary (TARMAC) [alternate layout]
 │    ├── Index (02)
 │    ├── Title
 │    ├── Description
 │    ├── Button
 │    ├── Preview (duple Katakana + dual phone models + Loader)
 │    └── Details
 ├── ProjectSummary (CityGates)
 │    ├── Index (03)
 │    ├── Title
 │    ├── Description
 │    ├── Button
 │    ├── Preview (Katakana + Model + Loader)
 │    └── Details
 ├── Profile
 │    ├── ProfileText (About me)
 │    ├── Button (Contact)
 │    ├── Tag
 │    ├── Image
 │    └── SVG decoration
 └── Footer



## 3. Critical Problems

### Problem 1: Motion Warning Overlay Accessibility Issue
- File: app/routes/home/home.jsx
- Component: Motion warning overlay
- Root cause: The motion warning overlay traps focus but doesn't properly restore focus when dismissed
- Evidence: In the motion warning overlay, there's no focus trapping mechanism implemented. When the overlay is open, users can tab out to underlying elements.
- Recommended fix: Implement proper focus trapping when the motion warning overlay is open, and restore focus to the trigger element when closed.

### Problem 2: Potential WebGL Context Loss on Resize
- File: app/routes/home/displacement-sphere.jsx
- Component: DisplacementSphere
- Root cause: The Three.js renderer doesn't properly handle context loss scenarios
- Evidence: The component sets ailIfMajorPerformanceCaveat: true on the WebGLRenderer but doesn't handle the webglcontextlost and webglcontextrestored events.
- Recommended fix: Add event listeners for webglcontextlost and webglcontextrestored to properly handle GPU resets.



## 4. High Priority Problems

### Problem 1: Inconsistent Project Section Layouts
- File: app/routes/home/project-summary.module.css
- Component: ProjectSummary
- Root cause: The TARMAC project uses alternate layout while others don't, creating inconsistent visual rhythm
- Evidence: 
  - TRIAD and CityGates use standard layout (text on left, model on right)
  - TARMAC uses alternate layout (model on left, text on right) via data-alternate='true'
  - This breaks the expected pattern users might develop
- Recommended fix: Either make all projects follow the same layout pattern, or ensure the alternation is consistent and intentional (e.g., alternate every other project).

### Problem 2: Missing Reduced Motion Respect in Animations
- File: app/routes/home/intro.jsx
- Component: Intro
- Root cause: Some animations don't properly respect reduced motion preferences
- Evidence:
  - The DisplacementSphere component respects reduced motion (via useReducedMotion hook)
  - However, the text animations in Intro (DecoderText, Heading transitions) may still run when reduced motion is preferred
  - The 5000ms interval for rotating disciplines continues regardless of motion preference
- Recommended fix: Pause or slow down non-essential animations when prefers-reduced-motion: reduce is active.

### Problem 3: Potential Overflow Issues on Mobile
- File: app/routes/home/profile.module.css
- Component: Profile section
- Root cause: Fixed positioning of SVG element may cause overflow on small screens
- Evidence:
  - The SVG in profile section uses position: absolute; right: 0; bottom: 0; transform: translate3d(50%, -20%, 0);
  - On very small screens, this could cause the SVG to overflow the viewport
  - The profile section already has overflow-x: hidden; on mobile, but this may clip content
- Recommended fix: Adjust the SVG positioning or sizing for extra-small screens to prevent overflow.

### Problem 4: Inconsistent Navigation Icon Sizing
- File: app/layouts/navbar/navbar.module.css
- Component: Navbar icons
- Root cause: Inconsistent sizing approach between desktop and mobile nav icons
- Evidence:
  - Desktop nav icons use fixed sizing (width: var(--space2XL); height: var(--space2XL);)
  - Mobile nav links use clamped values (ont-size: clamp(1rem, 2.8vw, 1.375rem);)
  - This creates inconsistency in the visual language
- Recommended fix: Use consistent responsive sizing approaches (preferably clamp-based) across all nav elements.

### Problem 5: Missing Skip Navigation Link Visibility
- File: app/layouts/navbar/navbar.module.css
- Component: Skip navigation link
- Root cause: The skip link (_skip_j3vhn_12) may not be sufficiently visible when focused
- Evidence:
  - The skip link uses color: var(--background); which makes it invisible by design
  - When focused, it gets padding and a box-shadow, but the color remains the background color
  - This relies solely on the box-shadow for visibility, which may not be sufficient
- Recommended fix: Ensure the skip link has sufficient color contrast when focused, not just rely on outline/shadow.


## 5. Medium Priority Problems

### Problem 1: Project Image Text Overlap Risk
- File: app/routes/home/project-summary.module.css
- Component: ProjectSummary SVG elements
- Root cause: SVG positioning may cause overlap with text content on certain viewports
- Evidence:
  - Laptop SVG: `position: absolute; width: 100%; right: -36%; bottom: 24%; transform: translateY(50%);`
  - Phone SVG: `position: absolute; bottom: 23%; transform: translateY(50%); width: 100%; transition-delay: 800ms;`
  - These positions could cause the SVG to extend into the text area on smaller screens
- Recommended fix: Add viewport constraints or adjust positioning to prevent overlap with text content.

### Problem 2: Inconsistent Animation Timing
- File: app/routes/home/intro.jsx
- Component: Intro text animations
- Root cause: Different text elements use different animation delays without clear pattern
- Evidence:
  - Name uses `delay={500}` in DecoderText
  - Title uses staggered animations with various delays (base.durationXS, base.durationL)
  - This creates an uneven rhythm that may feel unintentional
- Recommended fix: Review and potentially standardize animation timing for better visual harmony.

### Problem 3: Project Button Loading State Missing
- File: app/routes/home/project-summary.jsx
- Component: ProjectSummary button
- Root cause: No loading state indicated for external website links
- Evidence:
  - Buttons use `<Button iconHoverShift href={buttonLink} iconEnd="arrow-right">`
  - No visual feedback when clicking (though this is standard for external links)
  - However, for perceived performance, some indication could be beneficial
- Recommended fix: Consider adding a subtle press effect or hover transition to improve feedback.

### Problem 4: Model Loader Visibility Timing
- File: app/routes/home/project-summary.module.css
- Component: Model loader
- Root cause: Loader visibility transition may be too abrupt
- Evidence:
  - Loader uses `opacity: 0; transition: opacity 400ms ease 1000ms;`
  - The 1000ms delay before fading in may feel late
  - When model loads, the loader fades out but model fades in immediately
- Recommended fix: Adjust transition timing for smoother loader-to-model transition.

### Problem 5: Inconsistent Section Padding
- File: Various section modules
- Component: Section spacing
- Root cause: Inconsistent padding values across different sections
- Evidence:
  - Intro section: `padding-inline: clamp(var(--spaceOuter), 4vw, var(--space3XL));`
  - Project sections: `margin: 120px 0;` (desktop) → `margin: var(--space3XL) 0;` (tablet) → `padding-bottom: var(--space4XL); margin-bottom: 0;` (mobile)
  - Profile section: `margin-top: 60px; margin-bottom: 40px; padding-top: 60px; padding-bottom: 40px;`
  - Footer: `padding: var(--space3XL) var(--spaceL);`
- Recommended fix: Establish a consistent spacing system for vertical rhythm.

### Problem 6: Missing Focus Styles on Custom Buttons
- File: app/components/button/button.module.css
- Component: Custom buttons
- Root cause: Custom button implementation may lack visible focus indicators
- Evidence:
  - Buttons use custom styling that overrides native button appearance
  - Need to verify if `:focus-visible` styles are properly implemented
  - From CSS: `&:focus-visible { opacity: 1; }` exists for some elements but need to check buttons
- Recommended fix: Ensure all interactive elements have clear visible focus indicators.

### Problem 7: Potential Text Clipping in Project Titles
- File: app/routes/home/project-summary.module.css
- Component: Project title
- Root cause: Long project titles may overflow their containers
- Evidence:
  - Title uses `margin-bottom: var(--spaceL);` but no overflow handling
  - In desktop layout, title is in `.details` column with defined width
  - Very long titles could break layout or overflow
- Recommended fix: Add overflow handling (ellipsis or wrapping) for project titles.

### Problem 8: Inconsistent Z-Index Usage
- File: Various CSS files
- Component: Layering contexts
- Root cause: Magic numbers for z-index instead of consistent scale
- Evidence:
  - Uses `--zIndex0: 0;` through `--zIndex5: 64;` 
  - Some components use specific z-index values like `z-index: var(--zIndex3);`
  - Need to verify if this scale is consistently applied and sufficient
- Recommended fix: Document and enforce consistent z-index usage guidelines.
## 6. Low Priority Problems

### Problem 1: Minor Typography Inconsistencies
- File: app/routes/home/intro.module.css
- Component: Intro text styling
- Root cause: Small differences in line height and letter spacing across breakpoints
- Evidence:
  - Name: line-height changes from 1 (desktop) to 1.1 (responsive phase 2)
  - Title: line-height changes from 1.08 to 0.98
  - These are minor but could be standardized
- Recommended fix: Review and potentially consolidate typography settings.

### Problem 2: Svg Optimization Opportunity
- File: Multiple SVG references
- Component: Katakana and other SVG assets
- Root cause: SVG files may not be optimized for web use
- Evidence:
  - References to `katakana.svg` used multiple times
  - No visible evidence of SVG optimization (like SVGO)
- Recommended fix: Run SVG optimization on assets to reduce file size.

### Problem 3: Console Warning Potential
- File: app/routes/home/displacement-sphere.jsx
- Component: DisplacementSphere
- Root cause: Potential console warnings from three.js usage
- Evidence:
  - Uses `SphereGeometry(32, 128, 128)` - high segment count may be unnecessary
  - Could potentially cause performance warnings in console
- Recommended fix: Review geometry parameters for optimal balance of quality and performance.

### Problem 4: Minor Color Contrast Issues
- File: app/routes/home/home.module.css
- Component: Motion warning text
- Root cause: Text contrast may be slightly low in certain themes
- Evidence:
  - Motion warning text: `opacity: 0.86;` on dark background
  - While likely acceptable, could be improved for better readability
- Recommended fix: Slightly increase text opacity or adjust background for better contrast.

