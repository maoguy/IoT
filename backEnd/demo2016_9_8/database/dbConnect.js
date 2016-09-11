//封装数据库的连接、断开等操作
var mongoose = require ('mongoose') ;

//数据库连接方法出口
exports.connectDb = function () {

  console.log ("connectDb...") ;

  mongoose.connect ("mongodb://localhost:27017/demo08") ;

  var db = mongoose.connection ;

  //数据库连接错误，将会触发回调函数
  db.on ('error' , function () {
    console.error.bind (console , 'conection error') ;
  }) ;

  //数据库连接成功，将会触发以下回调函数
  //Once our connection opens , our callback will be called.
  db.once ('open' , function () {
    console.log ('mongodb connected!') ;
  }) ;

  //数据库断开连接，将会触发以下回调函数
  db.on ('disconnected' , function () {
    console.log ('mongodb disconnection') ;
  }) ;

} ;

//数据库断开连接方法出口
exports.disconnectDb = function (callback) {
  mongoose.disconnect (callback) ;
}
