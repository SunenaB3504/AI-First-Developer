const devtoolsContent = {
  id: "devtools",
  tier: 1,
  name: "Browser Dev Tools",
  description: "The Browser Developer Tools are a set of powerful tools built into modern web browsers, allowing developers to inspect, debug, and profile their web applications.",
  difficulty: "beginner",
  estimatedHours: 10,
  prerequisites: ["html5", "css3", "javascript"],
  learningObjectives: [
    "Learn how to open and navigate the developer tools in major browsers.",
    "Be able to inspect and modify HTML and CSS in real-time using the Elements panel.",
    "Understand how to use the Console to log information and debug JavaScript.",
    "Learn to monitor network requests and responses in the Network tab.",
    "Get a basic understanding of performance profiling with the Performance tab."
  ],
  sections: [
    {
      id: "devtools-swiss-army-knife",
      title: "Your Web Development Swiss Army Knife",
      content: "Every modern web browser comes with a powerful secret weapon for developers: the Developer Tools (or DevTools). Think of it as an X-ray machine, a mechanic's garage, and a science lab for your website, all rolled into one. You can open it with a simple keyboard shortcut (usually F12 or Ctrl+Shift+I / Cmd+Opt+I). These tools give you an under-the-hood look at what's happening on a webpage, making it essential for building, debugging, and optimizing.",
      keyTopics: ["What are DevTools?", "Opening DevTools", "Main Panels Overview"],
      codeExamples: [
        {
          title: "A Quick Peek",
          code: `// There's no code to write to *use* the DevTools!
// Simply open them on any webpage and start exploring.
// A great first step is to right-click on any element on a page and choose 'Inspect'.
// This will open the DevTools with that specific element highlighted in the Elements panel.`
        }
      ]
    },
    {
      id: "devtools-elements-panel",
      title: "The Elements Panel: Your Live HTML & CSS Editor",
      content: "The Elements panel is like a live, editable version of your website's source code. It shows you the HTML structure as a DOM tree. You can select any element and see all the CSS rules that apply to it, including which ones are being overridden. The best part? You can change things directly in the panel! Want to see how a button looks in a different color? Just change the CSS value and see the result instantly. It's perfect for tweaking styles and diagnosing layout issues.",
      keyTopics: ["Inspecting Elements", "The DOM Tree", "Viewing and Editing CSS", "The Box Model Visualizer"],
      codeExamples: [
        {
          title: "Live CSS Editing",
          code: `/*
1. Open DevTools and go to the Elements panel.
2. Select an element, like a button or a heading.
3. In the 'Styles' pane on the right, find a CSS property like 'color' or 'background-color'.
4. Click on the value (e.g., 'blue') and type a new one (e.g., 'red').
5. Watch the element change on the page in real-time!
*/`
        }
      ]
    },
    {
      id: "devtools-console",
      title: "The Console: Your JavaScript Playground",
      content: "The Console is your direct line of communication with the JavaScript running on a page. It's an interactive command line where you can type and execute JavaScript code. Developers constantly use `console.log()` in their code to print out the values of variables, helping them understand what's happening at different stages. The console also displays errors and warnings, which are crucial clues for finding and fixing bugs in your scripts.",
      keyTopics: ["Logging with console.log()", "Running JavaScript code", "Viewing Errors and Warnings", "The Console API"],
      codeExamples: [
        {
          title: "Debugging with the Console",
          code: `function calculateTotal(price, quantity) {
  console.log('Calculating total for price:', price, 'and quantity:', quantity);
  const total = price * quantity;
  console.log('Calculated total is:', total);
  return total;
}

// When you run this, you'll see the log messages in the console,
// helping you trace the function's execution.
const finalPrice = calculateTotal(10, 5);`
        }
      ]
    },
    {
      id: "devtools-network-tab",
      title: "The Network Tab: Watching the Wires",
      content: "A modern webpage rarely consists of a single HTML file. It loads CSS, JavaScript, images, fonts, and often communicates with servers to get data (this is called an API request). The Network tab shows you every single one of these network requests. You can see how long each file took to load, how large it is, and whether the request was successful. It's an indispensable tool for diagnosing slow-loading pages and for debugging communication with a backend server.",
      keyTopics: ["Monitoring Requests", "Filtering Requests", "Inspecting Request/Response Headers", "Checking Status Codes (200, 404, 500)"],
      codeExamples: [
        {
          title: "What to Look For",
          code: `/*
1. Open DevTools and switch to the Network tab.
2. Refresh the page.
3. You'll see a waterfall chart of all assets loading.
4. Look for any requests that are red - these have failed (e.g., a 404 Not Found error).
5. Click on a request to see detailed information, like its size, how long it took, and the data it returned.
*/`
        }
      ]
    }
  ],
  aiPrompts: [
    "Explain how to use the DevTools to find out why a specific CSS style is not being applied.",
    "What is the difference between the 'Sources' panel and the 'Elements' panel?",
    "How would you use the Network tab to check if an API is returning the correct data?"
  ],
  resources: [
    { title: "Chrome DevTools Documentation", url: "https://developer.chrome.com/docs/devtools/" },
    { title: "Firefox Developer Tools Guide", url: "https://developer.mozilla.org/en-US/docs/Tools" },
    { title: "A Beginner's Guide to Browser Developer Tools", url: "https://www.freecodecamp.org/news/what-is-browser-developer-tools/" }
  ],
  toolsRequired: ["A modern web browser like Chrome or Firefox"],
  bestPractices: [
    "Use `console.log()` liberally during development to understand your code's flow, but remove it before deploying to production.",
    "Use the device toolbar to simulate how your site looks on different mobile devices.",
    "Regularly check the Console for errors, even if your site seems to be working.",
    "When debugging CSS, start by inspecting the element in the Elements panel."
  ],
  commonPitfalls: [
    "Ignoring console errors.",
    "Editing files in the 'Sources' panel and forgetting that the changes are temporary and will be lost on refresh.",
    "Not clearing the cache when debugging network issues, leading to confusion with old files."
  ],
  careerRelevance: "Proficiency with browser developer tools is not just a nice-to-have; it's a fundamental, non-negotiable skill for every front-end and full-stack developer. It is used every single day to build, debug, and optimize web applications."
};

export default devtoolsContent;
