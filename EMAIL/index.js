require('dotenv').config();

const express=require('express')
const app=express();
const cors=require('cors');
const mailrouter = require('./routes/mailroute');

app.use(cors())
app.use(express.urlencoded({extended:false}))
app.use(express.json())



app.use('/',mailrouter)
app.listen(8000,()=>console.log("server started"))