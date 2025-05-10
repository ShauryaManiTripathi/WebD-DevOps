const express = require("express");
const cors = require("cors");

const app = express();
const port = 3001;
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
}
);

app.get("/interest",(req,res)=>{
    let a = parseInt(req.query.principal);
    let b = parseInt(req.query.rate);
    let c = parseInt(req.query.time);

    let interest = (a * b * c) / 100;
    let total = a + interest;
    res.json({
        principal: a,
        rate: b,
        time: c,
        interest: interest,
        total: total
    });

})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
}
);