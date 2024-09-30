import mongoose from 'mongoose'
 const imageSchema=new mongoose.Schema({
     image:{
        type:String,
         required:true
     }
 })
  const finalimage=mongoose.model('images',imageSchema)
   export default finalimage