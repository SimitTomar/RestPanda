const mongoose = require('mongoose');

const SalarySchema = mongoose.Schema({
    employeeName: {
        type: String,
        required: true
    },

    performanceRating: {
        type: Number,
        required: true
    }

}, {
    timestamps: true
});

module.exports = mongoose.model('Salary', SalarySchema);