// * do a network call
// * sleep/wait for some time
// * read a file
// * database call


// when a reject is called, the promise is rejected
// it is handled by .catch

let n = new Promise((resolve,reject)=>{
    reject('Error');
}
);
console.log(n);
n.then(function(){
    console.log('Resolved');
}
).catch(function(err){
    console.error(err,"lmao");
}
);

let nn = new Promise(function(resolve){
    resolve('Resolved');
    console.log('checking nn',nn);
});

// ! checking nn wont work, as its not a promise yet, or even tho resolve is called, it is not created a promise completely



nn.then(function(data){
    console.log(data);
});

// when a task is tranferred, delegated to WEB APIs, its handled by other threads

// but after it comes back from callback queue, it is handled by the main thread
// web APIs are cpp code

// node's web APIs are libuv
// chrome's web APIs are V8
// they different, one difference would be, you cant read file in browser, but you can in node

// promises are just made to avoid callback hell

// * Callback => callback hell
// * Promises => avoid callback hell and async/await

// ? promise chaining

// make a code to show promise chaining

// Promise chaining example
function step1() {
    return new Promise((resolve, reject) => {
        console.log("Step 1 executing...");
        setTimeout(() => {
            resolve("Step 1 completed");
        }, 1000);
    });
}

function step2(previousResult) {
    return new Promise((resolve, reject) => {
        console.log(`Previous step result: ${previousResult}`);
        console.log("Step 2 executing...");
        setTimeout(() => {
            resolve("Step 2 completed");
        }, 1000);
    });
}

function step3(previousResult) {
    return new Promise((resolve, reject) => {
        console.log(`Previous step result: ${previousResult}`);
        console.log("Step 3 executing...");
        setTimeout(() => {
            // Occasionally fail to demonstrate error handling
            if (Math.random() > 0.7) {
                reject("Step 3 failed randomly");
            } else {
                resolve("Step 3 completed");
            }
        }, 1000);
    });
}

// Demonstrate promise chaining
step1()
    .then(result => step2(result))
    .then(result => step3(result))
    .then(finalResult => {
        console.log(`Final result: ${finalResult}`);
        console.log("All steps completed successfully");
    })
    .catch(error => {
        console.error(`Chain failed: ${error}`);
    });

// .then and .catch  remove need of try catch

// another example
const fs = require('fs');

function readFL3(){
    return new Promise(function(resolve,reject){
        fs.readFile('a.txt','utf8',(err,data)=>{
            if(Math.random()>0.5){
                //reject('Error');
                reject(err);
                return;
            }
            resolve(data);
        });
    }
    );
}

function onDone(data){
    console.log('Success ',data);
}

readFL3().then(result => onDone(result)).catch((err)=>{
    console.error('error ',err);
});
readFL3().then(onDone).catch((err)=>{
    console.error('error ',err);
});
readFL3().then(function(data){
    console.log('Success ',data);
}).catch((err)=>{
    console.error('error ',err);
});


// ! BIG THING , -> promise is synchronously returned, but it may be pending or resolved or rejected
// * but data of the promise comes asynchronously
// resolve() returns undefined
// resolve(x) returns x


