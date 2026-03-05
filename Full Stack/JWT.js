const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

const users = [];

const JWT_SECRET = "nahidarenunuChoto";

app.use(express.json());

function logger(req, res, next){
    console.log(`${req.method} request came`);
    next();
}

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
})

app.post('/signup',logger, (req, res)=>{
    const username = req.body.username;
    const password = req.body.password;
    
    users.push({
        username,
        password
    })
    res.json({
        msg:"user signup successful"
    })
    console.log(users);
})

app.post('/signin',logger, (req, res)=>{
    const username = req.body.username;
    const password = req.body.password;

    const isFound = users.find((u) => u.username === username && u.password === password);

    if(isFound){
        const token = jwt.sign({
            username
        }, JWT_SECRET);

        res.send({
            token:token
        })
    
    } else{
        res.json({
            msg: "user not found"
        })
    }

    console.log(users);
})

function auth(req, res, next){
    const token = req.headers.token;
    const decodeInformation = jwt.verify(token, JWT_SECRET);
    if(decodeInformation.username){
        req.username = decodeInformation.username;
        next(); 
    } else {
        res.json({
            message: "You are not Logged in"
        })
    }

}


app.get('/me',logger,auth, (req, res) => {

        const user = users.find((u) => u.username === req.username);

        if (user) {
            res.send({ username: user.username,
                password : user.password
             });
        } else {
            res.status(403).send("User not found. Please sign up again.");
        }
}) 
       


app.listen(3000);