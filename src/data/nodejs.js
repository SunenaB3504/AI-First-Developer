const nodejsContent = {
  id: "nodejs",
  tier: 2,
  name: "Node.js",
  description: "Node.js is a powerful JavaScript runtime built on Chrome's V8 engine that allows you to run JavaScript on the server-side. It's designed for building scalable network applications and is particularly well-suited for real-time applications, APIs, and microservices.",
  difficulty: "intermediate",
  estimatedHours: 40,
  prerequisites: ["javascript", "json"],
  learningObjectives: [
    "Understand Node.js fundamentals and event-driven architecture",
    "Master asynchronous programming with callbacks, promises, and async/await",
    "Build RESTful APIs using Express.js framework",
    "Work with file system operations and data persistence",
    "Implement error handling and debugging techniques",
    "Deploy Node.js applications to production environments",
    "Understand package management with npm",
    "Create real-time applications with WebSockets",
    "Implement authentication and security best practices",
    "Optimize Node.js applications for performance and scalability"
  ],
  sections: [
    {
      id: "nodejs-introduction",
      title: "Introduction to Node.js",
      content: "Think of Node.js as giving JavaScript superpowers to work outside the browser. Traditionally, JavaScript was confined to web browsers, but Node.js breaks those chains by providing a runtime environment that lets JavaScript run directly on your computer or server.\n\nImagine you're a chef in a kitchen. In the browser, JavaScript is like a pastry chef who only makes desserts. But with Node.js, JavaScript becomes a master chef who can prepare appetizers, main courses, and even manage the entire restaurant! Node.js uses the same V8 engine that powers Google Chrome, so it's incredibly fast and efficient.\n\nThe key innovation of Node.js is its **event-driven, non-blocking I/O model**. Instead of waiting for one task to complete before starting another (like waiting for water to boil before chopping vegetables), Node.js can handle multiple tasks simultaneously, making it perfect for applications that need to handle many concurrent connections.",
      keyTopics: [
        "What is Node.js?",
        "JavaScript runtime environment",
        "Event-driven architecture",
        "Non-blocking I/O model",
        "V8 engine",
        "Server-side JavaScript"
      ],
      practicalExercises: [
        "Install Node.js and verify installation with `node --version`",
        "Create a simple 'Hello World' script and run it",
        "Explore Node.js REPL (Read-Eval-Print Loop) interactive shell",
        "Check available Node.js modules with `node -p 'Object.keys(global)'`"
      ],
      codeExamples: [
        {
          title: "Hello World in Node.js",
          code: `// hello.js
console.log('Hello, Node.js World!');

// Run with: node hello.js`
        },
        {
          title: "Basic Node.js Information",
          code: `// info.js
console.log('Node.js Version:', process.version);
console.log('Platform:', process.platform);
console.log('Architecture:', process.arch);
console.log('Current Directory:', process.cwd());

// Run with: node info.js`
        }
      ]
    },
    {
      id: "nodejs-modules",
      title: "Modules and npm",
      content: "Modules in Node.js are like LEGO blocks for your applications. Each module contains specific functionality that you can use in your programs. Think of npm (Node Package Manager) as a massive LEGO store where developers share their creations.\n\nNode.js comes with several built-in modules (called core modules) that provide essential functionality. For example, the `fs` module lets you work with files, the `http` module helps you create web servers, and the `path` module helps you work with file paths.\n\nBut the real power comes from npm packages. With over 1.5 million packages available, you can find solutions for almost any problem. Whether you need to send emails, process images, or connect to databases, there's probably an npm package that can help.\n\nThe `package.json` file is like the blueprint for your Node.js project. It contains metadata about your project, lists all the dependencies, and defines scripts for common tasks like running tests or starting your application.",
      keyTopics: [
        "CommonJS modules",
        "Built-in core modules",
        "npm package manager",
        "package.json structure",
        "Semantic versioning",
        "Local vs global packages"
      ],
      practicalExercises: [
        "Initialize a new Node.js project with `npm init`",
        "Install local packages like `lodash` and `express`",
        "Create custom modules and export functions",
        "Use npm scripts to automate common tasks",
        "Check package vulnerabilities with `npm audit`"
      ],
      codeExamples: [
        {
          title: "Creating and Using Custom Modules",
          code: `// math.js - Custom module
function add(a, b) {
  return a + b;
}

function multiply(a, b) {
  return a * b;
}

module.exports = {
  add,
  multiply
};

// app.js - Using the custom module
const math = require('./math');

console.log('Addition:', math.add(5, 3));
console.log('Multiplication:', math.multiply(5, 3));`
        },
        {
          title: "package.json Example",
          code: `{
  "name": "my-node-app",
  "version": "1.0.0",
  "description": "A simple Node.js application",
  "main": "app.js",
  "scripts": {
    "start": "node app.js",
    "dev": "nodemon app.js",
    "test": "jest"
  },
  "dependencies": {
    "express": "^4.18.0",
    "lodash": "^4.17.21"
  },
  "devDependencies": {
    "jest": "^29.0.0",
    "nodemon": "^2.0.20"
  },
  "author": "Your Name",
  "license": "MIT"
}`
        }
      ]
    },
    {
      id: "nodejs-async",
      title: "Asynchronous Programming",
      content: "Asynchronous programming is the heart and soul of Node.js. It's what makes Node.js so powerful for handling multiple tasks simultaneously. Think of it like a busy restaurant kitchen where chefs don't wait for one dish to finish cooking before starting another.\n\nIn traditional synchronous programming, if you make a request to a database or read a file, your program waits (blocks) until that operation completes. But in Node.js, you can start multiple operations and handle their results when they're ready through callbacks, promises, or async/await.\n\n**Callbacks** are functions that get executed when an asynchronous operation completes. They're the foundation of Node.js async programming.\n\n**Promises** provide a cleaner way to handle asynchronous operations. They represent a value that might be available now, or in the future, or never.\n\n**Async/await** is syntactic sugar built on top of promises that makes asynchronous code look and behave like synchronous code, making it much easier to read and maintain.",
      keyTopics: [
        "Synchronous vs asynchronous programming",
        "Callback functions",
        "Promise-based programming",
        "Async/await syntax",
        "Error handling in async code",
        "Event loop and concurrency"
      ],
      practicalExercises: [
        "Convert callback-based code to promises",
        "Use async/await to simplify promise chains",
        "Handle errors in asynchronous operations",
        "Create custom promise-based functions",
        "Understand the Node.js event loop with examples"
      ],
      codeExamples: [
        {
          title: "Callback Example - File Reading",
          code: `const fs = require('fs');

// Asynchronous file reading with callback
fs.readFile('example.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }
  console.log('File content:', data);
});

console.log('This runs before the file is read!');`
        },
        {
          title: "Promise Example",
          code: `const fs = require('fs').promises;

// Promise-based file reading
async function readFileContent() {
  try {
    const data = await fs.readFile('example.txt', 'utf8');
    console.log('File content:', data);
  } catch (error) {
    console.error('Error reading file:', error);
  }
}

readFileContent();
console.log('This runs before the file is read!');`
        },
        {
          title: "Async/Await with Multiple Operations",
          code: `const fs = require('fs').promises;

async function processFiles() {
  try {
    // Read multiple files concurrently
    const [file1, file2, file3] = await Promise.all([
      fs.readFile('file1.txt', 'utf8'),
      fs.readFile('file2.txt', 'utf8'),
      fs.readFile('file3.txt', 'utf8')
    ]);

    console.log('All files read successfully!');
    console.log('File 1 length:', file1.length);
    console.log('File 2 length:', file2.length);
    console.log('File 3 length:', file3.length);

    // Process the data
    const combined = file1 + file2 + file3;
    await fs.writeFile('combined.txt', combined);
    console.log('Combined file written successfully!');

  } catch (error) {
    console.error('Error processing files:', error);
  }
}

processFiles();`
        }
      ]
    },
    {
      id: "nodejs-express",
      title: "Building APIs with Express.js",
      content: "Express.js is like the friendly neighborhood framework that makes building web applications with Node.js much easier. Think of it as a toolbox that provides all the essential tools you need to build robust web applications and APIs.\n\nWithout Express.js, you'd have to manually handle every aspect of HTTP requests and responses using Node.js's built-in `http` module. Express.js abstracts away the complexity and provides a clean, intuitive API for:\n\n- **Routing**: Directing requests to the appropriate handlers\n- **Middleware**: Processing requests before they reach your route handlers\n- **Template Engines**: Rendering dynamic HTML pages\n- **Static Files**: Serving CSS, JavaScript, and image files\n- **Error Handling**: Centralized error management\n\nExpress.js follows the middleware pattern, where requests flow through a series of functions (middleware) that can modify the request, perform authentication, logging, or any other processing before the final response is sent.\n\nRESTful APIs built with Express.js typically handle CRUD operations (Create, Read, Update, Delete) for resources. Each resource has its own URL endpoint and supports different HTTP methods like GET, POST, PUT, and DELETE.",
      keyTopics: [
        "Express.js fundamentals",
        "Routing and route parameters",
        "Middleware functions",
        "Request and response objects",
        "RESTful API design",
        "Error handling and validation"
      ],
      practicalExercises: [
        "Create a basic Express server with multiple routes",
        "Implement CRUD operations for a simple resource",
        "Add middleware for logging and authentication",
        "Handle form data and file uploads",
        "Implement input validation and error handling",
        "Create API documentation with route examples"
      ],
      codeExamples: [
        {
          title: "Basic Express Server",
          code: `const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to our API!' });
});

// Route with parameters
app.get('/users/:id', (req, res) => {
  const userId = req.params.id;
  res.json({ userId, name: 'John Doe', email: 'john@example.com' });
});

// POST route
app.post('/users', (req, res) => {
  const { name, email } = req.body;
  // In a real app, you'd save to a database
  res.status(201).json({
    id: Date.now(),
    name,
    email,
    createdAt: new Date()
  });
});

app.listen(PORT, () => {
  console.log(\`Server running on http://localhost:\${PORT}\`);
});`
        },
        {
          title: "Express Middleware Example",
          code: `const express = require('express');
const app = express();

// Custom logging middleware
app.use((req, res, next) => {
  console.log(\`\${new Date().toISOString()} - \${req.method} \${req.url}\`);
  next(); // Pass control to next middleware
});

// Authentication middleware
const authenticate = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ error: 'Access denied' });
  }

  // In a real app, you'd verify the token
  if (token !== 'valid-token') {
    return res.status(401).json({ error: 'Invalid token' });
  }

  next();
};

// Protected route
app.get('/protected', authenticate, (req, res) => {
  res.json({ message: 'You have access to protected content!' });
});

// Error handling middleware (must be last)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(3000, () => {
  console.log('Server with middleware running on port 3000');
});`
        },
        {
          title: "RESTful API with CRUD Operations",
          code: `const express = require('express');
const app = express();

app.use(express.json());

// In-memory "database" for demo purposes
let users = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
];

// GET /users - Get all users
app.get('/users', (req, res) => {
  res.json(users);
});

// GET /users/:id - Get single user
app.get('/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
});

// POST /users - Create new user
app.post('/users', (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }

  const newUser = {
    id: users.length + 1,
    name,
    email
  };

  users.push(newUser);
  res.status(201).json(newUser);
});

// PUT /users/:id - Update user
app.put('/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ error: 'User not found' });

  const { name, email } = req.body;
  if (name) user.name = name;
  if (email) user.email = email;

  res.json(user);
});

// DELETE /users/:id - Delete user
app.delete('/users/:id', (req, res) => {
  const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
  if (userIndex === -1) return res.status(404).json({ error: 'User not found' });

  users.splice(userIndex, 1);
  res.json({ message: 'User deleted successfully' });
});

app.listen(3000, () => {
  console.log('RESTful API running on port 3000');
});`
        }
      ]
    },
    {
      id: "nodejs-filesystem",
      title: "File System Operations",
      content: "Working with files is one of the most common tasks in server-side programming. Node.js provides the `fs` (File System) module that gives you powerful tools to read, write, update, and delete files. Think of it as your application's personal librarian who can organize, store, and retrieve information from the filing cabinet of your computer's hard drive.\n\nThe `fs` module offers both synchronous and asynchronous methods. The synchronous methods (ending with 'Sync') block the execution until the operation completes, while the asynchronous methods use callbacks or return promises, allowing your application to continue processing other tasks.\n\nFor modern Node.js applications, it's recommended to use the promise-based versions of the fs methods or convert them using `util.promisify()`. This makes your code cleaner and easier to work with async/await.\n\nCommon file operations include:\n- **Reading files**: Getting content from text files, JSON files, or binary data\n- **Writing files**: Creating new files or overwriting existing ones\n- **Appending data**: Adding content to existing files\n- **Directory operations**: Creating, reading, and deleting directories\n- **File information**: Checking file size, permissions, modification dates\n- **Watching files**: Monitoring files for changes",
      keyTopics: [
        "fs module basics",
        "Synchronous vs asynchronous operations",
        "Reading and writing files",
        "Working with directories",
        "File streams for large files",
        "File permissions and metadata"
      ],
      practicalExercises: [
        "Read and display content from multiple text files",
        "Create a simple file-based data storage system",
        "Implement file upload functionality",
        "Build a directory tree viewer",
        "Create a file watcher that logs changes",
        "Implement backup and restore functionality"
      ],
      codeExamples: [
        {
          title: "Basic File Operations",
          code: `const fs = require('fs').promises;
const path = require('path');

async function demonstrateFileOperations() {
  const filePath = 'example.txt';
  const content = 'Hello, Node.js File System!\\nThis is a test file.';

  try {
    // Write file
    await fs.writeFile(filePath, content);
    console.log('File written successfully');

    // Read file
    const data = await fs.readFile(filePath, 'utf8');
    console.log('File content:', data);

    // Append to file
    await fs.appendFile(filePath, '\\nAppended content!');
    console.log('Content appended successfully');

    // Check file stats
    const stats = await fs.stat(filePath);
    console.log('File size:', stats.size, 'bytes');
    console.log('Last modified:', stats.mtime);

    // Read updated content
    const updatedData = await fs.readFile(filePath, 'utf8');
    console.log('Updated content:', updatedData);

  } catch (error) {
    console.error('Error:', error);
  }
}

demonstrateFileOperations();`
        },
        {
          title: "Directory Operations",
          code: `const fs = require('fs').promises;
const path = require('path');

async function manageDirectories() {
  const dirPath = 'my-project';

  try {
    // Create directory
    await fs.mkdir(dirPath);
    console.log('Directory created');

    // Create subdirectory
    await fs.mkdir(path.join(dirPath, 'src'));
    await fs.mkdir(path.join(dirPath, 'tests'));

    // Create files in directories
    await fs.writeFile(path.join(dirPath, 'src', 'app.js'), 'console.log("Hello!");');
    await fs.writeFile(path.join(dirPath, 'tests', 'app.test.js'), 'describe("App", () => {});');

    // List directory contents
    const rootContents = await fs.readdir(dirPath);
    console.log('Root directory:', rootContents);

    const srcContents = await fs.readdir(path.join(dirPath, 'src'));
    console.log('Src directory:', srcContents);

    // Check if path exists
    const exists = await fs.access(dirPath).then(() => true).catch(() => false);
    console.log('Directory exists:', exists);

  } catch (error) {
    console.error('Error:', error);
  }
}

manageDirectories();`
        },
        {
          title: "Working with JSON Files",
          code: `const fs = require('fs').promises;

class JSONDatabase {
  constructor(filename) {
    this.filename = filename;
  }

  async readData() {
    try {
      const data = await fs.readFile(this.filename, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      // If file doesn't exist, return empty object
      if (error.code === 'ENOENT') {
        return {};
      }
      throw error;
    }
  }

  async writeData(data) {
    const jsonString = JSON.stringify(data, null, 2);
    await fs.writeFile(this.filename, jsonString, 'utf8');
  }

  async get(key) {
    const data = await this.readData();
    return data[key];
  }

  async set(key, value) {
    const data = await this.readData();
    data[key] = value;
    await this.writeData(data);
  }

  async delete(key) {
    const data = await this.readData();
    delete data[key];
    await this.writeData(data);
  }

  async list() {
    return await this.readData();
  }
}

// Usage example
async function demonstrateJSONDatabase() {
  const db = new JSONDatabase('data.json');

  // Store user data
  await db.set('user1', { name: 'John', age: 30, email: 'john@example.com' });
  await db.set('user2', { name: 'Jane', age: 25, email: 'jane@example.com' });

  // Retrieve data
  const user1 = await db.get('user1');
  console.log('User 1:', user1);

  // List all data
  const allData = await db.list();
  console.log('All data:', allData);

  // Update data
  await db.set('user1', { ...user1, age: 31 });
  console.log('Updated user 1:', await db.get('user1'));
}

demonstrateJSONDatabase();`
        }
      ]
    },
    {
      id: "nodejs-database",
      title: "Database Integration",
      content: "Databases are the memory banks of your applications. They store data persistently so you can retrieve it later, even after your application restarts. Node.js works with many different types of databases, from simple file-based storage to complex distributed systems.\n\nFor learning purposes and smaller applications, SQLite is an excellent choice because it's file-based (no server required), supports SQL, and is very fast. For larger applications, you might choose PostgreSQL, MySQL, or even NoSQL databases like MongoDB.\n\nWhen working with databases in Node.js, you'll typically use database drivers or ORMs (Object-Relational Mappers). Drivers provide low-level access to the database, while ORMs provide higher-level abstractions that make it easier to work with data as JavaScript objects.\n\nKey concepts include:\n- **Connections**: Establishing and managing database connections\n- **Queries**: Reading, writing, updating, and deleting data\n- **Transactions**: Grouping multiple operations that must succeed or fail together\n- **Migrations**: Managing database schema changes over time\n- **Connection pooling**: Reusing database connections for better performance\n\nSecurity is crucial when working with databases. Always use parameterized queries or prepared statements to prevent SQL injection attacks, and never store sensitive information like passwords in plain text.",
      keyTopics: [
        "Database types and selection",
        "SQL vs NoSQL databases",
        "Connection management",
        "CRUD operations",
        "Data validation and sanitization",
        "Database security best practices"
      ],
      practicalExercises: [
        "Set up SQLite database with user management",
        "Create REST API with database integration",
        "Implement data validation and error handling",
        "Build database migration system",
        "Create database backup and restore functionality",
        "Implement database connection pooling"
      ],
      codeExamples: [
        {
          title: "SQLite Database with User Management",
          code: `const sqlite3 = require('sqlite3').verbose();

// Create/open database
const db = new sqlite3.Database('users.db');

// Initialize database
db.serialize(() => {
  // Create users table
  db.run(\`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    age INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )\`);

  console.log('Database initialized');
});

// User operations
class UserManager {
  constructor(db) {
    this.db = db;
  }

  // Create user
  createUser(name, email, age) {
    return new Promise((resolve, reject) => {
      const sql = 'INSERT INTO users (name, email, age) VALUES (?, ?, ?)';
      this.db.run(sql, [name, email, age], function(err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id: this.lastID, name, email, age });
        }
      });
    });
  }

  // Get all users
  getAllUsers() {
    return new Promise((resolve, reject) => {
      this.db.all('SELECT * FROM users ORDER BY created_at DESC', (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  // Get user by ID
  getUserById(id) {
    return new Promise((resolve, reject) => {
      this.db.get('SELECT * FROM users WHERE id = ?', [id], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }

  // Update user
  updateUser(id, updates) {
    return new Promise((resolve, reject) => {
      const fields = [];
      const values = [];

      Object.keys(updates).forEach(key => {
        fields.push(\`\${key} = ?\`);
        values.push(updates[key]);
      });

      values.push(id);

      const sql = \`UPDATE users SET \${fields.join(', ')} WHERE id = ?\`;
      this.db.run(sql, values, function(err) {
        if (err) {
          reject(err);
        } else {
          resolve({ changes: this.changes });
        }
      });
    });
  }

  // Delete user
  deleteUser(id) {
    return new Promise((resolve, reject) => {
      this.db.run('DELETE FROM users WHERE id = ?', [id], function(err) {
        if (err) {
          reject(err);
        } else {
          resolve({ changes: this.changes });
        }
      });
    });
  }
}

// Usage example
async function demonstrateUserManagement() {
  const userManager = new UserManager(db);

  try {
    // Create users
    const user1 = await userManager.createUser('John Doe', 'john@example.com', 30);
    const user2 = await userManager.createUser('Jane Smith', 'jane@example.com', 25);

    console.log('Created users:', user1, user2);

    // Get all users
    const allUsers = await userManager.getAllUsers();
    console.log('All users:', allUsers);

    // Update user
    await userManager.updateUser(user1.id, { age: 31 });
    const updatedUser = await userManager.getUserById(user1.id);
    console.log('Updated user:', updatedUser);

  } catch (error) {
    console.error('Error:', error);
  } finally {
    // Close database connection
    db.close();
  }
}

demonstrateUserManagement();`
        },
        {
          title: "MongoDB Integration with Mongoose",
          code: `const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/myapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Define User schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  age: {
    type: Number,
    min: 0,
    max: 120
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Add instance methods
userSchema.methods.getFullInfo = function() {
  return \`\${this.name} (\${this.age} years old) - \${this.email}\`;
};

// Add static methods
userSchema.statics.findByAgeRange = function(min, max) {
  return this.find({ age: { $gte: min, $lte: max } });
};

// Create User model
const User = mongoose.model('User', userSchema);

// User operations
class UserManager {
  // Create user
  async createUser(name, email, age) {
    const user = new User({ name, email, age });
    return await user.save();
  }

  // Get all users
  async getAllUsers() {
    return await User.find().sort({ createdAt: -1 });
  }

  // Get user by ID
  async getUserById(id) {
    return await User.findById(id);
  }

  // Update user
  async updateUser(id, updates) {
    return await User.findByIdAndUpdate(id, updates, { new: true });
  }

  // Delete user
  async deleteUser(id) {
    return await User.findByIdAndDelete(id);
  }

  // Find users by age range
  async findUsersByAgeRange(min, max) {
    return await User.findByAgeRange(min, max);
  }
}

// Usage example
async function demonstrateMongoDB() {
  const userManager = new UserManager();

  try {
    // Create users
    const user1 = await userManager.createUser('John Doe', 'john@example.com', 30);
    const user2 = await userManager.createUser('Jane Smith', 'jane@example.com', 25);

    console.log('Created users:');
    console.log(user1.getFullInfo());
    console.log(user2.getFullInfo());

    // Get all users
    const allUsers = await userManager.getAllUsers();
    console.log('All users count:', allUsers.length);

    // Find users in age range
    const youngUsers = await userManager.findUsersByAgeRange(20, 35);
    console.log('Users aged 20-35:', youngUsers.length);

    // Update user
    const updatedUser = await userManager.updateUser(user1._id, { age: 31 });
    console.log('Updated user:', updatedUser.getFullInfo());

  } catch (error) {
    console.error('Error:', error);
  } finally {
    // Close database connection
    mongoose.connection.close();
  }
}

demonstrateMongoDB();`
        }
      ]
    },
    {
      id: "nodejs-security",
      title: "Security Best Practices",
      content: "Security in Node.js applications is like locking your front door - it's essential for protecting your application and users from malicious attacks. Node.js applications can be vulnerable to various security threats, but with proper practices, you can build robust and secure applications.\n\n**Input Validation and Sanitization**: Never trust user input. Always validate and sanitize data before processing it. Use libraries like Joi or Yup for validation, and DOMPurify for HTML sanitization.\n\n**Authentication and Authorization**: Implement proper user authentication using secure methods. Use JWT tokens, bcrypt for password hashing, and implement role-based access control (RBAC) for authorization.\n\n**SQL Injection Prevention**: When working with databases, always use parameterized queries or prepared statements. Never concatenate user input directly into SQL queries.\n\n**Cross-Site Scripting (XSS) Protection**: Sanitize user input and use Content Security Policy (CSP) headers. The DOMPurify library is essential for preventing XSS attacks.\n\n**Rate Limiting**: Implement rate limiting to prevent brute force attacks and API abuse. Libraries like express-rate-limit can help.\n\n**Environment Variables**: Never hardcode sensitive information like API keys or database passwords. Use environment variables and libraries like dotenv.\n\n**HTTPS**: Always use HTTPS in production to encrypt data in transit.\n\n**Dependencies**: Regularly update dependencies and use tools like npm audit to check for vulnerabilities.",
      keyTopics: [
        "Input validation and sanitization",
        "Authentication and authorization",
        "SQL injection prevention",
        "XSS protection",
        "Rate limiting",
        "Environment variables",
        "HTTPS and SSL/TLS",
        "Dependency security"
      ],
      practicalExercises: [
        "Implement input validation for user registration",
        "Set up JWT authentication system",
        "Create rate limiting middleware",
        "Configure HTTPS with SSL certificates",
        "Implement password hashing with bcrypt",
        "Set up environment variable management",
        "Create secure API endpoints with validation"
      ],
      codeExamples: [
        {
          title: "Input Validation with Joi",
          code: `const express = require('express');
const Joi = require('joi');
const app = express();

app.use(express.json());

// Validation schemas
const userSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().required(),
  age: Joi.number().integer().min(13).max(120),
  password: Joi.string().min(8).pattern(new RegExp('^[a-zA-Z0-9!@#$%^&*]{8,}$')).required()
});

// Middleware for validation
const validateUser = (req, res, next) => {
  const { error } = userSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      error: 'Validation failed',
      details: error.details.map(detail => detail.message)
    });
  }
  next();
};

// Secure user registration endpoint
app.post('/register', validateUser, async (req, res) => {
  try {
    const { name, email, age, password } = req.body;

    // In a real app, you'd hash the password and save to database
    // const hashedPassword = await bcrypt.hash(password, 12);

    res.status(201).json({
      message: 'User registered successfully',
      user: { name, email, age }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(3000, () => {
  console.log('Secure API running on port 3000');
});`
        },
        {
          title: "JWT Authentication",
          code: `const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const app = express();

app.use(express.json());

// In a real app, this would be in a database
const users = [
  {
    id: 1,
    email: 'user@example.com',
    password: '$2b$10$hashedpasswordhere' // bcrypt hash
  }
];

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Generate JWT token
const generateToken = (user) => {
  return jwt.sign(
    { userId: user.id, email: user.email },
    JWT_SECRET,
    { expiresIn: '24h' }
  );
};

// Verify JWT token middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.header('Authorization');
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// Login endpoint
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = users.find(u => u.email === email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate token
    const token = generateToken(user);

    res.json({
      message: 'Login successful',
      token,
      user: { id: user.id, email: user.email }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Protected route
app.get('/profile', authenticateToken, (req, res) => {
  res.json({
    message: 'Welcome to your profile!',
    user: req.user
  });
});

// Refresh token endpoint
app.post('/refresh', authenticateToken, (req, res) => {
  const user = users.find(u => u.id === req.user.userId);
  if (!user) {
    return res.status(401).json({ error: 'User not found' });
  }

  const newToken = generateToken(user);
  res.json({ token: newToken });
});

app.listen(3000, () => {
  console.log('JWT Authentication API running on port 3000');
});`
        },
        {
          title: "Rate Limiting and Security Headers",
          code: `const express = require('express');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const cors = require('cors');
const app = express();

// Security middleware
app.use(helmet()); // Sets various HTTP headers for security

// CORS configuration
app.use(cors({
  origin: process.env.NODE_ENV === 'production'
    ? ['https://yourdomain.com']
    : ['http://localhost:3000'],
  credentials: true
}));

app.use(express.json({ limit: '10mb' })); // Limit payload size

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: {
    error: 'Too many requests from this IP, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Apply rate limiting to all requests
app.use(limiter);

// Stricter rate limiting for authentication endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 login attempts per windowMs
  message: {
    error: 'Too many login attempts, please try again later.'
  }
});

// API routes
app.get('/api/public', (req, res) => {
  res.json({ message: 'This is a public endpoint' });
});

app.post('/api/login', authLimiter, (req, res) => {
  // Login logic here
  res.json({ message: 'Login endpoint with rate limiting' });
});

// Protected routes
app.get('/api/protected', (req, res) => {
  // Authentication middleware would go here
  res.json({ message: 'This is a protected endpoint' });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);

  // Don't leak error details in production
  const isDevelopment = process.env.NODE_ENV !== 'production';
  const errorResponse = {
    error: isDevelopment ? err.message : 'Internal server error'
  };

  res.status(500).json(errorResponse);
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(\`Secure API server running on port \${PORT}\`);
});`
        }
      ]
    },
    {
      id: "nodejs-deployment",
      title: "Deployment and Production",
      content: "Deploying a Node.js application to production is like moving from your garage workshop to a professional manufacturing facility. You need to ensure your application can handle real-world traffic, recover from failures, and scale as needed.\n\n**Process Managers**: Tools like PM2 help manage your Node.js processes, automatically restart crashed applications, and provide load balancing across multiple CPU cores.\n\n**Environment Configuration**: Use environment variables for configuration that differs between development, staging, and production environments.\n\n**Logging**: Implement proper logging to track application behavior, errors, and performance metrics.\n\n**Monitoring**: Set up monitoring tools to track application health, response times, and resource usage.\n\n**Database Optimization**: Configure connection pooling, implement caching strategies, and optimize database queries.\n\n**Security Hardening**: Implement security headers, use HTTPS, and follow security best practices.\n\n**Backup and Recovery**: Set up automated backups and disaster recovery procedures.\n\n**Scaling**: Implement horizontal scaling with load balancers and consider microservices architecture for large applications.\n\nPopular deployment platforms include:\n- **Heroku**: Easy deployment with built-in scaling\n- **DigitalOcean**: VPS hosting with full control\n- **AWS**: Cloud infrastructure with extensive services\n- **Vercel/Netlify**: Serverless deployment for frontend applications\n- **Docker**: Containerization for consistent deployment across environments",
      keyTopics: [
        "Process management with PM2",
        "Environment configuration",
        "Logging and monitoring",
        "Database optimization",
        "Security hardening",
        "Scaling strategies",
        "Deployment platforms"
      ],
      practicalExercises: [
        "Set up PM2 process management",
        "Configure environment variables",
        "Implement logging with Winston",
        "Set up monitoring with PM2",
        "Create deployment scripts",
        "Configure HTTPS with SSL certificates",
        "Implement health checks and graceful shutdown"
      ],
      codeExamples: [
        {
          title: "PM2 Process Management",
          code: `// ecosystem.config.js - PM2 configuration
module.exports = {
  apps: [{
    name: 'my-node-app',
    script: 'app.js',
    instances: 'max', // Use all available CPU cores
    exec_mode: 'cluster', // Cluster mode for load balancing
    env: {
      NODE_ENV: 'development',
      PORT: 3000
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_file: './logs/combined.log',
    time: true,
    watch: false,
    max_memory_restart: '1G', // Restart if memory usage exceeds 1GB
    restart_delay: 4000,
    autorestart: true,
    min_uptime: '10s'
  }]
};

// package.json scripts
{
  "scripts": {
    "start": "pm2 start ecosystem.config.js --env production",
    "dev": "pm2 start ecosystem.config.js --env development",
    "stop": "pm2 stop ecosystem.config.js",
    "restart": "pm2 restart ecosystem.config.js",
    "delete": "pm2 delete ecosystem.config.js",
    "logs": "pm2 logs",
    "monit": "pm2 monit"
  }
}`
        },
        {
          title: "Environment Configuration",
          code: `// config.js - Environment-based configuration
require('dotenv').config();

const config = {
  development: {
    port: process.env.PORT || 3000,
    database: {
      host: 'localhost',
      port: 5432,
      database: 'myapp_dev',
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'password'
    },
    jwt: {
      secret: process.env.JWT_SECRET || 'dev-secret-key',
      expiresIn: '24h'
    },
    logging: {
      level: 'debug',
      file: './logs/dev.log'
    }
  },
  production: {
    port: process.env.PORT || 3000,
    database: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT || 5432,
      database: process.env.DB_NAME,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD
    },
    jwt: {
      secret: process.env.JWT_SECRET,
      expiresIn: '1h'
    },
    logging: {
      level: 'info',
      file: './logs/prod.log'
    }
  }
};

const env = process.env.NODE_ENV || 'development';
module.exports = config[env];`
        },
        {
          title: "Logging with Winston",
          code: `const winston = require('winston');
const path = require('path');

// Define log levels
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4
};

// Define colors for each level
const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'blue'
};

winston.addColors(colors);

// Create logs directory if it doesn't exist
const fs = require('fs');
const logsDir = path.join(__dirname, 'logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

// Create winston logger
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  levels,
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { service: 'my-node-app' },
  transports: [
    // Write all logs with importance level of \`error\` or less to \`error.log\`
    new winston.transports.File({
      filename: path.join(logsDir, 'error.log'),
      level: 'error'
    }),
    // Write all logs with importance level of \`info\` or less to \`combined.log\`
    new winston.transports.File({
      filename: path.join(logsDir, 'combined.log')
    })
  ]
});

// If we're not in production, log to the console with colors
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize({ all: true }),
      winston.format.simple()
    )
  }));
}

// Create a stream for morgan HTTP request logging
logger.stream = {
  write: (message) => {
    logger.http(message.trim());
  }
};

module.exports = logger;

// Usage in your application
const express = require('express');
const morgan = require('morgan');
const app = express();

// HTTP request logging
app.use(morgan('combined', { stream: logger.stream }));

// Application logging
app.get('/', (req, res) => {
  logger.info('Home page accessed', {
    ip: req.ip,
    userAgent: req.get('User-Agent')
  });
  res.send('Hello World!');
});

// Error logging
app.use((err, req, res, next) => {
  logger.error('Unhandled error', {
    error: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method
  });
  res.status(500).send('Internal Server Error');
});

app.listen(3000, () => {
  logger.info('Server started on port 3000');
});`
        },
        {
          title: "Health Checks and Graceful Shutdown",
          code: `const express = require('express');
const app = express();

// Health check endpoint
app.get('/health', (req, res) => {
  // Check database connectivity, external services, etc.
  const healthCheck = {
    uptime: process.uptime(),
    message: 'OK',
    timestamp: Date.now(),
    services: {
      database: 'connected', // You'd check actual DB connection
      cache: 'connected'     // You'd check actual cache connection
    }
  };

  res.status(200).json(healthCheck);
});

// Readiness check endpoint
app.get('/ready', (req, res) => {
  // Check if app is ready to serve traffic
  // This might include checking dependencies, migrations, etc.
  res.status(200).json({ status: 'ready' });
});

// Metrics endpoint (for monitoring)
app.get('/metrics', (req, res) => {
  const metrics = {
    memory: process.memoryUsage(),
    cpu: process.cpuUsage(),
    uptime: process.uptime(),
    version: process.version
  };
  res.json(metrics);
});

// Graceful shutdown handling
const gracefulShutdown = (signal) => {
  console.log(\`Received \${signal}. Starting graceful shutdown...\`);

  // Stop accepting new connections
  server.close((err) => {
    if (err) {
      console.error('Error during server shutdown:', err);
      process.exit(1);
    }

    console.log('Server closed successfully');

    // Close database connections
    // Close other resources (Redis, message queues, etc.)

    console.log('All connections closed. Exiting...');
    process.exit(0);
  });

  // Force shutdown after 30 seconds
  setTimeout(() => {
    console.error('Forced shutdown after timeout');
    process.exit(1);
  }, 30000);
};

// Listen for termination signals
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  gracefulShutdown('uncaughtException');
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  gracefulShutdown('unhandledRejection');
});

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
  console.log('Health check available at: http://localhost:' + PORT + '/health');
  console.log('Readiness check available at: http://localhost:' + PORT + '/ready');
  console.log('Metrics available at: http://localhost:' + PORT + '/metrics');
});`
        }
      ]
    }
  ],
  projects: [
    {
      title: "RESTful API with Authentication",
      description: "Build a complete RESTful API for a task management system with user authentication, CRUD operations, and proper error handling."
    },
    {
      title: "Real-time Chat Application",
      description: "Create a real-time chat application using WebSockets, with user authentication, chat rooms, and message persistence."
    },
    {
      title: "File Upload and Management System",
      description: "Develop a file upload service with cloud storage integration, file processing, and secure access controls."
    },
    {
      title: "E-commerce Backend",
      description: "Build the backend for an e-commerce platform with product management, shopping cart, and payment integration."
    },
    {
      title: "Blog Platform with CMS",
      description: "Create a full-featured blog platform with content management, user roles, and SEO optimization."
    }
  ],
  assessments: [
    {
      type: "quiz",
      questions: [
        {
          question: "What is the primary difference between synchronous and asynchronous operations in Node.js?",
          options: [
            "Synchronous operations are faster than asynchronous operations",
            "Synchronous operations block execution while asynchronous operations don't",
            "Asynchronous operations only work with databases",
            "Synchronous operations use callbacks while asynchronous operations don't"
          ],
          correctAnswer: "Synchronous operations block execution while asynchronous operations don't"
        },
        {
          question: "Which of the following is NOT a core module in Node.js?",
          options: ["fs", "http", "express", "path"],
          correctAnswer: "express"
        },
        {
          question: "What does npm stand for?",
          options: ["Node Package Manager", "Node Program Module", "New Package Manager", "Node Project Manager"],
          correctAnswer: "Node Package Manager"
        }
      ]
    },
    {
      type: "evaluation",
      questions: [
        {
          question: "Explain the event loop in Node.js and why it's important for performance.",
          options: [],
          correctAnswer: ""
        },
        {
          question: "Compare and contrast callbacks, promises, and async/await for handling asynchronous operations.",
          options: [],
          correctAnswer: ""
        }
      ]
    }
  ],
  aiPrompts: [
    "How does the Node.js event loop work?",
    "Explain the difference between require() and import in Node.js",
    "How do I handle errors in asynchronous Node.js code?",
    "What's the best way to structure a large Node.js application?",
    "How do I optimize Node.js application performance?",
    "Explain Node.js streams and when to use them",
    "How do I implement authentication in a Node.js API?",
    "What's the difference between process.nextTick() and setImmediate()?",
    "How do I debug memory leaks in Node.js applications?",
    "Explain the Node.js module system and CommonJS vs ES modules"
  ],
  resources: [
    { name: "Node.js Official Documentation", url: "https://nodejs.org/en/docs/" },
    { name: "Express.js Documentation", url: "https://expressjs.com/" },
    { name: "npm Documentation", url: "https://docs.npmjs.com/" },
    { name: "Node.js Best Practices", url: "https://github.com/goldbergyoni/nodebestpractices" },
    { name: "MDN Web Docs - Node.js", url: "https://developer.mozilla.org/en-US/docs/Learn/Server-side/Node_server_without_framework" },
    { name: "Node.js API Reference", url: "https://nodejs.org/api/" },
    { name: "Express.js Guide", url: "https://expressjs.com/en/guide/routing.html" },
    { name: "Node.js Security Best Practices", url: "https://nodejs.org/en/docs/guides/security/" }
  ],
  toolsRequired: [
    "Node.js (latest LTS version)",
    "npm or yarn package manager",
    "Code editor (VS Code recommended)",
    "Terminal/command line interface",
    "Git for version control",
    "Database (SQLite for learning, PostgreSQL/MySQL for production)",
    "Postman or similar API testing tool"
  ],
  bestPractices: [
    "Use async/await instead of callbacks for cleaner code",
    "Always handle errors properly in asynchronous operations",
    "Use environment variables for configuration",
    "Implement proper logging for debugging and monitoring",
    "Use middleware for cross-cutting concerns in Express.js",
    "Validate and sanitize all user inputs",
    "Use connection pooling for database connections",
    "Implement rate limiting to prevent abuse",
    "Use HTTPS in production",
    "Keep dependencies updated and audit for vulnerabilities",
    "Use semantic versioning for your packages",
    "Implement graceful shutdown for your applications",
    "Use PM2 or similar process manager in production",
    "Monitor application performance and memory usage",
    "Write comprehensive tests for your code"
  ],
  commonPitfalls: [
    "Blocking the event loop with synchronous operations",
    "Not handling errors in asynchronous code",
    "Storing sensitive information in code instead of environment variables",
    "Not using parameterized queries, leading to SQL injection",
    "Forgetting to close database connections",
    "Not implementing proper input validation",
    "Using outdated or vulnerable dependencies",
    "Not implementing rate limiting on API endpoints",
    "Exposing stack traces in production error responses",
    "Not using HTTPS in production",
    "Trying to use Node.js for CPU-intensive tasks",
    "Not implementing proper logging",
    "Using callbacks instead of promises/async-await",
    "Not handling uncaught exceptions properly",
    "Trying to serve static files inefficiently"
  ],
  careerRelevance: "Node.js is one of the most in-demand backend technologies in the job market. Full-stack JavaScript developers who master Node.js can command high salaries and work on a wide variety of projects, from startups to enterprise applications. Node.js skills are essential for modern web development roles including Backend Developer, Full-Stack Developer, DevOps Engineer, and API Developer. The Node.js ecosystem continues to grow rapidly, with strong community support and extensive job opportunities across industries."
};

export default nodejsContent;