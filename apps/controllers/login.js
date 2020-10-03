var express = require("express");
var router = express.Router();

var e_md = require("../models/employes");

var helper = require("../helpers/helper");

router.get("/", function(req, res){
    res.render("login", {data: {}});
});

router.post("/", function(req, res){
    var params = req.body;

    console.log(params);
    
    if(params.phone.trim().length == 0){
        res.render("login", {data: {err: "Vui lòng nhập vào số điện thoại"}});
    }else{
        var data = e_md.getEmpByPhone(params.phone);
        // console.log(data);
        if(data){
            data.then(function(employes){
                var employe = employes[0];
                // console.log("sdffsd");
                // console.log(employe);
                var status = helper.compare_password(params.password, employe.e_password);
                // console.log(status);
                if(status){
                    req.session.employe = employe;
                    // console.log(req.session.employe);
                    res.redirect("order");
                }else{
                    res.render("login", {data: {err: "Mật khẩu không đúng."}});
                }

            }).catch(function(err){
                    res.render("login", {data: {err: "Tài khoản không tồn tại"}});
            });
        }
    }

});

module.exports = router;