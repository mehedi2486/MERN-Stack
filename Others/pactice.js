const express = require('express');
const app = express();

let count = 0;

function countMiddlewares(req, res, next){
    count = count + 1;
    next(); 
}


app.use(countMiddlewares);

app.get('/number',function(req, res){
   console.log(count)
})

app.listen(3000);