const css3Content = {
  id: "css3",
  tier: 1,
  name: "CSS3",
  description: "CSS (Cascading Style Sheets) is the language we use to style an HTML document. CSS describes how HTML elements should be displayed on screen, paper, or in other media.",
  difficulty: "beginner",
  estimatedHours: 15,
  prerequisites: ["html5"],
  learningObjectives: [
    "Understand the role of CSS in web development.",
    "Learn how to apply styles using selectors, properties, and values.",
    "Grasp the fundamentals of the CSS Box Model.",
    "Be able to create flexible layouts using Flexbox.",
    "Understand the basics of creating grid-based layouts with CSS Grid.",
    "Learn the principles of responsive design using media queries."
  ],
  sections: [
    {
      title: "Introduction to CSS",
      content: "If HTML is the skeleton of your webpage, think of CSS as the clothes, makeup, and hairstyle. It's what gives your website its look and feel. Without CSS, the web would be a very boring place with just black text on a white background. CSS lets you add colors, change fonts, set layouts, and create beautiful designs. The 'Cascading' part is important—it means that styles can be inherited from parent elements, creating a cascade of rules.",
      keyTopics: ["What is CSS?", "Inline, Internal, and External CSS", "CSS Syntax"],
      codeExamples: [
        {
          title: "Basic CSS Rule",
          code: `/* This is a CSS comment */
p {
  color: blue; /* Makes all paragraph text blue */
  font-size: 16px; /* Sets the font size to 16 pixels */
}`
        }
      ]
    },
    {
      title: "Selectors and Properties",
      content: "To style an element, you first need to select it. CSS provides a powerful set of selectors to target elements. You can select elements by their tag name (e.g., &lt;p&gt;), their class (e.g., class='important'), or their unique ID (e.g., id='main-header'). Once you've selected an element, you apply style rules using properties and values, like 'color: red;' or 'background-color: yellow;'. Think of selectors as the 'who' and properties as the 'what you want to do'.",
      keyTopics: ["Element Selectors", "Class Selectors", "ID Selectors", "Common Properties (color, font-size, background)"],
      codeExamples: [
        {
          title: "Using Selectors",
          code: `/* Element selector */
h1 {
  font-family: Arial, sans-serif;
}

/* Class selector */
.highlight {
  background-color: yellow;
}

/* ID selector */
#login-button {
  border: 1px solid green;
}`
        }
      ]
    },
    {
      title: "The Box Model",
      content: "This is one of the most fundamental concepts in CSS. Imagine every single HTML element on your page is inside its own invisible box. The Box Model describes how this box is structured. It consists of four parts, from the inside out: the content itself, padding (the space around the content), a border, and finally the margin (the space outside the border, separating it from other elements). Understanding how to control these four parts is the key to managing space and layout on a webpage.",
      keyTopics: ["Content", "Padding", "Border", "Margin", "height & width"],
      codeExamples: [
        {
          title: "Box Model Example",
          code: `.my-box {
  width: 300px;
  padding: 20px;
  border: 5px solid black;
  margin: 15px;
  background-color: lightgray;
}`
        }
      ]
    },
    {
      title: "Flexbox Layout",
      content: "For a long time, laying out elements in a row or column was surprisingly difficult in CSS. Then came Flexbox! Think of it as a tool that makes arranging items in a container incredibly easy. You just declare a container as a 'flex' container, and its direct children become 'flex items'. You can then easily align them, space them out, and change their order, all with a few simple properties. It's perfect for navigation bars, galleries, or any component where you need to align items horizontally or vertically.",
      keyTopics: ["display: flex", "flex-direction", "justify-content", "align-items", "flex-grow"],
      codeExamples: [
        {
          title: "Simple Flexbox Container",
          code: `.container {
  display: flex;
  justify-content: space-around; /* Spreads items out evenly */
  align-items: center; /* Vertically centers items */
  background-color: #f0f0f0;
  height: 100px;
}

.item {
  background-color: dodgerblue;
  color: white;
  padding: 10px;
}`
        }
      ]
    },
    {
      title: "CSS Grid Layout",
      content: "If Flexbox is for arranging items in one dimension (a row OR a column), CSS Grid is its powerful big brother, designed for two-dimensional layouts. Imagine your webpage as a piece of graph paper. CSS Grid lets you define columns and rows, creating a grid. You can then place items precisely into any cell (or span them across multiple cells) of that grid. It's the most powerful layout system in CSS and is ideal for creating complex page layouts with headers, sidebars, and footers.",
      keyTopics: ["display: grid", "grid-template-columns", "grid-template-rows", "grid-gap", "grid-column & grid-row"],
      codeExamples: [
        {
          title: "Simple Grid Layout",
          code: `.wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr; /* Three equal-width columns */
  grid-gap: 10px;
}

.grid-item {
  background-color: #4CAF50;
  color: white;
  padding: 20px;
  text-align: center;
}`
        }
      ]
    },
    {
      title: "Responsive Design & Media Queries",
      content: "Today, people view websites on everything from tiny phones to massive TVs. Responsive Design is the practice of making your website look good on all of them. The main tool for this is the Media Query. A media query is a special CSS rule that checks for things like the width of the screen. You can tell the browser, 'If the screen is less than 600px wide, apply these special styles'. This allows you to change font sizes, hide elements, or even completely rearrange the layout for mobile devices.",
      keyTopics: ["Mobile-First Approach", "Media Queries", "Viewport Meta Tag", "Fluid Layouts"],
      codeExamples: [
        {
          title: "Simple Media Query",
          code: `/* Default style for all screens */
.container {
  width: 90%;
  margin: 0 auto;
}

/* Style for screens 768px and wider */
@media (min-width: 768px) {
  .container {
    width: 80%;
  }
}

/* Style for screens 1200px and wider */
@media (min-width: 1200px) {
  .container {
    width: 1140px;
  }
}`
        }
      ]
    }
  ],
  aiPrompts: [
    "Explain the difference between Flexbox and CSS Grid, and when to use each.",
    "What is CSS specificity and how does it work?",
    "How can you center an element both horizontally and vertically inside a container?"
  ],
  resources: [
    { title: "MDN Web Docs: CSS", url: "https://developer.mozilla.org/en-US/docs/Web/CSS" },
    { title: "CSS-Tricks: A Guide to Flexbox", url: "https://css-tricks.com/snippets/css/a-guide-to-flexbox/" },
    { title: "CSS-Tricks: A Complete Guide to Grid", url: "https://css-tricks.com/snippets/css/complete-guide-grid/" }
  ],
  toolsRequired: ["A modern web browser (e.g., Chrome, Firefox)", "A text editor (e.g., VS Code)"],
  bestPractices: [
    "Use external stylesheets for better organization and reusability.",
    "Use classes for styling and reserve IDs for JavaScript hooks or fragment identifiers.",
    "Adopt a mobile-first approach when writing responsive styles."
  ],
  commonPitfalls: [
    "Overriding CSS rules with `!important` instead of understanding specificity.",
    "Using pixels for everything, which can make responsive design difficult.",
    "Not understanding the difference between block, inline, and inline-block elements."
  ],
  careerRelevance: "CSS is a cornerstone technology of the web. Mastery of CSS is non-negotiable for front-end and full-stack developers, and a strong understanding is beneficial for UI/UX designers as well."
};

export default css3Content;
