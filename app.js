/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http');

_ = require('underscore')

var mongodb = require('mongodb')
// var cons = require('consolidate')
var swig = require('swig')
var app = express();

var config = require('./config')
var host = config.mongodb.host || 'localhost'
var port = config.mongodb.port || mongodb.Connection.DEFAULT_PORT
var db = new mongodb.Db(config.mongodb.database, new mongodb.Server(host, port, {auto_reconnect: true}))

swig.init({
  root: __dirname + '/views',
  allowErrors: false
})

swig.__express = function (path, options, fn) {
  options = options || {}
  try {
    options.filename = path
    var tmpl = swig.compileFile(_.last(path.split('/')))
    fn(null, tmpl.render(options))
  } catch (err) {
    fn(err)
  }
}

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.engine('.html', swig.__express);
  app.set('view engine', 'html');
  app.set('view options', {layout: false});
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.static(__dirname + '/public'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

// app.locals.use(function (req, res) {
//   res.locals.base_href = config.site.base_url
// })

db.open(function(err, db) {
  if (!err) {
    app.set('db', db)
    console.log('Database connnected!')

    db.collectionNames(function (err, names) {
      // res.locals.collections = names
    })
  } else {
    throw err
  }
})



app.get('/', routes.index);

http.createServer(app).listen(config.site.port || 80);

console.log("Mongo Express server listening on port 3000");
