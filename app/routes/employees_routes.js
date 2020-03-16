module.exports = (app) => {
    const employees = require('../controllers/employees_controller.js');

    // Create a new employee
    app.post('/employees', employees.create);

    // Retrieve all employees
    app.get('/employees', employees.findAll);

    // Retrieve a single employee with employeeName
    app.get('/employees/:employeeName', employees.findOne);

    // Update a customer with employeeName
    app.put('/employees/:employeeName', employees.update);

    // Delete a customer with employeeName
    app.delete('/employees/:employeeName', employees.delete);
}