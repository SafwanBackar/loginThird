const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const User = require('./models/User')
const Blog = require('./models/Blogs')
const app = express();
const bcrypt = require('bcrypt');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
    console.log("Connected successfully");
});

mongoose.connect("mongodb://localhost/loginThird")

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(methodOverride('_method'))



app.get('/', (req,res)=>{
    res.send('working')
})

app.get('/home', (req,res) =>{
    res.json({
        "hello":"asfd"
    })
})

app.post('/register', async (req,res) =>{
    let username  = req.body.username
    let    email  = req.body.email
    let  password = req.body.password
    let hashedPassword = await bcrypt.hash(password, 10) 
    let newUser = ({username: username, email: email, password: hashedPassword})
    User.create(newUser, err =>{
        if(err){
            console.log("ERROR");
            console.log(err)
        }else{
            console.log('working bith');          
        }
    })    
})




app.put('/edit/:id', (req,res) =>{
    User.findByIdAndUpdate(req.params.id, {username: req.body.username}, (err, editUser) =>{
        if(err){
            res.send('There was an error in updating')
            console.log(err)
        }else{
            res.send('working')
        }
    } )
})

app.delete('/:id', (req,res) =>{
    User.findByIdAndDelete(req.params.id, (err) =>{
        if(err){
            console.log(err)
        }else{
            res.send('Deleted')
        }
    })
})



app.listen(3040, () => console.log(`Server running`))