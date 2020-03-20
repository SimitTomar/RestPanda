const mongoose = require('mongoose');

const newSalarySchema = mongoose.Schema({
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

module.exports = mongoose.model('newSalary', newSalarySchema);