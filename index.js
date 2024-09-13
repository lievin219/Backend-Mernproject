import express from 'express'
import cors from 'cors'
import multer from 'multer'
import products from './Routers/product.js';
import Users from './Routers/user.js';
import jwt from 'jsonwebtoken'
 import path from 'path'
 import mongoose from 'mongoose'
 import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';
 const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

  const port =4000;
   const app=express()
   app.use(express.json())
   app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:3000','https://lievin219.github.io/Ecommerce-MERN-PROJECT/','https://lievin219.github.io'],
    credentials: true, // Allow credentials (cookies)
}));
   app.use(cookieParser())
   mongoose.connect("mongodb+srv://gakizalievin219:2Vcjz9e8BGBXY0gr@cluster0.50z8r9k.mongodb.net/").then(()=>{
     console.log('database connected succesfully')
   }).catch((error)=>{
     console.log(`database failed to  connect due to ${error}`)
   })
   app.listen(port,(err)=>{
    if(err){
         console.log(` an eror which is cousing problems is :${err}`)
                        
    }
    else{
     console.log(`the port is running  on port of ${port}`)}
   })
   app.get('/',(req,res)=>{
       res.send('Express is on now!!')
   })
   //password for database:2Vcjz9e8BGBXY0gr


   //multer for storage of pictures

    const storage=multer.diskStorage({
         destination:'./Upload/images',
          filename:(req,file,cb)=>{
             return  cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
          }
    })
     const upload=multer({storage:storage})

app.use('/images',express.static(path.join(__dirname,'Upload/images')))
app.use("/",products)
app.use("/",Users)
  app.post("/upload",upload.single('product'),(req,res)=>{
        res.json({success:true,image_Url:`http://localhost:${port}/images/${req.file.filename}`})      
  })        
   