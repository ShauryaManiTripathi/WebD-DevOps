
## The Ultimate TypeScript Course: A Detailed Tutorial (Part 1)

Welcome to this comprehensive guide to TypeScript! We'll take you from the very basics to more advanced concepts, equipping you to build large-scale, robust applications. This tutorial is designed to be easy to follow, well-organized, and practical.

### Table of Contents (Covered in this part)

1.  **Introduction to the Course**
    *   Prerequisites
    *   How to Take This Course
2.  **Getting Started with TypeScript**
    *   What is TypeScript? Why do we need it?
    *   Setting Up Your Development Environment
    *   Your First TypeScript Program
    *   Configuring the TypeScript Compiler (`tsconfig.json`)
    *   Debugging TypeScript Applications
3.  **TypeScript Fundamentals: Built-in Types**
    *   Primitive Types (Number, String, Boolean) and Type Inference
    *   The `any` Type
    *   Arrays
    *   Tuples
    *   Enums
    *   Functions
    *   Objects
4.  **Advanced Types**
    *   Type Aliases
    *   Union Types and Narrowing
    *   Intersection Types
    *   Literal Types
    *   Nullable Types
    *   Optional Chaining (Optional Property Access, Element Access, and Call Operators)

---

### 1. Introduction to the Course

#### Prerequisites
**(00:00:57)** To get the most out of this TypeScript course, you don't need any prior knowledge of TypeScript itself – we'll cover everything from scratch.

However, since TypeScript is built on top of JavaScript, a **basic familiarity with JavaScript concepts is essential**. You should be comfortable with:
*   Variables and constants (`let`, `const`)
*   Arrays
*   Objects
*   Functions (including arrow functions)
*   Destructuring

If you need a refresher, Mosh Hamedani has many resources available on his YouTube channel and CodeWithMosh.com.

#### How to Take This Course
**(00:01:36)** To maximize your learning:
1.  **Watch every lesson:** Each lesson introduces new, valuable information without repetition.
2.  **Take notes:** Even jotting down keywords helps reinforce learning. The act of writing aids memory.
3.  **Do the exercises:** (Though not detailed in this transcript, the full course has them). Practice is key to mastering TypeScript and coding in general.

---

### 2. Getting Started with TypeScript

**(00:02:27)** This section will cover:
*   What TypeScript is, why we use it, and when.
*   Setting up your development environment.
*   Creating your first TypeScript program.
*   Configuring the TypeScript compiler.
*   Debugging TypeScript applications.

#### What is TypeScript? Why do we need it?
**(00:03:02)**
*   **What is TypeScript?** TypeScript is a programming language created by Microsoft. It's designed to address some of the shortcomings of JavaScript. Think of it as a "superset" of JavaScript – any valid JavaScript code is also valid TypeScript code.
*   **Key Feature: Static Typing:**
    *   JavaScript is **dynamically typed**. The type of a variable is checked at *runtime*, and it can change.
        ```javascript
        // JavaScript example
        let count = 5;    // count is a number
        count = 'five'; // count is now a string - this is allowed
        ```
        This flexibility can lead to bugs that are only caught when you run the application or its tests.
    *   TypeScript introduces **static typing**. You can (and often should) declare the type of a variable when you write your code. The TypeScript compiler checks these types at *compile time*.
        ```typescript
        // TypeScript example
        let age: number = 25;
        // age = 'twenty-five'; // This would cause a compile-time error!
        ```
        This helps catch many errors early in the development process, before the code even runs.
*   **Benefits of TypeScript:**
    1.  **Static Type Checking:** Catches type-related errors during development.
    2.  **Improved Code Completion and Refactoring:** Modern code editors (like VS Code) leverage type information to provide better IntelliSense and safer refactoring.
    3.  **Access to Future JavaScript Features:** TypeScript often includes features planned for future versions of JavaScript, allowing you to use them today. The TypeScript compiler then transpiles them down to a version of JavaScript that current browsers understand.
    4.  **Increased Robustness and Maintainability:** Especially beneficial for large-scale applications with multiple developers.
