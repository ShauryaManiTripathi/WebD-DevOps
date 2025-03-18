//"use strict";

console.log(Math.PI);
console.log(Math.random());
console.log(Math.max(1, 5, 2, 9, 3)); // Output: 9

// return max from a array
let arr = [1, 5, 2, 9, 3];
console.log(Math.max(...arr)); // Output: 

//what is ...arr
// ...arr is spread operator
// It spreads the array into individual elements
// It is used to pass elements of an array as arguments to a function
// It is used to copy an array
// It is used to concatenate arrays

// Example: Pass elements of an array as arguments to a function
function subtract(a, b) {
    return a - b;
}

// Example: Copy an array
let arr2 = [...arr];
console.log(arr2);

// Example: Concatenate arrays
let arr3 = [7, 8, 9];
let arr4 = [...arr, ...arr3];
console.log(arr4);

const obj1 = { a: 1, b: 2 };
const obj2 = { b: 3, c: 4 };
const merged = Object.assign({}, obj1, obj2); // {} is important to avoid modifying obj1
console.log(merged); // Output: { a: 1, b: 3, c: 4 }
console.log(obj1);   // Output: { a: 1, b: 2 } (obj1 is unchanged)



let count = 0;
const intervalId = setInterval(function() {
  count++;
  console.log("Count:", count);
  if (count >= 5) {
    clearInterval(intervalId); // Stop the interval
    console.log("Interval cleared.");
  }
}, 1000); // Execute every 1 second

try {
    // Code that might throw an error
    const result = 1/0;
    console.log(result);
    throw new Error("This is an error");
} catch (error) {
    // Code to handle the error
    console.error("An error occurred:", error);
} finally {
    // (Optional) Code that will always execute, regardless of whether an error occurred
    console.log("Cleanup or final actions here");
}

function whatIsThis() {
    console.log(this);
  }
  
  whatIsThis(); // 'this' is the global object (window in browsers, global in Node.js)
                 //  or undefined in strict mode.


const myObject = {
name: "My Object",
myMethod: function() {
    console.log(this.name); // 'this' refers to myObject
}
};

myObject.myMethod(); // Output: "My Object"
                
function MyClass() {
    this.property = "Value";
    console.log(this)
}
const instance =  new MyClass() //Output: MyClass {property: 'Value'}
console.log("------------------");
