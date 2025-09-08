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
    "Learn to use common HTML tags for text formatting, links, and images.",
    "Be able to create lists, tables, and forms to organize content.",
    "Understand the purpose and usage of semantic HTML5 elements.",
    "Learn how to embed multimedia like audio and video.",
  ],
  sections: [
    {
      title: "Introduction to HTML",
      content: "HTML (Hypertext Markup Language) is the standard language for creating web pages. It provides the structure for the content on a webpage, from headings and paragraphs to images and links. All websites, from the simplest to the most complex, are built on HTML.",
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
      title: "Basic Tags & Text Formatting",
      content: "HTML provides a variety of tags to format text. Headings are defined with <h1> through <h6> tags, paragraphs with <p>, and you can emphasize text with tags like <strong> for bold and <em> for italic.",
      keyTopics: ["Headings (h1-h6)", "Paragraphs (p)", "Bold (strong)", "Italic (em)", "Line Breaks (br)"],
      codeExamples: [
        {
          title: "Text Formatting",
          code: `<h1>Main Heading</h1>
<p>This is a paragraph. <strong>This text is important (bold).</strong></p>
<p>This is another paragraph. <em>This text is emphasized (italic).</em></p>`
        }
      ]
    },
    {
      title: "Links and Images",
      content: "Links (or hyperlinks) are fundamental to the web, allowing users to navigate between pages. They are created with the <a> (anchor) tag. Images are embedded using the <img> tag, which requires a 'src' attribute for the image source and an 'alt' attribute for accessibility.",
      keyTopics: ["Anchor Tag (a)", "Image Tag (img)", "href attribute", "src attribute", "alt attribute"],
      codeExamples: [
        {
          title: "Creating a Link and Embedding an Image",
          code: `<p>Visit our <a href="https://www.example.com">official website</a>.</p>
<img src="image.jpg" alt="A descriptive caption for the image">`
        }
      ]
    },
    {
      title: "Lists",
      content: "HTML offers two main types of lists: unordered lists (<ul>) for bullet points and ordered lists (<ol>) for numbered items. Each item within a list is defined with a <li> (list item) tag.",
      keyTopics: ["Unordered Lists (ul)", "Ordered Lists (ol)", "List Items (li)"],
      codeExamples: [
        {
          title: "Unordered and Ordered Lists",
          code: `<h4>Shopping List</h4>
<ul>
  <li>Milk</li>
  <li>Bread</li>
  <li>Cheese</li>
</ul>

<h4>Instructions</h4>
<ol>
  <li>First, do this.</li>
  <li>Then, do that.</li>
  <li>Finally, do this.</li>
</ol>`
        }
      ]
    },
    {
      title: "Tables",
      content: "Tables are used to display data in rows and columns. A table is defined with the <table> tag, with <tr> for table rows, <th> for table headers, and <td> for table data cells.",
      keyTopics: ["<table>", "<tr>", "<th>", "<td>", "Table Headers"],
      codeExamples: [
        {
          title: "Simple Data Table",
          code: `<table>
  <tr>
    <th>Firstname</th>
    <th>Lastname</th>
  </tr>
  <tr>
    <td>John</td>
    <td>Doe</td>
  </tr>
  <tr>
    <td>Jane</td>
    <td>Smith</td>
  </tr>
</table>`
        }
      ]
    },
    {
      title: "Forms and User Input",
      content: "HTML forms are used to collect user input. The <form> element is a container for different types of input elements, such as text fields, checkboxes, radio buttons, submit buttons, and more. The <label> tag is crucial for accessibility.",
      keyTopics: ["<form>", "<input>", "<textarea>", "<label>", "<button>", "Input Types"],
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
    },
    {
      title: "Semantic HTML5 Elements",
      content: "Semantic HTML elements clearly describe their meaning in a human- and machine-readable way. They help search engines and other user devices to determine the importance and context of web pages. Using them improves SEO and accessibility.",
      keyTopics: ["<header>", "<footer>", "<nav>", "<main>", "<article>", "<section>", "<aside>"],
      codeExamples: [
        {
          title: "Semantic Page Layout",
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
      title: "Multimedia in HTML",
      content: "HTML5 introduced native support for embedding audio and video without needing external plugins like Flash. The <audio> and <video> tags allow you to easily add media to your pages.",
      keyTopics: ["<audio>", "<video>", "controls attribute", "source tag"],
      codeExamples: [
        {
          title: "Embedding Audio and Video",
          code: `<h4>Audio Player</h4>
<audio controls>
  <source src="sound.mp3" type="audio/mpeg">
  Your browser does not support the audio element.
</audio>

<h4>Video Player</h4>
<video width="320" height="240" controls>
  <source src="movie.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>`
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
