const express = require('express');
const app = express();
let user = [{
    name: "John",
    kidneys: [{
        healty: false
    }]
}];


app.get('/', function (req, res){
    const johnKidneys = user[0].kidneys;
    const numberOfKindeys = johnKidneys.length;
    let healtyKidneys = user[0].kidneys.filter(k => k.healty === true).length;
    let unhealtyKidneys = numberOfKindeys - healtyKidneys;
    res.json ({
        numberOfKindeys,
        healtyKidneys,
        unhealtyKidneys
    })
})

app.use(express.json());

app.post('/', function (req, res){
    // console.log(req.body);
    const ishealty = req.body.ishealty;
    user[0].kidneys.push({
        healty: ishealty
    });
    res.json({
        msg: "Kidney added successfully",
    })

})

app.put('/', function (req, res){

    for (let i=0; i<user[0].kidneys.length; i++){
        user[0].kidneys[i].healty = true;
    }
    res.json({});

})

//removing all the unhealthy kidneys from the user
app.delete('/', function (req, res){
    const newKidneys = [];
    for(let i=0; i<user[0].kidneys.length; i++){
        if(user[0].kidneys[i].healty){
            newKidneys.push(user[0].kidneys[i]);
        }
    }

    user[0].kidneys = newKidneys;
    res.json({msg:"done"});

})

app.listen(3000);