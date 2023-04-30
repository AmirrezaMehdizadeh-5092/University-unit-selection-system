// import package
const express = require('express');
router = express.Router();
const { body, validationResult, check } = require('express-validator');
const bcryptjs = require('bcryptjs');
const http = require("http");
const Random = require('crypto-random');

// important variables and rout
rand = Random.range(10000, 99999);
const Student = require("../model/student");
const Teacher = require("../model/teacher");
const Admin = require("../model/admin");
const Class = require("../model/class");
const { application } = require('express');

// middleware
const middleware_student = (req, res, next) => {
    if (req.session.username) {
        next();
    }
    else {
        res.redirect("/student_login");
    }
}
const middleware_teacher = (req, res, next) => {
    if (req.session.username) {
        next();
    }
    else {
        res.redirect("/teacher_login");
    }
}
const middleware_admin = (req, res, next) => {
    if (req.session.username) {
        next();
    }
    else {
        res.redirect("/admin_login");
    }
}

// api
router.get("/", (req, res) => {
    res.render("home");
})

router.get("/student_login", (req, res) => {
    res.render("student_login", { error: req.flash('errors'), rand });
})
router.post("/student_login", async (req, res) => {
    username = req.body.username;
    password = req.body.password;
    security_code = req.body.security;
    check_security_code = req.body.hidden;
    found_student = await Student.findOne({ code_meli: username })
    if (found_student) {
        if (password == found_student.sh_d) {
            if (security_code == check_security_code) {
                req.session.username = username;
                res.redirect("/student_panel")
            }
            else {
                req.flash('errors', 'کد امنیتی اشتباه است');
                res.redirect("/student_login");
            }
        }
        else {
            req.flash('errors', 'رمز عبور اشتباه است');
            res.redirect("/student_login");
        }
    }
})
router.get("/student_panel", middleware_student, (req, res) => {
    res.render("student_panel")
})

router.get("/teacher_login", (req, res) => {
    res.render("teacher_login", { error: req.flash('errors'), rand });
})
router.post("/teacher_login", async (req, res) => {
    username = req.body.username;
    password = req.body.password;
    security_code = req.body.security;
    check_security_code = req.body.hidden;
    found_teacher = await Teacher.findOne({ code_meli: username });
    if (found_teacher) {
        if (password == found_teacher.code_personeli) {
            if (security_code == check_security_code) {
                req.session.username = username;
                req.session.password = password;
                req.session.fname = found_teacher.f_name;
                req.session.lname = found_teacher.l_name;
                req.session.madrak = found_teacher.madrak;
                req.session.year = found_teacher.year;
                res.redirect("/teacher_panel")
            }
            else {
                req.flash('errors', 'کد امنیتی اشتباه است');
                res.redirect("/teacher_login");
            }
        }
        else {
            req.flash('errors', 'رمز عبور اشتباه است');
            res.redirect("/teacher_login");
        }
    }
})
router.get("/teacher_panel", middleware_teacher, async(req, res) => {
    fname = req.session.fname;
    lname = req.session.lname;
    pass = req.session.password;
    user = req.session.username;
    madrak = req.session.madrak;
    year = req.session.year;
    fullname = fname + ' ' + lname ;
    classlist_teacher = await Class.find({ teacher_name : fullname})
    res.render("teacher_panel" , { fname, lname, pass, user, madrak, year , classlist_teacher , error: req.flash('errors') })
})

