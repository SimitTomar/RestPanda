let router = require('express').Router();

// module.exports = function (app) {
    const newSalary = require('../controllers/new_salary_controller.js');

    router.get('/', function(req, res) {
        res.send('GET handler for /newSalary route.');
    });
    
    router.post('/', function(req, res) {
        res.send('POST handler for /newSalary route.');
    });

    // Retrieve newSalary of an employee
    router.get('/newSalary', newSalary.Calculate);
// }

module.exports = router;