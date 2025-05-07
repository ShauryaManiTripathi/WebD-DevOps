const express = require('express');

const app = express();

var user  = [
    {
        name: 'John Doe',
        age: 30,
        isHealthy: true
    },
    {
        leftKidney: false,
        rightKidney: true
    }
]

const port = 3000;

app.get('/', (req, res) => {
        const johnKidneys = user[1];
        const healthyKidneysCount = Object.values(johnKidneys).filter(kidney => kidney === true).length;
        //res.send(`John's Healthy Kidneys: ${JSON.stringify(healthyKidneysCount)}`);
        res.json({
            message: `John's Healthy Kidneys: ${JSON.stringify(healthyKidneysCount)}`,
            isHealthy: `${JSON.stringify(user[0].isHealthy)}`
        });
    }
);

app.get('/v2', (req, res) => {
    const leftt= user[1].leftKidney;
    const rightt = user[1].rightKidney;
    res.json({
        leftt,
        rightt
    });
}
);


// * query parameter can be used to get the input

app.post('/', (req, res) => {
        const isHealthy = req.query.isHealthy;
        // true string to true in bool
        console.log(isHealthy);
        console.log(typeof isHealthy);
        user[0].isHealthy = isHealthy === 'true';
        res.json({message: `John's health status updated to: ${isHealthy}`});
    }
);

app.post('/v2', (req, res) => {
    const isHealthy = req.body.isHealthy;
    // true string to true in bool
    console.log(isHealthy);
    console.log(typeof isHealthy);
    user[0].isHealthy = isHealthy === 'true';
    res.json({message: `John's health status updated to: ${isHealthy}`});
}
);


app.get('/:id', (req, res) => {
    const id = req.params.id;
    console.log(`ID: ${id}`);
    res.send(`ID: ${id}`);
}
);

// v2 needs middleware to parse the body, body-parsers

app.use(express.json()); // for parsing application/json

app.post('/v3', (req, res) => {
    const isHealthy = req.body.isHealthy;
    // true string to true in bool
    console.log(isHealthy);
    console.log(typeof isHealthy);
    user[0].isHealthy = isHealthy == true;
    res.json({message: `John's health status updated to: ${user[0].isHealthy}`});
}
);


app.put('/', (req, res) => {
        user[1]['leftKidney']=true;
        user[1]['rightKidney']=true;
        user[0]['isHealthy']=true;
        res.json({Health: `John's health status updated to: ${user[0].isHealthy}`,leftKidney: `${user[1].leftKidney}`, rightKidney: `${user[1].rightKidney}`});
    }
);
console.log('Stringfier Checking: ',JSON.stringify(user[1]['leftKidney']));
app.delete('/', (req, res) => {
    if(user[0]['isHealthy'] == false && user[1]['leftKidney'] == false && user[1]['rightKidney'] == false){
        res.status(400).json({message: "John's kidneys are already bad"});
    }
        user[0]['isHealthy']=false;
        user[1]['leftKidney']=false;
        user[1]['rightKidney']=false;
        res.json({Health: `John's health status updated to: ${user[0].isHealthy}`,leftKidney: `${user[1].leftKidney}`, rightKidney: `${user[1].rightKidney}`});
    }
);

// this is april fools
app.delete('/v2', (req, res) => {
    if(user[0]['isHealthy'] == false && user[1]['leftKidney'] == false && user[1]['rightKidney'] == false){
        res.error('John\'s kidneys are already bad'); // funny /v2 in delete, there is no such .error ^^
    }
        user[0]['isHealthy']=false;
        user[1]['leftKidney']=false;
        user[1]['rightKidney']=false;
        res.json({Health: `John's health status updated to: ${user[0].isHealthy}`,leftKidney: `${user[1].leftKidney}`, rightKidney: `${user[1].rightKidney}`});
    }
);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
    }
);

