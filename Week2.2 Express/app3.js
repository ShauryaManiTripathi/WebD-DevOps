const express = require('express');

function calculate(a,b){
     const p = Math.random()*4;
     if(p<1){
         return a+b;
     }
        else if(p<2){
            return a-b;
        }
            else if(p<3){
                return a*b;
            }
            else{
                return a/b;
            }
}
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    console.log(req,res);
    res.send('Hello World!');
    }
);

app.get('/calculate', (req, res) => {
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);
    const result = calculate(a,b);
    console.log(result);
    res.send(`Result: ${result}`);
    }
);
// call /calculate with route like /calculate?a=5&b=3
app.listen(port,'0.0.0.0');