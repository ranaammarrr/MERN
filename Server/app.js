const mongoose = require('mongoose');
const express = require ('express');
const app = express();

const DB = 'mongodb+srv://ranaammarrr:corsairlpx@cluster0.daydk.mongodb.net/mernstack?retryWrites=true&w=majority';

mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(()=>{
    console.log(`Connection Successful`);
}).catch((err)=>{
    console.log(`No Connnection`)
});

// middleware
const middleware = (req, res, next)=>{
    console.log(`Hello Middleware`);
    next();

}

app.get('/', (req, res) => {
    res.send(`Hello Home`);
})


app.get('/contact', (req, res) => {
    res.send(`Hello Contact`);
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

app.listen(4000, () =>{
    console.log(`server is running`);
})
