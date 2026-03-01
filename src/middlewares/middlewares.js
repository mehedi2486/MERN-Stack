const express = require('express');
const app = express();

let requestCount = 0;



function loggerMiddleWare(req, res, next){
   console.log("Method is "+ req.method)
   console.log("Url is "+ req.url)
   console.log(new Date());
   next();

}
app.use(loggerMiddleWare);

app.get('/sum', function (req, res){
   const a = parseInt(req.query.a);
   const b = parseInt(req.query.b);
   res.json({
      ans: a+b
   })
})


app.get('/multiply', function (req, res){
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





function add (a, b){
   return a+b;
}

const add = (a, b) =>{
   return a+b;
}

const add = (a,b) => a+b;

const arr = [1,2,3,4,5];

for(let i=0; i<23; i++){
   console.log(i);
}
const doubled = arr.map(function sum(a){
   return num *2;
})

const users = [
   {name: "mehedi", age:20},
   {name: "raju", age:45}
]

const name = users.map((user)=>{ user.name})

const number = [1,23,4,5,6];

const even = number.filter(num => num % 2 === 0);



async function getData(){
   const response = await axios.get('',{
      username:"harkirat",
      password:"1213423",
   },
   {
      headers: {
         Authorization:"Bearer 123",

      },
   },  
  
);
}