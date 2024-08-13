   import express from 'express'
   import cookie_parser from 'cookie-parser'
   import  bcrypt from 'bcrypt'
   import jwt from 'jsonwebtoken'
import dataUsers from '../Models/Users.js'

     export const Register=async(req,res)=>{
      const{role,password,email}=req.body
        try{
          
              const users=await dataUsers.findOne({email:req.body.email})
               if(users){
                 res.status(400).json({message:'this user already exists'})
                  return 
               }
              
               const user=new dataUsers({role,password,email})
                await user.save()
               return  res.status(200).json({message:'User registered Succesfully'})
           
        }
        catch(err){
              res.status(401).json({message:`invalid: ${err}`})
        }
     }


     export const LoginPage = async (req, res) => {
      const { email, password } = req.body;
      try {
          const EmailUser = await dataUsers.findOne({ email: email });
          if (!EmailUser) {
              return res.status(401).json('Invalid Email or Password'); // Corrected status here
          }
          const Ismatch = await bcrypt.compare(password, EmailUser.password);
          if (!Ismatch) {
              return res.status(400).json('Incorrect Password');
          }
          const token = jwt.sign({ id:EmailUser.id, role:EmailUser.role }, 'gakiza', { expiresIn: '1h' });
          res.status(200).cookie('authToken', token, { maxAge: 3600000, httpOnly: true }).json({ message: 'Login successful' }).end();
      } catch (err) {
          return res.status(400).json(`err:${err}`);
      }
  };

     export const LogOut=(req,res)=>{
       res.clearCookie('authToken',{
         httpOnly: true, // Ensures the cookie is not accessible via JavaScript,
         secure:true,
         sameSite: 'Strict',
       })
        res.status(200).json({message:`logged out succesfully!`})
       
     }
   // export const GetUsers=async(req,res)=>{

   //           try{
   //              const users=await dataUsers.find()
   //               return res.status(200).json({message:'all users'},users)
                    
                
   //           }
   //            catch(err){
                
   //            }
   // }
  