// callback and promises done,
// now using promises for async and await
const fs = require('fs');
const { resolve } = require('path');
function dumm(){
    return new Promise((resolve, reject) => {
        fs.readFile('a.txt', 'utf8', (err, data) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(data);
        }
        );
    });
}
async function readFileAsync() {
    try {
        const data = await dumm();
        console.log('File content:', data);
    } catch (error) {
        console.error('Error reading file:', error);
    }
}

// readFileAsync();










function dumm2(){
    return new Promise((resolve, reject) => {
        resolve('hello');
    });
}


dumm2().then((data) => {
    console.log('1. Data:', data);
}
).catch((error) => {
    console.error('Error:', error);
});

async function main1(){
    const p = dumm2();
    console.log('1. main1 Data:', await p);
}

async function main2(){
    const p = dumm2();
    console.log('2. main2 Data:', p);
}

async function main3(){
    const p = await dumm2();
    console.log('Hello from main3');
    console.log('3. main3 Data:', await p);
}
async function main3_v2(){
    dumm2().then((p) => {
        console.log('3_v2. main3_v2 Data:', p);
    });
    console.log('Hello from main3_v2');
}

main1();
main2();
console.log('             ^^^             resolved yet not awaited');
main3();
main3_v2();

// Async and Await removes callback and .then syntaxes, so lets see how this work

// await suspends the execution of the function until the promise is resolved
// await can only be used inside async functions

// * promises.then kinda pushed to webAPI and functions continue, but in async/await, it waits for the promise to be resolved at AWAIT