import express from 'express'
import mongoose from 'mongoose'
import FinalProducts from '../Models/product.js'


 export const addProduct=async(req,res)=>{
    let productse=await FinalProducts.find({})
    let idi;
     if(productse.length>0){
         let last_product_inarray=productse.slice(-1)
         let last_product=last_product_inarray[0]
         idi=last_product.id+1
     }
     else{
        idi=1;
     }

    try{
     
           
        const product=new FinalProducts({
             id:idi,
             name:req.body.name,
             image:req.body.image,
             category:req.body.category,
             new_price:req.body.new_price,
             old_price:req.body.old_price,
             
        })
        
      const productsvalue=await product.save()
       res.json({message:' your product saved succesfullly ',name:productsvalue.name})

          
         
    }
    catch(err){
            res.json(`an error occured :${err}`)
             console.log(err)
    }

     
 }


//   export const deleteProduct=async(req,res)=>{
//      let productid=req.body.id

      
    
//         const deletedProduct=await FinalProducts.findByIdAndDelete(productid)
//          if(deletedProduct){
//          res.json({success:`product deleted succesfully`,name:'succed'})}
//           else if(!deletedProduct){
//                     res.status(404).json('product not found')

//           }
    
     
    
    
//   }
//   const mongoose = require('mongoose');
// const FinalProducts = require('../models/FinalProducts'); // Adjust the path to your FinalProducts model

// export const deleteProduct = async (req, res) => {
//   try {
   
    


//     const deletedProduct = await FinalProducts.findByIdAndDelete({
//         id:req.params.id});

//     if (deletedProduct) {
//       res.json({ success: 'Product deleted successfully', name: 'succeed' });
//     } else {
//       res.status(404).json('Product not found');
//     }
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
export const deleteProduct = async (req, res) => {
  try {
    // Find the product by the `id` field, not `_id`
     const producti=Number(req.params.id)
    const deletedProduct = await FinalProducts.deleteOne({ id: producti });
    


    if (deletedProduct) {
      res.json({ success: 'Product deleted successfully', name: 'succeed' });
    } else {
      res.status(404).json('Product not found');
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
 export const getProducts=async(req,res)=>{
  try{
      const allproducts=await FinalProducts.find()
       if(allproducts.length>0){
         res.status(400).json({success:'all products',message:allproducts})
       }
       else if(allproducts.length<0){
         res.status(401).json('no products there in the store')
       }
      }
       catch(err){
         res.status(600).json(`error:${err}`)
         
       }
   
 }
