const restApisContent = {
  id: "rest-apis",
  tier: 2,
  name: "REST APIs",
  description: "REST (Representational State Transfer) APIs are the foundation of modern web services. Learn to design, build, and consume RESTful APIs with proper HTTP methods, status codes, authentication, and best practices for scalable web services.",
  difficulty: "intermediate",
  estimatedHours: 25,
  prerequisites: ["nodejs", "expressjs", "json"],
  learningObjectives: [
    "Understand REST architectural principles and constraints",
    "Master HTTP methods (GET, POST, PUT, DELETE, PATCH)",
    "Design RESTful API endpoints with proper resource naming",
    "Implement HTTP status codes and error handling",
    "Work with request/response formats (JSON, XML, form data)",
    "Handle authentication and authorization in APIs",
    "Implement API versioning strategies",
    "Use API documentation tools and standards",
    "Optimize API performance with caching and pagination",
    "Secure APIs with rate limiting and input validation",
    "Test APIs with proper testing frameworks",
    "Handle CORS and cross-origin requests",
    "Implement API monitoring and logging",
    "Work with API clients and SDKs",
    "Design scalable and maintainable API architectures"
  ],
  sections: [
    {
      id: "rest-introduction",
      title: "Introduction to REST APIs",
      content: "REST (Representational State Transfer) is an architectural style for designing networked applications. It was first introduced by Roy Fielding in his doctoral dissertation in 2000 and has since become the standard for web APIs.\n\n**What makes an API RESTful?**\nREST APIs follow six key constraints:\n- **Client-Server Architecture**: Clear separation between client and server\n- **Stateless**: Each request contains all information needed to process it\n- **Cacheable**: Responses can be cached to improve performance\n- **Uniform Interface**: Consistent way to interact with resources\n- **Layered System**: Architecture can be composed of layers\n- **Code on Demand** (optional): Server can send executable code\n\n**Core Principles**:\n- **Resources**: Everything is a resource (users, posts, products)\n- **HTTP Methods**: Use standard HTTP methods for operations\n- **Stateless Communication**: No client state stored on server\n- **Uniform Resource Identifiers**: Each resource has a unique URL\n\nREST APIs are:\n- **Scalable**: Easy to scale horizontally\n- **Simple**: Uses standard HTTP protocols\n- **Flexible**: Can work with any data format\n- **Cacheable**: Built-in caching support\n- **Independent**: Client and server can evolve separately",
      keyTopics: [
        "What is REST?",
        "REST architectural constraints",
        "HTTP methods and their purposes",
        "Resource identification and URIs",
        "Stateless communication"
      ],
      practicalExercises: [
        "Analyze popular APIs (GitHub, Twitter, Stripe) for REST compliance",
        "Design resource URIs for a blog application",
        "Map CRUD operations to HTTP methods",
        "Create API documentation for a simple service",
        "Test API endpoints using different HTTP clients"
      ],
      codeExamples: [
        {
          title: "Basic REST API Structure",
          code: `const express = require('express');
const app = express();

// Middleware for parsing JSON
app.use(express.json());

// Sample data store
let users = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
];

// GET /users - Retrieve all users
app.get('/users', (req, res) => {
  res.json({
    success: true,
    data: users,
    count: users.length
  });
});

// GET /users/:id - Retrieve single user
app.get('/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));

  if (!user) {
    return res.status(404).json({
      success: false,
      error: 'User not found'
    });
  }

  res.json({
    success: true,
    data: user
  });
});

// POST /users - Create new user
app.post('/users', (req, res) => {
  const { name, email } = req.body;

  // Basic validation
  if (!name || !email) {
    return res.status(400).json({
      success: false,
      error: 'Name and email are required'
    });
  }

  const newUser = {
    id: users.length + 1,
    name,
    email
  };

  users.push(newUser);

  res.status(201).json({
    success: true,
    data: newUser
  });
});

// PUT /users/:id - Update user
app.put('/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));

  if (!user) {
    return res.status(404).json({
      success: false,
      error: 'User not found'
    });
  }

  const { name, email } = req.body;
  user.name = name || user.name;
  user.email = email || user.email;

  res.json({
    success: true,
    data: user
  });
});

// DELETE /users/:id - Delete user
app.delete('/users/:id', (req, res) => {
  const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));

  if (userIndex === -1) {
    return res.status(404).json({
      success: false,
      error: 'User not found'
    });
  }

  users.splice(userIndex, 1);

  res.json({
    success: true,
    message: 'User deleted successfully'
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(\`REST API server running on port \${PORT}\`);
});`
        },
        {
          title: "HTTP Status Codes Reference",
          code: `// HTTP Status Code Categories:
//
// 1xx - Informational responses
// 2xx - Successful responses
// 3xx - Redirection messages
// 4xx - Client error responses
// 5xx - Server error responses

const statusCodes = {
  // 2xx Success
  200: { code: 200, message: 'OK', description: 'Request succeeded' },
  201: { code: 201, message: 'Created', description: 'Resource created successfully' },
  202: { code: 202, message: 'Accepted', description: 'Request accepted for processing' },
  204: { code: 204, message: 'No Content', description: 'Request succeeded, no content returned' },

  // 3xx Redirection
  301: { code: 301, message: 'Moved Permanently', description: 'Resource moved permanently' },
  302: { code: 302, message: 'Found', description: 'Resource found at different location' },
  304: { code: 304, message: 'Not Modified', description: 'Resource not modified since last request' },

  // 4xx Client Errors
  400: { code: 400, message: 'Bad Request', description: 'Invalid request syntax' },
  401: { code: 401, message: 'Unauthorized', description: 'Authentication required' },
  403: { code: 403, message: 'Forbidden', description: 'Access denied' },
  404: { code: 404, message: 'Not Found', description: 'Resource not found' },
  405: { code: 405, message: 'Method Not Allowed', description: 'HTTP method not allowed' },
  409: { code: 409, message: 'Conflict', description: 'Request conflicts with current state' },
  422: { code: 422, message: 'Unprocessable Entity', description: 'Validation failed' },
  429: { code: 429, message: 'Too Many Requests', description: 'Rate limit exceeded' },

  // 5xx Server Errors
  500: { code: 500, message: 'Internal Server Error', description: 'Unexpected server error' },
  502: { code: 502, message: 'Bad Gateway', description: 'Invalid response from upstream server' },
  503: { code: 503, message: 'Service Unavailable', description: 'Server temporarily unavailable' },
  504: { code: 504, message: 'Gateway Timeout', description: 'Upstream server timeout' }
};

// Helper function to send standardized responses
function sendResponse(res, statusCode, data = null, message = null) {
  const status = statusCodes[statusCode];

  if (!status) {
    return res.status(500).json({
      success: false,
      error: 'Invalid status code'
    });
  }

  const response = {
    success: statusCode >= 200 && statusCode < 300,
    status: statusCode,
    message: message || status.message
  };

  if (data !== null) {
    response.data = data;
  }

  res.status(statusCode).json(response);
}

// Usage examples
app.get('/users/:id', (req, res) => {
  const user = findUser(req.params.id);

  if (!user) {
    return sendResponse(res, 404, null, 'User not found');
  }

  sendResponse(res, 200, user);
});

app.post('/users', (req, res) => {
  const errors = validateUser(req.body);

  if (errors.length > 0) {
    return sendResponse(res, 422, { errors }, 'Validation failed');
  }

  const user = createUser(req.body);
  sendResponse(res, 201, user, 'User created successfully');
});

module.exports = { statusCodes, sendResponse };`
        }
      ]
    },
    {
      id: "api-design",
      title: "API Design and Architecture",
      content: "Good API design is crucial for creating maintainable, scalable, and user-friendly web services. A well-designed API is intuitive, consistent, and follows established conventions.\n\n**Resource Naming Conventions**:\n- Use nouns, not verbs: `/users`, `/products`, not `/getUsers`, `/createProduct`\n- Use plural nouns: `/users` instead of `/user`\n- Use lowercase and hyphens: `/user-profiles` instead of `/userProfiles`\n- Be consistent: If you use `/users/:id/posts`, don't use `/articles/:id/comments`\n\n**HTTP Method Usage**:\n- **GET**: Retrieve resources (safe, idempotent, cacheable)\n- **POST**: Create new resources (not idempotent)\n- **PUT**: Update entire resource (idempotent)\n- **PATCH**: Partial resource update (not idempotent)\n- **DELETE**: Remove resource (idempotent)\n\n**Query Parameters**:\n- **Filtering**: `/users?status=active&department=engineering`\n- **Sorting**: `/users?sort=name&order=asc`\n- **Pagination**: `/users?page=2&limit=10`\n- **Searching**: `/users?q=john&fields=name,email`\n\n**API Versioning**:\n- **URL versioning**: `/v1/users`, `/v2/users`\n- **Header versioning**: `Accept: application/vnd.api.v1+json`\n- **Query parameter**: `/users?version=1`\n- **Content negotiation**: Based on Accept header\n\n**Response Formats**:\n- **JSON**: Most common, lightweight, human-readable\n- **XML**: Legacy systems, verbose but structured\n- **HAL/JSON**: Hypermedia links in JSON responses\n- **JSON:API**: Standardized JSON response format",
      keyTopics: [
        "RESTful resource naming",
        "HTTP method best practices",
        "API versioning strategies",
        "Query parameter design",
        "Response format standards"
      ],
      practicalExercises: [
        "Design API endpoints for an e-commerce platform",
        "Implement proper HTTP status codes for different scenarios",
        "Create API documentation following OpenAPI standards",
        "Design pagination and filtering for large datasets",
        "Implement API versioning for backward compatibility"
      ],
      codeExamples: [
        {
          title: "Well-Designed REST API Structure",
          code: `const express = require('express');
const router = express.Router();

// User routes with proper REST design
// GET /api/v1/users - List all users
router.get('/users', (req, res) => {
  const { page = 1, limit = 10, sort = 'created_at', order = 'desc', q } = req.query;

  // Build query with filters
  let query = {};
  if (q) {
    query = {
      $or: [
        { name: new RegExp(q, 'i') },
        { email: new RegExp(q, 'i') }
      ]
    };
  }

  // Calculate pagination
  const skip = (page - 1) * limit;

  User.find(query)
    .sort({ [sort]: order === 'desc' ? -1 : 1 })
    .limit(limit)
    .skip(skip)
    .then(users => {
      User.countDocuments(query).then(total => {
        res.json({
          success: true,
          data: users,
          pagination: {
            page: parseInt(page),
            limit: parseInt(limit),
            total,
            pages: Math.ceil(total / limit)
          }
        });
      });
    })
    .catch(err => res.status(500).json({ success: false, error: err.message }));
});

// GET /api/v1/users/:id - Get single user
router.get('/users/:id', (req, res) => {
  User.findById(req.params.id)
    .then(user => {
      if (!user) {
        return res.status(404).json({ success: false, error: 'User not found' });
      }
      res.json({ success: true, data: user });
    })
    .catch(err => res.status(500).json({ success: false, error: err.message }));
});

// POST /api/v1/users - Create user
router.post('/users', (req, res) => {
  const { name, email, password } = req.body;

  // Validation
  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      error: 'Name, email, and password are required'
    });
  }

  // Check if user exists
  User.findOne({ email })
    .then(existingUser => {
      if (existingUser) {
        return res.status(409).json({
          success: false,
          error: 'User with this email already exists'
        });
      }

      // Create new user
      const user = new User({ name, email, password: hashPassword(password) });
      return user.save();
    })
    .then(user => {
      // Don't return password in response
      const userResponse = user.toObject();
      delete userResponse.password;

      res.status(201).json({
        success: true,
        data: userResponse,
        message: 'User created successfully'
      });
    })
    .catch(err => res.status(500).json({ success: false, error: err.message }));
});

// PUT /api/v1/users/:id - Update entire user
router.put('/users/:id', (req, res) => {
  const { name, email } = req.body;

  User.findByIdAndUpdate(
    req.params.id,
    { name, email, updated_at: new Date() },
    { new: true, runValidators: true }
  )
    .then(user => {
      if (!user) {
        return res.status(404).json({ success: false, error: 'User not found' });
      }
      res.json({ success: true, data: user });
    })
    .catch(err => {
      if (err.name === 'ValidationError') {
        res.status(422).json({ success: false, error: err.message });
      } else {
        res.status(500).json({ success: false, error: err.message });
      }
    });
});

// PATCH /api/v1/users/:id - Partial update
router.patch('/users/:id', (req, res) => {
  const updates = req.body;
  updates.updated_at = new Date();

  User.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true })
    .then(user => {
      if (!user) {
        return res.status(404).json({ success: false, error: 'User not found' });
      }
      res.json({ success: true, data: user });
    })
    .catch(err => res.status(500).json({ success: false, error: err.message }));
});

// DELETE /api/v1/users/:id - Delete user
router.delete('/users/:id', (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(user => {
      if (!user) {
        return res.status(404).json({ success: false, error: 'User not found' });
      }
      res.json({ success: true, message: 'User deleted successfully' });
    })
    .catch(err => res.status(500).json({ success: false, error: err.message }));
});

// Nested resources: GET /api/v1/users/:id/posts
router.get('/users/:id/posts', (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  Post.find({ author: req.params.id })
    .populate('author', 'name email')
    .sort({ created_at: -1 })
    .limit(limit)
    .skip((page - 1) * limit)
    .then(posts => res.json({ success: true, data: posts }))
    .catch(err => res.status(500).json({ success: false, error: err.message }));
});

module.exports = router;`
        },
        {
          title: "API Versioning and Content Negotiation",
          code: `const express = require('express');
const router = express.Router();

// API Versioning middleware
const apiVersioning = (req, res, next) => {
  // Support multiple versioning strategies

  // 1. URL versioning (e.g., /v1/users, /v2/users)
  const urlVersion = req.path.match(/^\/v(\d+)\//);
  if (urlVersion) {
    req.apiVersion = parseInt(urlVersion[1]);
  }

  // 2. Accept header versioning (e.g., application/vnd.api.v2+json)
  const acceptVersion = req.headers.accept?.match(/vnd\.api\.v(\d+)/);
  if (acceptVersion) {
    req.apiVersion = parseInt(acceptVersion[1]);
  }

  // 3. Query parameter versioning (e.g., ?version=2)
  if (req.query.version) {
    req.apiVersion = parseInt(req.query.version);
  }

  // Default to version 1
  req.apiVersion = req.apiVersion || 1;

  next();
};

// Content negotiation middleware
const contentNegotiation = (req, res, next) => {
  const accept = req.headers.accept || 'application/json';

  if (accept.includes('application/xml')) {
    req.responseFormat = 'xml';
  } else if (accept.includes('application/vnd.api+json')) {
    req.responseFormat = 'json-api';
  } else {
    req.responseFormat = 'json';
  }

  next();
};

// Apply middleware
router.use(apiVersioning);
router.use(contentNegotiation);

// Version-specific response formatters
const formatters = {
  json: (data) => JSON.stringify(data),

  xml: (data) => {
    const toXML = (obj, rootName = 'response') => {
      let xml = \`<\${rootName}>\`;
      for (const [key, value] of Object.entries(obj)) {
        if (Array.isArray(value)) {
          xml += \`<\${key}>\${value.map(item =>
            typeof item === 'object' ? toXML(item, 'item') : \`<\${key}>\${item}</\${key}>\`
          ).join('')}</\${key}>\`;
        } else if (typeof value === 'object' && value !== null) {
          xml += toXML(value, key);
        } else {
          xml += \`<\${key}>\${value}</\${key}>\`;
        }
      }
      xml += \`</\${rootName}>\`;
      return xml;
    };
    return toXML(data);
  },

  'json-api': (data) => JSON.stringify({
    data: Array.isArray(data) ? data.map(item => ({ type: 'user', id: item.id, attributes: item })) : { type: 'user', id: data.id, attributes: data }
  })
};

// Version 1 API
const v1Routes = express.Router();

v1Routes.get('/users', (req, res) => {
  // V1 response format
  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
  ];

  const response = { success: true, data: users, version: 1 };
  const formatted = formatters[req.responseFormat](response);

  res.set('Content-Type', req.responseFormat === 'xml' ? 'application/xml' : 'application/json');
  res.send(formatted);
});

v1Routes.get('/users/:id', (req, res) => {
  const user = { id: req.params.id, name: 'John Doe', email: 'john@example.com' };
  const response = { success: true, data: user, version: 1 };
  const formatted = formatters[req.responseFormat](response);

  res.set('Content-Type', req.responseFormat === 'xml' ? 'application/xml' : 'application/json');
  res.send(formatted);
});

// Version 2 API with enhanced features
const v2Routes = express.Router();

v2Routes.get('/users', (req, res) => {
  // V2 includes additional fields and features
  const users = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'https://example.com/avatar1.jpg',
      role: 'admin',
      last_login: '2023-12-01T10:30:00Z',
      preferences: { theme: 'dark', notifications: true }
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      avatar: 'https://example.com/avatar2.jpg',
      role: 'user',
      last_login: '2023-11-28T15:45:00Z',
      preferences: { theme: 'light', notifications: false }
    }
  ];

  const response = {
    success: true,
    data: users,
    version: 2,
    meta: {
      count: users.length,
      timestamp: new Date().toISOString()
    }
  };

  const formatted = formatters[req.responseFormat](response);

  res.set('Content-Type', req.responseFormat === 'xml' ? 'application/xml' : 'application/json');
  res.set('X-API-Version', '2');
  res.send(formatted);
});

// Mount versioned routes
router.use('/v1', v1Routes);
router.use('/v2', v2Routes);

// Default route redirects to latest version
router.get('/users', (req, res) => {
  res.redirect('/v2/users');
});

module.exports = router;`
        }
      ]
    },
    {
      id: "api-authentication",
      title: "API Authentication and Security",
      content: "API security is paramount in today's interconnected world. Without proper authentication and authorization, your API becomes vulnerable to attacks and data breaches.\n\n**Authentication Methods**:\n- **Basic Authentication**: Username/password encoded in base64\n- **API Keys**: Simple token-based authentication\n- **JWT (JSON Web Tokens)**: Stateless token-based authentication\n- **OAuth 2.0**: Industry-standard authorization framework\n- **Session-based**: Traditional server-side sessions\n\n**JWT Structure**:\n- **Header**: Algorithm and token type\n- **Payload**: User data and claims\n- **Signature**: Ensures token integrity\n\n**Security Best Practices**:\n- **Use HTTPS**: Encrypt all API communications\n- **Validate Input**: Sanitize and validate all user input\n- **Rate Limiting**: Prevent abuse with request limits\n- **CORS**: Control cross-origin resource sharing\n- **API Keys**: Use strong, unique keys for each client\n- **Token Expiration**: Implement proper token lifecycle\n- **Audit Logging**: Log all API access and errors\n\n**Common Security Threats**:\n- **Injection Attacks**: SQL injection, NoSQL injection\n- **Cross-Site Scripting (XSS)**: Malicious script injection\n- **Cross-Site Request Forgery (CSRF)**: Unauthorized state changes\n- **Man-in-the-Middle**: Intercepting communications\n- **Brute Force**: Automated password guessing\n- **DDoS**: Overwhelming the server with requests",
      keyTopics: [
        "Authentication methods (JWT, OAuth, API keys)",
        "Authorization and access control",
        "Input validation and sanitization",
        "Rate limiting and throttling",
        "CORS configuration"
      ],
      practicalExercises: [
        "Implement JWT authentication for a REST API",
        "Create role-based access control (RBAC)",
        "Set up API rate limiting and throttling",
        "Implement input validation middleware",
        "Configure CORS for cross-origin requests"
      ],
      codeExamples: [
        {
          title: "JWT Authentication Implementation",
          code: `const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const rateLimit = require('express-rate-limit');

const app = express();
app.use(express.json());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});

app.use('/api/', limiter);

// JWT configuration
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const JWT_EXPIRE = '24h';

// In-memory user store (use database in production)
const users = [
  {
    id: 1,
    email: 'admin@example.com',
    password: '$2a$10$hashedpassword', // bcrypt hash of 'password'
    role: 'admin'
  }
];

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ success: false, error: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ success: false, error: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// Role-based authorization middleware
const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ success: false, error: 'Authentication required' });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ success: false, error: 'Insufficient permissions' });
    }

    next();
  };
};

// Input validation middleware
const validateUserInput = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      error: 'Email and password are required'
    });
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      error: 'Invalid email format'
    });
  }

  // Password strength validation
  if (password.length < 6) {
    return res.status(400).json({
      success: false,
      error: 'Password must be at least 6 characters long'
    });
  }

  next();
};

// Login route
app.post('/api/auth/login', validateUserInput, async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = users.find(u => u.email === email);
    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials'
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRE }
    );

    res.json({
      success: true,
      data: {
        token,
        user: {
          id: user.id,
          email: user.email,
          role: user.role
        }
      }
    });

  } catch (error) {
    res.status(500).json({ success: false, error: 'Login failed' });
  }
});

// Register route
app.post('/api/auth/register', validateUserInput, async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      return res.status(409).json({
        success: false,
        error: 'User already exists'
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = {
      id: users.length + 1,
      email,
      password: hashedPassword,
      role: 'user'
    };

    users.push(newUser);

    // Generate token
    const token = jwt.sign(
      {
        id: newUser.id,
        email: newUser.email,
        role: newUser.role
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRE }
    );

    res.status(201).json({
      success: true,
      data: {
        token,
        user: {
          id: newUser.id,
          email: newUser.email,
          role: newUser.role
        }
      }
    });

  } catch (error) {
    res.status(500).json({ success: false, error: 'Registration failed' });
  }
});

// Protected routes
app.get('/api/users/profile', authenticateToken, (req, res) => {
  res.json({
    success: true,
    data: {
      id: req.user.id,
      email: req.user.email,
      role: req.user.role
    }
  });
});

// Admin-only route
app.get('/api/admin/users', authenticateToken, authorizeRoles('admin'), (req, res) => {
  res.json({
    success: true,
    data: users.map(u => ({ id: u.id, email: u.email, role: u.role }))
  });
});

// Token refresh route
app.post('/api/auth/refresh', authenticateToken, (req, res) => {
  const newToken = jwt.sign(
    {
      id: req.user.id,
      email: req.user.email,
      role: req.user.role
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRE }
  );

  res.json({
    success: true,
    data: { token: newToken }
  });
});

// Logout route (client-side token removal)
app.post('/api/auth/logout', authenticateToken, (req, res) => {
  res.json({
    success: true,
    message: 'Logged out successfully'
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(\`Secure API server running on port \${PORT}\`);
});`
        },
        {
          title: "API Security Middleware",
          code: `const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const expressRateLimit = require('express-rate-limit');
const slowDown = require('express-slow-down');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

const app = express();

// Security middleware configuration
const configureSecurity = (app) => {
  // Helmet - Security headers
  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'"],
        imgSrc: ["'self'", "data:", "https:"],
      },
    },
  }));

  // CORS configuration
  const corsOptions = {
    origin: process.env.NODE_ENV === 'production'
      ? ['https://yourdomain.com', 'https://app.yourdomain.com']
      : ['http://localhost:3000', 'http://localhost:3001'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-API-Key'],
    credentials: true,
    maxAge: 86400 // 24 hours
  };

  app.use(cors(corsOptions));

  // Rate limiting - General API rate limit
  const generalLimiter = expressRateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: {
      success: false,
      error: 'Too many requests from this IP, please try again later.',
      retryAfter: '15 minutes'
    },
    standardHeaders: true,
    legacyHeaders: false,
  });

  app.use('/api/', generalLimiter);

  // Stricter rate limiting for auth endpoints
  const authLimiter = expressRateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // limit each IP to 5 auth attempts per windowMs
    message: {
      success: false,
      error: 'Too many authentication attempts, please try again later.',
      retryAfter: '15 minutes'
    },
    skipSuccessfulRequests: true, // Don't count successful logins
  });

  app.use('/api/auth/', authLimiter);

  // Speed limiting - Slow down after multiple requests
  const speedLimiter = slowDown({
    windowMs: 15 * 60 * 1000, // 15 minutes
    delayAfter: 50, // allow 50 requests per 15 minutes without delay
    delayMs: 500, // add 500ms of delay per request after delayAfter
  });

  app.use(speedLimiter);

  // Data sanitization
  app.use(mongoSanitize()); // Prevent NoSQL injection
  app.use(xss()); // Prevent XSS attacks

  // Prevent parameter pollution
  app.use(hpp({
    whitelist: ['sort', 'fields', 'page', 'limit'] // Allow these parameters to be duplicated
  }));

  return app;
};

// Input validation middleware
const validateInput = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: error.details.map(detail => detail.message)
      });
    }

    next();
  };
};

// API key authentication middleware
const authenticateApiKey = (req, res, next) => {
  const apiKey = req.headers['x-api-key'] || req.query.api_key;

  if (!apiKey) {
    return res.status(401).json({
      success: false,
      error: 'API key required'
    });
  }

  // In production, validate against database
  const validApiKeys = process.env.VALID_API_KEYS?.split(',') || [];

  if (!validApiKeys.includes(apiKey)) {
    return res.status(403).json({
      success: false,
      error: 'Invalid API key'
    });
  }

  req.apiKey = apiKey;
  next();
};

// Request logging middleware
const requestLogger = (req, res, next) => {
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(\`\${new Date().toISOString()} - \${req.method} \${req.originalUrl} - \${res.statusCode} - \${duration}ms\`);
  });

  next();
};

// Error handling middleware
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  // Don't leak error details in production
  const isDevelopment = process.env.NODE_ENV === 'development';

  res.status(err.status || 500).json({
    success: false,
    error: isDevelopment ? err.message : 'Internal server error',
    ...(isDevelopment && { stack: err.stack })
  });
};

// 404 handler
const notFoundHandler = (req, res, next) => {
  res.status(404).json({
    success: false,
    error: 'API endpoint not found',
    path: req.originalUrl,
    method: req.method
  });
};

// Health check endpoint
const healthCheck = (req, res) => {
  res.json({
    success: true,
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development'
  });
};

// Apply security configuration
configureSecurity(app);

// Apply other middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(requestLogger);

// Health check (no auth required)
app.get('/health', healthCheck);
app.get('/api/health', healthCheck);

// Example protected route with API key
app.get('/api/protected', authenticateApiKey, (req, res) => {
  res.json({
    success: true,
    message: 'Access granted',
    apiKey: req.apiKey.substring(0, 8) + '...' // Don't expose full key
  });
});

// Apply error handlers
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;`
        }
      ]
    },
    {
      id: "api-performance",
      title: "API Performance and Optimization",
      content: "API performance directly impacts user experience and system scalability. Slow APIs lead to frustrated users and increased infrastructure costs. Optimizing API performance requires a multi-layered approach.\n\n**Caching Strategies**:\n- **Browser Caching**: HTTP headers for static resources\n- **CDN Caching**: Global content delivery networks\n- **Application Caching**: In-memory caches (Redis, Memcached)\n- **Database Caching**: Query result caching\n- **API Response Caching**: Cache expensive computations\n\n**Database Optimization**:\n- **Connection Pooling**: Reuse database connections\n- **Query Optimization**: Use indexes, avoid N+1 queries\n- **Pagination**: Limit result sets\n- **Read Replicas**: Separate read and write operations\n- **Database Sharding**: Distribute data across multiple servers\n\n**Response Optimization**:\n- **Compression**: Gzip/Brotli compression\n- **Pagination**: Limit response size\n- **Field Selection**: Allow clients to specify needed fields\n- **HTTP/2**: Multiplexed connections\n- **Binary Formats**: Protocol Buffers, MessagePack\n\n**Monitoring and Metrics**:\n- **Response Times**: Track API latency\n- **Error Rates**: Monitor failure rates\n- **Throughput**: Measure requests per second\n- **Resource Usage**: CPU, memory, database connections\n- **User Metrics**: Track usage patterns\n\n**Load Balancing**:\n- **Round Robin**: Distribute requests evenly\n- **Least Connections**: Send to least loaded server\n- **IP Hash**: Route based on client IP\n- **Geographic**: Route to nearest server\n\n**Scaling Strategies**:\n- **Horizontal Scaling**: Add more servers\n- **Vertical Scaling**: Upgrade server resources\n- **Microservices**: Break down monolithic APIs\n- **Serverless**: Auto-scaling functions",
      keyTopics: [
        "Caching strategies and implementation",
        "Database query optimization",
        "Response compression and optimization",
        "Load balancing and scaling",
        "API monitoring and metrics"
      ],
      practicalExercises: [
        "Implement Redis caching for API responses",
        "Optimize database queries with proper indexing",
        "Set up API response compression",
        "Implement pagination for large datasets",
        "Create API performance monitoring dashboard"
      ],
      codeExamples: [
        {
          title: "API Caching and Performance Optimization",
          code: `const express = require('express');
const redis = require('redis');
const compression = require('compression');
const responseTime = require('response-time');

const app = express();

// Redis client for caching
const redisClient = redis.createClient({
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT || 6379,
  password: process.env.REDIS_PASSWORD
});

redisClient.on('error', (err) => console.error('Redis error:', err));

// Middleware setup
app.use(compression()); // Enable gzip compression
app.use(responseTime()); // Track response times

// Cache middleware
const cache = (duration) => {
  return (req, res, next) => {
    const key = \`__\${req.originalUrl}__\${JSON.stringify(req.query)}\`;

    redisClient.get(key, (err, cachedData) => {
      if (err) {
        console.error('Cache error:', err);
        return next();
      }

      if (cachedData) {
        const parsedData = JSON.parse(cachedData);
        res.set('X-Cache', 'HIT');
        return res.json(parsedData);
      }

      // Store original json method
      const originalJson = res.json;
      res.json = function(data) {
        // Cache the response
        redisClient.setex(key, duration, JSON.stringify(data));
        res.set('X-Cache', 'MISS');
        originalJson.call(this, data);
      };

      next();
    });
  };
};

// Database connection pool (simulated)
const dbPool = {
  query: (sql, params, callback) => {
    // Simulate database query with delay
    setTimeout(() => {
      const mockData = [
        { id: 1, name: 'Product A', price: 29.99 },
        { id: 2, name: 'Product B', price: 49.99 },
        { id: 3, name: 'Product C', price: 19.99 }
      ];
      callback(null, mockData);
    }, Math.random() * 100); // Random delay 0-100ms
  }
};

// Optimized product API with caching
app.get('/api/products', cache(300), async (req, res) => {
  try {
    const { page = 1, limit = 10, category, minPrice, maxPrice, sort = 'name', order = 'asc' } = req.query;

    // Build query with filters
    let query = 'SELECT * FROM products WHERE 1=1';
    const params = [];

    if (category) {
      query += ' AND category = ?';
      params.push(category);
    }

    if (minPrice) {
      query += ' AND price >= ?';
      params.push(minPrice);
    }

    if (maxPrice) {
      query += ' AND price <= ?';
      params.push(maxPrice);
    }

    // Add sorting
    const validSortFields = ['name', 'price', 'created_at'];
    const sortField = validSortFields.includes(sort) ? sort : 'name';
    const sortOrder = order.toLowerCase() === 'desc' ? 'DESC' : 'ASC';
    query += \` ORDER BY \${sortField} \${sortOrder}\`;

    // Add pagination
    const offset = (page - 1) * limit;
    query += ' LIMIT ? OFFSET ?';
    params.push(parseInt(limit), offset);

    // Execute query
    dbPool.query(query, params, (err, results) => {
      if (err) {
        return res.status(500).json({ success: false, error: 'Database error' });
      }

      // Get total count for pagination
      const countQuery = 'SELECT COUNT(*) as total FROM products WHERE 1=1';
      const countParams = params.slice(0, -2); // Remove LIMIT and OFFSET

      dbPool.query(countQuery, countParams, (err, countResult) => {
        if (err) {
          return res.status(500).json({ success: false, error: 'Database error' });
        }

        const total = countResult[0].total;
        const totalPages = Math.ceil(total / limit);

        res.json({
          success: true,
          data: results,
          pagination: {
            page: parseInt(page),
            limit: parseInt(limit),
            total,
            totalPages,
            hasNext: page < totalPages,
            hasPrev: page > 1
          },
          meta: {
            queryTime: Date.now(),
            cached: false
          }
        });
      });
    });

  } catch (error) {
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// Optimized single product endpoint
app.get('/api/products/:id', cache(600), (req, res) => {
  const productId = req.params.id;

  // Validate ID
  if (isNaN(productId)) {
    return res.status(400).json({ success: false, error: 'Invalid product ID' });
  }

  dbPool.query('SELECT * FROM products WHERE id = ?', [productId], (err, results) => {
    if (err) {
      return res.status(500).json({ success: false, error: 'Database error' });
    }

    if (results.length === 0) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }

    res.json({
      success: true,
      data: results[0]
    });
  });
});

// Search endpoint with debouncing
let searchTimeout;
app.get('/api/products/search', (req, res) => {
  const { q } = req.query;

  if (!q || q.length < 2) {
    return res.json({ success: true, data: [], message: 'Search query too short' });
  }

  // Clear previous timeout
  if (searchTimeout) {
    clearTimeout(searchTimeout);
  }

  // Debounce search requests
  searchTimeout = setTimeout(() => {
    const searchQuery = \`SELECT * FROM products WHERE name LIKE ? OR description LIKE ? LIMIT 20\`;
    const searchParam = \`%\${q}%\`;

    dbPool.query(searchQuery, [searchParam, searchParam], (err, results) => {
      if (err) {
        return res.status(500).json({ success: false, error: 'Search error' });
      }

      res.json({
        success: true,
        data: results,
        query: q
      });
    });
  }, 300); // 300ms debounce
});

// Cache management endpoints
app.post('/api/cache/clear', (req, res) => {
  redisClient.flushall((err, reply) => {
    if (err) {
      return res.status(500).json({ success: false, error: 'Cache clear failed' });
    }

    res.json({
      success: true,
      message: 'Cache cleared successfully',
      keysFlushed: reply
    });
  });
});

// Performance monitoring endpoint
app.get('/api/metrics', (req, res) => {
  // Get Redis stats
  redisClient.info((err, info) => {
    if (err) {
      return res.status(500).json({ success: false, error: 'Metrics error' });
    }

    const metrics = {
      redis: {
        connected_clients: info.match(/connected_clients:(\d+)/)?.[1],
        used_memory: info.match(/used_memory:(\d+)/)?.[1],
        total_connections_received: info.match(/total_connections_received:(\d+)/)?.[1]
      },
      server: {
        uptime: process.uptime(),
        memory: process.memoryUsage(),
        node_version: process.version
      },
      timestamp: new Date().toISOString()
    };

    res.json({ success: true, data: metrics });
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(\`Optimized API server running on port \${PORT}\`);
});`
        },
        {
          title: "API Monitoring and Analytics",
          code: `const express = require('express');
const promClient = require('prom-client');
const winston = require('winston');
const morgan = require('morgan');

const app = express();

// Prometheus metrics setup
const register = new promClient.Registry();

// Add default metrics (CPU, memory, etc.)
promClient.collectDefaultMetrics({ register });

// Custom metrics
const httpRequestDuration = new promClient.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status_code'],
  buckets: [0.1, 0.5, 1, 2, 5, 10]
});

const httpRequestsTotal = new promClient.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status_code']
});

const activeConnections = new promClient.Gauge({
  name: 'active_connections',
  help: 'Number of active connections'
});

register.registerMetric(httpRequestDuration);
register.registerMetric(httpRequestsTotal);
register.registerMetric(activeConnections);

// Winston logger setup
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { service: 'api-service' },
  transports: [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' }),
    new winston.transports.Console({
      format: winston.format.simple()
    })
  ]
});

// Morgan middleware for HTTP request logging
app.use(morgan('combined', {
  stream: { write: (message) => logger.info(message.trim()) }
}));

// Request tracking middleware
app.use((req, res, next) => {
  const start = process.hrtime.bigint();

  // Track active connections
  activeConnections.inc();

  res.on('finish', () => {
    const end = process.hrtime.bigint();
    const duration = Number(end - start) / 1e9; // Convert to seconds

    // Record metrics
    httpRequestDuration
      .labels(req.method, req.route?.path || req.path, res.statusCode.toString())
      .observe(duration);

    httpRequestsTotal
      .labels(req.method, req.route?.path || req.path, res.statusCode.toString())
      .inc();

    // Log slow requests
    if (duration > 1) {
      logger.warn('Slow request detected', {
        method: req.method,
        path: req.path,
        duration,
        statusCode: res.statusCode,
        userAgent: req.get('User-Agent'),
        ip: req.ip
      });
    }

    // Decrease active connections
    activeConnections.dec();
  });

  next();
});

// Error tracking middleware
app.use((err, req, res, next) => {
  logger.error('Unhandled error', {
    error: err.message,
    stack: err.stack,
    method: req.method,
    path: req.path,
    body: req.body,
    query: req.query,
    params: req.params,
    ip: req.ip
  });

  res.status(500).json({
    success: false,
    error: 'Internal server error'
  });
});

// API routes with monitoring
app.get('/api/users', (req, res) => {
  // Simulate API work
  setTimeout(() => {
    res.json({
      success: true,
      data: [
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Smith' }
      ]
    });
  }, Math.random() * 500); // Random delay
});

app.post('/api/users', (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    logger.warn('Validation failed for user creation', {
      body: req.body,
      ip: req.ip
    });

    return res.status(400).json({
      success: false,
      error: 'Name and email are required'
    });
  }

  // Simulate user creation
  const newUser = { id: Date.now(), name, email };

  logger.info('User created successfully', {
    userId: newUser.id,
    name,
    email,
    ip: req.ip
  });

  res.status(201).json({
    success: true,
    data: newUser
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  const health = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    version: process.env.npm_package_version || '1.0.0'
  };

  // Log health check
  logger.debug('Health check requested', { ip: req.ip });

  res.json(health);
});

// Metrics endpoint for Prometheus
app.get('/metrics', async (req, res) => {
  try {
    const metrics = await register.metrics();
    res.set('Content-Type', register.contentType);
    res.end(metrics);
  } catch (error) {
    logger.error('Metrics collection failed', { error: error.message });
    res.status(500).end();
  }
});

// Analytics endpoint
app.get('/api/analytics', (req, res) => {
  // Get metrics summary
  const metrics = register.getMetricsAsJSON();

  const analytics = {
    totalRequests: 0,
    averageResponseTime: 0,
    errorRate: 0,
    topRoutes: [],
    serverHealth: {
      uptime: process.uptime(),
      memoryUsage: process.memoryUsage(),
      activeConnections: activeConnections.hashMap?.['']?.value || 0
    }
  };

  // Calculate analytics from metrics
  metrics.forEach(metric => {
    if (metric.name === 'http_requests_total') {
      metric.values.forEach(value => {
        analytics.totalRequests += value.value;
      });
    }
  });

  res.json({
    success: true,
    data: analytics,
    timestamp: new Date().toISOString()
  });
});

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  logger.info('SIGINT received, shutting down gracefully');
  process.exit(0);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.info(\`API monitoring server running on port \${PORT}\`);
});`
        }
      ]
    }
  ],
  projects: [
    {
      title: "E-commerce API Platform",
      description: "Build a complete REST API for an e-commerce platform with user authentication, product management, shopping cart, order processing, and payment integration."
    },
    {
      title: "Social Media API",
      description: "Create a comprehensive social media REST API with user profiles, posts, comments, likes, following/followers, notifications, and real-time updates."
    },
    {
      title: "Task Management API",
      description: "Develop a REST API for a task management application with user authentication, project management, task assignment, time tracking, and team collaboration features."
    },
    {
      title: "Weather API Service",
      description: "Build a weather API service that aggregates data from multiple weather providers, implements caching, rate limiting, and provides both current and forecast data."
    },
    {
      title: "File Storage API",
      description: "Create a REST API for file storage and management with upload/download capabilities, file versioning, sharing permissions, and cloud storage integration."
    }
  ],
  assessments: [
    {
      type: "quiz",
      questions: [
        {
          question: "Which HTTP method should be used to retrieve a resource?",
          options: [
            "POST",
            "GET",
            "PUT",
            "DELETE"
          ],
          correctAnswer: "GET"
        },
        {
          question: "What does REST stand for?",
          options: [
            "Representational State Transfer",
            "Remote Execution and Storage Technology",
            "Resource Exchange and Synchronization Tool",
            "Rapid Endpoint Service Technology"
          ],
          correctAnswer: "Representational State Transfer"
        },
        {
          question: "Which HTTP status code indicates a successful resource creation?",
          options: [
            "200 OK",
            "201 Created",
            "202 Accepted",
            "204 No Content"
          ],
          correctAnswer: "201 Created"
        },
        {
          question: "What is the primary purpose of JWT in API authentication?",
          options: [
            "To encrypt API responses",
            "To provide stateless authentication",
            "To compress API data",
            "To validate API endpoints"
          ],
          correctAnswer: "To provide stateless authentication"
        },
        {
          question: "Which header is used for API versioning in REST APIs?",
          options: [
            "X-API-Version",
            "Content-Type",
            "Authorization",
            "Accept"
          ],
          correctAnswer: "Accept"
        }
      ]
    },
    {
      type: "evaluation",
      questions: [
        {
          question: "Design a REST API for a blog application including all CRUD operations, proper HTTP status codes, and error handling. Explain your design decisions.",
          options: [],
          correctAnswer: ""
        },
        {
          question: "Compare and contrast different API authentication methods (API keys, JWT, OAuth). When would you use each method?",
          options: [],
          correctAnswer: ""
        },
        {
          question: "Explain how you would implement rate limiting and caching in a REST API. What tools and strategies would you use?",
          options: [],
          correctAnswer: ""
        }
      ]
    }
  ],
  aiPrompts: [
    "How do I design a RESTful API?",
    "What's the best way to implement API authentication?",
    "How do I handle API versioning?",
    "What's the difference between PUT and PATCH?",
    "How do I implement API rate limiting?",
    "How do I document my REST API?",
    "What's the best way to handle API errors?",
    "How do I implement API caching?",
    "How do I secure my REST API?",
    "How do I test REST API endpoints?"
  ],
  resources: [
    { name: "REST API Tutorial", url: "https://restfulapi.net/" },
    { name: "HTTP Status Codes", url: "https://httpstatuses.com/" },
    { name: "JWT.io", url: "https://jwt.io/" },
    { name: "OpenAPI Specification", url: "https://swagger.io/specification/" },
    { name: "Postman API Client", url: "https://www.postman.com/" },
    { name: "Insomnia REST Client", url: "https://insomnia.rest/" },
    { name: "Express.js Documentation", url: "https://expressjs.com/" },
    { name: "API Security Best Practices", url: "https://owasp.org/www-project-api-security/" }
  ],
  toolsRequired: [
    "Node.js (latest LTS version)",
    "Express.js framework",
    "Postman or Insomnia for testing",
    "JWT library for authentication",
    "Database (MongoDB, PostgreSQL, or SQLite)",
    "Redis for caching (optional)",
    "API documentation tools (Swagger/OpenAPI)",
    "Testing frameworks (Jest, Supertest)",
    "Security tools (Helmet, CORS)",
    "Monitoring tools (Prometheus, Winston)"
  ],
  bestPractices: [
    "Use proper HTTP methods for CRUD operations",
    "Implement consistent resource naming conventions",
    "Use appropriate HTTP status codes for responses",
    "Implement proper error handling and validation",
    "Use authentication and authorization for protected endpoints",
    "Implement rate limiting to prevent abuse",
    "Use HTTPS for all API communications",
    "Implement proper API versioning strategy",
    "Document your API with OpenAPI/Swagger",
    "Use pagination for large result sets",
    "Implement caching for better performance",
    "Use compression for response data",
    "Validate all input data",
    "Log API requests and errors",
    "Implement proper CORS configuration",
    "Use environment variables for configuration",
    "Test your API endpoints thoroughly",
    "Monitor API performance and usage",
    "Implement graceful error handling",
    "Use consistent response formats"
  ],
  commonPitfalls: [
    "Using wrong HTTP methods for operations",
    "Not implementing proper authentication",
    "Exposing sensitive data in responses",
    "Not handling errors properly",
    "Missing input validation",
    "Not implementing rate limiting",
    "Using HTTP instead of HTTPS",
    "Breaking changes without versioning",
    "Poor API documentation",
    "Not implementing pagination",
    "Missing caching strategies",
    "Not compressing responses",
    "Inconsistent response formats",
    "Not logging API activity",
    "Improper CORS configuration",
    "Hardcoding configuration values",
    "Inadequate testing",
    "Not monitoring API health",
    "Poor error messages",
    "Inconsistent naming conventions"
  ],
  careerRelevance: "REST API development is one of the most in-demand skills in modern software development. Almost every web and mobile application requires API integration, making REST API expertise highly valuable. Developers proficient in REST APIs can work as backend developers, API developers, full-stack developers, and integration specialists. The skills translate well across different programming languages and frameworks. With the rise of microservices architecture and API-first development, REST API knowledge is essential for modern development teams. Companies across all industries need developers who can design, build, and maintain scalable APIs that power their digital products and services."
};

export default restApisContent;