var port = process.env.PORT || 3000,
    fs = require('fs');

/* The Planet Mapper application */

/* Dependencies */
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');


/* Initialization */
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static(path.join(__dirname, '/node_modules')));

/* Angular Content */
// app.get('*', express.static(__dirname + '/public'));
// app.get('node_modules', express.static(__dirname + '/node_modules'));



var log = function(entry) {
    fs.appendFileSync('/tmp/planet-mapper.log', new Date().toISOString() + ' - ' + entry + '\n');
};


// Put a friendly message on the terminal
app.listen(port);
console.log('Server running at http://localhost:' + port + '/');
