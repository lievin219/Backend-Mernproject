import express from 'express'
import mongoose from 'mongoose'
import dataUsers from '../Models/Users.js'
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
// export const deleteProduct = async (req, res) => {
//   try {
//     // Find the product by the `id` field, not `_id`
//      const producti=Number(req.params.id)
//     const deletedProduct = await FinalProducts.deleteOne({ id: producti });
    


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
      const productId = parseInt(req.params.id, 10); // Convert to number
  

      if (isNaN(productId)) {
          return res.status(400).json({ message: 'Invalid product ID' });
      }

      // Find and delete the product by its numeric ID
      const deletedProduct = await FinalProducts.findOneAndDelete({ id: productId });

      if (!deletedProduct) {
          return res.status(404).json({ message: 'Product not found' });
      }

      res.json({ message: 'Product deleted successfully', id: deletedProduct.ide, name: deletedProduct.name });
  } catch (err) {
      res.status(500).json({ message: `An error occurred: ${err.message}` });     

            
  }
};   




 export const getProducts=async(req,res)=>{
  try{
      const allproducts=await FinalProducts.find()
       if(allproducts.length>0){
         res.status(200).json({success:'all products',message:allproducts})
       }
       else if(allproducts.length===0){
         res.status(401).json('no products there in the store')       


       }
      }     
       catch(err){
         res.status(401).json({messages:`error:${err}`})

         
       }
   
 }    
// export const getProducts = async (req, res) => {
//   try {
//       const allproducts = await FinalProducts.find();

//       if (allproducts.length > 0) {
//           // Return products with a success status
//           res.status(200).json({
//               success: true,
//               message: 'All products retrieved successfully',
//               data: allproducts,
//           });
//       } else {
//           // Return a message that no products are available
//           res.status(200).json({
//               success: false,
//               message: 'No products found in the store',
//           });
//       }
//   } catch (err) {
//       // Handle any errors that occur during the query
//       res.status(500).json({
//           success: false,
//           error: `Server error: ${err.message}`,
//       });
//   }
// };
   export const newcollection=async(req,res)=>{
        try{    
                
          
           let  products=await FinalProducts.find({})
            let newcollections= products.slice(1).slice(-8)
             console.log('newcollection fetched',newcollections)
              res.status(200).json(newcollections)
                      




                
               




                                  
                  
               

                                                                         
}
        catch(err){
               return res.json(`Error:${err}`)  
        }
   }

    export const popularWomen=async(req,res)=>{
      try{
         
      
           const products=await FinalProducts.find({category:"women"})
            const WomenLatest=products.slice(0,4)
            res.status(200).json(WomenLatest)}
             catch(err){
                res.status(400).json({error:`an error occured is ${err}`})
             }
    }
//        export const AddToCart=async(req,res)=>{
//          console.log(req.body)
//          const userId =new  mongoose.Types.ObjectId(req.user.id); // Cast to ObjectId
// let userData=await dataUsers.findOne({_id:req.user.id})  
//  userData.cartData[req.body.itemId]+=1
//  await dataUsers.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData})
//   res.json(dataUsers)
//        }


export const AddToCart = async (req, res) => {
  

  try {
    const userId = new mongoose.Types.ObjectId(req.user.id);
    let userData = await dataUsers.findOne({ _id: userId });
    
    if (!userData) {
      return res.status(404).json({ message: 'User not found' });
    }

    userData.cartData[req.body.itemId] += 1;
    await dataUsers.findOneAndUpdate({ _id: userId }, { cartData: userData.cartData });

    res.json(dataUsers);
  } catch (error) {
    console.error('Error in AddToCart:', error);
    res.status(500).json({ message: error.message });
  }
};
                    
        export const removefromCart=async(req,res)=>{
           
           
          let userData=await dataUsers.findOne({_id:req.user.id})
          if(userData.cartData[req.body.itemId]>0)

          userData.cartData[req.body.itemId] -=1
        
          await dataUsers.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData})
           res.json(dataUsers)
        }

        export const getTocart=async(req,res)=>{
                        const usedata=await dataUsers.findOne({_id:req.user.id})
                         res.json(usedata.cartData)
        }

         export const addImage=(req,res)=>{
        const image=req.body
         
         }
                             
                              