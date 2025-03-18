class Animal{
    constructor(name,legCount,speaks){
        this.name=name;
        this.legCount=legCount;
        this.speaks=speaks;
    }
    speak(){
        //ternary operator with console.log
        console.log(this.speaks ? this.speaks : "I don't speak");
    }
    static myType(){
        console.log("I am an animal");
    }
}

let dog=new Animal("Dog",4,"Bark");
console.log(dog.toString());
let rat=new Animal("Rat",4);
[dog,rat].forEach(function(animal,index){
    console.log(`Animal ${index+1}: ${animal.name}`);
    console.log(`Leg count: ${animal.legCount}`);
    animal.speak();
});



Animal.myType();


console.log('\n');


// Example: Calculate time taken by a function
const beforeDate = new Date();
const beforeTimeInMs = beforeDate.getTime();

// ... some code that takes time ...
setTimeout(() => {
    const afterDate = new Date();
    const afterTimeInMs = afterDate.getTime();
    console.log(afterTimeInMs - beforeTimeInMs + " in setTimeout");
}, 1000);

const afterDate = new Date();
const afterTimeInMs = afterDate.getTime();

console.log(afterTimeInMs - beforeTimeInMs);


const user = { name: "Harkirat", age: 30, gender: "male" };
const jsonString = JSON.stringify(user);
console.log(jsonString);
const user2 = JSON.parse(jsonString);
console.log(user2.name); // Output: Harkirat
console.log(user2);      // Output: { name: 'Harkirat', age: 30, gender: 'male' } (This is an object!)


if (1<=2){
    console.log("b is greater than or equal to 1");
}

let arr = [1,2,3]

arr.forEach((element,index) => {
    console.log(element,index);
}
);