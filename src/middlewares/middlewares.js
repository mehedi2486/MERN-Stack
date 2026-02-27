const express = require('express');
const app = express();


function isEligibleForVote(req, res, next){
   const age = req.query.age;
     if (age >= 18){
        next();
     }else {
        res.json(
            { msg: "You are not eligible for voting"}
        )
     }
}

// app.use(isEligibleForVote);

app.get('/ride1', isEligibleForVote, function (req,res){
   res.json ({
      msg:"you have successfully riden the ride 1"
   })
})


// app.get('/ride2', function (req, res){
//    if (isOldEnough (req.query.age)){
//       res.json ({
//          msg:"you have successfully riden the ride 2"
//       })
//    }
// })

app.listen(3000);

