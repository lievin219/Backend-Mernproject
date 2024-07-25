import express from 'express'
import cors from 'cors'
import multer from 'multer'
import jwt from 'jsonwebtoken'
 import path from 'path'
 import mongoose from 'mongoose'
  const port =4000;
   const app=express()
   app.use(express.json())
   app.use(cors())
   mongoose.connect("mongodb+srv://gakizalievin219:2Vcjz9e8BGBXY0gr@cluster0.50z8r9k.mongodb.net/").then(()=>{
     console.log('database connected succesfully')
   }).catch((error)=>{
     console.log(`database failed to  connect due to ${error}`)
   })
   //password for database:2Vcjz9e8BGBXY0gr
   