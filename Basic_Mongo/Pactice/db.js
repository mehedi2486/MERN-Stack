const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;


const User = new Schema({
    username : String,
    email : String,
    password: Number
})


const Todo = new Schema({
    userId : ObjectId,
    done : Boolean,
    title: String
})

const UserModel = mongoose.model("users", User);
const TodoModel = mongoose.model("Todos", Todo);

module.exports = {
    UserModel,
    TodoModel
}