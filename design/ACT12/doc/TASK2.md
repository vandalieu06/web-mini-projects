# PROMPT — Advanced Scroll-Driven Landing Page (Enhanced Product Experience)

## 🎯 Objective

You are an expert frontend engineer and UI/UX designer.

Your task is to build a **high-end, product-focused landing page** that goes beyond a basic implementation. The page must feel like a **premium product showcase**, similar to Apple, Tesla, or high-end SaaS products.

The scroll-driven animation remains the core, but the rest of the page must **tell a complete product story**.

---

## 📦 Context

* Frames already exist in: `/frames/frame_001.webp` … `/frames/frame_XXX.webp`
* Total frames: between 60 and 120
* The animation represents the product visually (rotation, assembly, or interaction)

---

## 🧱 Required Structure (Expanded)

### 1. Hero Section (Immersive)

* Large product name
* Strong tagline (clear value proposition)
* Short supporting description
* Primary CTA (Buy / Explore / Get Started)
* Optional secondary CTA
* Background can include subtle gradient or visual hint of product

---

### 2. Product Story Section (Narrative)

* 2–3 well-written paragraphs
* Explain:
  * What the product is
  * What problem it solves
  * Why it is different
* Include:
  * Highlighted keywords
  * Strong typographic hierarchy

---

### 3. Scroll-Driven Animation Section (Core Experience)

* `<canvas>` centered and sticky
* Section height: **minimum 300vh**
* Smooth frame-by-frame animation controlled by scroll
* Optional overlay text that changes during scroll (key moments)

---

### 4. Key Features Section (Visual + Icon-Based)

* Grid of **at least 4–6 features**
* Each feature card must include:
  * SVG icon (from open libraries like Heroicons, Tabler Icons, Lucide, etc.)
  * Title
  * Short description

⚠️ IMPORTANT:
* Use **inline SVGs** (preferred) — NOT icon fonts
* Icons must be consistent in style (stroke or filled)

---

### 5. Detailed Specifications Section

* More technical explanation of the product
* Use a **two-column layout**:
  * Left: text/specs
  * Right: image or illustration (can be placeholder)
* Include:
  * Dimensions / performance / materials (even if fictional)
  * Bullet points

---

### 6. Product Showcase / Gallery

* Horizontal scroll or grid
* Show:
  * Different angles
  * Use cases
* Can reuse frames or static images

---

### 7. Call To Action Section (Conversion Block)

* Strong closing message
* Reinforce value proposition
* Prominent CTA button

---

### 8. Footer

* Minimal but clean:
  * Brand name
  * Links (optional)
  * Credits

---

## ⚙️ Technical Requirements

### Frame Preloading

* Preload all frames efficiently
* Use `Image()` objects or async loading
* Show **loading indicator** until ready

---

### Scroll Logic

* progress = (scrollY - sectionTop) / sectionHeight
* Clamp between 0 and 1
* Map to frame index:
* frameIndex = Math.floor(progress * totalFrames)

---

### Rendering

* Use `<canvas>` 2D context
* Maintain aspect ratio
* Scale correctly for all screen sizes
* Avoid distortion

---

### Responsiveness

* Fully responsive layout
* Canvas adapts to viewport
* Handle `resize` events

---

### Performance

* Use `requestAnimationFrame`
* Avoid redundant draws
* Optimize memory usage

---

### Advanced (Highly Recommended)

* Use `IntersectionObserver` to activate animation only when visible
* Implement **progress smoothing** (lerp) for fluid motion
* Consider partial lazy loading for frames

---

## 🎨 Design Requirements

* Modern, minimal, premium aesthetic
* Strong spacing and layout rhythm
* Consistent typography scale
* Use subtle shadows, gradients, or glass effects (optional)
* Avoid clutter
* Ensure **visual storytelling flow**

---

## 🧩 Implementation Constraints

* Vanilla JavaScript ONLY
* Semantic HTML5
* Modern CSS (Grid + Flexbox)
* Clean file structure:
  * /index.html
  * /styles.css
  * /main.js

---

## 📤 Output Format

Return ONLY:

1. Full `index.html`
2. Full `styles.css`
3. Full `main.js`

---

## ❗ Important

* DO NOT include explanations
* DO NOT include comments outside code
* ONLY output code
* Code must be ready to run

---

## ✅ Success Criteria

* Smooth, high-quality scroll animation
* Visually rich product page (not just functional)
* SVG-based feature system
* Strong product storytelling
* Fully responsive and performant
* Clean, scalable codebase