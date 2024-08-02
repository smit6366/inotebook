const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser =require('../Middleware/fetchuser')

const JWT_SECRET ='SmitCyanide'
//Route:1 Create a new user using POST:/api/auth/createuser no login required
router.post('/createuser',[
    body('name','Enter a valid name').isLength({ min: 2 }),
    body('email','Enter Email properly').isEmail(),
    body('password','Password must be atleast 5 characters').isLength({ min: 5})
], async (req,res)=>{
    success=false;
    //If there are errors, return bad requests and errors
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({success,errors: errors.array()});
    }

    //Check whether the user with this email already exists
try {
    

    let user=await User.findOne({email: req.body.email});
    if(user){
        return res.status(400).json({success,error:"Sorry a user with this email already exists"})
    }
    const salt =await bcrypt.genSalt(10);
    const secPass=await bcrypt.hash(req.body.password, salt);
    //Create a new User
    user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass
        })
        const data={
            user:{
                id:user.id
            }
        }
        var authToken = jwt.sign(data, JWT_SECRET);
        success=true;
        res.json({success,authToken})

        // res.json({user})
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Some error occured")
    }
        // .then(user => res. json(user))
        // .catch(err=>{console.log(err)
        // res.json({error: 'Please enter the unique email', message:err.message})}) 

        //Route:2 Login user using POST:/api/auth/createuser no login required
    })
        router.post('/login',[
            body('email','Enter Email properly').isEmail(),
            body('password','Password should not be blank').exists()
        ], async (req,res)=>{
            success=false;
            //If there are errors, return bad requests and errors
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return res.status(400).json({success,errors: errors.array()});
            }
            const {email,password}=req.body;
            try {
                let user =await User.findOne({email})
                if(!user){
                    return res.status(400).json({success,error:"Please try to login with correct credentials(email)"})
                }
                const passCompare =await bcrypt.compare(password,user.password)
                if(!passCompare){
                    return res.status(400).json({success,error:"Please try to login with correct credentials(password)"})  
                }
                const data={
                    user:{
                        id:user.id
                    }
                }
                var authToken=jwt.sign(data,JWT_SECRET);
                success=true;
                res.json({success,authToken});
            } catch (error) {
                console.log(error.message);
                res.status(500).send("Internal server error occured")
            }
        }) 
         //Route:3 Get user id using POST:/api/auth/getuser  login required 
        router.post('/getuser',fetchuser,async (req,res)=>{
            try {
                userId=req.user.id;
                const user=await User.findById(userId).select("-password")
                res.send(user);
            } catch (error) {
                console.log(error.message);
                res.status(500).send("Ineternal server error")
            }
        })

module.exports = router