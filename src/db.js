const mongoose = require('mongoose');
require('mongoose-type-url')
mongoose.set('strictQuery', false);
mongoose.connect("mongodb://localhost:27017/url-shortener",{directConnection:true})
.then(()=>{
    console.log('connection to database is successful');
})
.catch((err)=>{
    console.log("connection to database failed "+err);
});
 const schema = new mongoose.Schema({
    complete_link:{
        type:mongoose.SchemaTypes.Url
    },
    short_link:{
        type:mongoose.SchemaTypes.Url,
        unique:true
    }
})
const db=mongoose.model('url-info',schema);
module.exports = db; 