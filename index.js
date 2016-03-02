var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars')
var index = require('./routes/index');
var system = require('./routes/system');
var list = require('./routes/list');
var sysinfo = require('./routes/sysinfo');
var edit = require('./routes/edit');

var app = express();
app.set('port', (process.env.PORT || 3000));
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'));
app.get('/', index.view);
app.get('/systema', system.view);
app.get('/system', system.viewOld);
app.get('/list', list.view);
app.get('/sysinfo', sysinfo.get_info);
app.get('/ssys', sysinfo.get_one);
app.post('/add', edit.add);
app.post('/edit', edit.edit);
app.post('/add_child', edit.add_child);

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

