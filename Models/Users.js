import mongoose from 'mongoose'
import express from 'express'
    const userdata=new mongoose.Schema({
          name:{
            type:String,
             required:true

          },
          password:{
             type:password,
              required:true
          },
              email:{
                 type:String,
                 required:true
              },
               
    })
     const dataUsers=mongoose.model('UserData',userdata)
      export default dataUsers;
      