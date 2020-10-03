var express = require("express");

var router = express.Router();

router.use("/admin", require(__dirname + "/admin"));
router.use("/login", require(__dirname + "/login"));
router.use("/table", require(__dirname + "/table"));
router.use("/cart", require(__dirname + "/cart"));
router.use("/up", require(__dirname + "/up"));
router.use("/order", require(__dirname + "/order.js"));



router.get("/", function(req, res){
    // res.json({"message": "this is Home Page"});
    res.render("test");
});

module.exports = router; 