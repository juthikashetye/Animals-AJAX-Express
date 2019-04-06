// make a database called animals_db with an animals table,
//  with an animal_name column.
//   Make a form that submits via ajax that hits a route that inserts an animal. 
//   Show all the animals on the index.html page.
//    Make another form that submits without ajax to insert an animal.
var methodOverride = require('method-override')
var bodyParser = require('body-parser')
var express = require('express');
var app = express();
app.use(methodOverride('_method'))

app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())

var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'shooting',
  database: 'animals_db'
});

connection.connect();

app.get('/animals.json', function(req, res) {
  connection.query('SELECT * FROM animals', function(error, results, fields) {
    if (error) res.send(error)
    else res.json(results);
  });
});

app.post('/animals-insert', function(req, res) {
  connection.query('INSERT INTO animals (animal_name) VALUES (?)', [req.body.animal_name], function(error, results, fields) {
    if (error) res.send(error)
    res.redirect('/');
  });
});

app.listen(3001, function() {
  console.log('listening on 3001');
});