const mongose = require("mongoose");

const TeacherInfo = mongose.Schema({
    code_personeli:
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
    madrak:
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
    class_name:
    {
        type: String,
        maxlength: 300,
    },
    joinDate:
    {
        type: Date,
        default: Date.now
    }
})

Teacher = mongose.model("Teacher", TeacherInfo);
module.exports = Teacher;