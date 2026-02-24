const express = require('express');
const app = express();


function TicketChecker(req, res, next){
    const ticket = req.query.ticket;
    if(ticket === "free"){
        next();
    }else {
        res.status(403).send("Forbidden");
    }

}

app.use(TicketChecker);

app.get('/ride1', function (req, res){
    res.send("Enjoy your ride 1");
})

app.get('/ride2', function (req, res){
    res.send("Enjoy your ride 2");
})

app.get('/ride3', function (req, res){
    res.send("Enjoy your ride 3");
})

app.listen(3000);

