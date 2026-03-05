const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

const users = [];

const JWT_SECRET = "USER_APP";

app.use(express.json());


app.post('/signup', function(req, res){
    const username = req.body.username;
    const password = req.body.password;

    users.push({
        username:username,
        password:password
    })

    res.json({
        msg:"user signup successful"
    })
    console.log(users);

})

app.post('/signin', function(req, res){
    const username = req.body.username;
    const password = req.body.password;

    const foundUser = users.find(user =>
        user.username === username &&
        user.password === password
    );

    if(foundUser){
        const token = jwt.sign({ //object
            username:username
        },JWT_SECRET)
        // foundUser.token = token;

        res.json({
            token: token
        });

    } else{
        res.status(403).json({
            message: "Invalid username or password"
        });
    }
    console.log(users);
});

app.get('/me', (req, res) => {
    const token = req.headers.token;
    const decodeInformation = jwt.verify(token, JWT_SECRET);
    const username = decodeInformation.username; // decode object . username
    const user = users.find(user => user.username === username);
    if(user){
        res.send({
            username:user.username
        })
    } else {
        res.status(401).send({
            message: "Unauthorized"
        })
    }
})

app.listen(3000);