var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")

const app = express()

app.use(bodyParser.json())
app.use(express.static('form'))
app.use(bodyParser.urlencoded({
    extended:true
}))

mongoose.connect('mongodb://127.0.0.1:27017/registration');
var db=mongoose.connection
db.on('error',()=>console.log("error"))
db.once('open',()=>console.log("connected to backend"))

app.post("/signUp",(req,res)=>{
    var name = req.body.name
    var age = req.body.age
    var email = req.body.email
    var mobile = req.body.mobile
    var gender = req.body.gender
    var password = req.body.password

    var data={
        "name":name,
        "age":age,
        "email":email,
        "mobile":mobile,
        "gender":gender,
        "password":password
    }
    db.collection('details').insertOne(data,(err,collection) => { 
        if(err){
            throw err;
        }
        console.log("detail saved in backend")
    })
    return res.redirect("successful.html")
})
app.get("/",(req,res)=>{
    res.set({
        "Allow-acces-Allow-Origin":"*"
    })
    return res.redirect("register.html")
}).listen(7000);
console.log("connected with database 7000");