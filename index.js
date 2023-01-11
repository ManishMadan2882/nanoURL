
const crypto = require('crypto');
require('dotenv').config()
const express = require('express');

const app = express();
const path=require('path');
const port = process.env.PORT || 3030;
const db=require('./src/db');

app.use(express.static(path.join(__dirname,'./public')));
app.use(express.urlencoded({extended:true}));
app.use(express.json())
app.get('/:url',async (req,res)=>{
    const linkData = await db.findOne({short_link:req.params.url});
    if(linkData == null)
    res.status(404).send('<center><h1>Page not found !</h1></center>');
    else 
    res.redirect(linkData.complete_link);

})
app.post('/',async (req,res)=>{
    const real = req.body.url;
    let random;
    const dbObj = await db.findOne({complete_link : real});
   
    if(dbObj != null)
    return res.status(200).json({responded:true,complete_link:real,short_link:`${req.get('origin')}/${dbObj.short_link}`});
 

    do{
   
        random = crypto.randomBytes(4).toString('hex');
   
    }
    while((await db.exists({short_link:random})));
   
    const newbie = new db({
        complete_link:real,
        short_link:random
    });     

    await newbie.save();
    return res.status(200).json({responded:true,complete_link:real,short_link:`${req.get('origin')}/${random}`});
    
});

app.get('/',(req,res)=>{
    res.sendFile('./public/index.html');
});
app.listen(port,()=>{
    console.log('Server running at port : '+port);
});