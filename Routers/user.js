import express from 'express'
import {authAuthentication} from '../Middlewares/index.js'

import { GetUsers, LogOut, Register } from '../Controllers/User.js'
import { LoginPage } from '../Controllers/User.js';


 const Users=express.Router()

 Users.post('/Register',Register);
 Users.post('/login',LoginPage)
 Users.post('/logout',LogOut)

 Users.get('/users',authAuthentication,GetUsers)
  export default Users