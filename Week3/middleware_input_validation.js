const express = require("express");

const app = express();

// Error handling for JSON parsing
app.use(express.json());// .json has its own parameters.

function validat(req,res,next){
    const kidneys = req.body.kidneys;
    if (!Array.isArray(kidneys)) {
        return res.status(400).json({ message: "Invalid input: kidneys must be an array" });
    }
    next();
}

app.get('/',validat,(req, res) => {
    const kidneys = req.body.kidneys;
    const kidneyslength = kidneys.length;
    res.status(200).json({ message: `You have ${kidneyslength} kidneys` });
}
);

// ! But no matter what, in certain malformed body, it will still throw backend specific error, exposing server details.

app.listen(3000);


// hello, how are you