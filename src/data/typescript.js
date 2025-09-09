export default {
  id: "typescript",
  tier: 4,
  name: "TypeScript",
  description: "Master TypeScript for building scalable, type-safe JavaScript applications. Learn advanced type system features, generics, decorators, and integration with modern frameworks for robust enterprise-grade development.",
  difficulty: "intermediate",
  estimatedHours: 22,
  prerequisites: ["javascript", "nodejs"],
  learningObjectives: [
    "Master TypeScript's type system including primitive types, union types, and intersection types",
    "Design and implement interfaces for object shapes and contracts",
    "Apply generics for reusable, type-safe code patterns",
    "Configure TypeScript compiler options for different project needs",
    "Implement advanced types including conditional types, mapped types, and template literal types",
    "Integrate TypeScript with React for type-safe component development",
    "Use decorators for metadata and aspect-oriented programming",
    "Migrate existing JavaScript projects to TypeScript incrementally",
    "Implement type-safe API development with proper error handling",
    "Configure TypeScript for Node.js backend development",
    "Use utility types for common type transformations",
    "Debug TypeScript compilation errors and type-related issues"
  ],
  sections: [
    {
      title: "TypeScript Fundamentals",
      content: "TypeScript is a superset of JavaScript that adds static typing capabilities to the language. It provides compile-time type checking while maintaining full JavaScript compatibility. TypeScript helps catch errors early in development and improves code maintainability and developer experience.\n\n**Type Annotations**: TypeScript allows you to explicitly declare the types of variables, function parameters, and return values. This provides better IDE support, documentation, and error detection.\n\n**Type Inference**: TypeScript can automatically infer types based on context, reducing the need for explicit type annotations while still providing type safety.\n\n**Compilation**: TypeScript code is compiled to JavaScript using the TypeScript compiler (tsc). The compiler can target different JavaScript versions and provides various configuration options.\n\n**Benefits**: Better IDE support with autocomplete and refactoring, early error detection, improved code documentation, and enhanced maintainability for large codebases.\n\n**Getting Started**: Install TypeScript globally with `npm install -g typescript`, then use `tsc --init` to create a `tsconfig.json` file in your project.",
      keyTopics: [
        "TypeScript vs JavaScript differences",
        "Type annotations and declarations",
        "Type inference capabilities",
        "TypeScript compilation process",
        "Basic type system concepts"
      ],
      practicalExercises: [
        "Set up a new TypeScript project with proper configuration",
        "Convert existing JavaScript functions to TypeScript with type annotations",
        "Implement type-safe data structures (stacks, queues, linked lists)",
        "Create typed utility functions for common operations",
        "Configure TypeScript for different JavaScript target versions"
      ],
      codeExamples: [
        {
          title: "Basic TypeScript Types",
          language: "typescript",
          code: `// Primitive types
let isDone: boolean = false;
let decimal: number = 6;
let hex: number = 0xf00d;
let binary: number = 0b1010;
let octal: number = 0o744;
let color: string = "blue";
let list: number[] = [1, 2, 3];
let tuple: [string, number] = ["hello", 10];

// Union types
let union: string | number;
union = "hello";
union = 42;

// Type aliases
type Point = {
  x: number;
  y: number;
};

type ID = string | number;

// Functions with type annotations
function add(x: number, y: number): number {
  return x + y;
}

const multiply = (x: number, y: number): number => x * y;

// Optional parameters
function buildName(firstName: string, lastName?: string): string {
  if (lastName) {
    return firstName + " " + lastName;
  } else {
    return firstName;
  }
}

// Default parameters
function buildNameWithDefault(firstName: string, lastName = "Smith"): string {
  return firstName + " " + lastName;
}

// Rest parameters
function buildNameWithRest(firstName: string, ...restOfName: string[]): string {
  return firstName + " " + restOfName.join(" ");
}

// Void return type
function logMessage(message: string): void {
  console.log(message);
}

// Never type (function never returns)
function error(message: string): never {
  throw new Error(message);
}

// Type assertions
let someValue: any = "this is a string";
let strLength: number = (someValue as string).length;
let strLength2: number = (<string>someValue).length;`
        },
        {
          title: "TypeScript Configuration",
          language: "json",
          code: `{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "removeComments": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true
  },
  "include": [
    "src/**/*"
  ],
  "exclude": [
    "node_modules",
    "dist",
    "**/*.test.ts"
  ]
}`
        }
      ]
    },
    {
      title: "Interfaces and Classes",
      content: "Interfaces in TypeScript define contracts for object shapes and are a powerful way to define custom types. Classes provide object-oriented programming capabilities with type safety.\n\n**Interface Definition**: Interfaces describe the structure of objects, including properties, methods, and their types. They can be extended and implemented by classes.\n\n**Class Implementation**: TypeScript classes support inheritance, access modifiers, abstract classes, and interfaces. They provide encapsulation and type safety for object-oriented programming.\n\n**Access Modifiers**: TypeScript supports public, private, and protected access modifiers for class members, controlling their visibility and accessibility.\n\n**Abstract Classes**: Abstract classes cannot be instantiated directly and serve as base classes for other classes. They can contain abstract methods that must be implemented by derived classes.\n\n**Interface vs Classes**: Interfaces define contracts while classes provide implementations. A class can implement multiple interfaces but can only extend one class.\n\n**Advanced Patterns**: Use interfaces for dependency injection, define optional properties, and create discriminated unions for type-safe state management.",
      keyTopics: [
        "Interface definition and usage",
        "Class syntax and inheritance",
        "Access modifiers (public, private, protected)",
        "Abstract classes and methods",
        "Interface segregation and composition"
      ],
      practicalExercises: [
        "Design interfaces for a user management system",
        "Implement class hierarchies with inheritance",
        "Create abstract classes for common functionality",
        "Use interfaces for dependency injection",
        "Build type-safe data models with interfaces"
      ],
      codeExamples: [
        {
          title: "Interfaces and Classes",
          language: "typescript",
          code: `// Basic interface
interface User {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
}

// Interface with optional properties
interface Product {
  id: number;
  name: string;
  price: number;
  description?: string;
  category?: string;
}

// Interface with method signatures
interface DatabaseConnection {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  query<T>(sql: string, params?: any[]): Promise<T[]>;
}

// Interface extending another interface
interface AdminUser extends User {
  role: 'admin';
  permissions: string[];
}

// Class implementing interface
class UserService implements DatabaseConnection {
  private connectionString: string;

  constructor(connectionString: string) {
    this.connectionString = connectionString;
  }

  async connect(): Promise<void> {
    console.log('Connecting to database...');
    // Implementation here
  }

  async disconnect(): Promise<void> {
    console.log('Disconnecting from database...');
    // Implementation here
  }

  async query<T>(sql: string, params?: any[]): Promise<T[]> {
    console.log(\`Executing query: \${sql}\`);
    // Implementation here
    return [];
  }

  async getUserById(id: number): Promise<User | null> {
    const users = await this.query<User>('SELECT * FROM users WHERE id = ?', [id]);
    return users[0] || null;
  }
}

// Abstract class
abstract class Shape {
  abstract getArea(): number;
  abstract getPerimeter(): number;

  // Concrete method
  describe(): string {
    return \`Area: \${this.getArea()}, Perimeter: \${this.getPerimeter()}\`;
  }
}

class Rectangle extends Shape {
  constructor(private width: number, private height: number) {
    super();
  }

  getArea(): number {
    return this.width * this.height;
  }

  getPerimeter(): number {
    return 2 * (this.width + this.height);
  }
}

class Circle extends Shape {
  constructor(private radius: number) {
    super();
  }

  getArea(): number {
    return Math.PI * this.radius * this.radius;
  }

  getPerimeter(): number {
    return 2 * Math.PI * this.radius;
  }
}

// Generic interface
interface Repository<T> {
  findById(id: string): Promise<T | null>;
  findAll(): Promise<T[]>;
  create(entity: T): Promise<T>;
  update(id: string, entity: Partial<T>): Promise<T | null>;
  delete(id: string): Promise<boolean>;
}

// Implementation of generic interface
class UserRepository implements Repository<User> {
  private users: Map<string, User> = new Map();

  async findById(id: string): Promise<User | null> {
    return this.users.get(id) || null;
  }

  async findAll(): Promise<User[]> {
    return Array.from(this.users.values());
  }

  async create(user: User): Promise<User> {
    this.users.set(user.id.toString(), user);
    return user;
  }

  async update(id: string, updates: Partial<User>): Promise<User | null> {
    const user = this.users.get(id);
    if (!user) return null;

    const updatedUser = { ...user, ...updates };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  async delete(id: string): Promise<boolean> {
    return this.users.delete(id);
  }
}`
        },
        {
          title: "Advanced Interface Patterns",
          language: "typescript",
          code: `// Discriminated unions
interface Square {
  kind: 'square';
  size: number;
}

interface Rectangle {
  kind: 'rectangle';
  width: number;
  height: number;
}

interface Circle {
  kind: 'circle';
  radius: number;
}

type Shape = Square | Rectangle | Circle;

function getArea(shape: Shape): number {
  switch (shape.kind) {
    case 'square':
      return shape.size * shape.size;
    case 'rectangle':
      return shape.width * shape.height;
    case 'circle':
      return Math.PI * shape.radius * shape.radius;
  }
}

// Index signatures
interface StringDictionary {
  [key: string]: string;
}

interface NumberDictionary {
  [key: string]: number;
}

// Hybrid types (functions with properties)
interface Counter {
  (start: number): string;
  interval: number;
  reset(): void;
}

function createCounter(): Counter {
  let count = 0;

  const counter = function(start: number) {
    count = start;
    return \`Count set to \${count}\`;
  } as Counter;

  counter.interval = 1000;
  counter.reset = function() {
    count = 0;
  };

  return counter;
}

// Interface for constructor
interface ClockConstructor {
  new (hour: number, minute: number): ClockInterface;
}

interface ClockInterface {
  tick(): void;
  currentTime: Date;
}

function createClock(
  ctor: ClockConstructor,
  hour: number,
  minute: number
): ClockInterface {
  return new ctor(hour, minute);
}

// Interface merging
interface Box {
  height: number;
  width: number;
}

interface Box {
  scale: number;
}

let box: Box = { height: 5, width: 6, scale: 10 };

// Declaration merging with functions
function buildLabel(name: string): string {
  return buildLabel.prefix + name + buildLabel.suffix;
}

namespace buildLabel {
  export let suffix = "";
  export let prefix = "Hello, ";
}

buildLabel(buildLabel.prefix + "TypeScript");`
        }
      ]
    },
    {
      title: "Generics and Advanced Types",
      content: "Generics provide a way to create reusable components that work with multiple types while maintaining type safety. Advanced types enable complex type transformations and conditional logic.\n\n**Generic Functions**: Generic functions can work with parameters of different types while preserving type information. They use type parameters in angle brackets.\n\n**Generic Classes**: Classes can be generic, allowing them to work with different types while maintaining type safety for their properties and methods.\n\n**Generic Constraints**: You can constrain generic types to have certain properties or methods using the `extends` keyword.\n\n**Advanced Types**: TypeScript provides utility types like `Partial<T>`, `Required<T>`, `Pick<T, K>`, and `Omit<T, K>` for common type transformations.\n\n**Conditional Types**: Conditional types enable type logic based on conditions, similar to ternary operators but for types.\n\n**Mapped Types**: Mapped types allow you to transform properties of existing types, creating new types based on existing ones.\n\n**Template Literal Types**: Template literal types provide string manipulation at the type level, enabling type-safe string operations.",
      keyTopics: [
        "Generic functions and classes",
        "Generic constraints and type bounds",
        "Utility types (Partial, Required, Pick, Omit)",
        "Conditional types and type guards",
        "Mapped types and keyof operator",
        "Template literal types"
      ],
      practicalExercises: [
        "Create generic data structures (stacks, queues, linked lists)",
        "Implement generic utility functions for type transformations",
        "Build type-safe API clients with generics",
        "Create conditional types for complex business logic",
        "Use mapped types for form validation schemas"
      ],
      codeExamples: [
        {
          title: "Generic Functions and Classes",
          language: "typescript",
          code: `// Generic function
function identity<T>(arg: T): T {
  return arg;
}

// Generic function with constraints
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

// Generic class
class GenericStack<T> {
  private items: T[] = [];

  push(item: T): void {
    this.items.push(item);
  }

  pop(): T | undefined {
    return this.items.pop();
  }

  peek(): T | undefined {
    return this.items[this.items.length - 1];
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  size(): number {
    return this.items.length;
  }
}

// Usage
const numberStack = new GenericStack<number>();
numberStack.push(1);
numberStack.push(2);
console.log(numberStack.pop()); // 2

const stringStack = new GenericStack<string>();
stringStack.push("hello");
stringStack.push("world");
console.log(stringStack.pop()); // "world"

// Generic interface
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
  timestamp: Date;
}

// Generic type alias
type Result<T, E = Error> = { success: true; data: T } | { success: false; error: E };

// Generic factory function
function createApiResponse<T>(data: T, status: number = 200): ApiResponse<T> {
  return {
    data,
    status,
    message: status === 200 ? 'Success' : 'Error',
    timestamp: new Date()
  };
}

// Generic constraint with interface
interface HasId {
  id: string | number;
}

function findById<T extends HasId>(items: T[], id: string | number): T | undefined {
  return items.find(item => item.id === id);
}

// Multiple type parameters
function mergeObjects<T, U>(obj1: T, obj2: U): T & U {
  return { ...obj1, ...obj2 };
}

// Default generic parameters
interface PaginationOptions<T = any> {
  page: number;
  limit: number;
  sortBy?: keyof T;
  sortOrder?: 'asc' | 'desc';
}

function paginate<T>(
  items: T[],
  options: PaginationOptions<T> = { page: 1, limit: 10 }
): { data: T[]; total: number; page: number; limit: number } {
  const { page, limit, sortBy, sortOrder = 'asc' } = options;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  let sortedItems = [...items];
  if (sortBy) {
    sortedItems.sort((a, b) => {
      const aValue = a[sortBy];
      const bValue = b[sortBy];

      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  }

  return {
    data: sortedItems.slice(startIndex, endIndex),
    total: items.length,
    page,
    limit
  };
}`
        },
        {
          title: "Advanced Types and Utility Types",
          language: "typescript",
          code: `// Utility Types
interface User {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
  isActive: boolean;
}

// Partial<T> - makes all properties optional
type PartialUser = Partial<User>;
// Equivalent to:
// type PartialUser = {
//   id?: number;
//   name?: string;
//   email?: string;
//   createdAt?: Date;
//   isActive?: boolean;
// }

// Required<T> - makes all properties required
type RequiredUser = Required<PartialUser>;

// Pick<T, K> - picks specific properties
type UserBasicInfo = Pick<User, 'id' | 'name' | 'email'>;

// Omit<T, K> - omits specific properties
type UserWithoutTimestamps = Omit<User, 'createdAt'>;

// Record<K, T> - creates an object type with keys of type K and values of type T
type UserRoles = Record<string, 'admin' | 'user' | 'moderator'>;
const roles: UserRoles = {
  'user1': 'admin',
  'user2': 'user'
};

// Extract<T, U> - extracts types that are assignable to U
type AdminOrModerator = Extract<'admin' | 'user' | 'moderator', 'admin' | 'moderator'>;

// Exclude<T, U> - excludes types that are assignable to U
type RegularUser = Exclude<'admin' | 'user' | 'moderator', 'admin'>;

// NonNullable<T> - excludes null and undefined
type NonNullableUser = NonNullable<User | null | undefined>;

// Parameters<T> - extracts parameter types from function type
function createUser(name: string, email: string, age?: number): User {
  return { id: 1, name, email, createdAt: new Date(), isActive: true };
}
type CreateUserParams = Parameters<typeof createUser>;
// Equivalent to: [name: string, email: string, age?: number | undefined]

// ReturnType<T> - extracts return type from function type
type CreateUserReturn = ReturnType<typeof createUser>;

// Conditional Types
type IsString<T> = T extends string ? 'yes' : 'no';
type Test1 = IsString<string>;  // 'yes'
type Test2 = IsString<number>;  // 'no'

// Nested conditional types
type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};

type ReadonlyUser = DeepReadonly<User>;

// Template Literal Types
type EventName = 'click' | 'hover' | 'focus';
type ElementType = 'button' | 'input' | 'div';

type EventHandler = \`on\${Capitalize<EventName>}\`;
type ElementEvent = \`\${ElementType}\${EventHandler}\`;

// Mapped Types
type OptionalUser = {
  [K in keyof User]?: User[K];
};

type ReadonlyUser2 = {
  readonly [K in keyof User]: User[K];
};

// Using keyof with mapped types
type UserKeys = keyof User; // 'id' | 'name' | 'email' | 'createdAt' | 'isActive'

type UserFields = {
  [K in UserKeys]: User[K];
};

// Advanced mapped type with template literals
type EventHandlers<T> = {
  [K in keyof T as \`on\${Capitalize<string & K>}\`]: (value: T[K]) => void;
};

type UserEventHandlers = EventHandlers<User>;
// Creates: {
//   onId: (value: number) => void;
//   onName: (value: string) => void;
//   onEmail: (value: string) => void;
//   onCreatedAt: (value: Date) => void;
//   onIsActive: (value: boolean) => void;
// }

// Type Guards
function isString(value: any): value is string {
  return typeof value === 'string';
}

function isUser(obj: any): obj is User {
  return obj && typeof obj.id === 'number' && typeof obj.name === 'string';
}

// Usage with type guards
function processValue(value: string | number | User) {
  if (isString(value)) {
    console.log('String:', value.toUpperCase());
  } else if (typeof value === 'number') {
    console.log('Number:', value.toFixed(2));
  } else if (isUser(value)) {
    console.log('User:', value.name);
  }
}`
        }
      ]
    },
    {
      title: "TypeScript with React",
      content: "TypeScript provides excellent support for React development, offering type safety for components, props, state, and event handlers. This combination helps catch errors early and improves the developer experience.\n\n**Component Props**: Define interfaces for component props to ensure type safety and provide better IDE support with autocomplete and error detection.\n\n**State Management**: TypeScript works seamlessly with React's useState, useReducer, and context APIs, providing type safety for state and actions.\n\n**Event Handlers**: TypeScript provides specific types for DOM events, form events, and custom events, ensuring proper event handling.\n\n**Hooks**: All React hooks can be used with TypeScript, with proper typing for parameters and return values.\n\n**Generic Components**: Create reusable components that work with different data types while maintaining type safety.\n\n**Custom Hooks**: TypeScript enables better typing for custom hooks, ensuring proper usage and return types.\n\n**Error Boundaries**: Implement error boundaries with proper TypeScript typing for error handling.",
      keyTopics: [
        "Typed React components and props",
        "TypeScript with React hooks",
        "Event handling with proper types",
        "Generic React components",
        "Type-safe state management",
        "Custom hooks with TypeScript"
      ],
      practicalExercises: [
        "Convert existing React components to TypeScript",
        "Implement type-safe form handling with React Hook Form",
        "Create generic table components with TypeScript",
        "Build type-safe context providers",
        "Implement error boundaries with proper typing"
      ],
      codeExamples: [
        {
          title: "Typed React Components",
          language: "typescript",
          code: `import React, { useState, useEffect } from 'react';

// Interface for component props
interface UserCardProps {
  user: User;
  onEdit?: (user: User) => void;
  onDelete?: (id: number) => void;
  isLoading?: boolean;
}

// Functional component with typed props
const UserCard: React.FC<UserCardProps> = ({
  user,
  onEdit,
  onDelete,
  isLoading = false
}) => {
  const handleEdit = () => {
    onEdit?.(user);
  };

  const handleDelete = () => {
    onDelete?.(user.id);
  };

  if (isLoading) {
    return <div className="user-card loading">Loading...</div>;
  }

  return (
    <div className="user-card">
      <h3>{user.name}</h3>
      <p>{user.email}</p>
      <p>Status: {user.isActive ? 'Active' : 'Inactive'}</p>
      <div className="actions">
        {onEdit && (
          <button onClick={handleEdit}>Edit</button>
        )}
        {onDelete && (
          <button onClick={handleDelete}>Delete</button>
        )}
      </div>
    </div>
  );
};

// Generic component
interface ListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  keyExtractor: (item: T, index: number) => string | number;
  emptyMessage?: string;
}

function List<T>({
  items,
  renderItem,
  keyExtractor,
  emptyMessage = 'No items found'
}: ListProps<T>) {
  if (items.length === 0) {
    return <div className="empty-list">{emptyMessage}</div>;
  }

  return (
    <ul className="list">
      {items.map((item, index) => (
        <li key={keyExtractor(item, index)}>
          {renderItem(item, index)}
        </li>
      ))}
    </ul>
  );
}

// Usage of generic component
const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  return (
    <List
      items={users}
      renderItem={(user) => <UserCard user={user} />}
      keyExtractor={(user) => user.id}
      emptyMessage="No users found"
    />
  );
};

// Form component with typed events
interface LoginFormProps {
  onSubmit: (credentials: { email: string; password: string }) => void;
  isLoading?: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, isLoading }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({ email, password });
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={handleEmailChange}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
          required
        />
      </div>
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
};

// Custom hook with TypeScript
function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(\`Error reading localStorage key "\${key}":\`, error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((prev: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(\`Error setting localStorage key "\${key}":\`, error);
    }
  };

  return [storedValue, setValue];
}

// Usage of custom hook
const App: React.FC = () => {
  const [user, setUser] = useLocalStorage<User | null>('user', null);

  return (
    <div>
      {user ? (
        <div>
          <h1>Welcome, {user.name}!</h1>
          <button onClick={() => setUser(null)}>Logout</button>
        </div>
      ) : (
        <LoginForm
          onSubmit={(credentials) => {
            // Simulate login
            setUser({
              id: 1,
              name: 'John Doe',
              email: credentials.email,
              createdAt: new Date(),
              isActive: true
            });
          }}
        />
      )}
    </div>
  );
};

export default App;`
        },
        {
          title: "TypeScript with React Context",
          language: "typescript",
          code: `import React, { createContext, useContext, useReducer, ReactNode } from 'react';

// Types for state
interface AppState {
  user: User | null;
  theme: 'light' | 'dark';
  isLoading: boolean;
  error: string | null;
}

// Action types
type AppAction =
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'SET_THEME'; payload: 'light' | 'dark' }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'CLEAR_ERROR' };

// Context type
interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  toggleTheme: () => void;
}

// Create context with undefined as default
const AppContext = createContext<AppContextType | undefined>(undefined);

// Reducer function
const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload, error: null };
    case 'SET_THEME':
      return { ...state, theme: action.payload };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, isLoading: false };
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    default:
      return state;
  }
};

// Initial state
const initialState: AppState = {
  user: null,
  theme: 'light',
  isLoading: false,
  error: null
};

// Provider component
interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const login = async (email: string, password: string): Promise<void> => {
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'CLEAR_ERROR' });

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Simulate successful login
      const user: User = {
        id: 1,
        name: 'John Doe',
        email,
        createdAt: new Date(),
        isActive: true
      };

      dispatch({ type: 'SET_USER', payload: user });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Login failed. Please try again.' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const logout = (): void => {
    dispatch({ type: 'SET_USER', payload: null });
  };

  const toggleTheme = (): void => {
    const newTheme = state.theme === 'light' ? 'dark' : 'light';
    dispatch({ type: 'SET_THEME', payload: newTheme });
  };

  const contextValue: AppContextType = {
    state,
    dispatch,
    login,
    logout,
    toggleTheme
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the context
export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

// Usage in components
const Header: React.FC = () => {
  const { state, logout, toggleTheme } = useApp();

  return (
    <header>
      <h1>My App</h1>
      <div>
        <button onClick={toggleTheme}>
          Switch to {state.theme === 'light' ? 'Dark' : 'Light'} Mode
        </button>
        {state.user && (
          <button onClick={logout}>Logout</button>
        )}
      </div>
    </header>
  );
};

const LoginForm: React.FC = () => {
  const { login, state } = useApp();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit" disabled={state.isLoading}>
        {state.isLoading ? 'Logging in...' : 'Login'}
      </button>
      {state.error && <p style={{ color: 'red' }}>{state.error}</p>}
    </form>
  );
};

const App: React.FC = () => {
  const { state } = useApp();

  return (
    <div className={state.theme}>
      <Header />
      {state.user ? (
        <div>
          <h2>Welcome, {state.user.name}!</h2>
          <p>Email: {state.user.email}</p>
        </div>
      ) : (
        <LoginForm />
      )}
    </div>
  );
};

export default App;`
        }
      ]
    },
    {
      title: "TypeScript with Node.js",
      content: "TypeScript provides excellent support for Node.js development, offering type safety for backend APIs, database operations, and server-side logic. This combination improves code quality and developer productivity.\n\n**Express with TypeScript**: TypeScript enhances Express.js development with typed request/response objects, middleware functions, and route handlers.\n\n**API Development**: Create type-safe REST APIs with proper request/response typing, validation, and error handling.\n\n**Database Integration**: TypeScript works seamlessly with database ORMs like TypeORM, Mongoose, and Prisma, providing type safety for database operations.\n\n**Configuration Management**: Use TypeScript for configuration files with proper typing and validation.\n\n**Error Handling**: Implement comprehensive error handling with custom error types and proper TypeScript typing.\n\n**Middleware**: Create typed middleware functions for authentication, validation, and logging.\n\n**Testing**: TypeScript integrates well with testing frameworks like Jest, providing type safety for test code.",
      keyTopics: [
        "Express.js with TypeScript",
        "Type-safe API development",
        "Database integration with TypeScript",
        "Configuration management",
        "Error handling patterns",
        "Middleware typing"
      ],
      practicalExercises: [
        "Build a REST API with Express and TypeScript",
        "Implement database models with TypeORM",
        "Create typed middleware for authentication",
        "Build configuration management with validation",
        "Implement comprehensive error handling",
        "Create type-safe database queries"
      ],
      codeExamples: [
        {
          title: "Express API with TypeScript",
          language: "typescript",
          code: `import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';

// Types
interface User {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
  isActive: boolean;
}

interface CreateUserRequest {
  name: string;
  email: string;
}

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: Date;
}

// Custom error class
class ApiError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public isOperational = true
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// Middleware for error handling
const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (error instanceof ApiError) {
    res.status(error.statusCode).json({
      success: false,
      error: error.message,
      timestamp: new Date()
    });
  } else {
    console.error('Unexpected error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      timestamp: new Date()
    });
  }
};

// Middleware for request validation
const validateUserData = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { name, email } = req.body as CreateUserRequest;

  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    throw new ApiError(400, 'Name is required and must be a non-empty string');
  }

  if (!email || typeof email !== 'string' || !email.includes('@')) {
    throw new ApiError(400, 'Valid email is required');
  }

  next();
};

// Generic response helper
const sendResponse = <T>(
  res: Response,
  statusCode: number,
  data?: T,
  error?: string
): void => {
  const response: ApiResponse<T> = {
    success: !error,
    timestamp: new Date()
  };

  if (data !== undefined) {
    response.data = data;
  }

  if (error) {
    response.error = error;
  }

  res.status(statusCode).json(response);
};

// In-memory user store (replace with database in production)
let users: User[] = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    createdAt: new Date(),
    isActive: true
  }
];

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Routes
app.get('/api/users', (req: Request, res: Response): void => {
  sendResponse(res, 200, users);
});

app.get('/api/users/:id', (req: Request, res: Response): void => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    throw new ApiError(400, 'Invalid user ID');
  }

  const user = users.find(u => u.id === id);

  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  sendResponse(res, 200, user);
});

app.post('/api/users', validateUserData, (req: Request, res: Response): void => {
  const { name, email } = req.body as CreateUserRequest;

  // Check if email already exists
  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    throw new ApiError(409, 'Email already exists');
  }

  const newUser: User = {
    id: Math.max(...users.map(u => u.id), 0) + 1,
    name: name.trim(),
    email: email.toLowerCase().trim(),
    createdAt: new Date(),
    isActive: true
  };

  users.push(newUser);
  sendResponse(res, 201, newUser);
});

app.put('/api/users/:id', validateUserData, (req: Request, res: Response): void => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    throw new ApiError(400, 'Invalid user ID');
  }

  const userIndex = users.findIndex(u => u.id === id);

  if (userIndex === -1) {
    throw new ApiError(404, 'User not found');
  }

  const { name, email } = req.body as CreateUserRequest;

  // Check if email already exists (excluding current user)
  const existingUser = users.find(u => u.email === email && u.id !== id);
  if (existingUser) {
    throw new ApiError(409, 'Email already exists');
  }

  users[userIndex] = {
    ...users[userIndex],
    name: name.trim(),
    email: email.toLowerCase().trim()
  };

  sendResponse(res, 200, users[userIndex]);
});

app.delete('/api/users/:id', (req: Request, res: Response): void => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    throw new ApiError(400, 'Invalid user ID');
  }

  const userIndex = users.findIndex(u => u.id === id);

  if (userIndex === -1) {
    throw new ApiError(404, 'User not found');
  }

  const deletedUser = users.splice(userIndex, 1)[0];
  sendResponse(res, 200, deletedUser);
});

// Health check endpoint
app.get('/api/health', (req: Request, res: Response): void => {
  sendResponse(res, 200, { status: 'OK', timestamp: new Date() });
});

// Error handling middleware (must be last)
app.use(errorHandler);

// 404 handler
app.use((req: Request, res: Response): void => {
  throw new ApiError(404, 'Route not found');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});

export default app;`
        },
        {
          title: "TypeScript with Database Integration",
          language: "typescript",
          code: `import mongoose, { Document, Schema, Model } from 'mongoose';

// Interface for the document
interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

// Interface for the model
interface IUserModel extends Model<IUser> {
  findByEmail(email: string): Promise<IUser | null>;
}

// Schema definition
const userSchema = new Schema<IUser, IUserModel>({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [50, 'Name cannot exceed 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters'],
    select: false // Don't include password in queries by default
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for full name
userSchema.virtual('fullName').get(function(this: IUser) {
  return this.name;
});

// Instance method
userSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  return candidatePassword === this.password; // In real app, use bcrypt
};

// Static method
userSchema.statics.findByEmail = function(email: string): Promise<IUser | null> {
  return this.findOne({ email: email.toLowerCase() });
};

// Pre-save middleware
userSchema.pre<IUser>('save', async function(next) {
  if (!this.isModified('password')) return next();

  // Hash password here in real implementation
  // this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Create and export the model
const User = mongoose.model<IUser, IUserModel>('User', userSchema);

// Generic repository pattern
class Repository<T extends Document> {
  constructor(private model: Model<T>) {}

  async findById(id: string): Promise<T | null> {
    return this.model.findById(id);
  }

  async findAll(filter: Partial<T> = {}): Promise<T[]> {
    return this.model.find(filter);
  }

  async create(data: Partial<T>): Promise<T> {
    const document = new this.model(data);
    return document.save();
  }

  async update(id: string, data: Partial<T>): Promise<T | null> {
    return this.model.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.model.findByIdAndDelete(id);
    return !!result;
  }
}

// Service layer
class UserService {
  private repository: Repository<IUser>;

  constructor() {
    this.repository = new Repository(User);
  }

  async getUserById(id: string): Promise<IUser | null> {
    return this.repository.findById(id);
  }

  async getUserByEmail(email: string): Promise<IUser | null> {
    return User.findByEmail(email);
  }

  async createUser(userData: {
    name: string;
    email: string;
    password: string;
    role?: 'user' | 'admin';
  }): Promise<IUser> {
    // Check if user already exists
    const existingUser = await this.getUserByEmail(userData.email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    return this.repository.create(userData);
  }

  async updateUser(id: string, updateData: Partial<IUser>): Promise<IUser | null> {
    return this.repository.update(id, updateData);
  }

  async deleteUser(id: string): Promise<boolean> {
    return this.repository.delete(id);
  }

  async getAllUsers(): Promise<IUser[]> {
    return this.repository.findAll();
  }
}

// Controller with proper typing
interface AuthenticatedRequest extends Request {
  user?: IUser;
}

class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  getUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;

      if (!id) {
        res.status(400).json({ error: 'User ID is required' });
        return;
      }

      const user = await this.userService.getUserById(id);

      if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
      }

      res.json({ user });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  createUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const userData = req.body;

      const user = await this.userService.createUser(userData);
      res.status(201).json({ user });
    } catch (error) {
      if (error.message.includes('already exists')) {
        res.status(409).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  };

  updateUser = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const updateData = req.body;

      const user = await this.userService.updateUser(id, updateData);

      if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
      }

      res.json({ user });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  deleteUser = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
      const { id } = req.params;

      const deleted = await this.userService.deleteUser(id);

      if (!deleted) {
        res.status(404).json({ error: 'User not found' });
        return;
      }

      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };
}

export { User, UserService, UserController };
export type { IUser };`
        }
      ]
    }
  ],
  projects: [
    {
      title: "Type-Safe E-commerce Platform",
      description: "Build a complete e-commerce platform using TypeScript with React frontend and Node.js backend, emphasizing type safety throughout the application",
      difficulty: "advanced",
      estimatedHours: 45,
      technologies: ["TypeScript", "React", "Node.js", "Express", "MongoDB", "TypeORM"],
      features: [
        "Type-safe React components with proper prop validation",
        "Express API with comprehensive TypeScript typing",
        "Database models with TypeORM and type safety",
        "Generic utility functions for common operations",
        "Custom hooks with proper TypeScript support",
        "Error handling with typed error classes",
        "Configuration management with validation",
        "Unit and integration tests with type safety",
        "API documentation generation from TypeScript types"
      ]
    },
    {
      title: "TypeScript Design System",
      description: "Create a comprehensive design system library with TypeScript, including components, utilities, and type definitions",
      difficulty: "intermediate",
      estimatedHours: 30,
      technologies: ["TypeScript", "React", "Storybook", "Styled Components"],
      features: [
        "Reusable React components with TypeScript",
        "Theme system with type-safe theming",
        "Utility functions with generic type support",
        "Component variants using discriminated unions",
        "Form components with validation typing",
        "Icon system with type-safe icon names",
        "Animation utilities with TypeScript",
        "Documentation with Storybook and TypeScript"
      ]
    },
    {
      title: "Type-Safe GraphQL API",
      description: "Build a GraphQL API with TypeScript, implementing type safety from database to client",
      difficulty: "advanced",
      estimatedHours: 40,
      technologies: ["TypeScript", "Node.js", "GraphQL", "Apollo Server", "TypeORM"],
      features: [
        "GraphQL schema with TypeScript type generation",
        "Type-safe resolvers with automatic type checking",
        "Database integration with type-safe queries",
        "Custom scalars with TypeScript support",
        "Authentication and authorization with types",
        "Error handling with typed GraphQL errors",
        "Testing with type-safe mock data",
        "Code generation for client-side TypeScript types"
      ]
    }
  ],
  assessments: {
    quiz: [
      {
        question: "What is the primary benefit of using TypeScript over JavaScript?",
        options: [
          "Faster runtime performance",
          "Static type checking and better IDE support",
          "Smaller bundle size",
          "Automatic code optimization"
        ],
        correctAnswer: 1,
        explanation: "TypeScript provides static type checking, which helps catch errors at compile time and provides better IDE support with autocomplete and refactoring."
      },
      {
        question: "Which TypeScript feature allows creating reusable components that work with multiple types?",
        options: [
          "Interfaces",
          "Classes",
          "Generics",
          "Enums"
        ],
        correctAnswer: 2,
        explanation: "Generics allow you to create reusable components that can work with multiple types while maintaining type safety."
      },
      {
        question: "What does the 'extends' keyword do in TypeScript generics?",
        options: [
          "Creates a new class that inherits from another",
          "Constrains the generic type to have certain properties",
          "Extends the functionality of an existing type",
          "Creates a union type"
        ],
        correctAnswer: 1,
        explanation: "In generics, 'extends' is used to constrain the generic type to have certain properties or methods."
      },
      {
        question: "Which utility type makes all properties of a type optional?",
        options: [
          "Required<T>",
          "Partial<T>",
          "Pick<T, K>",
          "Omit<T, K>"
        ],
        correctAnswer: 1,
        explanation: "Partial<T> makes all properties of type T optional."
      },
      {
        question: "What is a discriminated union in TypeScript?",
        options: [
          "A union type with a common property that can be used to discriminate between types",
          "A type that can be either discriminated or not",
          "A union of primitive types only",
          "A type used for mathematical operations"
        ],
        correctAnswer: 0,
        explanation: "A discriminated union is a union type where each type has a common property (discriminant) that can be used to determine which type it is."
      }
    ],
    evaluation: [
      {
        scenario: "You're migrating a large JavaScript codebase to TypeScript. The team is concerned about the migration process and maintaining productivity during the transition.",
        questions: [
          "What strategy would you recommend for migrating the codebase incrementally?",
          "How would you handle existing JavaScript files during the migration?",
          "What tools and configurations would you set up to support the migration?"
        ]
      },
      {
        scenario: "Your team is building a complex React application with multiple developers. You want to ensure type safety and consistency across the codebase.",
        questions: [
          "What TypeScript configurations would you implement for a large React project?",
          "How would you establish coding standards and type definitions for the team?",
          "What strategies would you use to handle third-party libraries without TypeScript support?"
        ]
      }
    ]
  },
  aiPrompts: [
    "How do I set up TypeScript in a new project?",
    "What's the difference between interface and type in TypeScript?",
    "How do I use generics in TypeScript?",
    "How do I type React components with TypeScript?",
    "How do I handle async operations with TypeScript?",
    "What's the best way to organize TypeScript code?",
    "How do I migrate from JavaScript to TypeScript?",
    "How do I use utility types in TypeScript?",
    "How do I create custom types in TypeScript?",
    "How do I handle errors with TypeScript?",
    "How do I configure TypeScript for different environments?",
    "How do I use decorators in TypeScript?"
  ],
  resources: [
    {
      title: "TypeScript Handbook",
      type: "documentation",
      url: "https://www.typescriptlang.org/docs/",
      description: "Official TypeScript documentation with comprehensive guides and reference"
    },
    {
      title: "TypeScript Deep Dive",
      type: "book",
      url: "https://basarat.gitbook.io/typescript/",
      description: "Free online book covering advanced TypeScript concepts"
    },
    {
      title: "React TypeScript Cheatsheet",
      type: "guide",
      url: "https://react-typescript-cheatsheet.netlify.app/",
      description: "Comprehensive guide for using TypeScript with React"
    },
    {
      title: "TypeScript Utility Types",
      type: "article",
      url: "https://www.typescriptlang.org/docs/handbook/utility-types.html",
      description: "Official documentation for built-in utility types"
    },
    {
      title: "DefinitelyTyped",
      type: "repository",
      url: "https://github.com/DefinitelyTyped/DefinitelyTyped",
      description: "Repository of TypeScript type definitions for JavaScript libraries"
    }
  ],
  toolsRequired: [
    "Node.js (v14+)",
    "npm or yarn package manager",
    "TypeScript compiler (tsc)",
    "Visual Studio Code with TypeScript extensions",
    "ts-node for running TypeScript in development",
    "TypeScript ESLint for code linting",
    "Prettier for code formatting",
    "@types packages for JavaScript libraries",
    "ts-jest for testing TypeScript code",
    "TypeScript declaration files (.d.ts)",
    "Webpack or other bundlers with TypeScript support"
  ],
  bestPractices: [
    "Enable strict type checking in tsconfig.json",
    "Use interfaces for object shapes and contracts",
    "Prefer const assertions for literal types",
    "Use union types instead of any when possible",
    "Leverage utility types for common transformations",
    "Create specific types for API responses and requests",
    "Use generics for reusable components and functions",
    "Implement proper error handling with custom error types",
    "Use discriminated unions for complex state management",
    "Keep type definitions close to their usage",
    "Use barrel exports (index.ts) for clean imports",
    "Configure path mapping for absolute imports",
    "Use type guards for runtime type checking",
    "Document complex types with JSDoc comments",
    "Use the satisfies operator for type validation",
    "Implement gradual migration strategies for large codebases",
    "Use TypeScript's module augmentation for extending libraries",
    "Configure declaration files for better IDE support",
    "Use conditional types for advanced type logic",
    "Implement proper access modifiers in classes",
    "Use readonly modifiers for immutable properties",
    "Leverage template literal types for string manipulation",
    "Configure TypeScript for different build environments",
    "Use project references for monorepo setups",
    "Implement proper type testing strategies"
  ],
  commonPitfalls: [
    "Using any type instead of proper type definitions",
    "Not enabling strict mode in TypeScript configuration",
    "Overusing type assertions instead of proper typing",
    "Creating circular type dependencies",
    "Not handling null and undefined properly",
    "Using classes when interfaces would suffice",
    "Not using utility types for common transformations",
    "Creating overly complex generic constraints",
    "Not updating type definitions when code changes",
    "Using type assertions to bypass type errors",
    "Not configuring proper module resolution",
    "Ignoring TypeScript compiler errors",
    "Using outdated TypeScript versions",
    "Not using declaration merging properly",
    "Creating types that are too specific or too generic",
    "Not using type guards for union types",
    "Overusing function overloads instead of union types",
    "Not configuring proper source maps",
    "Using type comments instead of proper type annotations",
    "Not leveraging TypeScript's advanced type features",
    "Creating unnecessary type complexity",
    "Not using the latest TypeScript features",
    "Ignoring performance implications of complex types",
    "Not using TypeScript with popular frameworks properly",
    "Creating inconsistent naming conventions for types",
    "Not using TypeScript's error reporting effectively",
    "Over-relying on type inference instead of explicit types",
    "Not using conditional types when appropriate",
    "Creating types without considering their usage patterns",
    "Not using TypeScript's built-in utility types"
  ],
  careerRelevance: [
    "TypeScript is the most requested skill in JavaScript job postings",
    "Type safety reduces bugs and improves code maintainability",
    "TypeScript is used by major companies like Google, Microsoft, and Facebook",
    "Strong typing leads to better developer experience and productivity",
    "TypeScript enables better code documentation and API design",
    "Type-safe code is easier to refactor and maintain at scale",
    "TypeScript integration with modern frameworks is essential",
    "Type safety improves team collaboration and code reviews",
    "TypeScript enables better testing and debugging capabilities",
    "Type-safe APIs provide better developer experience",
    "TypeScript is crucial for large-scale enterprise applications",
    "Type safety reduces runtime errors and improves reliability",
    "TypeScript enables advanced IDE features and tooling",
    "Type-safe code is more secure and less prone to vulnerabilities",
    "TypeScript is the standard for modern JavaScript development",
    "Type safety improves code reusability and modularity",
    "TypeScript enables better performance optimization",
    "Type-safe code is easier to understand and onboard new developers",
    "TypeScript is essential for cloud-native and microservices development",
    "Type safety enables better integration with other typed languages",
    "TypeScript improves the overall software development lifecycle",
    "Type-safe code enables better automated testing and CI/CD",
    "TypeScript is crucial for building scalable web applications",
    "Type safety enables better error handling and recovery",
    "TypeScript is the future of JavaScript development"
  ]
};