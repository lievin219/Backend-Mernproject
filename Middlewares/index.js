import express from 'express'

import jwt from 'jsonwebtoken'

 export const authAuthentication=async(req,res,next)=>{
    const token = req.cookies.authTokenii || req.headers['authorization']?.split(' ')[1];  // Updated to match token name

    if(!token){
         return res.status(401).json({
             message:" you are not authorized to access this page"
         })
    }
     try{

          const decoded=jwt.verify(token,'gakiza')
           req.user=decoded
           next()

     }
     catch(err){
           return res.status(400).json({error:`${err}`})
     }
     
 }

  