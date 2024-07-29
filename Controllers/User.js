   import express from 'express'
   import cookie_parser from 'cookie-parser'
   import  bcrypt from 'bcrypt'
import dataUsers from '../Models/Users'

    export const register=(req,res)=>{
     const {name,password,email}=req.body
          const salt=bcrypt.genSaltSync(10)
        const main=bcrypt.hashSync(req.body.password,salt)
    }