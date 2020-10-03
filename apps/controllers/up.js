var express = require("express");
var router = express.Router();

var e_md = require("../models/employes");

var helper = require("../helpers/helper");

router.get("/", function(req, res){
    res.render("up", {data : {}});
});

router.post("/", function(req, res){
    var emp = req.body;

    if(emp.phone.trim().length == 0){
        res.render("up", {data: {err: "Vui lòng nhập thông tin!"}});
    }
    //Insert db
    var password = helper.hash_password(emp.password);  
    emp = {
        e_name: emp.name,
        e_phone: emp.phone,
        e_password: password,
        e_address: emp.address

    }

    var result = e_md.addEmp(emp);
    console.log(result);
    result.then(function(data){
        res.render("up", {data: {success: "Thêm tài khoản thành công!"}});
    }).catch(function(err){
        res.render("up", {data: {err: "Thêm tài khoản không thành công!"}});
    });

});

module.exports = router;