module.exports = (app) => {
    const newSalary = require('../controllers/new_salary_controller.js');

    // Retrieve newSalary of an employee
    app.get('/newSalary', newSalary.Calculate);
}