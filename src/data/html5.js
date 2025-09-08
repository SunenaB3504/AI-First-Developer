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
      content: "Think of HTML as the skeleton of a website. Just like a skeleton gives a body its structure, HTML provides the fundamental structure for every web page. 'Hypertext' refers to the links that connect pages, and 'Markup Language' means you use special tags to tell the browser how to display the content. It’s the very first thing you need to learn in web development.",
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
      content: "Think of HTML tags like giving instructions to a very obedient robot (your web browser). You can't just write a sentence and expect it to know it's a headline. You have to wrap it in 'instruction tags' to give it meaning.\n\nFor example, to create a big, important title, you use &lt;h1&gt;. Think of it as telling the robot, 'Make this a top-level headline!' For less important subheadings, you can use &lt;h2&gt;, &lt;h3&gt;, and so on. For any regular paragraph of text, you simply wrap it in &lt;p&gt; tags.\n\nWhat if you want to make a word stand out? To make text bold and show it's important, you use &lt;strong&gt;. To emphasize a word, you can use &lt;em&gt;, which usually makes it italic. It's like adding tone of voice to your text!",
      keyTopics: ["Headings (h1-h6)", "Paragraphs (p)", "Bold (strong)", "Italic (em)", "Line Breaks (br)"],
      codeExamples: [
        {
          title: "Text Formatting",
          code: `<h1>Main Heading</h1>
<h2>Sub-heading</h2>
<p>This is a paragraph. <strong>This text is important (bold).</strong> It is different from <em>emphasized (italic) text.</em></p>
<p>You can also<br>add a line break.</p>`
        }
      ]
    },
    {
      title: "Links and Images",
      content: "What makes the web 'the web'? Links! A link, or hyperlink, lets you connect your page to another. You create one with the &lt;a&gt; (anchor) tag. The 'href' attribute holds the destination URL, like a street address for your link.\n\nTo make your page more visual, you use the &lt;img&gt; tag to add pictures. This tag needs two things: a 'src' (source) attribute to tell it where to find the image, and an 'alt' (alternative) attribute. The 'alt' text is super important—it describes the image for visually impaired users and also shows up if the image can't load.",
      keyTopics: ["Anchor Tag (a)", "Image Tag (img)", "href attribute", "src attribute", "alt attribute"],
      codeExamples: [
        {
          title: "Creating a Link and Embedding an Image",
          code: `<p>Visit our <a href="https://www.example.com" target="_blank">official website</a> in a new tab.</p>
<img src="images/logo.png" alt="The company logo, a blue bird flying.">`
        }
      ]
    },
    {
      title: "Lists",
      content: "Sometimes you need to organize information into a list. HTML gives you two options. If the order doesn't matter, like a grocery list, you use an unordered list (&lt;ul&gt;) to get bullet points. If the order is crucial, like step-by-step instructions, you use an ordered list (&lt;ol&gt;) to get numbers. Either way, each item in the list gets its own &lt;li&gt; (list item) tag.",
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
  <li>First, preheat the oven.</li>
  <li>Next, mix the ingredients.</li>
  <li>Finally, bake for 20 minutes.</li>
</ol>`
        }
      ]
    },
    {
      title: "Tables",
      content: "When you have data that belongs in a grid, like a price list or a schedule, tables are the perfect tool. You start with a &lt;table&gt; tag. Inside, you build the table row by row with &lt;tr&gt; (table row) tags. For the column titles, you use &lt;th&gt; (table header) to make them stand out. For all the regular data cells, you use &lt;td&gt; (table data). A quick warning: only use tables for data, not for laying out your whole page!",
      keyTopics: ["<table>", "<tr>", "<th>", "<td>", "Table Headers"],
      codeExamples: [
        {
          title: "Simple Data Table",
          code: `<table>
  <tr>
    <th>Firstname</th>
    <th>Lastname</th>
    <th>Age</th>
  </tr>
  <tr>
    <td>John</td>
    <td>Doe</td>
    <td>30</td>
  </tr>
  <tr>
    <td>Jane</td>
    <td>Smith</td>
    <td>25</td>
  </tr>
</table>`
        }
      ]
    },
    {
      title: "Forms and User Input",
      content: "Forms are how you let users talk back to your website—whether it's a search bar, a login page, or a contact form. You start with a &lt;form&gt; tag, which acts as a container. Inside, the &lt;input&gt; tag is your best friend. By changing its 'type' attribute, it can become a text box, a password field, a checkbox, or a radio button. To make your forms accessible, always pair your inputs with a &lt;label&gt; tag. It tells users exactly what information you're asking for.",
      keyTopics: ["<form>", "<input>", "<textarea>", "<label>", "<button>", "Input Types"],
      codeExamples: [
        {
          title: "Simple Login Form",
          code: `<form action="/submit-data" method="post">
  <div>
    <label for="username">Username:</label>
    <input type="text" id="username" name="username">
  </div>
  <div>
    <label for="password">Password:</label>
    <input type="password" id="password" name="password">
  </div>
  <button type="submit">Submit</button>
</form>`
        }
      ]
    },
    {
      title: "Semantic HTML5 Elements",
      content: "Imagine building a house with only one type of brick for everything—walls, floors, and the roof. It would be a confusing mess! Early websites were often built like that, using a generic &lt;div&gt; tag for everything.\n\nSemantic HTML is like having specialized bricks: &lt;header&gt; for the top of your page, &lt;footer&gt; for the bottom, &lt;nav&gt; for your navigation links, and &lt;main&gt; for your primary content. These tags don't just change how things look; they give *meaning* to your content. This is incredibly helpful for search engines like Google to understand your site and for assistive technologies like screen readers to help visually impaired users navigate. It makes your website smarter and more accessible for everyone.",
      keyTopics: ["<header>", "<footer>", "<nav>", "<main>", "<article>", "<section>", "<aside>"],
      codeExamples: [
        {
          title: "Semantic Page Layout",
          code: `<header>
  <h1>My Awesome Blog</h1>
  <nav>
    <a href="/home">Home</a>
    <a href="/about">About</a>
  </nav>
</header>
<main>
  <article>
    <h2>My First Post</h2>
    <p>This is the content of my first blog post.</p>
  </article>
</main>
<footer>
  <p>Copyright &copy; 2025</p>
</footer>`
        }
      ]
    },
    {
      title: "Multimedia in HTML",
      content: "With HTML5, adding media became incredibly simple. You no longer need clunky plugins to play sounds or videos. Just use the &lt;audio&gt; or &lt;video&gt; tag. If you add the 'controls' attribute, the browser will automatically show a play/pause button, a volume slider, and more. You can even provide multiple file formats using the &lt;source&gt; tag, so if a user's browser can't play one type, it has a fallback option.",
      keyTopics: ["<audio>", "<video>", "controls attribute", "source tag"],
      codeExamples: [
        {
          title: "Embedding Audio and Video",
          code: `<h4>Audio Player</h4>
<audio controls>
  <source src="sound.mp3" type="audio/mpeg">
  <source src="sound.ogg" type="audio/ogg">
  Your browser does not support the audio element.
</audio>

<h4>Video Player</h4>
<video width="320" height="240" controls>
  <source src="movie.mp4" type="video/mp4">
  <source src="movie.webm" type="video/webm">
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
    "Using non-semantic tags like &lt;div&gt; for everything.",
    "Not using the 'label' element for form inputs, which hurts accessibility."
  ],
  careerRelevance: "HTML is the foundational skill for all web development roles. Mastery of HTML is essential for front-end developers, back-end developers, and full-stack developers."
};

export default html5Content;
