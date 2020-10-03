var db = require("../common/database");
var q = require("q");

var conn =db.getConnection();

function getAllProduct(){
    var defer = q.defer();

    var query = conn.query("SELECT * FROM product", function(err, result){
        if(err){
            defer.reject(err);
        }else{
            defer.resolve(result);
        }
    });
    return defer.promise;
}