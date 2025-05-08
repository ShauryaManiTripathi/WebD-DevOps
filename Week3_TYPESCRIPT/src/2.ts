
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