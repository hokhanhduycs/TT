var express = require("express");
var router = express.Router();

var p_md = require("../models/product");
var b_md = require("../models/bill");
// const { getSumDetailBill } = require("../models/bill");

router.get("/", function(req, res){
    res.render("order");
});

router.get("/:b_id", function(req, res){
    // console.log(req.params.b_id);
    b_id= req.params.b_id;


    var detailBill = b_md.getDetailBill(b_id);
        detailBill.then(function(detailBill){
            // console.log(detailBill);
            var dataDetailBill = {
                detailBill: detailBill
            }

            var bill = b_md.getBillId(b_id);
            bill.then(function(bill){
                // console.log(bill);
                var dataBill = {
                    bill: bill
                }
                res.render("cart", {detailBill: dataDetailBill.detailBill, bill: dataBill.bill});

        }).catch(function(err){
            console.log("loi bill" + err);
        });
    
        }).catch(function(err){
            console.log("loi detailbill" + err);
        });



    // res.render("cart");
});

router.post("/cart/:duy/upProduct", function(req, res){
    console.log("duy");
   
});



module.exports = router;