module.exports = function(io){
    var b_md = require("../models/bill");

    io.sockets.on("connection", function(socket){
        // console.log("Have a new user connected");

        // nhan print bill
        socket.on("print", function(data){
            console.log("user: " + data.user);
            console.log("table: " + data.table);
            for( i in data.ctdh){
                console.log(data.ctdh[i]);
            }
            console.log("Tổng: " + data.tonggia)
        });

        socket.on("upProduct", function(data){
            var p = {
                db_quantity: data.sl,
                db_total: data.gia
            }
            var w = {
                b_id: data.b_id,
                p_id: data.p_id
            }
            var upProduct = b_md.updateDetailBill(p, w);
            upProduct.then(function(){
                console.log("up thhanh cong");
                socket.emit("upProductX", w, p);
            }).catch(function(err){
                console.log("up loi" + err);
            });
            
        });

    });

    
}