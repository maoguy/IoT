var express = require('express');
var router = express.Router();

var mongoose = require ("mongoose") ;

var models = require ("../database/Models") ;
var dbConnect = require ("../database/dbConnect") ;

var devices = require ("../devices/Devices") ;

var md5 = require ("../crypto/md5");
//connect Db 连接数据库
dbConnect.connectDb () ;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });  //渲染index文件，传出title值供 index.html 使用
});




//旧的 登录方法
var old_login = function (req , res) {
  //在 '/login' 路径检测到post方法则进行post数据的处理操作
  //get User info
  //这里的User就是从model中获取的user对象，通过global。dbHandle全局方法
  var User = models.userModel ;

// var User = mongoose.model ('users') ;
//var User = global.dbHandle.getModel ('user') ;
  var uname = req.body.uname ;
  var upwd = req.body.upwd ;
  var md5Password = "" ;
  md5.dataToMd5 (upwd , function (md5data) {
    md5Password = md5data ;
  }) ;

  User.findOne ( {email : uname} , function (err , doc) {
    if (err) {
      res.send (500) ;  //状态码返回500
      console.log (err) ;
    }else if (!doc) {
      req.session.error = "用户不存在" ;
      res.send (404) ;  //状态码返回404
    }else {
      if (md5Password != doc.md5Password) {
        req.session.error = "密码错误" ;
        res.send (404) ;
      }else {
        req.session.user = doc ;
        res.send (200) ;
      }
    }
  });

}

//旧的 注册方法
var old_register = function (req , res) {
  var User = models.userModel ;

//  var User = mongoose.model ('users') ;


  var uname = req.body.uname ;
  var upwd = req.body.upwd ;
  var myPassword = "" ;
  var myApikey = "" ;
  //对密码加密
  md5.dataToMd5 (upwd , function (md5data) {
    md5Password = md5data ;
  }) ;
  //通过唯一的账号生产apikey
  md5.dataToMd5 (uname , function (md5key) {
    apikey = md5key ;
  }) ;

  User.findOne ({email : uname} , function (err , doc) {
    if (err) {
      res.send (500) ;
      req.session.error = "网络异常错误!" ;
      console.log (err) ;
    }else if (doc) {
      req.session.error = "用户名已存在!" ;
      res.send (500) ;
    }else {
      User.create ({
        email : uname ,
        password : upwd ,
        md5Password : md5Password ,
        apikey : apikey
      },function (err , doc) {
        if (err) {
          res.send (500) ;
          console.log (err) ;
        }else {
          req.session.error = "用户名创建成功!" ;
          res.send (200) ;
        }
      });
    }
  });
}

//登录路由
router.route ('/login').get (function (req , res) {
  //到达 '/login' 路径则渲染login文件 ， 并传出 title 值供login.html 使用
  res.render ('login' , { title : "User Login"}) ;
}).post (old_login);

//注册路由
router.route ("/register").get (function (req , res) {
  res.render ("register" , {title : 'User register'}) ;
}).post (old_register);

//user 路由
router.get ("/user" , function (req , res) {
  if (!req.session.user) {
    req.session.error = "请先登录" ;
    res.redirect ("/login") ;
  }
  res.render ("user" , { title : 'User'}) ;
}) ;

//注销路由
router.get ("/logout" , function (req , res) {
  req.session.user = null ;
  req.session.error = null ;
  res.redirect ("/") ;
})

//处理设备信息的路由
router.route ("/user/devices").get (devices.listDevices).post (devices.createDevice) ;


module.exports = router;
