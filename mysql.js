const mysql = require('mysql');
const express = require('express');

var app = express();
const bodyparser = require('body-parser');

app.use(bodyparser.json());

var mysqlConnection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'employeeDB'
});

mysqlConnection.connect((err) => {
    if(!err) {
        console.log('DB connection succeded.');
    }
    else {
        console.log('DB connection failed \n Error : '+JSON.stringify(err, undefined, 2));
    }
});

// Get all employees
app.get('/employees', (request, response) => {
    mysqlConnection.query('SELECT * FROM employee', (err, rows, fields) => {
        if(!err) {
            //console.log(rows);
            response.send(rows);
        }
        else {
            console.log(err);
        }
    });
});

// Get an employee
app.get('/employees/:id', (request, response) => {
    mysqlConnection.query('SELECT * FROM employee WHERE empID = ?', [request.params.id], (err, rows, fields) => {
        if(!err) {
            response.send(rows);
        }
        else {
            console.log(err);
        }
    });
});

// Delete an employee
app.get('/employees/delete/:id', (request, response) => {
    mysqlConnection.query('DELETE FROM employee WHERE empID = ?', [request.params.id], (err, results, fields) => {
        if(!err)
            console.log('Employee deleted ! Number of items deleted : ' + results.affectedRows);
        else
            console.log(err);
    });
});

// Add an employee
app.get('/employee/add', (request, response) => {
    var name = 'Cyrille PENAYE';
    var empCode = 'EMP37';
    var salary = 5000;
    var empId = Math.floor(Math.random() * 1986) + 11;
    employeeObject = {empID: empId, name: name, empCode: empCode, salary: salary};
    
    mysqlConnection.query("INSERT INTO employee SET ?", [employeeObject], (err, results, fields) => {
        if(!err)
            console.log('Employee inserted ! ID : ' + employeeObject.empID);
        else 
            console.log(err);
    });
    //console.log('Add clicked');
});

// XXX an employee


app.listen(3001, () => console.log('Express server is runnig at port no : 3001'));

/*
// Get the first employee
app.get('/employee/first', (request, response) => {
    mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
        if (err) throw err;
        var dbObject = client.db(dbname);
        dbObject.collection("employee").findOne({}, function(err, result) {
            if (err) throw err;
            console.log(result);
            response.send(result);
            client.close();
        });
    });
});

// Get the selected employee by id
app.get('/employees/:id', (request, response) => {
    mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
        if (err) throw err;
        var dbObject = client.db(dbname);
        dbObject.collection("employee").find({empID: parseInt(request.params.id)}).toArray(function(err, result) {
            if (err) throw err;
            console.log(result);
            response.send(result);
            client.close();
        });
    });
});

// Insert a new employee
app.get('/employee/new', (request, response) => {
    var empId = Math.floor(Math.random() * 3286) + 11;
    var name = "Cyrille PENAYE";
    var empCode = "EMP" + (Math.floor(Math.random() * 900) + 100);
    var salary = 15000;
    var employeeObject = {empID: empId, name: name, empCode: empCode, salary: salary};

    mongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
        if (err) throw err;
        var dbObject = client.db(dbname);
        dbObject.collection("employee").insertOne(employeeObject, function(err, result) {
            if (err) throw err;
            console.log(employeeObject);
            response.send(employeeObject);
            client.close();
        });
    });
});

app.listen(3001, function() {
    console.log('Server running at port 3001...');

    createMongoDbConnection();
});

function createMongoDbConnection() {
    if(mongoClient != null && mongoClient != undefined) {
        mongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {
            if(!err) {
                mongodb = db;
                console.log('MongoDB connection created !');
            }
            else {
                mongodb = null;
                console.log(err);
            }
        });
    }
}
*/

/*
response.render("employee-create", {
    message: "L'employé a été ajouté avec succès !"
});
*/
/*
response.render('employee-create', {
    message: "Une erreur s'est produite, vérifiez les champs entrés !"
});
*/
