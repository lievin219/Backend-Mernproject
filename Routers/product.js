import express from 'express'
 import { AddToCart, addImage, addProduct, deleteProduct, getProducts, getTocart, newcollection, popularWomen, removefromCart} from '../Controllers/Product.js'
 import { GetUsers, LoginPage } from '../Controllers/User.js';
import { authAuthentication } from '../Middlewares/index.js';
  const products=express.Router();
   products.post("/addproduct",addProduct);
   products.delete('/removeproduct/:id',deleteProduct)
   products.get("/allproducts",getProducts)    
   products.get('/newcollections',newcollection)    
   products.get('/women',popularWomen)    
   products.post("/addtocart",authAuthentication,AddToCart)   
   products.post('/removefromcart',authAuthentication,removefromCart)
   products.post('/gettocart',authAuthentication,getTocart)
  

    export default products
 

     
      
     
     
     

