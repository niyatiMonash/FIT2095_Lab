let express = require('express');
let router = express.Router();
var db = [];

router.get('/', function (req, res) {
    let randomId = Math.round(Math.random() * 100);
    res.render('index.html', {
        username: "admin",
        id: randomId
    });
});

router.get('/add-task', function(req,res){
    res.render('add-task.html');
});

router.get('/list-task', function(req,res){
    res.render('view-task.html', {username: "Guest", taskDb: db});
});

//export this router 
module.exports = router;