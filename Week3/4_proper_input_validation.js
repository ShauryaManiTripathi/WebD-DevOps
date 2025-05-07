const express = require("express");
const app = express();
const zod= require("zod");
const schema = zod.array(zod.number()); 


app.use(express.json()); // .json has its own parameters.

app.post("/", function (req, res) {
    const kidneys = req.body.kidneys;
    const response = schema.safeParse(kidneys);
    if(!response.success){
        res.status(400).json({ message: "Invalid input: kidneys must be an array of numbers" });
    }
    res.json({ message: `You have ${response.data.length} kidneys` });
});

// lets make complex schema
// email: string -> email
// password: at least 8 characters -> password
// country: "IN" or "US" -> country

const complexSchema = zod.object({
    email: zod.string().email(),
    password: zod.string().min(8),
    country: zod.enum(["IN", "US"]),// z.literal("IN").or(z.literal("US"))
});
app.post("/complex", function (req, res) {
    const data = req.body;
    console.log(data);
    const response = complexSchema.safeParse(data);
    if (!response.success) {
        return res.status(400).json({ message: "Invalid input" });
    }
    res.json({ message: `You have ${response.data.email}` });
});

let arr = ["1",2,3,4];
const newschem = zod.array(zod.union([zod.string(), zod.number()]));
const anotherschem = zod.array(zod.number());

console.log(newschem.safeParse(arr));
console.log(anotherschem.safeParse(arr));

app.listen(3000);