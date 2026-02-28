const express = require('express');
const app = express();

let requestCount = 0;


function requestIncrease(req, res){
requestCount = requestCount + 1;
console.log(`Total number of requests = ${requestCount}`)

}


app.get('/sum',requestIncrease, function (req, res){
   requestIncrease();
   const a = parseInt(req.query.a);
   const b = parseInt(req.query.b);
   res.json({
      ans: a+b
   })
})


app.get('/multiply', function (req, res){
   requestIncrease();
   const a = parseInt(req.query.a);
   const b = parseInt(req.query.b);
   res.json({
      ans: a*b
   })
})

// app.get('/add/:a/:b', function(req, res){
//    const a = parseInt(req.params.a);
//    const b = parseInt(req.params.b);

//    res.json({
//       answer: a+b
//    })
// })

// app.use(isEligibleForVote);

// app.get('/ride1', isEligibleForVote, function (req,res){
//    res.json ({
//       msg:"you have successfully riden the ride 1"
//    })
// })


// app.get('/ride2', function (req, res){
//    if (isOldEnough (req.query.age)){
//       res.json ({
//          msg:"you have successfully riden the ride 2"
//       })
//    }
// })

app.listen(3000);

