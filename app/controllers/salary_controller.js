// const Salary = require('../models/salary_model.js');
const supertest = require('supertest');
const {employeesEndpoint} = require('../../config/api.config');

// Find the Salary of an employee
exports.Calculate = (req, res) => {

    //Validate request
    if(!req.query.employeeName || !req.query.performanceRating) {
        return res.status(400).send({
            message: "employeeName or performanceRating can not be empty"
        });
    };

    supertest(employeesEndpoint)
        .get(req.query.employeeName)
        .expect(200)
        .end((err, employeeResponse) => {
            if (err) throw err;
            const salaryResponse = employeeResponse.body.currentSalary * req.query.performanceRating;
            res.send(salaryResponse.toString())
        })
};