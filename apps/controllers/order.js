var express = require("express");
var router = express.Router();

var p_md = require("../models/product");
var b_md = require("../models/bill");
// const product = require("../models/product");
var kt = true;
// req.session.kt = true;
var resultPprouct= {}

var data = p_md.getAllProduct();
data.then(function(product){
    resultPprouct = {
        product: product,
        error: false
    };
}).catch(function(err){
    console.log("lay data khong thanh cong");
});


router.get("/", function(req, res){
    if(req.session.employe){

        res.render("order", {data: resultPprouct, detail_bill: {}});  
    }else{
        res.redirect("login");

    }
    // var kt = true;
    console.log(req.session.employe);
    
});


router.post("/", function(req, res){
    var detail_bill = req.body;
    // var b_id = 0;
    
    if(kt){
        var d = new Date();
        var dT =d.getTime();
        b = {
            b_id: dT,
            e_id: req.session.employe.e_id
        }
        var resultBill = b_md.addBill(b);
        resultBill.then(function(){
            console.log("them thanh cong bill");
            // b_id = bill.b_id;
            // res.redirect("order");
        }).catch(function(err){
            console.log("them khong thanh cong bill"+err);
            // res.redirect("order");
            
        });
        kt = false;
    }


    data_detail_bill = {
        p_id: detail_bill.p_id,
        b_id: b.b_id,
        db_quantity: detail_bill.db_quantity,
        db_total: detail_bill.db_total*detail_bill.db_quantity
    }


    var resultDetailBill = b_md.addDetailBill(data_detail_bill);
    resultDetailBill.then(function(){
        console.log("them thanh cong addDetailBill");
        // b_id = bill.b_id;
        var dataSumDetailBill= b_md.getSumDetailBill(data_detail_bill.b_id);

        dataSumDetailBill.then(function(Sumdetail_bill){
            console.log("lay thanh cong getDetailBill");
            var resultdataSumDetailBill = {
                db_quantity: Sumdetail_bill[0].quantity,
                db_total: Sumdetail_bill[0].total,
                error: false
            };
            console.log(resultdataSumDetailBill)
            res.render("order", { detail_bill: resultdataSumDetailBill, data: resultPprouct, b_id: data_detail_bill.b_id});

        }).catch(function(err){
            console.log("lay khong thanh cong setDetailBill"+err);
            
        res.render("order", {data: resultPprouct});
        });


    
    }).catch(function(err){
        console.log("them khong thanh cong addDetailBill"+err);
        res.redirect("order",  {data: resultPprouct});

    });


    console.log(data_detail_bill);
    // res.redirect("order");
    

});


// // module.exports = function(io){
// //     io.sockets.on("connection", function(socket){
// //         console.log("Have a new user connected");

// //         // nhan print bill
// //         socket.on("print", function(data){
// //             console.log("user: " + data.user);
// //             console.log("table: " + data.table);
// //             for( i in data.ctdh){
// //                 console.log(data.ctdh[i]);
// //             }
// //             console.log("Tổng: " + data.tonggia)
// //         });
// //     });   
// }

module.exports = router;