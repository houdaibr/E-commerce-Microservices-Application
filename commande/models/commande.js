const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommandeSchema = new Schema({
    id :{
        type:String,

    },

    idProduct : {
        type: String,
        rerquired: true,
    },
    
    datePaiement:{
        type: Date,
        default: Date.now
    },
   
    


    
});
  

module.exports = Commande = mongoose.model('commande' , CommandeSchema);