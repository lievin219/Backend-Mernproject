import * as chai from 'chai';
const { expect } = chai;
import mongoose from 'mongoose';
import app from '../index.js'
import chaiHttp from 'chai-http'



import { AddToCart } from '../Controllers/Product.js';
chai.use(chaiHttp)   


describe('/ first test',function(){
     

   it('it should check a first test we inherited',function(){
     
/// juss to check if chai and mocha are working 

   },)
})
 describe('Add to cart test',()=>{
  // we use this done call function couse we are trying to fect data may be from our database which coul
  // be asynchronomous in other case we ave to use function keyword and continue juss simple as that
    //first inwork test from our api server 
    it('async  ',(done)=>{

  chai.request(app).get('/user').end((err,resp)=>{
    resp.should.have.status(200)

 done()

  })

   
       
    },)
 })