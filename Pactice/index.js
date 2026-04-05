const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "fhjkwsh39874";
const { UserModel, TodoModel } = require("./db");

mongoose.connect("mongodb+srv://admin:AELFeFNd6xKFuP0C@cluster0.rtlmthq.mongodb.net/pactice-todo")

const app = express();
app.use(express.json());

app.post("/signup",async function (req, res) {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  await UserModel.create({
    username: username,
    email: email,
    password: password,
  });

  res.json({
    msg: "user signup successfull", 
  });
});

app.post("/signin", async function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  const user = await UserModel.findOne({
    username,
    password,
  });

  if (user) {
    const token = jwt.sign(
      {
        id: user._id.toString(),
      },
      JWT_SECRET,
    );

    res.json({
      token: token,
    });
  } else {
    res.status(403).json({
      msg: "Invalid credintial",
    });
  }
});

app.post("/todo", function (req, res) {
    const userId = req.id;
    
});

app.post("/todos", function (req, res) {});

app.listen(3000);
