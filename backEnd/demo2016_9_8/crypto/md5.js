//加密模块

var crypto = require ('crypto') ;

exports.dataToMd5 = function (data , callback) {
  var md5 = crypto.createHash ('md5') ;

  md5.update (data) ;

  var md5Password = md5.digest ('hex') ;

  callback (md5Password) ;

} ;
