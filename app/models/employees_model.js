const mongoose = require('mongoose');

const EmployeesSchema = mongoose.Schema({
    employeeName: {
        type: String,
        required: true
    },
    emailId: {
        type: String,
        required: true
    },
    gender: String,
    title: {
        type: String,
        required: true
    },
    currentSalary: {
        type: Number,
        required: true
    },
    experience: {
        type: Number,
        required: true
    }

}, {
    timestamps: true
});

module.exports = mongoose.model('Employees', EmployeesSchema);