const express = require('express');
const app = express();
const path = require('path');

const api = require('./api');

// Set API routes
app.use('/api', api);

// Set homepage
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/app/index.html'));
});

// Serve and expose statics so it can be accessed from outside
app.use('/css', express.static(__dirname + '/app/css'));
app.use('/js', express.static(__dirname + '/app/js'));

// Set 404 error page
app.get('*', function(req, res){
  res.status(404).sendFile(path.join(__dirname + '/app/404.html'));
});

// Run server
const port = process.env.PORT || 3000;
app.listen(port);
console.log(`Server running at Port ${port}`);
