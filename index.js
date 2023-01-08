const ejs = require('ejs');
const crypto = require('crypto');
require('dotenv').config()
const express = require('express');

const app = express();
const path=require('path');
const port = process.env.PORT || 3030;
const db=require('./src/db');

app.set('view engine','ejs');
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
    const real = req.body.url;//
    console.log(real);
    let random;
    const dbObj = await db.findOne({complete_link : real});
   
    if(dbObj != null)
    return res.status(200).render('index2',{responded:true,shortURL:`${req.get('origin')}/${random}`});
    //return res.render('index',{responded:true,shortURL:`${req.hostname}/${dbObj.short_link}`});
   // return res.json({route:dbObj.short_link}); 

    do{
   
        random = crypto.randomBytes(4).toString('hex');
   
    }
    while((await db.exists({short_link:random})));
   
    const newbie = new db({
        complete_link:real,
        short_link:random
    });     

    await newbie.save();
    return res.status(200).render('index2',{responded:true,shortURL:`${req.get('origin')}/${random}`});
    //res.status(200).json({route:random})
});

app.get('/',(req,res)=>{
    res.render('index',{responded:false});
   //res.sendFile(path.join(__dirname,'./public/index.html'));
});
app.listen(port,()=>{
    console.log('Server running at port : '+port);
});