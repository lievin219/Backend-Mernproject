import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  new_price: {
    type: Number,
    required: true
  },
  old_price: {
    type: Number,  // Changed to Number for consistency
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  available: {
    type: Boolean,
    default: true
  }
});

const FinalProducts = mongoose.model("ProductData", productSchema);

export default FinalProducts;



//   const mongoose=require('mongoose')
//   const ProductData=new mongoose.Schema({
//     id:{
//          type:Number,
//          required:true
//     },
//     name:{
//         type:String,
//          required:true

//     },
//     image:{
//          type:String,
//          required:true
//     },
//      category:{
//         type:String,
//          required:true
//      },
//      new_price:{
//          type:Number,
//           required:true
//      },
//       old_price:{
//          type:String,
//          required:true

//       },
//        date:{
//        type:Date,
//        default:Date.now()
//        },
//         available:{
//             type:Boolean,
//             default:true
             
//         }


      
//   })
//    const FinalProducts=mongoose.model("ProductData",ProductData)
//     module.exports=FinalProducts