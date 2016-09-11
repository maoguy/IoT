var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//引用额外模块
var ejs = require ("ejs") ;

var multer = require ("multer") ;
var mongoose = require ("mongoose") ;

var session = require ("express-session") ;

//全局变量设置
//global.dbHandle = require ("./database/dbHandle") ;
//global.db = mongoose.connect ("mongodb://localhost:27017/demo08") ;

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

app.use (session (
  {
    secret : 'secret' ,
    cookie : {
      maxAge : 1000*60*30
    }
  }
)) ;



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine("html" , ejs.__express) ;
app.set ("view engine" , "html") ;
//app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use (multer()) ;
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use (function (req , res , next) {
  res.locals.user = req.session.user ;  //从session获取user对象
  var err = req.session.error ; //获取错误信息
  delete req.session.error ;
  res.locals.message = "" ; //展示的信息 message
  if (err) {
    res.locals.message = '<div class="alert alert-danger" style="margin-bottom:20px;color:red;">'+err+'</div>';
  }
  next () ; //中间件传递
}) ;




//添加一些路由
app.use ('/' , routes) ;  //为路径 / 设置路由
app.use ('/users' , users) ; //为路径 /users 设置路由
app.use ('/register' , routes) ;  //为路径 /register 设置路由
app.use ('/user' , routes) ;  //为路径 /user设置路由
app.use ('/logout' , routes) ;  //为路径 /logout 设置路由

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
