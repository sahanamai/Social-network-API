const { Schema, model } = require('mongoose');
const thoughtsSchema = require('./thought');







const User = model('user', userSchema);

module.exports = User;