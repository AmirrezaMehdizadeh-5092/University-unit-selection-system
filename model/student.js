const mongose = require("mongoose");

const StudentInfo = mongose.Schema({
    code_meli:
    {
        type: String,
        minLength: 10,
        maxlength: 20,
        required: true,
        index:
        {
            unique: true,
            dropDups: true
        }
    },
    sh_d:
    {
        type: String,
        minLength: 10,
        maxlength: 20,
        required: true,
        index:
        {
            unique: true,
            dropDups: true
        }
    },
    f_name:
    {
        type: String,
        minLength: 3,
        maxlength: 20,
        required: true,
    },
    l_name:
    {
        type: String,
        minLength: 4,
        maxlength: 50,
        required: true,
    },
    reshte:
    {
        type: String,
        minLength: 4,
        maxlength: 30,
        required: true,
    },
    year:
    {
        type: String,
        minLength: 4,
        maxlength: 4,
        required: true,
    },
    age:
    {
        type: String,
        minLength: 2,
        maxlength: 3,
        required: true,
    },
    address:
    {
        type: String,
        minLength: 5,
        maxlength: 100,
        required: true,
    },
    class_name:
    {
        type: String,
        maxlength: 300,
    },
    moadel:
    {
        type: String,
    },
    joinDate:
    {
        type: Date,
        default: Date.now
    }
})

Student = mongose.model("Student", StudentInfo);
module.exports = Student;