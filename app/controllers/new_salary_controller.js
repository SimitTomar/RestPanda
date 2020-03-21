// const newSalary = require('../models/new_salary_model.js');
const supertest = require('supertest');
const {employeesEndpoint} = require('../../config/api.config');
const {TITLE_CONSTANTS} = require('../constants/employees_constants');


// Find the Salary of an employee
exports.Calculate = (req, res) => {

    //Validate request
    if(!req.query.employeeName || !req.header('performanceRating')) {
        return res.status(400).send({
            message: "employeeName Query Parameter or performanceRating Header can not be empty"
        });
    };

    if (req.header('performanceRating')<0 || req.header('performanceRating')>5){
        return res.status(400).send({
            message: "performanceRating should be between 0 to 5"
        });
    }

    supertest(employeesEndpoint)
        .get(req.query.employeeName)
        .expect(200)
        .end((err, employeeResponse) => {
            if (err) throw err;
            let appraisal = req.header('performanceRating') * getSalaryMultiplier (employeeResponse);
            const newSalaryResponse = employeeResponse.body.currentSalary + appraisal
            res.send({
                "newSalary": newSalaryResponse
            })
        })

        function getSalaryMultiplier (employeeResponse) {
        
            let salaryMultiplier = 0
            if (employeeResponse.body.title === TITLE_CONSTANTS.ENGINEER ) {
                salaryMultiplier=2000;
            } else if (employeeResponse.body.title === TITLE_CONSTANTS.MANAGER){
                salaryMultiplier=3000;
            } else if (employeeResponse.body.title === TITLE_CONSTANTS.DIRECTOR) {
                salaryMultiplier=4000
            }
            return salaryMultiplier
     
        }
};