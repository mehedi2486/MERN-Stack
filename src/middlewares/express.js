const express = require('express');
const bodyParser = require('body-parser');
const app = express();


// function middlewares(req, res, next){
//     console.log("hello");
//     res.send("done")
// }

//app.use(bodyParser.json());
app.use(express.json());



app.post('/data', (req , res) => {
    const data = req.body;
    console.log("Receive data: ",data)


    res.send('Data recived');
})


app.listen(3000, function(){
    console.log("Server is running at port 3000")
})