 import mongoose, { Schema } from 'mongoose'
  const Schehma=mongoose.Schema

   const userOtpVerificationSchema=new Schema({
    userId:String,
    OTP:String,
    createdAt:Date,
    expiresAt:Date
   })
  const UserOtpVerification=mongoose.model("userotpVerification",userOtpVerificationSchema)

   export default UserOtpVerification;