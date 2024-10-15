   import express from 'express'
   import cookie_parser from 'cookie-parser'
   import nodemailer from 'nodemailer'
   import  bcrypt from 'bcrypt'
   import jwt from 'jsonwebtoken'
import dataUsers from '../Models/Users.js'
import UserOtpVerification from '../Middlewares/UserotpVerification.js'

     export const Register=async(req,res)=>{
      const{role,password,email,cartData}=req.body
        try{
          
              const users=await dataUsers.findOne({email:req.body.email})
               if(users){
                 res.status(400).json({fail:'this user already exists'})
                  return 
               }
                let cart={}
                 for(let i=0;i<300;i++){
                   cart[i]=0
                 }
              
               const user=new dataUsers({role,password,email,cartData:cart})
                await user.save()
               return  res.status(200).json({success:'User registered Succesfully'})
           
        }
        catch(err){
              res.status(401).json({message:`invalid: ${err}`})
        }
     }
     const transporter = nodemailer.createTransport({
      service: 'gmail', // Use 'smtp.your-email-provider.com' for custom SMTP servers
      auth: {
        user: 'lievinm635@gmail.com',
        pass: 'Mugabekazilievin219&', // Use an App Password or OAuth2 for security
      },
    });

      const sendOtpVERIFICATION=async({_id,email},res)=>{
 try{
   const otp=`${Math.floor(1000+Math.random()*900)}`

    const mailoptions={from:process.env.AuthEmail,to:email,subjet:"verify your email address",
      html:`<p>enter <b>${otp}</b> on app to verify  email address to sign up on our website </p>
      <p> this code expires in 1 hour</p>`
      ,
    }
      const saltRounds=10;
       
       const hashedotp=await bcrypt.hash(otp,saltRounds)
   const newOtpverified=await new UserOtpVerification({
        userId:_id,
        OTP:hashedotp,
        createdAt:Date.now(),
        expiresAt:Date.now()+3600000
       })
       await newOtpverified.save()
       await transporter.sendMail(mailoptions)
        res.json({status:"Pending",message:"verification otp send via email",data:{
           userId:_id,
           email
        }})
   
 }catch(err){
    res.status(400).json('an error leads to fail to load your otp!')
 }
      }


     export const LoginPage = async (req, res) => {
      // const { email, password } = req.body;
      // try {
      //     const EmailUser = await dataUsers.findOne({ email: email });
      //     if (!EmailUser) {
      //         return res.status(401).json('Invalid Email or Password'); // Corrected status here
      //     }
      //     const Ismatch = await bcrypt.compare(password, EmailUser.password);
      //     if (!Ismatch) {
      //         return res.status(400).json('Incorrect Password');
      //     }
      //     const token = jwt.sign({ id:EmailUser.id, role:EmailUser.role }, 'gakiza', { expiresIn: '1h' });
      //     res.cookie('authToken', token, {
      //       maxAge: 3600000, // 1 hour
      //       httpOnly: true, // Not accessible via JavaScript
      //       secure: false, // Set to true if using HTTPS
      //       sameSite: 'None', // Allows cross-site cookies, if applicable
      //   });
      //     res.status(200).cookie('authToken', token, { maxAge: 3600000, httpOnly: true }).json({ message: 'Login successful' }).end();
      // } catch (err) {
      //     return res.status(400).json(`err:${err}`);
      // } 
      const { email, password } = req.body;
      try {
          const EmailUser = await dataUsers.findOne({ email: email });
          if (!EmailUser) {
              return res.status(401).json('Invalid Email or Password');
          }
          const Ismatch = await bcrypt.compare(password, EmailUser.password);
          if (!Ismatch) {
              return res.status(400).json('Incorrect Password');
          }
          const token = jwt.sign({ id: EmailUser.id, role: EmailUser.role }, 'gakiza', { expiresIn: '5m' });
          res.cookie('authTokenii', token, {
             
            httpOnly: false,
            secure: true,  // Use false for local development (HTTP)
            sameSite: 'None',  // Use 'Lax' for local development to prevent some CORS issues
            path: '/',
            maxAge: 3 * 60 * 1000
         
              
          });
          return res.status(200).json({ message: 'Login successful',token });
      } catch (err) {
          return res.status(400).json(`err:${err}`);
      }
  };

     export const LogOut=(req,res)=>{
     
    try{  res.clearCookie('authTokenii',{
         httpOnly: true, // Ensures the cookie is not accessible via JavaScript,
         secure:true,
         sameSite: 'Strict',
       })
     
        res.status(200).json({message:` you are now logged out succesfully!`})}
        catch(err){
      res.status(400).json(`an error of ${err}`)
         }
        
     }
   export const GetUsers=async(req,res)=>{

             try{
                const users=await dataUsers.find()
                 return res.status(200).json(users)
                    
                
             }
              catch(err){
                
              }
   }
   export const fetchUser=(req,res,next)=>{
          const users=req.header('auth-tokenii')
          if(!users){
             res.status(401).json({err:'pleade enter with a valid token '})
          }
   
    else{
       try{
         
       }
       catch(err){
 res.status(400).json({error:` an error is ${err}`})
       }
    }
  }