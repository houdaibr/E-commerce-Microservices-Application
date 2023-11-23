const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    id: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number, // Changed to Number as it's more appropriate for price
        required: true
    },
    description: {
        type: String,
        required: false
    },
    images: {
        type: [String], // Changed to an array of strings
        required: true
    },
    category: {
        type: Object,
        required: false
    }
});

module.exports = Item = mongoose.model('produit', ItemSchema);
