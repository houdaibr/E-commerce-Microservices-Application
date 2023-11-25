const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({ 
  id :{
    type:String,

},
username :{
  type:String,
  rerquired: true,


},
email :{
  type:String,
  rerquired: true,


},
password :{
  type:String,
  required : true,

},




  });
module.exports = User = mongoose.model('user' , UserSchema);