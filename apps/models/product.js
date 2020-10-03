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

function getProduct(id){
    var defer = q.defer();

    var query = conn.query("SELECT * FROM product WHERE ?", {p_id: id}, function(err, result){
        if(err){
            defer.reject(err);
        }else{
            defer.resolve(result);
        }
    });
    return defer.promise;
}

function getSpeciesProduct(species){
    var defer = q.defer();

    var query = conn.query("SELECT * FROM product WHERE ?", {p_species: species}, function(err, result){
        if(err){
            defer.reject(err);
        }else{
            defer.resolve(result);
        }
    });
    return defer.promise;
}


module.exports = {
    getAllProduct: getAllProduct,
    getProduct: getProduct,
    getSpeciesProduct: getSpeciesProduct
}