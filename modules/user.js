const mongoose= require ('mongoose');
const Joi =require('joi');
const _=require('lodash');
const User=mongoose.model('User',new mongoose.Schema({
name:{type:String,minlength:5,maxlength:255,required:true},
    email:{type:String,minlength:5,maxlength:255,required:true,unique:true,lowercase:true},
    password:{type:String,minlength:5,maxlength:1024,required:true,lowercase:true},
  }));

    function validateusers(user)
{

    const schema=
    {    name:Joi.string().min(5).max(255).required(),
        email:Joi.string().min(5).max(255).required().email(),
        password:Joi.string().min(5).max(255).required(),
    };
    return Joi.validate(user,schema);
}
exports.User=User;