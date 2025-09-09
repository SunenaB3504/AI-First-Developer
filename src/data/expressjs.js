const expressjsContent = {
  id: "expressjs",
  tier: 2,
  name: "Express.js",
  description: "Express.js is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications. It simplifies the process of building web servers and APIs by providing an elegant layer over Node.js's HTTP module.",
  difficulty: "intermediate",
  estimatedHours: 25,
  prerequisites: ["nodejs", "javascript"],
  learningObjectives: [
    "Understand Express.js fundamentals and middleware architecture",
    "Master routing, route parameters, and request handling",
    "Implement custom middleware for authentication and validation",
    "Work with template engines for server-side rendering",
    "Handle file uploads and static file serving",
    "Implement proper error handling and logging",
    "Deploy Express.js applications to production",
    "Create RESTful APIs with proper HTTP methods",
    "Implement security best practices and CORS",
    "Optimize Express.js applications for performance"
  ],
  sections: [
    {
      id: "expressjs-introduction",
      title: "Introduction to Express.js",
      content: "Express.js is like the friendly neighborhood framework that makes building web applications with Node.js much easier. Think of it as a toolbox that provides all the essential tools you need to build robust web applications and APIs.\n\nWithout Express.js, you'd have to manually handle every aspect of HTTP requests and responses using Node.js's built-in `http` module. Express.js abstracts away the complexity and provides a clean, intuitive API for routing, middleware, template engines, and more.\n\nThe core philosophy of Express.js is **middleware**. Every request flows through a series of middleware functions that can modify the request, perform authentication, logging, or any other processing before the final response is sent.\n\nExpress.js follows the 'convention over configuration' principle, making it easy to get started while remaining flexible enough for complex applications.",
      keyTopics: [
        "What is Express.js?",
        "Installation and setup",
        "Basic server creation",
        "Middleware concept",
        "Request-response cycle"
      ],
      practicalExercises: [
        "Install Express.js using npm",
        "Create a basic Express server",
        "Handle different HTTP methods (GET, POST)",
        "Use middleware to log requests",
        "Serve static files with Express"
      ],
      codeExamples: [
        {
          title: "Basic Express Server",
          code: `const express = require('express');
const app = express();
const PORT = 3000;

// Basic route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start server
app.listen(PORT, () => {
  console.log(\`Server running on http://localhost:\${PORT}\`);
});`
        },
        {
          title: "Express Server with JSON Response",
          code: `const express = require('express');
const app = express();

// Middleware to parse JSON
app.use(express.json());

// API endpoint returning JSON
app.get('/api/users', (req, res) => {
  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
  ];
  res.json(users);
});

// POST endpoint to create user
app.post('/api/users', (req, res) => {
  const { name, email } = req.body;
  // In a real app, you'd save to database
  const newUser = {
    id: Date.now(),
    name,
    email,
    createdAt: new Date()
  };
  res.status(201).json(newUser);
});

app.listen(3000, () => {
  console.log('API server running on port 3000');
});`
        }
      ]
    },
    {
      id: "expressjs-routing",
      title: "Routing and Route Parameters",
      content: "Routing in Express.js is like a traffic controller directing requests to the appropriate handlers. Routes define how your application responds to different HTTP requests at different endpoints.\n\nExpress.js provides methods that correspond to all HTTP methods: `app.get()`, `app.post()`, `app.put()`, `app.delete()`, etc. Each method takes a path pattern and a callback function that gets executed when the route is matched.\n\nRoute parameters allow you to capture values from the URL. For example, `/users/:id` would match `/users/123` and make `123` available as `req.params.id`.\n\nQuery parameters are another way to pass data in URLs. They're automatically parsed by Express.js and made available in `req.query`.\n\nRoute handlers can be simple functions or chains of middleware functions. You can also organize routes using `express.Router()` for better code organization.",
      keyTopics: [
        "Basic routing",
        "Route parameters",
        "Query parameters",
        "Route handlers",
        "Router middleware"
      ],
      practicalExercises: [
        "Create routes for different HTTP methods",
        "Implement route parameters for dynamic URLs",
        "Handle query parameters in routes",
        "Organize routes using express.Router()",
        "Create nested routes for complex APIs"
      ],
      codeExamples: [
        {
          title: "Route Parameters and Query Strings",
          code: `const express = require('express');
const app = express();

app.use(express.json());

// Route with parameters
app.get('/users/:id', (req, res) => {
  const userId = req.params.id;
  res.json({ userId, message: \`Getting user \${userId}\` });
});

// Route with multiple parameters
app.get('/users/:userId/posts/:postId', (req, res) => {
  const { userId, postId } = req.params;
  res.json({
    userId,
    postId,
    message: \`Getting post \${postId} by user \${userId}\`
  });
});

// Query parameters
app.get('/search', (req, res) => {
  const { q, limit = 10, sort = 'date' } = req.query;
  res.json({
    query: q,
    limit: parseInt(limit),
    sort,
    message: \`Searching for "\${q}" with limit \${limit}, sorted by \${sort}\`
  });
});

// POST route with body data
app.post('/users', (req, res) => {
  const { name, email, age } = req.body;
  res.json({
    id: Date.now(),
    name,
    email,
    age,
    createdAt: new Date()
  });
});

app.listen(3000, () => {
  console.log('Routing server running on port 3000');
});`
        },
        {
          title: "Organizing Routes with Router",
          code: `const express = require('express');
const app = express();

// Create router for user routes
const userRouter = express.Router();

// User routes
userRouter.get('/', (req, res) => {
  res.json({ message: 'Get all users' });
});

userRouter.get('/:id', (req, res) => {
  const userId = req.params.id;
  res.json({ userId, message: \`Get user \${userId}\` });
});

userRouter.post('/', (req, res) => {
  const { name, email } = req.body;
  res.json({
    id: Date.now(),
    name,
    email,
    message: 'User created'
  });
});

userRouter.put('/:id', (req, res) => {
  const userId = req.params.id;
  const { name, email } = req.body;
  res.json({
    userId,
    name,
    email,
    message: \`User \${userId} updated\`
  });
});

userRouter.delete('/:id', (req, res) => {
  const userId = req.params.id;
  res.json({ userId, message: \`User \${userId} deleted\` });
});

// Mount router at /api/users
app.use('/api/users', userRouter);

// Product routes
const productRouter = express.Router();

productRouter.get('/', (req, res) => {
  res.json({ message: 'Get all products' });
});

productRouter.get('/:id', (req, res) => {
  const productId = req.params.id;
  res.json({ productId, message: \`Get product \${productId}\` });
});

// Mount router at /api/products
app.use('/api/products', productRouter);

app.listen(3000, () => {
  console.log('Router example running on port 3000');
});`
        }
      ]
    },
    {
      id: "expressjs-middleware",
      title: "Middleware Deep Dive",
      content: "Middleware functions are the heart of Express.js applications. They're like checkpoints that every request passes through on its way to the final route handler. Each middleware function can:\n\n- Execute code\n- Modify the request and response objects\n- End the request-response cycle\n- Call the next middleware function\n\nExpress.js comes with built-in middleware, but you can also create custom middleware for specific needs. Common middleware patterns include:\n\n- **Application-level middleware**: Bound to the app object with `app.use()`\n- **Router-level middleware**: Bound to specific routers\n- **Error-handling middleware**: Special middleware for handling errors\n- **Built-in middleware**: Like `express.json()`, `express.static()`\n- **Third-party middleware**: Like CORS, helmet, morgan for logging\n\nThe key to understanding middleware is the `next()` function. Calling `next()` passes control to the next middleware in the stack. Not calling `next()` ends the request-response cycle.",
      keyTopics: [
        "Middleware fundamentals",
        "Custom middleware creation",
        "Built-in middleware",
        "Error handling middleware",
        "Third-party middleware"
      ],
      practicalExercises: [
        "Create custom logging middleware",
        "Implement authentication middleware",
        "Build request validation middleware",
        "Create error handling middleware",
        "Use third-party middleware (CORS, helmet)",
        "Implement rate limiting middleware"
      ],
      codeExamples: [
        {
          title: "Custom Middleware Examples",
          code: `const express = require('express');
const app = express();

// Custom logging middleware
const logger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(\`[\${timestamp}] \${req.method} \${req.url}\`);
  next();
};

// Request timing middleware
const requestTimer = (req, res, next) => {
  req.startTime = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - req.startTime;
    console.log(\`Request took \${duration}ms\`);
  });
  next();
};

// Authentication middleware
const authenticate = (req, res, next) => {
  const authHeader = req.header('Authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  const token = authHeader.substring(7); // Remove 'Bearer '

  // In a real app, you'd verify the token
  if (token !== 'valid-token') {
    return res.status(401).json({ error: 'Invalid token' });
  }

  req.user = { id: 1, name: 'John Doe' }; // Mock user
  next();
};

// Apply middleware globally
app.use(logger);
app.use(requestTimer);
app.use(express.json());

// Public route
app.get('/public', (req, res) => {
  res.json({ message: 'This is a public endpoint' });
});

// Protected route
app.get('/protected', authenticate, (req, res) => {
  res.json({
    message: 'This is a protected endpoint',
    user: req.user
  });
});

// Middleware with parameters
const requireRole = (role) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    if (req.user.role !== role) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }

    next();
  };
};

app.get('/admin', authenticate, requireRole('admin'), (req, res) => {
  res.json({ message: 'Admin only endpoint' });
});

app.listen(3000, () => {
  console.log('Middleware server running on port 3000');
});`
        },
        {
          title: "Error Handling Middleware",
          code: `const express = require('express');
const app = express();

app.use(express.json());

// Synchronous error handling
app.get('/sync-error', (req, res) => {
  throw new Error('This is a synchronous error');
});

// Asynchronous error handling
app.get('/async-error', async (req, res, next) => {
  try {
    // Simulate async operation that might fail
    const result = await riskyAsyncOperation();
    res.json({ result });
  } catch (error) {
    // Pass error to error handling middleware
    next(error);
  }
});

// Route that manually calls next with error
app.get('/manual-error', (req, res, next) => {
  const error = new Error('Something went wrong');
  error.statusCode = 400;
  next(error);
});

// 404 handler - must be after all routes
app.use((req, res, next) => {
  const error = new Error(\`Route \${req.originalUrl} not found\`);
  error.statusCode = 404;
  next(error);
});

// Global error handling middleware - must be last
app.use((error, req, res, next) => {
  // Log error
  console.error('Error:', error.message);
  console.error('Stack:', error.stack);

  // Don't leak error details in production
  const isDevelopment = process.env.NODE_ENV !== 'production';

  const errorResponse = {
    error: isDevelopment ? error.message : 'Internal server error',
    statusCode: error.statusCode || 500,
    ...(isDevelopment && { stack: error.stack })
  };

  res.status(error.statusCode || 500).json(errorResponse);
});

// Helper function to simulate risky operation
function riskyAsyncOperation() {
  return new Promise((resolve, reject) => {
    // Simulate random failure
    if (Math.random() > 0.7) {
      reject(new Error('Random failure occurred'));
    } else {
      setTimeout(() => resolve('Success!'), 100);
    }
  });
}

app.listen(3000, () => {
  console.log('Error handling server running on port 3000');
});`
        }
      ]
    },
    {
      id: "expressjs-templates",
      title: "Template Engines",
      content: "Template engines allow you to generate HTML dynamically on the server side. Instead of sending plain JSON responses, you can render complete HTML pages with dynamic content.\n\nPopular template engines for Express.js include:\n\n- **EJS (Embedded JavaScript)**: Uses plain JavaScript in HTML\n- **Pug (formerly Jade)**: Uses indentation-based syntax\n- **Handlebars**: Uses {{}} syntax for placeholders\n\nTemplate engines work by:\n1. Taking a template file with placeholders\n2. Replacing placeholders with actual data\n3. Generating final HTML output\n\nExpress.js integrates seamlessly with template engines. You configure the engine with `app.set('view engine', 'ejs')` and use `res.render()` to render templates.\n\nTemplate engines are particularly useful for:\n- Server-side rendering (SSR)\n- Email templates\n- Admin dashboards\n- Traditional web applications\n\nFor modern SPAs, you might not need template engines, but they're still valuable for certain use cases.",
      keyTopics: [
        "Template engine concepts",
        "EJS syntax and features",
        "Pug template engine",
        "Handlebars templating",
        "Server-side rendering"
      ],
      practicalExercises: [
        "Set up EJS as the template engine",
        "Create dynamic HTML pages with EJS",
        "Use conditionals and loops in templates",
        "Create reusable template layouts",
        "Render templates with dynamic data",
        "Create partial templates for reusability"
      ],
      codeExamples: [
        {
          title: "EJS Template Engine Setup",
          code: `const express = require('express');
const app = express();

// Set EJS as template engine
app.set('view engine', 'ejs');
// Set views directory (optional, defaults to ./views)
app.set('views', './views');

// Sample data
const users = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'admin' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'user' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'user' }
];

// Route to render users page
app.get('/users', (req, res) => {
  res.render('users', {
    title: 'User Management',
    users: users,
    currentYear: new Date().getFullYear()
  });
});

// Route to render single user
app.get('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find(u => u.id === userId);

  if (!user) {
    return res.status(404).render('error', {
      title: 'User Not Found',
      error: 'User not found',
      statusCode: 404
    });
  }

  res.render('user', {
    title: \`User: \${user.name}\`,
    user: user
  });
});

// Home page
app.get('/', (req, res) => {
  res.render('home', {
    title: 'Welcome',
    message: 'Hello from Express.js with EJS!',
    features: ['Template rendering', 'Dynamic content', 'Reusable layouts']
  });
});

app.listen(3000, () => {
  console.log('Template engine server running on port 3000');
});`
        },
        {
          title: "EJS Template Files",
          code: `<!-- views/layout.ejs - Main layout template -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><%= title %></title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container">
      <a class="navbar-brand" href="/">Express App</a>
      <div class="navbar-nav">
        <a class="nav-link" href="/">Home</a>
        <a class="nav-link" href="/users">Users</a>
      </div>
    </div>
  </nav>

  <main class="container mt-4">
    <%- body %>
  </main>

  <footer class="bg-light text-center py-3 mt-5">
    <p>&copy; <%= new Date().getFullYear() %> Express.js Application</p>
  </footer>

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>

<!-- views/home.ejs - Home page template -->
<% layout('layout') -%>
<div class="row">
  <div class="col-lg-8 mx-auto text-center">
    <h1 class="display-4 mb-4"><%= message %></h1>

    <div class="row">
      <% features.forEach(feature => { %>
        <div class="col-md-4 mb-3">
          <div class="card h-100">
            <div class="card-body">
              <h5 class="card-title"><%= feature %></h5>
              <p class="card-text">Learn how to use <%= feature.toLowerCase() %> in your Express applications.</p>
            </div>
          </div>
        </div>
      <% }); %>
    </div>
  </div>
</div>

<!-- views/users.ejs - Users list template -->
<% layout('layout') -%>
<div class="row">
  <div class="col-12">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2><%= title %></h2>
      <a href="/users/new" class="btn btn-primary">Add New User</a>
    </div>

    <div class="card">
      <div class="card-body">
        <div class="table-responsive">
          <table class="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <% users.forEach(user => { %>
                <tr>
                  <td><%= user.id %></td>
                  <td><%= user.name %></td>
                  <td><%= user.email %></td>
                  <td>
                    <span class="badge bg-<%= user.role === 'admin' ? 'danger' : 'secondary' %>">
                      <%= user.role %>
                    </span>
                  </td>
                  <td>
                    <a href="/users/<%= user.id %>" class="btn btn-sm btn-outline-primary">View</a>
                    <a href="/users/<%= user.id %>/edit" class="btn btn-sm btn-outline-secondary">Edit</a>
                  </td>
                </tr>
              <% }); %>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</div>`
        }
      ]
    },
    {
      id: "expressjs-static-files",
      title: "Static Files and File Uploads",
      content: "Serving static files like CSS, JavaScript, images, and documents is a common requirement for web applications. Express.js makes this easy with the built-in `express.static()` middleware.\n\nStatic file serving works by:\n1. Configuring a directory to serve static files\n2. Express.js automatically serves files from that directory\n3. Files are served with appropriate MIME types\n4. You can configure multiple static directories\n\nFor file uploads, you'll need additional middleware like `multer`. File uploads are more complex because they involve:\n- Parsing multipart/form-data\n- Handling file storage\n- Validating file types and sizes\n- Managing temporary files\n\nSecurity considerations for file uploads:\n- Validate file types and sizes\n- Use secure file names\n- Store files outside web root\n- Implement proper access controls\n- Scan uploaded files for malware\n\nExpress.js also supports serving files with custom logic, like authentication checks or dynamic file serving.",
      keyTopics: [
        "Static file serving",
        "File upload handling",
        "Multer middleware",
        "File validation",
        "Security considerations"
      ],
      practicalExercises: [
        "Serve static CSS and JavaScript files",
        "Configure multiple static directories",
        "Implement single file upload",
        "Handle multiple file uploads",
        "Validate uploaded files",
        "Serve protected static files"
      ],
      codeExamples: [
        {
          title: "Static File Serving",
          code: `const express = require('express');
const path = require('path');
const app = express();

// Serve static files from 'public' directory
app.use(express.static('public'));

// Serve static files from 'assets' directory at '/assets' path
app.use('/assets', express.static('assets'));

// Serve static files from 'uploads' directory with cache control
app.use('/uploads', express.static('uploads', {
  maxAge: '1d', // Cache for 1 day
  etag: true,
  lastModified: true
}));

// Route to serve files with custom logic
app.get('/protected-file/:filename', (req, res) => {
  const filename = req.params.filename;

  // In a real app, you'd check user authentication/authorization
  const isAuthenticated = true; // Mock authentication

  if (!isAuthenticated) {
    return res.status(403).json({ error: 'Access denied' });
  }

  // Serve file with custom headers
  res.set({
    'Content-Type': 'application/octet-stream',
    'Content-Disposition': \`attachment; filename="\${filename}"\`
  });

  res.sendFile(path.join(__dirname, 'protected', filename), (err) => {
    if (err) {
      console.error('File serving error:', err);
      res.status(404).json({ error: 'File not found' });
    }
  });
});

// Route to list available files
app.get('/files', (req, res) => {
  const fs = require('fs').promises;

  fs.readdir('public')
    .then(files => {
      res.json({ files });
    })
    .catch(err => {
      console.error('Directory read error:', err);
      res.status(500).json({ error: 'Unable to list files' });
    });
});

app.listen(3000, () => {
  console.log('Static file server running on port 3000');
  console.log('Static files available at:');
  console.log('- http://localhost:3000/style.css');
  console.log('- http://localhost:3000/script.js');
  console.log('- http://localhost:3000/assets/logo.png');
});`
        },
        {
          title: "File Upload with Multer",
          code: `const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs').promises;
const app = express();

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads/';

    // Create uploads directory if it doesn't exist
    fs.mkdir(uploadDir, { recursive: true })
      .then(() => cb(null, uploadDir))
      .catch(err => cb(err));
  },
  filename: (req, file, cb) => {
    // Generate unique filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// File filter function
const fileFilter = (req, file, cb) => {
  // Allow only certain file types
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPEG, PNG, GIF, and PDF files are allowed.'), false);
  }
};

// Configure multer upload
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
    files: 10 // Maximum 10 files
  }
});

// Single file upload
app.post('/upload/single', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  res.json({
    message: 'File uploaded successfully',
    file: {
      filename: req.file.filename,
      originalName: req.file.originalname,
      size: req.file.size,
      mimetype: req.file.mimetype,
      path: req.file.path
    }
  });
});

// Multiple files upload
app.post('/upload/multiple', upload.array('files', 5), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ error: 'No files uploaded' });
  }

  const files = req.files.map(file => ({
    filename: file.filename,
    originalName: file.originalname,
    size: file.size,
    mimetype: file.mimetype,
    path: file.path
  }));

  res.json({
    message: \`\${req.files.length} files uploaded successfully\`,
    files: files
  });
});

// Mixed file upload (fields)
const uploadFields = upload.fields([
  { name: 'avatar', maxCount: 1 },
  { name: 'documents', maxCount: 5 }
]);

app.post('/upload/mixed', uploadFields, (req, res) => {
  const response = {
    message: 'Mixed upload successful',
    files: {}
  };

  if (req.files.avatar) {
    response.files.avatar = req.files.avatar[0];
  }

  if (req.files.documents) {
    response.files.documents = req.files.documents;
  }

  res.json(response);
});

// Error handling for multer
app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'File too large. Maximum size is 5MB.' });
    }
    if (error.code === 'LIMIT_FILE_COUNT') {
      return res.status(400).json({ error: 'Too many files. Maximum 10 files allowed.' });
    }
  }

  if (error.message.includes('Invalid file type')) {
    return res.status(400).json({ error: error.message });
  }

  next(error);
});

// List uploaded files
app.get('/uploads', async (req, res) => {
  try {
    const files = await fs.readdir('uploads/');
    res.json({ files });
  } catch (error) {
    res.status(500).json({ error: 'Unable to list uploads' });
  }
});

app.listen(3000, () => {
  console.log('File upload server running on port 3000');
  console.log('Upload endpoints:');
  console.log('- POST /upload/single');
  console.log('- POST /upload/multiple');
  console.log('- POST /upload/mixed');
});`
        }
      ]
    },
    {
      id: "expressjs-security",
      title: "Security and CORS",
      content: "Security is crucial for any web application. Express.js applications can be vulnerable to various attacks, but there are proven strategies to protect against them.\n\n**Common Security Threats:**\n- Cross-Site Scripting (XSS)\n- Cross-Site Request Forgery (CSRF)\n- SQL Injection (when using databases)\n- Security misconfigurations\n- Sensitive data exposure\n\n**Essential Security Middleware:**\n- **Helmet**: Sets various HTTP headers for security\n- **CORS**: Controls cross-origin resource sharing\n- **Rate Limiting**: Prevents brute force attacks\n- **Input Validation**: Validates and sanitizes user input\n- **Authentication**: Protects sensitive routes\n\n**CORS (Cross-Origin Resource Sharing)** is particularly important for APIs. It controls which domains can access your API. Without proper CORS configuration, browsers will block cross-origin requests.\n\n**Security Best Practices:**\n- Use HTTPS in production\n- Validate all user input\n- Use parameterized queries for databases\n- Implement proper authentication and authorization\n- Keep dependencies updated\n- Use security headers\n- Log security events\n- Implement rate limiting",
      keyTopics: [
        "Security fundamentals",
        "Helmet middleware",
        "CORS configuration",
        "Rate limiting",
        "Input validation",
        "Authentication strategies"
      ],
      practicalExercises: [
        "Configure Helmet for security headers",
        "Set up CORS for cross-origin requests",
        "Implement rate limiting",
        "Create input validation middleware",
        "Set up JWT authentication",
        "Configure HTTPS for production"
      ],
      codeExamples: [
        {
          title: "Security Middleware Setup",
          code: `const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const app = express();

// Security middleware
app.use(helmet()); // Sets security headers

// CORS configuration
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests from specific origins
    const allowedOrigins = [
      'http://localhost:3000',
      'http://localhost:3001',
      'https://yourdomain.com'
    ];

    // Allow requests with no origin (mobile apps, etc.)
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // Allow cookies and authentication headers
  optionsSuccessStatus: 200 // Some legacy browsers choke on 204
};

app.use(cors(corsOptions));

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
    error: 'Too many login attempts, please try again later.' }
});

app.use(express.json({ limit: '10mb' })); // Limit payload size

// Input validation middleware
const validateUserInput = (req, res, next) => {
  const { name, email, password } = req.body;

  // Basic validation
  if (!name || typeof name !== 'string' || name.length < 2) {
    return res.status(400).json({ error: 'Name must be at least 2 characters long' });
  }

  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Valid email is required' });
  }

  if (!password || password.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters long' });
  }

  next();
};

// Routes
app.get('/public', (req, res) => {
  res.json({ message: 'This is a public endpoint' });
});

app.post('/register', authLimiter, validateUserInput, (req, res) => {
  const { name, email, password } = req.body;

  // In a real app, you'd hash the password and save to database
  res.json({
    message: 'User registered successfully',
    user: { name, email }
  });
});

app.post('/login', authLimiter, (req, res) => {
  const { email, password } = req.body;

  // In a real app, you'd verify credentials
  res.json({
    message: 'Login successful',
    token: 'mock-jwt-token'
  });
});

// Protected route example
app.get('/protected', (req, res) => {
  // In a real app, you'd verify JWT token
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  res.json({ message: 'Access to protected resource granted' });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

app.listen(3000, () => {
  console.log('Secure Express server running on port 3000');
});`
        },
        {
          title: "JWT Authentication Implementation",
          code: `const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const app = express();

// JWT configuration
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const JWT_EXPIRES_IN = '24h';

// Middleware to verify JWT
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

// In-memory user store (use database in production)
const users = [
  {
    id: 1,
    email: 'admin@example.com',
    password: '$2b$10$hashedpassword', // bcrypt hash for 'password123'
    role: 'admin'
  }
];

app.use(express.json());

// User registration
app.post('/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Check if user already exists
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create new user
    const newUser = {
      id: users.length + 1,
      email,
      password: hashedPassword,
      name,
      role: 'user'
    };

    users.push(newUser);

    // Generate JWT token
    const token = jwt.sign(
      { userId: newUser.id, email: newUser.email, role: newUser.role },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        role: newUser.role
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// User login
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = users.find(u => u.email === email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Verify password
    const isValidPassword = await bcrypt.hash(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Protected route - requires authentication
app.get('/profile', authenticateToken, (req, res) => {
  res.json({
    message: 'Profile data',
    user: req.user
  });
});

// Admin-only route
app.get('/admin', authenticateToken, (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' });
  }

  res.json({
    message: 'Admin dashboard',
    users: users.map(u => ({ id: u.id, email: u.email, role: u.role }))
  });
});

// Token refresh endpoint
app.post('/refresh', authenticateToken, (req, res) => {
  // Generate new token with same user data
  const newToken = jwt.sign(
    {
      userId: req.user.userId,
      email: req.user.email,
      role: req.user.role
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );

  res.json({ token: newToken });
});

app.listen(3000, () => {
  console.log('JWT Authentication server running on port 3000');
});`
        }
      ]
    },
    {
      id: "expressjs-production",
      title: "Production Deployment",
      content: "Deploying an Express.js application to production requires careful consideration of performance, reliability, and security. Production environments have different requirements than development.\n\n**Process Management:** Use PM2 or similar tools to manage your Node.js processes. PM2 provides:\n- Automatic restarts on crashes\n- Load balancing across CPU cores\n- Log management\n- Memory monitoring\n- Zero-downtime reloads\n\n**Environment Configuration:** Never hardcode sensitive information. Use environment variables for:\n- Database credentials\n- API keys\n- JWT secrets\n- Port numbers\n- Environment-specific settings\n\n**Logging:** Implement proper logging for production:\n- Use Winston or similar logging library\n- Log different levels (error, warn, info, debug)\n- Rotate log files to prevent disk space issues\n- Centralize logs for monitoring\n\n**Performance Optimization:**\n- Use compression middleware\n- Implement caching strategies\n- Optimize database queries\n- Use CDN for static assets\n- Implement connection pooling\n\n**Health Checks:** Implement health check endpoints for load balancers and monitoring systems.",
      keyTopics: [
        "Process management with PM2",
        "Environment configuration",
        "Logging strategies",
        "Performance optimization",
        "Health checks",
        "Monitoring and alerting"
      ],
      practicalExercises: [
        "Set up PM2 for process management",
        "Configure environment variables",
        "Implement Winston logging",
        "Set up health check endpoints",
        "Configure compression and caching",
        "Set up monitoring and alerting"
      ],
      codeExamples: [
        {
          title: "PM2 Configuration",
          code: `// ecosystem.config.js
module.exports = {
  apps: [{
    name: 'express-app',
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
    min_uptime: '10s',
    env_production: {
      NODE_ENV: 'production',
      PORT: process.env.PORT || 3000,
      JWT_SECRET: process.env.JWT_SECRET,
      DATABASE_URL: process.env.DATABASE_URL
    }
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
          title: "Production-Ready Express App",
          code: `require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const compression = require('compression');
const cors = require('cors');
const morgan = require('morgan');
const winston = require('winston');

const app = express();
const PORT = process.env.PORT || 3000;

// Winston logger configuration
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' })
  ]
});

// Add console logging in development
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}));

