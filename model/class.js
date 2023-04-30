const mongose = require("mongoose");

const ClassInfo = mongose.Schema({
    class_name:
    {
        type: String,
        minLength: 4,
        maxlength: 30,
        required: true,
    },
    code_class:
    {
        type: String,
        minLength: 6,
        maxlength: 6,
        required: true,
        index:
        {
            unique: true,
            dropDups: true
        }
    },
    group:
    {
        type: String,
        minLength: 1,
        maxlength: 1,
        required: true,
    },
    zarfiat:
    {
        type: String,
        minLength: 1,
        maxlength: 2,
        required: true,
    },
    tedad:
    {
        type : String,
        maxlength: 2,
    },
    status:
    {
        type: String,
        maxlength: 10,
    },
    time:
    {
        type: String,
        minLength: 4,
        maxlength: 200,
        required: true,
    },
    teacher_name:
    {
        type: String,
        minLength: 4,
        maxlength: 100,
    },
    student_name:
    {
        type: String,
        maxlength:1000,
    },
    joinDate:
    {
        type: Date,
        default: Date.now
    }
})

Class = mongose.model("Class", ClassInfo);
module.exports = Class;