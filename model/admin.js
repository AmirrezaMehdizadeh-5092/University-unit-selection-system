const mongose = require("mongoose");

const AdminInfo = mongose.Schema({
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
    job:
    {
        type: String,
        minLength: 4,
        maxlength: 20,
        required: true,
    },
    joinDate:
    {
        type: Date,
        default: Date.now
    }
})

Admin = mongose.model("Admin", AdminInfo);
module.exports = Admin;