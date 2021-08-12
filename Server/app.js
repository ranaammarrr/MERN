const dotenv = require("dotenv");
const mongoose = require('mongoose');
const express = require ('express');
const app = express();

dotenv.config({ path: './config.env'});

require('./db/conn');
// const User = require('./model/userSchema');

app.use(express.json());


app.use(require('./router/auth')); //to link router files.


const PORT= process.env.PORT;



// middleware
const middleware = (req, res, next)=>{
    console.log(` Middleware`);
    next();

}

app.get('/', (req, res) => {
    res.send(`Hello Homeeeee`);
});


app.get('/contact', (req, res) => {
    res.send(`Hello Contacttt`);
})


app.get('/about',middleware, (req, res) => {
    console.log(`Hello About`);
    res.send(`Hello Aboutt`);
})


app.get('/signin', (req, res) => {
    res.send(`Hello Login`);
})


app.get('/signup', (req, res) => {
    res.send(`Hello Registeration`);
})

app.listen(PORT, () =>{
    console.log(`server is running at ${PORT}`);
})
