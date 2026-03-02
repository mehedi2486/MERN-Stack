const express = require('express');
const app = express();


function auth(req, res, next){
    console.log("this is the authentacation function");

}

//app.use(bodyParser.json());
app.use(auth());



app.post('/data', (req , res) => {
    const data = req.body;
    console.log("Receive data: ",data)


    res.send('Data recived');
})


app.listen(3000, function(){
    console.log("Server is running at port 3000")
})