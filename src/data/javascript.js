const javascriptContent = {
  id: "javascript",
  tier: 1,
  name: "JavaScript",
  description: "JavaScript is the programming language of the Web. It is used to make web pages interactive and dynamic, from simple animations to complex web applications.",
  difficulty: "beginner",
  estimatedHours: 25,
  prerequisites: ["html5", "css3"],
  learningObjectives: [
    "Understand core programming concepts: variables, data types, and operators.",
    "Learn to control program flow with conditional statements and loops.",
    "Grasp the fundamentals of functions and scope.",
    "Be able to manipulate the HTML DOM to create interactive pages.",
    "Understand the basics of asynchronous JavaScript with Promises and async/await."
  ],
  sections: [
    {
      id: "javascript-language-of-the-web",
      title: "The Language of the Web",
      content: "If HTML is the skeleton and CSS is the clothing, then JavaScript is the brain and muscles. It's what makes a webpage come alive! JavaScript allows you to react to user actions, like clicks and keyboard presses, update content on the page without reloading, and perform complex calculations. It's the engine that powers almost every interactive website you use, from social media feeds to online games.",
      keyTopics: ["What is JavaScript?", "Client-Side vs. Server-Side (Node.js)", "The 'script' tag"],
      codeExamples: [
        {
          title: "Your First JavaScript",
          code: `// You can write JavaScript directly in your browser's developer console!
console.log('Hello, World!');

// This line will find an HTML element with the id 'greeting' and change its text.
document.getElementById('greeting').textContent = 'Hello from JavaScript!';`
        }
      ]
    },
    {
      id: "javascript-variables-and-data-types",
      title: "Variables and Data Types",
      content: "Imagine you need to store information, like a user's name or the score in a game. You need a container for that data. In JavaScript, these containers are called 'variables'. Variables can hold different types of data, such as numbers (like 10), strings of text (like 'Alice'), booleans (true or false), and more complex types like objects and arrays. Using 'let' and 'const' to declare variables is the modern standard.",
      keyTopics: ["let, const, var", "Strings", "Numbers", "Booleans", "Objects", "Arrays"],
      codeExamples: [
        {
          title: "Declaring Variables",
          code: `let score = 0; // A number that can be changed
const playerName = "Gandalf"; // A string that cannot be changed

let isGameOver = false; // A boolean value

const user = { // An object to hold related data
  name: "Frodo",
  level: 5
};

const inventory = ["ring", "sword", "lembas bread"]; // An array (a list) of items`
        }
      ]
    },
    {
      id: "javascript-functions",
      title: "Functions: Reusable Blocks of Code",
      content: "Functions are one of the most important building blocks in programming. Think of them as recipes. You define a recipe (the function) once, and then you can use it over and over again just by calling its name. Functions can take inputs (called 'parameters') and can return an output. This helps you organize your code, avoid repetition, and make your programs much more powerful and manageable.",
      keyTopics: ["Function Declaration", "Function Expression", "Arrow Functions", "Parameters and Arguments", "Return values"],
      codeExamples: [
        {
          title: "Defining and Calling a Function",
          code: `// A simple function declaration
function greet(name) {
  return "Hello, " + name + "!";
}

// Calling the function and storing its output
const greeting = greet("Aragorn");
console.log(greeting); // Outputs: "Hello, Aragorn!"

// An arrow function, a more modern syntax
const add = (a, b) => {
  return a + b;
};

const sum = add(5, 3);
console.log(sum); // Outputs: 8`
        }
      ]
    },
    {
      id: "javascript-dom-manipulation",
      title: "DOM Manipulation",
      content: "The DOM (Document Object Model) is a tree-like representation of your HTML page. JavaScript has the power to change this tree. You can find elements, create new ones, remove old ones, and change their styles or content. This is the magic behind interactive web pages! When you click a 'like' button and the count goes up without the page reloading, that's JavaScript manipulating the DOM.",
      keyTopics: ["What is the DOM?", "getElementById", "querySelector", "createElement", "addEventListener"],
      codeExamples: [
        {
          title: "Changing the Page with the DOM",
          code: `// Find the button element
const myButton = document.getElementById('action-button');

// Add a 'click' event listener
myButton.addEventListener('click', () => {
  // When the button is clicked...
  const title = document.querySelector('h1');
  title.textContent = "You clicked the button!";
  title.style.color = 'purple';
});`
        }
      ]
    },
    {
      id: "javascript-asynchronous",
      title: "Asynchronous JavaScript",
      content: "JavaScript can only do one thing at a time. But what if you need to do something that takes a long time, like fetching data from a server across the internet? You don't want your entire webpage to freeze while you wait! Asynchronous JavaScript is the solution. It lets you start a long-running task, and your code can continue doing other things. When the task is finished, your code is notified. 'Promises' and the 'async/await' syntax are the modern tools for handling this.",
      keyTopics: ["The Event Loop", "Callbacks", "Promises (.then, .catch)", "async/await"],
      codeExamples: [
        {
          title: "Fetching Data with async/await",
          code: `// This function fetches user data from an API
async function getUser(username) {
  try {
    const response = await fetch(\`https://api.github.com/users/\${username}\`);
    if (!response.ok) {
      throw new Error('User not found!');
    }
    const userData = await response.json();
    console.log(userData.name);
  } catch (error) {
    console.error("Could not fetch user:", error);
  }
}

// Call the async function
getUser('octocat');`
        }
      ]
    }
  ],
  aiPrompts: [
    "Explain the difference between 'let', 'const', and 'var' and when to use each.",
    "What is the difference between '==' and '===' in JavaScript?",
    "Create a simple to-do list application using only vanilla JavaScript and DOM manipulation."
  ],
  resources: [
    { title: "MDN Web Docs: JavaScript", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
    { title: "JavaScript.info", url: "https://javascript.info/" },
    { title: "freeCodeCamp: JavaScript Algorithms and Data Structures", url: "https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/" }
  ],
  toolsRequired: ["A modern web browser with developer tools", "A text editor (e.g., VS Code)"],
  bestPractices: [
    "Always use 'const' by default and 'let' only when you know a variable needs to be reassigned.",
    "Use strict equality ('===') instead of loose equality ('==') to avoid unexpected type coercion.",
    "Keep your code organized in functions and modules.",
    "Comment your code to explain the 'why', not the 'what'."
  ],
  commonPitfalls: [
    "Confusing 'undefined' and 'null'.",
    "Not understanding variable scope, leading to unexpected behavior.",
    "Manipulating the DOM too frequently, which can cause performance issues.",
    "Forgetting to handle errors in asynchronous operations."
  ],
  careerRelevance: "JavaScript is the most popular programming language in the world and a fundamental skill for virtually all web development roles (front-end, back-end, and full-stack). It has also expanded into mobile apps, desktop apps, and IoT."
};

export default javascriptContent;