// CORS configuration
app.use(cors({
  origin: process.env.NODE_ENV === 'production'
    ? process.env.ALLOWED_ORIGINS?.split(',') || []
    : ['http://localhost:3000'],
  credentials: true
}));

// Compression middleware
app.use(compression());

// Logging middleware
app.use(morgan('combined', {
  stream: { write: message => logger.info(message.trim()) }
}));

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static files with caching
app.use(express.static('public', {
  maxAge: process.env.NODE_ENV === 'production' ? '1d' : 0,
  etag: true
}));

// Request logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    logger.info(\`Request: \${req.method} \${req.url} - \${res.statusCode} - \${duration}ms\`);
  });
  next();
});

// API routes
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV,
    version: process.env.npm_package_version
  });
});

app.get('/api/users', (req, res) => {
  // In a real app, fetch from database
  res.json({
    users: [
      { id: 1, name: 'John Doe', email: 'john@example.com' }
    ]
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error('Unhandled error:', err);

  const isDevelopment = process.env.NODE_ENV !== 'production';

  res.status(err.status || 500).json({
    error: isDevelopment ? err.message : 'Internal server error',
    ...(isDevelopment && { stack: err.stack })
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Graceful shutdown
const gracefulShutdown = (signal) => {
  logger.info(\`Received \${signal}. Starting graceful shutdown...\`);

  server.close((err) => {
    if (err) {
      logger.error('Error during server shutdown:', err);
      process.exit(1);
    }

    logger.info('Server closed successfully');
    process.exit(0);
  });

  // Force shutdown after 30 seconds
  setTimeout(() => {
    logger.error('Forced shutdown after timeout');
    process.exit(1);
  }, 30000);
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

const server = app.listen(PORT, () => {
  logger.info(\`Express server running on port \${PORT} in \${process.env.NODE_ENV} mode\`);
});`
        }
      ]
    }
  ],
  projects: [
    {
      title: "RESTful API with Authentication",
      description: "Build a complete RESTful API for a blog system with user authentication, CRUD operations for posts and comments, and proper error handling."
    },
    {
      title: "E-commerce Backend",
      description: "Create the backend for an e-commerce platform with product management, shopping cart, user authentication, and payment integration."
    },
    {
      title: "Real-time Chat Application",
      description: "Build a real-time chat application using Express.js and WebSockets with user authentication, chat rooms, and message persistence."
    },
    {
      title: "File Management System",
      description: "Develop a file upload and management system with user authentication, file validation, cloud storage integration, and access controls."
    },
    {
      title: "Task Management API",
      description: "Create a comprehensive task management API with user authentication, project management, task assignment, and progress tracking."
    }
  ],
  assessments: [
    {
      type: "quiz",
      questions: [
        {
          question: "What is middleware in Express.js?",
          options: [
            "A type of database",
            "Functions that have access to request and response objects",
            "A template engine",
            "A package manager"
          ],
          correctAnswer: "Functions that have access to request and response objects"
        },
        {
          question: "Which method is used to serve static files in Express.js?",
          options: [
            "app.static()",
            "express.static()",
            "app.use()",
            "app.serve()"
          ],
          correctAnswer: "express.static()"
        },
        {
          question: "What does CORS stand for?",
          options: [
            "Cross-Origin Resource Sharing",
            "Central Object Resource System",
            "Client Origin Request Service",
            "Common Object Response Standard"
          ],
          correctAnswer: "Cross-Origin Resource Sharing"
        },
        {
          question: "Which middleware is commonly used for parsing JSON in Express.js?",
          options: [
            "express.json()",
            "body-parser",
            "multer",
            "helmet"
          ],
          correctAnswer: "express.json()"
        },
        {
          question: "What is the purpose of the next() function in Express middleware?",
          options: [
            "To end the request-response cycle",
            "To pass control to the next middleware function",
            "To send a response to the client",
            "To handle errors"
          ],
          correctAnswer: "To pass control to the next middleware function"
        }
      ]
    },
    {
      type: "evaluation",
      questions: [
        {
          question: "Explain the middleware pattern in Express.js and provide an example of how you would implement custom authentication middleware.",
          options: [],
          correctAnswer: ""
        },
        {
          question: "Compare and contrast different template engines available for Express.js (EJS, Pug, Handlebars) and explain when you would choose each.",
          options: [],
          correctAnswer: ""
        },
        {
          question: "Describe the security considerations and best practices for deploying an Express.js application to production.",
          options: [],
          correctAnswer: ""
        }
      ]
    }
  ],
  aiPrompts: [
    "How do I implement authentication middleware in Express.js?",
    "What's the best way to handle file uploads in Express.js?",
    "How do I set up CORS properly in an Express.js API?",
    "Explain the difference between app.use() and app.get() in Express.js",
    "How do I implement rate limiting in Express.js?",
    "What's the best way to structure routes in a large Express.js application?",
    "How do I handle errors properly in Express.js?",
    "Explain Express.js middleware and provide practical examples",
    "How do I serve static files efficiently in Express.js?",
    "What's the difference between PUT and PATCH in REST APIs?"
  ],
  resources: [
    { name: "Express.js Official Documentation", url: "https://expressjs.com/" },
    { name: "Express.js API Reference", url: "https://expressjs.com/en/api.html" },
    { name: "Express.js Security Best Practices", url: "https://expressjs.com/en/advanced/best-practice-security.html" },
    { name: "Helmet.js Documentation", url: "https://helmetjs.github.io/" },
    { name: "CORS Documentation", url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS" },
    { name: "JWT.io", url: "https://jwt.io/" },
    { name: "Winston Logging", url: "https://github.com/winstonjs/winston" },
    { name: "PM2 Process Manager", url: "https://pm2.keymetrics.io/" }
  ],
  toolsRequired: [
    "Node.js (latest LTS version)",
    "npm or yarn package manager",
    "Express.js framework",
    "Postman or similar API testing tool",
    "JWT authentication library",
    "Helmet for security headers",
    "Winston for logging",
    "PM2 for process management",
    "Git for version control"
  ],
  bestPractices: [
    "Use middleware for cross-cutting concerns like authentication and logging",
    "Implement proper error handling with try-catch and error middleware",
    "Validate all user input to prevent security vulnerabilities",
    "Use environment variables for configuration, never hardcode sensitive data",
    "Implement rate limiting to prevent abuse and DoS attacks",
    "Use HTTPS in production and set security headers with Helmet",
    "Structure your application with routers for better organization",
    "Implement proper logging with Winston or similar libraries",
    "Use compression middleware to reduce response sizes",
    "Implement health check endpoints for monitoring",
    "Use PM2 or similar tools for production process management",
    "Handle graceful shutdown properly",
    "Implement proper CORS configuration for API security",
    "Use parameterized queries and input validation to prevent injection attacks",
    "Keep dependencies updated and audit for security vulnerabilities"
  ],
  commonPitfalls: [
    "Forgetting to call next() in middleware, breaking the request chain",
    "Not handling asynchronous errors properly in middleware",
    "Exposing sensitive information in error responses",
    "Not implementing proper input validation and sanitization",
    "Hardcoding sensitive configuration like API keys and database credentials",
    "Not using HTTPS in production environments",
    "Ignoring CORS configuration, leading to cross-origin request failures",
    "Not implementing rate limiting, making the API vulnerable to abuse",
    "Using outdated or vulnerable dependencies",
    "Not implementing proper logging for debugging and monitoring",
    "Trying to serve static files inefficiently without proper caching",
    "Not handling file upload security properly (validation, storage, access control)",
    "Using synchronous file system operations in production",
    "Not implementing proper session management and security",
    "Ignoring security headers and best practices"
  ],
  careerRelevance: "Express.js is the most popular Node.js framework and a cornerstone of modern web development. Mastering Express.js opens doors to full-stack JavaScript development roles, API development positions, and backend engineering opportunities. With the rise of microservices and serverless architectures, Express.js skills are highly sought after by employers. Developers proficient in Express.js can command competitive salaries and work on diverse projects ranging from startups to enterprise applications. The framework's extensive ecosystem and community support ensure long-term career viability and continuous learning opportunities."
};

export default expressjsContent;