import express from 'express'
import mongoose from 'mongoose'
import UserOtpVerification from '../Middlewares/UserotpVerification.js'
import {authAuthentication} from '../Middlewares/index.js'

import { GetUsers, LogOut, Register } from '../Controllers/User.js'
import { LoginPage } from '../Controllers/User.js';


 const Users=express.Router()

 Users.post('/Register',Register);
 Users.post('/login',LoginPage)
 Users.post('/logout',LogOut)
 Users.post("/verify",async(req,res)=>{
      try{
   let {userId,otp}=req.body
    if(!userId || !otp){
         return   res.json({message:"empty otp details missing are not allowed"})
    }else{
      const userotpVerificationRecords=await UserOtpVerification.find({userId})
       if(userotpVerificationRecords.length<=0){
         throw new Error('Account record doesnt exist  or have been already verified in case:please signup or login');
         
       }else{
         const {expiresAt}=userotpVerificationRecords[0]
         const hashedotp=userotpVerificationRecords[0]
       }
    }

         
      } 
      catch(error){
           res.status(404).json({error:"user failed to get an otp"})
      }
 })

 Users.get('/users',GetUsers)
  export default Users