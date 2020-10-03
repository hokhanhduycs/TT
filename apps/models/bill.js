var db = require("../common/database");
var q = require("q");

var conn =db.getConnection();

function addBill(bill){
    if(bill){
        var defer = q.defer();

        var query = conn.query("INSERT INTO bill SET ?", bill, function(err, result){
            // console.log(query);
            if(err){
                defer.reject(err);
            }else{
                defer.resolve(result);
            }
        });
        // console.log(defer.promise);
        return defer.promise;
    }
    return false;
}

function addDetailBill(detail_bill){
    if(detail_bill){
        var defer = q.defer();

        var query = conn.query("INSERT INTO detail_bill SET ?", detail_bill, function(err, result){
            // console.log(query);
            if(err){
                defer.reject(err);
            }else{
                defer.resolve(result);
            }
        });
        // console.log(defer.promise);
        return defer.promise;
    }
    return false;
}


function getBill(e_id){
    if(bill){
        var defer = q.defer();

        var query = conn.query("SELECT * FROM bill WHERE ? LIMIT -1", {e_id: e_id}, function(err, result){
            // console.log(query);
            if(err){
                defer.reject(err);
            }else{
                defer.resolve(result);
            }
        });
        // console.log(defer.promise);
        return defer.promise;
    }
    return false;
}

function getBillId(b_id){
        var defer = q.defer();

        var query = conn.query("SELECT * FROM bill b JOIN employes e ON b.e_id = e.e_id WHERE ?", {b_id: b_id}, function(err, result){
            // console.log(query);
            if(err){
                defer.reject(err);
            }else{
                defer.resolve(result);
            }
        });
        // console.log(defer.promise);
        return defer.promise;
}

// , sum(db_quantity) as quatity, sum(db_total) as total

function getDetailBill(b_id){
    if(b_id){
        var defer = q.defer();

        var query = conn.query("SELECT * FROM detail_bill db JOIN product p ON db.p_id = p.p_id WHERE ? ", {b_id: b_id}, function(err, result){
            // console.log(query);
            if(err){
                defer.reject(err);
            }else{
                defer.resolve(result);
            }
        });
        // console.log(defer.promise);
        return defer.promise;
    }
    return false;
}

function getDetailBillKhoa(b_id, p_id){
    if(b_id){
        var defer = q.defer();

        var query = conn.query("SELECT * FROM detail_bill WHERE ? ", {b_id: b_id, p_id: p_id}, function(err, result){
            // console.log(query);
            if(err){
                defer.reject(err);
            }else{
                defer.resolve(result);
            }
        });
        // console.log(defer.promise);
        return defer.promise;
    }
    return false;
}


function updateDetailBill(data, where){
    if(data && where){
        // console.log(data + where);
        var defer = q.defer();

        var query = conn.query("UPDATE detail_bill SET ? WHERE `b_id` = '?' AND `p_id` = '?'", [data, where.b_id, where.p_id], function(err, result){
            // console.log(query);
            if(err){
                defer.reject(err);
            }else{
                defer.resolve(result);
            }
        });
        console.log(defer.promise);
        return defer.promise;
    }
    return false;
}



function getSumDetailBill(b_id){
    if(b_id){
        var defer = q.defer();

        var query = conn.query("SELECT sum(db_quantity) as quantity, sum(db_total) as total FROM detail_bill WHERE ? ", {b_id: b_id}, function(err, result){
            // console.log(query);
            if(err){
                defer.reject(err);
            }else{
                defer.resolve(result);
            }
        });
        // console.log(defer.promise);
        return defer.promise;
    }
    return false;
}



module.exports = {
    addBill: addBill,
    getBill: getBill,
    getBillId: getBillId,
    addDetailBill: addDetailBill,
    getDetailBill: getDetailBill,
    getSumDetailBill: getSumDetailBill,
    updateDetailBill: updateDetailBill,
    getDetailBillKhoa: getDetailBillKhoa
}