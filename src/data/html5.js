const html5Content = {
  id: "html5",
  tier: 1,
  name: "HTML5",
  description: "HTML5 is the latest version of Hypertext Markup Language, the code that describes web pages. It's designed to deliver rich content without the need for additional plugins.",
  difficulty: "beginner",
  estimatedHours: 10,
  prerequisites: [],
  learningObjectives: [
    "Understand the basic structure of an HTML document.",
    "Learn to use common HTML tags to structure content.",
    "Understand the purpose of semantic HTML5 elements.",
    "Learn how to create lists, tables, and forms.",
    "Understand how to embed images, audio, and video.",
  ],
  sections: [
    {
      title: "Introduction to HTML",
      content: "HTML (Hypertext Markup Language) is the standard language for creating web pages. It provides the structure for the content on a webpage, from headings and paragraphs to images and links.",
      keyTopics: ["What is HTML?", "Basic Document Structure", "Doctype Declaration"],
      codeExamples: [
        {
          title: "Basic HTML Document",
          code: `<!DOCTYPE html>
<html>
<head>
  <title>Page Title</title>
</head>
<body>

  <h1>My First Heading</h1>
  <p>My first paragraph.</p>

</body>
</html>`
        }
      ]
    },
    {
      title: "Semantic HTML5 Elements",
      content: "Semantic HTML elements clearly describe their meaning in a human- and machine-readable way. They help search engines and other user devices to determine the importance and context of web pages.",
      keyTopics: ["<header>", "<footer>", "<nav>", "<main>", "<article>", "<section>", "<aside>"],
      codeExamples: [
        {
          title: "Semantic Layout",
          code: `<header>
  <h1>Website Title</h1>
  <nav>
    <a href="/home">Home</a>
    <a href="/about">About</a>
  </nav>
</header>

<main>
  <article>
    <h2>Article Title</h2>
    <p>Article content...</p>
  </article>
</main>

<footer>
  <p>&copy; 2025 My Website</p>
</footer>`
        }
      ]
    },
    {
        title: "Forms and Input",
        content: "HTML forms are used to collect user input. The <form> element is a container for different types of input elements, such as text fields, checkboxes, radio buttons, submit buttons, and more.",
        keyTopics: ["<form>", "<input>", "<textarea>", "<label>", "<button>"],
        codeExamples: [
          {
            title: "Simple Login Form",
            code: `<form action="/login" method="post">
  <label for="username">Username:</label><br>
  <input type="text" id="username" name="username"><br>
  <label for="password">Password:</label><br>
  <input type="password" id="password" name="password"><br><br>
  <button type="submit">Submit</button>
</form>`
          }
        ]
      }
  ],
  aiPrompts: [
    "Explain the difference between block and inline elements in HTML.",
    "How does the 'alt' attribute for images improve accessibility?",
    "Describe a use case for the HTML5 <canvas> element."
  ],
  resources: [
    { title: "MDN Web Docs: HTML", url: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
    { title: "W3Schools HTML Tutorial", url: "https://www.w3schools.com/html/" }
  ],
  toolsRequired: ["A modern web browser (e.g., Chrome, Firefox)", "A text editor (e.g., VS Code)"],
  bestPractices: [
    "Always use semantic tags to define the structure of your content.",
    "Ensure all images have an 'alt' attribute for accessibility.",
    "Validate your HTML to catch errors and ensure cross-browser compatibility."
  ],
  commonPitfalls: [
    "Forgetting to close tags, which can lead to unexpected layout issues.",
    "Using non-semantic tags like <div> for everything.",
    "Not using the 'label' element for form inputs, which hurts accessibility."
  ],
  careerRelevance: "HTML is the foundational skill for all web development roles. Mastery of HTML is essential for front-end developers, back-end developers, and full-stack developers."
};

export default html5Content;
