function sum(a,b){
    return a+b;
}

const sum2 = (a,b) => {
    return a+b;
}

const obj = {
    name: 'Object Name',
    regFunc: function() {
      console.log(this.name);
    },
    arrowFunc: () => {
      console.log(this.name);
    }
  };
  
  obj.regFunc();   // Logs: 'Object Name'
  obj.arrowFunc(); // Logs: undefined (because arrow's this is from the enclosing scope)
  
  function regFunc() {
    console.log(arguments);
  }
  const arrowFunc = () => {
    console.log(arguments); // ReferenceError: arguments is not defined // * but now its not the case in modern nodejs
  };
  
  regFunc(1, 2, 3); // Logs: [1, 2, 3]
  arrowFunc(1, 2, 3); // Uncommenting this will throw an error
  
const arr = [1, 2, 3, 4, 5];

// * make the elements doubled
// ! one way would be to use a for loop
// ! other way would be to use the map function
const doubledArr = arr.map(function(num) {
    return num * 2;
});

// or 

function mapp(data){
    return data*2;
}

const doubledArr2 = arr.map(mapp);

console.log(doubledArr2); // Logs: [2, 4, 6, 8, 10]

console.log(doubledArr); // Logs: [2, 4, 6, 8, 10]

function filterr(data){
    return data>2;
}
const filteredArr = arr.filter(filterr);
console.log(filteredArr); // Logs: [3, 4, 5]


const stringg = "Hello World";

console.log(stringg.startsWith("Hello")); // Logs: true
console.log(stringg.endsWith("World")); // Logs: true

// const express = require('express');

// app = express();

// const port=3000;

// app.get("/", (req, res) => {
//     res.send("Hello World");
// }
// );

// app.get("/v2",function(req, res){
//     res.send("Hello World v2");
// }
// );


// app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
// }
// );