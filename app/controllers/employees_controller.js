const Employees = require('../models/employees_model.js');
const { GENDER_CONSTANTS, TITLE_CONSTANTS } = require('../constants/employees_constants');

// Create and Save new Employees
exports.create = async (req, res) => {

    // Create Employees
    const employee = new Employees({
        employeeName: req.body.employeeName,
        emailId: req.body.emailId,
        gender: req.body.gender,
        title: req.body.title,
        currentSalary: req.body.currentSalary
    });

    const employeeData = await Employees.findOne({ employeeName: employee.employeeName });
    if (employeeData === null) {
        // Save Employee in the database
        employee.save()
            .then(data => {
                res
                    .status(201)
                    .send(data);
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the Employee."
                });
            });
    } else {
        res.status(500).send({
            message: `Employee ${employee.employeeName} already exists`
        });
    }


};

// Retrieve and return all employees from the database.
exports.findAll = async (req, res) => {
    await Employees.find()
        .then(employees => {
            let filteredArray = employees;

            if (typeof req.query.gender !== 'undefined') {
                if (_isGenderValid(req.query.gender)) {
                    filteredArray = _filterDataBasedOnGender(employees, req.query.gender);
                } else {
                    return res.status(404).send({
                        message: `Gender should be ${GENDER_CONSTANTS.MALE} or ${GENDER_CONSTANTS.FEMALE}`
                    });
                }
            }

            if (typeof req.query.title !== 'undefined') {
                if (_isTitleValid(req.query.title)) {
                    filteredArray = _filterDataBasedOnTitle(filteredArray, req.query.title)
                } else {
                    return res.status(404).send({
                        message: `Title should be ${TITLE_CONSTANTS.ENGINEER} or ${TITLE_CONSTANTS.MANAGER} or ${TITLE_CONSTANTS.DIRECTOR}`
                    });
                }
            }

            res.send(filteredArray);

        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving employees."
            });
        });
};

// Validate that the Gender passed in the Query Parameter is Valid or not
const _isGenderValid = (gender) => {
    if ((gender === GENDER_CONSTANTS.MALE) || (gender === GENDER_CONSTANTS.FEMALE)) {
        return true;
    } else {
        return false;
    }
}

// Get all the employees based on the Gender passed in the Query Parameter
const _filterDataBasedOnGender = (employees, gender) => {
    let _filteredEmployeesBasedOnGender = employees.filter((employee) => {
        if (employee.gender === gender) {
            return true;
        }
    });
    return _filteredEmployeesBasedOnGender;
};

// Validate that the Title passed in the Query Parameter is Valid or not
const _isTitleValid = (title) => {
    if ((title === TITLE_CONSTANTS.ENGINEER) || (title === TITLE_CONSTANTS.MANAGER) || (title === TITLE_CONSTANTS.DIRECTOR)) {
        return true;
    } else {
        return false;
    }
}

// Get all the employees based on the Title passed in the Query Parameter
const _filterDataBasedOnTitle = (employees, title) => {
    let _filteredEmployeesBasedOnTitle = employees.filter((employee) => {
        if (employee.title === title) {
            return true;
        }
    });
    return _filteredEmployeesBasedOnTitle;
};

// Find a single employee with a employeeName
exports.findOne = (req, res) => {

    // Validate that if the delay query parameter is passed, then it responds with 400 status,
    // if it's not a Number
    setTimeout(async () => {
        if((req.query.delay) && (isNaN(parseInt (req.query.delay)))) {
            return res.status(400).send({
                message: "delay should be a number in seconds"
            });
        };

        await Employees.findOne({ employeeName: req.params.employeeName })
            .then(employee => {
                if (!employee) {
                    return res.status(404).send({
                        message: `Employee not found with employeeName ${req.params.employeeName}, note that employeeName is a case senstive field`
                    });
                }
                res.send(employee);
            }).catch(err => {
                if (err.kind === 'ObjectId') {
                    return res.status(404).send({
                        message: `Employee not found with employeeName ${req.params.employeeName}, note that employeeName is a case senstive field`
                    });
                }
                return res.status(500).send({
                    message: `Error retrieving employee with employeeName ${req.params.employeeName}`
                });
            })
    }, req.query.delay*1000)


};

// Update employees identified by the employeeName in the request
exports.update = async (req, res) => {

    // Find employee and update it with the request body
    await Employees.findOneAndUpdate({ employeeName: req.params.employeeName }, {
        employeeName: req.body.employeeName,
        emailId: req.body.emailId,
        gender: req.body.gender,
        title: req.body.title,
        currentSalary: req.body.currentSalary
    }, { new: true })
        .then(employee => {
            if (!employee) {
                return res.status(404).send({
                    message: `Employee not found with employeeName ${req.params.employeeName}, note that employeeName is a case senstive field`
                });
            }
            res.send(employee);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: `Employee not found with employeeName ${req.params.employeeName}, note that employeeName is a case senstive field`
                });
            }
            return res.status(500).send({
                message: `Error updating employee with employeeName ${req.params.employeeName}`
            });
        });
};

// Delete a employees with the specified employeeName in the request
exports.delete = async (req, res) => {
    await Employees.findOneAndRemove({ employeeName: req.params.employeeName })
        .then(employee => {
            if (!employee) {
                return res.status(404).send({
                    message: `Employee not found with employeeName ${req.params.employeeName}, note that employeeName is a case senstive field`
                });
            }
            res.send({ message: "Employee deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.employeeName === 'NotFound') {
                return res.status(404).send({
                    message: `Employee not found with employeeName ${req.params.employeeName}, note that employeeName is a case senstive field`
                });
            }
            return res.status(500).send({
                message: `Could not delete employee with employeeName ${req.params.employeeName}`
            });
        });
};