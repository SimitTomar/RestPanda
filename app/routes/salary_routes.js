module.exports = (app) => {
    const salary = require('../controllers/salary_controller.js');

    // Retrieve salary of an employee
    app.get('/salary', salary.Calculate);
}