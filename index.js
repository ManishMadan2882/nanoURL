const express = require('express');
const app = express();
const path=require('path');
const port = process.env.PORT || 3030;
const {db}=require('./src/db');
app.use(express.static('./public'));
app.post('/:url',(req,res)=>{

})
app.get('/',(req,res)=>{
   res.sendFile(path.join(__dirname,'./public/index.html'));
});
app.listen(port,()=>{
    console.log('Server running at port : '+port);
});