let express = require('express');
let app = express();

let router = require('./router.js');

//both router.js and server.js should be in same directory
app.use('/', router);

//Setup the view Engine
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

//Setup the static assets directories
app.use(express.static('images'));
app.use(express.static('css'));


app.listen(8000);