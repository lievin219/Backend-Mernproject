import express from 'express'
import FinalProducts from '../Models/product.js'


 export const addProduct=async(req,res)=>{

    try{
        const product=new FinalProducts({
             id:req.body.id,
             name:req.body.name,
             image:req.body.image,
             category:req.body.category,
             new_price:req.body.new_price,
             old_price:req.body.old_price,
             
        })
         console.log(product)

          
         
    }
    catch(err){
            res.json(`an error occured :${err}`)
    }

     
 }