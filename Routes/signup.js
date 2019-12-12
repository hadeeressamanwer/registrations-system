const {User,validateusers}=require('../modules/user');
const mongoose= require ('mongoose');
const express=require('express');
const _=require('lodash');
const bcrypt=require('bcrypt');
const auth = require("../middlewares/auth");
const router=express.Router();

router.get('/me',auth,async(req,res)=>{const user=await User.findById(req.user)
res.send(_.pick(user,['email','name']))}
)

router.post('/',async(req,res)=>
    {
        const {error}=validateusers(req.body);

        if(error){
            res.status(400).send(error.details[0].message);
            return;
        }
        let found=await User.findOne(req.params.email);
        if (!found){return res.status(404).send('the user is already registered')}
       let user=new User({...req.body});
       const salt=await bcrypt.genSalt(10);
       user.password=await bcrypt.hash(user,password,salt);

       await user.save();
       const token = user .generateToken();
       res.header('x-auth-token',token).send(user);
    });
   
    module.exports=router;