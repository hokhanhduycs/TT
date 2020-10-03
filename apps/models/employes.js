var db = require("../common/database");
var q = require("q");

var conn =db.getConnection();

function addEmp(emp){
    if(emp){
        var defer = q.defer();

        var query = conn.query("INSERT INTO employes SET ?", emp, function(err, result){
            if(err){
                defer.reject(err);
            }else{
                defer.resolve(result);
            }
        });
        // console.log(query);
        return defer.promise;
    }
    return false;
}

function getEmpByPhone(phone){
    if(phone){
        var defer = q.defer();

        var query = conn.query("SELECT * FROM employes WHERE ?", {e_phone: phone}, function(err, result){
            // console.log(query);
            if(err){
                defer.reject(err);
                // console.log('err');
            }else{
                defer.resolve(result);
                // console.log(result);
            }
        });
        // console.log(defer.promise);
        return defer.promise;
    }
    return false;
}



module.exports = {
    addEmp: addEmp,
    getEmpByPhone: getEmpByPhone
}