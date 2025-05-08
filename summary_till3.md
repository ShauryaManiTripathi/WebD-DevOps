# Web Development Summary - Weeks 1-3

## Week 1: JavaScript Fundamentals

### Basic Syntax
- **Variables and Declaration**
  - `var`: Function-scoped, hoisted with initialization
  - `let`: Block-scoped, hoisted without initialization (temporal dead zone)
  - `const`: Block-scoped, cannot be reassigned

### Data Types
- **Primitives**
  - String: Text data (`"Hello"`, `'World'`)
  - Number: Numeric data (integers and floating-point)
  - Boolean: `true` or `false`
  - `null`: Intentional absence of value
  - `undefined`: Variable declared but not assigned
- **Non-primitives**
  - Object: Collection of key-value pairs
  - Array: Ordered collection of values
  - Function: Reusable block of code

### Operators
- **Arithmetic**: `+`, `-`, `*`, `/`, `%`
- **Assignment**: `=`, `+=`, `-=`, `*=`, `/=`
- **Comparison**: `==`, `===`, `!=`, `!==`, `>`, `<`, `>=`, `<=`
- **Logical**: `&&` (AND), `||` (OR), `!` (NOT)
- **Ternary**: `condition ? expr1 : expr2`

### Control Flow
- **Conditionals**
  - `if/else` statements
  - `switch` statements
- **Loops**
  - `for` loop
  - `while` loop
  - `do...while` loop
  - `for...of` (iterating arrays)
  - `for...in` (iterating object properties)

### Functions
- **Function Declaration**: `function functionName() {}`
- **Function Expression**: `const functionName = function() {}`
- **Arrow Functions**: `const functionName = () => {}`
- **Parameters and Arguments**
- **Return Values**
- **Scope and Closures**

### String Methods
- `length`, `indexOf()`, `lastIndexOf()`
- `slice()`, `substring()`
- `replace()`, `split()`, `trim()`
- `toUpperCase()`, `toLowerCase()`

### Array Methods
- **Mutating Methods**
  - `push()`, `pop()`, `shift()`, `unshift()`
  - `splice()`, `sort()`
- **Non-mutating Methods**
  - `concat()`, `slice()`
  - `map()`, `filter()`, `find()`
  - `forEach()`, `reduce()`

### Objects
- **Creation and Manipulation**
- **Properties and Methods**
- **Accessing Properties** (dot notation vs bracket notation)
- **Object Destructuring**

### Higher-Order Functions
- Functions that take functions as arguments
- Functions that return functions
- Callbacks

### Truthy and Falsy Values
- Falsy: `false`, `0`, `""`, `null`, `undefined`, `NaN`
- Truthy: Everything else

### ES6+ Features
- **Template Literals**: `` `Hello ${name}` ``
- **Destructuring**: `const { name, age } = person`
- **Spread Operator**: `[...array1, ...array2]`
- **Rest Parameters**: `function sum(...numbers) {}`
- **Default Parameters**: `function greet(name = 'Guest') {}`
- **Object Property Shorthand**: `{ name, age }`

## Week 2: Asynchronous JavaScript

### Asynchronous Concepts
- **Single-threaded JavaScript**
- **The Event Loop**
- **Call Stack and Callback Queue**
- **Non-blocking I/O**

### Callbacks
- **Synchronous Callbacks**
- **Asynchronous Callbacks**
- **Callback Hell (Pyramid of Doom)**
- **Error-First Callback Pattern**

### Timing Functions
- `setTimeout(callback, delay)`: Execute once after delay
- `setInterval(callback, interval)`: Execute repeatedly at interval
- `clearTimeout()` and `clearInterval()`

### Promises
- **States**: Pending, Fulfilled, Rejected
- **Creation**: `new Promise((resolve, reject) => {})`
- **Handling**: `.then()`, `.catch()`, `.finally()`
- **Chaining Promises**
- **Promise Methods**
  - `Promise.all()`: Wait for all promises
  - `Promise.race()`: Wait for first settled promise
  - `Promise.allSettled()`: Wait for all promises to settle

