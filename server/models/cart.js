const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'user' },
    products: [{
        productId: { type: Schema.Types.ObjectId, ref: 'Product' },
        count: 'number'
    }],
    status: 'string',
    createdAt: 'date'
})


let Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;