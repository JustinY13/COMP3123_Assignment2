// Set up user database
const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    created_at: {
        type: Date
    },
    updated_at: {
        type: Date
    }
});

const User = mongoose.model('User', usersSchema);

module.exports = User;