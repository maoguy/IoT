/*
module.exports = {
	user:{
		email:{type:String,required:true},
		password:{type:String,required:true},
    apikey:{type:String}
	}
  ,
  device:{
    title : {type : String} ,
    apikey : {type : String}
  }
  ,
  sensor : {
    sensor_type : { type : String } ,
    apikey : { type : String } ,
    device_id : { type : String } ,
    title : { type : String }
  }
};
*/

var mongoose = require ('mongoose') ;
var Schemas = require ('./Schemas') ;

//用户模型出口
exports.userModel = mongoose.model ('users' , Schemas.userSchema) ;

//设备模型出口
exports.deviceModel = mongoose.model ('devices' , Schemas.deviceSchema) ;

//传感器模型出口
exports.sensorModel = mongoose.model ('sensors' , Schemas.sensorSchema) ;
