const mongodbContent = {
  id: "mongodb",
  tier: 3,
  name: "MongoDB",
  description: "MongoDB is a leading NoSQL document database that provides high performance, high availability, and easy scalability. It stores data in flexible, JSON-like documents, making it easier to work with data that doesn't fit neatly into traditional relational structures. MongoDB is designed for modern application development and big data processing, offering powerful querying capabilities, indexing strategies, and seamless integration with popular programming languages.",
  difficulty: "intermediate",
  estimatedHours: 16,
  prerequisites: ["nodejs", "json"],
  learningObjectives: [
    "Design flexible document schemas and data models for MongoDB collections",
    "Implement comprehensive CRUD operations using MongoDB drivers and ODMs",
    "Build complex aggregation pipelines for data analysis and reporting",
    "Create and manage database indexes for optimal query performance",
    "Establish data relationships using embedding and referencing patterns",
    "Deploy and manage MongoDB databases using MongoDB Atlas",
    "Implement backup and recovery strategies for data protection",
    "Handle database transactions and ensure data consistency",
    "Optimize MongoDB performance through proper indexing and query design",
    "Implement security best practices for MongoDB deployments",
    "Use MongoDB Compass for database administration and visualization",
    "Integrate MongoDB with Node.js applications using Mongoose ODM"
  ],
  sections: [
    {
      id: "mongodb-document-modeling",
      title: "Document Modeling and Schema Design",
      content: "Document modeling in MongoDB is fundamentally different from traditional relational database design. Instead of normalizing data across multiple tables, MongoDB encourages embedding related data in single documents when possible, while using references for less frequently accessed or highly independent data. The key is finding the right balance between embedding and referencing based on your application's data access patterns.\n\n**Document Structure Principles**:\n- **Atomicity**: Design documents to support atomic operations\n- **Read Patterns**: Structure data to match common query patterns\n- **Write Patterns**: Consider update frequency and complexity\n- **Data Relationships**: Choose between embedding and referencing\n- **Flexibility**: Leverage MongoDB's schema-less nature appropriately\n\n**Embedding vs Referencing**:\n- **Embedding**: Include related data directly in parent documents\n- **Referencing**: Store related data in separate collections with references\n- **Hybrid Approach**: Combine both strategies for optimal performance\n\n**Schema Design Patterns**:\n- **One-to-One**: Simple embedding or referencing\n- **One-to-Many**: Embedding for small arrays, referencing for large datasets\n- **Many-to-Many**: Reference arrays or intermediate collections\n- **Polymorphic**: Handle different document types in same collection\n\n**Best Practices**:\n- Design for query patterns, not just storage efficiency\n- Consider document size limits (16MB per document)\n- Plan for data growth and evolution\n- Use meaningful field names and consistent naming conventions\n- Implement proper validation rules\n- Document your schema decisions for team consistency",
      keyTopics: [
        "MongoDB document structure and BSON format",
        "Embedding vs referencing strategies",
        "Schema design patterns for different relationships",
        "Data modeling for performance and scalability"
      ],
      practicalExercises: [
        "Design a document schema for a blog application with users, posts, and comments",
        "Model a product catalog with categories, reviews, and inventory data",
        "Create a social media schema with users, posts, likes, and followers",
        "Design an e-commerce schema with orders, products, and customer data"
      ],
      codeExamples: [
        {
          title: "User Profile Document Schema",
          code: `// User profile with embedded preferences and referenced posts
const userSchema = {
  _id: ObjectId("507f1f77bcf86cd799439011"),
  username: "johndoe",
  email: "john.doe@example.com",
  profile: {
    firstName: "John",
    lastName: "Doe",
    avatar: "https://example.com/avatar.jpg",
    bio: "Software developer passionate about MongoDB",
    location: {
      city: "San Francisco",
      state: "CA",
      country: "USA"
    }
  },
  preferences: {
    theme: "dark",
    notifications: {
      email: true,
      push: false,
      sms: false
    },
    privacy: {
      profileVisible: true,
      showOnlineStatus: true,
      allowMessages: true
    }
  },
  stats: {
    postsCount: 42,
    followersCount: 156,
    followingCount: 89,
    joinedAt: ISODate("2023-01-15T00:00:00Z"),
    lastActiveAt: ISODate("2024-01-20T14:30:00Z")
  },
  // Reference to posts (one-to-many relationship)
  postIds: [
    ObjectId("507f1f77bcf86cd799439012"),
    ObjectId("507f1f77bcf86cd799439013")
  ]
};

// Post document with author reference
const postSchema = {
  _id: ObjectId("507f1f77bcf86cd799439012"),
  title: "Getting Started with MongoDB",
  content: "MongoDB is a powerful NoSQL database...",
  excerpt: "Learn the basics of MongoDB document modeling",
  authorId: ObjectId("507f1f77bcf86cd799439011"), // Reference to user
  tags: ["mongodb", "nosql", "database"],
  category: "Technology",
  status: "published",
  metadata: {
    wordCount: 1250,
    readingTime: 6,
    featured: true
  },
  stats: {
    views: 1250,
    likes: 45,
    comments: 12
  },
  publishedAt: ISODate("2024-01-15T10:00:00Z"),
  updatedAt: ISODate("2024-01-15T10:00:00Z"),
  // Embedded comments (for frequently accessed data)
  recentComments: [
    {
      _id: ObjectId("507f1f77bcf86cd799439014"),
      authorId: ObjectId("507f1f77bcf86cd799439015"),
      content: "Great article!",
      createdAt: ISODate("2024-01-16T09:30:00Z")
    }
  ]
};`
        },
        {
          title: "E-commerce Product Catalog Schema",
          code: `// Product document with embedded variants and reviews
const productSchema = {
  _id: ObjectId("507f1f77bcf86cd799439016"),
  name: "Wireless Bluetooth Headphones",
  description: "High-quality wireless headphones with noise cancellation",
  sku: "WH-1000XM4",
  brand: "Sony",
  category: "Electronics",
  subcategory: "Audio",
  price: {
    current: 299.99,
    original: 349.99,
    currency: "USD",
    discount: 14.3
  },
  inventory: {
    total: 150,
    available: 89,
    reserved: 12,
    lowStockThreshold: 10
  },
  // Embedded product variants
  variants: [
    {
      _id: ObjectId("507f1f77bcf86cd799439017"),
      name: "Black",
      sku: "WH-1000XM4-BLK",
      price: 299.99,
      inventory: 45,
      images: [
        "https://example.com/product-black-1.jpg",
        "https://example.com/product-black-2.jpg"
      ]
    },
    {
      _id: ObjectId("507f1f77bcf86cd799439018"),
      name: "White",
      sku: "WH-1000XM4-WHT",
      price: 299.99,
      inventory: 44,
      images: [
        "https://example.com/product-white-1.jpg",
        "https://example.com/product-white-2.jpg"
      ]
    }
  ],
  specifications: {
    batteryLife: "30 hours",
    connectivity: "Bluetooth 5.0",
    weight: "250g",
    dimensions: {
      length: 18.5,
      width: 16.5,
      height: 8.0,
      unit: "cm"
    }
  },
  // Embedded reviews summary for quick access
  reviewsSummary: {
    averageRating: 4.5,
    totalReviews: 128,
    ratingDistribution: {
      5: 89,
      4: 25,
      3: 8,
      2: 4,
      1: 2
    }
  },
  tags: ["wireless", "bluetooth", "noise-cancelling", "sony"],
  seo: {
    metaTitle: "Sony WH-1000XM4 Wireless Headphones",
    metaDescription: "Premium wireless headphones with industry-leading noise cancellation",
    slug: "sony-wh-1000xm4-wireless-headphones"
  },
  createdAt: ISODate("2024-01-01T00:00:00Z"),
  updatedAt: ISODate("2024-01-20T12:00:00Z")
};

// Separate reviews collection for detailed reviews
const reviewSchema = {
  _id: ObjectId("507f1f77bcf86cd799439019"),
  productId: ObjectId("507f1f77bcf86cd799439016"),
  userId: ObjectId("507f1f77bcf86cd799439011"),
  orderId: ObjectId("507f1f77bcf86cd799439020"),
  rating: 5,
  title: "Excellent sound quality!",
  content: "These headphones exceeded my expectations...",
  pros: ["Great sound", "Comfortable", "Long battery life"],
  cons: ["Pricey"],
  verified: true, // Purchased on our platform
  helpful: {
    count: 12,
    votedBy: [ObjectId("..."), ObjectId("...")]
  },
  images: [
    "https://example.com/review-image-1.jpg"
  ],
  createdAt: ISODate("2024-01-18T15:30:00Z"),
  updatedAt: ISODate("2024-01-18T15:30:00Z")
};`
        }
      ]
    },
    {
      id: "mongodb-crud-operations",
      title: "CRUD Operations with MongoDB Drivers",
      content: "MongoDB provides official drivers for most programming languages, enabling seamless integration with applications. The Node.js driver offers both callback-based and promise-based APIs, with Mongoose providing an additional Object-Document Mapping (ODM) layer for enhanced developer experience. Understanding CRUD operations is fundamental to working effectively with MongoDB.\n\n**MongoDB Node.js Driver**:\n- **Connection Management**: Establishing and managing database connections\n- **Database Operations**: Working with databases, collections, and documents\n- **Query Building**: Constructing queries with filters, projections, and options\n- **Result Handling**: Processing query results and handling errors\n- **Connection Pooling**: Efficient connection management for high-performance applications\n\n**Mongoose ODM Features**:\n- **Schema Definition**: Defining document structure and validation rules\n- **Model Creation**: Creating models for database operations\n- **Middleware**: Pre and post operation hooks\n- **Plugins**: Extending functionality with reusable plugins\n- **Population**: Automatic referencing and data population\n\n**CRUD Operation Patterns**:\n- **Create**: Inserting single or multiple documents\n- **Read**: Querying documents with various filters and options\n- **Update**: Modifying existing documents with different strategies\n- **Delete**: Removing documents with safety considerations\n\n**Advanced Query Features**:\n- **Projection**: Selecting specific fields to return\n- **Sorting**: Ordering results by one or more fields\n- **Pagination**: Implementing efficient pagination strategies\n- **Text Search**: Full-text search capabilities\n- **Geospatial Queries**: Location-based queries and operations\n\n**Best Practices**:\n- Use connection pooling for better performance\n- Implement proper error handling for all operations\n- Use indexes to optimize query performance\n- Validate data before insertion\n- Use transactions for multi-document operations\n- Implement proper logging and monitoring",
      keyTopics: [
        "MongoDB Node.js driver setup and configuration",
        "Basic CRUD operations with native driver",
        "Mongoose ODM schema definition and models",
        "Advanced querying techniques and operators"
      ],
      practicalExercises: [
        "Implement user registration and profile management with MongoDB",
        "Create a blog system with posts, comments, and user interactions",
        "Build a product catalog with search and filtering capabilities",
        "Develop a task management system with MongoDB backend"
      ],
      codeExamples: [
        {
          title: "MongoDB Node.js Driver CRUD Operations",
          code: `const { MongoClient } = require('mongodb');

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'myapp';

async function connectToMongoDB() {
  try {
    await client.connect();
    console.log('Connected successfully to MongoDB');
    const db = client.db(dbName);
    return db;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}

// CREATE - Insert single document
async function createUser(userData) {
  const db = await connectToMongoDB();
  const collection = db.collection('users');

  try {
    const result = await collection.insertOne({
      ...userData,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    console.log('User created with ID:', result.insertedId);
    return result.insertedId;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

// READ - Find documents with various queries
async function getUsers(query = {}, options = {}) {
  const db = await connectToMongoDB();
  const collection = db.collection('users');

  try {
    const users = await collection.find(query, options).toArray();
    return users;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
}

// UPDATE - Update single document
async function updateUser(userId, updateData) {
  const db = await connectToMongoDB();
  const collection = db.collection('users');

  try {
    const result = await collection.updateOne(
      { _id: new ObjectId(userId) },
      {
        $set: {
          ...updateData,
          updatedAt: new Date()
        }
      }
    );

    if (result.matchedCount === 0) {
      throw new Error('User not found');
    }

    console.log('User updated successfully');
    return result;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
}

// DELETE - Delete single document
async function deleteUser(userId) {
  const db = await connectToMongoDB();
  const collection = db.collection('users');

  try {
    const result = await collection.deleteOne({ _id: new ObjectId(userId) });

    if (result.deletedCount === 0) {
      throw new Error('User not found');
    }

    console.log('User deleted successfully');
    return result;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
}

// Advanced queries
async function searchUsers() {
  const db = await connectToMongoDB();
  const collection = db.collection('users');

  try {
    // Find active users with pagination
    const activeUsers = await collection
      .find({ status: 'active' })
      .sort({ createdAt: -1 })
      .limit(10)
      .skip(0)
      .toArray();

    // Find users by email pattern
    const emailUsers = await collection
      .find({ email: { $regex: '@company.com$', $options: 'i' } })
      .toArray();

    // Find users with specific preferences
    const preferenceUsers = await collection
      .find({
        'preferences.notifications.email': true,
        'stats.postsCount': { $gte: 5 }
      })
      .project({ username: 1, email: 1, stats: 1 })
      .toArray();

    return { activeUsers, emailUsers, preferenceUsers };
  } catch (error) {
    console.error('Error searching users:', error);
    throw error;
  }
}

// Bulk operations
async function bulkInsertUsers(users) {
  const db = await connectToMongoDB();
  const collection = db.collection('users');

  try {
    const bulkOps = users.map(user => ({
      insertOne: {
        document: {
          ...user,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      }
    }));

    const result = await collection.bulkWrite(bulkOps);
    console.log('Bulk insert completed:', result.insertedCount, 'documents');
    return result;
  } catch (error) {
    console.error('Error in bulk insert:', error);
    throw error;
  }
}

module.exports = {
  connectToMongoDB,
  createUser,
  getUsers,
  updateUser,
  deleteUser,
  searchUsers,
  bulkInsertUsers
};`
        },
        {
          title: "Mongoose ODM Schema and Model Operations",
          code: `const mongoose = require('mongoose');

// Connect to MongoDB
async function connectToMongoDB() {
  try {
    await mongoose.connect('mongodb://localhost:27017/myapp', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB with Mongoose');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}

// User Schema Definition
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: {
      validator: function(v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: 'Invalid email format'
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  profile: {
    firstName: String,
    lastName: String,
    avatar: String,
    bio: {
      type: String,
      maxlength: 500
    },
    location: {
      city: String,
      state: String,
      country: String
    }
  },
  preferences: {
    theme: {
      type: String,
      enum: ['light', 'dark'],
      default: 'light'
    },
    notifications: {
      email: { type: Boolean, default: true },
      push: { type: Boolean, default: false },
      sms: { type: Boolean, default: false }
    }
  },
  stats: {
    postsCount: { type: Number, default: 0 },
    followersCount: { type: Number, default: 0 },
    followingCount: { type: Number, default: 0 }
  },
  role: {
    type: String,
    enum: ['user', 'moderator', 'admin'],
    default: 'user'
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true, // Adds createdAt and updatedAt
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for full name
userSchema.virtual('fullName').get(function() {
  if (this.profile.firstName && this.profile.lastName) {
    return \`\${this.profile.firstName} \${this.profile.lastName}\`;
  }
  return this.username;
});

// Instance method
userSchema.methods.getPublicProfile = function() {
  return {
    _id: this._id,
    username: this.username,
    fullName: this.fullName,
    avatar: this.profile.avatar,
    bio: this.profile.bio,
    stats: this.stats,
    createdAt: this.createdAt
  };
};

// Static method
userSchema.statics.findByUsername = function(username) {
  return this.findOne({ username: new RegExp(username, 'i') });
};

// Pre-save middleware
userSchema.pre('save', async function(next) {
  // Hash password before saving
  if (this.isModified('password')) {
    const bcrypt = require('bcrypt');
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

// Post-save middleware
userSchema.post('save', function(doc) {
  console.log(\`User \${doc.username} has been saved\`);
});

// Index for performance
userSchema.index({ username: 1 });
userSchema.index({ email: 1 });
userSchema.index({ 'stats.postsCount': -1 });
userSchema.index({ createdAt: -1 });

// Create User model
const User = mongoose.model('User', userSchema);

// CRUD Operations with Mongoose
class UserService {
  // Create user
  static async createUser(userData) {
    try {
      const user = new User(userData);
      await user.save();
      console.log('User created:', user.username);
      return user.getPublicProfile();
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  // Get user by ID
  static async getUserById(userId) {
    try {
      const user = await User.findById(userId);
      if (!user) {
        throw new Error('User not found');
      }
      return user.getPublicProfile();
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  }

  // Update user
  static async updateUser(userId, updateData) {
    try {
      const user = await User.findByIdAndUpdate(
        userId,
        updateData,
        { new: true, runValidators: true }
      );

      if (!user) {
        throw new Error('User not found');
      }

      return user.getPublicProfile();
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  }

  // Delete user
  static async deleteUser(userId) {
    try {
      const user = await User.findByIdAndDelete(userId);
      if (!user) {
        throw new Error('User not found');
      }
      console.log('User deleted:', user.username);
      return { message: 'User deleted successfully' };
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  }

  // Search users
  static async searchUsers(query, options = {}) {
    try {
      const { page = 1, limit = 10, sort = '-createdAt' } = options;

      const users = await User.find(query)
        .sort(sort)
        .limit(limit)
        .skip((page - 1) * limit)
        .select('username profile stats createdAt');

      const total = await User.countDocuments(query);

      return {
        users: users.map(user => user.getPublicProfile()),
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      };
    } catch (error) {
      console.error('Error searching users:', error);
      throw error;
    }
  }

  // Follow user
  static async followUser(followerId, targetUserId) {
    try {
      const session = await mongoose.startSession();
      session.startTransaction();

      try {
        // Add to following list
        await User.findByIdAndUpdate(followerId, {
          $addToSet: { following: targetUserId },
          $inc: { 'stats.followingCount': 1 }
        }, { session });

        // Add to followers list
        await User.findByIdAndUpdate(targetUserId, {
          $addToSet: { followers: followerId },
          $inc: { 'stats.followersCount': 1 }
        }, { session });

        await session.commitTransaction();
        return { message: 'User followed successfully' };
      } catch (error) {
        await session.abortTransaction();
        throw error;
      } finally {
        session.endSession();
      }
    } catch (error) {
      console.error('Error following user:', error);
      throw error;
    }
  }
}

module.exports = {
  connectToMongoDB,
  User,
  UserService
};`
        }
      ]
    },
    {
      id: "mongodb-aggregation-framework",
      title: "Aggregation Framework and Data Analysis",
      content: "MongoDB's Aggregation Framework is a powerful tool for data analysis and transformation, providing a pipeline-based approach to process and analyze data within the database. It offers operators for filtering, grouping, sorting, and transforming documents, enabling complex data analysis without moving data to the application layer.\n\n**Pipeline Stages**:\n- **$match**: Filter documents based on conditions\n- **$group**: Group documents by specified fields\n- **$sort**: Sort documents by specified fields\n- **$project**: Reshape documents with specified fields\n- **$limit/$skip**: Control number of documents in result\n- **$unwind**: Deconstruct array fields\n- **$lookup**: Perform left outer joins with other collections\n\n**Aggregation Operators**:\n- **Arithmetic Operators**: $add, $subtract, $multiply, $divide\n- **String Operators**: $concat, $substr, $toLower, $toUpper\n- **Date Operators**: $year, $month, $dayOfMonth, $dateToString\n- **Array Operators**: $size, $in, $push, $addToSet\n- **Conditional Operators**: $cond, $ifNull, $switch\n\n**Performance Considerations**:\n- **Index Usage**: Ensure aggregation uses appropriate indexes\n- **Memory Limits**: Be aware of 100MB memory limit for aggregation\n- **Disk Usage**: Use $diskUse option for large aggregations\n- **Pipeline Optimization**: Order stages for optimal performance\n\n**Advanced Patterns**:\n- **Facet Search**: Multiple aggregation pipelines in one query\n- **Bucket Operations**: Group data into buckets or histograms\n- **Graph Lookup**: Perform recursive searches in hierarchical data\n- **Map-Reduce**: Alternative aggregation approach for complex operations\n\n**Best Practices**:\n- Use $match early in pipeline to reduce documents processed\n- Create indexes on fields used in $match and $sort stages\n- Use $project to limit fields and improve performance\n- Consider using $facet for multiple related aggregations\n- Monitor aggregation performance and optimize slow queries\n- Use explain() to analyze aggregation execution",
      keyTopics: [
        "Aggregation pipeline stages and operators",
        "Complex data analysis and reporting",
        "Performance optimization for aggregations",
        "Real-world aggregation use cases"
      ],
      practicalExercises: [
        "Build sales analytics with aggregation pipelines",
        "Create user engagement reports using aggregation",
        "Implement search with facets and filters",
        "Develop inventory management analytics"
      ],
      codeExamples: [
        {
          title: "Sales Analytics Aggregation Pipeline",
          code: `const mongoose = require('mongoose');

// Sales aggregation for dashboard
async function getSalesAnalytics(startDate, endDate) {
  try {
    const pipeline = [
      // Stage 1: Filter by date range
      {
        $match: {
          createdAt: {
            $gte: new Date(startDate),
            $lte: new Date(endDate)
          },
          status: 'completed'
        }
      },
      // Stage 2: Group by date and calculate daily totals
      {
        $group: {
          _id: {
            $dateToString: {
              format: '%Y-%m-%d',
              date: '$createdAt'
            }
          },
          totalSales: { $sum: '$total' },
          orderCount: { $sum: 1 },
          averageOrderValue: { $avg: '$total' },
          totalItems: { $sum: { $size: '$items' } }
        }
      },
      // Stage 3: Sort by date
      {
        $sort: { '_id': 1 }
      },
      // Stage 4: Add running totals
      {
        $group: {
          _id: null,
          dailySales: {
            $push: {
              date: '$_id',
              sales: '$totalSales',
              orders: '$orderCount',
              aov: { $round: ['$averageOrderValue', 2] }
            }
          },
          totalSales: { $sum: '$totalSales' },
          totalOrders: { $sum: '$orderCount' },
          overallAOV: { $avg: '$averageOrderValue' }
        }
      }
    ];

    const result = await mongoose.connection.db
      .collection('orders')
      .aggregate(pipeline)
      .toArray();

    return result[0] || {
      dailySales: [],
      totalSales: 0,
      totalOrders: 0,
      overallAOV: 0
    };
  } catch (error) {
    console.error('Error in sales analytics:', error);
    throw error;
  }
}

// Product performance analysis
async function getProductPerformance() {
  try {
    const pipeline = [
      // Unwind items array to get individual product analysis
      { $unwind: '$items' },
      // Match only completed orders
      { $match: { status: 'completed' } },
      // Group by product
      {
        $group: {
          _id: '$items.productId',
          productName: { $first: '$items.name' },
          totalSold: { $sum: '$items.quantity' },
          totalRevenue: {
            $sum: {
              $multiply: ['$items.price', '$items.quantity']
            }
          },
          orderCount: { $addToSet: '$orderNumber' }
        }
      },
      // Calculate additional metrics
      {
        $project: {
          productName: 1,
          totalSold: 1,
          totalRevenue: 1,
          uniqueOrders: { $size: '$orderCount' },
          averageOrderValue: {
            $divide: ['$totalRevenue', { $size: '$orderCount' }]
          }
        }
      },
      // Sort by revenue
      { $sort: { totalRevenue: -1 } },
      // Limit to top 10
      { $limit: 10 }
    ];

    const products = await mongoose.connection.db
      .collection('orders')
      .aggregate(pipeline)
      .toArray();

    return products;
  } catch (error) {
    console.error('Error in product performance:', error);
    throw error;
  }
}

// User engagement analytics
async function getUserEngagementAnalytics() {
  try {
    const pipeline = [
      // Lookup user details
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'user'
        }
      },
      { $unwind: '$user' },
      // Group by user
      {
        $group: {
          _id: '$userId',
          username: { $first: '$user.username' },
          totalOrders: { $sum: 1 },
          totalSpent: { $sum: '$total' },
          averageOrderValue: { $avg: '$total' },
          firstOrderDate: { $min: '$createdAt' },
          lastOrderDate: { $max: '$createdAt' },
          orderDates: { $push: '$createdAt' }
        }
      },
      // Calculate engagement metrics
      {
        $project: {
          username: 1,
          totalOrders: 1,
          totalSpent: 1,
          averageOrderValue: { $round: ['$averageOrderValue', 2] },
          firstOrderDate: 1,
          lastOrderDate: 1,
          customerLifetime: {
            $divide: [
              { $subtract: ['$lastOrderDate', '$firstOrderDate'] },
              1000 * 60 * 60 * 24 // Convert to days
            ]
          },
          orderFrequency: {
            $divide: [
              '$totalOrders',
              {
                $add: [
                  {
                    $divide: [
                      { $subtract: ['$lastOrderDate', '$firstOrderDate'] },
                      1000 * 60 * 60 * 24
                    ]
                  },
                  1 // Add 1 to avoid division by zero
                ]
              }
            ]
          }
        }
      },
      // Sort by total spent
      { $sort: { totalSpent: -1 } }
    ];

    const users = await mongoose.connection.db
      .collection('orders')
      .aggregate(pipeline)
      .toArray();

    return users;
  } catch (error) {
    console.error('Error in user engagement analytics:', error);
    throw error;
  }
}

// Faceted search for products
async function getProductFacets(searchQuery = '', category = '', priceRange = {}) {
  try {
    const pipeline = [
      // Match search criteria
      {
        $match: {
          ...(searchQuery && {
            $or: [
              { name: { $regex: searchQuery, $options: 'i' } },
              { description: { $regex: searchQuery, $options: 'i' } }
            ]
          }),
          ...(category && { category }),
          ...(priceRange.min !== undefined && {
            'price.current': { $gte: priceRange.min }
          }),
          ...(priceRange.max !== undefined && {
            'price.current': { $lte: priceRange.max }
          })
        }
      },
      // Facet for different aggregations
      {
        $facet: {
          // Category counts
          categories: [
            { $group: { _id: '$category', count: { $sum: 1 } } },
            { $sort: { count: -1 } }
          ],
          // Price ranges
          priceRanges: [
            {
              $bucket: {
                groupBy: '$price.current',
                boundaries: [0, 50, 100, 200, 500, 1000],
                default: '1000+',
                output: { count: { $sum: 1 } }
              }
            }
          ],
          // Brand counts
          brands: [
            { $group: { _id: '$brand', count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 10 }
          ],
          // Products with pagination
          products: [
            {
              $project: {
                name: 1,
                price: 1,
                category: 1,
                brand: 1,
                rating: '$reviewsSummary.averageRating'
              }
            },
            { $sort: { 'price.current': 1 } },
            { $limit: 20 }
          ]
        }
      }
    ];

    const result = await mongoose.connection.db
      .collection('products')
      .aggregate(pipeline)
      .toArray();

    return result[0];
  } catch (error) {
    console.error('Error in faceted search:', error);
    throw error;
  }
}

module.exports = {
  getSalesAnalytics,
  getProductPerformance,
  getUserEngagementAnalytics,
  getProductFacets
};`
        },
        {
          title: "Advanced Aggregation Patterns",
          code: `const mongoose = require('mongoose');

// Time-series analytics with window functions
async function getTimeSeriesAnalytics(collection, dateField, metrics, interval = 'day') {
  const dateFormat = interval === 'hour' ? '%Y-%m-%d-%H' :
                    interval === 'day' ? '%Y-%m-%d' :
                    interval === 'month' ? '%Y-%m' : '%Y';

  const pipeline = [
    {
      $group: {
        _id: {
          $dateToString: {
            format: dateFormat,
            date: \`$\${dateField}\`
          }
        },
        ...metrics.reduce((acc, metric) => {
          acc[metric.name] = metric.operator;
          return acc;
        }, {}),
        count: { $sum: 1 }
      }
    },
    { $sort: { '_id': 1 } }
  ];

  return await mongoose.connection.db
    .collection(collection)
    .aggregate(pipeline)
    .toArray();
}

// Graph-like relationships with $graphLookup
async function getCommentThread(postId, maxDepth = 5) {
  const pipeline = [
    // Start with root comments (no parent)
    {
      $match: {
        postId: mongoose.Types.ObjectId(postId),
        parentId: { $exists: false }
      }
    },
    // Recursively find all replies
    {
      $graphLookup: {
        from: 'comments',
        startWith: '$_id',
        connectFromField: '_id',
        connectToField: 'parentId',
        as: 'replies',
        maxDepth: maxDepth,
        depthField: 'depth'
      }
    },
    // Sort replies by depth and creation date
    {
      $addFields: {
        replies: {
          $sortArray: {
            input: '$replies',
            sortBy: { depth: 1, createdAt: 1 }
          }
        }
      }
    }
  ];

  return await mongoose.connection.db
    .collection('comments')
    .aggregate(pipeline)
    .toArray();
}

// Bucket analysis for data distribution
async function getDataDistribution(collection, field, bucketCount = 10) {
  // First, get min and max values
  const stats = await mongoose.connection.db
    .collection(collection)
    .aggregate([
      {
        $group: {
          _id: null,
          min: { $min: \`$\${field}\` },
          max: { $max: \`$\${field}\` },
          count: { $sum: 1 }
        }
      }
    ])
    .toArray();

  if (stats.length === 0) return [];

  const { min, max, count } = stats[0];
  const bucketSize = (max - min) / bucketCount;

  const pipeline = [
    {
      $bucket: {
        groupBy: \`$\${field}\`,
        boundaries: Array.from({ length: bucketCount + 1 }, (_, i) => min + i * bucketSize),
        default: 'outliers',
        output: {
          count: { $sum: 1 },
          min: { $min: \`$\${field}\` },
          max: { $max: \`$\${field}\` },
          avg: { $avg: \`$\${field}\` }
        }
      }
    },
    { $sort: { _id: 1 } }
  ];

  return await mongoose.connection.db
    .collection(collection)
    .aggregate(pipeline)
    .toArray();
}

// Real-time analytics with change streams
function setupRealTimeAnalytics(collectionName) {
  const collection = mongoose.connection.db.collection(collectionName);

  const changeStream = collection.watch([
    {
      $match: {
        operationType: { $in: ['insert', 'update', 'delete'] }
      }
    }
  ]);

  changeStream.on('change', async (change) => {
    try {
      switch (change.operationType) {
        case 'insert':
          await updateAnalyticsOnInsert(change.fullDocument);
          break;
        case 'update':
          await updateAnalyticsOnUpdate(change.documentKey, change.updateDescription);
          break;
        case 'delete':
          await updateAnalyticsOnDelete(change.documentKey);
          break;
      }
    } catch (error) {
      console.error('Error processing change stream:', error);
    }
  });

  return changeStream;
}

// Incremental aggregation updates
async function updateAnalyticsOnInsert(document) {
  const analytics = mongoose.connection.db.collection('analytics');

  // Update counters based on document type
  if (document.collection === 'orders') {
    await analytics.updateOne(
      { type: 'orders' },
      {
        $inc: {
          totalCount: 1,
          totalValue: document.total || 0
        },
        $set: { lastUpdated: new Date() }
      },
      { upsert: true }
    );
  }
}

async function updateAnalyticsOnUpdate(documentId, updateDescription) {
  // Handle incremental updates for modified fields
  const updatedFields = updateDescription.updatedFields;

  if (updatedFields && updatedFields.total) {
    const analytics = mongoose.connection.db.collection('analytics');
    const oldOrder = await mongoose.connection.db
      .collection('orders')
      .findOne({ _id: documentId });

    if (oldOrder) {
      const difference = updatedFields.total - oldOrder.total;
      await analytics.updateOne(
        { type: 'orders' },
        {
          $inc: { totalValue: difference },
          $set: { lastUpdated: new Date() }
        }
      );
    }
  }
}

async function updateAnalyticsOnDelete(documentId) {
  // Decrement counters when documents are deleted
  const deletedDoc = await mongoose.connection.db
    .collection('orders')
    .findOne({ _id: documentId }, { total: 1 });

  if (deletedDoc) {
    const analytics = mongoose.connection.db.collection('analytics');
    await analytics.updateOne(
      { type: 'orders' },
      {
        $inc: {
          totalCount: -1,
          totalValue: -deletedDoc.total
        },
        $set: { lastUpdated: new Date() }
      }
    );
  }
}

// Complex multi-collection aggregation
async function getComprehensiveUserReport(userId) {
  const pipeline = [
    // Start with user
    { $match: { _id: mongoose.Types.ObjectId(userId) } },

    // Lookup orders
    {
      $lookup: {
        from: 'orders',
        localField: '_id',
        foreignField: 'userId',
        as: 'orders'
      }
    },

    // Lookup posts
    {
      $lookup: {
        from: 'posts',
        localField: '_id',
        foreignField: 'authorId',
        as: 'posts'
      }
    },

    // Lookup followers/following
    {
      $lookup: {
        from: 'users',
        localField: 'following',
        foreignField: '_id',
        as: 'followingUsers'
      }
    },

    // Calculate comprehensive metrics
    {
      $project: {
        username: 1,
        email: 1,
        profile: 1,
        stats: 1,
        orderMetrics: {
          totalOrders: { $size: '$orders' },
          totalSpent: { $sum: '$orders.total' },
          averageOrderValue: { $avg: '$orders.total' },
          lastOrderDate: { $max: '$orders.createdAt' }
        },
        contentMetrics: {
          totalPosts: { $size: '$posts' },
          totalLikes: { $sum: '$posts.stats.likes' },
          totalComments: { $sum: '$posts.stats.comments' }
        },
        socialMetrics: {
          followersCount: { $size: '$followers' },
          followingCount: { $size: '$following' }
        }
      }
    }
  ];

  const result = await mongoose.connection.db
    .collection('users')
    .aggregate(pipeline)
    .toArray();

  return result[0];
}

module.exports = {
  getTimeSeriesAnalytics,
  getCommentThread,
  getDataDistribution,
  setupRealTimeAnalytics,
  getComprehensiveUserReport
};`
        }
      ]
    },
    {
      id: "mongodb-indexing-performance",
      title: "Indexing Strategies and Performance Optimization",
      content: "Indexes are critical for MongoDB performance, enabling fast query execution by providing efficient data access paths. Understanding different index types and their appropriate use cases is essential for optimizing database performance. MongoDB supports various index types including single field, compound, multikey, geospatial, and text indexes.\n\n**Index Types**:\n- **Single Field**: Index on a single field for equality matches\n- **Compound**: Index on multiple fields for complex queries\n- **Multikey**: Index on array fields for array element queries\n- **Geospatial**: Index for location-based queries\n- **Text**: Index for full-text search capabilities\n- **Hashed**: Index for hash-based sharding\n- **Wildcard**: Index for unknown or arbitrary fields\n\n**Index Properties**:\n- **Unique**: Ensures field values are unique across collection\n- **Sparse**: Only indexes documents that contain the indexed field\n- **TTL**: Automatically removes documents after specified time\n- **Partial**: Only indexes documents matching specified filter\n\n**Performance Analysis**:\n- **Explain Plans**: Analyze query execution and index usage\n- **Index Statistics**: Monitor index size and usage patterns\n- **Slow Query Log**: Identify queries needing optimization\n- **Index Coverage**: Ensure queries are covered by indexes\n\n**Index Maintenance**:\n- **Index Creation**: Creating indexes without blocking operations\n- **Index Removal**: Removing unused indexes to free space\n- **Index Rebuilding**: Rebuilding indexes for better performance\n- **Index Monitoring**: Tracking index performance over time\n\n**Best Practices**:\n- Create indexes for frequently queried fields\n- Use compound indexes for multi-field queries\n- Avoid over-indexing which increases write overhead\n- Monitor index usage and remove unused indexes\n- Use covered queries when possible\n- Consider index order for compound indexes\n- Use partial indexes for selective data\n- Regularly analyze and optimize slow queries",
      keyTopics: [
        "MongoDB index types and creation strategies",
        "Query optimization and performance analysis",
        "Index maintenance and monitoring",
        "Advanced indexing patterns and techniques"
      ],
      practicalExercises: [
        "Analyze and optimize slow queries with indexes",
        "Create compound indexes for complex query patterns",
        "Implement text search with MongoDB text indexes",
        "Monitor and maintain index performance over time"
      ],
      codeExamples: [
        {
          title: "Index Creation and Management",
          code: `const mongoose = require('mongoose');

// User schema with indexes
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    index: true // Automatic index
  },
  email: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    index: true
  },
  profile: {
    location: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point'
      },
      coordinates: [Number] // [longitude, latitude]
    },
    age: Number,
    interests: [String]
  },
  stats: {
    postsCount: { type: Number, default: 0 },
    followersCount: { type: Number, default: 0 }
  }
});

// Create compound indexes
userSchema.index({ 'stats.postsCount': -1, 'stats.followersCount': -1 });
userSchema.index({ 'profile.location': '2dsphere' }); // Geospatial index
userSchema.index({ 'profile.interests': 1 }); // Multikey index

// Text index for search
userSchema.index({
  username: 'text',
  'profile.bio': 'text'
}, {
  weights: {
    username: 10,
    'profile.bio': 1
  },
  name: 'user_text_search'
});

// Partial index
userSchema.index(
  { createdAt: 1 },
  {
    partialFilterExpression: { 'stats.postsCount': { $gte: 5 } },
    name: 'active_users_by_date'
  }
);

// TTL index for temporary data
const sessionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  token: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: '24h' } // TTL index
});

const User = mongoose.model('User', userSchema);
const Session = mongoose.model('Session', sessionSchema);

// Index management utilities
class IndexManager {
  static async createIndexes() {
    try {
      console.log('Creating database indexes...');

      // Create indexes for posts collection
      await mongoose.connection.db.collection('posts').createIndexes([
        { key: { authorId: 1, createdAt: -1 }, name: 'posts_author_date' },
        { key: { tags: 1 }, name: 'posts_tags' },
        { key: { 'stats.likes': -1 }, name: 'posts_popularity' },
        {
          key: { title: 'text', content: 'text' },
          name: 'posts_text_search',
          weights: { title: 10, content: 1 }
        }
      ]);

      // Create indexes for orders collection
      await mongoose.connection.db.collection('orders').createIndexes([
        { key: { userId: 1, createdAt: -1 }, name: 'orders_user_date' },
        { key: { status: 1, createdAt: -1 }, name: 'orders_status_date' },
        { key: { 'items.productId': 1 }, name: 'orders_products' },
        { key: { total: -1 }, name: 'orders_total' }
      ]);

      console.log('All indexes created successfully');
    } catch (error) {
      console.error('Error creating indexes:', error);
      throw error;
    }
  }

  static async analyzeIndexUsage() {
    try {
      const collections = ['users', 'posts', 'orders'];

      for (const collectionName of collections) {
        console.log(\`\\nAnalyzing indexes for \${collectionName}:\`);

        const collection = mongoose.connection.db.collection(collectionName);
        const indexes = await collection.indexes();

        for (const index of indexes) {
          const stats = await collection.aggregate([
            { $indexStats: {} },
            { $match: { name: index.name } }
          ]).toArray();

          if (stats.length > 0) {
            const usage = stats[0];
            console.log(\`  Index: \${index.name}\`);
            console.log(\`    Usage count: \${usage.accesses?.ops || 0}\`);
            console.log(\`    Since: \${usage.accesses?.since || 'N/A'}\`);
          }
        }
      }
    } catch (error) {
      console.error('Error analyzing index usage:', error);
      throw error;
    }
  }

  static async removeUnusedIndexes() {
    try {
      const db = mongoose.connection.db;
      const collections = await db.collections();

      for (const collection of collections) {
        const indexes = await collection.indexes();
        const stats = await collection.aggregate([{ $indexStats: {} }]).toArray();

        const usedIndexes = new Set(stats.map(stat => stat.name));

        for (const index of indexes) {
          // Skip default _id index
          if (index.name === '_id_') continue;

          if (!usedIndexes.has(index.name)) {
            console.log(\`Dropping unused index: \${index.name} from \${collection.collectionName}\`);
            await collection.dropIndex(index.name);
          }
        }
      }
    } catch (error) {
      console.error('Error removing unused indexes:', error);
      throw error;
    }
  }

  static async optimizeQuery(query, collectionName) {
    try {
      const collection = mongoose.connection.db.collection(collectionName);

      // Explain the query
      const explanation = await collection.find(query).explain('executionStats');

      console.log('Query execution stats:');
      console.log(\`  Execution time: \${explanation.executionStats.executionTimeMillis}ms\`);
      console.log(\`  Documents examined: \${explanation.executionStats.totalDocsExamined}\`);
      console.log(\`  Documents returned: \${explanation.executionStats.totalDocsReturned}\`);

      // Check if index was used
      const winningPlan = explanation.executionStats.winningPlan;
      if (winningPlan.inputStage?.stage === 'IXSCAN') {
        console.log(\`  ✅ Index used: \${winningPlan.inputStage.indexName}\`);
      } else {
        console.log('  ⚠️  No index used - consider creating an index');
      }

      return explanation;
    } catch (error) {
      console.error('Error optimizing query:', error);
      throw error;
    }
  }
}

module.exports = {
  User,
  Session,
  IndexManager
};`
        },
        {
          title: "Query Optimization and Performance Monitoring",
          code: `const mongoose = require('mongoose');

// Query optimization utilities
class QueryOptimizer {
  static async analyzeSlowQueries(thresholdMs = 100) {
    try {
      // Enable profiling
      await mongoose.connection.db.setProfilingLevel(2, { slowms: thresholdMs });

      console.log(\`Profiling enabled for queries slower than \${thresholdMs}ms\);

      // Get profiling data
      const profilingData = await mongoose.connection.db
        .collection('system.profile')
        .find({})
        .sort({ ts: -1 })
        .limit(10)
        .toArray();

      console.log('\\nRecent slow queries:');
      profilingData.forEach((query, index) => {
        console.log(\`\${index + 1}. \${query.op} on \${query.ns}\`);
        console.log(\`   Duration: \${query.millis}ms\`);
        console.log(\`   Query: \${JSON.stringify(query.query)}\`);
        if (query.planSummary) {
          console.log(\`   Plan: \${query.planSummary}\`);
        }
        console.log('');
      });

      return profilingData;
    } catch (error) {
      console.error('Error analyzing slow queries:', error);
      throw error;
    }
  }

  static async createOptimalIndexes() {
    try {
      const profilingData = await mongoose.connection.db
        .collection('system.profile')
        .find({ op: 'query' })
        .sort({ millis: -1 })
        .limit(20)
        .toArray();

      const suggestedIndexes = new Map();

      for (const query of profilingData) {
        if (query.query && Object.keys(query.query).length > 0) {
          const collection = query.ns.split('.')[1];
          const queryFields = Object.keys(query.query);

          // Suggest compound index for multi-field queries
          if (queryFields.length > 1) {
            const indexKey = queryFields.map(field => [field, 1]);
            const indexName = \`\${collection}_\${queryFields.join('_')}\`;

            if (!suggestedIndexes.has(indexName)) {
              suggestedIndexes.set(indexName, {
                collection,
                key: Object.fromEntries(indexKey)
              });
            }
          }
        }
      }

      // Create suggested indexes
      for (const [indexName, indexInfo] of suggestedIndexes) {
        try {
          await mongoose.connection.db
            .collection(indexInfo.collection)
            .createIndex(indexInfo.key, { name: indexName });

          console.log(\`Created index: \${indexName} on \${indexInfo.collection}\`);
        } catch (error) {
          console.log(\`Index \${indexName} already exists or error: \${error.message}\`);
        }
      }

      return Array.from(suggestedIndexes.keys());
    } catch (error) {
      console.error('Error creating optimal indexes:', error);
      throw error;
    }
  }

  static async monitorCollectionStats() {
    try {
      const collections = ['users', 'posts', 'orders'];
      const stats = {};

      for (const collectionName of collections) {
        const collection = mongoose.connection.db.collection(collectionName);

        // Get collection statistics
        const collStats = await mongoose.connection.db.command({
          collStats: collectionName
        });

        // Get index statistics
        const indexes = await collection.indexes();
        const indexStats = await collection.aggregate([
          { $indexStats: {} }
        ]).toArray();

        stats[collectionName] = {
          documentCount: collStats.count,
          size: collStats.size,
          storageSize: collStats.storageSize,
          indexCount: indexes.length,
          indexes: indexStats.map(stat => ({
            name: stat.name,
            usageCount: stat.accesses?.ops || 0
          }))
        };
      }

      console.log('\\nCollection Statistics:');
      Object.entries(stats).forEach(([collection, data]) => {
        console.log(\`\\n\${collection}:\`);
        console.log(\`  Documents: \${data.documentCount.toLocaleString()}\`);
        console.log(\`  Size: \${(data.size / 1024 / 1024).toFixed(2)} MB\`);
        console.log(\`  Storage: \${(data.storageSize / 1024 / 1024).toFixed(2)} MB\`);
        console.log(\`  Indexes: \${data.indexCount}\`);

        data.indexes.forEach(index => {
          console.log(\`    \${index.name}: \${index.usageCount} uses\`);
        });
      });

      return stats;
    } catch (error) {
      console.error('Error monitoring collection stats:', error);
      throw error;
    }
  }
}

// Performance monitoring middleware
const performanceMiddleware = (schema) => {
  // Pre-hook for find operations
  schema.pre('find', function(next) {
    this._startTime = Date.now();
    next();
  });

  schema.post('find', function(docs) {
    const duration = Date.now() - this._startTime;
    if (duration > 100) { // Log slow queries
      console.log(\`Slow find query on \${this.model.collection.name}: \${duration}ms\`);
      console.log('Query:', this.getQuery());
    }
  });

  // Pre-hook for save operations
  schema.pre('save', function(next) {
    this._startTime = Date.now();
    next();
  });

  schema.post('save', function(doc) {
    const duration = Date.now() - this._startTime;
    if (duration > 50) {
      console.log(\`Slow save operation on \${this.constructor.collection.name}: \${duration}ms\`);
    }
  });
};

// Connection pool monitoring
class ConnectionMonitor {
  static async getConnectionStats() {
    try {
      const adminDb = mongoose.connection.db.admin();
      const serverStatus = await adminDb.serverStatus();

      const connections = serverStatus.connections;
      const opcounters = serverStatus.opcounters;

      console.log('\\nConnection Pool Statistics:');
      console.log(\`Current connections: \${connections.current}\`);
      console.log(\`Available connections: \${connections.available}\`);
      console.log(\`Total created: \${connections.totalCreated}\`);

      console.log('\\nOperation Counters:');
      console.log(\`Insert: \${opcounters.insert}\`);
      console.log(\`Query: \${opcounters.query}\`);
      console.log(\`Update: \${opcounters.update}\`);
      console.log(\`Delete: \${opcounters.delete}\`);

      return { connections, opcounters };
    } catch (error) {
      console.error('Error getting connection stats:', error);
      throw error;
    }
  }

  static async monitorReplication() {
    try {
      const adminDb = mongoose.connection.db.admin();
      const replSetGetStatus = await adminDb.command({ replSetGetStatus: 1 });

      console.log('\\nReplication Status:');
      console.log(\`Set: \${replSetGetStatus.set}\`);

      replSetGetStatus.members.forEach(member => {
        console.log(\`  \${member.name}: \${member.stateStr} (\${member.state})\`);
        console.log(\`    Health: \${member.health}\`);
        console.log(\`    Last heartbeat: \${new Date(member.lastHeartbeat).toISOString()}\`);
      });

      return replSetGetStatus;
    } catch (error) {
      console.log('Not running in replica set mode');
      return null;
    }
  }
}

// Query result caching utility
class QueryCache {
  constructor(ttlMinutes = 60) {
    this.cache = new Map();
    this.ttl = ttlMinutes * 60 * 1000; // Convert to milliseconds
  }

  set(key, value) {
    this.cache.set(key, {
      value,
      timestamp: Date.now()
    });
  }

  get(key) {
    const item = this.cache.get(key);
    if (!item) return null;

    if (Date.now() - item.timestamp > this.ttl) {
      this.cache.delete(key);
      return null;
    }

    return item.value;
  }

  clear() {
    this.cache.clear();
  }

  size() {
    return this.cache.size;
  }
}

// Cached query wrapper
const cachedQuery = (cache) => (queryFn) => async (...args) => {
  const key = JSON.stringify(args);

  // Check cache first
  const cached = cache.get(key);
  if (cached) {
    console.log('Returning cached result');
    return cached;
  }

  // Execute query
  const result = await queryFn(...args);

  // Cache result
  cache.set(key, result);

  return result;
};

module.exports = {
  QueryOptimizer,
  ConnectionMonitor,
  QueryCache,
  cachedQuery,
  performanceMiddleware
};`
        }
      ]
    },
    {
      id: "mongodb-atlas-deployment",
      title: "MongoDB Atlas Cloud Deployment and Management",
      content: "MongoDB Atlas is a fully managed cloud database service that provides automated provisioning, patching, upgrades, backups, and scaling. It offers a user-friendly interface for database management and monitoring, making it easy to deploy and maintain MongoDB databases in the cloud.\n\n**Atlas Features**:\n- **Automated Deployment**: One-click database provisioning\n- **Global Clusters**: Multi-region deployments for low latency\n- **Auto-Scaling**: Automatic scaling based on workload demands\n- **Backup & Recovery**: Automated backups with point-in-time recovery\n- **Security**: Built-in encryption, network isolation, and access controls\n- **Monitoring**: Real-time performance metrics and alerting\n- **Integration**: Seamless integration with other cloud services\n\n**Deployment Options**:\n- **Free Tier**: Perfect for development and small applications\n- **Dedicated Clusters**: Production-ready with dedicated resources\n- **Serverless**: Pay-per-use model for variable workloads\n- **Multi-Cloud**: Deploy across AWS, Google Cloud, and Azure\n\n**Security Configuration**:\n- **Network Access**: IP whitelisting and VPC peering\n- **Authentication**: Database users and authentication methods\n- **Encryption**: Data encryption at rest and in transit\n- **Audit Logging**: Comprehensive logging for compliance\n\n**Performance Optimization**:\n- **Index Management**: Automated index suggestions\n- **Query Optimization**: Performance advisor recommendations\n- **Scaling**: Horizontal and vertical scaling options\n- **Caching**: Integration with Redis for improved performance\n\n**Best Practices**:\n- Start with the free tier for development\n- Use appropriate cluster tiers for production workloads\n- Configure proper backup and recovery strategies\n- Implement monitoring and alerting\n- Use Atlas's built-in security features\n- Regularly review and optimize performance\n- Plan for scaling as your application grows",
      keyTopics: [
        "MongoDB Atlas setup and cluster configuration",
        "Security configuration and access management",
        "Backup and recovery strategies",
        "Performance monitoring and optimization"
      ],
      practicalExercises: [
        "Deploy a MongoDB Atlas cluster and configure security",
        "Set up automated backups and monitoring",
        "Implement multi-region deployment for global applications",
        "Configure performance monitoring and alerting"
      ],
      codeExamples: [
        {
          title: "MongoDB Atlas Connection and Configuration",
          code: `const mongoose = require('mongoose');
const { MongoClient } = require('mongodb');

// Atlas connection configuration
const atlasConfig = {
  // Replace with your Atlas connection string
  connectionString: process.env.MONGODB_ATLAS_URI || 'mongodb+srv://username:password@cluster.mongodb.net/myapp',
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    maxPoolSize: 10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    bufferCommands: false, // Disable mongoose buffering
    bufferMaxEntries: 0, // Disable mongoose buffering
    retryWrites: true, // Retry writes on network errors
    retryReads: true, // Retry reads on network errors
    maxIdleTimeMS: 30000, // Close connections after 30 seconds of inactivity
    family: 4 // Use IPv4, skip trying IPv6
  }
};

// Connect to Atlas with Mongoose
async function connectToAtlas() {
  try {
    await mongoose.connect(atlasConfig.connectionString, atlasConfig.options);

    console.log('✅ Connected to MongoDB Atlas');

    // Connection event listeners
    mongoose.connection.on('connected', () => {
      console.log('Mongoose connected to MongoDB Atlas');
    });

    mongoose.connection.on('error', (err) => {
      console.error('Mongoose connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('Mongoose disconnected from MongoDB Atlas');
    });

    // Graceful shutdown
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      console.log('MongoDB Atlas connection closed through app termination');
      process.exit(0);
    });

    return mongoose.connection;
  } catch (error) {
    console.error('❌ Failed to connect to MongoDB Atlas:', error);
    throw error;
  }
}

// Connect with native MongoDB driver
async function connectWithNativeDriver() {
  const client = new MongoClient(atlasConfig.connectionString, atlasConfig.options);

  try {
    await client.connect();
    console.log('✅ Connected to MongoDB Atlas with native driver');

    const db = client.db('myapp');

    // Test the connection
    const collections = await db.collections();
    console.log(\`Available collections: \${collections.map(c => c.collectionName).join(', ')}\`);

    return { client, db };
  } catch (error) {
    console.error('❌ Failed to connect with native driver:', error);
    throw error;
  }
}

// Connection health check
async function checkConnectionHealth() {
  try {
    const admin = mongoose.connection.db.admin();
    const info = await admin.serverInfo();

    const health = {
      status: 'healthy',
      version: info.version,
      uptime: info.uptime,
      connections: {
        current: info.connections?.current || 'N/A',
        available: info.connections?.available || 'N/A'
      },
      memory: {
        resident: info.mem?.resident || 'N/A',
        virtual: info.mem?.virtual || 'N/A'
      }
    };

    console.log('🏥 Connection Health:', JSON.stringify(health, null, 2));
    return health;
  } catch (error) {
    console.error('❌ Health check failed:', error);
    return { status: 'unhealthy', error: error.message };
  }
}

// Multi-region connection (for global clusters)
async function connectToMultiRegionCluster() {
  const regions = [
    'mongodb+srv://user:pass@cluster-us-east.mongodb.net/myapp',
    'mongodb+srv://user:pass@cluster-eu-west.mongodb.net/myapp',
    'mongodb+srv://user:pass@cluster-ap-southeast.mongodb.net/myapp'
  ];

  // Try to connect to the closest region first
  for (const uri of regions) {
    try {
      console.log(\`Attempting connection to: \${uri.split('@')[1].split('.')[0]}\`);
      await mongoose.connect(uri, atlasConfig.options);
      console.log('✅ Connected to multi-region cluster');
      return mongoose.connection;
    } catch (error) {
      console.log(\`Failed to connect to region, trying next...\`);
    }
  }

  throw new Error('Failed to connect to any region');
}

// Database migration utility
class DatabaseMigrator {
  constructor(sourceUri, targetUri) {
    this.sourceClient = new MongoClient(sourceUri);
    this.targetClient = new MongoClient(targetUri);
  }

  async migrateCollection(collectionName, batchSize = 1000) {
    try {
      await this.sourceClient.connect();
      await this.targetClient.connect();

      const sourceDb = this.sourceClient.db();
      const targetDb = this.targetClient.db();

      const sourceCollection = sourceDb.collection(collectionName);
      const targetCollection = targetDb.collection(collectionName);

      const totalDocs = await sourceCollection.countDocuments();
      console.log(\`Migrating \${totalDocs} documents from \${collectionName}\`);

      let migrated = 0;
      const cursor = sourceCollection.find({});

      while (await cursor.hasNext()) {
        const batch = [];
        for (let i = 0; i < batchSize && await cursor.hasNext(); i++) {
          batch.push(await cursor.next());
        }

        if (batch.length > 0) {
          await targetCollection.insertMany(batch);
          migrated += batch.length;
          console.log(\`Migrated \${migrated}/\${totalDocs} documents\`);
        }
      }

      console.log(\`✅ Migration completed for \${collectionName}\`);
      return migrated;
    } catch (error) {
      console.error(\`❌ Migration failed for \${collectionName}:\`, error);
      throw error;
    } finally {
      await this.sourceClient.close();
      await this.targetClient.close();
    }
  }

  async migrateAllCollections() {
    try {
      await this.sourceClient.connect();
      const sourceDb = this.sourceClient.db();
      const collections = await sourceDb.collections();

      const results = {};
      for (const collection of collections) {
        const count = await this.migrateCollection(collection.collectionName);
        results[collection.collectionName] = count;
      }

      console.log('✅ All collections migrated:', results);
      return results;
    } catch (error) {
      console.error('❌ Migration failed:', error);
      throw error;
    } finally {
      await this.sourceClient.close();
    }
  }
}

module.exports = {
  connectToAtlas,
  connectWithNativeDriver,
  checkConnectionHealth,
  connectToMultiRegionCluster,
  DatabaseMigrator
};`
        },
        {
          title: "Atlas Security Configuration and Monitoring",
          code: `const mongoose = require('mongoose');

// Security configuration for Atlas
const securityConfig = {
  // Database users
  users: [
    {
      username: 'app_user',
      password: process.env.DB_APP_PASSWORD,
      roles: ['readWrite'],
      database: 'myapp'
    },
    {
      username: 'analytics_user',
      password: process.env.DB_ANALYTICS_PASSWORD,
      roles: ['read'],
      database: 'myapp'
    },
    {
      username: 'admin_user',
      password: process.env.DB_ADMIN_PASSWORD,
      roles: ['dbAdmin', 'readWrite'],
      database: 'myapp'
    }
  ],

  // Network access rules
  networkAccess: {
    whitelist: [
      '203.0.113.0/24', // Office IP range
      '198.51.100.0/24' // Home IP range
    ],
    vpcPeering: true
  },

  // Encryption settings
  encryption: {
    atRest: true,
    inTransit: true,
    clientSideEncryption: false
  }
};

// User management utilities
class AtlasUserManager {
  static async createDatabaseUsers() {
    try {
      console.log('Creating database users...');

      for (const user of securityConfig.users) {
        const adminDb = mongoose.connection.db.admin();

        await adminDb.command({
          createUser: user.username,
          pwd: user.password,
          roles: user.roles.map(role => ({
            role: role,
            db: user.database
          }))
        });

        console.log(\`✅ Created user: \${user.username}\`);
      }
    } catch (error) {
      console.error('❌ Failed to create database users:', error);
      throw error;
    }
  }

  static async updateUserPassword(username, newPassword) {
    try {
      const adminDb = mongoose.connection.db.admin();

      await adminDb.command({
        updateUser: username,
        pwd: newPassword
      });

      console.log(\`✅ Updated password for user: \${username}\`);
    } catch (error) {
      console.error('❌ Failed to update user password:', error);
      throw error;
    }
  }

  static async grantUserRole(username, role, database) {
    try {
      const adminDb = mongoose.connection.db.admin();

      await adminDb.command({
        grantRolesToUser: username,
        roles: [{ role: role, db: database }]
      });

      console.log(\`✅ Granted role \${role} to user: \${username}\`);
    } catch (error) {
      console.error('❌ Failed to grant user role:', error);
      throw error;
    }
  }
}

// Audit logging
class AuditLogger {
  constructor() {
    this.auditCollection = 'audit_log';
  }

  async logOperation(operation, collection, user, details = {}) {
    try {
      const auditEntry = {
        timestamp: new Date(),
        operation: operation,
        collection: collection,
        user: user,
        details: details,
        ip: details.ip || 'unknown',
        userAgent: details.userAgent || 'unknown'
      };

      await mongoose.connection.db
        .collection(this.auditCollection)
        .insertOne(auditEntry);

      console.log(\`📝 Audit logged: \${operation} on \${collection} by \${user}\`);
    } catch (error) {
      console.error('❌ Failed to log audit entry:', error);
    }
  }

  async getAuditTrail(filter = {}, limit = 100) {
    try {
      const auditLog = await mongoose.connection.db
        .collection(this.auditCollection)
        .find(filter)
        .sort({ timestamp: -1 })
        .limit(limit)
        .toArray();

      return auditLog;
    } catch (error) {
      console.error('❌ Failed to retrieve audit trail:', error);
      throw error;
    }
  }
}

// Performance monitoring
class AtlasPerformanceMonitor {
  static async getClusterMetrics() {
    try {
      const adminDb = mongoose.connection.db.admin();

      // Get server status
      const serverStatus = await adminDb.serverStatus();

      const metrics = {
        connections: serverStatus.connections,
        opcounters: serverStatus.opcounters,
        memory: serverStatus.mem,
        uptime: serverStatus.uptime,
        assertions: serverStatus.assertions,
        network: serverStatus.network,
        timestamp: new Date()
      };

      console.log('📊 Cluster Metrics:', JSON.stringify(metrics, null, 2));
      return metrics;
    } catch (error) {
      console.error('❌ Failed to get cluster metrics:', error);
      throw error;
    }
  }

  static async getSlowQueries(thresholdMs = 100) {
    try {
      // Enable profiling temporarily
      await mongoose.connection.db.setProfilingLevel(2, { slowms: thresholdMs });

      // Wait a moment for some queries to be profiled
      await new Promise(resolve => setTimeout(resolve, 1000));

      const slowQueries = await mongoose.connection.db
        .collection('system.profile')
        .find({ millis: { $gte: thresholdMs } })
        .sort({ millis: -1 })
        .limit(10)
        .toArray();

      // Disable profiling
      await mongoose.connection.db.setProfilingLevel(0);

      console.log(\`🐌 Found \${slowQueries.length} slow queries (> \${thresholdMs}ms):\`);

      slowQueries.forEach((query, index) => {
        console.log(\`\${index + 1}. \${query.millis}ms - \${query.op} on \${query.ns}\`);
      });

      return slowQueries;
    } catch (error) {
      console.error('❌ Failed to get slow queries:', error);
      throw error;
    }
  }

  static async getIndexUsage() {
    try {
      const collections = await mongoose.connection.db.collections();
      const indexUsage = {};

      for (const collection of collections) {
        const collectionName = collection.collectionName;

        // Skip system collections
        if (collectionName.startsWith('system.')) continue;

        const indexes = await collection.aggregate([
          { $indexStats: {} }
        ]).toArray();

        indexUsage[collectionName] = indexes.map(index => ({
          name: index.name,
          usageCount: index.accesses?.ops || 0,
          since: index.accesses?.since
        }));
      }

      console.log('📈 Index Usage Report:');
      Object.entries(indexUsage).forEach(([collection, indexes]) => {
        console.log(\`\\n\${collection}:\`);
        indexes.forEach(index => {
          console.log(\`  \${index.name}: \${index.usageCount} uses\`);
        });
      });

      return indexUsage;
    } catch (error) {
      console.error('❌ Failed to get index usage:', error);
      throw error;
    }
  }
}

// Backup and recovery utilities
class BackupManager {
  static async createBackup(collectionName, backupName) {
    try {
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const backupCollection = \`backup_\${collectionName}_\${timestamp}\`;

      // Copy collection to backup
      await mongoose.connection.db.collection(collectionName).aggregate([
        { $out: backupCollection }
      ]).toArray();

      console.log(\`✅ Backup created: \${backupCollection}\`);

      // Log backup operation
      await mongoose.connection.db.collection('backup_log').insertOne({
        collection: collectionName,
        backupCollection: backupCollection,
        timestamp: new Date(),
        type: 'manual'
      });

      return backupCollection;
    } catch (error) {
      console.error('❌ Failed to create backup:', error);
      throw error;
    }
  }

  static async restoreFromBackup(backupCollection, targetCollection) {
    try {
      // Clear target collection
      await mongoose.connection.db.collection(targetCollection).deleteMany({});

      // Restore from backup
      await mongoose.connection.db.collection(backupCollection).aggregate([
        { $out: targetCollection }
      ]).toArray();

      console.log(\`✅ Restored \${targetCollection} from \${backupCollection}\`);

      // Log restore operation
      await mongoose.connection.db.collection('backup_log').insertOne({
        collection: targetCollection,
        backupCollection: backupCollection,
        timestamp: new Date(),
        type: 'restore'
      });

      return true;
    } catch (error) {
      console.error('❌ Failed to restore from backup:', error);
      throw error;
    }
  }

  static async listBackups(collectionName) {
    try {
      const backups = await mongoose.connection.db
        .collection('backup_log')
        .find({
          collection: collectionName,
          type: 'manual'
        })
        .sort({ timestamp: -1 })
        .toArray();

      console.log(\`📋 Available backups for \${collectionName}:\`);
      backups.forEach(backup => {
        console.log(\`  \${backup.backupCollection} - \${backup.timestamp}\`);
      });

      return backups;
    } catch (error) {
      console.error('❌ Failed to list backups:', error);
      throw error;
    }
  }
}

module.exports = {
  AtlasUserManager,
  AuditLogger,
  AtlasPerformanceMonitor,
  BackupManager
};`
        }
      ]
    }
  ],
  projects: [
    {
      title: "E-commerce Platform with MongoDB",
      description: "Build a complete e-commerce platform using MongoDB for product catalog, user management, orders, and analytics. Implement features like product search, shopping cart, order processing, and sales analytics with aggregation pipelines."
    },
    {
      title: "Social Media Analytics Dashboard",
      description: "Create a social media analytics platform using MongoDB to store and analyze user interactions, posts, and engagement metrics. Implement real-time analytics, trend analysis, and user behavior insights."
    },
    {
      title: "IoT Data Processing System",
      description: "Develop an IoT data processing system using MongoDB for storing sensor data, implementing time-series analytics, and creating real-time monitoring dashboards with aggregation frameworks."
    },
    {
      title: "Content Management System",
      description: "Build a flexible content management system with MongoDB, supporting multiple content types, user roles, workflow management, and advanced search capabilities using text indexes."
    },
    {
      title: "Financial Transaction System",
      description: "Create a financial transaction processing system with MongoDB, implementing ACID transactions, audit logging, compliance reporting, and real-time balance calculations."
    }
  ],
  assessments: [
    {
      type: "quiz",
      questions: [
        {
          question: "What is the primary advantage of MongoDB's document model?",
          options: [
            "Strict schema enforcement",
            "Flexible schema design",
            "SQL query compatibility",
            "Automatic data normalization"
          ],
          correctAnswer: "Flexible schema design"
        },
        {
          question: "Which MongoDB operation is used for complex data analysis?",
          options: [
            "find()",
            "insertOne()",
            "aggregate()",
            "updateMany()"
          ],
          correctAnswer: "aggregate()"
        },
        {
          question: "What type of index is used for location-based queries in MongoDB?",
          options: [
            "Text index",
            "Geospatial index",
            "Compound index",
            "Hashed index"
          ],
          correctAnswer: "Geospatial index"
        },
        {
          question: "Which MongoDB service provides managed cloud deployment?",
          options: [
            "MongoDB Compass",
            "MongoDB Atlas",
            "MongoDB Shell",
            "MongoDB Charts"
          ],
          correctAnswer: "MongoDB Atlas"
        },
        {
          question: "What is the maximum document size in MongoDB?",
          options: [
            "4MB",
            "8MB",
            "16MB",
            "32MB"
          ],
          correctAnswer: "16MB"
        }
      ]
    },
    {
      type: "evaluation",
      questions: [
        {
          question: "Design a MongoDB schema for a blogging platform that supports users, posts, comments, and tags. Explain your embedding vs referencing decisions and indexing strategy.",
          options: [],
          correctAnswer: ""
        },
        {
          question: "Create an aggregation pipeline that analyzes sales data to show top products, revenue trends, and customer behavior patterns. Explain each stage of your pipeline.",
          options: [],
          correctAnswer: ""
        },
        {
          question: "Explain how you would implement a real-time chat system using MongoDB, including data modeling, indexing, and performance optimization strategies.",
          options: [],
          correctAnswer: ""
        }
      ]
    }
  ],
  aiPrompts: [
    "How do I design a MongoDB schema?",
    "How do I use MongoDB aggregation pipelines?",
    "How do I create indexes in MongoDB?",
    "How do I connect to MongoDB Atlas?",
    "How do I optimize MongoDB queries?",
    "How do I use Mongoose with MongoDB?",
    "How do I implement MongoDB transactions?",
    "How do I backup MongoDB data?",
    "How do I monitor MongoDB performance?",
    "How do I use MongoDB with Node.js?",
    "How do I implement MongoDB security?",
    "How do I migrate data in MongoDB?",
    "How do I use MongoDB geospatial queries?",
    "How do I implement MongoDB text search?",
    "How do I scale MongoDB applications?"
  ],
  resources: [
    { name: "MongoDB Official Documentation", url: "https://docs.mongodb.com" },
    { name: "MongoDB University", url: "https://university.mongodb.com" },
    { name: "MongoDB Atlas Documentation", url: "https://docs.atlas.mongodb.com" },
    { name: "Mongoose Documentation", url: "https://mongoosejs.com/docs" },
    { name: "MongoDB Compass", url: "https://www.mongodb.com/products/compass" },
    { name: "MongoDB Charts", url: "https://www.mongodb.com/products/charts" },
    { name: "MongoDB Realm", url: "https://www.mongodb.com/realm" },
    { name: "MongoDB Stitch", url: "https://www.mongodb.com/cloud/stitch" }
  ],
  toolsRequired: [
    "Node.js (v14 or higher)",
    "MongoDB (Community Server or Atlas)",
    "MongoDB Compass (GUI tool)",
    "Mongoose ODM",
    "MongoDB Node.js Driver",
    "Postman or similar API testing tool",
    "Git for version control",
    "Visual Studio Code or similar IDE"
  ],
  bestPractices: [
    "Design schemas based on application query patterns",
    "Use embedding for frequently accessed related data",
    "Create indexes for commonly queried fields",
    "Use compound indexes for multi-field queries",
    "Implement proper error handling for database operations",
    "Use transactions for multi-document operations",
    "Monitor query performance and optimize slow queries",
    "Implement proper backup and recovery strategies",
    "Use MongoDB Atlas for production deployments",
    "Implement security best practices (authentication, authorization)",
    "Use connection pooling for better performance",
    "Validate data at application level",
    "Use aggregation pipelines for complex data analysis",
    "Implement proper logging and monitoring",
    "Plan for horizontal scaling with sharding",
    "Use appropriate data types for fields",
    "Implement data archiving strategies for large datasets",
    "Use MongoDB's built-in compression features",
    "Regularly update MongoDB and drivers",
    "Test database operations thoroughly"
  ],
  commonPitfalls: [
    "Designing schemas without considering query patterns",
    "Over-embedding data leading to large documents",
    "Not creating appropriate indexes",
    "Ignoring connection pooling configuration",
    "Not handling database connection errors properly",
    "Using MongoDB for relational data without proper design",
    "Not implementing proper backup strategies",
    "Ignoring security configurations",
    "Not monitoring database performance",
    "Using outdated MongoDB drivers",
    "Not implementing data validation",
    "Ignoring aggregation pipeline optimization",
    "Not planning for data growth",
    "Using inappropriate data types",
    "Not implementing proper error handling",
    "Ignoring MongoDB's 16MB document size limit",
    "Not using transactions when needed",
    "Over-indexing leading to write performance issues",
    "Not implementing proper logging",
    "Ignoring MongoDB Atlas best practices"
  ],
  careerRelevance: "MongoDB is one of the most popular NoSQL databases, used by companies like Netflix, Uber, and eBay. MongoDB developers are in high demand for modern web development, big data processing, and real-time applications. The flexible document model makes MongoDB ideal for agile development and rapid prototyping. MongoDB skills are highly valued in full-stack development roles, with competitive salaries and excellent career prospects in the growing NoSQL database market."
};

export default mongodbContent;