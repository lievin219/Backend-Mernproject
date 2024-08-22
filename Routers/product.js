import express from 'express'
 import { addProduct, deleteProduct, getProducts} from '../Controllers/Product.js'
 import { LoginPage } from '../Controllers/User.js';
import { authAuthentication } from '../Middlewares/index.js';
  const products=express.Router();
   products.post("/addproduct",addProduct);
   products.delete('/removeproduct/:id',deleteProduct)
   products.get("/allproducts",getProducts)
    export default products
 

     
      
     
     
     

