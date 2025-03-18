// Approach 2
const fs = require('fs');
// This approach uses a promise
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


// lets promisify our own callback based Timwout function
// function myOwnTimeout(fn,duration){
//     setTimeout(fn,duration);    
// }


// myOwnTimeout(function(){
//     console.log('Hello');
// },2000);

// lets promisify our own Timwout function

function promisifiedmyOwnTimeout(duration){
    return new Promise((resolve,reject)=>{
        setTimeout(resolve,duration);
    });
}
// earlier myTimeout returns nothing (undefined), now it returns a promise

// Lets learn it step by step
// but how someone runs anything after its completion, since there is no callback func

// promise is just another class in JS

// callback myTimeout doesnt return anything, but takes callback as input
// its a way to tell the code to run something after the completion of the function

// but in promises, we return a promise object, which has a then method, which takes a callback function as input
// so the code inside the then method runs after the completion of the promise

function promisifiedTimeout(duration){
    const p = new Promise();
    return p;
}

function promisifiedTimeoutV2(duration){
    const p = new Promise(function(resolve,reject){
        setTimeout(resolve,duration);
        // setTimeout(function(){
        //     resolve();
        // },duration);
    });
    return p;
}

const ans = promisifiedTimeoutV2(2000);
// promise
console.log(ans);
ans.then(function(){
    console.log("Promise returned a resolved promise");
    console.log(ans); // value returned by promise
});

// readFile depends on callback

// there is a library called fs-promises, which has promisified versions of all the functions in fs