router.get("/admin_login", (req, res) => {
    res.render("admin_login", { error: req.flash('errors') });
})
router.post("/admin_login", async (req, res) => {
    username = req.body.username;
    password = req.body.password;
    security_code = req.body.security;
    check_security_code = req.body.hidden;
    found_admin = await Admin.findOne({ code_meli: username });
    if (found_admin) {
        if (password == found_admin.code_personeli) {
            if (security_code == check_security_code) {
                req.session.username = username;
                req.session.password = password;
                req.session.fname = found_admin.f_name;
                req.session.lname = found_admin.l_name;
                req.session.job = found_admin.job;
                req.session.madrak = found_admin.madrak;
                res.redirect("/admin_panel")
            }
            else {
                req.flash('errors', 'کد امنیتی اشتباه است');
                res.redirect("/admin_login");
            }
        }
        else {
            req.flash('errors', 'رمز عبور اشتباه است');
            res.redirect("/admin_login");
        }
    }
});
router.get("/admin_panel", middleware_admin, (req, res) => {
    fname = req.session.fname;
    lname = req.session.lname;
    pass = req.session.password;
    job = req.session.job;
    user = req.session.username;
    madrak = req.session.madrak;
    res.render("admin_panel", { fname, lname, pass, job, user, madrak, error: req.flash('errors') })
})
router.post("/admin_panel", async (req, res) => {
    /* about teacher */
    shteach_codemeli = req.body.sh_teacher_code_meli;
    shteach_codeper = req.body.sh_teacher_code_per;
    defteach_fname = req.body.def_teacher_fname;
    defteach_lname = req.body.def_teacher_lname;
    defteach_codemeli = req.body.def_teacher_code_meli;
    defteach_codeper = req.body.def_teacher_code_per;
    defteach_madrak = req.body.def_teacher_madrak;
    defteach_year = req.body.def_teacher_year;
    delteach_codemeli = req.body.del_teacher_code_meli;
    delteach_codeper = req.body.del_teacher_code_per;
    if (shteach_codemeli && shteach_codeper) {
        found_teacher2 = await Teacher.findOne({ code_meli: shteach_codemeli });
        if (!found_teacher2) {
            req.flash('errors', 'چنین استادی ثبت نشده است');
            res.redirect("/admin_panel");
        }
        else {
            if (shteach_codeper == found_teacher2.code_personeli) {
                info2 =
                {
                    "نام": found_teacher2.f_name,
                    "نام خانوادگی": found_teacher2.l_name,
                    "کد ملی": found_teacher2.code_meli,
                    "کد پرسنلی": found_teacher2.code_personeli,
                    "مدرک": found_teacher2.madrak,
                    "سال تدریس": found_teacher2.year,
                    "کلاس ها": found_teacher2.class_name
                }
                res.send(info2)
            }
            else {
                req.flash('errors', 'کد پرسنلی اشتباه است');
                res.redirect("/admin_panel");
            }
        }
    }
    if (defteach_fname && defteach_lname && defteach_codemeli && defteach_codeper && defteach_madrak && defteach_year) {
        const found_teacher1 = await Teacher.findOne({ code_meli: defteach_codemeli })
        if (found_teacher1) {
            req.flash('errors', 'چنین استادی قبلا ثبت شده است');
            res.redirect("/admin_panel")
        }
        else {
            if (defteach_codemeli.length < 10) {
                req.flash('errors', 'کد ملی باید 10 رقم باشد');
                res.redirect("/admin_panel")
            }
            else if (defteach_codeper.length < 10) {
                req.flash('errors', 'کد پرسنلی باید 10 رقم باشد');
                res.redirect("/admin_panel")
            }
            else {
                const NewTeacher = new Teacher({
                    code_personeli: defteach_codeper,
                    code_meli: defteach_codemeli,
                    f_name: defteach_fname,
                    l_name: defteach_lname,
                    madrak: defteach_madrak,
                    year: defteach_year,
                    class_name: ""
                })
                NewTeacher.save(function (err, teacher) {
                    console.log(err)
                    if (err) {
                        req.flash('errors', 'مشکلی رخ داد . مجددا تلاش کنید');
                        res.redirect("/admin_panel");
                    }
                    else {
                        req.flash('errors', 'استاد ثبت شد');
                        res.status(200).redirect("/admin_panel")
                    }
                })
            }
        }
    }
    if (delteach_codemeli && delteach_codeper) {
        found_teacher3 = await Teacher.findOne({ code_meli: delteach_codemeli });
        if (!found_teacher3) {
            req.flash('errors', 'چنین استادی ثبت نشده است');
            res.redirect("/admin_panel");
        }
        else {
            if (delteach_codeper == found_teacher3.code_personeli) {
                await Teacher.deleteOne({ code_meli: delteach_codemeli })
                req.flash('errors', 'استاد حذف شد');
                res.redirect("/admin_panel");
            }
            else {
                req.flash('errors', 'کد پرسنلی اشتباه است');
                res.redirect("/admin_panel");
            }
        }
    }
    /* about student */
    shstudent_codemeli = req.body.sh_student_code_meli;
    shstudent_shd = req.body.sh_student_shd;
    defstud_fname = req.body.def_student_fname;
    defstud_lname = req.body.def_student_lname;
    defstud_codemeli = req.body.def_student_code_meli;
    defstud_shd = req.body.def_student_shd;
    defstud_reshte = req.body.def_student_reshte;
    defstud_age = req.body.def_student_age;
    defstud_add = req.body.def_student_address;
    defstud_year = req.body.def_student_year;
    delstud_codemeli = req.body.del_student_code_meli
    delstud_shd = req.body.del_student_shd
    if (shstudent_codemeli && shstudent_shd) {
        found_student1 = await Student.findOne({ code_meli: shstudent_codemeli });
        if (!found_student1) {
            req.flash('errors', 'چنین دانشجویی ثبت نشده است');
            res.redirect("/admin_panel");
        }
        else {
            if (shstudent_shd == found_student1.sh_d) {
                info2 =
                {
                    "نام": found_student1.f_name,
                    "نام خانوادگی": found_student1.l_name,
                    "کد ملی": found_student1.code_meli,
                    "شماره دانشجویی": found_student1.sh_d,
                    "رشته": found_student1.reshte,
                    "سن": found_student1.age,
                    "آدرس": found_student1.address,
                    "سال ورود": found_student1.year,
                    "معدل": found_student1.moadel,
                    "کلاس ها": found_student1.class_name
                }
                res.send(info2)
            }
            else {
                req.flash('errors', 'شماره دانشجویی اشتباه است');
                res.redirect("/admin_panel");
            }
        }
    }
    if (defstud_fname && defstud_lname && defstud_codemeli && defstud_shd && defstud_reshte && defstud_age && defstud_add && defstud_year) {
        found_student2 = await Student.findOne({ code_meli: defstud_codemeli })
        if (found_student2) {
            req.flash('errors', 'چنین دانشجویی قبلا ثبت شده است');
            res.redirect("/admin_panel")
        }
        else {
            if (defstud_codemeli.length < 10) {
                req.flash('errors', 'کد ملی باید 10 رقم باشد');
                res.redirect("/admin_panel")
            }
            else if (defstud_shd.length < 10) {
                req.flash('errors', 'شماره دانشجویی باید 10 رقم باشد');
                res.redirect("/admin_panel")
            }
            else {
                NewStudent = new Student({
                    code_meli: defstud_codemeli,
                    sh_d: defstud_shd,
                    f_name: defstud_fname,
                    l_name: defstud_lname,
                    reshte: defstud_reshte,
                    year: defstud_year,
                    age: defstud_age,
                    address: defstud_add,
                    class_name: "",
                    moadel: ""
                })
                NewStudent.save(function (err, student) {
                    console.log(err)
                    if (err) {
                        req.flash('errors', 'مشکلی رخ داد . مجددا تلاش کنید');
                        res.redirect("/admin_panel");
                    }
                    else {
                        req.flash('errors', 'دانشجو ثبت شد');
                        res.status(200).redirect("/admin_panel")
                    }
                })
            }
        }
    }
    if (delstud_codemeli && delstud_shd) {
        found_student3 = await Student.findOne({ code_meli: delstud_codemeli });
        if (!found_student3) {
            req.flash('errors', 'چنین دانشجویی ثبت نشده است');
            res.redirect("/admin_panel");
        }
        else {
            if (delstud_shd == found_student3.sh_d) {
                await Student.deleteOne({ code_meli: delstud_codemeli });
                req.flash('errors', 'دانشجو حذف شد');
                res.redirect("/admin_panel");
            }
            else {
                req.flash('errors', 'شماره دانشجویی اشتباه است');
                res.redirect("/admin_panel");
            }
        }
    }
    /* about class */
    shclass_code = req.body.sh_class_classcode;
    shclass_groh = req.body.sh_class_groh;
    defclass_name = req.body.def_class_name
    defclass_code = req.body.def_class_code
    defclass_groh = req.body.def_class_groh
    defclass_zarfiat = req.body.def_class_zarfiat
    defclass_time = req.body.def_class_time
    defclass_techcode = req.body.def_class_teacher_name
    delclass_code = req.body.del_class_classcode
    delclass_groh = req.body.del_class_groh
    if (shclass_code && shclass_groh) {
        found_class1 = await Class.findOne({ code_class: shclass_code });
        if (!found_class1) {
            req.flash('errors', 'چنین کلاسی ثبت نشده است');
            res.redirect("/admin_panel");
        }
        else {
            if (shclass_groh == found_class1.group) {
                info2 =
                {
                    "نام کلاس": found_class1.class_name,
                    "کد کلاس": found_class1.code_class,
                    "گروه": found_class1.group,
                    "ظرفیت": found_class1.zarfiat,
                    "تعداد": found_class1.tedad,
                    "وضعیت": found_class1.status,
                    "زمان": found_class1.time,
                    "نام استاد": found_class1.teacher_name,
                }
                res.send(info2);
            }
            else {
                req.flash('errors', 'شماره گروه کلاس مورد نظر اشتباه است');
                res.redirect("/admin_panel");
            }
        }
    }
    if (defclass_name && defclass_code && defclass_groh && defclass_zarfiat && defclass_time && defclass_techcode) {
        found_class2 = await Class.findOne({ code_class: defclass_code });
        if (found_class2) {
            req.flash('errors', 'چنین کلاسی قبلا ثبت شده است');
            res.redirect("/admin_panel")
        }
        else {
            found_teacher4 = await Teacher.findOne({ code_personeli: defclass_techcode });
            if (defclass_code.length > 7) {
                req.flash('errors', 'کد کلاس باید 6 رقم باشد');
                res.redirect("/admin_panel")
            }
            else if (defclass_groh.length > 2) {
                req.flash('errors', 'شماره گروه کلاس باید بین 0 تا 9 باشد');
                res.redirect("/admin_panel")
            }
            else if (!found_teacher4) {
                req.flash('errors', 'چنین استادی ثبت نشده است');
                res.redirect("/admin_panel")
            }
            else {
                TeacherName = found_teacher4.f_name + ' ' + found_teacher4.l_name
                NewClass = new Class({
                    class_name: defclass_name,
                    code_class: defclass_code,
                    group: defclass_groh,
                    zarfiat: defclass_zarfiat,
                    tedad: "",
                    status: "",
                    time: defclass_time,
                    teacher_name: TeacherName,
                    student_name: ""
                })
                NewClass.save(function (err, student) {
                    console.log(err)
                    if (err) {
                        req.flash('errors', 'مشکلی رخ داد . مجددا تلاش کنید');
                        res.redirect("/admin_panel");
                    }
                    else {
                        req.flash('errors', 'کلاس ثبت شد');
                        res.status(200).redirect("/admin_panel")
                    }
                })
            }
        }
    }
    if (delclass_code && delclass_groh) {
        found_class3 = await Class.findOne({ code_class: delclass_code });
        if (!found_class3) {
            req.flash('errors', 'چنین کلاسی ثبت نشده است');
            res.redirect("/admin_panel");
        }
        else {
            if (delclass_groh == found_class3.group) {
                await Class.deleteOne({ code_class: delclass_code });
                req.flash('errors', 'کلاس حذف شد');
                res.redirect("/admin_panel");
            }
            else {
                req.flash('errors', 'کد کلاس اشتباه است');
                res.redirect("/admin_panel");
            }
        }
    }
})

router.get("/api" , async(req,res)=>{
    ff = await Class.find({ teacher_name : 'احمد دربان'})
    /*const cars = 
    [
        {type:"Fiat", model:"500", color:"white"},
        {type:"pejo", model:"2000", color:"red"},
    ]*/
    res.send(ff);
    console.log(req.body)
})

router.post("/test" , (req,res)=>{
   console.log(req.body.name)
   console.log(req.body.password)
})

// export rout to server.js
module.exports = router;