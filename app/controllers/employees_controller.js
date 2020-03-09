const Employees = require('../models/employees_model.js');
const {GENDER_CONSTANTS, TITLE_CONSTANTS} = require('../constants/employees_constants');

// Create and Save new Employees
exports.create = (req, res) => {
    // Validate request
    // if(!req.body.firstName) {
    //     return res.status(400).send({
    //         message: "firstName can not be empty"
    //     });
    // };

    // Create Employees
    const employees = new Employees({
        name: req.body.name,
        emailId: req.body.emailId,
        gender: req.body.gender,
        title: req.body.title,
        currentSalary: req.body.currentSalary,
        experience: req.body.experience,
    });

    // Save Employees in the database
    employees.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Employees."
        });
    });
};

// Retrieve and return all employees from the database.
exports.findAll = (req, res) => {
    Employees.find()
    .then(employees => {
        let filteredArray = employees;

        if(typeof req.query.gender !== 'undefined'){
            if(_isGenderValid(req.query.gender)){
                filteredArray = _filterDataBasedOnGender(employees, req.query.gender);
            } else{
                return res.status(404).send({
                    message: `Gender should be ${GENDER_CONSTANTS.MALE} or ${GENDER_CONSTANTS.FEMALE}`
                }); 
            }
        }

        if(typeof req.query.title !== 'undefined'){
            if(_isTitleValid(req.query.title)){
                filteredArray = _filterDataBasedOnTitle(filteredArray, req.query.title)
            } else{
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
function _isGenderValid(gender){
    if ((gender === GENDER_CONSTANTS.MALE) || (gender === GENDER_CONSTANTS.FEMALE)) {
        return true;
    } else{
        return false;
    }
}

// Get all the employees based on the Gender passed in the Query Parameter
function _filterDataBasedOnGender (employees, gender) {
    let _filteredEmployeesBasedOnGender = employees.filter((employee) => {
        if (employee.gender === gender){
            return true;
        }
    });
    return _filteredEmployeesBasedOnGender;
};

// Validate that the Title passed in the Query Parameter is Valid or not
function _isTitleValid(title){
    if ((title === TITLE_CONSTANTS.ENGINEER) || (title === TITLE_CONSTANTS.MANAGER) || (title === TITLE_CONSTANTS.DIRECTOR)) {
        return true;
    } else{
        return false;
    }
}

// Get all the employees based on the Title passed in the Query Parameter
function _filterDataBasedOnTitle (employees, title) {
    let _filteredEmployeesBasedOnTitle = employees.filter((employee) => {
        if (employee.title === title){
            return true;
        }
    });
    return _filteredEmployeesBasedOnTitle;
};

// Find a single customer with a employeesId
exports.findOne = (req, res) => {
    Employees.findById(req.params.employeesId)
    .then(customer => {
        if(!customer) {
            return res.status(404).send({
                message: `Customer not found with id ${req.params.employeesId}`
            });            
        }
        res.send(customer);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: `Customer not found with id ${req.params.employeesId}`
            });                
        }
        return res.status(500).send({
            message: `Error retrieving customer with id ${req.params.employeesId}`
        });
    });
};

// Update employees identified by the employeesId in the request
exports.update = (req, res) => {
    // Validate Request
    // if(!req.body.content) {
    //     return res.status(400).send({
    //         message: "Customer content can not be empty"
    //     });
    // }

    // Find employees and update it with the request body
    Employees.findByIdAndUpdate(req.params.employeesId, {
        name: req.body.name,
        emailId: req.body.emailId,
        gender: req.body.gender,
        title: req.body.title,
        currentSalary: req.body.currentSalary,
        experience: req.body.experience,
    }, {new: true})
    .then(customer => {
        if(!customer) {
            return res.status(404).send({
                message: `Customer not found with id ${req.params.employeesId}`
            });
        }
        res.send(customer);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: `Customer not found with id ${req.params.employeesId}`
            });                
        }
        return res.status(500).send({
            message: `Error updating customer with id ${req.params.employeesId}`
        });
    });
};

// Delete a employees with the specified employeesId in the request
exports.delete = (req, res) => {
    Employees.findByIdAndRemove(req.params.employeesId)
    .then(customer => {
        if(!customer) {
            return res.status(404).send({
                message: `Customer not found with id ${req.params.employeesId}`
            });
        }
        res.send({message: "Customer deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: `Customer not found with id ${req.params.employeesId}`
            });                
        }
        return res.status(500).send({
            message: `Could not delete customer with id ${req.params.employeesId}`
        });
    });
};