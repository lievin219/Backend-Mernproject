import express from 'express'
 import { addProduct, deleteProduct } from '../Controllers/Product.js'
  const products=express.Router();
   products.post("/addproduct",addProduct);
   products.delete('/removeproduct',deleteProduct)
    export default products
