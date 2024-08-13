import express from 'express'
import { LogOut, Register } from '../Controllers/User.js'
import { LoginPage } from '../Controllers/User.js';


 const Users=express.Router()

 Users.post('/Register',Register);
 Users.post('/login',LoginPage)
 Users.post('/logout',LogOut)
  export default Users