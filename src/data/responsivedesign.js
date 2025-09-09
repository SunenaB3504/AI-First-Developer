const responsiveDesignContent = {
  id: "responsive-design",
  tier: 2,
  name: "Responsive Design",
  description: "Responsive Design is the practice of creating websites that adapt to different screen sizes and devices. Learn modern CSS techniques including media queries, flexible layouts, and mobile-first design principles to build websites that work beautifully on any device.",
  difficulty: "intermediate",
  estimatedHours: 18,
  prerequisites: ["html5", "css3"],
  learningObjectives: [
    "Understand responsive design principles and mobile-first approach",
    "Master CSS media queries for different screen sizes",
    "Work with flexible layouts using Flexbox and CSS Grid",
    "Implement responsive typography and spacing",
    "Create responsive images and media",
    "Design mobile navigation patterns",
    "Use CSS frameworks for rapid responsive development",
    "Test and debug responsive designs across devices",
    "Optimize performance for mobile devices",
    "Implement accessibility in responsive designs",
    "Use modern CSS features for responsive layouts",
    "Create responsive data tables and forms",
    "Handle touch interactions and gestures",
    "Implement progressive enhancement strategies",
    "Use CSS custom properties for responsive theming"
  ],
  sections: [
    {
      id: "responsive-introduction",
      title: "Introduction to Responsive Design",
      content: "Responsive design is the foundation of modern web development. With the proliferation of devices - from large desktop monitors to small mobile phones - websites must adapt to provide optimal user experiences across all screen sizes.\n\n**Why Responsive Design Matters**:\n- **Mobile Traffic**: Over 60% of web traffic comes from mobile devices\n- **SEO Benefits**: Google favors mobile-friendly websites\n- **User Experience**: Consistent experience across all devices\n- **Cost Efficiency**: One codebase for all devices\n- **Future-Proof**: Adapts to new devices automatically\n\n**Core Principles**:\n- **Fluid Grids**: Layouts that adapt to screen size\n- **Flexible Images**: Images that scale appropriately\n- **Media Queries**: CSS rules that apply based on device characteristics\n- **Mobile-First**: Design for mobile first, then enhance for larger screens\n\n**Key Concepts**:\n- **Breakpoints**: Points where layout changes occur\n- **Viewport**: The visible area of a web page\n- **Responsive Units**: em, rem, vh, vw, vmin, vmax\n- **Progressive Enhancement**: Start with basic functionality, add features for capable devices\n\n**Common Breakpoints**:\n- **Mobile**: < 768px\n- **Tablet**: 768px - 1024px\n- **Desktop**: > 1024px\n- **Large Desktop**: > 1200px\n\nRemember: Responsive design is not just about making things smaller on mobile - it's about creating the best possible experience for each device type.",
      keyTopics: [
        "What is responsive design?",
        "Mobile-first vs desktop-first approach",
        "Viewport meta tag and its importance",
        "Breakpoints and media queries",
        "Responsive units (em, rem, vh, vw)"
      ],
      practicalExercises: [
        "Analyze popular websites for responsive design patterns",
        "Set up proper viewport meta tags",
        "Create basic responsive layouts with media queries",
        "Test websites on different device sizes",
        "Identify common responsive design anti-patterns"
      ],
      codeExamples: [
        {
          title: "Basic Responsive HTML Structure",
          code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Responsive Website</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <header class="header">
    <div class="container">
      <h1 class="logo">My Responsive Site</h1>
      <nav class="nav">
        <button class="nav-toggle" aria-label="Toggle navigation">
          <span class="hamburger"></span>
        </button>
        <ul class="nav-list">
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>
    </div>
  </header>

  <main class="main">
    <section class="hero">
      <div class="container">
        <h2>Welcome to Our Website</h2>
        <p>This website works great on all devices!</p>
        <button class="cta-button">Get Started</button>
      </div>
    </section>

    <section class="features">
      <div class="container">
        <div class="feature-grid">
          <div class="feature-card">
            <h3>Feature 1</h3>
            <p>Description of feature 1</p>
          </div>
          <div class="feature-card">
            <h3>Feature 2</h3>
            <p>Description of feature 2</p>
          </div>
          <div class="feature-card">
            <h3>Feature 3</h3>
            <p>Description of feature 3</p>
          </div>
        </div>
      </div>
    </section>
  </main>

  <footer class="footer">
    <div class="container">
      <p>&copy; 2024 My Responsive Site</p>
    </div>
  </footer>
</body>
</html>`
        },
        {
          title: "Basic Responsive CSS with Media Queries",
          code: `/* Reset and base styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Arial', sans-serif;
  line-height: 1.6;
  color: #333;
}

/* Container for max-width control */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Header styles */
.header {
  background: #2c3e50;
  color: white;
  padding: 1rem 0;
}

.logo {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

/* Navigation */
.nav {
  position: relative;
}

.nav-list {
  list-style: none;
  display: flex;
  gap: 2rem;
}

.nav-list a {
  color: white;
  text-decoration: none;
  padding: 0.5rem;
  transition: background 0.3s ease;
}

.nav-list a:hover {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
}

/* Mobile navigation toggle */
.nav-toggle {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
}

.hamburger {
  display: block;
  width: 25px;
  height: 3px;
  background: white;
  position: relative;
}

.hamburger::before,
.hamburger::after {
  content: '';
  display: block;
  width: 25px;
  height: 3px;
  background: white;
  position: absolute;
}

.hamburger::before {
  top: -8px;
}

.hamburger::after {
  top: 8px;
}

/* Hero section */
.hero {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 4rem 0;
  text-align: center;
}

.hero h2 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.hero p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.cta-button {
  background: #ff6b6b;
  color: white;
  border: none;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.cta-button:hover {
  background: #ff5252;
}

/* Features section */
.features {
  padding: 4rem 0;
  background: #f8f9fa;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.feature-card {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.feature-card h3 {
  margin-bottom: 1rem;
  color: #2c3e50;
}

/* Footer */
.footer {
  background: #2c3e50;
  color: white;
  text-align: center;
  padding: 2rem 0;
}

/* ========================================
   MEDIA QUERIES
   ======================================== */

/* Tablet styles */
@media (max-width: 768px) {
  .container {
    padding: 0 15px;
  }

  .hero h2 {
    font-size: 2rem;
  }

  .hero p {
    font-size: 1rem;
  }

  .feature-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .feature-card {
    padding: 1.5rem;
  }
}

/* Mobile styles */
@media (max-width: 480px) {
  .header {
    padding: 0.5rem 0;
  }

  .logo {
    font-size: 1.2rem;
  }

  /* Show mobile navigation */
  .nav-toggle {
    display: block;
  }

  .nav-list {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: #2c3e50;
    flex-direction: column;
    gap: 0;
    transform: translateY(-100%);
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
  }

  .nav-list.active {
    transform: translateY(0);
    opacity: 1;
    visibility: visible;
  }

  .nav-list a {
    padding: 1rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .hero {
    padding: 3rem 0;
  }

  .hero h2 {
    font-size: 1.8rem;
  }

  .hero p {
    font-size: 0.9rem;
  }

  .cta-button {
    padding: 0.8rem 1.5rem;
    font-size: 1rem;
  }

  .features {
    padding: 3rem 0;
  }

  .feature-card {
    padding: 1.2rem;
  }

  .footer {
    padding: 1.5rem 0;
  }
}

/* Print styles */
@media print {
  .nav,
  .nav-toggle,
  .cta-button {
    display: none;
  }

  .hero {
    background: white !important;
    color: black !important;
  }

  .feature-card {
    box-shadow: none;
    border: 1px solid #ccc;
  }
}`
        }
      ]
    },
    {
      id: "flexbox-grid",
      title: "Flexbox and CSS Grid for Responsive Layouts",
      content: "Modern CSS layout techniques like Flexbox and CSS Grid have revolutionized responsive design. These powerful tools make it easy to create flexible, responsive layouts that adapt to any screen size.\n\n**Flexbox Fundamentals**:\n- **One-dimensional layout**: Perfect for rows or columns\n- **Content-based sizing**: Items size themselves based on content\n- **Flexible spacing**: Easy distribution of space between items\n- **Order control**: Change visual order without changing HTML\n- **Alignment control**: Precise control over item alignment\n\n**CSS Grid Essentials**:\n- **Two-dimensional layout**: Control both rows and columns\n- **Grid areas**: Name sections of your layout\n- **Implicit vs explicit grids**: Automatic vs defined grid tracks\n- **Grid gaps**: Spacing between grid items\n- **Responsive grids**: Change layouts at different breakpoints\n\n**When to Use Flexbox vs Grid**:\n- **Flexbox**: Component-level layouts, navigation, card layouts\n- **CSS Grid**: Page-level layouts, complex grid systems, magazine layouts\n- **Both**: Many layouts benefit from using both together\n\n**Responsive Design Patterns**:\n- **Holy Grail Layout**: Header, main content, sidebar, footer\n- **Card Grid**: Responsive grid of cards that stack on mobile\n- **Navigation Patterns**: Hamburger menu, priority navigation\n- **Content Reflow**: Content that reorganizes based on screen size\n\n**Best Practices**:\n- **Mobile-first**: Design for small screens first\n- **Progressive enhancement**: Add complexity for larger screens\n- **Consistent spacing**: Use a spacing scale\n- **Semantic HTML**: Use appropriate HTML elements\n- **Performance**: Avoid layout thrashing\n\nRemember: Flexbox and Grid are not mutually exclusive - they work great together to create sophisticated responsive layouts.",
      keyTopics: [
        "Flexbox properties and usage patterns",
        "CSS Grid fundamentals and syntax",
        "Responsive layout patterns",
        "Mobile-first design approach",
        "Combining Flexbox and Grid"
      ],
      practicalExercises: [
        "Create responsive navigation with Flexbox",
        "Build complex layouts with CSS Grid",
        "Implement card-based layouts that adapt to screen size",
        "Design responsive forms with proper field grouping",
        "Create responsive image galleries"
      ],
      codeExamples: [
        {
          title: "Responsive Navigation with Flexbox",
          code: `/* Modern responsive navigation using Flexbox */
.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.nav-brand {
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  text-decoration: none;
}

.nav-menu {
  display: flex;
  list-style: none;
  gap: 2rem;
  margin: 0;
  padding: 0;
}

.nav-menu li a {
  color: #666;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.nav-menu li a:hover,
.nav-menu li a.active {
  color: #007bff;
  background: rgba(0, 123, 255, 0.1);
}

/* Mobile menu button */
.nav-toggle {
  display: none;
  flex-direction: column;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
}

.nav-toggle span {
  width: 25px;
  height: 3px;
  background: #333;
  margin: 3px 0;
  transition: 0.3s;
  border-radius: 2px;
}

/* Mobile styles */
@media (max-width: 768px) {
  .nav-container {
    padding: 1rem;
  }

  .nav-menu {
    position: fixed;
    top: 100%;
    left: 0;
    right: 0;
    background: #fff;
    flex-direction: column;
    gap: 0;
    padding: 1rem 0;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transform: translateY(-100%);
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
  }

  .nav-menu.active {
    transform: translateY(0);
    opacity: 1;
    visibility: visible;
  }

  .nav-menu li {
    width: 100%;
    text-align: center;
  }

  .nav-menu li a {
    display: block;
    padding: 1rem;
    border-bottom: 1px solid #eee;
  }

  .nav-toggle {
    display: flex;
  }

  /* Hamburger animation */
  .nav-toggle.active span:nth-child(1) {
    transform: rotate(-45deg) translate(-5px, 6px);
  }

  .nav-toggle.active span:nth-child(2) {
    opacity: 0;
  }

  .nav-toggle.active span:nth-child(3) {
    transform: rotate(45deg) translate(-5px, -6px);
  }
}

/* Tablet adjustments */
@media (min-width: 769px) and (max-width: 1024px) {
  .nav-container {
    padding: 1rem 1.5rem;
  }

  .nav-menu {
    gap: 1.5rem;
  }

  .nav-menu li a {
    padding: 0.5rem 0.75rem;
  }
}

/* Desktop enhancements */
@media (min-width: 1025px) {
  .nav-container {
    max-width: 1200px;
    margin: 0 auto;
  }

  .nav-menu li a {
    position: relative;
  }

  .nav-menu li a::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 0;
    height: 2px;
    background: #007bff;
    transition: all 0.3s ease;
    transform: translateX(-50%);
  }

  .nav-menu li a:hover::after,
  .nav-menu li a.active::after {
    width: 100%;
  }
}`
        },
        {
          title: "CSS Grid for Complex Responsive Layouts",
          code: `/* CSS Grid for responsive magazine-style layout */
.magazine-layout {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

/* Header area */
.magazine-header {
  grid-column: 1 / -1;
  text-align: center;
  padding: 2rem 0;
  border-bottom: 2px solid #eee;
}

.magazine-title {
  font-size: 3rem;
  margin-bottom: 0.5rem;
  color: #2c3e50;
}

.magazine-subtitle {
  font-size: 1.2rem;
  color: #666;
  max-width: 600px;
  margin: 0 auto;
}

/* Featured article - spans full width on large screens */
.featured-article {
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  background: #f8f9fa;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.featured-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.featured-content h2 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #2c3e50;
}

.featured-content p {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #555;
  margin-bottom: 1.5rem;
}

.featured-image {
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 8px;
}

/* Article grid */
.articles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  grid-column: 1 / -1;
}

.article-card {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.article-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.article-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.article-content {
  padding: 1.5rem;
}

.article-title {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  color: #2c3e50;
}

.article-excerpt {
  color: #666;
  line-height: 1.5;
  margin-bottom: 1rem;
}

.article-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
  color: #888;
}

.read-more {
  color: #007bff;
  text-decoration: none;
  font-weight: 500;
}

.read-more:hover {
  text-decoration: underline;
}

/* Sidebar */
.sidebar {
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}

.sidebar-widget {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.widget-title {
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: #2c3e50;
  border-bottom: 2px solid #007bff;
  padding-bottom: 0.5rem;
}

/* Responsive breakpoints */
@media (min-width: 768px) {
  .magazine-layout {
    grid-template-columns: 1fr 300px;
    grid-template-areas:
      "header header"
      "featured sidebar"
      "articles sidebar";
  }

  .magazine-header {
    grid-area: header;
  }

  .featured-article {
    grid-area: featured;
  }

  .articles-grid {
    grid-area: articles;
  }

  .sidebar {
    grid-area: sidebar;
    grid-template-columns: 1fr;
  }
}

@media (min-width: 1024px) {
  .magazine-layout {
    grid-template-columns: 1fr 300px;
    grid-template-areas:
      "header header"
      "featured sidebar"
      "articles sidebar";
  }

  .articles-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .sidebar {
    position: sticky;
    top: 2rem;
    height: fit-content;
  }
}

@media (min-width: 1200px) {
  .articles-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* Mobile optimizations */
@media (max-width: 767px) {
  .magazine-layout {
    padding: 1rem;
    gap: 1.5rem;
  }

  .magazine-title {
    font-size: 2rem;
  }

  .magazine-subtitle {
    font-size: 1rem;
  }

  .featured-article {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    padding: 1.5rem;
  }

  .featured-content h2 {
    font-size: 2rem;
  }

  .articles-grid {
    grid-template-columns: 1fr;
  }

  .article-card {
    margin-bottom: 1rem;
  }

  .sidebar {
    gap: 1.5rem;
  }

  .sidebar-widget {
    padding: 1.2rem;
  }
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .article-card,
  .sidebar-widget,
  .featured-article {
    border: 2px solid #000;
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .article-card,
  .nav-menu {
    transition: none;
  }

  .nav-toggle span {
    transition: none;
  }
}`
        }
      ]
    },
    {
      id: "responsive-images-media",
      title: "Responsive Images and Media",
      content: "Images and media are often the heaviest parts of a web page. Responsive images ensure that the right image is delivered to each device, optimizing both performance and user experience.\n\n**Responsive Image Techniques**:\n- **Srcset and sizes**: Deliver different images based on screen size\n- **Picture element**: Art direction for different layouts\n- **CSS background images**: Responsive background images\n- **SVG**: Scalable vector graphics for icons and illustrations\n- **WebP/AVIF**: Modern image formats with better compression\n\n**Performance Considerations**:\n- **Lazy loading**: Load images only when needed\n- **Image optimization**: Compress and resize images\n- **CDN delivery**: Fast image delivery worldwide\n- **Format selection**: Choose best format for each use case\n- **Progressive loading**: Show low-quality image first, then high-quality\n\n**Media Queries for Images**:\n- **Resolution media queries**: Different images for different pixel densities\n- **Width media queries**: Different images for different viewport widths\n- **Orientation**: Different images for portrait/landscape\n- **Device capabilities**: Different images based on device features\n\n**Video and Audio**:\n- **Responsive video**: Videos that adapt to container size\n- **Multiple formats**: Provide fallbacks for different browsers\n- **Lazy loading**: Load media only when needed\n- **Accessibility**: Captions, transcripts, and keyboard controls\n\n**Best Practices**:\n- **Always provide alt text**: Accessibility and SEO\n- **Use appropriate formats**: WebP for photos, SVG for graphics\n- **Optimize file sizes**: Compress without quality loss\n- **Test on real devices**: Emulators don't show real performance\n- **Monitor Core Web Vitals**: Largest Contentful Paint (LCP) matters\n\n**Modern Image APIs**:\n- **Cloudinary**: Image optimization and delivery\n- **Imgix**: Real-time image processing\n- **Akamai Image Manager**: Enterprise image optimization\n- **Vercel Image Optimization**: Next.js built-in optimization\n\nRemember: Images should enhance your content, not slow it down. A good responsive image strategy balances visual quality with performance.",
      keyTopics: [
        "Responsive image techniques (srcset, picture element)",
        "Image optimization and performance",
        "Modern image formats (WebP, AVIF)",
        "Lazy loading implementation",
        "Responsive video and audio"
      ],
      practicalExercises: [
        "Implement responsive images with srcset and sizes",
        "Create art-directed images with the picture element",
        "Optimize images for web delivery",
        "Implement lazy loading for images",
        "Create responsive video players"
      ],
      codeExamples: [
        {
          title: "Responsive Images with Srcset and Sizes",
          code: `<!-- Basic responsive image -->
<img src="image-800.jpg"
     srcset="image-400.jpg 400w,
             image-800.jpg 800w,
             image-1200.jpg 1200w"
     sizes="(max-width: 400px) 100vw,
            (max-width: 800px) 50vw,
            33vw"
     alt="Responsive image example">

<!-- Art-directed responsive images with picture element -->
<picture>
  <!-- Large screens: landscape crop -->
  <source media="(min-width: 1024px)"
          srcset="hero-landscape-large.jpg 1200w,
                  hero-landscape-medium.jpg 800w"
          sizes="100vw">

  <!-- Medium screens: portrait crop -->
  <source media="(min-width: 768px)"
          srcset="hero-portrait-large.jpg 800w,
                  hero-portrait-medium.jpg 600w"
          sizes="100vw">

  <!-- Small screens: square crop -->
  <img src="hero-square-medium.jpg"
       srcset="hero-square-small.jpg 400w,
               hero-square-medium.jpg 600w"
       sizes="100vw"
       alt="Hero image with art direction">
</picture>

<!-- Modern formats with fallbacks -->
<picture>
  <source srcset="image.avif" type="image/avif">
  <source srcset="image.webp" type="image/webp">
  <img src="image.jpg" alt="Modern image with fallbacks">
</picture>

<!-- CSS for responsive image containers -->
<style>
.responsive-image-container {
  position: relative;
  width: 100%;
  height: 0;
  overflow: hidden;
}

/* Different aspect ratios for different screen sizes */
@media (max-width: 767px) {
  .responsive-image-container {
    padding-bottom: 75%; /* 4:3 aspect ratio */
  }
}

@media (min-width: 768px) and (max-width: 1023px) {
  .responsive-image-container {
    padding-bottom: 56.25%; /* 16:9 aspect ratio */
  }
}

@media (min-width: 1024px) {
  .responsive-image-container {
    padding-bottom: 50%; /* 2:1 aspect ratio */
  }
}

.responsive-image-container img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>

<div class="responsive-image-container">
  <img src="image.jpg"
       srcset="image-small.jpg 400w,
               image-medium.jpg 800w,
               image-large.jpg 1200w"
       sizes="(max-width: 767px) 100vw,
              (max-width: 1023px) 50vw,
              33vw"
       alt="Responsive image with container">
</div>`
        },
        {
          title: "Lazy Loading and Image Optimization",
          code: `<!-- Native lazy loading (modern browsers) -->
<img src="image.jpg"
     loading="lazy"
     decoding="async"
     alt="Lazy loaded image">

<!-- Progressive image loading with blur placeholder -->
<div class="progressive-image">
  <img src="placeholder.jpg"
       data-src="image.jpg"
       data-srcset="image-small.jpg 400w, image-large.jpg 800w"
       data-sizes="100vw"
       class="blur"
       alt="Progressive image">
  <noscript>
    <img src="image.jpg" alt="Fallback image">
  </noscript>
</div>

<style>
.progressive-image {
  position: relative;
  overflow: hidden;
}

.progressive-image img {
  width: 100%;
  height: auto;
  transition: filter 0.3s ease;
}

.progressive-image img.blur {
  filter: blur(10px);
  transform: scale(1.1);
}

.progressive-image img.loaded {
  filter: blur(0);
  transform: scale(1);
}
</style>

<script>
// Progressive image loading
document.addEventListener('DOMContentLoaded', function() {
  const images = document.querySelectorAll('.progressive-image img');

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;

        // Set the actual source
        if (img.dataset.src) {
          img.src = img.dataset.src;
        }

        if (img.dataset.srcset) {
          img.srcset = img.dataset.srcset;
        }

        if (img.dataset.sizes) {
          img.sizes = img.dataset.sizes;
        }

        // Remove blur effect when loaded
        img.addEventListener('load', () => {
          img.classList.remove('blur');
          img.classList.add('loaded');
        });

        // Stop observing this image
        observer.unobserve(img);
      }
    });
  }, {
    rootMargin: '50px 0px', // Start loading 50px before image enters viewport
    threshold: 0.01
  });

  images.forEach(img => imageObserver.observe(img));
});

// Fallback for browsers without Intersection Observer
if (!('IntersectionObserver' in window)) {
  const images = document.querySelectorAll('.progressive-image img');
  images.forEach(img => {
    if (img.dataset.src) {
      img.src = img.dataset.src;
    }
  });
}
</script>

<!-- Responsive video with multiple sources -->
<video controls preload="metadata" poster="video-poster.jpg">
  <source src="video.mp4" type="video/mp4">
  <source src="video.webm" type="video/webm">
  <source src="video.ogv" type="video/ogg">
  <!-- Fallback content -->
  <p>Your browser doesn't support HTML5 video.
     <a href="video.mp4">Download the video</a> instead.</p>
</video>

<!-- Responsive video container -->
<style>
.video-container {
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 56.25%; /* 16:9 aspect ratio */
  overflow: hidden;
}

.video-container video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

/* Adjust aspect ratio for different content types */
.video-container.portrait {
  padding-bottom: 133.33%; /* 3:4 aspect ratio */
}

.video-container.square {
  padding-bottom: 100%; /* 1:1 aspect ratio */
}
</style>

<div class="video-container">
  <video controls>
    <source src="presentation.mp4" type="video/mp4">
    <source src="presentation.webm" type="video/webm">
  </video>
</div>

<!-- Audio with responsive controls -->
<audio controls preload="none">
  <source src="audio.mp3" type="audio/mpeg">
  <source src="audio.ogg" type="audio/ogg">
  <p>Your browser doesn't support HTML5 audio.</p>
</audio>

<!-- Image optimization utilities -->
<script>
// WebP support detection
function supportsWebP() {
  return new Promise(resolve => {
    const webP = new Image();
    webP.onload = webP.onerror = () => {
      resolve(webP.height === 2);
    };
    webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
  });
}

// Dynamic image format selection
async function loadOptimizedImage(imgElement, baseSrc) {
  const supportsWebP = await supportsWebP();

  const extension = supportsWebP ? 'webp' : 'jpg';
  const optimizedSrc = baseSrc.replace(/\.(jpg|png)$/i, \`.\${extension}\`);

  imgElement.src = optimizedSrc;
}

// Usage
document.addEventListener('DOMContentLoaded', function() {
  const images = document.querySelectorAll('[data-optimize]');
  images.forEach(img => {
    loadOptimizedImage(img, img.dataset.optimize);
  });
});
</script>`
        }
      ]
    },
    {
      id: "responsive-typography",
      title: "Responsive Typography and Spacing",
      content: "Typography is the foundation of good design. Responsive typography ensures that text is readable and visually appealing across all devices and screen sizes.\n\n**Responsive Typography Principles**:\n- **Scalable units**: Use em, rem, and viewport units\n- **Fluid typography**: Text that scales with screen size\n- **Readable line lengths**: 45-75 characters per line\n- **Appropriate font sizes**: Consider device capabilities\n- **Hierarchy preservation**: Maintain visual hierarchy across devices\n\n**CSS Units for Responsive Design**:\n- **rem**: Relative to root font size, scalable\n- **em**: Relative to parent font size\n- **vh/vw**: Viewport height/width percentages\n- **vmin/vmax**: Minimum/maximum viewport dimensions\n- **px**: Fixed pixels (avoid for responsive text)\n\n**Typography Scale**:\n- **Major third**: 1.25 ratio (good for headings)\n- **Perfect fourth**: 1.333 ratio (balanced)\n- **Augmented fourth**: 1.414 ratio (harmonic)\n- **Golden ratio**: 1.618 ratio (classic)\n\n**Spacing and Layout**:\n- **Consistent spacing scale**: Use a ratio-based system\n- **Container queries**: Size based on container, not viewport\n- **Grid systems**: Consistent spacing and alignment\n- **White space**: Don't fear empty space\n\n**Accessibility Considerations**:\n- **Minimum font size**: 16px for body text\n- **Color contrast**: WCAG guidelines\n- **Line height**: 1.4-1.6 for readability\n- **Focus indicators**: Visible on all devices\n\n**Performance**:\n- **Font loading**: Use font-display for better performance\n- **Subset fonts**: Load only needed characters\n- **System fonts**: Consider using system fonts for better performance\n- **Web fonts**: Optimize loading and caching\n\nRemember: Good typography is invisible. Users should focus on content, not on reading it.",
      keyTopics: [
        "Fluid typography with clamp() and viewport units",
        "Responsive spacing systems",
        "Typography scales and ratios",
        "Font loading optimization",
        "Accessibility in typography"
      ],
      practicalExercises: [
        "Create a responsive typography system",
        "Implement fluid typography with CSS clamp()",
        "Design responsive spacing scales",
        "Optimize font loading performance",
        "Test typography across different devices"
      ],
      codeExamples: [
        {
          title: "Fluid Typography System",
          code: `/* CSS Custom Properties for Typography Scale */
:root {
  /* Base font size - responsive */
  --font-size-base: clamp(16px, 2.5vw, 20px);

  /* Typography scale using major third ratio (1.25) */
  --font-size-xs: calc(var(--font-size-base) * 0.75);    /* 12px - 15px */
  --font-size-sm: calc(var(--font-size-base) * 0.875);   /* 14px - 17.5px */
  --font-size-md: var(--font-size-base);                 /* 16px - 20px */
  --font-size-lg: calc(var(--font-size-base) * 1.25);    /* 20px - 25px */
  --font-size-xl: calc(var(--font-size-base) * 1.5625);  /* 25px - 31.25px */
  --font-size-2xl: calc(var(--font-size-base) * 1.953125); /* 31.25px - 39px */
  --font-size-3xl: calc(var(--font-size-base) * 2.44140625); /* 39px - 48.8px */
  --font-size-4xl: calc(var(--font-size-base) * 3.0517578125); /* 48.8px - 61px */

  /* Line heights for optimal readability */
  --line-height-tight: 1.25;
  --line-height-normal: 1.5;
  --line-height-relaxed: 1.75;

  /* Letter spacing */
  --letter-spacing-tight: -0.025em;
  --letter-spacing-normal: 0;
  --letter-spacing-wide: 0.025em;
}

/* Base typography styles */
body {
  font-family: system-ui, -apple-system, sans-serif;
  font-size: var(--font-size-md);
  line-height: var(--line-height-normal);
  color: #333;
  margin: 0;
  padding: 0;
}

/* Heading hierarchy */
h1, h2, h3, h4, h5, h6 {
  font-weight: 600;
  line-height: var(--line-height-tight);
  margin: 0 0 1rem 0;
  color: #1a1a1a;
}

h1 { font-size: var(--font-size-4xl); }
h2 { font-size: var(--font-size-3xl); }
h3 { font-size: var(--font-size-2xl); }
h4 { font-size: var(--font-size-xl); }
h5 { font-size: var(--font-size-lg); }
h6 { font-size: var(--font-size-md); }

/* Text elements */
p {
  margin: 0 0 1rem 0;
  max-width: 70ch; /* Optimal reading length */
}

small {
  font-size: var(--font-size-sm);
  color: #666;
}

strong, b {
  font-weight: 600;
}

em, i {
  font-style: italic;
}

/* Links */
a {
  color: #007bff;
  text-decoration: none;
  transition: color 0.2s ease;
}

a:hover, a:focus {
  color: #0056b3;
  text-decoration: underline;
}

/* Lists */
ul, ol {
  margin: 0 0 1rem 0;
  padding-left: 1.5rem;
}

li {
  margin-bottom: 0.5rem;
}

/* Blockquotes */
blockquote {
  margin: 2rem 0;
  padding: 1rem 1.5rem;
  border-left: 4px solid #007bff;
  background: #f8f9fa;
  font-style: italic;
  color: #666;
}

blockquote p {
  margin: 0;
}

/* Code */
code {
  font-family: 'Monaco', 'Menlo', monospace;
  font-size: 0.9em;
  background: #f1f3f4;
  padding: 0.2em 0.4em;
  border-radius: 3px;
}

pre {
  font-family: 'Monaco', 'Menlo', monospace;
  background: #f1f3f4;
  padding: 1rem;
  border-radius: 6px;
  overflow-x: auto;
  margin: 1rem 0;
}

pre code {
  background: none;
  padding: 0;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  :root {
    --font-size-base: clamp(14px, 4vw, 16px);
  }

  h1 { font-size: var(--font-size-3xl); }
  h2 { font-size: var(--font-size-2xl); }
  h3 { font-size: var(--font-size-xl); }

  p {
    max-width: none; /* Allow full width on mobile */
  }

  blockquote {
    margin: 1.5rem 0;
    padding: 1rem;
  }
}

@media (max-width: 480px) {
  :root {
    --font-size-base: clamp(14px, 4.5vw, 16px);
  }

  h1 { font-size: var(--font-size-2xl); }
  h2 { font-size: var(--font-size-xl); }
  h3 { font-size: var(--font-size-lg); }

  ul, ol {
    padding-left: 1.2rem;
  }
}

/* High contrast mode */
@media (prefers-contrast: high) {
  :root {
    --font-size-base: clamp(18px, 2.5vw, 22px);
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 700;
  }
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  * {
    transition: none !important;
  }
}

/* Print styles */
@media print {
  :root {
    --font-size-base: 12pt;
  }

  body {
    font-family: serif;
  }

  a {
    color: black;
    text-decoration: underline;
  }

  a[href^="http"]:after {
    content: " (" attr(href) ")";
  }
}`
        },
        {
          title: "Responsive Spacing and Layout System",
          code: `/* CSS Custom Properties for Spacing Scale */
:root {
  /* Base spacing unit - responsive */
  --space-unit: clamp(8px, 2vw, 16px);

  /* Spacing scale using 4pt grid system */
  --space-1: calc(var(--space-unit) * 0.25);   /* 2px - 4px */
  --space-2: calc(var(--space-unit) * 0.5);    /* 4px - 8px */
  --space-3: calc(var(--space-unit) * 0.75);   /* 6px - 12px */
  --space-4: var(--space-unit);                /* 8px - 16px */
  --space-5: calc(var(--space-unit) * 1.25);   /* 10px - 20px */
  --space-6: calc(var(--space-unit) * 1.5);    /* 12px - 24px */
  --space-7: calc(var(--space-unit) * 2);      /* 16px - 32px */
  --space-8: calc(var(--space-unit) * 2.5);    /* 20px - 40px */
  --space-9: calc(var(--space-unit) * 3);      /* 24px - 48px */
  --space-10: calc(var(--space-unit) * 4);     /* 32px - 64px */

  /* Layout properties */
  --container-max-width: 1200px;
  --container-padding: var(--space-4);
  --section-padding: var(--space-10);
}

/* Utility classes for spacing */
.m-0 { margin: 0; }
.m-1 { margin: var(--space-1); }
.m-2 { margin: var(--space-2); }
.m-3 { margin: var(--space-3); }
.m-4 { margin: var(--space-4); }
.m-5 { margin: var(--space-5); }
.m-6 { margin: var(--space-6); }
.m-7 { margin: var(--space-7); }
.m-8 { margin: var(--space-8); }
.m-9 { margin: var(--space-9); }
.m-10 { margin: var(--space-10); }

.p-0 { padding: 0; }
.p-1 { padding: var(--space-1); }
.p-2 { padding: var(--space-2); }
.p-3 { padding: var(--space-3); }
.p-4 { padding: var(--space-4); }
.p-5 { padding: var(--space-5); }
.p-6 { padding: var(--space-6); }
.p-7 { padding: var(--space-7); }
.p-8 { padding: var(--space-8); }
.p-9 { padding: var(--space-9); }
.p-10 { padding: var(--space-10); }

/* Directional spacing */
.mt-1 { margin-top: var(--space-1); }
.mt-2 { margin-top: var(--space-2); }
.mt-3 { margin-top: var(--space-3); }
.mt-4 { margin-top: var(--space-4); }
.mt-5 { margin-top: var(--space-5); }

.mb-1 { margin-bottom: var(--space-1); }
.mb-2 { margin-bottom: var(--space-2); }
.mb-3 { margin-bottom: var(--space-3); }
.mb-4 { margin-bottom: var(--space-4); }
.mb-5 { margin-bottom: var(--space-5); }

.py-1 { padding-top: var(--space-1); padding-bottom: var(--space-1); }
.py-2 { padding-top: var(--space-2); padding-bottom: var(--space-2); }
.py-3 { padding-top: var(--space-3); padding-bottom: var(--space-3); }
.py-4 { padding-top: var(--space-4); padding-bottom: var(--space-4); }
.py-5 { padding-top: var(--space-5); padding-bottom: var(--space-5); }

/* Container and layout utilities */
.container {
  max-width: var(--container-max-width);
  margin: 0 auto;
  padding: 0 var(--container-padding);
  width: 100%;
}

.section {
  padding: var(--section-padding) 0;
}

.grid {
  display: grid;
  gap: var(--space-4);
}

.grid-2 { grid-template-columns: repeat(2, 1fr); }
.grid-3 { grid-template-columns: repeat(3, 1fr); }
.grid-4 { grid-template-columns: repeat(4, 1fr); }

.flex {
  display: flex;
  gap: var(--space-4);
}

.flex-column { flex-direction: column; }
.flex-wrap { flex-wrap: wrap; }

.items-center { align-items: center; }
.justify-center { justify-content: center; }
.justify-between { justify-content: space-between; }

/* Responsive grid adjustments */
@media (max-width: 768px) {
  .grid-2,
  .grid-3,
  .grid-4 {
    grid-template-columns: 1fr;
  }

  .container {
    padding: 0 var(--space-3);
  }

  .section {
    padding: var(--space-7) 0;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0 var(--space-2);
  }

  .section {
    padding: var(--space-6) 0;
  }

  .grid,
  .flex {
    gap: var(--space-3);
  }
}

/* Card component with responsive spacing */
.card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: var(--space-5);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.card-header {
  margin-bottom: var(--space-4);
}

.card-title {
  font-size: var(--font-size-xl);
  margin: 0 0 var(--space-2) 0;
}

.card-content {
  margin-bottom: var(--space-4);
}

.card-actions {
  display: flex;
  gap: var(--space-3);
  flex-wrap: wrap;
}

/* Button component */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-3) var(--space-5);
  border: none;
  border-radius: 4px;
  font-size: var(--font-size-md);
  font-weight: 500;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s ease;
  min-height: 44px; /* Touch target size */
}

.btn-primary {
  background: #007bff;
  color: white;
}

.btn-primary:hover {
  background: #0056b3;
}

.btn-secondary {
  background: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background: #545b62;
}

/* Form elements with responsive spacing */
.form-group {
  margin-bottom: var(--space-4);
}

.form-label {
  display: block;
  margin-bottom: var(--space-2);
  font-weight: 500;
}

.form-input,
.form-textarea,
.form-select {
  width: 100%;
  padding: var(--space-3);
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: var(--font-size-md);
  transition: border-color 0.2s ease;
}

.form-input:focus,
.form-textarea:focus,
.form-select:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
}

.form-textarea {
  resize: vertical;
  min-height: 100px;
}

/* Responsive form adjustments */
@media (max-width: 480px) {
  .form-input,
  .form-textarea,
  .form-select {
    padding: var(--space-4);
  }

  .btn {
    width: 100%;
    justify-content: center;
  }

  .card-actions {
    flex-direction: column;
  }

  .card-actions .btn {
    width: 100%;
  }
}`
        }
      ]
    }
  ],
  projects: [
    {
      title: "Responsive Portfolio Website",
      description: "Build a complete portfolio website that showcases your work with responsive design, optimized images, fluid typography, and smooth animations across all devices."
    },
    {
      title: "E-commerce Product Page",
      description: "Create a responsive product page for an e-commerce site with image galleries, product variants, reviews, and a mobile-optimized checkout flow."
    },
    {
      title: "News Magazine Layout",
      description: "Design a responsive news magazine layout with complex grids, art-directed images, typography scales, and optimized content hierarchy for reading."
    },
    {
      title: "Dashboard Interface",
      description: "Build a responsive admin dashboard with data tables, charts, navigation, and forms that work seamlessly from mobile to desktop."
    },
    {
      title: "Restaurant Website",
      description: "Create a responsive restaurant website with menu display, reservation system, photo gallery, and location information optimized for mobile users."
    }
  ],
  assessments: [
    {
      type: "quiz",
      questions: [
        {
          question: "What is the purpose of the viewport meta tag in responsive design?",
          options: [
            "To set the website's color scheme",
            "To control how the page is displayed on mobile devices",
            "To optimize images for different screen sizes",
            "To define the website's navigation structure"
          ],
          correctAnswer: "To control how the page is displayed on mobile devices"
        },
        {
          question: "Which CSS unit is relative to the viewport width?",
          options: [
            "em",
            "rem",
            "vw",
            "pt"
          ],
          correctAnswer: "vw"
        },
        {
          question: "What does the 'mobile-first' approach mean?",
          options: [
            "Design for mobile devices first, then enhance for larger screens",
            "Use only mobile devices for testing",
            "Create separate mobile and desktop versions",
            "Prioritize mobile app development over web"
          ],
          correctAnswer: "Design for mobile devices first, then enhance for larger screens"
        },
        {
          question: "Which HTML element is used for art-directed responsive images?",
          options: [
            "img",
            "picture",
            "figure",
            "canvas"
          ],
          correctAnswer: "picture"
        },
        {
          question: "What is the purpose of CSS Grid in responsive design?",
          options: [
            "To create two-dimensional layouts",
            "To optimize image loading",
            "To manage typography scales",
            "To handle form validation"
          ],
          correctAnswer: "To create two-dimensional layouts"
        }
      ]
    },
    {
      type: "evaluation",
      questions: [
        {
          question: "Design a responsive layout for a blog post page including header, content, sidebar, and footer. Explain your CSS Grid and Flexbox usage.",
          options: [],
          correctAnswer: ""
        },
        {
          question: "Explain how you would implement responsive images for a product catalog. Include srcset, sizes, and modern image formats.",
          options: [],
          correctAnswer: ""
        },
        {
          question: "Create a responsive typography system using CSS custom properties. Include fluid typography, spacing scales, and accessibility considerations.",
          options: [],
          correctAnswer: ""
        }
      ]
    }
  ],
  aiPrompts: [
    "How do I make my website responsive?",
    "What's the difference between Flexbox and CSS Grid?",
    "How do I implement responsive images?",
    "How do I create a mobile-first design?",
    "What's the best way to handle responsive typography?",
    "How do I test responsive design?",
    "How do I optimize images for responsive design?",
    "What's the difference between px, em, and rem?",
    "How do I create responsive navigation?",
    "How do I handle touch interactions on mobile?"
  ],
  resources: [
    { name: "Responsive Web Design Fundamentals", url: "https://developers.google.com/web/fundamentals/design-and-ux/responsive/" },
    { name: "CSS Grid Guide", url: "https://css-tricks.com/snippets/css/complete-guide-grid/" },
    { name: "Flexbox Guide", url: "https://css-tricks.com/snippets/css/a-guide-to-flexbox/" },
    { name: "Responsive Images", url: "https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images" },
    { name: "Viewport Meta Tag", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Viewport_meta_tag" },
    { name: "Media Queries", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries" },
    { name: "Web.dev Responsive Design", url: "https://web.dev/responsive-web-design-basics/" },
    { name: "Google Mobile-Friendly Test", url: "https://search.google.com/test/mobile-friendly" }
  ],
  toolsRequired: [
    "Modern web browser with developer tools",
    "Responsive design testing tools (BrowserStack, Responsively)",
    "Image optimization tools (ImageOptim, TinyPNG)",
    "CSS preprocessor (Sass, Less) - optional",
    "Build tools (Webpack, Vite) - optional",
    "Performance testing tools (Lighthouse, WebPageTest)",
    "Accessibility testing tools (WAVE, axe)",
    "Version control (Git)",
    "Code editor with responsive preview"
  ],
  bestPractices: [
    "Use mobile-first approach for all new projects",
    "Test on real devices, not just emulators",
    "Optimize images for web delivery",
    "Use semantic HTML for better accessibility",
    "Implement proper touch targets for mobile",
    "Use fluid typography with clamp() function",
    "Test with different screen sizes and orientations",
    "Consider performance impact of responsive features",
    "Use CSS Grid for complex layouts",
    "Implement proper loading states for images",
    "Use modern image formats when possible",
    "Consider users with different abilities",
    "Test with slow network connections",
    "Use progressive enhancement approach",
    "Document responsive design decisions",
    "Regularly audit and update responsive design",
    "Use consistent spacing and typography scales",
    "Implement proper error handling for media",
    "Consider international users and text expansion",
    "Use CSS custom properties for maintainable code"
  ],
  commonPitfalls: [
    "Fixed pixel widths that don't adapt",
    "Images that don't scale properly",
    "Typography that's too small on mobile",
    "Navigation that doesn't work on touch devices",
    "Horizontal scrolling on mobile devices",
    "Ignoring performance impact of large images",
    "Not testing on actual devices",
    "Using deprecated techniques",
    "Ignoring accessibility requirements",
    "Not considering different orientations",
    "Fixed heights that cause content overflow",
    "Not optimizing for different network speeds",
    "Ignoring users with motor disabilities",
    "Not testing with screen readers",
    "Using complex CSS that breaks on older browsers",
    "Not planning for content expansion",
    "Ignoring print styles",
    "Not considering high contrast needs",
    "Using non-responsive third-party components",
    "Not maintaining aspect ratios properly"
  ],
  careerRelevance: "Responsive design is fundamental to modern web development. With mobile devices accounting for over 60% of web traffic, responsive design skills are essential for any front-end developer. Companies need developers who can create websites that work seamlessly across all devices, improving user experience and conversion rates. Responsive design expertise demonstrates understanding of user-centered design, performance optimization, and modern CSS techniques. As mobile usage continues to grow, responsive design skills will remain highly valuable in the job market, with opportunities in web development, UI/UX design, and front-end engineering roles across industries."
};

export default responsiveDesignContent;