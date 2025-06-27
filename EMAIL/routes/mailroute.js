
const express=require('express');
const sendMail = require('../controllers/mailcontroller');
const mailrouter=express.Router()

mailrouter.post("/mail",sendMail);

module.exports=mailrouter