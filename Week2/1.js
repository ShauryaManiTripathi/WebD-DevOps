//  Need Functions, var, const , data types

// Dont Repeat Yourself -SDE man

// Example of default callback functions available in JS

// 1. setTimeout
// 2. setInterval
// 3. fetch
// 4. addEventListener
// 5. Promise
// 6. async await
// 7. map, filter, reduce
// 8. sort


function power(a,b){
    return Math.pow(a,b);
}

function sumOfPow(power,b, ...args){
    let sum = 0;
    args.forEach((arg)=>{
        sum+= power(arg,b);
    });
    return sum;
}

console.log(sumOfPow(power,2,1,2,3,4,5));

function returnAfterFunc(a,b,func){
    return func(a,b);
}

console.log(returnAfterFunc(2,3,power));


// Callbacks are introduced for async programming
// its also USED for DRY

