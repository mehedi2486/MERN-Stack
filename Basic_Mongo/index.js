const express = require("express");
const bcrypt = require("bcrypt");
const { UserModel, TodoModel } = require("./db");
const JWT_SECRET = "ajhdja93872948";
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const {z} = require("zod");

mongoose.connect(
  // 
);

const app = express();
app.use(express.json());

app.post("/signup", async function(req, res) {

      const requireBody = z.object({
        email:z.string().min(3).max(100).email(),
        password:z.string().min(3).max(100),
        name:z.string().min(3).max(100)
      })

      // const parsedData = requireBody.parse(req.body);
      const parseDataWithSuccess = requireBody.safeParse(req.body);

      if(!parseDataWithSuccess.success){
        res.json({
          message:"Incorrect format"
        })
        return

      }


        const email = req.body.email;
        const password = req.body.password;
        const name = req.body.name;

    
        const hasedPassword = await bcrypt.hash(password, 10);
    
        await UserModel.create({
            email: email,
            password: hasedPassword,
            name: name
        });
        
        res.json({
            message: "You are signed up"
        })
    });


app.post("/signin", async function (req, res) {
  const email = req.body.email;
  const password = req.body.password;

  const response = await UserModel.findOne({
    email: email,
  });

  const passwordMatch = await bcrypt.compare(password, response.password);

  if (passwordMatch) {
    const token = jwt.sign(
      {
        id: response._id.toString(),
      },
      JWT_SECRET,
    );

    res.json({
      token,
    });
  } else {
    res.status(403).json({
      message: "Incorrect creds",
    });
  }
});

function auth(req, res, next) {
  const token = req.headers.token;

  const response = jwt.verify(token, JWT_SECRET);

  if (response) {
    req.userId = response.id;
    next();
  } else {
    res.status(403).json({
      message: "Incorrect creds",
    });
  }
}

app.post("/todo", auth, async function (req, res) {
  const userId = req.userId;
  const title = req.body.title;
  const done = req.body.done;

  await TodoModel.create({
    userId,
    title,
    done,
  });

  res.json({
    message: "Todo created",
  });
});

app.get("/todos", auth, async function (req, res) {
  const userId = req.userId;

  const todos = await TodoModel.find({
    userId,
  });

  res.json({
    todos,
  });
});

app.listen(3000);
