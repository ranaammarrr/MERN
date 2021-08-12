const express = require('express');
const router = express.Router();


require('../db/conn');
const User = require("../model/userSchema");


router.get('/', (req, res) => {
    res.send(`Hello Home from Router js`);
});

router.post('/register', (req, res) => {

    const { name, email, phone, work, password, cpassword } = req.body;
    

    if(!name || !email || !phone || !work || !password || !cpassword){
        return res.status(422).json({Error: "Please fill"});
    }

    User.findOne({email:email} ).then((userExist) => {
        if (userExist){
            return res.status(422).json({ error: "Email already exist"});
        }
        const user = new User({name, email, phone, work, password, cpassword});

        user.save().then(() => {
            res.status(201).json({message: "User registered"});
        }).catch((err) => res.status(500).json({error: "failed registered"}));
        
       
    }).catch(err => { console.log(err); });

});

module.exports = router;



