// promise - nothing but sytactical sugar over async

const fs = require("fs");

// Under the hood, promise is a callback function


// just syntactical sugar
// more readable way to write async funcs

// How you would create your own async functions
// Approach 1
// 99% of the time, when making our own async functions, we will generally be wrapping existing async functions
// This approach uses a callback function

function readFL(filee,callback){
    fs.readFile(filee, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        callback(data);
    });
}

function myOwnTimeout(fn,duration){
    setTimeout(fn,duration);    
}


myOwnTimeout(function(){
    console.log('Hello');
},2000);


// in the ahove dummy examples, myOwnTimeout wont reach the callback queue or webAPIs, it will be executed in the call stack itself
//  they are async functions tho
// but setTimeout will reach the callback queue and then the event loop will push it to the call stack


// fun thing, you can nest async functions
// this is a callback hell
// this is why promises were introduced
// promises are a way to avoid callback hell
setTimeout(function(){
    console.log('Hello');
    setTimeout(function(){
        console.log('World');
    },2000);
}
,2000);

// like think, if promises werent there
// so this would look like
// waitFor(1000);
// console.log('Hello');
// waitFor(1000);
// console.log('World');
// but here the thread is very busy

// so the above both scenarios, the callback hell and the waitFor scenario, are solved by promises

// in a long run, we would see how promises lead to better code, instead of calling async in async in async

// Approach 2 in 6.js
console.log('Approach 2');
function readFL2(filee){
    return new Promise((resolve,reject)=>{
        fs.readFile(filee, 'utf8', (err, data) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(data);
        });
    });
}

readFL2('b.txt').then((data)=>{
    console.log(data);
}
).catch((err)=>{
    console.error(err);
});
