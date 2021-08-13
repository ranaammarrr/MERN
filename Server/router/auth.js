const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


require('../db/conn');
const User = require("../model/userSchema");


router.get('/', (req, res) => {
    res.send(`Hello Home from Router js`);
});

// Register Route

// USING PROMISES
// router.post('/register', (req, res) => {

//     const { name, email, phone, work, password, cpassword } = req.body;
    

//     if(!name || !email || !phone || !work || !password || !cpassword){
//         return res.status(422).json({Error: "Please fill"});
//     }

//     User.findOne({email:email} ).then((userExist) => {
//         if (userExist){
//             return res.status(422).json({ error: "Email already exist"});
//         }
//         const user = new User({name, email, phone, work, password, cpassword});

//         user.save().then(() => {
//             res.status(201).json({message: "User registered"});
//         }).catch((err) => res.status(500).json({error: "failed registered"}));
        
       
//     }).catch(err => { console.log(err); });

// });

//using asyn and await

router.post('/register', async (req, res) => {

    const { name, email, phone, work, password, cpassword } = req.body;
    

    if(!name || !email || !phone || !work || !password || !cpassword){
        return res.status(422).json({Error: "Please fill"});
    }
    try {
        const userExist = await User.findOne({email:email});
            if (userExist){
                return res.status(422).json({ error: "Email already exist"});
            }
            else if(password != cpassword){
                return res.status(422).json({ error: "Password does not match!"});
            }
            else{

                const user = new User({name, email, phone, work, password, cpassword});
                await user.save();
                res.status(201).json({message: "User registered"});
            }
          
            
        
    } catch (err) {console.log(err);} 

});

//login route

router.post('/signin', async (req, res) =>{
    try { 

        let token;
        const {email, password} = req.body;
         if (!email || !password){
             return res.status(400).json({error:"please Enter email and password"});
         }

         const userLogin = await User.findOne({email: email});
          //console.log(userLogin)

          if(userLogin){
            const isMatch = await bcrypt.compare(password, userLogin.password);
            
            token = await userLogin.generateAuthToken();
            console.log(token);
            
            res.cookie("jwtoken", token, {

                expires: new Date(Date.now() + 25892000000),
                httpOnly: true

            });


            if(!isMatch){
               res.status(400).json({error: "Invalid Email or Password!"});
            }
            else{
               res.json({message: "Login Successfuly"});
            }

          }
          else{
            res.status(400).json({error: "User not registered"});

          }

          


        
    } catch (err) {
        console.log(err);
        
    }

});

module.exports = router;



