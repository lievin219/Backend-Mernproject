import express from 'express'
import { Register } from '../Controllers/User.js'
import { LoginPage } from '../Controllers/User.js';


 const Users=express.Router()

 Users.post('/Register',Register);
 Users.post('/login',LoginPage)
  export default Users