let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({
    extended: false
}))
// parse application/json
router.use(bodyParser.json())

var db = [];

router.get('/', function (req, res) {
    let randomId = Math.round(Math.random() * 100);
    res.render('index.html', {
        username: "admin",
        id: randomId
    });
});

router.get('/add-task', function (req, res) {
    res.render('add-task.html');
});

router.post('/addtask', function (req, res) {
    let name = req.body.taskName
    let dueDate = req.body.taskDueDate;
    let description = req.body.taskDescription;

    let task = {
        taskname: name,
        taskduedate: dueDate,
        taskdescription: description
    }
    console.log(task);
    
    db.push(task);
    res.send("Thank you for adding a task");
});

router.get('/list-task', function (req, res) {
    res.render('view-task.html', {
        username: "Guest",
        taskDb: db
    });
});

//export this router 
module.exports = router;