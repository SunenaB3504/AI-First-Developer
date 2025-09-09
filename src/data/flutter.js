export default {
  id: "flutter",
  tier: 5,
  name: "Flutter",
  description: "Master cross-platform mobile development with Flutter and Dart. Build beautiful, natively compiled applications for mobile, web, and desktop from a single codebase with comprehensive coverage of Material Design, state management, and platform integration.",
  difficulty: "advanced",
  estimatedHours: 40,
  prerequisites: ["javascript", "react", "nodejs"],
  learningObjectives: [
    "Master Dart programming language fundamentals and advanced features",
    "Build beautiful UIs with Flutter widgets and Material Design",
    "Implement state management with Provider, Riverpod, and BLoC patterns",
    "Create responsive layouts that work across different screen sizes",
    "Integrate platform-specific features using platform channels",
    "Handle asynchronous operations with Futures, Streams, and async/await",
    "Implement navigation and routing in Flutter applications",
    "Use Firebase for backend services and data persistence",
    "Optimize Flutter app performance and reduce bundle size",
    "Implement testing strategies for Flutter applications",
    "Handle app lifecycle and background processing",
    "Create custom widgets and reusable component libraries",
    "Implement internationalization and localization",
    "Use Flutter with popular backend services and APIs",
    "Deploy Flutter apps to app stores and web platforms",
    "Debug and troubleshoot Flutter applications effectively"
  ],
  sections: [
    {
      title: "Dart Programming Fundamentals",
      content: "Dart is the programming language used by Flutter for building cross-platform applications. It combines the best features of modern programming languages with excellent performance and developer experience.\n\n**Object-Oriented**: Dart is a true object-oriented language with classes, interfaces, and inheritance. Everything in Dart is an object, including numbers and functions.\n\n**Strong Typing**: Dart supports both static and dynamic typing, allowing for type safety while maintaining flexibility.\n\n**Async Programming**: Dart provides excellent support for asynchronous programming with async/await, Futures, and Streams.\n\n**Garbage Collection**: Dart uses a generational garbage collector for efficient memory management.\n\n**Just-In-Time (JIT) and Ahead-Of-Time (AOT)**: Dart uses JIT for development (hot reload) and AOT for production (fast startup and execution).\n\n**Null Safety**: Dart's sound null safety helps prevent null reference errors at compile time.",
      keyTopics: [
        "Dart syntax and basic constructs",
        "Object-oriented programming in Dart",
        "Type system and generics",
        "Asynchronous programming patterns",
        "Error handling and exceptions",
        "Collections and data structures"
      ],
      practicalExercises: [
        "Set up Dart development environment",
        "Create basic Dart programs with classes and functions",
        "Implement data structures using Dart collections",
        "Handle asynchronous operations with Futures and Streams",
        "Create generic classes and functions",
        "Implement error handling and custom exceptions"
      ],
      codeExamples: [
        {
          title: "Dart Basics and Object-Oriented Programming",
          language: "dart",
          code: `// Basic Dart syntax and types
void main() {
  // Variables and type inference
  var name = 'Flutter'; // String
  var year = 2024; // int
  var isAwesome = true; // bool
  var pi = 3.14159; // double

  // Explicit typing
  String greeting = 'Hello, Dart!';
  int age = 25;
  double height = 175.5;
  bool isStudent = false;

  // Nullable types (with null safety)
  String? nullableName;
  int? nullableAge;

  // Late initialization
  late String lateName;
  lateName = 'Initialized later';

  // Final and const
  final String finalName = 'Cannot be reassigned';
  const int maxRetries = 3;

  // Collections
  List<String> fruits = ['Apple', 'Banana', 'Orange'];
  Set<String> uniqueFruits = {'Apple', 'Banana', 'Apple'}; // Only unique values
  Map<String, int> scores = {'Alice': 95, 'Bob': 87, 'Charlie': 92};

  // Control flow
  if (age >= 18) {
    print('Adult');
  } else {
    print('Minor');
  }

  // Loops
  for (var fruit in fruits) {
    print(fruit);
  }

  // Switch statement
  switch (greeting) {
    case 'Hello, Dart!':
      print('Greeting received');
      break;
    default:
      print('Unknown greeting');
  }

  // Functions
  String greet(String name, [String? title]) {
    if (title != null) {
      return 'Hello, \${title} \${name}!';
    }
    return 'Hello, \${name}!';
  }

  // Arrow functions
  int add(int a, int b) => a + b;
  void printMessage(String message) => print(message);

  // Optional parameters
  void configure({String? theme, int? fontSize, bool? darkMode}) {
    theme ??= 'light';
    fontSize ??= 14;
    darkMode ??= false;

    print('Theme: \${theme}, Font Size: \${fontSize}, Dark Mode: \${darkMode}');
  }

  // Named parameters
  configure(theme: 'dark', fontSize: 16);

  print(greet('World'));
  print('Sum: \${add(5, 3)}');
}

// Classes and OOP
class Person {
  // Properties
  String name;
  int age;
  String? email;

  // Constructor
  Person(this.name, this.age, {this.email});

  // Named constructor
  Person.fromJson(Map<String, dynamic> json)
      : name = json['name'],
        age = json['age'],
        email = json['email'];

  // Methods
  void introduce() {
    print('Hi, I\\'m \${name} and I\\'m \${age} years old.');
  }

  // Getter
  String get displayName => name.toUpperCase();

  // Setter
  set displayName(String value) {
    name = value.toLowerCase();
  }

  // toString override
  @override
  String toString() => 'Person(name: \${name}, age: \${age}, email: \${email})';
}

// Inheritance
class Student extends Person {
  String school;
  List<double> grades;

  Student(String name, int age, this.school, {String? email})
      : grades = [],
        super(name, age, email: email);

  void addGrade(double grade) {
    if (grade >= 0 && grade <= 100) {
      grades.add(grade);
    }
  }

  double get averageGrade {
    if (grades.isEmpty) return 0.0;
    return grades.reduce((a, b) => a + b) / grades.length;
  }

  @override
  void introduce() {
    super.introduce();
    print('I study at \${school} and my average grade is \${averageGrade.toStringAsFixed(1)}');
  }
}

// Abstract classes
abstract class Shape {
  double get area;
  double get perimeter;

  void draw() {
    print('Drawing a shape');
  }
}

class Circle extends Shape {
  double radius;

  Circle(this.radius);

  @override
  double get area => 3.14159 * radius * radius;

  @override
  double get perimeter => 2 * 3.14159 * radius;

  @override
  void draw() {
    print('Drawing a circle with radius \${radius}');
  }
}

class Rectangle extends Shape {
  double width;
  double height;

  Rectangle(this.width, this.height);

  @override
  double get area => width * height;

  @override
  double get perimeter => 2 * (width + height);
}

// Mixins
mixin Logger {
  void log(String message) {
    final timestamp = DateTime.now().toIso8601String();
    print('[\\${timestamp}] \\${message}');
  }
}

class Service with Logger {
  void performAction() {
    log('Action started');
    // Perform some action
    log('Action completed');
  }
}

// Enums
enum Status {
  pending,
  active,
  inactive,
  deleted
}

enum Priority {
  low(1),
  medium(2),
  high(3);

  const Priority(this.value);
  final int value;
}

// Generics
class Stack<T> {
  final List<T> _items = [];

  void push(T item) => _items.add(item);
  T pop() => _items.removeLast();
  T peek() => _items.last;
  bool get isEmpty => _items.isEmpty;
  bool get isNotEmpty => _items.isNotEmpty;

  @override
  String toString() => _items.toString();
}

// Generic functions
T findMax<T extends Comparable<T>>(List<T> items) {
  if (items.isEmpty) throw ArgumentError('List cannot be empty');
  return items.reduce((a, b) => a.compareTo(b) > 0 ? a : b);
}

// Usage examples
void demonstrateOOP() {
  // Create instances
  var person = Person('Alice', 30, email: 'alice@example.com');
  person.introduce();
  print(person.displayName);

  var student = Student('Bob', 20, 'University of Dart');
  student.addGrade(85.5);
  student.addGrade(92.0);
  student.introduce();

  // Shapes
  var circle = Circle(5.0);
  print('Circle area: \\${circle.area}');
  circle.draw();

  var rectangle = Rectangle(10.0, 8.0);
  print('Rectangle area: \\${rectangle.area}');

  // Mixins
  var service = Service();
  service.performAction();

  // Generics
  var stringStack = Stack<String>();
  stringStack.push('Hello');
  stringStack.push('World');
  print('Stack: \\${stringStack}');
  print('Popped: \\${stringStack.pop()}');

  var numbers = [3, 1, 4, 1, 5, 9, 2, 6];
  print('Max number: \\${findMax(numbers)}');

  var words = ['apple', 'banana', 'cherry'];
  print('Max word: \\${findMax(words)}');
}
    },
    {
      title: "Flutter Widgets and Material Design",
      content: "Flutter's widget system is the core of building user interfaces. Everything in Flutter is a widget - from simple text to complex layouts. Material Design provides a comprehensive design system that ensures consistency across platforms.\n\n**Widget Tree**: Flutter apps are built as a tree of widgets, where each widget nests inside another.\n\n**Stateless vs Stateful**: Stateless widgets are immutable and don't change over time, while stateful widgets can rebuild when their state changes.\n\n**Material Design**: Google's design language that provides guidelines for visual, motion, and interaction design.\n\n**Themes**: Customize the look and feel of your app with themes and theme data.\n\n**Responsive Design**: Create layouts that adapt to different screen sizes and orientations.\n\n**Custom Widgets**: Build reusable components by composing existing widgets.",
      keyTopics: [
        "Widget composition and nesting",
        "StatelessWidget vs StatefulWidget",
        "Material Design components",
        "Layout widgets (Container, Row, Column, Stack)",
        "Theme customization",
        "Custom widget creation",
        "Responsive design patterns"
      ],
      practicalExercises: [
        "Create basic Flutter app structure",
        "Build layouts using Rows and Columns",
        "Implement Material Design components",
        "Create custom stateless widgets",
        "Build stateful widgets with user interaction",
        "Customize app themes and colors",
        "Implement responsive layouts"
      ],
      codeExamples: [
        {
          title: "Basic Flutter App Structure and Widgets",
          language: "dart",
          code: 'import \\'package:flutter/material.dart\\';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: \\'Flutter Demo\\',
      theme: ThemeData(
        primarySwatch: Colors.blue,
        useMaterial3: true,
      ),
      home: const MyHomePage(),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key});

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  int _counter = 0;

  void _incrementCounter() {
    setState(() {
      _counter++;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text(\\'Flutter Demo Home Page\\'),
        backgroundColor: Theme.of(context).colorScheme.inversePrimary,
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            const Text(
              \\'You have pushed the button this many times:\\',
            ),
            Text(
              \\'$_counter\\',
              style: Theme.of(context).textTheme.headlineMedium,
            ),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _incrementCounter,
        tooltip: \\'Increment\\',
        child: const Icon(Icons.add),
      ),
    );
  }
}

// Custom Stateless Widget
class CustomCard extends StatelessWidget {
  final String title;
  final String description;
  final IconData icon;
  final VoidCallback? onTap;

  const CustomCard({
    super.key,
    required this.title,
    required this.description,
    required this.icon,
    this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      elevation: 4,
      margin: const EdgeInsets.all(8),
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(12),
        child: Padding(
          padding: const EdgeInsets.all(16),
          child: Row(
            children: [
              Icon(
                icon,
                size: 48,
                color: Theme.of(context).primaryColor,
              ),
              const SizedBox(width: 16),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      title,
                      style: Theme.of(context).textTheme.titleLarge,
                    ),
                    const SizedBox(height: 4),
                    Text(
                      description,
                      style: Theme.of(context).textTheme.bodyMedium,
                    ),
                  ],
                ),
              ),
              const Icon(Icons.arrow_forward_ios, size: 16),
            ],
          ),
        ),
      ),
    );
  }
}

// Layout Examples
class LayoutExamples extends StatelessWidget {
  const LayoutExamples({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Layout Examples')),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Row Example
            const Text('Row Layout:', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
            const SizedBox(height: 8),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: [
                Container(
                  width: 50,
                  height: 50,
                  color: Colors.red,
                  child: const Center(child: Text('1', style: TextStyle(color: Colors.white))),
                ),
                Container(
                  width: 50,
                  height: 50,
                  color: Colors.green,
                  child: const Center(child: Text('2', style: TextStyle(color: Colors.white))),
                ),
                Container(
                  width: 50,
                  height: 50,
                  color: Colors.blue,
                  child: const Center(child: Text('3', style: TextStyle(color: Colors.white))),
                ),
              ],
            ),
            const SizedBox(height: 24),

            // Column Example
            const Text('Column Layout:', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
            const SizedBox(height: 8),
            Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                Container(
                  width: double.infinity,
                  height: 50,
                  color: Colors.purple,
                  child: const Center(child: Text('Header', style: TextStyle(color: Colors.white))),
                ),
                Container(
                  width: double.infinity,
                  height: 100,
                  color: Colors.orange,
                  child: const Center(child: Text('Content', style: TextStyle(color: Colors.white))),
                ),
                Container(
                  width: double.infinity,
                  height: 50,
                  color: Colors.teal,
                  child: const Center(child: Text('Footer', style: TextStyle(color: Colors.white))),
                ),
              ],
            ),
            const SizedBox(height: 24),

            // Stack Example
            const Text('Stack Layout:', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
            const SizedBox(height: 8),
            SizedBox(
              height: 200,
              child: Stack(
                alignment: Alignment.center,
                children: [
                  Container(
                    width: 200,
                    height: 200,
                    color: Colors.grey[300],
                  ),
                  Container(
                    width: 150,
                    height: 150,
                    color: Colors.blue.withOpacity(0.7),
                  ),
                  const Positioned(
                    top: 20,
                    right: 20,
                    child: CircleAvatar(
                      backgroundColor: Colors.red,
                      child: Text('3', style: TextStyle(color: Colors.white)),
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 24),

            // Expanded and Flexible
            const Text('Expanded/Flexible Layout:', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
            const SizedBox(height: 8),
            Row(
              children: [
                Expanded(
                  flex: 2,
                  child: Container(
                    height: 50,
                    color: Colors.red,
                    child: const Center(child: Text('2x', style: TextStyle(color: Colors.white))),
                  ),
                ),
                Expanded(
                  flex: 1,
                  child: Container(
                    height: 50,
                    color: Colors.green,
                    child: const Center(child: Text('1x', style: TextStyle(color: Colors.white))),
                  ),
                ),
                Flexible(
                  child: Container(
                    height: 50,
                    color: Colors.blue,
                    child: const Center(child: Text('Flexible', style: TextStyle(color: Colors.white))),
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}

// Material Design Components
class MaterialComponentsDemo extends StatelessWidget {
  const MaterialComponentsDemo({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Material Components')),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          // Buttons
          const Text('Buttons:', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
          const SizedBox(height: 8),
          Wrap(
            spacing: 8,
            children: [
              ElevatedButton(
                onPressed: () {},
                child: const Text('Elevated'),
              ),
              FilledButton(
                onPressed: () {},
                child: const Text('Filled'),
              ),
              OutlinedButton(
                onPressed: () {},
                child: const Text('Outlined'),
              ),
              TextButton(
                onPressed: () {},
                child: const Text('Text'),
              ),
            ],
          ),
          const SizedBox(height: 24),

          // Text Fields
          const Text('Text Fields:', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
          const SizedBox(height: 8),
          const TextField(
            decoration: InputDecoration(
              labelText: 'Email',
              hintText: 'Enter your email',
              prefixIcon: Icon(Icons.email),
              border: OutlineInputBorder(),
            ),
          ),
          const SizedBox(height: 16),
          const TextField(
            obscureText: true,
            decoration: InputDecoration(
              labelText: 'Password',
              hintText: 'Enter your password',
              prefixIcon: Icon(Icons.lock),
              border: OutlineInputBorder(),
            ),
          ),
          const SizedBox(height: 24),

          // Cards and Chips
          const Text('Cards and Chips:', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
          const SizedBox(height: 8),
          Card(
            child: Padding(
              padding: const EdgeInsets.all(16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text('Card Title', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
                  const SizedBox(height: 8),
                  const Text('This is a Material Design card component with some content.'),
                  const SizedBox(height: 16),
                  Wrap(
                    spacing: 8,
                    children: [
                      Chip(label: const Text('Flutter')),
                      Chip(label: const Text('Dart')),
                      Chip(label: const Text('Material Design')),
                    ],
                  ),
                ],
              ),
            ),
          ),
          const SizedBox(height: 24),

          // Progress Indicators
          const Text('Progress Indicators:', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
          const SizedBox(height: 8),
          const LinearProgressIndicator(),
          const SizedBox(height: 16),
          const CircularProgressIndicator(),
          const SizedBox(height: 24),

          // Dialogs and Snackbars
          const Text('Dialogs and Snackbars:', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
          const SizedBox(height: 8),
          ElevatedButton(
            onPressed: () => _showDialog(context),
            child: const Text('Show Dialog'),
          ),
          const SizedBox(height: 8),
          ElevatedButton(
            onPressed: () => _showSnackbar(context),
            child: const Text('Show Snackbar'),
          ),
        ],
      ),
    );
  }

  void _showDialog(BuildContext context) {
    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Alert Dialog'),
        content: const Text('This is a Material Design alert dialog.'),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(context).pop(),
            child: const Text('Cancel'),
          ),
          ElevatedButton(
            onPressed: () => Navigator.of(context).pop(),
            child: const Text('OK'),
          ),
        ],
      ),
    );
  }

  void _showSnackbar(BuildContext context) {
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(
        content: Text('This is a snackbar message!'),
        action: SnackBarAction(
          label: 'Undo',
          onPressed: null, // Add your undo logic here
        ),
      ),
    );
  }
}`
        },
      ],
    },
  ],
};