// let number=1;
// number="hello";
// console.log(number);

// // JS uses single core, but can somehow make use of multiple core using cluster module
// // JS is single threaded, but can be made to run multiple threads using web workers


// // simple primitives
// // variables 

// let a = 1;
// a = 2;
// console.log(a);

// const b = 1;
// console.log(b);
// // b = 2; // error


// // let var amd const
// // string , number and bool
// // null and undefined

//  console.log(a + " and " + b);

//  const ages = [21, 22, 23, 24, 25, 26, 100];
// const numberOfPeople = ages.length;

// for (let i = 0; i < numberOfPeople; i++) {
//   if (ages[i] % 2 == 0) {
//     console.log(ages[i]);
//   }
// }

// function findSum(a,b){
//     return a+b;
// }

// console.log(findSum(1,2));

// // nested object
// let object1 = {
//     name: "John",
//     age: 21,
//     address: {
//       city: "New York",
//       country: "USA",
//     },
//   };

// //print 
// console.log(object1.address.city);
// console.log(object1["address"]["city"]);

// // a["b"] is same as a.b
// // but let str="b"; a[str] is ?
// // a[str] is same as a["b"]

// let str="address";
// console.log(object1[str].city);


// //array of objects
// let people = [
//     {
//       name: "John",
//       age: 21,
//       address: {
//         city: "New York",
//         country: "USA",
//       },
//     },
//     {
//       name: "Jane",
//       age: 22,
//       address: {
//         city: "London",
//         country: "UK",
//       },
//     },
//   ];

//   console.log(people[0].address.city);


// function subtract(a,b){
//     return a-b;
// }

// function arith(a,b,func){
//     return func(a,b);
// }

// console.log(arith(1,2,subtract));
// console.log(arith(1,2,findSum));


// // setTimeout
// let delay=1000;
// function greet(name){
//     if(name==undefined){
//         name="World";
//     }
//     console.log("Hello "+name);
// }
// setTimeout(greet,delay,"John");
// setTimeout(greet,delay);

// setInterval(greet,delay,"John");

let delay=1000;
function check(){
    console.log(Date.now());
}
console.log(Date.now());
setTimeout(check,delay);
console.log(Date.now());


// js is non blocking single threaded language
// js uses event loop and callback queue to handle async operations
// js uses web workers to run multiple threads
// js uses cluster module to use multiple cores
// js uses setTimeout and setInterval to handle async operations
// js uses promises and async await to handle async operations
// js uses fetch to make http requests
// js uses websockets to make real time communication
// js uses local storage and session storage to store data on client side
// js uses cookies to store data on client side
// js uses indexed db to store data on client side
// js uses service workers to make web apps work offline
// js uses web push notifications to send notifications
// js uses web rtc to make real time communication
// js uses web assembly to run high performance code
// js uses webgl to render 3d graphics
// js uses web audio to play audio
// js uses web speech to speech recognition
// js uses web animation to animate elements
// js uses web components to create custom elements


console.log(parseFloat("10.33"));
console.log(parseInt("10.33"));
console.log(parseInt("10.33",10));
console.log(parseFloat("z610d.33dddd"));


const arr = [1, 2, 3];
const newLength = arr.unshift(0, -1); // const disallows reassignment, but allows mutation, which is possible for arrays and objects
console.log(arr);       // Output: [0, -1, 1, 2, 3]
console.log(newLength); // Output: 5

arr.forEach(function(element, index) {
    console.log(`Element at index ${index}: ${element}`);
});


const ages = [21, 22, 23, 24, 25, 26, 100];

const numberOfPeople = ages.length; // Get array length and store in a variable

for (let i = 0; i < numberOfPeople; i++) { // Loop through the array using index 'i'
    if (ages[i] % 2 === 0) {        // Check if the element at index 'i' is even using the modulo operator (%)
        console.log(ages[i]);       // If even, print the element
    }
}
// Output: 22, 24, 26, 100
console.log(ages[0]);

