// Set up employee database
const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    position: {
        type: String
    },
    salary: {
        type: Number
    },
    date_of_joining: {
        type: Date
    },
    department: {
        type: String
    },
    created_at: {
        type: Date
    },
    updated_at: {
        type: Date
    }
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;