*   **Drawbacks of TypeScript:**
    1.  **Compilation Step (Transpilation):** Browsers don't understand TypeScript directly. Your TypeScript code (`.ts` files) must be compiled (or "transpiled") into JavaScript code (`.js` files).
    2.  **More Disciplined Coding:** Requires a bit more upfront effort to define types, which might feel like it slows down very small, quick projects. However, this discipline pays off significantly in larger projects.

Use TypeScript for medium to large applications where maintainability and robustness are key. For very simple scripts, vanilla JavaScript might suffice.

#### Setting Up Your Development Environment
**(00:07:44)**
1.  **Node.js:** You need Node.js because it comes with `npm` (Node Package Manager), which we'll use to install the TypeScript compiler.
    *   If you don't have it, download and install it from [nodejs.org](https://nodejs.org/).
2.  **Install TypeScript Compiler:** Open your terminal or command prompt and run:
    ```bash
    npm install -g typescript
    ```
    *   `npm`: Node Package Manager.
    *   `install` (or `i`): The command to install a package.
    *   `-g`: Installs the package globally, making the TypeScript compiler (`tsc`) accessible from any directory.
    *   `typescript`: The name of the package.
    *   **(Note for Mac/Linux users):** If you get a permission error, you might need to prefix the command with `sudo`: `sudo npm install -g typescript`.
3.  **Verify Installation:** Check the installed version:
    ```bash
    tsc -v
    ```
    You should see an output like `Version 4.6.3` (your version might be newer).
