   import express from 'express';
import cors from 'cors';
import AWS from 'aws-sdk';
import multer from 'multer';
import products from './Routers/product.js';
import Users from './Routers/user.js';
import jwt from 'jsonwebtoken';
import path from 'path';
import mongoose from 'mongoose';
import { fileURLToPath } from 'url';



import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
  dotenv.config()  
  const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.Region
  });


const port = process.env.Port;  
const app = express();

app.use(express.json());
 // Allow localhost and your deployed app





app.use(cors({
  origin:["http://localhost:3000","http://localhost:5173","https://lievin219.github.io"],
   
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],  
  allowedHeaders: ['Content-Type', 'Authorization'],     
}));

app.use(cookieParser());

// MongoDB connection
mongoose.connect("mongodb+srv://gakizalievin219:2Vcjz9e8BGBXY0gr@cluster0.50z8r9k.mongodb.net/", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000,
})
.then(() => {
  console.log('Database connected successfully');
})
.catch((error) => {
  console.log(`Database connection failed: ${error}`);
});

// Serve static files
app.use('/images', express.static(path.join(__dirname, 'Upload/images')));

app.listen(port, (err) => {
  if (err) {
    console.log(`An error occurred: ${err}`);
  } else {   
    console.log(`Server is running on port ${port}`);
  }
});

// Root route
app.get('/', (req, res) => {
  res.send('Express is running!');
});

// Multer for image upload
const storage = multer.diskStorage({
  destination: './Upload/images',
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
  }
});

const upload = multer({ storage: storage });

// Image upload route
app.post('/upload', upload.single('product'), (req, res) => {
  const baseURL = process.env.NODE_ENV === 'production'
    ? 'https://backend-mernproject-u66q.onrender.com'  
    : `http://localhost:${port}`;

  const imageUrl = `${baseURL}/images/${req.file.filename}`;
  res.json({ success: true, image_Url: imageUrl });
});


// Routers
app.use("/", products);
app.use("/", Users);

   // import express from 'express'
// import cors from 'cors'
// import multer from 'multer'
// import products from './Routers/product.js';
// import Users from './Routers/user.js';
// import jwt from 'jsonwebtoken'
//  import path from 'path'
//  import mongoose from 'mongoose'
//  import { fileURLToPath } from 'url';
// import cookieParser from 'cookie-parser';
//  const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

//   const port =4000;
//    const app=express()
//    app.use(express.json())
//    app.use(cors({
//     origin:"https://lievin219.github.io",
//     credentials: true, // Allow credentials (cookies)
    
// }));
// // methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
// //     allowedHeaders: ['Content-Type', 'Authorization','Access-Control-Allow-Credentials'], // Allow specific headers

//    app.use(cookieParser())
//    mongoose.connect("mongodb+srv://gakizalievin219:2Vcjz9e8BGBXY0gr@cluster0.50z8r9k.mongodb.net/", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     serverSelectionTimeoutMS: 30000, // Increase timeout to 30 seconds
//   }).then(()=>{
//      console.log('database connected succesfully')
//    }).catch((error)=>{
//      console.log(`database failed to  connect due to ${error}`)
//    })
//    app.listen(port,(err)=>{
//     if(err){
//          console.log(` an eror which is cousing problems is :${err}`)
                        
//     }
//     else{
//      console.log(`the port is running  on port of ${port}`)}
//    })
//    app.get('/',(req,res)=>{
//        res.send('Express is on now!!')
//    })
//    //password for database:2Vcjz9e8BGBXY0gr


//    //multer for storage of pictures

//     const storage=multer.diskStorage({
//          destination:'./Upload/images',
//           filename:(req,file,cb)=>{
//              return  cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
//           }
//     })
//      const upload=multer({storage:storage})

// app.use('/images',express.static(path.join(__dirname,'Upload/images')))
// app.use("/",products)
// app.use("/",Users)
//   app.post("/upload",upload.single('product'),(req,res)=>{
//         res.json({success:true,image_Url:`http://localhost:${port}/images/${req.file.filename}`})      
//   })        
   
//    export default app