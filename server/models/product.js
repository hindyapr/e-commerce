const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: 'string',
    price: 'number',
    image: 'string',
    amount: 'number'
})


let Product = mongoose.model('Product', productSchema);

module.exports = Product;