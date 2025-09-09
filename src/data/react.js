const reactContent = {
  id: "react",
  tier: 3,
  name: "React",
  description: "React is a popular JavaScript library for building user interfaces, particularly web applications. It enables developers to create reusable UI components that efficiently update and render when data changes, making it easier to build complex, interactive user interfaces with a component-based architecture.",
  difficulty: "intermediate",
  estimatedHours: 20,
  prerequisites: ["javascript", "html5", "css3"],
  learningObjectives: [
    "Understand React's component-based architecture and how to create reusable UI components",
    "Master React Hooks including useState, useEffect, useContext, and custom hooks",
    "Implement state management solutions using Context API and external libraries",
    "Optimize React application performance using memo, useMemo, and useCallback",
    "Write comprehensive tests for React components using testing libraries",
    "Apply advanced React patterns like Higher-Order Components and render props",
    "Handle form management and validation in React applications",
    "Implement proper error boundaries and error handling strategies",
    "Understand React's reconciliation process and virtual DOM",
    "Build responsive and accessible React applications",
    "Integrate React with external APIs and manage asynchronous operations",
    "Implement routing in React applications using React Router"
  ],
  sections: [
    {
      id: "react-fundamentals",
      title: "React Fundamentals and Component Architecture",
      content: "React is a JavaScript library for building user interfaces that revolutionized web development by introducing a component-based architecture. At its core, React allows you to build encapsulated components that manage their own state and compose them to create complex UIs.\n\n**What Makes React Special**:\n- **Component-Based**: Break down UI into reusable, independent pieces\n- **Declarative**: Describe what you want, not how to achieve it\n- **Virtual DOM**: Efficiently updates only what changed\n- **Unidirectional Data Flow**: Predictable state management\n- **JSX**: Write HTML-like syntax in JavaScript\n\n**Core Concepts**:\n- **Components**: The building blocks of React applications\n- **Props**: How data flows from parent to child components\n- **State**: Local data that can change over time\n- **Lifecycle**: Methods that run at different stages of a component's life\n- **JSX**: Syntax extension for writing React elements\n\n**Component Types**:\n- **Functional Components**: Simple functions that return JSX\n- **Class Components**: ES6 classes with lifecycle methods\n- **Higher-Order Components**: Functions that enhance other components\n\n**Best Practices**:\n- Keep components small and focused on a single responsibility\n- Use meaningful names that describe what the component does\n- Prefer functional components with hooks over class components\n- Extract reusable logic into custom hooks\n- Use prop types or TypeScript for type safety",
      keyTopics: [
        "Component-based architecture",
        "JSX syntax and benefits",
        "Props vs State",
        "Functional vs Class components",
        "React's virtual DOM"
      ],
      practicalExercises: [
        "Create a simple functional component that displays user information",
        "Build a class component with state and lifecycle methods",
        "Pass props between parent and child components",
        "Convert a class component to a functional component with hooks",
        "Create a reusable Button component with different variants"
      ],
      codeExamples: [
        {
          title: "Basic Functional Component",
          code: `import React from 'react';

function Welcome(props) {
  return <h1>Hello, {props.name}!</h1>;
}

// Usage
function App() {
  return (
    <div>
      <Welcome name="Alice" />
      <Welcome name="Bob" />
      <Welcome name="Charlie" />
    </div>
  );
}

export default App;`
        },
        {
          title: "Class Component with State",
          code: `import React, { Component } from 'react';

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  increment = () => {
    this.setState({ count: this.state.count + 1 });
  }

  decrement = () => {
    this.setState({ count: this.state.count - 1 });
  }

  render() {
    return (
      <div>
        <h2>Count: {this.state.count}</h2>
        <button onClick={this.increment}>+</button>
        <button onClick={this.decrement}>-</button>
      </div>
    );
  }
}

export default Counter;`
        },
        {
          title: "Props and Component Composition",
          code: `import React from 'react';

// Reusable Card component
function Card({ title, children, className = '' }) {
  return (
    <div className={\`card \${className}\`}>
      {title && <h3 className="card-title">{title}</h3>}
      <div className="card-content">
        {children}
      </div>
    </div>
  );
}

// User Profile component using composition
function UserProfile({ user }) {
  return (
    <Card title="User Profile" className="user-profile">
      <div className="user-avatar">
        <img src={user.avatar} alt={user.name} />
      </div>
      <div className="user-info">
        <h4>{user.name}</h4>
        <p>{user.email}</p>
        <p>{user.bio}</p>
      </div>
      <div className="user-stats">
        <span>Posts: {user.posts}</span>
        <span>Followers: {user.followers}</span>
      </div>
    </Card>
  );
}

// Usage
const user = {
  name: "John Doe",
  email: "john@example.com",
  bio: "Full-stack developer passionate about React",
  avatar: "/avatar.jpg",
  posts: 42,
  followers: 1234
};

function App() {
  return <UserProfile user={user} />;
}`
        }
      ]
    },
    {
      id: "react-hooks",
      title: "React Hooks: State and Lifecycle Management",
      content: "React Hooks revolutionized how we write React components by allowing us to use state and lifecycle features in functional components. Hooks are functions that let you 'hook into' React state and lifecycle features from function components.\n\n**Why Hooks Matter**:\n- **No More Classes**: Write components as functions\n- **Reusable Logic**: Extract stateful logic into custom hooks\n- **Better Composition**: Combine multiple hooks in creative ways\n- **Backward Compatible**: Don't break existing code\n- **Easier Testing**: Test hooks independently\n\n**Essential Hooks**:\n- **useState**: Add state to functional components\n- **useEffect**: Handle side effects and lifecycle events\n- **useContext**: Consume context values\n- **useReducer**: Manage complex state logic\n- **useCallback**: Memoize functions\n- **useMemo**: Memoize expensive calculations\n- **useRef**: Access DOM elements directly\n\n**Rules of Hooks**:\n- Only call hooks at the top level (not inside loops, conditions, or nested functions)\n- Only call hooks from React function components or custom hooks\n- Custom hooks must start with 'use' prefix\n\n**Common Patterns**:\n- **Data Fetching**: useEffect for API calls\n- **Form Handling**: useState for form state\n- **Event Handling**: useCallback for event handlers\n- **Performance**: useMemo for expensive operations\n- **Cleanup**: Return functions from useEffect for cleanup\n\n**Custom Hooks**:\n- Extract reusable logic from components\n- Share logic between different components\n- Test logic independently\n- Follow naming convention: useSomething",
      keyTopics: [
        "useState for state management",
        "useEffect for side effects",
        "useContext for context consumption",
        "Custom hooks creation and usage",
        "Rules of hooks"
      ],
      practicalExercises: [
        "Implement a counter component using useState",
        "Create a data fetching hook with useEffect",
        "Build a form with controlled inputs using useState",
        "Create a custom hook for localStorage management",
        "Implement a timer component with useEffect cleanup"
      ],
      codeExamples: [
        {
          title: "useState Hook - Basic State Management",
          code: `import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);

  const increment = () => setCount(count + step);
  const decrement = () => setCount(count - step);
  const reset = () => setCount(0);

  return (
    <div>
      <h2>Counter: {count}</h2>
      <div>
        <label>
          Step:
          <input
            type="number"
            value={step}
            onChange={(e) => setStep(Number(e.target.value))}
            min="1"
            max="10"
          />
        </label>
      </div>
      <div>
        <button onClick={decrement}>-</button>
        <button onClick={reset}>Reset</button>
        <button onClick={increment}>+</button>
      </div>
    </div>
  );
}

export default Counter;`
        },
        {
          title: "useEffect Hook - Side Effects and Lifecycle",
          code: `import React, { useState, useEffect } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Component did mount and userId changed
    const fetchUser = async () => {
      try {
        setLoading(true);
        const response = await fetch(\`/api/users/\${userId}\`);
        if (!response.ok) {
          throw new Error('Failed to fetch user');
        }
        const userData = await response.json();
        setUser(userData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchUser();
    }
  }, [userId]); // Dependency array - re-run when userId changes

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!user) return <div>No user found</div>;

  return (
    <div>
      <h2>{user.name}</h2>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
    </div>
  );
}

export default UserProfile;`
        },
        {
          title: "Custom Hook - Data Fetching",
          code: `import { useState, useEffect } from 'react';

// Custom hook for data fetching
function useFetch(url, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error(\`HTTP error! status: \${response.status}\`);
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (url) {
      fetchData();
    }
  }, [url, JSON.stringify(options)]);

  return { data, loading, error };
}

// Usage in component
function UserList() {
  const { data: users, loading, error } = useFetch('/api/users');

  if (loading) return <div>Loading users...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Users</h2>
      <ul>
        {users?.map(user => (
          <li key={user.id}>
            {user.name} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;`
        },
        {
          title: "useContext and useReducer - Advanced State Management",
          code: `import React, { useContext, useReducer, createContext } from 'react';

// Context for theme
const ThemeContext = createContext();

// Reducer for complex state
const todoReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, {
        id: Date.now(),
        text: action.payload,
        completed: false
      }];
    case 'TOGGLE_TODO':
      return state.map(todo =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo
      );
    case 'DELETE_TODO':
      return state.filter(todo => todo.id !== action.payload);
    default:
      return state;
  }
};

// Theme Provider Component
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Todo App with useReducer
function TodoApp() {
  const [todos, dispatch] = useReducer(todoReducer, []);
  const [inputValue, setInputValue] = useState('');
  const { theme, toggleTheme } = useContext(ThemeContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      dispatch({ type: 'ADD_TODO', payload: inputValue });
      setInputValue('');
    }
  };

  return (
    <div className={\`app \${theme}\`}>
      <button onClick={toggleTheme}>
        Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
      </button>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add a todo..."
        />
        <button type="submit">Add</button>
      </form>

      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <span style={{
              textDecoration: todo.completed ? 'line-through' : 'none'
            }}>
              {todo.text}
            </span>
            <button onClick={() => dispatch({
              type: 'TOGGLE_TODO',
              payload: todo.id
            })}>
              {todo.completed ? 'Undo' : 'Complete'}
            </button>
            <button onClick={() => dispatch({
              type: 'DELETE_TODO',
              payload: todo.id
            })}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

// App component
function App() {
  return (
    <ThemeProvider>
      <TodoApp />
    </ThemeProvider>
  );
}

export default App;`
        }
      ]
    },
    {
      id: "react-state-management",
      title: "Advanced State Management and Context API",
      content: "As React applications grow, managing state becomes increasingly complex. React provides several tools and patterns for effective state management, from the built-in Context API to external libraries like Redux and Zustand.\n\n**State Management Challenges**:\n- **Prop Drilling**: Passing props through multiple component layers\n- **Complex State Logic**: Managing interrelated state variables\n- **Performance Issues**: Unnecessary re-renders\n- **Data Persistence**: Maintaining state across sessions\n- **Server State**: Managing data from APIs\n\n**Context API**:\n- **createContext**: Creates a context object\n- **Provider**: Supplies context value to component tree\n- **useContext**: Consumes context value in components\n- **Best for**: Theme, user preferences, global app state\n\n**State Management Libraries**:\n- **Redux**: Predictable state container with actions and reducers\n- **Zustand**: Lightweight state management with hooks\n- **Recoil**: State management with atoms and selectors\n- **Jotai**: Primitive and flexible state management\n\n**Server State Management**:\n- **React Query/TanStack Query**: Powerful data synchronization\n- **SWR**: React hooks for data fetching\n- **Apollo Client**: GraphQL state management\n\n**Performance Optimization**:\n- **Memoization**: Prevent unnecessary re-renders\n- **State Colocation**: Keep state close to where it's used\n- **Lazy Loading**: Load state only when needed\n- **State Normalization**: Efficient data structures\n\n**Best Practices**:\n- Choose the right tool for the job\n- Keep state as local as possible\n- Use selectors for computed values\n- Implement proper error handling\n- Test state management logic thoroughly",
      keyTopics: [
        "Context API implementation",
        "Redux vs Context API",
        "Server state management",
        "State persistence strategies",
        "Performance optimization techniques"
      ],
      practicalExercises: [
        "Implement theme switching with Context API",
        "Create a shopping cart with useReducer",
        "Build a user authentication context",
        "Implement data fetching with React Query",
        "Create a global notification system"
      ],
      codeExamples: [
        {
          title: "Context API - Theme Management",
          code: `import React, { createContext, useContext, useState, useEffect } from 'react';

// Create theme context
const ThemeContext = createContext();

// Theme provider component
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    // Get initial theme from localStorage or system preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) return savedTheme;

    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  });

  // Save theme to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  const value = {
    theme,
    setTheme,
    toggleTheme,
    isDark: theme === 'dark',
    isLight: theme === 'light'
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook to use theme
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

// Usage in components
function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label={\`Switch to \${theme === 'light' ? 'dark' : 'light'} mode\`}
    >
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
}

function ThemedCard({ children }) {
  const { theme } = useTheme();

  return (
    <div className={\`card card--\${theme}\`}>
      {children}
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <div className="app">
        <header>
          <h1>My App</h1>
          <ThemeToggle />
        </header>
        <main>
          <ThemedCard>
            <h2>Welcome!</h2>
            <p>This card uses the current theme.</p>
          </ThemedCard>
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;`
        },
        {
          title: "Redux Store with Actions and Reducers",
          code: `import { createStore, combineReducers } from 'redux';

// Action types
const ADD_TODO = 'ADD_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO';
const DELETE_TODO = 'DELETE_TODO';
const SET_FILTER = 'SET_FILTER';

// Action creators
export const addTodo = (text) => ({
  type: ADD_TODO,
  payload: { text, id: Date.now() }
});

export const toggleTodo = (id) => ({
  type: TOGGLE_TODO,
  payload: { id }
});

export const deleteTodo = (id) => ({
  type: DELETE_TODO,
  payload: { id }
});

export const setFilter = (filter) => ({
  type: SET_FILTER,
  payload: { filter }
});

// Reducers
const todosReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        {
          id: action.payload.id,
          text: action.payload.text,
          completed: false
        }
      ];
    case TOGGLE_TODO:
      return state.map(todo =>
        todo.id === action.payload.id
          ? { ...todo, completed: !todo.completed }
          : todo
      );
    case DELETE_TODO:
      return state.filter(todo => todo.id !== action.payload.id);
    default:
      return state;
  }
};

const filterReducer = (state = 'ALL', action) => {
  switch (action.type) {
    case SET_FILTER:
      return action.payload.filter;
    default:
      return state;
  }
};

// Root reducer
const rootReducer = combineReducers({
  todos: todosReducer,
  filter: filterReducer
});

// Create store
const store = createStore(rootReducer);

// Selectors
export const getVisibleTodos = (state) => {
  const { todos, filter } = state;
  switch (filter) {
    case 'COMPLETED':
      return todos.filter(todo => todo.completed);
    case 'ACTIVE':
      return todos.filter(todo => !todo.completed);
    default:
      return todos;
  }
};

export default store;`
        },
        {
          title: "React Query for Server State Management",
          code: `import React from 'react';
import { QueryClient, QueryClientProvider, useQuery, useMutation, useQueryClient } from 'react-query';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 10, // 10 minutes
      retry: 3,
      refetchOnWindowFocus: false
    }
  }
});

// API functions
const fetchPosts = async () => {
  const response = await fetch('/api/posts');
  if (!response.ok) {
    throw new Error('Failed to fetch posts');
  }
  return response.json();
};

const createPost = async (newPost) => {
  const response = await fetch('/api/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newPost),
  });
  if (!response.ok) {
    throw new Error('Failed to create post');
  }
  return response.json();
};

// Custom hook for posts
function usePosts() {
  return useQuery('posts', fetchPosts, {
    onError: (error) => {
      console.error('Error fetching posts:', error);
    }
  });
}

// Posts list component
function PostsList() {
  const { data: posts, isLoading, error, refetch } = usePosts();

  if (isLoading) return <div>Loading posts...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <button onClick={refetch}>Refresh Posts</button>
      <ul>
        {posts?.map(post => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Create post component
function CreatePost() {
  const queryClient = useQueryClient();
  const mutation = useMutation(createPost, {
    onSuccess: (newPost) => {
      // Update the cache
      queryClient.setQueryData('posts', (oldPosts) => [
        ...oldPosts,
        newPost
      ]);
      // Or invalidate and refetch
      // queryClient.invalidateQueries('posts');
    },
    onError: (error) => {
      console.error('Error creating post:', error);
    }
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newPost = {
      title: formData.get('title'),
      body: formData.get('body'),
    };
    mutation.mutate(newPost);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="title" placeholder="Post title" required />
      <textarea name="body" placeholder="Post content" required />
      <button type="submit" disabled={mutation.isLoading}>
        {mutation.isLoading ? 'Creating...' : 'Create Post'}
      </button>
      {mutation.isError && (
        <div>Error: {mutation.error.message}</div>
      )}
      {mutation.isSuccess && (
        <div>Post created successfully!</div>
      )}
    </form>
  );
}

// App component
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="app">
        <h1>Posts App</h1>
        <CreatePost />
        <PostsList />
      </div>
    </QueryClientProvider>
  );
}

export default App;`
        }
      ]
    },
    {
      id: "react-performance-optimization",
      title: "Performance Optimization and Best Practices",
      content: "React applications can suffer from performance issues as they grow in complexity. Understanding how to optimize React apps is crucial for delivering fast, responsive user experiences.\n\n**Performance Bottlenecks**:\n- **Unnecessary Re-renders**: Components re-rendering when they don't need to\n- **Expensive Calculations**: Heavy computations on every render\n- **Large Bundle Sizes**: Including unnecessary code\n- **Memory Leaks**: Not cleaning up event listeners and subscriptions\n- **Inefficient Updates**: Updating DOM elements unnecessarily\n\n**React.memo**:\n- Prevents re-renders when props haven't changed\n- Shallow comparison by default\n- Can provide custom comparison function\n- Best for functional components\n\n**useMemo and useCallback**:\n- **useMemo**: Memoizes expensive calculations\n- **useCallback**: Memoizes function references\n- Prevents unnecessary re-computations\n- Dependencies array controls when to recalculate\n\n**Code Splitting**:\n- **Dynamic imports**: Load code on demand\n- **Route-based splitting**: Split by pages/routes\n- **Component-based splitting**: Split large components\n- **React.lazy**: Built-in code splitting for components\n\n**Bundle Optimization**:\n- **Tree shaking**: Remove unused code\n- **Compression**: Gzip/Brotli compression\n- **Image optimization**: Proper image formats and sizes\n- **Vendor splitting**: Separate third-party libraries\n\n**Profiling Tools**:\n- **React DevTools Profiler**: Analyze component performance\n- **Chrome DevTools**: Memory and performance tabs\n- **Lighthouse**: Overall performance auditing\n- **Webpack Bundle Analyzer**: Visualize bundle composition\n\n**Best Practices**:\n- Use keys properly in lists\n- Avoid inline functions in render\n- Implement proper error boundaries\n- Use production builds for deployment\n- Monitor performance metrics regularly",
      keyTopics: [
        "React.memo for component memoization",
        "useMemo and useCallback hooks",
        "Code splitting and lazy loading",
        "Bundle optimization techniques",
        "Performance profiling tools"
      ],
      practicalExercises: [
        "Optimize a slow-rendering component with React.memo",
        "Implement useMemo for expensive calculations",
        "Set up code splitting with React.lazy",
        "Profile and optimize a React application",
        "Implement virtual scrolling for large lists"
      ],
      codeExamples: [
        {
          title: "React.memo - Preventing Unnecessary Re-renders",
          code: `import React from 'react';

// Without memoization - re-renders on every parent update
function ExpensiveComponent({ data, onClick }) {
  console.log('ExpensiveComponent rendered');
  return (
    <div>
      <h3>Expensive Component</h3>
      <p>Data: {JSON.stringify(data)}</p>
      <button onClick={onClick}>Click me</button>
    </div>
  );
}

// With memoization - only re-renders when props change
const MemoizedExpensiveComponent = React.memo(function ExpensiveComponent({
  data,
  onClick
}) {
  console.log('MemoizedExpensiveComponent rendered');
  return (
    <div>
      <h3>Expensive Component</h3>
      <p>Data: {JSON.stringify(data)}</p>
      <button onClick={onClick}>Click me</button>
    </div>
  );
});

// Custom comparison function
const CustomMemoComponent = React.memo(
  function CustomComponent({ user, count }) {
    console.log('CustomMemoComponent rendered');
    return (
      <div>
        <h4>{user.name}</h4>
        <p>Count: {count}</p>
      </div>
    );
  },
  (prevProps, nextProps) => {
    // Only re-render if user name changed or count increased significantly
    return (
      prevProps.user.name === nextProps.user.name &&
      Math.abs(prevProps.count - nextProps.count) < 5
    );
  }
);

// Usage
function App() {
  const [count, setCount] = useState(0);
  const [otherCount, setOtherCount] = useState(0);

  const user = { name: 'John', age: 30 };

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>
        Update Count: {count}
      </button>
      <button onClick={() => setOtherCount(otherCount + 1)}>
        Update Other: {otherCount}
      </button>

      {/* This will re-render on every count change */}
      <ExpensiveComponent
        data={user}
        onClick={() => console.log('clicked')}
      />

      {/* This will only re-render when user or onClick changes */}
      <MemoizedExpensiveComponent
        data={user}
        onClick={() => console.log('clicked')}
      />

      {/* This uses custom comparison logic */}
      <CustomMemoComponent
        user={user}
        count={count}
      />
    </div>
  );
}

export default App;`
        },
        {
          title: "useMemo and useCallback - Optimizing Computations",
          code: `import React, { useState, useMemo, useCallback } from 'react';

// Expensive calculation function
function calculateFibonacci(n) {
  console.log('Calculating Fibonacci for:', n);
  if (n <= 1) return n;
  return calculateFibonacci(n - 1) + calculateFibonacci(n - 2);
}

// Without optimization
function SlowComponent() {
  const [count, setCount] = useState(0);
  const [input, setInput] = useState('');

  // This recalculates on every render
  const fibonacci = calculateFibonacci(count);

  return (
    <div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type something..."
      />
      <button onClick={() => setCount(count + 1)}>
        Increment: {count}
      </button>
      <p>Fibonacci: {fibonacci}</p>
    </div>
  );
}

// With useMemo optimization
function OptimizedComponent() {
  const [count, setCount] = useState(0);
  const [input, setInput] = useState('');

  // Only recalculates when count changes
  const fibonacci = useMemo(() => calculateFibonacci(count), [count]);

  return (
    <div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type something..."
      />
      <button onClick={() => setCount(count + 1)}>
        Increment: {count}
      </button>
      <p>Fibonacci: {fibonacci}</p>
    </div>
  );
}

// With useCallback for event handlers
function EventHandlerComponent() {
  const [count, setCount] = useState(0);
  const [todos, setTodos] = useState([]);

  // Without useCallback - new function on every render
  const addTodo = () => {
    setTodos([...todos, \`Todo \${todos.length + 1}\`]);
  };

  // With useCallback - stable function reference
  const increment = useCallback(() => {
    setCount(prevCount => prevCount + 1);
  }, []); // Empty dependency array - never changes

  const clearTodos = useCallback(() => {
    setTodos([]);
  }, []); // Empty dependency array - never changes

  return (
    <div>
      <button onClick={increment}>Count: {count}</button>
      <button onClick={addTodo}>Add Todo</button>
      <button onClick={clearTodos}>Clear Todos</button>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>{todo}</li>
        ))}
      </ul>
    </div>
  );
}

// Complex calculation with multiple dependencies
function ComplexCalculationComponent() {
  const [a, setA] = useState(1);
  const [b, setB] = useState(2);
  const [c, setC] = useState(3);

  // Only recalculates when a or b changes
  const result = useMemo(() => {
    console.log('Computing expensive calculation...');
    return (a * b) + Math.sqrt(c);
  }, [a, b]); // c is not in dependencies

  return (
    <div>
      <div>
        <label>A: <input type="number" value={a} onChange={e => setA(Number(e.target.value))} /></label>
      </div>
      <div>
        <label>B: <input type="number" value={b} onChange={e => setB(Number(e.target.value))} /></label>
      </div>
      <div>
        <label>C: <input type="number" value={c} onChange={e => setC(Number(e.target.value))} /></label>
      </div>
      <p>Result: {result}</p>
      <p>Change C - notice result doesn't recalculate</p>
    </div>
  );
}

export { SlowComponent, OptimizedComponent, EventHandlerComponent, ComplexCalculationComponent };`
        },
        {
          title: "Code Splitting with React.lazy and Suspense",
          code: `import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Lazy load components
const Home = lazy(() => import('./components/Home'));
const About = lazy(() => import('./components/About'));
const Contact = lazy(() => import('./components/Contact'));
const Dashboard = lazy(() => import('./components/Dashboard'));
const Admin = lazy(() => import('./components/Admin'));

// Loading component
function LoadingSpinner() {
  return (
    <div className="loading-spinner">
      <div className="spinner"></div>
      <p>Loading...</p>
    </div>
  );
}

// Error boundary for lazy loading
class LazyErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Lazy loading error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h2>Something went wrong.</h2>
          <button onClick={() => this.setState({ hasError: false })}>
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Main App component
function App() {
  return (
    <Router>
      <LazyErrorBoundary>
        <div className="app">
          <nav>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/admin">Admin</Link>
          </nav>

          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </Suspense>
        </div>
      </LazyErrorBoundary>
    </Router>
  );
}

// Component with conditional loading
const ConditionalComponent = lazy(() =>
  import('./components/ConditionalComponent')
);

function AdvancedApp() {
  const [showComponent, setShowComponent] = useState(false);

  return (
    <div>
      <button onClick={() => setShowComponent(true)}>
        Load Conditional Component
      </button>

      {showComponent && (
        <Suspense fallback={<LoadingSpinner />}>
          <ConditionalComponent />
        </Suspense>
      )}
    </div>
  );
}

// Dynamic import with retry logic
function loadComponent(retryCount = 0) {
  return import('./components/HeavyComponent')
    .catch(error => {
      if (retryCount < 3) {
        console.log(\`Retrying component load... (\${retryCount + 1}/3)\`);
        return new Promise(resolve => {
          setTimeout(() => resolve(loadComponent(retryCount + 1)), 1000);
        });
      }
      throw error;
    });
}

const HeavyComponent = lazy(() => loadComponent());

function ResilientApp() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <HeavyComponent />
    </Suspense>
  );
}

export default App;
export { AdvancedApp, ResilientApp };`
        },
        {
          title: "Error Boundaries and Performance Monitoring",
          code: `import React from 'react';

// Basic Error Boundary
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error to monitoring service
    console.error('Error caught by boundary:', error, errorInfo);

    this.setState({
      error,
      errorInfo
    });

    // Send to error monitoring service
    if (typeof window !== 'undefined' && window.errorMonitoring) {
      window.errorMonitoring.captureException(error, {
        extra: { errorInfo }
      });
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h2>Something went wrong.</h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            <summary>Error Details (Development)</summary>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo.componentStack}
          </details>
          <button onClick={() => this.setState({ hasError: false })}>
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Higher-Order Component for Error Boundaries
function withErrorBoundary(WrappedComponent, fallbackComponent) {
  return function ErrorBoundaryHOC(props) {
    return (
      <ErrorBoundary fallback={fallbackComponent}>
        <WrappedComponent {...props} />
      </ErrorBoundary>
    );
  };
}

// Performance monitoring hook
function usePerformanceMonitor(componentName) {
  React.useEffect(() => {
    const startTime = performance.now();

    return () => {
      const endTime = performance.now();
      const duration = endTime - startTime;

      console.log(\`\${componentName} render time: \${duration.toFixed(2)}ms\`);

      // Send to monitoring service
      if (typeof window !== 'undefined' && window.performanceMonitoring) {
        window.performanceMonitoring.trackRender(componentName, duration);
      }
    };
  }, [componentName]);
}

// Component with performance monitoring
function MonitoredComponent({ data }) {
  usePerformanceMonitor('MonitoredComponent');

  return (
    <div>
      <h3>Performance Monitored Component</h3>
      <p>Data length: {data.length}</p>
      <ul>
        {data.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

// Component that throws errors for testing
function BuggyComponent() {
  const [shouldThrow, setShouldThrow] = React.useState(false);

  if (shouldThrow) {
    throw new Error('This is a test error!');
  }

  return (
    <div>
      <button onClick={() => setShouldThrow(true)}>
        Throw Error
      </button>
    </div>
  );
}

// App with error boundaries
function App() {
  return (
    <ErrorBoundary>
      <div className="app">
        <h1>Error Boundary Demo</h1>

        <ErrorBoundary>
          <BuggyComponent />
        </ErrorBoundary>

        <ErrorBoundary>
          <MonitoredComponent data={['Item 1', 'Item 2', 'Item 3']} />
        </ErrorBoundary>

        <ErrorBoundary>
          <div>
            <h2>Normal Component</h2>
            <p>This won't break if other components error.</p>
          </div>
        </ErrorBoundary>
      </div>
    </ErrorBoundary>
  );
}

export default App;
export { ErrorBoundary, withErrorBoundary, usePerformanceMonitor };`
        }
      ]
    },
    {
      id: "react-testing",
      title: "Testing React Components and Applications",
      content: "Testing is crucial for maintaining code quality and preventing regressions in React applications. A comprehensive testing strategy includes unit tests, integration tests, and end-to-end tests.\n\n**Testing Pyramid**:\n- **Unit Tests**: Test individual functions and components in isolation\n- **Integration Tests**: Test how components work together\n- **E2E Tests**: Test complete user workflows\n\n**Testing Libraries**:\n- **Jest**: Test runner with assertions and mocking\n- **React Testing Library**: Test React components from user perspective\n- **Enzyme**: Alternative testing utility (less recommended now)\n- **Cypress/Playwright**: End-to-end testing frameworks\n\n**Testing Best Practices**:\n- Test behavior, not implementation details\n- Use descriptive test names\n- Keep tests isolated and independent\n- Test error states and edge cases\n- Use test doubles (mocks, stubs, spies) appropriately\n- Maintain fast test execution\n\n**Types of Tests**:\n- **Unit Tests**: Test individual functions and hooks\n- **Component Tests**: Test component rendering and interactions\n- **Integration Tests**: Test component combinations\n- **Snapshot Tests**: Catch unexpected UI changes\n- **Accessibility Tests**: Ensure inclusive user experiences\n\n**Test Organization**:\n- Group related tests in describe blocks\n- Use beforeEach/afterEach for setup/cleanup\n- Follow naming conventions (describe, it, test)\n- Keep test files close to source files\n\n**Mocking Strategies**:\n- Mock external dependencies\n- Mock API calls\n- Mock browser APIs\n- Mock custom hooks\n- Use test-specific implementations\n\n**Continuous Integration**:\n- Run tests on every commit\n- Set up automated test pipelines\n- Monitor test coverage\n- Fail builds on test failures",
      keyTopics: [
        "Unit testing React components",
        "Integration testing strategies",
        "Mocking and test doubles",
        "Testing hooks and custom logic",
        "End-to-end testing approaches"
      ],
      practicalExercises: [
        "Write unit tests for a custom hook",
        "Test a form component with user interactions",
        "Create integration tests for a multi-component feature",
        "Set up snapshot testing for UI components",
        "Implement accessibility testing"
      ],
      codeExamples: [
        {
          title: "Unit Testing React Components with Jest and RTL",
          code: `import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

// Component to test
function Counter({ initialCount = 0 }) {
  const [count, setCount] = React.useState(initialCount);

  return (
    <div>
      <button onClick={() => setCount(count - 1)}>-</button>
      <span data-testid="count">{count}</span>
      <button onClick={() => setCount(count + 1)}>+</button>
      <button onClick={() => setCount(initialCount)}>Reset</button>
    </div>
  );
}

// Basic rendering test
test('renders counter with initial value', () => {
  render(<Counter initialCount={5} />);
  const countElement = screen.getByTestId('count');
  expect(countElement).toHaveTextContent('5');
});

// User interaction test
test('increments counter when + button is clicked', () => {
  render(<Counter />);
  const countElement = screen.getByTestId('count');
  const incrementButton = screen.getByRole('button', { name: '+' });

  expect(countElement).toHaveTextContent('0');
  userEvent.click(incrementButton);
  expect(countElement).toHaveTextContent('1');
});

// Multiple interactions test
test('handles multiple increment and decrement operations', () => {
  render(<Counter />);
  const countElement = screen.getByTestId('count');
  const incrementButton = screen.getByRole('button', { name: '+' });
  const decrementButton = screen.getByRole('button', { name: '-' });

  userEvent.click(incrementButton);
  userEvent.click(incrementButton);
  expect(countElement).toHaveTextContent('2');

  userEvent.click(decrementButton);
  expect(countElement).toHaveTextContent('1');
});

// Reset functionality test
test('resets counter to initial value', () => {
  render(<Counter initialCount={10} />);
  const countElement = screen.getByTestId('count');
  const incrementButton = screen.getByRole('button', { name: '+' });
  const resetButton = screen.getByRole('button', { name: 'Reset' });

  userEvent.click(incrementButton);
  expect(countElement).toHaveTextContent('11');

  userEvent.click(resetButton);
  expect(countElement).toHaveTextContent('10');
});

// Accessibility test
test('has proper ARIA labels and keyboard navigation', () => {
  render(<Counter />);
  const buttons = screen.getAllByRole('button');

  // Check that buttons are keyboard accessible
  buttons.forEach(button => {
    expect(button).toBeVisible();
    button.focus();
    expect(button).toHaveFocus();
  });
});`
        },
        {
          title: "Testing Custom Hooks",
          code: `import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { renderHook, act } from '@testing-library/react-hooks';

// Custom hook to test
function useCounter(initialValue = 0) {
  const [count, setCount] = React.useState(initialValue);

  const increment = React.useCallback(() => {
    setCount(prevCount => prevCount + 1);
  }, []);

  const decrement = React.useCallback(() => {
    setCount(prevCount => prevCount - 1);
  }, []);

  const reset = React.useCallback(() => {
    setCount(initialValue);
  }, [initialValue]);

  return { count, increment, decrement, reset };
}

// Hook testing
describe('useCounter', () => {
  test('should initialize with default value', () => {
    const { result } = renderHook(() => useCounter());
    expect(result.current.count).toBe(0);
  });

  test('should initialize with provided value', () => {
    const { result } = renderHook(() => useCounter(10));
    expect(result.current.count).toBe(10);
  });

  test('should increment count', () => {
    const { result } = renderHook(() => useCounter());

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });

  test('should decrement count', () => {
    const { result } = renderHook(() => useCounter(5));

    act(() => {
      result.current.decrement();
    });

    expect(result.current.count).toBe(4);
  });

  test('should reset to initial value', () => {
    const { result } = renderHook(() => useCounter(10));

    act(() => {
      result.current.increment();
      result.current.increment();
    });
    expect(result.current.count).toBe(12);

    act(() => {
      result.current.reset();
    });
    expect(result.current.count).toBe(10);
  });

  test('should handle multiple operations', () => {
    const { result } = renderHook(() => useCounter());

    act(() => {
      result.current.increment();
      result.current.increment();
      result.current.decrement();
    });

    expect(result.current.count).toBe(1);
  });
});

// Async hook testing
function useAsyncData(url) {
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(url);
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (url) {
      fetchData();
    }
  }, [url]);

  return { data, loading, error };
}

// Mock fetch globally
global.fetch = jest.fn();

describe('useAsyncData', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test('should handle successful data fetch', async () => {
    const mockData = { id: 1, name: 'Test' };
    fetch.mockResolvedValueOnce({
      json: () => Promise.resolve(mockData)
    });

    const { result, waitForNextUpdate } = renderHook(() =>
      useAsyncData('/api/test')
    );

    expect(result.current.loading).toBe(true);
    expect(result.current.data).toBe(null);

    await waitForNextUpdate();

    expect(result.current.loading).toBe(false);
    expect(result.current.data).toBe(mockData);
    expect(result.current.error).toBe(null);
  });

  test('should handle fetch error', async () => {
    const mockError = new Error('Network error');
    fetch.mockRejectedValueOnce(mockError);

    const { result, waitForNextUpdate } = renderHook(() =>
      useAsyncData('/api/test')
    );

    await waitForNextUpdate();

    expect(result.current.loading).toBe(false);
    expect(result.current.data).toBe(null);
    expect(result.current.error).toBe(mockError);
  });
});`
        },
        {
          title: "Integration Testing with React Testing Library",
          code: `import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Mock API
const mockAPI = {
  login: jest.fn(),
  logout: jest.fn(),
  getUser: jest.fn()
};

// LoginForm component
function LoginForm({ onLogin }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await mockAPI.login(email, password);
      onLogin(result.user);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} data-testid="login-form">
      <div>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      {error && <div data-testid="error-message">{error}</div>}
      <button type="submit" disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
}

// App component that uses LoginForm
function App() {
  const [user, setUser] = React.useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    mockAPI.logout();
    setUser(null);
  };

  if (user) {
    return (
      <div>
        <h1>Welcome, {user.name}!</h1>
        <button onClick={handleLogout}>Logout</button>
      </div>
    );
  }

  return <LoginForm onLogin={handleLogin} />;
}

// Integration tests
describe('Login Flow Integration', () => {
  beforeEach(() => {
    mockAPI.login.mockClear();
    mockAPI.logout.mockClear();
  });

  test('successful login flow', async () => {
    const mockUser = { id: 1, name: 'John Doe', email: 'john@example.com' };
    mockAPI.login.mockResolvedValueOnce({ user: mockUser });

    render(<App />);

    // Fill out form
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /login/i });

    userEvent.type(emailInput, 'john@example.com');
    userEvent.type(passwordInput, 'password123');
    userEvent.click(submitButton);

    // Check loading state
    expect(submitButton).toBeDisabled();
    expect(submitButton).toHaveTextContent('Logging in...');

    // Wait for login to complete
    await waitFor(() => {
      expect(screen.getByText('Welcome, John Doe!')).toBeInTheDocument();
    });

    expect(mockAPI.login).toHaveBeenCalledWith('john@example.com', 'password123');
    expect(mockAPI.login).toHaveBeenCalledTimes(1);
  });

  test('login error handling', async () => {
    const errorMessage = 'Invalid credentials';
    mockAPI.login.mockRejectedValueOnce(new Error(errorMessage));

    render(<App />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /login/i });

    userEvent.type(emailInput, 'wrong@email.com');
    userEvent.type(passwordInput, 'wrongpassword');
    userEvent.click(submitButton);

    // Wait for error to appear
    await waitFor(() => {
      expect(screen.getByTestId('error-message')).toHaveTextContent(errorMessage);
    });

    // Form should still be visible
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });

  test('logout functionality', async () => {
    const mockUser = { id: 1, name: 'John Doe', email: 'john@example.com' };
    mockAPI.login.mockResolvedValueOnce({ user: mockUser });

    render(<App />);

    // Login first
    userEvent.type(screen.getByLabelText(/email/i), 'john@example.com');
    userEvent.type(screen.getByLabelText(/password/i), 'password123');
    userEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(screen.getByText('Welcome, John Doe!')).toBeInTheDocument();
    });

    // Logout
    const logoutButton = screen.getByRole('button', { name: /logout/i });
    userEvent.click(logoutButton);

    // Should return to login form
    expect(screen.getByTestId('login-form')).toBeInTheDocument();
    expect(mockAPI.logout).toHaveBeenCalledTimes(1);
  });

  test('form validation', () => {
    render(<App />);

    const submitButton = screen.getByRole('button', { name: /login/i });

    // Try to submit empty form
    userEvent.click(submitButton);

    // HTML5 validation should prevent submission
    expect(mockAPI.login).not.toHaveBeenCalled();
  });
});`
        },
        {
          title: "Snapshot Testing and Accessibility Testing",
          code: `import React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';

// Add jest-axe matchers
expect.extend(toHaveNoViolations);

// Component to test
function ArticleCard({ title, excerpt, author, date }) {
  return (
    <article className="article-card">
      <header>
        <h2>{title}</h2>
        <div className="article-meta">
          <span className="author">By {author}</span>
          <time dateTime={date}>{new Date(date).toLocaleDateString()}</time>
        </div>
      </header>
      <p className="excerpt">{excerpt}</p>
      <footer>
        <button className="read-more">Read More</button>
      </footer>
    </article>
  );
}

// Snapshot test
describe('ArticleCard Snapshots', () => {
  test('renders correctly with all props', () => {
    const { container } = render(
      <ArticleCard
        title="React Testing Best Practices"
        excerpt="Learn how to write maintainable and reliable tests for your React applications."
        author="Jane Smith"
        date="2024-01-15"
      />
    );

    // Create snapshot
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders with minimal props', () => {
    const { container } = render(
      <ArticleCard
        title="Short Title"
        excerpt="Brief excerpt"
        author="Author"
        date="2024-01-01"
      />
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});

// Accessibility tests
describe('ArticleCard Accessibility', () => {
  test('should have no accessibility violations', async () => {
    const { container } = render(
      <ArticleCard
        title="Accessible Article Title"
        excerpt="This article content is accessible to all users."
        author="Accessibility Expert"
        date="2024-01-15"
      />
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('should have proper heading hierarchy', () => {
    render(
      <ArticleCard
        title="Test Article"
        excerpt="Test content"
        author="Test Author"
        date="2024-01-15"
      />
    );

    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toHaveTextContent('Test Article');
  });

  test('should have proper ARIA labels and semantic HTML', () => {
    render(
      <ArticleCard
        title="Semantic HTML Article"
        excerpt="Content with proper semantics"
        author="Semantic Expert"
        date="2024-01-15"
      />
    );

    // Check semantic elements
    expect(screen.getByRole('article')).toBeInTheDocument();
    expect(screen.getByRole('heading')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();

    // Check time element has proper datetime
    const timeElement = screen.getByRole('time');
    expect(timeElement).toHaveAttribute('datetime', '2024-01-15');
  });

  test('should be keyboard navigable', () => {
    render(
      <ArticleCard
        title="Keyboard Navigation Test"
        excerpt="Testing keyboard accessibility"
        author="A11y Tester"
        date="2024-01-15"
      />
    );

    const button = screen.getByRole('button');
    button.focus();
    expect(button).toHaveFocus();
  });
});

// Performance testing utilities
describe('Performance Tests', () => {
  test('renders within performance budget', () => {
    const startTime = performance.now();

    render(
      <ArticleCard
        title="Performance Test Article"
        excerpt="Testing render performance"
        author="Performance Tester"
        date="2024-01-15"
      />
    );

    const endTime = performance.now();
    const renderTime = endTime - startTime;

    // Assert render time is under budget (e.g., 16ms for 60fps)
    expect(renderTime).toBeLessThan(16);
  });

  test('handles large content efficiently', () => {
    const largeExcerpt = 'A'.repeat(10000); // 10KB of content

    const { rerender } = render(
      <ArticleCard
        title="Large Content Test"
        excerpt={largeExcerpt}
        author="Content Tester"
        date="2024-01-15"
      />
    );

    // Measure rerender performance
    const startTime = performance.now();
    rerender(
      <ArticleCard
        title="Updated Large Content Test"
        excerpt={largeExcerpt}
        author="Updated Content Tester"
        date="2024-01-16"
      />
    );
    const endTime = performance.now();

    expect(endTime - startTime).toBeLessThan(10);
  });
});

// Test utilities and helpers
export function renderWithProviders(ui, options = {}) {
  const Wrapper = ({ children }) => (
    <div data-testid="test-wrapper">
      {children}
    </div>
  );

  return render(ui, { wrapper: Wrapper, ...options });
}

export function createMockUser(overrides = {}) {
  return {
    id: 1,
    name: 'Test User',
    email: 'test@example.com',
    avatar: '/avatar.jpg',
    ...overrides
  };
}

export function waitForLoadingToFinish() {
  return waitFor(() => {
    expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
  });
}

// Custom matchers
expect.extend({
  toBeVisibleInViewport(received) {
    const pass = received && received.getBoundingClientRect().top >= 0;
    return {
      message: () => \`expected element to be visible in viewport\`,
      pass
    };
  }
});`
        }
      ]
    },
    {
      id: "react-advanced-patterns",
      title: "Advanced React Patterns and Best Practices",
      content: "As React applications grow in complexity, mastering advanced patterns becomes essential for maintaining clean, scalable, and maintainable codebases.\n\n**Higher-Order Components (HOC)**:\n- Functions that take a component and return an enhanced component\n- Used for cross-cutting concerns like authentication, logging, data fetching\n- Follow naming convention: withSomething (e.g., withAuth, withData)\n- Can be replaced with hooks in many cases but still useful for some patterns\n\n**Render Props Pattern**:\n- Components that accept a function as children\n- Allows sharing logic between components\n- Provides more flexibility than HOC in some cases\n- Commonly used in libraries like React Router, Formik\n\n**Compound Components**:\n- Group of components that work together\n- Share implicit state through React context\n- Provide a clean, declarative API\n- Example: Select, SelectOption, SelectGroup\n\n**Controlled vs Uncontrolled Components**:\n- **Controlled**: Component state controlled by React state\n- **Uncontrolled**: Component manages its own state\n- Controlled preferred for complex forms and validation\n- Uncontrolled useful for simple cases or integration with non-React code\n\n**Custom Hooks**:\n- Extract reusable logic from components\n- Follow naming convention: useSomething\n- Can use other hooks inside custom hooks\n- Make components more focused and testable\n\n**Error Boundaries**:\n- Catch JavaScript errors in component tree\n- Prevent entire app crashes\n- Provide fallback UI for error states\n- Only work for class components (hooks alternative coming)\n\n**Portals**:\n- Render children into a DOM node outside the parent component\n- Useful for modals, tooltips, dropdowns\n- Break out of parent container styling constraints\n- Maintain event bubbling and context\n\n**Suspense for Data Fetching**:\n- Declarative way to handle async operations\n- Works with React.lazy for code splitting\n- Provide loading states at component level\n- Better user experience with skeleton screens",
      keyTopics: [
        "Higher-Order Components (HOC)",
        "Render props pattern",
        "Compound components",
        "Custom hooks patterns",
        "Error boundaries and error handling"
      ],
      practicalExercises: [
        "Create a reusable HOC for authentication",
        "Implement a compound component for a custom select",
        "Build a render props component for data fetching",
        "Create custom hooks for form handling",
        "Implement error boundaries for better UX"
      ],
      codeExamples: [
        {
          title: "Higher-Order Components (HOC)",
          code: `import React from 'react';

// Basic HOC structure
function withLogging(WrappedComponent) {
  return function WithLoggingComponent(props) {
    React.useEffect(() => {
      console.log(\`Component \${WrappedComponent.name} mounted\`);
      return () => {
        console.log(\`Component \${WrappedComponent.name} unmounted\`);
      };
    }, []);

    return <WrappedComponent {...props} />;
  };
}

// HOC with authentication
function withAuth(WrappedComponent) {
  return function WithAuthComponent(props) {
    const [user, setUser] = React.useState(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
      // Simulate authentication check
      const checkAuth = async () => {
        try {
          const userData = await fakeAuthAPI.getCurrentUser();
          setUser(userData);
        } catch (error) {
          // Redirect to login or show error
          console.error('Authentication failed:', error);
        } finally {
          setLoading(false);
        }
      };

      checkAuth();
    }, []);

    if (loading) {
      return <div>Loading...</div>;
    }

    if (!user) {
      return <div>Please log in to access this content.</div>;
    }

    return <WrappedComponent {...props} user={user} />;
  };
}

// HOC with data fetching
function withData(WrappedComponent, dataUrl) {
  return function WithDataComponent(props) {
    const [data, setData] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);

    React.useEffect(() => {
      const fetchData = async () => {
        try {
          setLoading(true);
          const response = await fetch(dataUrl);
          const result = await response.json();
          setData(result);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }, []);

    return (
      <WrappedComponent
        {...props}
        data={data}
        loading={loading}
        error={error}
      />
    );
  };
}

// Usage
function UserProfile({ user, data, loading, error }) {
  if (loading) return <div>Loading profile...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>{user.name}'s Profile</h2>
      <div>Posts: {data?.posts?.length || 0}</div>
      <div>Followers: {data?.followers || 0}</div>
    </div>
  );
}

// Apply multiple HOCs
const AuthenticatedUserProfile = withAuth(
  withLogging(
    withData(UserProfile, '/api/user/profile')
  )
);

function App() {
  return <AuthenticatedUserProfile />;
}

export default App;`
        },
        {
          title: "Render Props Pattern",
          code: `import React from 'react';

// Basic render props component
class MouseTracker extends React.Component {
  constructor(props) {
    super(props);
    this.state = { x: 0, y: 0 };
  }

  handleMouseMove = (event) => {
    this.setState({
      x: event.clientX,
      y: event.clientY
    });
  };

  render() {
    return (
      <div style={{ height: '100vh' }} onMouseMove={this.handleMouseMove}>
        {this.props.children(this.state)}
      </div>
    );
  }
}

// Usage of render props
function App() {
  return (
    <MouseTracker>
      {mouse => (
        <div>
          <h2>Mouse position:</h2>
          <p>X: {mouse.x}, Y: {mouse.y}</p>
        </div>
      )}
    </MouseTracker>
  );
}

// Advanced render props with data fetching
class DataFetcher extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      loading: true,
      error: null
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.url !== this.props.url) {
      this.fetchData();
    }
  }

  fetchData = async () => {
    try {
      this.setState({ loading: true, error: null });
      const response = await fetch(this.props.url);
      const data = await response.json();
      this.setState({ data, loading: false });
    } catch (error) {
      this.setState({ error: error.message, loading: false });
    }
  };

  render() {
    return this.props.children(this.state);
  }
}

// Usage with different data sources
function UserList() {
  return (
    <DataFetcher url="/api/users">
      {({ data, loading, error }) => {
        if (loading) return <div>Loading users...</div>;
        if (error) return <div>Error: {error}</div>;

        return (
          <ul>
            {data?.map(user => (
              <li key={user.id}>{user.name}</li>
            ))}
          </ul>
        );
      }}
    </DataFetcher>
  );
}

function PostsList() {
  return (
    <DataFetcher url="/api/posts">
      {({ data, loading, error }) => {
        if (loading) return <div>Loading posts...</div>;
        if (error) return <div>Error: {error}</div>;

        return (
          <ul>
            {data?.map(post => (
              <li key={post.id}>
                <h3>{post.title}</h3>
                <p>{post.body}</p>
              </li>
            ))}
          </ul>
        );
      }}
    </DataFetcher>
  );
}

// Render props with form handling
class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      values: props.initialValues || {},
      errors: {},
      touched: {}
    };
  }

  handleChange = (name) => (event) => {
    const { value } = event.target;
    this.setState(prevState => ({
      values: {
        ...prevState.values,
        [name]: value
      }
    }));
  };

  handleBlur = (name) => () => {
    this.setState(prevState => ({
      touched: {
        ...prevState.touched,
        [name]: true
      }
    }));
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit(this.state.values);
  };

  render() {
    return this.props.children({
      values: this.state.values,
      errors: this.state.errors,
      touched: this.state.touched,
      handleChange: this.handleChange,
      handleBlur: this.handleBlur,
      handleSubmit: this.handleSubmit
    });
  }
}

// Usage
function LoginForm({ onLogin }) {
  return (
    <Form
      initialValues={{ email: '', password: '' }}
      onSubmit={onLogin}
    >
      {({ values, handleChange, handleBlur, handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange('email')}
              onBlur={handleBlur('email')}
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange('password')}
              onBlur={handleBlur('password')}
            />
          </div>
          <button type="submit">Login</button>
        </form>
      )}
    </Form>
  );
}

export { MouseTracker, DataFetcher, Form };`
        },
        {
          title: "Compound Components Pattern",
          code: `import React, { createContext, useContext, useState } from 'react';

// Create context for compound components
const TabsContext = createContext();

// Main Tabs component
function Tabs({ children, defaultActive = 0 }) {
  const [activeTab, setActiveTab] = useState(defaultActive);

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className="tabs">{children}</div>
    </TabsContext.Provider>
  );
}

// TabList component
function TabList({ children }) {
  return (
    <div className="tab-list" role="tablist">
      {children}
    </div>
  );
}

// Individual Tab component
function Tab({ index, children }) {
  const { activeTab, setActiveTab } = useContext(TabsContext);

  return (
    <button
      className={\`tab \${activeTab === index ? 'active' : ''}\`}
      onClick={() => setActiveTab(index)}
      role="tab"
      aria-selected={activeTab === index}
    >
      {children}
    </button>
  );
}

// TabPanels component
function TabPanels({ children }) {
  return (
    <div className="tab-panels">
      {children}
    </div>
  );
}

// Individual TabPanel component
function TabPanel({ index, children }) {
  const { activeTab } = useContext(TabsContext);

  if (activeTab !== index) {
    return null;
  }

  return (
    <div className="tab-panel" role="tabpanel">
      {children}
    </div>
  );
}

// Usage
function App() {
  return (
    <Tabs defaultActive={0}>
      <TabList>
        <Tab index={0}>Home</Tab>
        <Tab index={1}>About</Tab>
        <Tab index={2}>Contact</Tab>
      </TabList>

      <TabPanels>
        <TabPanel index={0}>
          <h2>Welcome Home</h2>
          <p>This is the home tab content.</p>
        </TabPanel>

        <TabPanel index={1}>
          <h2>About Us</h2>
          <p>Learn more about our company.</p>
        </TabPanel>

        <TabPanel index={2}>
          <h2>Contact Us</h2>
          <p>Get in touch with our team.</p>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}

// Advanced compound component with form validation
const FormContext = createContext();

function Form({ children, onSubmit }) {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleChange = (name, value) => {
    setValues(prev => ({ ...prev, [name]: value }));
  };

  const handleBlur = (name) => {
    setTouched(prev => ({ ...prev, [name]: true }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(values);
  };

  return (
    <FormContext.Provider value={{
      values,
      errors,
      touched,
      handleChange,
      handleBlur,
      handleSubmit
    }}>
      <form onSubmit={handleSubmit}>
        {children}
      </form>
    </FormContext.Provider>
  );
}

function FormField({ name, label, type = 'text', validation }) {
  const { values, errors, touched, handleChange, handleBlur } = useContext(FormContext);

  return (
    <div className="form-field">
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        value={values[name] || ''}
        onChange={(e) => handleChange(name, e.target.value)}
        onBlur={() => handleBlur(name)}
      />
      {touched[name] && errors[name] && (
        <span className="error">{errors[name]}</span>
      )}
    </div>
  );
}

function SubmitButton({ children }) {
  return (
    <button type="submit" className="submit-button">
      {children}
    </button>
  );
}

// Usage
function RegistrationForm() {
  const handleSubmit = (values) => {
    console.log('Form submitted:', values);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormField name="firstName" label="First Name" />
      <FormField name="lastName" label="Last Name" />
      <FormField name="email" label="Email" type="email" />
      <FormField name="password" label="Password" type="password" />
      <SubmitButton>Register</SubmitButton>
    </Form>
  );
}

export { Tabs, TabList, Tab, TabPanels, TabPanel, Form, FormField, SubmitButton };`
        },
        {
          title: "Custom Hooks and Advanced Patterns",
          code: `import { useState, useEffect, useCallback, useRef } from 'react';

// Custom hook for localStorage with SSR support
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(\`Error reading localStorage key "\${key}":\`, error);
      return initialValue;
    }
  });

  const setValue = useCallback((value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);

      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(\`Error setting localStorage key "\${key}":\`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setValue];
}

// Custom hook for form handling
function useForm(initialValues = {}, validate) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = useCallback((name, value) => {
    setValues(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleBlur = useCallback((name) => {
    setTouched(prev => ({ ...prev, [name]: true }));
  }, []);

  const handleSubmit = useCallback(async (onSubmit) => {
    setIsSubmitting(true);

    if (validate) {
      const validationErrors = validate(values);
      setErrors(validationErrors);

      if (Object.keys(validationErrors).length > 0) {
        setIsSubmitting(false);
        return;
      }
    }

    try {
      await onSubmit(values);
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  }, [values, validate]);

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  }, [initialValues]);

  return {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    reset,
    setValues,
    setErrors
  };
}

// Custom hook for async operations
function useAsync(asyncFunction, immediate = true) {
  const [status, setStatus] = useState('idle');
  const [value, setValue] = useState(null);
  const [error, setError] = useState(null);

  const execute = useCallback(() => {
    setStatus('pending');
    setValue(null);
    setError(null);

    return asyncFunction()
      .then(response => {
        setValue(response);
        setStatus('success');
        return response;
      })
      .catch(error => {
        setError(error);
        setStatus('error');
        throw error;
      });
  }, [asyncFunction]);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return { execute, status, value, error };
}

// Custom hook for previous value tracking
function usePrevious(value) {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
}

// Custom hook for debounced value
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// Custom hook for window size
function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  return windowSize;
}

// Usage examples
function App() {
  // Local storage
  const [name, setName] = useLocalStorage('name', 'John');

  // Form handling
  const loginForm = useForm(
    { email: '', password: '' },
    (values) => {
      const errors = {};
      if (!values.email) errors.email = 'Email is required';
      if (!values.password) errors.password = 'Password is required';
      return errors;
    }
  );

  // Async operation
  const { execute: login, status, error } = useAsync(async () => {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginForm.values)
    });
    return response.json();
  }, false);

  // Window size
  const { width } = useWindowSize();

  // Debounced search
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  return (
    <div>
      <h1>Custom Hooks Demo</h1>

      {/* Local Storage */}
      <div>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
        />
        <p>Hello, {name}!</p>
      </div>

      {/* Form */}
      <form onSubmit={(e) => {
        e.preventDefault();
        loginForm.handleSubmit(login);
      }}>
        <input
          name="email"
          value={loginForm.values.email}
          onChange={(e) => loginForm.handleChange('email', e.target.value)}
          onBlur={() => loginForm.handleBlur('email')}
          placeholder="Email"
        />
        {loginForm.errors.email && <span>{loginForm.errors.email}</span>}

        <input
          name="password"
          type="password"
          value={loginForm.values.password}
          onChange={(e) => loginForm.handleChange('password', e.target.value)}
          onBlur={() => loginForm.handleBlur('password')}
          placeholder="Password"
        />
        {loginForm.errors.password && <span>{loginForm.errors.password}</span>}

        <button type="submit" disabled={loginForm.isSubmitting}>
          {loginForm.isSubmitting ? 'Logging in...' : 'Login'}
        </button>
      </form>

      {/* Window size */}
      <p>Window width: {width}px</p>

      {/* Debounced search */}
      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search..."
      />
      <p>Searching for: {debouncedSearchTerm}</p>
    </div>
  );
}

export { useLocalStorage, useForm, useAsync, usePrevious, useDebounce, useWindowSize };`
        }
      ]
    }
  ],
  projects: [
    {
      title: "React Task Management App",
      description: "Build a comprehensive task management application using React with advanced state management, custom hooks, and modern React patterns. Include features like task creation, editing, filtering, and local storage persistence."
    },
    {
      title: "React E-commerce Dashboard",
      description: "Create an admin dashboard for an e-commerce platform with data visualization, real-time updates, and complex state management. Implement features like product management, order tracking, and analytics."
    },
    {
      title: "React Social Media Feed",
      description: "Develop a social media feed component with infinite scrolling, real-time updates, and advanced interaction patterns. Focus on performance optimization and user experience."
    },
    {
      title: "React Form Builder",
      description: "Build a drag-and-drop form builder with validation, conditional logic, and multiple output formats. Use compound components and advanced React patterns for a clean API."
    },
    {
      title: "React Data Visualization Library",
      description: "Create a reusable data visualization library with charts, graphs, and interactive components. Focus on performance, accessibility, and extensibility."
    }
  ],
  assessments: [
    {
      type: "quiz",
      questions: [
        {
          question: "What is the primary purpose of React Hooks?",
          options: [
            "To replace class components entirely",
            "To add state and lifecycle features to functional components",
            "To optimize React's rendering performance",
            "To handle routing in React applications"
          ],
          correctAnswer: "To add state and lifecycle features to functional components"
        },
        {
          question: "Which hook is used to optimize performance by memoizing values?",
          options: [
            "useState",
            "useEffect",
            "useMemo",
            "useContext"
          ],
          correctAnswer: "useMemo"
        },
        {
          question: "What is the correct way to prevent unnecessary re-renders in React?",
          options: [
            "Using React.memo for functional components",
            "Using useCallback for event handlers",
            "Using useMemo for expensive calculations",
            "All of the above"
          ],
          correctAnswer: "All of the above"
        },
        {
          question: "What is the Context API primarily used for?",
          options: [
            "Managing local component state",
            "Sharing state between components without prop drilling",
            "Handling side effects in functional components",
            "Optimizing component re-renders"
          ],
          correctAnswer: "Sharing state between components without prop drilling"
        },
        {
          question: "Which testing library is most commonly used with React?",
          options: [
            "Mocha",
            "Jasmine",
            "React Testing Library",
            "QUnit"
          ],
          correctAnswer: "React Testing Library"
        }
      ]
    },
    {
      type: "evaluation",
      questions: [
        {
          question: "Design a React component architecture for a complex e-commerce product page. Explain your use of hooks, context, and performance optimization techniques.",
          options: [],
          correctAnswer: ""
        },
        {
          question: "Explain how you would implement a custom hook for data fetching with error handling, loading states, and caching. Provide code examples.",
          options: [],
          correctAnswer: ""
        },
        {
          question: "Describe the differences between various state management solutions in React (useState, useReducer, Context API, Redux). When would you choose each approach?",
          options: [],
          correctAnswer: ""
        }
      ]
    }
  ],
  aiPrompts: [
    "How do I create a React component?",
    "What's the difference between useState and useEffect?",
    "How do I optimize React performance?",
    "How do I manage state in React?",
    "How do I test React components?",
    "What's the Context API and when to use it?",
    "How do I handle forms in React?",
    "How do I implement routing in React?",
    "How do I fetch data in React?",
    "How do I handle errors in React?",
    "How do I create custom hooks?",
    "How do I implement authentication in React?",
    "How do I optimize bundle size in React?",
    "How do I handle side effects in React?",
    "How do I implement lazy loading in React?"
  ],
  resources: [
    { name: "React Official Documentation", url: "https://reactjs.org/docs/getting-started.html" },
    { name: "React Hooks Documentation", url: "https://reactjs.org/docs/hooks-intro.html" },
    { name: "React Testing Library", url: "https://testing-library.com/docs/react-testing-library/intro/" },
    { name: "React Performance Best Practices", url: "https://reactjs.org/docs/optimizing-performance.html" },
    { name: "Advanced React Patterns", url: "https://www.patterns.dev/posts/advanced-react-patterns" },
    { name: "React DevTools", url: "https://reactjs.org/blog/2019/08/15/new-react-devtools.html" },
    { name: "Create React App", url: "https://create-react-app.dev/" },
    { name: "Next.js Documentation", url: "https://nextjs.org/docs" }
  ],
  toolsRequired: [
    "Node.js (v14 or higher)",
    "npm or yarn package manager",
    "Modern web browser with developer tools",
    "Code editor (VS Code recommended)",
    "React Developer Tools browser extension",
    "Jest testing framework",
    "React Testing Library",
    "ESLint for code linting",
    "Prettier for code formatting"
  ],
  bestPractices: [
    "Use functional components with hooks over class components",
    "Keep components small and focused on a single responsibility",
    "Use meaningful component and prop names",
    "Implement proper TypeScript types for better development experience",
    "Use custom hooks to extract reusable logic",
    "Optimize performance with React.memo, useMemo, and useCallback",
    "Write comprehensive tests for components and hooks",
    "Use the Context API for global state management",
    "Implement proper error boundaries for better user experience",
    "Follow React's best practices for accessibility",
    "Use React's built-in hooks before reaching for external libraries",
    "Keep your bundle size small with code splitting",
    "Use meaningful commit messages and follow conventional commits",
    "Document your components with PropTypes or TypeScript",
    "Use the latest stable version of React and keep dependencies updated",
    "Implement proper loading states and error handling",
    "Use semantic HTML and proper ARIA attributes",
    "Test your application across different browsers and devices",
    "Monitor performance metrics and optimize when necessary",
    "Follow the single responsibility principle for components"
  ],
  commonPitfalls: [
    "Mutating state directly instead of using setState",
    "Not using dependency arrays correctly in useEffect",
    "Creating infinite re-render loops",
    "Not cleaning up event listeners and subscriptions",
    "Using outdated patterns like class components unnecessarily",
    "Not handling loading and error states properly",
    "Overusing Context API for local state",
    "Not optimizing list rendering with keys",
    "Mixing different state management solutions unnecessarily",
    "Not testing components thoroughly",
    "Ignoring accessibility best practices",
    "Not handling prop validation properly",
    "Creating components that are too large and complex",
    "Not using React's built-in performance optimization features",
    "Ignoring TypeScript for better type safety",
    "Not following React's naming conventions",
    "Using deprecated lifecycle methods",
    "Not handling async operations properly",
    "Creating memory leaks with improper cleanup",
    "Not considering mobile and responsive design"
  ],
  careerRelevance: "React is one of the most in-demand skills in modern web development, with over 40% of developers using it professionally. Companies like Facebook, Netflix, Airbnb, and thousands of others rely on React for their web applications. Mastering React opens doors to frontend development roles, full-stack positions, and even mobile development with React Native. The ecosystem is vast with excellent job opportunities, competitive salaries, and continuous innovation. React developers are highly sought after for their ability to build scalable, maintainable user interfaces that deliver exceptional user experiences."
};

export default reactContent;