### Async/Await
- **`async` Functions**: Always return a Promise
- **`await` Keyword**: Pauses execution until Promise resolves
- **Error Handling**: `try/catch` blocks
- **Sequential vs Parallel Execution**

### Error Handling
- **`try...catch` Statement**
- **Error Objects**
- **Throwing Custom Errors**
- **Error Propagation**

## Week 3: Backend Development & Advanced Topics

### Node.js Basics
- **Module System**
  - CommonJS (`require()`, `module.exports`)
  - ES Modules (`import`/`export`)
- **Built-in Modules** (fs, path, http, etc.)
- **npm (Node Package Manager)**
  - Package installation
  - `package.json` and `package-lock.json`

### Express.js Framework
- **Server Setup**
- **Routing**
  - Route parameters
  - Query parameters
  - Route handlers
- **Middleware**
  - Built-in middleware
  - Custom middleware
  - Third-party middleware
- **Request and Response Objects**
- **Static File Serving**
- **Error Handling**

### Authentication & Authorization
- **Session-based Authentication**
- **JWT (JSON Web Tokens)**
  - Structure: Header, Payload, Signature
  - Signing tokens
  - Verifying tokens
  - Token storage and transmission
- **Password Hashing**
- **OAuth Concepts**

### Database Basics
- **Database Types**
  - SQL vs NoSQL
- **MongoDB Concepts**
  - Collections and Documents
  - CRUD Operations
- **Mongoose ODM**
  - Schemas and Models
  - Validation
  - Queries

### File Handling
- **Uploading Files**
- **Reading and Writing Files**
- **Stream Processing**

### API Development
- **RESTful API Design**
- **HTTP Methods** (GET, POST, PUT, DELETE)
- **Status Codes**
- **API Versioning**
- **Documentation**

## TypeScript

### TypeScript Fundamentals
- **Static Type System**
- **Type Annotations**: `let name: string = "John";`
- **Type Inference**

### Basic Types
- **Primitive Types**: `string`, `number`, `boolean`
- **Arrays**: `string[]` or `Array<string>`
- **Tuples**: `[string, number]`
- **Enums**: `enum Color {Red, Green, Blue}`
- **Any and Unknown Types**
- **Void, Null, and Undefined**
- **Never Type**

### Object Types
- **Interfaces**
  ```typescript
  interface User {
    name: string;
    age: number;
    isActive?: boolean; // Optional property
    readonly id: string; // Read-only property
  }
  ```
- **Type Aliases**
  ```typescript
  type Point = {
    x: number;
    y: number;
  };
  ```

### Functions in TypeScript
- **Function Type Annotations**
  ```typescript
  function add(a: number, b: number): number {
    return a + b;
  }
  ```
- **Optional and Default Parameters**
- **Rest Parameters**
- **Function Overloading**

### Advanced Types
- **Union Types**: `string | number`
- **Intersection Types**: `Type1 & Type2`
- **Type Assertions**: `value as string`
- **Type Guards**
  - `typeof`
  - `instanceof`
  - User-defined type guards
- **Literal Types**
- **Nullable Types**

### Generics
- **Generic Functions**
  ```typescript
  function identity<T>(arg: T): T {
    return arg;
  }
  ```
- **Generic Interfaces and Classes**
- **Generic Constraints**
- **Type Parameters**

### TypeScript with Libraries
- **Type Definitions** (`.d.ts` files)
- **DefinitelyTyped (@types)**

### Validation with Zod
- **Schema Definition**
- **Type Inference with Zod**
- **Validation and Error Handling**
- **Transformations**
- **Integration with TypeScript Types**

### TypeScript Configuration
- **tsconfig.json**
- **Compiler Options**
- **Module Resolution**
- **Target ECMAScript Version**

### Best Practices
- **Type Safety**
- **Code Organization**
- **Error Handling**
- **Integration with Existing JavaScript**
