import express from 'express'
 import { addProduct } from '../Controllers/Product.js'
  const products=express.Router();
   products.post("/addproduct",addProduct);
    export default products
