//对数据库的一些操作

var models = require ('./Models') ;
var dbConnect = require ('./dbConnect') ;

//加密模块
var mds = require ('../crypto/md5') ;

//数据库连接
dbConnect.connectDb () ;

//根据 邮箱 查询 方法出口
exports.findByEmail = function ( Myemail , callback ) {
  console.log ('findByEmal') ;
  var dbModel = models.userModel ;

  dbModel.findOne ( {email : Myemail} , function (err , doc) {

    console.log ('打开数据库查询...callback...') ;

    console.log (doc) ;

    callback (err , doc) ;
  }) ;
} ;

//根据 id 查询 方法出口
exports.findById = function ( model , id , callback) {

  model.findById ({_id : id} , function (err , doc) {

    if (err) {
      console.log ("findById occur error!") ;
    } else {
      callback (doc) ;
    }
  }) ;
} ;

exports.findByTitle = function ( model , title , callback ) {
  model.find ({title} , function (err , docs) {

    if (err) {
      console.log ("findByTitle occur error!") ;
    } else {
      callback (docs) ;
    }
  }) ;
} ;

//查询 集合总共的文档数
exports.countNum = function (model , callback) {
  model.count (function (err , num) {
    if (err) {
      console.log ("countNum occur error!") ;
    } else {
      console.log ("count of this set" + num) ;
    }
  }) ;
} ;

//根据apikey查询所有设备
exports.findByApikey = function (model , myApikey , callback) {

  model.find ( {apikey : myApikey} , function (err , docs) {

    if (err) {
      console.log ("findByApikey error!") ;
    } else {
      callback (docs) ;
    }
  }) ;
} ;

//插入数据
exports.create = function (model , data , callback) {

  model.create (data , function (err , doc) {
    if (err) {
      console.log ("db create data error!") ;
    } else {
      callback (doc) ;
    }
  });
} ;

//删除 设备
exports.delete = function (model , id , callback) {

  console.log (id) ;
  model.remove ({_id : id} , function (err) {
    callback (err) ;
  }) ;
} ;

//通过id 编辑 设备
exports.edit = function (model , id , data , callback) {
  model.findByIdAndUpdate ({_id : id} , data , function (err , data) {
    if (err) {
      console.log ("update error!") ;
    } else {
      console.log (data) ;
      callback (data) ;
    }
  }) ;
} ;
