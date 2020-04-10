const employeesPort= 3000;
const employeesEndpoint = `http://localhost:${employeesPort}/employees/`;

const newSalaryPort= 3001;
const newSalaryEndpoint = `http://localhost:${newSalaryPort}/newSalary/`;

module.exports = {
    employeesPort,
    employeesEndpoint,
    newSalaryPort,
    newSalaryEndpoint
}