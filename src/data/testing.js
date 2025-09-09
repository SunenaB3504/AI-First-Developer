export default {
  id: "testing",
  tier: 3,
  name: "Testing Strategies",
  description: "Master comprehensive testing methodologies including unit testing, integration testing, end-to-end testing, and test-driven development. Learn to write maintainable tests, implement testing best practices, and integrate automated testing into your development workflow.",
  difficulty: "intermediate",
  estimatedHours: 20,
  prerequisites: ["javascript", "nodejs"],
  learningObjectives: [
    "Write comprehensive unit tests using Jest with proper assertions and test organization",
    "Implement integration tests to verify component interactions and data flow",
    "Create end-to-end tests using Cypress for complete user workflow validation",
    "Apply test-driven development (TDD) principles to guide code design and implementation",
    "Use mocking and stubbing techniques to isolate code under test",
    "Configure and interpret code coverage reports to ensure adequate test coverage",
    "Set up continuous integration testing with automated test execution",
    "Write testable code following SOLID principles and dependency injection",
    "Implement testing best practices for maintainable and reliable test suites",
    "Debug failing tests and identify root causes of test failures",
    "Organize test files and structure test suites for large applications",
    "Use testing utilities and libraries to improve test efficiency"
  ],
  sections: [
    {
      title: "Unit Testing with Jest",
      content: "Unit testing is the foundation of a robust testing strategy. It involves testing individual units of code (functions, methods, classes) in isolation to ensure they work as expected. Jest is a popular JavaScript testing framework that provides a complete testing solution with built-in assertion library, mocking capabilities, and code coverage reporting.\n\n**Test Structure**: A typical unit test follows the Arrange-Act-Assert pattern. First, you arrange the test setup (create objects, set up mocks). Then you act by calling the function under test. Finally, you assert that the expected behavior occurred.\n\n**Jest Features**: Jest provides powerful features like automatic test discovery, parallel test execution, snapshot testing, and built-in code coverage. It works out of the box with most JavaScript projects and requires minimal configuration.\n\n**Best Practices**: Write descriptive test names that explain what behavior is being tested. Keep tests focused on a single piece of functionality. Use beforeEach/afterEach hooks for test setup and cleanup. Avoid testing implementation details - focus on behavior.\n\n**Test Organization**: Group related tests in describe blocks. Use meaningful test descriptions that read like documentation. Separate test files should mirror your source code structure.",
      keyTopics: [
        "Jest test framework fundamentals",
        "Arrange-Act-Assert test pattern",
        "Test organization and naming conventions",
        "Jest configuration and setup",
        "Test isolation and cleanup"
      ],
      practicalExercises: [
        "Create unit tests for utility functions with various input scenarios",
        "Implement tests for class methods with different behaviors",
        "Write tests for error handling and edge cases",
        "Create parameterized tests for multiple input combinations",
        "Set up Jest configuration for a new project"
      ],
      codeExamples: [
        {
          title: "Basic Jest Unit Test",
          language: "javascript",
          code: `// mathUtils.js
function add(a, b) {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new Error('Both arguments must be numbers');
  }
  return a + b;
}

function multiply(a, b) {
  return a * b;
}

function isEven(num) {
  return num % 2 === 0;
}

module.exports = { add, multiply, isEven };`
        },
        {
          title: "Jest Test Suite",
          language: "javascript",
          code: `// mathUtils.test.js
const { add, multiply, isEven } = require('./mathUtils');

describe('Math Utilities', () => {
  describe('add function', () => {
    test('should add two positive numbers correctly', () => {
      // Arrange
      const a = 5;
      const b = 3;

      // Act
      const result = add(a, b);

      // Assert
      expect(result).toBe(8);
    });

    test('should add negative numbers correctly', () => {
      expect(add(-2, -3)).toBe(-5);
      expect(add(5, -3)).toBe(2);
    });

    test('should throw error for non-number inputs', () => {
      expect(() => add('5', 3)).toThrow('Both arguments must be numbers');
      expect(() => add(5, null)).toThrow('Both arguments must be numbers');
    });

    test('should handle decimal numbers', () => {
      expect(add(1.5, 2.3)).toBe(3.8);
    });
  });

  describe('multiply function', () => {
    test('should multiply two numbers correctly', () => {
      expect(multiply(4, 3)).toBe(12);
      expect(multiply(-2, 5)).toBe(-10);
      expect(multiply(0, 100)).toBe(0);
    });
  });

  describe('isEven function', () => {
    test.each([
      [2, true],
      [4, true],
      [0, true],
      [1, false],
      [3, false],
      [-2, true],
      [-1, false]
    ])('should return %s for %i', (num, expected) => {
      expect(isEven(num)).toBe(expected);
    });
  });
});`
        }
      ]
    },
    {
      title: "Integration Testing",
      content: "Integration testing verifies that different parts of your application work together correctly. Unlike unit tests that test isolated components, integration tests examine the interactions between components, modules, or services.\n\n**Testing Scope**: Integration tests can test component interactions within a single application, API endpoints with databases, or communication between different services in a microservices architecture.\n\n**Test Setup**: Integration tests often require more complex setup than unit tests. You may need to configure test databases, mock external services, or set up test fixtures with realistic data.\n\n**Database Testing**: When testing with databases, consider using in-memory databases for faster tests or database transactions that roll back after each test. Avoid testing against production databases.\n\n**API Testing**: Test API endpoints by making actual HTTP requests to your application. Verify response status codes, data structure, and error handling. Use test clients like Supertest for Express applications.\n\n**Best Practices**: Keep integration tests focused but broader than unit tests. Use realistic test data. Clean up test data after tests complete. Consider test execution time - integration tests typically run slower than unit tests.",
      keyTopics: [
        "Integration test vs unit test differences",
        "Database integration testing strategies",
        "API endpoint testing with Supertest",
        "Test data management and fixtures",
        "Mocking external service dependencies"
      ],
      practicalExercises: [
        "Create integration tests for API endpoints with database operations",
        "Test component interactions in a React application",
        "Implement database transaction rollbacks in tests",
        "Create test fixtures for complex data scenarios",
        "Test error handling across component boundaries"
      ],
      codeExamples: [
        {
          title: "API Integration Test with Supertest",
          language: "javascript",
          code: `// userRoutes.test.js
const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const User = require('../models/User');
const userRoutes = require('../routes/users');

const app = express();
app.use(express.json());
app.use('/api/users', userRoutes);

let mongoServer;

beforeAll(async () => {
  // Start in-memory MongoDB server
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

beforeEach(async () => {
  // Clear database before each test
  await User.deleteMany({});
});

describe('User API Integration Tests', () => {
  describe('POST /api/users', () => {
    test('should create a new user successfully', async () => {
      const userData = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123'
      };

      const response = await request(app)
        .post('/api/users')
        .send(userData)
        .expect(201);

      expect(response.body).toHaveProperty('_id');
      expect(response.body.name).toBe(userData.name);
      expect(response.body.email).toBe(userData.email);
      expect(response.body).not.toHaveProperty('password'); // Password should be hashed
    });

    test('should return 400 for invalid email', async () => {
      const userData = {
        name: 'John Doe',
        email: 'invalid-email',
        password: 'password123'
      };

      const response = await request(app)
        .post('/api/users')
        .send(userData)
        .expect(400);

      expect(response.body).toHaveProperty('error');
    });

    test('should return 409 for duplicate email', async () => {
      // Create first user
      await User.create({
        name: 'John Doe',
        email: 'john@example.com',
        password: 'hashedpassword'
      });

      // Try to create user with same email
      const userData = {
        name: 'Jane Doe',
        email: 'john@example.com',
        password: 'password123'
      };

      const response = await request(app)
        .post('/api/users')
        .send(userData)
        .expect(409);

      expect(response.body.error).toContain('email already exists');
    });
  });

  describe('GET /api/users/:id', () => {
    test('should return user by ID', async () => {
      const user = await User.create({
        name: 'John Doe',
        email: 'john@example.com',
        password: 'hashedpassword'
      });

      const response = await request(app)
        .get(\`/api/users/\${user._id}\`)
        .expect(200);

      expect(response.body.name).toBe(user.name);
      expect(response.body.email).toBe(user.email);
    });

    test('should return 404 for non-existent user', async () => {
      const fakeId = new mongoose.Types.ObjectId();

      const response = await request(app)
        .get(\`/api/users/\${fakeId}\`)
        .expect(404);

      expect(response.body.error).toBe('User not found');
    });
  });
});`
        },
        {
          title: "Database Integration Test Setup",
          language: "javascript",
          code: `// testHelpers.js
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

class TestDatabase {
  constructor() {
    this.mongoServer = null;
    this.connection = null;
  }

  async connect() {
    this.mongoServer = await MongoMemoryServer.create();
    const mongoUri = this.mongoServer.getUri();

    this.connection = await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    return this.connection;
  }

  async disconnect() {
    if (this.connection) {
      await this.connection.disconnect();
    }
    if (this.mongoServer) {
      await this.mongoServer.stop();
    }
  }

  async clearDatabase() {
    if (this.connection) {
      const collections = this.connection.collections;
      for (const key in collections) {
        await collections[key].deleteMany({});
      }
    }
  }

  async createTestData(model, data) {
    return await model.create(data);
  }

  async createMultipleTestData(model, dataArray) {
    return await model.insertMany(dataArray);
  }
}

// Test data factories
class TestDataFactory {
  static createUser(overrides = {}) {
    return {
      name: 'Test User',
      email: \`test\${Date.now()}@example.com\`,
      password: 'hashedpassword123',
      role: 'user',
      ...overrides
    };
  }

  static createPost(userId, overrides = {}) {
    return {
      title: 'Test Post',
      content: 'This is a test post content',
      author: userId,
      tags: ['test', 'sample'],
      published: true,
      ...overrides
    };
  }

  static createComment(postId, userId, overrides = {}) {
    return {
      content: 'This is a test comment',
      post: postId,
      author: userId,
      ...overrides
    };
  }
}

module.exports = { TestDatabase, TestDataFactory };`
        }
      ]
    },
    {
      title: "End-to-End Testing with Cypress",
      content: "End-to-end (E2E) testing verifies that your entire application works correctly from the user's perspective. Cypress is a modern E2E testing framework that runs in the browser and provides a complete testing experience for web applications.\n\n**Cypress Advantages**: Unlike Selenium-based tools, Cypress runs directly in the browser with your application, providing faster test execution and more reliable results. It includes automatic waiting, real-time reloading, and excellent debugging capabilities.\n\n**Test Structure**: E2E tests simulate real user interactions like clicking buttons, filling forms, and navigating between pages. Tests should cover complete user workflows and critical application paths.\n\n**Best Practices**: Write tests that are resilient to UI changes. Use data-testid attributes for reliable element selection. Avoid testing third-party services directly. Keep tests focused on user-facing functionality.\n\n**Test Organization**: Group related tests in describe blocks. Use beforeEach hooks for common setup like user login. Create custom commands for reusable actions like authentication.\n\n**Debugging**: Cypress provides excellent debugging tools including DOM snapshots, console logs, and time-travel debugging. Use cy.pause() for interactive debugging during test development.",
      keyTopics: [
        "Cypress test runner and architecture",
        "Writing reliable E2E test scenarios",
        "Page object pattern for test organization",
        "Custom Cypress commands",
        "Debugging and troubleshooting E2E tests"
      ],
      practicalExercises: [
        "Create E2E tests for user registration and login flow",
        "Implement tests for complex user workflows",
        "Build custom Cypress commands for common actions",
        "Test form validation and error handling",
        "Create tests for responsive design across different viewports"
      ],
      codeExamples: [
        {
          title: "Cypress E2E Test Suite",
          language: "javascript",
          code: `// cypress/integration/user-registration.spec.js
describe('User Registration and Authentication', () => {
  beforeEach(() => {
    // Visit the application
    cy.visit('/');

    // Clear any existing session
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it('should successfully register a new user', () => {
    // Navigate to registration page
    cy.contains('Sign Up').click();

    // Fill out registration form
    cy.get('[data-testid="name-input"]').type('John Doe');
    cy.get('[data-testid="email-input"]').type(\`john.doe.\${Date.now()}@example.com\`);
    cy.get('[data-testid="password-input"]').type('password123');
    cy.get('[data-testid="confirm-password-input"]').type('password123');

    // Submit the form
    cy.get('[data-testid="register-button"]').click();

    // Verify successful registration
    cy.url().should('include', '/dashboard');
    cy.contains('Welcome, John Doe').should('be.visible');

    // Verify user is logged in
    cy.get('[data-testid="user-menu"]').should('contain', 'John Doe');
  });

  it('should show validation errors for invalid registration data', () => {
    cy.contains('Sign Up').click();

    // Try to submit empty form
    cy.get('[data-testid="register-button"]').click();

    // Check for validation errors
    cy.contains('Name is required').should('be.visible');
    cy.contains('Email is required').should('be.visible');
    cy.contains('Password is required').should('be.visible');

    // Try invalid email
    cy.get('[data-testid="email-input"]').type('invalid-email');
    cy.get('[data-testid="name-input"]').type('John Doe');
    cy.get('[data-testid="password-input"]').type('password123');
    cy.get('[data-testid="register-button"]').click();

    cy.contains('Please enter a valid email').should('be.visible');
  });

  it('should prevent registration with existing email', () => {
    // First, register a user
    cy.request('POST', '/api/auth/register', {
      name: 'Existing User',
      email: 'existing@example.com',
      password: 'password123'
    });

    // Now try to register with the same email
    cy.contains('Sign Up').click();
    cy.get('[data-testid="name-input"]').type('Another User');
    cy.get('[data-testid="email-input"]').type('existing@example.com');
    cy.get('[data-testid="password-input"]').type('password123');
    cy.get('[data-testid="register-button"]').click();

    // Should show error message
    cy.contains('Email already exists').should('be.visible');
  });

  it('should successfully log in existing user', () => {
    // Create user via API
    cy.request('POST', '/api/auth/register', {
      name: 'Login Test User',
      email: 'login.test@example.com',
      password: 'password123'
    });

    // Navigate to login page
    cy.contains('Sign In').click();

    // Fill login form
    cy.get('[data-testid="email-input"]').type('login.test@example.com');
    cy.get('[data-testid="password-input"]').type('password123');
    cy.get('[data-testid="login-button"]').click();

    // Verify successful login
    cy.url().should('include', '/dashboard');
    cy.contains('Welcome, Login Test User').should('be.visible');
  });

  it('should handle invalid login credentials', () => {
    cy.contains('Sign In').click();

    // Try wrong password
    cy.get('[data-testid="email-input"]').type('login.test@example.com');
    cy.get('[data-testid="password-input"]').type('wrongpassword');
    cy.get('[data-testid="login-button"]').click();

    cy.contains('Invalid email or password').should('be.visible');

    // Try non-existent email
    cy.get('[data-testid="email-input"]').clear().type('nonexistent@example.com');
    cy.get('[data-testid="password-input"]').clear().type('password123');
    cy.get('[data-testid="login-button"]').click();

    cy.contains('Invalid email or password').should('be.visible');
  });
});`
        },
        {
          title: "Cypress Custom Commands",
          language: "javascript",
          code: `// cypress/support/commands.js
Cypress.Commands.add('login', (email, password) => {
  cy.session([email, password], () => {
    cy.visit('/login');
    cy.get('[data-testid="email-input"]').type(email);
    cy.get('[data-testid="password-input"]').type(password);
    cy.get('[data-testid="login-button"]').click();
    cy.url().should('not.include', '/login');
  });
});

Cypress.Commands.add('register', (userData) => {
  cy.visit('/register');
  cy.get('[data-testid="name-input"]').type(userData.name);
  cy.get('[data-testid="email-input"]').type(userData.email);
  cy.get('[data-testid="password-input"]').type(userData.password);
  cy.get('[data-testid="confirm-password-input"]').type(userData.password);
  cy.get('[data-testid="register-button"]').click();
});

Cypress.Commands.add('createPost', (postData) => {
  cy.visit('/posts/new');
  cy.get('[data-testid="title-input"]').type(postData.title);
  cy.get('[data-testid="content-input"]').type(postData.content);

  if (postData.tags) {
    postData.tags.forEach(tag => {
      cy.get('[data-testid="tags-input"]').type(tag).type('{enter}');
    });
  }

  cy.get('[data-testid="publish-button"]').click();
  cy.contains('Post created successfully').should('be.visible');
});

Cypress.Commands.add('logout', () => {
  cy.get('[data-testid="user-menu"]').click();
  cy.contains('Logout').click();
  cy.url().should('include', '/login');
});

// cypress.config.js
const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    supportFile: 'cypress/support/e2e.js',
    specPattern: 'cypress/e2e/**/*.spec.js',
    viewportWidth: 1280,
    viewportHeight: 720,
    video: false,
    screenshotOnRunFailure: true,
    defaultCommandTimeout: 10000,
    requestTimeout: 15000,
    responseTimeout: 15000,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});`
        }
      ]
    },
    {
      title: "Test-Driven Development (TDD)",
      content: "Test-Driven Development (TDD) is a software development approach where you write tests before writing the actual code. This methodology ensures that your code is testable, follows good design principles, and meets the specified requirements.\n\n**TDD Cycle**: The TDD process follows a simple cycle: Red-Green-Refactor. First, write a failing test (Red). Then write the minimal code to make the test pass (Green). Finally, refactor the code while keeping tests passing.\n\n**Benefits**: TDD leads to better code design, higher test coverage, and more maintainable code. It helps catch bugs early and serves as living documentation of your code's behavior.\n\n**TDD Principles**: Write tests for the behavior you want, not the implementation. Keep tests simple and focused. Run tests frequently. Use the tests to guide your design decisions.\n\n**Common Patterns**: Start with the simplest case and build up complexity. Use mocks and stubs to isolate dependencies. Write tests for edge cases and error conditions.\n\n**Challenges**: TDD requires discipline and can feel slower initially. However, it pays off in the long run with more reliable and maintainable code.",
      keyTopics: [
        "Red-Green-Refactor TDD cycle",
        "Writing tests before implementation",
        "Incremental development approach",
        "TDD best practices and principles",
        "Balancing TDD with development speed"
      ],
      practicalExercises: [
        "Implement a feature using TDD from start to finish",
        "Refactor existing code using TDD principles",
        "Create tests for complex business logic before implementation",
        "Practice the TDD cycle with different types of functions",
        "Apply TDD to fix bugs and add new features"
      ],
      codeExamples: [
        {
          title: "TDD Example: String Calculator",
          language: "javascript",
          code: `// stringCalculator.js - Implementation following TDD

class StringCalculator {
  add(numbers) {
    if (!numbers) return 0;

    // Handle custom delimiters
    let delimiter = ',';
    if (numbers.startsWith('//')) {
      const delimiterLine = numbers.split('\\n')[0];
      delimiter = delimiterLine.substring(2);
      numbers = numbers.substring(delimiterLine.length + 1);
    }

    // Replace newlines with delimiter
    numbers = numbers.replace(/\\n/g, delimiter);

    // Split by delimiter and convert to numbers
    const numberArray = numbers.split(delimiter).map(num => {
      const parsed = parseInt(num, 10);
      if (isNaN(parsed)) throw new Error('Invalid number format');
      return parsed;
    });

    // Check for negative numbers
    const negatives = numberArray.filter(num => num < 0);
    if (negatives.length > 0) {
      throw new Error(\`Negative numbers not allowed: \${negatives.join(', ')}\`);
    }

    // Sum all numbers, ignoring numbers > 1000
    return numberArray
      .filter(num => num <= 1000)
      .reduce((sum, num) => sum + num, 0);
  }
}

module.exports = StringCalculator;`
        },
        {
          title: "TDD Test Suite for String Calculator",
          language: "javascript",
          code: `// stringCalculator.test.js - Tests written before implementation

const StringCalculator = require('./stringCalculator');

describe('String Calculator', () => {
  let calculator;

  beforeEach(() => {
    calculator = new StringCalculator();
  });

  describe('add method', () => {
    test('should return 0 for empty string', () => {
      expect(calculator.add('')).toBe(0);
    });

    test('should return the number itself for single number', () => {
      expect(calculator.add('1')).toBe(1);
      expect(calculator.add('5')).toBe(5);
    });

    test('should return sum of two numbers separated by comma', () => {
      expect(calculator.add('1,2')).toBe(3);
      expect(calculator.add('10,20')).toBe(30);
    });

    test('should handle multiple numbers', () => {
      expect(calculator.add('1,2,3')).toBe(6);
      expect(calculator.add('1,2,3,4,5')).toBe(15);
    });

    test('should handle newlines as delimiters', () => {
      expect(calculator.add('1\\n2,3')).toBe(6);
      expect(calculator.add('1\\n2\\n3')).toBe(6);
    });

    test('should support custom delimiters', () => {
      expect(calculator.add('//;\\n1;2')).toBe(3);
      expect(calculator.add('//|\\n1|2|3')).toBe(6);
    });

    test('should throw error for negative numbers', () => {
      expect(() => calculator.add('1,-2')).toThrow('Negative numbers not allowed: -2');
      expect(() => calculator.add('1,-2,-3')).toThrow('Negative numbers not allowed: -2, -3');
    });

    test('should ignore numbers greater than 1000', () => {
      expect(calculator.add('2,1001')).toBe(2);
      expect(calculator.add('1000,1001,2')).toBe(1002);
    });

    test('should handle custom delimiters of any length', () => {
      expect(calculator.add('//[***]\\n1***2***3')).toBe(6);
    });

    test('should throw error for invalid number format', () => {
      expect(() => calculator.add('1,abc')).toThrow('Invalid number format');
    });
  });
});`
        }
      ]
    },
    {
      title: "Mocking and Code Coverage",
      content: "Mocking is essential for isolating code under test and creating reliable, fast tests. Code coverage helps ensure your tests adequately exercise your codebase.\n\n**Mocking Types**: Unit tests often use mocks to simulate dependencies. Jest provides powerful mocking capabilities including function mocks, module mocks, and manual mocks.\n\n**When to Mock**: Mock external dependencies, database calls, API requests, and time-sensitive operations. Don't mock the code you're actually testing.\n\n**Code Coverage**: Coverage reports show which parts of your code are tested. Aim for high coverage but focus on meaningful tests rather than artificial coverage.\n\n**Coverage Types**: Line coverage, branch coverage, function coverage, and statement coverage. Each provides different insights into your test effectiveness.\n\n**Best Practices**: Use descriptive mock names. Reset mocks between tests. Test both success and error scenarios. Don't rely solely on coverage metrics - focus on testing behavior.\n\n**Advanced Mocking**: Jest supports manual mocks, spy functions, and partial mocking. Use these for complex scenarios while keeping tests readable.",
      keyTopics: [
        "Jest mocking fundamentals and types",
        "Manual mocks vs automatic mocks",
        "Spy functions and their usage",
        "Code coverage configuration and interpretation",
        "Testing with mocked dependencies"
      ],
      practicalExercises: [
        "Create manual mocks for external API calls",
        "Implement spy functions to verify function calls",
        "Configure Jest code coverage reporting",
        "Test error scenarios with mocked failures",
        "Create reusable mock factories"
      ],
      codeExamples: [
        {
          title: "Mocking External Dependencies",
          language: "javascript",
          code: `// userService.js
const axios = require('axios');
const User = require('../models/User');

class UserService {
  constructor() {
    this.apiBaseUrl = process.env.API_BASE_URL;
  }

  async getUserById(id) {
    try {
      const response = await axios.get(\`\${this.apiBaseUrl}/users/\${id}\`);
      return response.data;
    } catch (error) {
      throw new Error(\`Failed to fetch user: \${error.message}\`);
    }
  }

  async createUser(userData) {
    try {
      const response = await axios.post(\`\${this.apiBaseUrl}/users\`, userData);
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 409) {
        throw new Error('User already exists');
      }
      throw new Error(\`Failed to create user: \${error.message}\`);
    }
  }

  async updateUserProfile(id, profileData) {
    const user = await User.findById(id);
    if (!user) {
      throw new Error('User not found');
    }

    Object.assign(user, profileData);
    await user.save();
    return user;
  }
}

module.exports = UserService;`
        },
        {
          title: "Mocking Test Examples",
          language: "javascript",
          code: `// userService.test.js
const axios = require('axios');
const User = require('../models/User');
const UserService = require('./userService');

// Mock axios
jest.mock('axios');
const mockedAxios = axios;

// Mock User model
jest.mock('../models/User');
const mockedUser = User;

describe('UserService', () => {
  let userService;

  beforeEach(() => {
    userService = new UserService();
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  describe('getUserById', () => {
    test('should return user data on successful API call', async () => {
      // Arrange
      const mockUserData = { id: 1, name: 'John Doe', email: 'john@example.com' };
      mockedAxios.get.mockResolvedValue({ data: mockUserData });

      // Act
      const result = await userService.getUserById(1);

      // Assert
      expect(mockedAxios.get).toHaveBeenCalledWith('undefined/users/1');
      expect(result).toEqual(mockUserData);
    });

    test('should throw error on API failure', async () => {
      // Arrange
      const errorMessage = 'Network Error';
      mockedAxios.get.mockRejectedValue(new Error(errorMessage));

      // Act & Assert
      await expect(userService.getUserById(1)).rejects.toThrow(\`Failed to fetch user: \${errorMessage}\`);
    });
  });

  describe('createUser', () => {
    test('should create user successfully', async () => {
      // Arrange
      const userData = { name: 'Jane Doe', email: 'jane@example.com' };
      const createdUser = { id: 2, ...userData };
      mockedAxios.post.mockResolvedValue({ data: createdUser });

      // Act
      const result = await userService.createUser(userData);

      // Assert
      expect(mockedAxios.post).toHaveBeenCalledWith('undefined/users', userData);
      expect(result).toEqual(createdUser);
    });

    test('should handle duplicate user error', async () => {
      // Arrange
      const userData = { name: 'Jane Doe', email: 'jane@example.com' };
      const error = { response: { status: 409 } };
      mockedAxios.post.mockRejectedValue(error);

      // Act & Assert
      await expect(userService.createUser(userData)).rejects.toThrow('User already exists');
    });
  });

  describe('updateUserProfile', () => {
    test('should update user profile successfully', async () => {
      // Arrange
      const userId = 'user123';
      const profileData = { name: 'Updated Name' };
      const mockUser = {
        _id: userId,
        name: 'Old Name',
        save: jest.fn().mockResolvedValue()
      };

      mockedUser.findById.mockResolvedValue(mockUser);

      // Act
      const result = await userService.updateUserProfile(userId, profileData);

      // Assert
      expect(mockedUser.findById).toHaveBeenCalledWith(userId);
      expect(mockUser.save).toHaveBeenCalled();
      expect(result.name).toBe('Updated Name');
    });

    test('should throw error for non-existent user', async () => {
      // Arrange
      mockedUser.findById.mockResolvedValue(null);

      // Act & Assert
      await expect(userService.updateUserProfile('invalidId', {})).rejects.toThrow('User not found');
    });
  });
});`
        }
      ]
    }
  ],
  projects: [
    {
      title: "Complete Testing Suite for E-commerce API",
      description: "Build a comprehensive testing suite for an e-commerce REST API including unit tests, integration tests, and E2E tests",
      difficulty: "advanced",
      estimatedHours: 35,
      technologies: ["Node.js", "Jest", "Supertest", "Cypress", "MongoDB"],
      features: [
        "Unit tests for all utility functions and business logic",
        "Integration tests for API endpoints with database operations",
        "E2E tests for complete user workflows (registration, shopping cart, checkout)",
        "Mock implementations for external payment services",
        "Code coverage reporting with minimum 80% coverage",
        "CI/CD pipeline configuration with automated testing",
        "Performance testing for API endpoints",
        "Security testing for authentication and authorization"
      ]
    },
    {
      title: "TDD React Component Library",
      description: "Develop a React component library using Test-Driven Development principles",
      difficulty: "intermediate",
      estimatedHours: 25,
      technologies: ["React", "Jest", "React Testing Library", "TypeScript"],
      features: [
        "Button, Input, Modal, and Form components",
        "Complete test suite with 100% coverage",
        "TDD approach for all component development",
        "Accessibility testing with react-testing-library",
        "Component documentation with Storybook",
        "Custom hooks with comprehensive tests",
        "Integration tests for component combinations"
      ]
    },
    {
      title: "Automated Testing Framework",
      description: "Create a custom testing framework with utilities for web application testing",
      difficulty: "advanced",
      estimatedHours: 40,
      technologies: ["Node.js", "Puppeteer", "Jest", "Docker"],
      features: [
        "Custom test runner with parallel execution",
        "Visual regression testing capabilities",
        "API testing utilities with automatic retries",
        "Database seeding and cleanup utilities",
        "Cross-browser testing support",
        "Test reporting with detailed metrics",
        "Integration with popular CI/CD platforms",
        "Performance monitoring and alerting"
      ]
    }
  ],
  assessments: {
    quiz: [
      {
        question: "What is the primary purpose of unit testing?",
        options: [
          "To test the entire application from end to end",
          "To test individual functions and methods in isolation",
          "To test how different components interact with each other",
          "To test the application's performance under load"
        ],
        correctAnswer: 1,
        explanation: "Unit testing focuses on testing individual units of code (functions, methods, classes) in isolation to ensure they work correctly."
      },
      {
        question: "Which testing framework is commonly used for end-to-end testing of web applications?",
        options: [
          "Mocha",
          "Jasmine",
          "Cypress",
          "Chai"
        ],
        correctAnswer: 2,
        explanation: "Cypress is a modern end-to-end testing framework that runs directly in the browser and provides excellent debugging capabilities."
      },
      {
        question: "What does TDD stand for?",
        options: [
          "Test-Driven Design",
          "Test-Driven Development",
          "Test Data Definition",
          "Test Documentation Drive"
        ],
        correctAnswer: 1,
        explanation: "TDD stands for Test-Driven Development, a methodology where tests are written before the actual implementation code."
      },
      {
        question: "What is the main benefit of using mocks in testing?",
        options: [
          "To make tests run faster",
          "To isolate the code under test from external dependencies",
          "To reduce the amount of test code needed",
          "To automatically generate test data"
        ],
        correctAnswer: 1,
        explanation: "Mocks isolate the code under test by simulating external dependencies, making tests more reliable and focused."
      },
      {
        question: "What code coverage metric indicates that all possible execution paths have been tested?",
        options: [
          "Line coverage",
          "Function coverage",
          "Branch coverage",
          "Statement coverage"
        ],
        correctAnswer: 2,
        explanation: "Branch coverage measures whether all possible execution paths (branches) in conditional statements have been tested."
      }
    ],
    evaluation: [
      {
        scenario: "You are developing a financial application that handles sensitive user data and monetary transactions. The application needs to be thoroughly tested before deployment.",
        questions: [
          "What types of tests would you prioritize for this application and why?",
          "How would you ensure the testing covers security aspects?",
          "What strategies would you use to test the monetary transaction logic?"
        ]
      },
      {
        scenario: "Your team is working on a large-scale web application with multiple developers. The codebase is growing rapidly and you need to maintain code quality.",
        questions: [
          "How would you implement automated testing in the development workflow?",
          "What metrics would you track to ensure test effectiveness?",
          "How would you handle testing for features that depend on third-party services?"
        ]
      }
    ]
  },
  aiPrompts: [
    "How do I write effective unit tests with Jest?",
    "What's the difference between unit, integration, and E2E tests?",
    "How do I test React components with Jest?",
    "How do I mock external API calls in my tests?",
    "How do I set up Cypress for E2E testing?",
    "What's the best way to organize test files?",
    "How do I achieve good test coverage?",
    "How do I test asynchronous code with Jest?",
    "How do I test database operations in integration tests?",
    "How do I implement TDD in my development process?",
    "How do I debug failing tests effectively?",
    "How do I test error handling and edge cases?"
  ],
  resources: [
    {
      title: "Jest Documentation",
      type: "documentation",
      url: "https://jestjs.io/docs/getting-started",
      description: "Official Jest testing framework documentation with guides and API reference"
    },
    {
      title: "Cypress Documentation",
      type: "documentation",
      url: "https://docs.cypress.io",
      description: "Complete Cypress documentation for end-to-end testing"
    },
    {
      title: "Testing JavaScript Applications",
      type: "book",
      url: "https://www.manning.com/books/testing-javascript-applications",
      description: "Comprehensive guide to testing JavaScript applications"
    },
    {
      title: "Martin Fowler - TestPyramid",
      type: "article",
      url: "https://martinfowler.com/bliki/TestPyramid.html",
      description: "Classic article explaining the test pyramid concept"
    },
    {
      title: "Kent C. Dodds - Testing Trophy",
      type: "article",
      url: "https://kentcdodds.com/blog/the-testing-trophy-and-testing-classifications",
      description: "Modern approach to testing with the Testing Trophy model"
    }
  ],
  toolsRequired: [
    "Node.js (v14+)",
    "npm or yarn package manager",
    "Jest testing framework",
    "Supertest for API testing",
    "Cypress for E2E testing",
    "MongoDB Memory Server for testing",
    "React Testing Library (for React apps)",
    "Code coverage tools (Istanbul/NYC)",
    "CI/CD platforms (GitHub Actions, Jenkins)",
    "Test reporting tools"
  ],
  bestPractices: [
    "Write tests before implementing features (TDD approach)",
    "Keep tests focused on a single behavior or scenario",
    "Use descriptive test names that explain what is being tested",
    "Organize tests in a structure that mirrors your codebase",
    "Mock external dependencies to isolate code under test",
    "Use realistic test data that covers edge cases",
    "Run tests frequently during development",
    "Maintain high code coverage but focus on meaningful tests",
    "Test both happy path and error scenarios",
    "Use test doubles (mocks, stubs, spies) appropriately",
    "Keep tests fast and reliable",
    "Document test setup and teardown procedures",
    "Review and refactor tests regularly",
    "Use continuous integration to run tests automatically",
    "Test accessibility and cross-browser compatibility",
    "Include performance testing in your test suite",
    "Test security features and vulnerability handling",
    "Use version control for test code",
    "Collaborate with team members on testing standards",
    "Monitor test execution time and optimize slow tests",
    "Keep test code clean and maintainable"
  ],
  commonPitfalls: [
    "Writing tests after implementation instead of using TDD",
    "Testing implementation details instead of behavior",
    "Creating brittle tests that break with minor code changes",
    "Not mocking external dependencies properly",
    "Writing slow tests that delay development feedback",
    "Ignoring test failures or maintaining broken tests",
    "Testing too many things in a single test",
    "Using hardcoded test data that becomes outdated",
    "Not testing error conditions and edge cases",
    "Relying solely on code coverage metrics",
    "Writing tests that are tightly coupled to implementation",
    "Not maintaining test code quality",
    "Skipping tests during development pressure",
    "Not testing asynchronous code properly",
    "Creating circular dependencies in test setup",
    "Not cleaning up test data between tests",
    "Writing tests that require specific execution order",
    "Ignoring flaky tests instead of fixing them",
    "Not testing user interface interactions",
    "Over-mocking which hides integration issues",
    "Not testing cross-browser compatibility",
    "Writing tests that are hard to understand",
    "Not updating tests when refactoring code",
    "Running tests only locally, not in CI/CD",
    "Not testing performance and scalability"
  ],
  careerRelevance: [
    "Testing skills are essential for all software development roles",
    "TDD and automated testing are highly valued by employers",
    "Quality assurance and testing expertise increases job opportunities",
    "Testing knowledge is crucial for CI/CD and DevOps roles",
    "Modern development teams require comprehensive testing skills",
    "Testing expertise leads to better code quality and fewer bugs",
    "Automated testing skills are valuable for agile development",
    "Testing knowledge helps in code review and mentoring",
    "Performance testing skills are needed for scalable applications",
    "Security testing knowledge is essential for secure applications",
    "Testing frameworks expertise opens specialized testing roles",
    "TDD skills demonstrate professional development practices",
    "Testing knowledge is valuable for technical leadership roles",
    "Automated testing enables faster development cycles",
    "Testing expertise helps in building reliable user experiences",
    "Quality-focused development is a competitive advantage",
    "Testing skills are transferable across programming languages",
    "Comprehensive testing knowledge leads to higher salaries",
    "Testing expertise is crucial for mission-critical applications",
    "Modern software development requires testing as a core competency"
  ]
};