const express = require("express");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "kaiodij2382";
const { UserModel, TodoModel } = require("./db");
const { default: mongoose } = require("mongoose");
// const {auth} = require("./auth");

mongoose.connect("mongodb+srv://admin:AELFeFNd6xKFuP0C@cluster0.rtlmthq.mongodb.net/todo-mehedi")
const app = express();



app.use(express.json());

app.post("/signup", async (req, res) => {
  const name = req.body.name;
  const password = req.body.password;
  const email = req.body.email;

  await UserModel.create({
    name: name,
    password: password,
    email: email,
  });

  res.json({
    message: "You are logged in",
  });
});

app.post("/signin",async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const user = await UserModel.findOne({
    email: email,
    password: password,
  });

  console.log(user);

  if (user) {
    const token = jwt.sign(
      {
        id: user._id.toString(),
      },
      JWT_SECRET,
    );
    res.json({
      token:token
    });
  }
  else{
    res.status(403).json({
        msg:"incorrect credantials"
    })
  }
});

app.post("/todo", auth, (req, res) => {
    const userId = req.userId;

    const title = req.body.title;
    TodoModel.create({
        title,
        userId
    })

    res.json({
        userId : userId
    })
    
});

app.get("/todos", auth, async(req, res) => {
    const userId = req.userId;

    const todos = await TodoModel.findOne({
        userId
    })
     res.json({
        todos
    })

});


function auth(req, res, next){
    const token = req.headers.token;

    const response = jwt.verify(token, JWT_SECRET);

    if(response){
        req.userId = response.id;
        next();
    }else{
        res.status(403).json({
            msg:"Incorrect creds"
        })
    }

}

app.listen(3000);
