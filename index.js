var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars')
var index = require('./routes/index');
var system = require('./routes/system');
var list = require('./routes/list');
var textedit = require('./routes/textedit');
var edit_menu = require('./routes/edit_menu');
var drawedit = require('./routes/drawedit');

var app = express();
app.set('port', (process.env.PORT || 3000));
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
//app.use(express.urlencoded());

app.use(express.static(__dirname + '/public'));

app.get('/', index.view);
app.get('/system', system.view);
app.get('/list', list.view);
app.get('/textedit', textedit.view);
app.get('/edit', edit_menu.view);
app.get('/drawedit', drawedit.view);

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


