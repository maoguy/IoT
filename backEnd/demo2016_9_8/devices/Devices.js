//对设备处理方法的 封装 与 出口

var dbOperate = require ('../database/dbOperate') ;
var models = require ('../database/Models') ;
var  tools = require ('../library/tools') ;
//加密模块

//创建设备 （包含 device 信息的post处理）
exports.createDevice = function (req , res ) {

  var myApikey = req.body.apikey ;

  var deviceTitle = req.body.title ;
  var deviceAbout = req.body.about ;
  var deviceTags = req.body.tags ;
  var deviceLocation = req.body.location ;

  var deviceModel = models.deviceModel ;

  var userModel = models.userModel ;

  //通过apikey查找
  dbOperate.findByApikey (userModel , myApikey , function (docs) {
    //若不存在，返回错误
    if (doc.length == 0) {
      res.json ({"result" : "apikey不正确"}) ;
    } else {
      console.log ('new device is creating...') ;

      var data = {
        title : deviceTitle ,
        about : deviceAbout ,
        tags : deviceTags ,
        location : deviceLocation ,
        apikey : myApikey
      } ;
      //创建 设备
      dbOperate.create (deviceModel , data , function (doc) {
        console.log (doc) ;

        var result = {
          //result : "设备创建成功" ,
          device_id : doc.id
        } ;
        console.log ('new device has been created!') ;

        res.json (result) ;
      }) ;
    }
  }) ;
} ;

//罗列设备 (GET请求得到所有设备信息的列表,同时需要apikey确认身份)
exports.listDevices = function (req , res) {
  var apikey = req.query.apikey ;
  console.log ("apikey is " + apikey ) ;
  var deviceModel = models.deviceModel ;
  dbOperate.findByApikey (deviceModel , apikey , function (docs) {
      if (docs.length == 0) {
        res.json ({"Error":"apikey不正确"}) ;
      } else {
        res.json (docs) ;
      }
  }) ;

} ;

//删除设备  (delete请求)
exports.deletDevice = function (req , res) {
  var apikey = req.body.apikey ;
  var id = req.bodu.id ;

  if ((id == null) || (! tools.isValidateObjectId (id))) {
    return res.json ({"Error":"id不合法!"}) ;
  }
  var deviceModel = models.deviceModel ;
  dbOperate.findByapikey (deviceModel , apikey , function (doc) {
    if (doc == null) {
      res.json ({"Error" : "apikey Error"}) ;
    } else {
      dbOperate.findById (deviceModel , id , function (doc) {
        console.log (doc) ;

        if ((doc == null) || (doc.length == 0)) {
          res.json ({"Error" : "id不存在!"}) ;
        } else {
          dbOperate.delete (deviceModel , id , function (err) {
            if (err) {
              console.log ("delete Device error!") ;
            } else {
              res.json ({"result" : "删除设备成功!"}) ;
            }
          });
        }
      });
    }
  }) ;
} ;

//编辑设备  (HTTP PUT请求将更新指定设备的信息)
exports.editDevice = function (req , res) {
  var apikey = req.body.apikey ;
  var deviceTitle = req.body.title ;
  var deviceId = req.body.id ;
  var deviceModel = models.deviceModel ;
  console.log ("deviceId : " + deviceId ) ;
  if ((device_id == null) || (! tools.isValidateObjectId (deviceId))) {
    return res.json ({"Error" : "id不合法"}) ;
  }
  var data = {
    title : deviceTitle
  } ;
  dbOperate.findByApikey (deviceModel , apikey , function (doc) {
    if (doc.length == 0) {
      res.json ({"result" : "apikey不正确!"}) ;
    } else {
      dbOperate.edit (deviceModel , deviceId , data , function (data) {
        if (data == null || data.length == 0) {
          res.json ({"Error" : "该id对应设备不存在!"}) ;
        } else {
          res.json ({"result" : "更新成功!"}) ;
        }
      }) ;
    }
  }) ;
} ;

//查看设备 get请求
exports.getDevice = function (req , res) {
  var apikey = req.query.apikey ;
  var deviceId = req.query.id ;
  var deviceModel = models.deviceModel ;
  console.log ("deviceId : " + deviceId) ;
  if ((deviceId == null ) || (! tools.isValidateObjectId (device_id))) {
    res.json ({"result" : "该id对应的设备不存在"}) ;
  } else {
    dbOperate.findByApikey (deviceModel , apikey , function (doc) {
      console.log (doc) ;
      if (doc.length == 0) {
        res.json ({"Error" : "apikey不正确!"}) ;
      } else {
        dbOperate.findById (deviceModel , deviceId , function (doc) {
          if ((doc == null) || (doc.length == 0)) {
            res.json ({"Error":"该id对应的设备不存在!"}) ;
          } else {
            res.json (doc) ;
          }
        }) ;
      }
    }) ;
  }
} ;
