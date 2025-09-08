const jsonContent = {
  id: "json",
  tier: 1,
  name: "JSON",
  description: "An introductory guide to JSON, the standard format for data interchange on the web. Learn its syntax, data types, and how to use it in web applications.",
  difficulty: "beginner",
  estimatedHours: 2,
  prerequisites: ["html5", "javascript"],
  learningObjectives: [
    "Understand what JSON is and why it's important.",
    "Learn the basic syntax and structure of JSON.",
    "Differentiate between JSON data types: strings, numbers, booleans, arrays, and objects.",
    "Understand how to parse JSON in JavaScript.",
    "Learn how to create and serialize JavaScript objects into JSON strings.",
    "Recognize the use of JSON in APIs and configuration files."
  ],
  sections: [
    {
      title: "Introduction to JSON",
      content: "JSON, which stands for JavaScript Object Notation, is a lightweight format for storing and transporting data. It's often used when data is sent from a server to a web page. Despite its name, JSON is language-independent, with parsers available for most programming languages.",
      keyTopics: ["Data Interchange", "Lightweight Format", "Human-Readable"],
      codeExamples: []
    },
    {
      title: "JSON Syntax and Structure",
      content: "JSON syntax is derived from JavaScript object notation syntax, but it is a text format only. Data is in name/value pairs, separated by commas. Curly braces hold objects, and square brackets hold arrays.",
      keyTopics: ["Key-Value Pairs", "Objects", "Arrays"],
      codeExamples: [
        {
          title: "JSON Object Example",
          code: `{
  "firstName": "John",
  "lastName": "Doe",
  "age": 30,
  "isStudent": false
}`
        },
        {
          title: "JSON Array Example",
          code: `[
  "apple",
  "banana",
  "orange"
]`
        }
      ]
    },
    {
      title: "JSON Data Types",
      content: "JSON supports several fundamental data types that can be combined to create complex data structures.",
      keyTopics: ["String", "Number", "Boolean", "Array", "Object", "Null"],
      codeExamples: [
        {
          title: "Example of All Data Types",
          code: `{
  "employeeName": "Jane Smith",
  "employeeId": 12345,
  "isManager": true,
  "departments": ["HR", "Finance", "IT"],
  "contactInfo": {
    "email": "jane.smith@example.com",
    "phone": "555-0102"
  },
  "supervisor": null
}`
        }
      ]
    },
    {
      title: "Using JSON in JavaScript",
      content: "JavaScript provides built-in methods to work with JSON. The `JSON.parse()` method converts a JSON string into a JavaScript object, while `JSON.stringify()` converts a JavaScript object into a JSON string. This is essential for sending and receiving data from a server.",
      keyTopics: ["JSON.parse()", "JSON.stringify()", "Serialization", "Deserialization"],
      codeExamples: [
        {
          title: "Parsing a JSON String",
          code: `const jsonString = '{"name":"Alice","age":25}';
const userObject = JSON.parse(jsonString);

console.log(userObject.name); // Output: Alice`
        },
        {
          title: "Creating a JSON String",
          code: `const car = {
  make: "Ford",
  model: "Mustang",
  year: 2022
};

const jsonCar = JSON.stringify(car);

console.log(jsonCar);
// Output: {"make":"Ford","model":"Mustang","year":2022}`
        }
      ]
    },
    {
      title: "Common Use Cases",
      content: "JSON is ubiquitous in modern web development. Its primary use is for transmitting data between a server and a web application in APIs. It's also widely used for configuration files (like in `package.json`), and for storing structured data in NoSQL databases.",
      keyTopics: ["APIs", "Configuration Files", "NoSQL Databases"],
      codeExamples: []
    }
  ],
  aiPrompts: [
    "Explain JSON as if I were a librarian organizing books.",
    "Give me an example of a JSON object representing a recipe.",
    "What is the difference between a JSON object and a JavaScript object?",
    "How do I handle nested objects when parsing JSON in JavaScript?",
    "Write a JSON array of three user objects, each with a name and email."
  ],
  resources: [
    {
      title: "MDN Web Docs: JSON",
      url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON"
    },
    {
      title: "JSON.org",
      url: "https://www.json.org/json-en.html"
    },
    {
      title: "W3Schools JSON Tutorial",
      url: "https://www.w3schools.com/js/js_json_intro.asp"
    }
  ],
  toolsRequired: ["Text Editor / IDE", "Web Browser"],
  bestPractices: [
    "Always use double quotes for keys and string values.",
    "Validate your JSON using a linter or online tool to catch syntax errors.",
    "Keep JSON structures as simple as possible while still meeting requirements.",
    "Use consistent naming conventions for keys (e.g., camelCase)."
  ],
  commonPitfalls: [
    "Using single quotes instead of double quotes.",
    "Forgetting to quote keys.",
    "Adding a trailing comma after the last element in an object or array.",
    "Incorrectly nesting objects and arrays."
  ],
  careerRelevance: "Understanding JSON is non-negotiable for any web developer. It is the backbone of communication for modern APIs and is used in virtually every web application. Proficiency with JSON is a fundamental skill for frontend, backend, and full-stack roles."
};

export default jsonContent;
