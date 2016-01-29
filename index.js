var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars')
var index = require('./routes/index');

var app = express();
app.set('port', (process.env.PORT || 3000));
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
//app.use(express.urlencoded());

app.use(express.static(__dirname + '/public'));

app.get('/', index.view);

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


