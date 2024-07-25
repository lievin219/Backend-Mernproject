 import express from 'express'


export const postImge=async(req,res)=>{
    try{
          const {image,name}=req.body
    
    }
    catch(error){
         if(!error){
             res.json(image)
         }
    }
     
}