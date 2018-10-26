const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');

var app = express();

// Body parser middleware settings
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());
app.use(express.static(path.join(__dirname, "public")));

// Database middleware settings
var dbname = "employeeDB";
var url = "mongodb://localhost:27017/employeeDB";
mongoose.connect(url);
var dbase = mongoose.connection;

// Import the models
var Employee = require('./models/employee');

// Check connection
dbase.once('open', function() {
    console.log('Connected to MongoDB !');
});

// Check for DB errors
dbase.on('error', function(err) {
    console.log(err);
});

// Load view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static('public'));

// Loading bootstrap
/*
app.use('/bootstrap', express.static(__dirname + 'node_modules/bootstrap/dist/css/'));
*/

// Home page
app.get('/', (request, response) => {
    response.render("index");
});

// Get all employees
app.get('/employees', (request, response) => {
    Employee.find({}, (err, employees) => {
        if (err) throw err;
        response.render("employees", {
            employees: employees
        });
        //console.log(employees);
    });
});

// Get the selected employee by id
app.get('/employees/:id', (request, response) => {
    Employee.find({empID: parseInt(request.params.id)}, (err, employees) => {
        if (err) throw err;
        response.render("employee-profile", {
            employee: employees
        });
    });
});

// Create a new employee
app.get('/employee/add', (request, response) => {
    response.render("employee-create", {
        message: "Veuillez remplir le formulaire ci-dessous..."
    });
    //console.log('String testing value');
});

// Add submit post route
app.post('/employee/add', (request, response) => {
    let empID = Math.floor(Math.random() * 3286) + 11;
    let empCode = request.body.empCode;
    let name = request.body.name;
    let salary = request.body.salary;
    let employee = new Employee({empID: empID, name: name, empCode: empCode, salary: salary});
    
    try {
        employee.save((err, result) => {
            if(err) throw err;
            response.redirect('/employees/'+empID);
        });
    }
    catch (ex) {
        console.log('An error is catched !');
    }
});

// Edit a new employee
app.get('/employee/edit/:id', (request, response) => {
    Employee.find({empID: parseInt(request.params.id)}, (err, employees) => {
        if (err) throw err;
        response.render("employee-edit", {
            message: "Veuillez remplir le formulaire ci-dessous...",
            employee: employees
        });
    });
});

// Edit submit post route
app.post('/employee/edit/:id', (request, response) => {
    let employee = {};
    employee.empID = request.params.id;
    employee.empCode = request.body.empCode;
    employee.name = request.body.name;
    employee.salary = request.body.salary;
    
    let query = {empID:request.params.id};
    
    try {
        Employee.updateOne(query, employee, (err) => {
            if(err) { 
                throw err; 
            }
            else {
                response.redirect('/employees');
            }
        });
    }
    catch (ex) {
        console.log('An error is catched !');
    }
});

// Delete employee request
app.delete('/employee/:id', (request, response) => {
    let query = {empID:request.params.id};
    
    Employee.remove(query, (err) => {
        if(err) {
            throw err;
        }
        response.render("index");
    });
});

app.listen(3001, function() {
    console.log('Server running at port 3001...');
});


