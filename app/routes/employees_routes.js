module.exports = (app) => {
    const employees = require('../controllers/employees_controller.js');

    // Create a new customer
    app.post('/employees', employees.create);

    // Retrieve all employees
    app.get('/employees', employees.findAll);

    // Retrieve a single customer with employeesId
    app.get('/employees/:employeesId', employees.findOne);

    // Update a customer with employeesId
    app.put('/employees/:employeesId', employees.update);

    // Delete a customer with employeesId
    app.delete('/employees/:employeesId', employees.delete);
}