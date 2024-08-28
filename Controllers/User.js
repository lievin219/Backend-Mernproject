   import express from 'express'
   import cookie_parser from 'cookie-parser'
   import  bcrypt from 'bcrypt'
   import jwt from 'jsonwebtoken'
import dataUsers from '../Models/Users.js'

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
             
              httpOnly: false, // Not accessible via JavaScript
            secure: true, // Set to true if using HTTPS
              sameSite: 'None', // Allows cross-site cookies, if applicable
          });
          return res.status(200).json({ message: 'Login successful' });
      } catch (err) {
          return res.status(400).json(`err:${err}`);
      }
  };

     export const LogOut=(req,res)=>{
      try{
    // try{  res.clearCookie('authToken',{
    //      httpOnly: true, // Ensures the cookie is not accessible via JavaScript,
    //      secure:true,
    //      sameSite: 'Strict',
    //    })
     
        res.status(200).json({message:` you are now logged out succesfully!`})}
        catch(err){
      res.status(400).json(`an error of ${err}`)
         }
        
     }
   // export const GetUsers=async(req,res)=>{

   //           try{
   //              const users=await dataUsers.find()
   //               return res.status(200).json({message:'all users'},users)
                    
                
   //           }
   //            catch(err){
                
   //            }
   // }
  