4.  **Code Editor: Visual Studio Code (VS Code):**
    *   Highly recommended for its excellent TypeScript support.
    *   Download from [code.visualstudio.com](https://code.visualstudio.com/) if you don't have it.

#### Your First TypeScript Program
**(00:09:35)**
1.  **Create a Project Folder:**
    *   On your desktop (or anywhere you like), create a new folder, e.g., `hello-world`.
    *   Navigate into this folder in your terminal: `cd path/to/hello-world`.
2.  **Open in VS Code:**
    *   From the terminal (inside the `hello-world` folder): `code .`
    *   (The `.` means "current directory"). If this command doesn't work, you can simply drag and drop the folder onto the VS Code icon.
3.  **Create a TypeScript File:**
    *   In VS Code, create a new file named `index.ts`. The `.ts` extension signifies a TypeScript file.
4.  **Write Some Code:**
    ```typescript
    // index.ts
    console.log('Hello World');

    let age: number = 20;
    // age = 'something'; // This would show an error in VS Code immediately!

    if (age < 50) {
        age += 10;
    }
    console.log(age);
    ```
    *   Notice the type annotation `: number`. This tells TypeScript that `age` should always hold a number.
    *   VS Code will immediately underline `age = 'something';` if you uncomment it, showing an error: "Type 'string' is not assignable to type 'number'."
5.  **Compile the TypeScript File:**
    *   Open the integrated terminal in VS Code (View > Terminal, or `Ctrl + \``).
    *   Run the TypeScript compiler:
        ```bash
        tsc index.ts
        ```
    *   This will generate an `index.js` file in the same directory.
6.  **Examine the Generated JavaScript:**
    ```javascript
    // index.js (example output)
    console.log('Hello World');
    var age = 20; // Notice 'var' instead of 'let' (by default, older JS)
    if (age < 50) {
        age += 10;
    }
    console.log(age);
    ```
    *   The type annotations are gone; JavaScript doesn't have them.
    *   By default, `tsc` compiles to an older version of JavaScript (ES5) for broader browser compatibility. We can change this.

#### Configuring the TypeScript Compiler (`tsconfig.json`)
**(00:13:26)**
Instead of passing options to `tsc` via the command line every time, we can use a configuration file.

1.  **Generate `tsconfig.json`:** In your project's root directory (e.g., `hello-world`), run:
    ```bash
    tsc --init
    ```
    This creates a `tsconfig.json` file with many commented-out options and their descriptions.
2.  **Key `compilerOptions` in `tsconfig.json`:**
    Let's explore and modify some important ones (uncomment them by removing the `//`):

    *   **`target`**: (00:14:12) Specifies the ECMAScript target version for the output JavaScript.
        *   Default might be older like `"es2016"`. Newer versions like `"es2020"` or `"esnext"` produce more modern JavaScript but might not be supported by very old browsers. For this tutorial, `"es2016"` is fine.
        ```json
        "target": "es2016",
        ```
    *   **`rootDir`**: (00:15:10) Specifies the root directory of your input TypeScript files. It's good practice to keep source files in a separate `src` folder.
        1.  Create an `src` folder in your project.
        2.  Move `index.ts` into the `src` folder.
        3.  Update `tsconfig.json`:
            ```json
            "rootDir": "./src",
            ```
    *   **`outDir`**: (00:15:58) Specifies the output directory for the compiled JavaScript files. It's common to use a `dist` (distributable) folder.
        ```json
        "outDir": "./dist",
        ```
    *   **`removeComments`**: (00:16:17) If set to `true`, it strips all comments from the output JavaScript files, making them smaller.
        ```json
        "removeComments": true,
        ```
    *   **`noEmitOnError`**: (00:16:31) If set to `true`, the compiler will *not* generate JavaScript files if there are any TypeScript errors. This is generally a good idea.
        ```json
        "noEmitOnError": true,
        ```
3.  **Compile with `tsconfig.json`:**
    *   Now, simply run `tsc` in your terminal from the project root:
        ```bash
        tsc
        ```
    *   The compiler will read `tsconfig.json`, find your `.ts` files in `src`, and output `.js` files to `dist`. You should now have a `dist` folder with `index.js` inside.

#### Debugging TypeScript Applications
**(00:17:30)**
VS Code has excellent built-in debugging capabilities for TypeScript.

1.  **Enable Source Maps (`tsconfig.json`):**
    *   Source maps (`.map` files) create a mapping between your original TypeScript code and the generated JavaScript code. This allows the debugger to show you your `.ts` code even though it's running the `.js` code.
    *   In `tsconfig.json`, uncomment or add:
        ```json
        "sourceMap": true,
        ```
    *   Recompile your code: `tsc`. You'll now see an `index.js.map` file in your `dist` folder.
2.  **Set a Breakpoint:**
    *   Open your `src/index.ts` file.
    *   Click in the gutter to the left of a line number (e.g., the line `let age: number = 20;`) to set a breakpoint (a red dot will appear).
3.  **Configure the Debugger (launch.json):**
    *   Go to the "Run and Debug" panel in VS Code (the icon with a play button and a bug).
    *   Click on "create a launch.json file."
    *   Select "Node.js" from the environment dropdown.
    *   This creates a `.vscode/launch.json` file. Modify it to include a `preLaunchTask`:
        ```json
        {
            "version": "0.2.0",
            "configurations": [
                {
                    "type": "node",
                    "request": "launch",
                    "name": "Launch Program", // You can change this name
                    "skipFiles": [
                        "<node_internals>/**"
                    ],
                    "program": "${workspaceFolder}/src/index.ts", // Points to your main TS file
                    "preLaunchTask": "tsc: build - tsconfig.json", // Crucial: compiles before launching
                    "outFiles": [
                        "${workspaceFolder}/dist/**/*.js" // Helps debugger find JS files
                    ]
                }
            ]
        }
        ```
        *   `program`: Specifies your main TypeScript entry file.
        *   `preLaunchTask`: Tells VS Code to run the TypeScript build process (defined by `tsc: build - tsconfig.json`) before starting the debug session. This ensures you're debugging the latest compiled code.
        *   `outFiles`: Helps the debugger map to the correct JavaScript files.
4.  **Start Debugging:**
    *   Go back to your `src/index.ts` file.
    *   Press `F5` (or click the green play button in the "Run and Debug" panel next to "Launch Program").
    *   Execution will pause at your breakpoint.
    *   **Debugging Controls:**
        *   **Continue (F5):** Run until the next breakpoint.
        *   **Step Over (F10):** Execute the current line and move to the next line in the same scope.
        *   **Step Into (F11):** If the current line is a function call, step into that function.
        *   **Step Out (Shift+F11):** If inside a function, run to the end of that function and step out to the caller.
        *   **Restart (Ctrl+Shift+F5):** Restart the debugging session.
        *   **Stop (Shift+F5):** Stop debugging.
    *   **Inspect Variables:**
        *   **VARIABLES Panel:** Shows local and global variables and their current values.
        *   **WATCH Panel:** You can add expressions to watch their values change.
        *   **Hover:** Hover your mouse over variables in the code to see their current values.

---

### 3. TypeScript Fundamentals: Built-in Types

**(00:22:57)** JavaScript has built-in types like `number`, `string`, `boolean`, `null`, `undefined`, and `object`. TypeScript extends this list with types like `any`, `unknown`, `never`, `enum`, and `tuple`.

#### Primitive Types (Number, String, Boolean) and Type Inference
**(00:23:29)**
```typescript
// src/index.ts (clear previous content)

let sales: number = 123_456_789; // Underscores for readability
let course: string = 'TypeScript';
let is_published: boolean = true;
```
*   **Type Annotation:** Explicitly stating the type (`: number`).
*   **Type Inference:** (00:24:30) TypeScript is smart! If you initialize a variable, it can often *infer* the type, so you don't always need to annotate it.
    ```typescript
    let sales = 123_456_789; // Inferred as number
    let course = 'TypeScript';   // Inferred as string
    let is_published = true;   // Inferred as boolean
    ```
    If you hover over these variables in VS Code, it will show their inferred type.
*   **Uninitialized Variables:** If you declare a variable without initializing it and without a type annotation, TypeScript will infer its type as `any`.
    ```typescript
    let level; // Inferred as 'any'
    level = 1;
    level = 'a'; // No error because it's 'any'
    ```

#### The `any` Type
**(00:25:27)**
The `any` type is a powerful escape hatch but should be used sparingly. It essentially tells the TypeScript compiler to turn off type checking for that variable.

```typescript
let level; // Implicitly 'any'
level = 1;
level = 'abc';
level = true;
// All are fine because 'level' is of type 'any'

// Example with a function parameter
function render(document) { // 'document' is implicitly 'any' if noImplicitAny is false
    console.log(document);
}
```
*   **Problem:** Using `any` defeats the purpose of TypeScript's static typing and can hide potential bugs.
*   **`noImplicitAny` Compiler Option:**
    *   In `tsconfig.json`, the `strict` option (which is `true` by default if you use `tsc --init` and don't change it) enables `noImplicitAny`.
    *   `"noImplicitAny": true` (default under `strict` mode) means the compiler will flag an error if a variable or parameter implicitly has an `any` type. You must then either provide an explicit type or explicitly use `any`.
        ```typescript
        // With noImplicitAny: true
        // function render(document) { // ERROR: Parameter 'document' implicitly has an 'any' type.
        //  console.log(document);
        // }

        // Fix 1: Explicitly type it
        function renderTyped(document: string) {
            console.log(document);
        }

        // Fix 2: Explicitly use 'any' (if truly necessary)
        function renderAny(document: any) {
            console.log(document);
        }
        ```
    *   **Best Practice:** Avoid `any` as much as possible. Try to provide specific types. If you must use `any`, do it explicitly (`variableName: any`). Avoid turning off `noImplicitAny` globally unless you have a very specific reason (e.g., migrating a large JS codebase).

#### Arrays
**(00:28:12)**
In JavaScript, arrays can hold elements of different types. TypeScript allows you to create typed arrays.

```typescript
// src/index.ts

// let numbers = [1, 2, '3']; // In JavaScript, this is fine.
                           // In TypeScript, without an explicit type, this would be inferred as (number | string)[]

// Typed array - all elements must be numbers
let numbers: number[] = [1, 2, 3];
// numbers[0] = 'a'; // Error: Type 'string' is not assignable to type 'number'.
// numbers.push('a'); // Error

// Type inference for arrays also works:
let inferredNumbers = [1, 2, 3]; // Inferred as number[]

// Empty arrays: If you initialize an empty array, you MUST provide a type annotation,
// otherwise it will be inferred as 'any[]'.
let emptyNumbers: number[] = [];
// let anotherEmptyArray = []; // Inferred as any[] - avoid this!
// anotherEmptyArray[0] = 1;
// anotherEmptyArray[1] = 'a'; // No error if it's any[]

// Code Completion (IntelliSense)
numbers.forEach(n => {
    // n.  <-- VS Code will show methods for numbers (e.g., toFixed())
    console.log(n.toFixed(2));
});
```

#### Tuples
**(00:30:30)**
Tuples are a special kind of array with a fixed number of elements, where the type of each element is known and fixed. They are useful for representing a pair or a small, fixed set of related values.

```typescript
// src/index.ts

// A tuple representing a user: [ID, name]
let user: [number, string] = [1, 'Mosh'];

// user[0] is a number, user[1] is a string
console.log(user[0].toFixed(2)); // .toFixed() is a number method
console.log(user[1].toUpperCase()); // .toUpperCase() is a string method

// user = [2, 'John', true]; // Error: Too many elements, and wrong type for 3rd
// user = ['Mosh', 1];    // Error: Types are in the wrong order

// A quirk/gap:
// While tuples have a fixed length defined at compile time,
// methods like .push() can still (problematically) add elements at runtime.
// user.push(100); // This compiles, but conceptually breaks the tuple's fixed nature.
                 // This is a known limitation in TypeScript.

// Best Practice: Restrict tuples to 2-3 elements. For more complex structures, use objects or classes.
// e.g., let user: [number, string, boolean, number] = [1, 'Mosh', true, 30];
// This is harder to understand. What do true and 30 represent?
```
Internally, tuples are just JavaScript arrays. The type checking is a compile-time feature.

#### Enums (Enumerations)
**(00:33:13)**
Enums allow you to define a set of named constants. This makes your code more readable and less prone to errors from magic numbers or strings.

```typescript
// src/index.ts

// Instead of:
// const small = 1;
// const medium = 2;
// const large = 3;

// Use an enum:
// By default, enums are number-based, starting from 0.
enum SizeNumeric { Small, Medium, Large }; // Small=0, Medium=1, Large=2

// You can set the first value:
enum Size { Small = 1, Medium, Large }; // Small=1, Medium=2, Large=3

// You can also use string values (requires explicit assignment for all):
enum StringSize { Small = 's', Medium = 'm', Large = 'l' };

let mySize: Size = Size.Medium;
console.log(mySize); // Output: 2 (the numeric value of Size.Medium)

// `const` enums for more optimized JavaScript:
// If you declare an enum with `const`, TypeScript will generate more optimized code.
// It will inline the values directly and not create the JavaScript object lookup structure.
const enum OptimizedSize { Small = 1, Medium, Large };
let myOptimizedSize: OptimizedSize = OptimizedSize.Medium;
console.log(myOptimizedSize); // In the generated JS, this might directly become '2'

// When `tsc` compiles a regular enum (without const):
// It generates JavaScript code that looks something like this (simplified):
/*
var Size;
(function (Size) {
    Size[Size["Small"] = 1] = "Small";
    Size[Size["Medium"] = 2] = "Medium";
    Size[Size["Large"] = 3] = "Large";
})(Size || (Size = {}));
let mySize = Size.Medium;
console.log(mySize); // 2
*/

// When `tsc` compiles a `const enum`:
// The generated JavaScript is much simpler, often inlining the value:
/*
let myOptimizedSize = 2; // 2 is the value of OptimizedSize.Medium
console.log(myOptimizedSize);
*/
```
*   Use PascalCase for enum names (e.g., `Size`) and enum members (e.g., `Small`).
*   Consider using `const enum` for performance benefits if you don't need the reverse mapping capabilities of regular enums (where `Size[1]` would give you `"Small"`).

#### Functions
**(00:36:37)**
TypeScript enhances JavaScript functions with type checking for parameters and return values.

```typescript
// src/index.ts

// Annotate parameters and the return type
function calculateTax(income: number, taxYear: number): number {
    // 'void' return type if the function doesn't return anything
    if (taxYear < 2022) {
        return income * 1.2;
    }
    return income * 1.3;
    // If you forget a return path, and the function expects a number,
    // TypeScript will give an error: "Function lacks ending return statement..."
}

// Calling the function
console.log(calculateTax(10000, 2022)); // Output: 13000
// calculateTax('10000', 2022); // Error: Argument of type 'string' is not assignable...
// calculateTax(10000); // Error: Expected 2 arguments, but got 1.

// Optional Parameters: Use '?'
// Parameters with '?' must come after required parameters.
function calculateTaxOptional(income: number, taxYear?: number): number {
    if ((taxYear || 2022) < 2022) { // (taxYear || 2022) - old JS way to provide default
        return income * 1.2;
    }
    return income * 1.3;
}
console.log(calculateTaxOptional(10000)); // taxYear will be undefined, uses 2022

// Default Parameter Values (Better way than '||' trick)
// Parameters with default values are implicitly optional.
function calculateTaxDefault(income: number, taxYear: number = 2022): number {
    if (taxYear < 2022) {
        return income * 1.2;
    }
    return income * 1.3;
}
console.log(calculateTaxDefault(10000));        // Uses taxYear = 2022
console.log(calculateTaxDefault(10000, 2020)); // Uses taxYear = 2020

// Compiler options for functions (in tsconfig.json, often enabled by "strict": true):
// "noUnusedParameters": true
//      - Flags parameters that are declared but not used in the function body.
//      - If 'taxYear' was declared but not used in calculateTax, it would warn.
// "noUnusedLocals": true
//      - Flags local variables that are declared but not used.
//      - let x = 10; // if x is not used, it's flagged.
// "noImplicitReturns": true
//      - Ensures all code paths in a function return a value if the function is expected to return one.
//      - Prevents bugs where a function might implicitly return 'undefined'.

// Best Practice: Always explicitly annotate function parameters and return types,
// especially for functions that are part of a public API.
```

#### Objects
**(00:43:28)**
TypeScript provides ways to define the "shape" of objects.

```typescript
// src/index.ts

// Type inference for objects
let employeeInfer = { id: 1, name: 'Mosh' };
// employeeInfer.id = 'a'; // Error: Type 'string' is not assignable to type 'number'.
// employeeInfer.retireDate = new Date(); // Error: Property 'retireDate' does not exist.

// Explicitly defining an object's shape (type annotation)
let employee: {
    readonly id: number; // 'readonly' modifier: id can only be set at initialization
    name: string;
    retire: (date: Date) => void; // A method 'retire' that takes a Date and returns nothing
} = {
    id: 1,
    name: 'Mosh',
    retire: (date: Date) => {
        console.log(date);
    }
};

// employee.id = 2; // Error: Cannot assign to 'id' because it is a read-only property.
employee.name = 'John'; // This is fine.
employee.retire(new Date());

// Optional properties in object types:
let employeeOptional: {
    readonly id: number;
    name: string;
    fax?: string; // 'fax' is optional
} = { id: 1, name: 'Alice' }; // 'fax' can be omitted

// This inline annotation for object types can become verbose and repetitive.
// We'll see a better way with Type Aliases next.
```

---

### 4. Advanced Types

**(00:48:00)** This section delves into more powerful typing features in TypeScript.

#### Type Aliases
**(00:48:32)**
Type aliases allow you to create a custom name for a type, which is great for reusability and readability, especially for complex object types.

```typescript
// src/index.ts

// Instead of repeating the object shape:
// let employee1: { id: number; name: string; ... } = { ... };
// let employee2: { id: number; name: string; ... } = { ... };

// Define a Type Alias:
type Employee = {
    readonly id: number;
    name: string;
    retire: (date: Date) => void;
};

// Now use the alias:
let employee1: Employee = {
    id: 1,
    name: 'Mosh',
    retire: (date: Date) => {
        console.log('Retiring on (employee1):', date);
    }
};

let employee2: Employee = {
    id: 2,
    name: 'Alice',
    retire: (date: Date) => {
        console.log('Retiring on (employee2):', date);
    }
};

employee1.retire(new Date());
employee2.retire(new Date());

// Benefits:
// 1. DRY (Don't Repeat Yourself): Define the shape once.
// 2. Consistency: Ensures all 'Employee' objects have the same shape.
// 3. Readability: Makes code easier to understand.
```
Use PascalCase for Type Alias names (e.g., `Employee`).

#### Union Types and Narrowing
**(00:50:10)**
Union types allow a variable or parameter to be one of several types.

```typescript
// src/index.ts

function kgToLbs(weight: number | string): number { // weight can be a number OR a string
    // At this point, 'weight' could be 'number' or 'string'.
    // If you do 'weight.', IntelliSense will only show common methods (like toString()).

    // Narrowing: We need to check the actual type of 'weight' at runtime
    // to access type-specific methods.
    if (typeof weight === 'number') {
        // Here, TypeScript knows 'weight' is a number
        return weight * 2.2;
    } else {
        // Here, TypeScript knows 'weight' is a string
        return parseInt(weight) * 2.2;
    }
}

console.log(kgToLbs(10));       // Output: 22
console.log(kgToLbs('20kg')); // Output: 44 (parseInt('20kg') is 20)
```
*   The `|` operator creates a union type.
*   **Narrowing** is the process of refining a broader type (like a union) into a more specific type within a conditional block. `typeof` is a common way to narrow primitive types. For objects, you might use `instanceof` or property checks.

#### Intersection Types
**(00:52:46)**
Intersection types allow you to combine multiple types into one. An object of an intersection type will have all members of all the combined types.

```typescript
// src/index.ts

type Draggable = {
    drag: () => void;
};

type Resizable = {
    resize: () => void;
};

// Intersection type: UIWidget has members of BOTH Draggable AND Resizable
type UIWidget = Draggable & Resizable;

let textBox: UIWidget = {
    drag: () => { console.log('Dragging the textbox...'); },
    resize: () => { console.log('Resizing the textbox...'); }
};

textBox.drag();
textBox.resize();

// If we try to create an object that only implements one part:
// let notAWidget: UIWidget = { drag: () => {} }; // Error: Property 'resize' is missing
```
*   The `&` operator creates an intersection type.
*   An intersection of primitive types like `number & string` is not practically possible and would result in a `never` type, as a value cannot be both a number and a string simultaneously. Intersections are most useful with object types.

#### Literal Types
**(00:54:50)**
Literal types allow you to specify the *exact* values a variable can hold.

```typescript
// src/index.ts

// A variable that can ONLY be 50
let quantityExact: 50 = 50;
// quantityExact = 51; // Error: Type '51' is not assignable to type '50'.

// More useful when combined with Union Types:
let quantity: 50 | 100 = 100;
quantity = 50;
// quantity = 75; // Error: Type '75' is not assignable to type '50 | 100'.

// Using Type Aliases with Literal Types:
type Quantity = 50 | 100;
let myQuantity: Quantity = 50;

type Metric = 'cm' | 'inch';
let lengthUnit: Metric = 'cm';
// lengthUnit = 'meter'; // Error
```
Literal types are great for constraining values to a specific, small set.

#### Nullable Types
**(00:56:35)**
TypeScript is strict about `null` and `undefined` to help prevent common runtime errors.

```typescript
// src/index.ts

function greet(name: string) {
    console.log(name.toUpperCase());
}

// greet(null); // Error: Argument of type 'null' is not assignable to parameter of type 'string'.
               // This is because "strictNullChecks": true is enabled (usually by "strict": true).

// To allow null or undefined, use a Union Type:
function greetNullable(name: string | null | undefined) {
    if (name) { // Checks if name is truthy (not null, undefined, empty string, 0, false)
        console.log(name.toUpperCase());
    } else {
        console.log('Hola!'); // Default greeting if name is null/undefined
    }
}

greetNullable('Mosh');    // MOSH
greetNullable(null);      // Hola!
greetNullable(undefined); // Hola!
```
*   The `strictNullChecks` compiler option (in `tsconfig.json`, enabled by default with `strict: true`) is responsible for this behavior.
*   It's generally good to keep `strictNullChecks` enabled and explicitly allow `null` or `undefined` via union types when necessary.

#### Optional Chaining (Property Access, Element Access, Call Operators)
**(00:59:12)**
Optional chaining (`?.`) provides a concise way to access properties or call methods on potentially `null` or `undefined` objects without causing a runtime error.

```typescript
// src/index.ts

type Customer = {
    birthday?: Date; // Birthday is optional
};

function getCustomer(id: number): Customer | null | undefined {
    if (id === 0) return null; // No customer found
    if (id === -1) return undefined; // Another way to indicate no customer
    return { birthday: new Date() }; // Customer found
}

let customer0 = getCustomer(0); // customer0 is null
let customer1 = getCustomer(1); // customer1 is { birthday: Date }
let customerNeg1 = getCustomer(-1); // customerNeg1 is undefined

// 1. Optional Property Access Operator (`?.`)
// Old way (without optional chaining):
// if (customer1 !== null && customer1 !== undefined && customer1.birthday) {
//    console.log(customer1.birthday.getFullYear());
// }

// With optional chaining:
// Access 'birthday' only if 'customer1' is not null/undefined.
// Then, access 'getFullYear' only if 'birthday' is not null/undefined.
console.log('Customer 1 BDay Year:', customer1?.birthday?.getFullYear()); // Logs current year
console.log('Customer 0 BDay Year:', customer0?.birthday?.getFullYear()); // Logs undefined (no error)
console.log('Customer -1 BDay Year:', customerNeg1?.birthday?.getFullYear()); // Logs undefined (no error)

// If any part of the chain (customer or birthday) is null/undefined,
// the expression short-circuits and returns 'undefined'.

// 2. Optional Element Access Operator (`?.[index]`)
// Useful for arrays that might be null/undefined.
let customers: Customer[] | null = null;
// customers = [{ birthday: new Date() }, { /* no birthday */ }];

// Access element 0 only if 'customers' is not null/undefined
console.log('First customer bday year:', customers?.[0]?.birthday?.getFullYear()); // Logs undefined

// 3. Optional Call Operator (`?.()`)
// Useful for functions that might be null/undefined.
let log: ((message: string) => void) | null = null;
// log = (message) => console.log(message);

// Call 'log' only if it's an actual function.
log?.('Hello from optional call'); // Does nothing if log is null, no error.

if (typeof console !== 'undefined') { // Ensure console exists (e.g. in some environments)
    log = (message) => console.log(message);
}
log?.('This will be logged'); // This will be logged
```
Optional chaining significantly simplifies code that deals with potentially missing data, making it more readable and less error-prone than nested `if` checks.

---

This covers a significant portion of the fundamentals explained in the first hour of Mosh's course! It's a lot of ground, but these concepts are foundational to mastering TypeScript.