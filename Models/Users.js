import mongoose from 'mongoose'
import express from 'express'
import bcrypt from 'bcrypt'
    const userdata=new mongoose.Schema({
          role:{
            type:String,
             required:true

          },
          password:{
             type:String,
              required:true
          },
              email:{
                 type:String,
                 required:true,
                  unique:true
              },
              cartData:{
                 type:Object
                 
              },   
               date:{
                 type:Date,
                 default:Date.now()
               }

               
    })

   userdata.pre('save', async function (next) {
      if (!this.isModified('password')) return next();
      this.password = await bcrypt.hash(this.password, 10);
      next();
    });
    userdata.methods.comparePassword = function (password) {
      return bcrypt.compare(password, this.password);
    };
     const dataUsers=mongoose.model('UserData',userdata)
      export default dataUsers;
      