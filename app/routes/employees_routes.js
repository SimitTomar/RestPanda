var express = require('express');

var router = express.Router();

// module.exports = function (app) {
    const employees = require('../controllers/employees_controller.js');

    router.get('/', function(req, res) {
        res.send('GET handler for /employees route.');
    });
    
    router.post('/', function(req, res) {
        res.send('POST handler for /employees route.');
    });


    // Create a new employee
    router.post('/employees', employees.insert);

    // Retrieve all employees
    router.get('/employees', employees.findAll);

    // Retrieve a single employee with employeeName
    router.get('/employees/:employeeName', employees.findOne);

    // Update a customer with employeeName
    router.put('/employees/:employeeName', employees.update);

    // Delete a customer with employeeName
    router.delete('/employees/:employeeName', employees.delete);
// }
module.exports = router;