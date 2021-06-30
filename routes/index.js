var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var mongoClient = mongo.MongoClient;

var url = "mongodb://localhost:27017/";

/* GET home page. */
router.get('/', function(req, res, next) {
    res.redirect('/products');
});

router.get('/products', function(req, res, next) {
    mongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("amazweb");
        console.log("Database Connected");
        dbo.collection("products").find({}).sort({ name: 1 }).toArray(function(err, result) {
            if (err) throw err;
            res.render('index', { title: 'AmazWeb', items: result });
            db.close();
        })
    });
});

module.exports = router;