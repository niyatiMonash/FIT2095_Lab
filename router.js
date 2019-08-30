let express = require('express');
const mongodb = require("mongodb");
let router = express.Router();
let bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({
    extended: false
}))
// parse application/json
router.use(bodyParser.json())

//Configure MongoDB
const MongoClient = mongodb.MongoClient;

// Connection URL
const url = "mongodb://localhost:27017/";

//reference to the database (i.e. collection)
let db;

//Connect to mongoDB server
MongoClient.connect(url, {
    useNewUrlParser: true
},
function (err, client) {
    if (err) {
        console.log("Err  ", err);
    } else {
        console.log("Connected successfully to server");
        db = client.db("fit2095db");
    }
});

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
    let taskdetails = req.body;
    console.log(taskdetails);
    
    db.collection('task').insertOne({
        name: taskdetails.taskName,
        duedate: taskdetails.taskDueDate,
        description: taskdetails.taskDescription
    });
    
    res.redirect('/list-task');
});

router.get('/list-task', function (req, res) {
    db.collection('task').find({}).toArray(function (err, data) {
        res.render('view-task', {
            taskDb: data
        });
    });
});

//update tasks
router.get('/update-task', function (req, res) {
    res.sendFile(__dirname + '/views/update-task.html');
});

//update tasks data
router.post('/updatetaskdata', function (req, res) {
    let taskdetails = req.body;
    let filter = {
        name: taskdetails.nameold
    };
    let theUpdate = {
        $set: {
            name: taskdetails.namenew,
            duedate: taskdetails.duedatenew,
            description: taskdetails.descriptionnew
        }
    };
    db.collection('task').updateOne(filter, theUpdate);
    res.redirect('/list-task'); // redirect the client to list users page
});

//delete task 
router.get('/delete-task', function (req, res) {
    res.sendFile(__dirname + '/views/delete-task.html');
}); 

router.post('/deletetaskdata', function (req, res) {
    let taskDetails = req.body;
    console.log(taskDetails);
    
    let filter = {
        name: taskDetails.task_name
    };
    db.collection('task').deleteOne(filter);
    res.redirect('/list-task'); // redirect the client to list users page
});

//export this router 
module.exports = router;