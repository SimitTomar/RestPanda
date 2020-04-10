const express = require('express');
const bodyParser = require('body-parser');
// const employees = require('./app/controllers/employees_controller');

// create express app
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

// Get newSalaryPort on which the APIs will run
const {newSalaryPort} = require('./config/api.config');

// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
	useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});


let newSalary = require('./app/routes/new_salary_routes');
app.use('/', newSalary);

// require('./app/routes/new_salary_routes.js')(app);

// listen for requests
app.listen(newSalaryPort, () => {
    console.log(`Server is listening on newSalaryPort ${newSalaryPort}`);
});


module.exports = app;