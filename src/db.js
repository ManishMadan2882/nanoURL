require('dotenv').config();

const mongoose = require('mongoose');

require('mongoose-type-url')

mongoose.set('strictQuery', false);
mongoose.connect(process.env.mongourl)
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
        type:String,
        unique:true
    }
})
const db=mongoose.model('urls',schema);

module.exports = db; 