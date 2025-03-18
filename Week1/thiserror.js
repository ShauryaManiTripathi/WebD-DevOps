class Animal2 {
    constructor(name, speaks) {
      this.name = name;
      this.speaks = speaks;
    }
  
    // Traditional function (works correctly)
    speak() {
      console.log("Hi there " + this.speaks);
    }
  
      // Arrow function (DOES NOT WORK)
    speakArrow = () => {
       console.log("Hi there " + this.speaks);
    }
  }
  
  const dog = new Animal2("Fido", "Woof");
  dog.speak();       // Output: "Hi there Woof" (Correct)
  dog.speakArrow();  // Output: "Hi there undefined" (INCORRECT!)

  class Animal {
    constructor(name, speaks) {
      this.name = name;
      this.speaks = speaks;
      this.speakArrow = this.speakArrow.bind(this); // Explicitly bind this
    }
  
    speak() {
      console.log("Hi there " + this.speaks);
    }
  
    speakArrow = () => {
      console.log("Hi there " + this.speaks);
    }
  }

  const dogg = new Animal("Fido", "Woof");
  dogg.speak();       // Output: "Hi there Woof" (Correct)
  dogg.speakArrow();  // Output: "Hi there undefined" (INCORRECT!)

const arr = [1, 2, 3, 4, 5];
// Traditional Function Expression
arr.forEach(function(element, index) {
    console.log(`Element at index ${index}: ${element}`);
  });
  
  // Arrow Function Equivalent
  arr.forEach((element, index) => {
    console.log(`Element at index ${index}: ${element}`);
  });
  
  // If there's only one parameter, parentheses are optional:
  arr.forEach(element => {
    console.log(element);
  });
  
  // If the function body is a single expression, you can omit the curly braces and the `return` keyword:
  const numbers = [1, 2, 3, 4, 5];
  const doubled = numbers.map(number => number * 2); // Implicit return
  console.log(doubled); // Output: [2, 4, 6, 8, 10]

  console.log(0 && "hello");  // Output: 0 (left-hand side is falsy)
console.log(5 && "hello");  // Output: "hello" (left-hand side is truthy)
console.log("" && 10/0) // Output "" , the right side expression is not evaluated.