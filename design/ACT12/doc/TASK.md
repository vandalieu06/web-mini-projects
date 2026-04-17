# PROMPT — Scroll-Driven Landing Page Implementation

## 🎯 Objective

You are an expert frontend engineer. Your task is to build a complete, production-ready landing page that implements a scroll-driven animation using pre-generated WebP frames rendered on a `<canvas>`.

The implementation must be clean, performant, responsive, and structured for maintainability.

---

## 📦 Context

* A sequence of frames already exists in: `/frames/frame_001.webp` … `/frames/frame_XXX.webp`
* Total frames: between 60 and 120
* Goal: replicate a smooth scroll-driven animation similar to Apple product pages

---

## 🧱 Required Structure

Build a full landing page containing:

### 1. Hero Section

* Product/brand name
* Short slogan
* Clear CTA (button)
* Visually prominent and centered

### 2. Product Presentation Section

* 2–3 paragraphs describing the product
* Focus on key features and value proposition

### 3. Scroll-Driven Animation Section

* A `<canvas>` element centered on screen
* Section height: **minimum 300vh**
* Canvas must stay **sticky/fixed** during scroll
* Frames must be drawn dynamically based on scroll

### 4. Features / Specifications Section

* At least 3 key features
* Presented as cards, grid, or icons

### 5. Footer

* Contact info or credits

---

## ⚙️ Technical Requirements

### Frame Preloading

* Preload ALL frames before animation starts
* Use an efficient strategy (e.g., `Image()` objects or promises)
* Prevent rendering until enough frames are ready

### Scroll Logic

* Compute scroll progress relative to animation section:

  ```
  progress = (scrollY - sectionTop) / sectionHeight
  ```
* Clamp progress between 0 and 1
* Map progress → frame index:

  ```
  frameIndex = Math.floor(progress * totalFrames)
  ```
* Render corresponding frame on canvas

### Rendering

* Use `<canvas>` 2D context
* Draw images with correct scaling
* Maintain aspect ratio
* Avoid distortion

### Responsiveness

* Canvas must:

  * Adapt to viewport width
  * Maintain original frame ratio
* Handle `resize` events properly

### Performance

* Use `requestAnimationFrame` for updates
* Avoid unnecessary re-renders
* Optimize memory usage

---

## 🎨 Design Requirements

* Background color must match frame background
* Consistent typography and spacing
* Clean, modern, professional look
* Smooth visual hierarchy
* No visual glitches during scroll

---

## 🧩 Implementation Constraints

* Use **vanilla JavaScript** (no frameworks unless justified)
* Use semantic HTML5
* Use modern CSS (Flexbox/Grid)
* Organize code clearly:

  * `index.html`
  * `styles.css`
  * `main.js`

---

## 📤 Output Format

Return:

1. Full HTML file
2. Full CSS file
3. Full JavaScript file

All code must be:

* Clean
* Commented where necessary
* Ready to run without modification

---

## 🚀 Extra (Optional but Valuable)

If possible, include:

* Lazy loading strategy improvement
* IntersectionObserver optimization
* Frame interpolation or smoothing strategy
* Loading indicator before animation starts

---

## ❗ Important

* Do NOT provide explanations
* Do NOT summarize
* ONLY output the final code files
* Ensure everything works cohesively

---

## ✅ Success Criteria

* Smooth scroll animation (no jumps)
* Frames synced perfectly with scroll
* Fully responsive canvas
* Professional UI
* Clean, maintainable code

---
