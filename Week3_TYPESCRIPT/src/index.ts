// index.ts
console.log('Hello World');

let age: number = 20;
// age = 'something'; // This would show an error in VS Code immediately!

if (age < 50) {
    age += 10;
}
console.log(age);