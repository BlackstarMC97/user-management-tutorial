var mongoose = require('mongoose');
mongoose.set('debug', true);

var employeeSchema = mongoose.Schema({
    empID: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    empCode: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true
    }
}, {collection: 'employee'});


module.exports = mongoose.model('Employee', employeeSchema);
