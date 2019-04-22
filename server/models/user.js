const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { encode } = require('../helpers/bcrypt')

const userSchema = new Schema({
    username: 'string',
    email: 'string',
    password: 'string',
    role: 'string'
})

userSchema.pre('save', function(next) {
    this.password = encode(this.password);
    next();
})


let User = mongoose.model('user', userSchema);

module.exports = User;