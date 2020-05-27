var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var cors = require('cors');
var path = require('path');

var app = express();

const route = require('./routes/route');

//connect to mongo db
mongoose.connect('mongodb+srv://admin:Mehdi786@cluster0-jfl2g.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection.on('connected', ()=>{
    console.log('connected to monogo db successfully');
});

mongoose.connection.on('error', (err)=>{
    if(err){
        console.log("Error: " + err);
    }
});

const port = 3000;

app.use(cors());

app.use(bodyparser.json());

//static files
app.use(express.static(path.join(__dirname, 'public')));

//routes
app.use('/api', route);

app.get('/',(req, res)=>{
    res.send('Hello developers💻');
});

app.listen(port, ()=>{
    console.log("Server running at http://localhost:" + port + "/");
});