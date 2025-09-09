const sqliteContent = {
  id: "sqlite",
  tier: 2,
  name: "SQLite",
  description: "SQLite is a self-contained, serverless, zero-configuration SQL database engine that stores data in a single file. It's lightweight, fast, and perfect for applications that need reliable data storage without the complexity of a full database server.",
  difficulty: "intermediate",
  estimatedHours: 20,
  prerequisites: ["nodejs", "json"],
  learningObjectives: [
    "Understand SQLite fundamentals and file-based database concepts",
    "Master database design principles and normalization",
    "Implement CRUD operations with proper SQL syntax",
    "Work with advanced queries including joins and aggregations",
    "Handle database transactions and ACID properties",
    "Optimize SQLite performance with indexing strategies",
    "Implement proper error handling and data validation",
    "Use SQLite in Node.js applications with best practices",
    "Understand SQLite data types and constraints",
    "Perform database maintenance and backup operations"
  ],
  sections: [
    {
      id: "sqlite-introduction",
      title: "Introduction to SQLite",
      content: "SQLite is like a digital filing cabinet for your applications. Unlike traditional database servers that run as separate processes, SQLite stores your entire database in a single file on disk. This makes it incredibly simple to use - no server setup, no configuration, no user management.\n\nImagine you're building an app and need to store user data, settings, or application state. With SQLite, you just create a database file and start storing data immediately. It's perfect for desktop applications, mobile apps, embedded systems, and even web applications that need local data storage.\n\nSQLite is **ACID compliant** (Atomic, Consistent, Isolated, Durable), meaning it guarantees data integrity even in the face of system crashes or power failures. It's also **cross-platform** - a database file created on Windows will work perfectly on macOS or Linux.\n\nThe key advantages of SQLite include:\n- **Zero configuration**: No setup required\n- **Serverless**: No separate database process\n- **Transactional**: Full ACID compliance\n- **Self-contained**: Single file database\n- **Cross-platform**: Works on any operating system",
      keyTopics: [
        "What is SQLite?",
        "File-based database concepts",
        "SQLite vs traditional databases",
        "ACID properties",
        "Cross-platform compatibility"
      ],
      practicalExercises: [
        "Install SQLite and create your first database",
        "Explore SQLite command-line interface",
        "Create tables and insert sample data",
        "Use SQLite browser tools for database exploration",
        "Compare SQLite with other database systems"
      ],
      codeExamples: [
        {
          title: "Creating Your First SQLite Database",
          code: `const sqlite3 = require('sqlite3').verbose();

// Open (or create) database file
const db = new sqlite3.Database('./mydatabase.db', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to SQLite database');
  }
});

// Create a simple table
db.run(\`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE,
    age INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
\`, (err) => {
  if (err) {
    console.error('Error creating table:', err.message);
  } else {
    console.log('Users table created successfully');
  }
});

// Close the database connection
db.close((err) => {
  if (err) {
    console.error('Error closing database:', err.message);
  } else {
    console.log('Database connection closed');
  }
});`
        },
        {
          title: "SQLite Command Line Basics",
          code: `-- Open SQLite command line (run in terminal)
sqlite3 mydatabase.db

-- Create a table
CREATE TABLE products (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  price REAL,
  category TEXT,
  in_stock BOOLEAN DEFAULT 1
);

-- Insert sample data
INSERT INTO products (name, price, category) VALUES
  ('Laptop', 999.99, 'Electronics'),
  ('Book', 19.99, 'Education'),
  ('Coffee Mug', 12.99, 'Kitchen');

-- Query data
SELECT * FROM products;
SELECT name, price FROM products WHERE category = 'Electronics';

-- Exit SQLite
.quit`
        }
      ]
    },
    {
      id: "sqlite-database-design",
      title: "Database Design and Schema",
      content: "Database design is like creating the blueprint for your data house. A well-designed database is efficient, scalable, and easy to maintain. The key principles of good database design include:\n\n**Normalization** is the process of organizing data to minimize redundancy and improve data integrity. There are several normal forms (1NF, 2NF, 3NF) that guide this process.\n\n**Primary Keys** uniquely identify each record in a table. They can be:\n- **Natural keys**: Based on real-world data (like email addresses)\n- **Surrogate keys**: Auto-generated IDs (like INTEGER PRIMARY KEY AUTOINCREMENT)\n\n**Foreign Keys** create relationships between tables. They ensure referential integrity by linking related data across tables.\n\n**Constraints** enforce data integrity:\n- **NOT NULL**: Prevents null values\n- **UNIQUE**: Ensures unique values\n- **CHECK**: Validates data against conditions\n- **DEFAULT**: Provides default values\n\n**Indexes** improve query performance by creating fast lookup paths to data. However, they slow down INSERT/UPDATE operations, so use them judiciously.\n\nRemember: Good database design is about finding the right balance between data integrity, performance, and maintainability.",
      keyTopics: [
        "Database normalization principles",
        "Primary and foreign keys",
        "Table relationships",
        "Data types and constraints",
        "Indexing strategies"
      ],
      practicalExercises: [
        "Design a database schema for a blog application",
        "Create normalized tables with proper relationships",
        "Implement primary and foreign key constraints",
        "Add appropriate indexes for query performance",
        "Design a database for an e-commerce application"
      ],
      codeExamples: [
        {
          title: "Blog Database Schema Design",
          code: `const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./blog.db');

// Create users table
db.serialize(() => {
  // Users table (1NF, 2NF, 3NF compliant)
  db.run(\`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      full_name TEXT,
      bio TEXT,
      avatar_url TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  \`);

  // Categories table
  db.run(\`
    CREATE TABLE IF NOT EXISTS categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT UNIQUE NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      description TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  \`);

  // Posts table with foreign key relationships
  db.run(\`
    CREATE TABLE IF NOT EXISTS posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      content TEXT NOT NULL,
      excerpt TEXT,
      featured_image TEXT,
      status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
      author_id INTEGER NOT NULL,
      category_id INTEGER,
      published_at DATETIME,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (author_id) REFERENCES users (id) ON DELETE CASCADE,
      FOREIGN KEY (category_id) REFERENCES categories (id) ON DELETE SET NULL
    )
  \`);

  // Comments table
  db.run(\`
    CREATE TABLE IF NOT EXISTS comments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      post_id INTEGER NOT NULL,
      author_name TEXT NOT NULL,
      author_email TEXT NOT NULL,
      content TEXT NOT NULL,
      is_approved BOOLEAN DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (post_id) REFERENCES posts (id) ON DELETE CASCADE
    )
  \`);

  // Tags table (many-to-many relationship)
  db.run(\`
    CREATE TABLE IF NOT EXISTS tags (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT UNIQUE NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  \`);

  // Post-Tag relationship table
  db.run(\`
    CREATE TABLE IF NOT EXISTS post_tags (
      post_id INTEGER NOT NULL,
      tag_id INTEGER NOT NULL,
      PRIMARY KEY (post_id, tag_id),
      FOREIGN KEY (post_id) REFERENCES posts (id) ON DELETE CASCADE,
      FOREIGN KEY (tag_id) REFERENCES tags (id) ON DELETE CASCADE
    )
  \`);

  console.log('Blog database schema created successfully');
});`
        },
        {
          title: "E-commerce Database Design",
          code: `const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./ecommerce.db');

db.serialize(() => {
  // Customers table
  db.run(\`
    CREATE TABLE IF NOT EXISTS customers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      first_name TEXT NOT NULL,
      last_name TEXT NOT NULL,
      phone TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  \`);

  // Products table
  db.run(\`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT,
      price DECIMAL(10,2) NOT NULL CHECK (price > 0),
      sku TEXT UNIQUE NOT NULL,
      stock_quantity INTEGER DEFAULT 0 CHECK (stock_quantity >= 0),
      category_id INTEGER,
      image_url TEXT,
      is_active BOOLEAN DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (category_id) REFERENCES categories (id)
    )
  \`);

  // Categories table
  db.run(\`
    CREATE TABLE IF NOT EXISTS categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT UNIQUE NOT NULL,
      description TEXT,
      parent_id INTEGER,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (parent_id) REFERENCES categories (id)
    )
  \`);

  // Orders table
  db.run(\`
    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      customer_id INTEGER NOT NULL,
      order_date DATETIME DEFAULT CURRENT_TIMESTAMP,
      total_amount DECIMAL(10,2) NOT NULL,
      status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'shipped', 'delivered', 'cancelled')),
      shipping_address TEXT NOT NULL,
      payment_method TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (customer_id) REFERENCES customers (id)
    )
  \`);

  // Order Items table
  db.run(\`
    CREATE TABLE IF NOT EXISTS order_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      order_id INTEGER NOT NULL,
      product_id INTEGER NOT NULL,
      quantity INTEGER NOT NULL CHECK (quantity > 0),
      unit_price DECIMAL(10,2) NOT NULL,
      total_price DECIMAL(10,2) NOT NULL,
      FOREIGN KEY (order_id) REFERENCES orders (id),
      FOREIGN KEY (product_id) REFERENCES products (id)
    )
  \`);

  // Shopping Cart table
  db.run(\`
    CREATE TABLE IF NOT EXISTS cart_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      customer_id INTEGER NOT NULL,
      product_id INTEGER NOT NULL,
      quantity INTEGER NOT NULL CHECK (quantity > 0),
      added_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (customer_id) REFERENCES customers (id),
      FOREIGN KEY (product_id) REFERENCES products (id),
      UNIQUE(customer_id, product_id)
    )
  \`);

  console.log('E-commerce database schema created successfully');
});`
        }
      ]
    },
    {
      id: "sqlite-crud-operations",
      title: "CRUD Operations",
      content: "CRUD operations form the backbone of any database application. CRUD stands for Create, Read, Update, and Delete - the four fundamental operations you perform on data.\n\n**Create (INSERT)**: Adding new records to your database\n**Read (SELECT)**: Retrieving data from your database\n**Update (UPDATE)**: Modifying existing records\n**Delete (DELETE)**: Removing records from your database\n\nIn SQLite with Node.js, you use the `db.run()`, `db.get()`, `db.all()`, and `db.each()` methods for different types of operations:\n\n- `db.run()`: For INSERT, UPDATE, DELETE operations that don't return data\n- `db.get()`: For SELECT operations that return a single row\n- `db.all()`: For SELECT operations that return multiple rows\n- `db.each()`: For processing multiple rows one at a time\n\nAlways use parameterized queries to prevent SQL injection attacks. Parameterized queries separate SQL code from data, making your applications more secure.\n\nRemember to handle errors properly and close database connections when you're done with them. Proper resource management prevents memory leaks and ensures your application runs smoothly.",
      keyTopics: [
        "INSERT operations",
        "SELECT queries with various conditions",
        "UPDATE operations",
        "DELETE operations",
        "Parameterized queries for security"
      ],
      practicalExercises: [
        "Implement complete CRUD operations for a user management system",
        "Create forms for adding, editing, and deleting records",
        "Implement search and filtering functionality",
        "Add data validation before database operations",
        "Handle database errors gracefully in your application"
      ],
      codeExamples: [
        {
          title: "Complete CRUD Operations Class",
          code: `const sqlite3 = require('sqlite3').verbose();

class UserManager {
  constructor(dbPath = './users.db') {
    this.db = new sqlite3.Database(dbPath);
    this.initDatabase();
  }

  initDatabase() {
    const sql = \`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        age INTEGER,
        department TEXT,
        salary REAL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    \`;

    this.db.run(sql, (err) => {
      if (err) {
        console.error('Error creating table:', err.message);
      } else {
        console.log('Users table ready');
      }
    });
  }

  // CREATE - Insert new user
  createUser(userData, callback) {
    const { name, email, age, department, salary } = userData;
    const sql = \`
      INSERT INTO users (name, email, age, department, salary)
      VALUES (?, ?, ?, ?, ?)
    \`;

    this.db.run(sql, [name, email, age, department, salary], function(err) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, { id: this.lastID, ...userData });
      }
    });
  }

  // READ - Get all users
  getAllUsers(callback) {
    const sql = 'SELECT * FROM users ORDER BY created_at DESC';

    this.db.all(sql, [], (err, rows) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, rows);
      }
    });
  }

  // READ - Get user by ID
  getUserById(id, callback) {
    const sql = 'SELECT * FROM users WHERE id = ?';

    this.db.get(sql, [id], (err, row) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, row);
      }
    });
  }

  // READ - Search users
  searchUsers(searchTerm, callback) {
    const sql = \`
      SELECT * FROM users
      WHERE name LIKE ? OR email LIKE ? OR department LIKE ?
      ORDER BY name
    \`;
    const searchPattern = \`%\${searchTerm}%\`;

    this.db.all(sql, [searchPattern, searchPattern, searchPattern], (err, rows) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, rows);
      }
    });
  }

  // UPDATE - Update user
  updateUser(id, userData, callback) {
    const { name, email, age, department, salary } = userData;
    const sql = \`
      UPDATE users
      SET name = ?, email = ?, age = ?, department = ?, salary = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    \`;

    this.db.run(sql, [name, email, age, department, salary, id], function(err) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, { changes: this.changes, id });
      }
    });
  }

  // DELETE - Delete user
  deleteUser(id, callback) {
    const sql = 'DELETE FROM users WHERE id = ?';

    this.db.run(sql, [id], function(err) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, { changes: this.changes, id });
      }
    });
  }

  // Utility method to close database
  close() {
    this.db.close((err) => {
      if (err) {
        console.error('Error closing database:', err.message);
      } else {
        console.log('Database connection closed');
      }
    });
  }
}

// Usage example
const userManager = new UserManager();

// Create a new user
userManager.createUser({
  name: 'John Doe',
  email: 'john@example.com',
  age: 30,
  department: 'Engineering',
  salary: 75000
}, (err, user) => {
  if (err) {
    console.error('Error creating user:', err.message);
  } else {
    console.log('User created:', user);
  }
});

// Get all users
userManager.getAllUsers((err, users) => {
  if (err) {
    console.error('Error getting users:', err.message);
  } else {
    console.log('All users:', users);
  }
});

module.exports = UserManager;`
        },
        {
          title: "Advanced CRUD with Relationships",
          code: `const sqlite3 = require('sqlite3').verbose();

class BlogManager {
  constructor(dbPath = './blog.db') {
    this.db = new sqlite3.Database(dbPath);
  }

  // Create post with category
  createPost(postData, callback) {
    const { title, content, authorId, categoryId } = postData;

    // First check if category exists
    this.db.get('SELECT id FROM categories WHERE id = ?', [categoryId], (err, category) => {
      if (err) {
        return callback(err, null);
      }

      if (!category) {
        return callback(new Error('Category not found'), null);
      }

      // Create slug from title
      const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

      const sql = \`
        INSERT INTO posts (title, slug, content, author_id, category_id, status)
        VALUES (?, ?, ?, ?, ?, 'published')
      \`;

      this.db.run(sql, [title, slug, content, authorId, categoryId], function(err) {
        if (err) {
          callback(err, null);
        } else {
          callback(null, { id: this.lastID, title, slug });
        }
      });
    });
  }

  // Get posts with author and category info
  getPostsWithDetails(limit = 10, offset = 0, callback) {
    const sql = \`
      SELECT
        p.id, p.title, p.slug, p.content, p.created_at,
        u.username as author_name,
        c.name as category_name
      FROM posts p
      JOIN users u ON p.author_id = u.id
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.status = 'published'
      ORDER BY p.created_at DESC
      LIMIT ? OFFSET ?
    \`;

    this.db.all(sql, [limit, offset], (err, rows) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, rows);
      }
    });
  }

  // Update post with validation
  updatePost(id, postData, callback) {
    const { title, content, categoryId } = postData;

    // Check if post exists
    this.db.get('SELECT id FROM posts WHERE id = ?', [id], (err, post) => {
      if (err) {
        return callback(err, null);
      }

      if (!post) {
        return callback(new Error('Post not found'), null);
      }

      const sql = \`
        UPDATE posts
        SET title = ?, content = ?, category_id = ?, updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
      \`;

      this.db.run(sql, [title, content, categoryId, id], function(err) {
        if (err) {
          callback(err, null);
        } else {
          callback(null, { changes: this.changes, id });
        }
      });
    });
  }

  // Delete post and related comments
  deletePost(id, callback) {
    // Use transaction to ensure data consistency
    const sql = 'DELETE FROM posts WHERE id = ?';

    this.db.run(sql, [id], function(err) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, { changes: this.changes, id });
      }
    });
  }

  // Get post statistics
  getPostStats(callback) {
    const sql = \`
      SELECT
        COUNT(*) as total_posts,
        COUNT(CASE WHEN status = 'published' THEN 1 END) as published_posts,
        COUNT(DISTINCT author_id) as total_authors,
        COUNT(DISTINCT category_id) as total_categories
      FROM posts
    \`;

    this.db.get(sql, [], (err, stats) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, stats);
      }
    });
  }
}

// Usage example
const blogManager = new BlogManager();

// Create a post
blogManager.createPost({
  title: 'My First Blog Post',
  content: 'This is the content of my first blog post...',
  authorId: 1,
  categoryId: 1
}, (err, post) => {
  if (err) {
    console.error('Error creating post:', err.message);
  } else {
    console.log('Post created:', post);
  }
});

// Get posts with details
blogManager.getPostsWithDetails(5, 0, (err, posts) => {
  if (err) {
    console.error('Error getting posts:', err.message);
  } else {
    console.log('Posts with details:', posts);
  }
});

module.exports = BlogManager;`
        }
      ]
    },
    {
      id: "sqlite-advanced-queries",
      title: "Advanced Queries and Joins",
      content: "Advanced SQL queries allow you to extract meaningful insights from your data. Joins, aggregations, and subqueries are powerful tools that transform simple data into valuable information.\n\n**JOIN Operations** combine data from multiple tables:\n- **INNER JOIN**: Returns only matching rows from both tables\n- **LEFT JOIN**: Returns all rows from left table and matching rows from right table\n- **RIGHT JOIN**: Returns all rows from right table and matching rows from left table\n- **FULL OUTER JOIN**: Returns all rows from both tables\n\n**Aggregate Functions** perform calculations on groups of data:\n- **COUNT()**: Count rows or non-null values\n- **SUM()**: Sum numeric values\n- **AVG()**: Calculate average\n- **MIN()/MAX()**: Find minimum/maximum values\n- **GROUP BY**: Group results by one or more columns\n- **HAVING**: Filter grouped results\n\n**Subqueries** are queries within queries:\n- **Scalar subqueries**: Return single values\n- **Table subqueries**: Return result sets\n- **Correlated subqueries**: Reference outer query values\n\n**Common Table Expressions (CTEs)** with WITH clause make complex queries more readable by breaking them into logical parts.\n\nRemember: The key to writing efficient queries is understanding your data relationships and choosing the right JOIN type for your use case.",
      keyTopics: [
        "JOIN operations (INNER, LEFT, RIGHT, FULL)",
        "Aggregate functions and GROUP BY",
        "Subqueries and CTEs",
        "Complex WHERE conditions",
        "Query optimization techniques"
      ],
      practicalExercises: [
        "Write complex JOIN queries for multi-table relationships",
        "Create reports using aggregate functions",
        "Implement search functionality with multiple criteria",
        "Optimize slow queries using EXPLAIN QUERY PLAN",
        "Create complex reports with subqueries and CTEs"
      ],
      codeExamples: [
        {
          title: "Advanced JOIN Queries",
          code: `const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./analytics.db');

// Create sample tables
db.serialize(() => {
  // Users table
  db.run(\`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      department TEXT,
      hire_date DATE
    )
  \`);

  // Orders table
  db.run(\`
    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY,
      user_id INTEGER,
      product_name TEXT,
      quantity INTEGER,
      unit_price REAL,
      order_date DATE,
      status TEXT,
      FOREIGN KEY (user_id) REFERENCES users (id)
    )
  \`);

  // Insert sample data
  const users = [
    { name: 'Alice Johnson', email: 'alice@company.com', department: 'Sales', hire_date: '2020-01-15' },
    { name: 'Bob Smith', email: 'bob@company.com', department: 'Engineering', hire_date: '2019-06-01' },
    { name: 'Carol Davis', email: 'carol@company.com', department: 'Sales', hire_date: '2021-03-20' },
    { name: 'David Wilson', email: 'david@company.com', department: 'Engineering', hire_date: '2020-09-10' }
  ];

  const orders = [
    { user_id: 1, product_name: 'Laptop', quantity: 1, unit_price: 1200, order_date: '2023-01-15', status: 'completed' },
    { user_id: 1, product_name: 'Mouse', quantity: 2, unit_price: 25, order_date: '2023-01-15', status: 'completed' },
    { user_id: 2, product_name: 'Monitor', quantity: 1, unit_price: 300, order_date: '2023-02-01', status: 'completed' },
    { user_id: 3, product_name: 'Keyboard', quantity: 1, unit_price: 80, order_date: '2023-02-15', status: 'pending' },
    { user_id: 4, product_name: 'Headphones', quantity: 1, unit_price: 150, order_date: '2023-03-01', status: 'completed' }
  ];

  // Insert users
  const userStmt = db.prepare('INSERT INTO users (name, email, department, hire_date) VALUES (?, ?, ?, ?)');
  users.forEach(user => {
    userStmt.run(user.name, user.email, user.department, user.hire_date);
  });
  userStmt.finalize();

  // Insert orders
  const orderStmt = db.prepare('INSERT INTO orders (user_id, product_name, quantity, unit_price, order_date, status) VALUES (?, ?, ?, ?, ?, ?)');
  orders.forEach(order => {
    orderStmt.run(order.user_id, order.product_name, order.quantity, order.unit_price, order.order_date, order.status);
  });
  orderStmt.finalize();

  console.log('Sample data inserted');
});

// INNER JOIN - Get all orders with user information
function getOrdersWithUsers() {
  const sql = \`
    SELECT
      o.id as order_id,
      o.product_name,
      o.quantity,
      o.unit_price,
      (o.quantity * o.unit_price) as total,
      o.order_date,
      o.status,
      u.name as customer_name,
      u.email,
      u.department
    FROM orders o
    INNER JOIN users u ON o.user_id = u.id
    ORDER BY o.order_date DESC
  \`;

  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error('Error:', err.message);
    } else {
      console.log('Orders with user info:');
      console.table(rows);
    }
  });
}

// LEFT JOIN - Get all users and their order counts
function getUsersWithOrderCounts() {
  const sql = \`
    SELECT
      u.name,
      u.email,
      u.department,
      COUNT(o.id) as total_orders,
      COALESCE(SUM(o.quantity * o.unit_price), 0) as total_spent
    FROM users u
    LEFT JOIN orders o ON u.id = o.user_id AND o.status = 'completed'
    GROUP BY u.id, u.name, u.email, u.department
    ORDER BY total_spent DESC
  \`;

  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error('Error:', err.message);
    } else {
      console.log('Users with order statistics:');
      console.table(rows);
    }
  });
}

// Aggregate query - Sales by department
function getSalesByDepartment() {
  const sql = \`
    SELECT
      u.department,
      COUNT(DISTINCT u.id) as customers,
      COUNT(o.id) as total_orders,
      ROUND(SUM(o.quantity * o.unit_price), 2) as total_revenue,
      ROUND(AVG(o.quantity * o.unit_price), 2) as avg_order_value
    FROM users u
    LEFT JOIN orders o ON u.id = o.user_id AND o.status = 'completed'
    GROUP BY u.department
    HAVING total_orders > 0
    ORDER BY total_revenue DESC
  \`;

  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error('Error:', err.message);
    } else {
      console.log('Sales by department:');
      console.table(rows);
    }
  });
}

// Complex query with subquery - Top customers
function getTopCustomers() {
  const sql = \`
    SELECT
      u.name,
      u.email,
      u.department,
      customer_stats.total_spent,
      customer_stats.order_count
    FROM users u
    INNER JOIN (
      SELECT
        user_id,
        COUNT(*) as order_count,
        SUM(quantity * unit_price) as total_spent
      FROM orders
      WHERE status = 'completed'
      GROUP BY user_id
      HAVING total_spent > 100
    ) customer_stats ON u.id = customer_stats.user_id
    ORDER BY customer_stats.total_spent DESC
  \`;

  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error('Error:', err.message);
    } else {
      console.log('Top customers (spent > $100):');
      console.table(rows);
    }
  });
}

// Run all queries
setTimeout(() => {
  getOrdersWithUsers();
  setTimeout(() => {
    getUsersWithOrderCounts();
    setTimeout(() => {
      getSalesByDepartment();
      setTimeout(() => {
        getTopCustomers();
        db.close();
      }, 100);
    }, 100);
  }, 100);
}, 100);`
        },
        {
          title: "Complex Reports with CTEs",
          code: `const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./reports.db');

// Create sample sales data
db.serialize(() => {
  db.run(\`
    CREATE TABLE IF NOT EXISTS sales (
      id INTEGER PRIMARY KEY,
      product_id INTEGER,
      customer_id INTEGER,
      salesperson_id INTEGER,
      quantity INTEGER,
      unit_price REAL,
      discount REAL DEFAULT 0,
      sale_date DATE,
      region TEXT
    )
  \`);

  // Insert sample data
  const sales = [
    { product_id: 1, customer_id: 1, salesperson_id: 1, quantity: 10, unit_price: 50, discount: 0.05, sale_date: '2023-01-15', region: 'North' },
    { product_id: 2, customer_id: 2, salesperson_id: 1, quantity: 5, unit_price: 100, discount: 0.1, sale_date: '2023-01-20', region: 'South' },
    { product_id: 1, customer_id: 3, salesperson_id: 2, quantity: 8, unit_price: 50, discount: 0, sale_date: '2023-02-01', region: 'North' },
    { product_id: 3, customer_id: 1, salesperson_id: 2, quantity: 3, unit_price: 200, discount: 0.15, sale_date: '2023-02-10', region: 'East' },
    { product_id: 2, customer_id: 4, salesperson_id: 1, quantity: 12, unit_price: 100, discount: 0.05, sale_date: '2023-02-15', region: 'West' }
  ];

  const stmt = db.prepare(\`
    INSERT INTO sales (product_id, customer_id, salesperson_id, quantity, unit_price, discount, sale_date, region)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  \`);

  sales.forEach(sale => {
    stmt.run(
      sale.product_id, sale.customer_id, sale.salesperson_id,
      sale.quantity, sale.unit_price, sale.discount,
      sale.sale_date, sale.region
    );
  });
  stmt.finalize();

  console.log('Sales data inserted');
});

// Monthly sales report with CTE
function getMonthlySalesReport() {
  const sql = \`
    WITH monthly_sales AS (
      SELECT
        strftime('%Y-%m', sale_date) as month,
        region,
        COUNT(*) as total_orders,
        SUM(quantity) as total_quantity,
        SUM(quantity * unit_price * (1 - discount)) as total_revenue,
        AVG(quantity * unit_price * (1 - discount)) as avg_order_value
      FROM sales
      GROUP BY strftime('%Y-%m', sale_date), region
    ),
    monthly_totals AS (
      SELECT
        month,
        SUM(total_orders) as month_orders,
        SUM(total_revenue) as month_revenue,
        SUM(total_quantity) as month_quantity
      FROM monthly_sales
      GROUP BY month
    )
    SELECT
      ms.month,
      ms.region,
      ms.total_orders,
      ROUND(ms.total_revenue, 2) as region_revenue,
      ROUND(ms.avg_order_value, 2) as avg_order_value,
      ROUND((ms.total_revenue / mt.month_revenue) * 100, 1) as revenue_percentage
    FROM monthly_sales ms
    JOIN monthly_totals mt ON ms.month = mt.month
    ORDER BY ms.month, ms.total_revenue DESC
  \`;

  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error('Error:', err.message);
    } else {
      console.log('Monthly Sales Report:');
      console.table(rows);
    }
  });
}

// Top products analysis
function getTopProductsAnalysis() {
  const sql = \`
    WITH product_performance AS (
      SELECT
        product_id,
        SUM(quantity) as total_quantity,
        SUM(quantity * unit_price * (1 - discount)) as total_revenue,
        COUNT(*) as order_count,
        AVG(discount) as avg_discount,
        MAX(sale_date) as last_sale_date
      FROM sales
      GROUP BY product_id
    ),
    ranked_products AS (
      SELECT
        *,
        ROW_NUMBER() OVER (ORDER BY total_revenue DESC) as revenue_rank,
        ROW_NUMBER() OVER (ORDER BY total_quantity DESC) as quantity_rank
      FROM product_performance
    )
    SELECT
      product_id,
      total_quantity,
      ROUND(total_revenue, 2) as total_revenue,
      order_count,
      ROUND(avg_discount * 100, 1) as avg_discount_percent,
      last_sale_date,
      revenue_rank,
      quantity_rank,
      CASE
        WHEN revenue_rank <= 2 THEN 'Top Performer'
        WHEN revenue_rank <= 4 THEN 'Good Performer'
        ELSE 'Needs Attention'
      END as performance_category
    FROM ranked_products
    ORDER BY total_revenue DESC
  \`;

  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error('Error:', err.message);
    } else {
      console.log('Top Products Analysis:');
      console.table(rows);
    }
  });
}

// Customer lifetime value analysis
function getCustomerLifetimeValue() {
  const sql = \`
    WITH customer_summary AS (
      SELECT
        customer_id,
        COUNT(*) as total_orders,
        SUM(quantity * unit_price * (1 - discount)) as lifetime_value,
        AVG(quantity * unit_price * (1 - discount)) as avg_order_value,
        MIN(sale_date) as first_purchase,
        MAX(sale_date) as last_purchase,
        COUNT(DISTINCT salesperson_id) as unique_salespeople
      FROM sales
      GROUP BY customer_id
    ),
    customer_segments AS (
      SELECT
        *,
        CASE
          WHEN lifetime_value >= 1000 THEN 'High Value'
          WHEN lifetime_value >= 500 THEN 'Medium Value'
          ELSE 'Low Value'
        END as value_segment,
        JULIANDAY(last_purchase) - JULIANDAY(first_purchase) as customer_age_days
      FROM customer_summary
    )
    SELECT
      customer_id,
      total_orders,
      ROUND(lifetime_value, 2) as lifetime_value,
      ROUND(avg_order_value, 2) as avg_order_value,
      first_purchase,
      last_purchase,
      ROUND(customer_age_days, 0) as customer_age_days,
      value_segment,
      CASE
        WHEN customer_age_days > 30 THEN ROUND(lifetime_value / (customer_age_days / 30), 2)
        ELSE lifetime_value
      END as monthly_value
    FROM customer_segments
    ORDER BY lifetime_value DESC
  \`;

  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error('Error:', err.message);
    } else {
      console.log('Customer Lifetime Value Analysis:');
      console.table(rows);
    }
  });
}

// Run all reports
setTimeout(() => {
  getMonthlySalesReport();
  setTimeout(() => {
    getTopProductsAnalysis();
    setTimeout(() => {
      getCustomerLifetimeValue();
      db.close();
    }, 100);
  }, 100);
}, 100);`
        }
      ]
    },
    {
      id: "sqlite-transactions",
      title: "Transactions and Data Integrity",
      content: "Transactions are the cornerstone of data integrity in databases. A transaction is a logical unit of work that either completes entirely or not at all. This ensures your data remains consistent even when things go wrong.\n\n**ACID Properties** define what makes a transaction reliable:\n- **Atomicity**: All operations in a transaction succeed or all fail\n- **Consistency**: Database remains in a consistent state\n- **Isolation**: Transactions don't interfere with each other\n- **Durability**: Changes persist even after system failures\n\n**Transaction States**:\n- **Active**: Transaction is executing\n- **Partially Committed**: All operations completed, waiting for commit\n- **Committed**: Transaction successfully completed\n- **Failed**: Transaction failed and rolled back\n- **Aborted**: Transaction cancelled and rolled back\n\n**SQLite Transaction Commands**:\n- `BEGIN TRANSACTION`: Start a transaction\n- `COMMIT`: Save all changes\n- `ROLLBACK`: Undo all changes\n- `SAVEPOINT`: Create intermediate rollback points\n- `RELEASE SAVEPOINT`: Remove a savepoint\n\n**Transaction Types**:\n- **Implicit**: Auto-committed for single statements\n- **Explicit**: Manually controlled with BEGIN/COMMIT\n- **Nested**: Transactions within transactions using savepoints\n\nAlways use transactions for operations that modify multiple tables or need to be atomic. This prevents data corruption and ensures your application behaves predictably.",
      keyTopics: [
        "ACID properties",
        "Transaction lifecycle",
        "BEGIN, COMMIT, ROLLBACK",
        "Savepoints and nested transactions",
        "Error handling in transactions"
      ],
      practicalExercises: [
        "Implement bank transfer with transaction safety",
        "Create user registration with multiple table updates",
        "Handle transaction rollbacks on errors",
        "Use savepoints for complex operations",
        "Implement retry logic for failed transactions"
      ],
      codeExamples: [
        {
          title: "Bank Transfer with Transactions",
          code: `const sqlite3 = require('sqlite3').verbose();

class BankSystem {
  constructor(dbPath = './bank.db') {
    this.db = new sqlite3.Database(dbPath);
    this.initDatabase();
  }

  initDatabase() {
    this.db.serialize(() => {
      // Create accounts table
      this.db.run(\`
        CREATE TABLE IF NOT EXISTS accounts (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          account_number TEXT UNIQUE NOT NULL,
          owner_name TEXT NOT NULL,
          balance REAL DEFAULT 0.0 CHECK (balance >= 0),
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      \`);

      // Create transactions table
      this.db.run(\`
        CREATE TABLE IF NOT EXISTS transactions (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          from_account_id INTEGER,
          to_account_id INTEGER,
          amount REAL NOT NULL CHECK (amount > 0),
          description TEXT,
          transaction_date DATETIME DEFAULT CURRENT_TIMESTAMP,
          status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed')),
          FOREIGN KEY (from_account_id) REFERENCES accounts (id),
          FOREIGN KEY (to_account_id) REFERENCES accounts (id)
        )
      \`);

      console.log('Bank database initialized');
    });
  }

  // Create new account
  createAccount(accountData, callback) {
    const { accountNumber, ownerName, initialBalance = 0 } = accountData;
    const sql = 'INSERT INTO accounts (account_number, owner_name, balance) VALUES (?, ?, ?)';

    this.db.run(sql, [accountNumber, ownerName, initialBalance], function(err) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, { id: this.lastID, accountNumber, ownerName, balance: initialBalance });
      }
    });
  }

  // Transfer money between accounts (with transaction)
  transferMoney(transferData, callback) {
    const { fromAccountNumber, toAccountNumber, amount, description } = transferData;

    // Start transaction
    this.db.run('BEGIN TRANSACTION', (err) => {
      if (err) {
        return callback(err, null);
      }

      // Get sender account
      this.db.get(
        'SELECT id, balance FROM accounts WHERE account_number = ?',
        [fromAccountNumber],
        (err, fromAccount) => {
          if (err) {
            this.db.run('ROLLBACK');
            return callback(err, null);
          }

          if (!fromAccount) {
            this.db.run('ROLLBACK');
            return callback(new Error('Sender account not found'), null);
          }

          if (fromAccount.balance < amount) {
            this.db.run('ROLLBACK');
            return callback(new Error('Insufficient funds'), null);
          }

          // Get receiver account
          this.db.get(
            'SELECT id, balance FROM accounts WHERE account_number = ?',
            [toAccountNumber],
            (err, toAccount) => {
              if (err) {
                this.db.run('ROLLBACK');
                return callback(err, null);
              }

              if (!toAccount) {
                this.db.run('ROLLBACK');
                return callback(new Error('Receiver account not found'), null);
              }

              // Update sender balance
              this.db.run(
                'UPDATE accounts SET balance = balance - ? WHERE id = ?',
                [amount, fromAccount.id],
                (err) => {
                  if (err) {
                    this.db.run('ROLLBACK');
                    return callback(err, null);
                  }

                  // Update receiver balance
                  this.db.run(
                    'UPDATE accounts SET balance = balance + ? WHERE id = ?',
                    [amount, toAccount.id],
                    (err) => {
                      if (err) {
                        this.db.run('ROLLBACK');
                        return callback(err, null);
                      }

                      // Record transaction
                      this.db.run(
                        \`INSERT INTO transactions (from_account_id, to_account_id, amount, description, status)
                         VALUES (?, ?, ?, ?, 'completed')\`,
                        [fromAccount.id, toAccount.id, amount, description],
                        function(err) {
                          if (err) {
                            this.db.run('ROLLBACK');
                            return callback(err, null);
                          }

                          // Commit transaction
                          this.db.run('COMMIT', (err) => {
                            if (err) {
                              this.db.run('ROLLBACK');
                              return callback(err, null);
                            }

                            callback(null, {
                              transactionId: this.lastID,
                              amount,
                              fromAccount: fromAccountNumber,
                              toAccount: toAccountNumber,
                              description
                            });
                          });
                        }
                      );
                    }
                  );
                }
              );
            }
          );
        }
      );
    });
  }

  // Get account balance
  getAccountBalance(accountNumber, callback) {
    const sql = 'SELECT balance FROM accounts WHERE account_number = ?';

    this.db.get(sql, [accountNumber], (err, row) => {
      if (err) {
        callback(err, null);
      } else if (!row) {
        callback(new Error('Account not found'), null);
      } else {
        callback(null, row.balance);
      }
    });
  }

  // Get transaction history
  getTransactionHistory(accountNumber, callback) {
    const sql = \`
      SELECT
        t.id,
        t.amount,
        t.description,
        t.transaction_date,
        t.status,
        fa.account_number as from_account,
        ta.account_number as to_account
      FROM transactions t
      LEFT JOIN accounts fa ON t.from_account_id = fa.id
      LEFT JOIN accounts ta ON t.to_account_id = ta.id
      WHERE fa.account_number = ? OR ta.account_number = ?
      ORDER BY t.transaction_date DESC
    \`;

    this.db.all(sql, [accountNumber, accountNumber], (err, rows) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, rows);
      }
    });
  }
}

// Usage example
const bank = new BankSystem();

// Create accounts
bank.createAccount({
  accountNumber: 'ACC001',
  ownerName: 'Alice Johnson',
  initialBalance: 1000
}, (err, account) => {
  if (err) {
    console.error('Error creating account:', err.message);
  } else {
    console.log('Account created:', account);
  }
});

bank.createAccount({
  accountNumber: 'ACC002',
  ownerName: 'Bob Smith',
  initialBalance: 500
}, (err, account) => {
  if (err) {
    console.error('Error creating account:', err.message);
  } else {
    console.log('Account created:', account);
  }
});

// Perform transfer
setTimeout(() => {
  bank.transferMoney({
    fromAccountNumber: 'ACC001',
    toAccountNumber: 'ACC002',
    amount: 200,
    description: 'Payment for services'
  }, (err, result) => {
    if (err) {
      console.error('Transfer failed:', err.message);
    } else {
      console.log('Transfer successful:', result);

      // Check balances
      bank.getAccountBalance('ACC001', (err, balance) => {
        if (!err) console.log('ACC001 balance:', balance);
      });

      bank.getAccountBalance('ACC002', (err, balance) => {
        if (!err) console.log('ACC002 balance:', balance);
      });
    }
  });
}, 100);

module.exports = BankSystem;`
        },
        {
          title: "Advanced Transaction Patterns",
          code: `const sqlite3 = require('sqlite3').verbose();

class AdvancedTransactionManager {
  constructor(dbPath = './transactions.db') {
    this.db = new sqlite3.Database(dbPath);
  }

  // Nested transactions with savepoints
  performComplexOperation(operationData, callback) {
    const { userId, actions } = operationData;

    this.db.run('BEGIN TRANSACTION', (err) => {
      if (err) {
        return callback(err, null);
      }

      let completedActions = 0;
      const totalActions = actions.length;
      const results = [];

      const processNextAction = () => {
        if (completedActions >= totalActions) {
          // All actions completed successfully
          this.db.run('COMMIT', (err) => {
            if (err) {
              callback(err, null);
            } else {
              callback(null, results);
            }
          });
          return;
        }

        const action = actions[completedActions];
        const savepointName = \`sp_\${completedActions}\`;

        // Create savepoint for this action
        this.db.run(\`SAVEPOINT \${savepointName}\`, (err) => {
          if (err) {
            this.db.run('ROLLBACK');
            return callback(err, null);
          }

          this.executeAction(action, (err, result) => {
            if (err) {
              // Rollback to savepoint
              this.db.run(\`ROLLBACK TO \${savepointName}\`, () => {
                this.db.run('COMMIT'); // Commit what was successful
                callback(new Error(\`Action \${completedActions + 1} failed: \${err.message}\`), results);
              });
              return;
            }

            // Release savepoint (action successful)
            this.db.run(\`RELEASE \${savepointName}\`, (err) => {
              if (err) {
                this.db.run('ROLLBACK');
                return callback(err, null);
              }

              results.push(result);
              completedActions++;
              processNextAction();
            });
          });
        });
      };

      processNextAction();
    });
  }

  executeAction(action, callback) {
    const { type, data } = action;

    switch (type) {
      case 'create_user':
        this.createUser(data, callback);
        break;
      case 'update_balance':
        this.updateBalance(data, callback);
        break;
      case 'create_transaction':
        this.createTransaction(data, callback);
        break;
      default:
        callback(new Error(\`Unknown action type: \${type}\`), null);
    }
  }

  createUser(userData, callback) {
    const sql = 'INSERT INTO users (name, email) VALUES (?, ?)';
    this.db.run(sql, [userData.name, userData.email], function(err) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, { id: this.lastID, type: 'user_created' });
      }
    });
  }

  updateBalance(balanceData, callback) {
    const sql = 'UPDATE accounts SET balance = balance + ? WHERE id = ?';
    this.db.run(sql, [balanceData.amount, balanceData.accountId], function(err) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, { changes: this.changes, type: 'balance_updated' });
      }
    });
  }

  createTransaction(txData, callback) {
    const sql = 'INSERT INTO transactions (from_account, to_account, amount) VALUES (?, ?, ?)';
    this.db.run(sql, [txData.from, txData.to, txData.amount], function(err) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, { id: this.lastID, type: 'transaction_created' });
      }
    });
  }

  // Batch processing with transaction
  processBatchOperations(operations, callback) {
    this.db.run('BEGIN TRANSACTION', (err) => {
      if (err) {
        return callback(err, null);
      }

      const results = [];
      let completed = 0;

      operations.forEach((operation, index) => {
        this.db.run(operation.sql, operation.params, function(err) {
          if (err) {
            this.db.run('ROLLBACK');
            return callback(err, null);
          }

          results[index] = { changes: this.changes, lastID: this.lastID };
          completed++;

          if (completed === operations.length) {
            this.db.run('COMMIT', (err) => {
              if (err) {
                callback(err, null);
              } else {
                callback(null, results);
              }
            });
          }
        });
      });
    });
  }

  // Retry mechanism for failed operations
  executeWithRetry(operation, maxRetries = 3, callback) {
    let attempts = 0;

    const attempt = () => {
      attempts++;

      operation((err, result) => {
        if (!err) {
          // Success
          callback(null, result);
        } else if (attempts < maxRetries && this.isRetryableError(err)) {
          // Retry after delay
          setTimeout(attempt, 1000 * attempts);
        } else {
          // Max retries reached or non-retryable error
          callback(err, null);
        }
      });
    };

    attempt();
  }

  isRetryableError(error) {
    // Check if error is due to database lock or temporary issues
    const retryableMessages = [
      'database is locked',
      'database temporarily unavailable',
      'connection timeout'
    ];

    return retryableMessages.some(msg =>
      error.message.toLowerCase().includes(msg)
    );
  }
}

// Usage example
const txManager = new AdvancedTransactionManager();

// Complex operation with savepoints
const complexOperation = {
  userId: 1,
  actions: [
    {
      type: 'create_user',
      data: { name: 'John Doe', email: 'john@example.com' }
    },
    {
      type: 'update_balance',
      data: { accountId: 1, amount: 100 }
    },
    {
      type: 'create_transaction',
      data: { from: 1, to: 2, amount: 50 }
    }
  ]
};

txManager.performComplexOperation(complexOperation, (err, results) => {
  if (err) {
    console.error('Complex operation failed:', err.message);
    console.log('Partial results:', results);
  } else {
    console.log('Complex operation successful:', results);
  }
});

module.exports = AdvancedTransactionManager;`
        }
      ]
    },
    {
      id: "sqlite-performance-optimization",
      title: "Performance Optimization and Indexing",
      content: "Performance optimization is crucial for applications that handle large amounts of data or serve many users. SQLite is fast by default, but proper optimization can make it significantly faster.\n\n**Indexing** is the most important optimization technique:\n- **Primary Keys**: Automatically indexed\n- **Unique Constraints**: Automatically indexed\n- **Foreign Keys**: Should be indexed for performance\n- **Manual Indexes**: Created with CREATE INDEX\n- **Composite Indexes**: Multiple columns in one index\n\n**Index Types**:\n- **B-Tree Indexes**: Default, good for equality and range queries\n- **Full-Text Search Indexes**: For text search operations\n- **Partial Indexes**: Index only certain rows\n- **Expression Indexes**: Index based on expressions\n\n**Query Optimization**:\n- **EXPLAIN QUERY PLAN**: Analyze how SQLite executes queries\n- **Avoid SELECT *** : Specify only needed columns\n- **Use LIMIT**: For pagination and result limiting\n- **Proper JOIN Order**: Put most selective conditions first\n- **Avoid Functions on Indexed Columns**: Can prevent index usage\n\n**Database Maintenance**:\n- **VACUUM**: Reclaims unused space and optimizes database\n- **ANALYZE**: Updates query planner statistics\n- **REINDEX**: Rebuilds indexes for better performance\n\n**Connection Optimization**:\n- **Connection Pooling**: Reuse connections (important for concurrent access)\n- **Prepared Statements**: Cache query execution plans\n- **Batch Operations**: Group multiple operations together\n\nRemember: The key is finding the right balance between read and write performance based on your application's needs.",
      keyTopics: [
        "Database indexing strategies",
        "Query optimization techniques",
        "EXPLAIN QUERY PLAN usage",
        "Connection pooling",
        "Database maintenance"
      ],
      practicalExercises: [
        "Analyze slow queries using EXPLAIN QUERY PLAN",
        "Create appropriate indexes for different query patterns",
        "Optimize database schema for better performance",
        "Implement connection pooling for concurrent access",
        "Perform database maintenance and optimization"
      ],
      codeExamples: [
        {
          title: "Indexing and Query Optimization",
          code: `const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./optimized.db');

// Create optimized schema with indexes
db.serialize(() => {
  // Create tables with proper constraints
  db.run(\`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      username TEXT UNIQUE NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      last_login DATETIME,
      status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended'))
    )
  \`);

  db.run(\`
    CREATE TABLE IF NOT EXISTS posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      title TEXT NOT NULL,
      content TEXT,
      category TEXT,
      tags TEXT, -- JSON array of tags
      published BOOLEAN DEFAULT 0,
      view_count INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users (id)
    )
  \`);

  // Create indexes for better performance
  db.run('CREATE INDEX IF NOT EXISTS idx_users_email ON users(email)');
  db.run('CREATE INDEX IF NOT EXISTS idx_users_status ON users(status)');
  db.run('CREATE INDEX IF NOT EXISTS idx_users_last_login ON users(last_login)');

  db.run('CREATE INDEX IF NOT EXISTS idx_posts_user_id ON posts(user_id)');
  db.run('CREATE INDEX IF NOT EXISTS idx_posts_category ON posts(category)');
  db.run('CREATE INDEX IF NOT EXISTS idx_posts_published ON posts(published)');
  db.run('CREATE INDEX IF NOT EXISTS idx_posts_created_at ON posts(created_at)');
  db.run('CREATE INDEX IF NOT EXISTS idx_posts_view_count ON posts(view_count)');

  // Composite index for common query patterns
  db.run('CREATE INDEX IF NOT EXISTS idx_posts_user_published ON posts(user_id, published)');
  db.run('CREATE INDEX IF NOT EXISTS idx_posts_category_date ON posts(category, created_at)');

  console.log('Optimized database schema created with indexes');
});

// Optimized query functions
class OptimizedBlogQueries {
  constructor(db) {
    this.db = db;
  }

  // Optimized user lookup by email
  getUserByEmail(email, callback) {
    const sql = 'SELECT * FROM users WHERE email = ?';
    this.db.get(sql, [email], callback);
  }

  // Optimized post listing with pagination
  getPublishedPosts(page = 1, limit = 10, callback) {
    const offset = (page - 1) * limit;
    const sql = \`
      SELECT
        p.id, p.title, p.content, p.category, p.view_count,
        p.created_at, p.updated_at,
        u.username, u.email as author_email
      FROM posts p
      INNER JOIN users u ON p.user_id = u.id
      WHERE p.published = 1
      ORDER BY p.created_at DESC
      LIMIT ? OFFSET ?
    \`;

    this.db.all(sql, [limit, offset], callback);
  }

  // Optimized category filtering
  getPostsByCategory(category, page = 1, limit = 10, callback) {
    const offset = (page - 1) * limit;
    const sql = \`
      SELECT
        p.id, p.title, p.content, p.view_count,
        p.created_at, p.updated_at,
        u.username
      FROM posts p
      INNER JOIN users u ON p.user_id = u.id
      WHERE p.published = 1 AND p.category = ?
      ORDER BY p.created_at DESC
      LIMIT ? OFFSET ?
    \`;

    this.db.all(sql, [category, limit, offset], callback);
  }

  // Optimized search with full-text search
  searchPosts(query, callback) {
    // Create FTS virtual table for full-text search
    this.db.run(\`
      CREATE VIRTUAL TABLE IF NOT EXISTS posts_fts USING fts5(
        title, content, tags,
        content=posts,
        content_rowid=id
      )
    \`, () => {
      // Populate FTS table
      this.db.run(\`
        INSERT OR REPLACE INTO posts_fts(rowid, title, content, tags)
        SELECT id, title, content, tags FROM posts WHERE published = 1
      \`, () => {
        // Perform search
        const sql = \`
          SELECT
            p.id, p.title, p.content, p.category,
            p.created_at, u.username,
            fts.rank as search_rank
          FROM posts_fts fts
          JOIN posts p ON p.id = fts.rowid
          JOIN users u ON p.user_id = u.id
          WHERE fts MATCH ?
          ORDER BY fts.rank
          LIMIT 20
        \`;

        this.db.all(sql, [query], callback);
      });
    });
  }

  // Optimized analytics queries
  getAnalytics(callback) {
    const sql = \`
      SELECT
        COUNT(CASE WHEN published = 1 THEN 1 END) as published_posts,
        COUNT(CASE WHEN published = 0 THEN 1 END) as draft_posts,
        COUNT(DISTINCT user_id) as active_authors,
        SUM(view_count) as total_views,
        AVG(view_count) as avg_views_per_post,
        MAX(created_at) as latest_post_date
      FROM posts
    \`;

    this.db.get(sql, [], callback);
  }

  // Analyze query performance
  analyzeQuery(query, params = [], callback) {
    const explainSql = \`EXPLAIN QUERY PLAN \${query}\`;
    this.db.all(explainSql, params, (err, plan) => {
      if (err) {
        callback(err, null);
      } else {
        console.log('Query Execution Plan:');
        console.table(plan);
        callback(null, plan);
      }
    });
  }
}

// Usage example
const blogQueries = new OptimizedBlogQueries(db);

// Analyze a query's performance
blogQueries.analyzeQuery(
  'SELECT * FROM posts WHERE published = ? AND category = ? ORDER BY created_at DESC',
  [1, 'technology'],
  (err, plan) => {
    if (!err) {
      console.log('Query analysis completed');
    }
  }
);

// Get optimized results
blogQueries.getPublishedPosts(1, 5, (err, posts) => {
  if (err) {
    console.error('Error getting posts:', err.message);
  } else {
    console.log(\`Retrieved \${posts.length} posts efficiently\`);
  }
});

module.exports = OptimizedBlogQueries;`
        },
        {
          title: "Database Maintenance and Monitoring",
          code: `const sqlite3 = require('sqlite3').verbose();
const fs = require('fs').promises;
const path = require('path');

class DatabaseMaintenance {
  constructor(dbPath) {
    this.dbPath = dbPath;
    this.db = new sqlite3.Database(dbPath);
  }

  // Analyze database performance
  async analyzePerformance() {
    return new Promise((resolve, reject) => {
      const stats = {};

      // Get database file size
      fs.stat(this.dbPath)
        .then(fileStats => {
          stats.fileSize = fileStats.size;
          stats.fileSizeMB = (fileStats.size / (1024 * 1024)).toFixed(2);

          // Get table statistics
          this.db.all(\`
            SELECT
              name,
              sql
            FROM sqlite_master
            WHERE type = 'table'
          \`, [], (err, tables) => {
            if (err) {
              reject(err);
              return;
            }

            stats.tables = tables.length;
            stats.tableNames = tables.map(t => t.name);

            // Get index information
            this.db.all(\`
              SELECT
                name,
                tbl_name,
                sql
              FROM sqlite_master
              WHERE type = 'index' AND name NOT LIKE 'sqlite_%'
            \`, [], (err, indexes) => {
              if (err) {
                reject(err);
                return;
              }

              stats.indexes = indexes.length;
              stats.indexDetails = indexes;

              // Run ANALYZE to update statistics
              this.db.run('ANALYZE', (err) => {
                if (err) {
                  reject(err);
                  return;
                }

                // Get database statistics
                this.db.get(\`
                  SELECT
                    page_count,
                    page_size,
                    freelist_count,
                    auto_vacuum
                  FROM pragma_page_count(),
                       pragma_page_size(),
                       pragma_freelist_count(),
                       pragma_auto_vacuum()
                \`, [], (err, pragmaStats) => {
                  if (err) {
                    reject(err);
                    return;
                  }

                  stats.databaseStats = pragmaStats;
                  stats.totalPages = pragmaStats.page_count;
                  stats.pageSize = pragmaStats.page_size;
                  stats.databaseSize = pragmaStats.page_count * pragmaStats.page_size;
                  stats.databaseSizeMB = ((pragmaStats.page_count * pragmaStats.page_size) / (1024 * 1024)).toFixed(2);
                  stats.freePages = pragmaStats.freelist_count;
                  stats.autoVacuum = pragmaStats.auto_vacuum;

                  resolve(stats);
                });
              });
            });
          });
        })
        .catch(reject);
    });
  }

  // Optimize database with VACUUM
  async vacuumDatabase() {
    return new Promise((resolve, reject) => {
      console.log('Starting VACUUM operation...');

      const startTime = Date.now();

      this.db.run('VACUUM', (err) => {
        if (err) {
          reject(err);
          return;
        }

        const duration = Date.now() - startTime;
        console.log(\`VACUUM completed in \${duration}ms\`);

        resolve({ duration, success: true });
      });
    });
  }

  // Rebuild indexes
  async reindexDatabase() {
    return new Promise((resolve, reject) => {
      console.log('Starting REINDEX operation...');

      this.db.run('REINDEX', (err) => {
        if (err) {
          reject(err);
          return;
        }

        console.log('REINDEX completed');
        resolve({ success: true });
      });
    });
  }

  // Create backup
  async createBackup(backupPath) {
    return new Promise((resolve, reject) => {
      const backupDb = new sqlite3.Database(backupPath);

      // Attach backup database
      this.db.run(\`ATTACH DATABASE '\${backupPath}' AS backup\`, (err) => {
        if (err) {
          reject(err);
          return;
        }

        // Copy all tables
        this.db.run(\`
          SELECT sql FROM sqlite_master
          WHERE type = 'table' AND name NOT LIKE 'sqlite_%'
        \`, [], (err, tables) => {
          if (err) {
            reject(err);
            return;
          }

          // For each table, copy data to backup
          const copyOperations = tables.map(table => {
            return new Promise((resolve, reject) => {
              this.db.run(\`
                INSERT INTO backup.\${table.name} SELECT * FROM main.\${table.name}
              \`, (err) => {
                if (err) {
                  reject(err);
                } else {
                  resolve();
                }
              });
            });
          });

          Promise.all(copyOperations)
            .then(() => {
              // Detach backup database
              this.db.run('DETACH DATABASE backup', (err) => {
                if (err) {
                  reject(err);
                } else {
                  backupDb.close();
                  resolve({ success: true, backupPath });
                }
              });
            })
            .catch(reject);
        });
      });
    });
  }

  // Monitor database performance
  async monitorPerformance(intervalMs = 60000) {
    console.log('Starting database performance monitoring...');

    const monitor = async () => {
      try {
        const stats = await this.analyzePerformance();

        console.log('Performance Stats:');
        console.log(\`- Database Size: \${stats.databaseSizeMB} MB\`);
        console.log(\`- Tables: \${stats.tables}\`);
        console.log(\`- Indexes: \${stats.indexes}\`);
        console.log(\`- Free Pages: \${stats.freePages}\`);

        // Check if optimization is needed
        const fragmentationRatio = stats.freePages / stats.totalPages;
        if (fragmentationRatio > 0.2) {
          console.log('⚠️  High fragmentation detected. Consider running VACUUM.');
        }

      } catch (error) {
        console.error('Monitoring error:', error.message);
      }
    };

    // Initial monitoring
    await monitor();

    // Set up periodic monitoring
    return setInterval(monitor, intervalMs);
  }

  // Optimize database (VACUUM + REINDEX)
  async optimizeDatabase() {
    console.log('Starting database optimization...');

    try {
      await this.vacuumDatabase();
      await this.reindexDatabase();

      const finalStats = await this.analyzePerformance();

      console.log('Database optimization completed!');
      console.log(\`Final size: \${finalStats.databaseSizeMB} MB\`);

      return {
        success: true,
        finalSize: finalStats.databaseSizeMB,
        optimizationTime: Date.now()
      };

    } catch (error) {
      console.error('Optimization failed:', error.message);
      throw error;
    }
  }

  close() {
    this.db.close();
  }
}

// Usage example
async function performMaintenance() {
  const maintenance = new DatabaseMaintenance('./production.db');

  try {
    // Analyze current performance
    console.log('=== Database Analysis ===');
    const stats = await maintenance.analyzePerformance();
    console.log('Current database size:', stats.databaseSizeMB, 'MB');
    console.log('Number of tables:', stats.tables);
    console.log('Number of indexes:', stats.indexes);

    // Create backup before optimization
    console.log('\\n=== Creating Backup ===');
    const backupPath = './backup_' + Date.now() + '.db';
    await maintenance.createBackup(backupPath);
    console.log('Backup created:', backupPath);

    // Optimize database
    console.log('\\n=== Optimizing Database ===');
    const optimizationResult = await maintenance.optimizeDatabase();
    console.log('Optimization completed successfully!');

    // Start monitoring
    console.log('\\n=== Starting Performance Monitoring ===');
    const monitorId = maintenance.monitorPerformance(300000); // Every 5 minutes

    // Stop monitoring after some time (for demo)
    setTimeout(() => {
      clearInterval(monitorId);
      console.log('Monitoring stopped');
      maintenance.close();
    }, 10000);

  } catch (error) {
    console.error('Maintenance failed:', error.message);
    maintenance.close();
  }
}

// Run maintenance if called directly
if (require.main === module) {
  performMaintenance();
}

module.exports = DatabaseMaintenance;`
        }
      ]
    }
  ],
  projects: [
    {
      title: "Personal Finance Tracker",
      description: "Build a comprehensive personal finance application with SQLite database for tracking income, expenses, budgets, and financial goals with advanced reporting."
    },
    {
      title: "Task Management System",
      description: "Create a full-featured task management application with user authentication, project management, task assignment, time tracking, and progress reporting."
    },
    {
      title: "E-commerce Platform",
      description: "Develop a complete e-commerce backend with product catalog, shopping cart, order management, user accounts, and payment processing integration."
    },
    {
      title: "Content Management System",
      description: "Build a flexible CMS with user roles, content creation and editing, media management, SEO optimization, and multi-user collaboration features."
    },
    {
      title: "Analytics Dashboard",
      description: "Create a business intelligence dashboard with data visualization, custom reports, real-time metrics, and automated alert systems."
    }
  ],
  assessments: [
    {
      type: "quiz",
      questions: [
        {
          question: "What does ACID stand for in database transactions?",
          options: [
            "Atomicity, Consistency, Isolation, Durability",
            "Automatic, Consistent, Isolated, Durable",
            "Atomic, Consistent, Independent, Durable",
            "Automatic, Consistent, Isolated, Distributed"
          ],
          correctAnswer: "Atomicity, Consistency, Isolation, Durability"
        },
        {
          question: "Which SQLite command is used to start a transaction?",
          options: [
            "START TRANSACTION",
            "BEGIN TRANSACTION",
            "INIT TRANSACTION",
            "OPEN TRANSACTION"
          ],
          correctAnswer: "BEGIN TRANSACTION"
        },
        {
          question: "What is the purpose of a foreign key in SQLite?",
          options: [
            "To encrypt data in the database",
            "To create relationships between tables",
            "To automatically generate primary keys",
            "To compress data storage"
          ],
          correctAnswer: "To create relationships between tables"
        },
        {
          question: "Which command is used to analyze query performance in SQLite?",
          options: [
            "ANALYZE QUERY",
            "EXPLAIN PLAN",
            "EXPLAIN QUERY PLAN",
            "SHOW PLAN"
          ],
          correctAnswer: "EXPLAIN QUERY PLAN"
        },
        {
          question: "What is the main benefit of using parameterized queries in SQLite?",
          options: [
            "Faster execution",
            "Prevention of SQL injection attacks",
            "Automatic indexing",
            "Better compression"
          ],
          correctAnswer: "Prevention of SQL injection attacks"
        }
      ]
    },
    {
      type: "evaluation",
      questions: [
        {
          question: "Design a database schema for a library management system including books, authors, borrowers, and loan records. Explain your normalization choices and indexing strategy.",
          options: [],
          correctAnswer: ""
        },
        {
          question: "Explain the differences between INNER JOIN, LEFT JOIN, and FULL OUTER JOIN with practical examples of when to use each.",
          options: [],
          correctAnswer: ""
        },
        {
          question: "Describe how you would optimize a slow-running query in SQLite. Include specific techniques for analysis and improvement.",
          options: [],
          correctAnswer: ""
        }
      ]
    }
  ],
  aiPrompts: [
    "How do I design a normalized database schema in SQLite?",
    "What's the best way to handle database transactions in Node.js?",
    "How do I optimize slow SQLite queries?",
    "Explain the difference between different JOIN types in SQL",
    "How do I implement database migrations in SQLite?",
    "What's the best way to handle concurrent database access?",
    "How do I create effective indexes for my SQLite database?",
    "Explain SQLite data types and their usage",
    "How do I implement full-text search in SQLite?",
    "What's the best way to backup and restore SQLite databases?"
  ],
  resources: [
    { name: "SQLite Official Documentation", url: "https://www.sqlite.org/docs.html" },
    { name: "SQLite Node.js Package", url: "https://github.com/mapbox/node-sqlite3" },
    { name: "SQLite Browser", url: "https://sqlitebrowser.org/" },
    { name: "Database Design Principles", url: "https://en.wikipedia.org/wiki/Database_normalization" },
    { name: "SQL Tutorial", url: "https://www.w3schools.com/sql/" },
    { name: "SQLite Performance Tuning", url: "https://www.sqlite.org/optimization.html" },
    { name: "Node.js Database Best Practices", url: "https://nodejs.org/en/docs/guides/anatomy-of-an-http-transaction/" },
    { name: "Database Transaction Guide", url: "https://en.wikipedia.org/wiki/Database_transaction" }
  ],
  toolsRequired: [
    "Node.js (latest LTS version)",
    "npm or yarn package manager",
    "SQLite3 package for Node.js",
    "Database browser (DB Browser for SQLite)",
    "Command line interface",
    "Text editor or IDE",
    "Git for version control",
    "Performance monitoring tools"
  ],
  bestPractices: [
    "Always use parameterized queries to prevent SQL injection",
    "Implement proper error handling for all database operations",
    "Use transactions for operations that modify multiple tables",
    "Create appropriate indexes for frequently queried columns",
    "Normalize your database schema to reduce data redundancy",
    "Use foreign keys to maintain referential integrity",
    "Implement connection pooling for better performance",
    "Regularly backup your database and test restore procedures",
    "Use EXPLAIN QUERY PLAN to analyze and optimize slow queries",
    "Keep database connections open for as short as possible",
    "Use appropriate data types to optimize storage and performance",
    "Implement proper logging for database operations",
    "Use prepared statements for repeated queries",
    "Monitor database performance and optimize when necessary",
    "Test your database operations thoroughly before production deployment"
  ],
  commonPitfalls: [
    "Not using transactions for multi-table operations",
    "Forgetting to handle database connection errors",
    "Using string concatenation instead of parameterized queries",
    "Not creating indexes on frequently queried columns",
    "Storing sensitive information without proper encryption",
    "Not closing database connections properly",
    "Using SELECT * in production code",
    "Not handling database locks and concurrency issues",
    "Forgetting to validate data before inserting into database",
    "Not implementing proper backup and recovery procedures",
    "Using SQLite for high-concurrency applications without proper design",
    "Not monitoring database performance and growth",
    "Using inappropriate data types for stored values",
    "Not implementing proper error handling for database operations",
    "Forgetting to update indexes when schema changes"
  ],
  careerRelevance: "SQLite proficiency is highly valued in the software development industry, particularly for applications requiring lightweight, reliable data storage. Developers skilled in SQLite can work on mobile applications, desktop software, embedded systems, and web applications. The database's simplicity combined with powerful features makes it ideal for startups and small to medium-sized projects. Understanding SQLite fundamentals translates well to other database systems and demonstrates knowledge of data persistence, query optimization, and database design principles. With the growing demand for efficient data management solutions, SQLite expertise opens doors to roles in backend development, data engineering, and full-stack development positions across various industries."
};

export default sqliteContent;