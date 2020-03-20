// const newSalary = require('../models/new_salary_model.js');
const supertest = require('supertest');
const {employeesEndpoint} = require('../../config/api.config');

// Find the Salary of an employee
exports.Calculate = (req, res) => {

    //Validate request
    if(!req.query.employeeName || !req.header('performanceRating')) {
        return res.status(400).send({
            message: "employeeName Query Parameter or performanceRating Header can not be empty"
        });
    };

    supertest(employeesEndpoint)
        .get(req.query.employeeName)
        .expect(200)
        .end((err, employeeResponse) => {
            if (err) throw err;
            const newSalaryResponse = employeeResponse.body.currentSalary * req.header('performanceRating');
            res.send({
                "newSalary": newSalaryResponse
            })
        })
};