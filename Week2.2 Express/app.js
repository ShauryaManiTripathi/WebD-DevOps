const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    console.log(req,res);
    res.send('Hello World!');
    });
app.get('/about', (req, res) => {
    console.log(req,res);
    res.send('About Page');
    });

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
    }
);