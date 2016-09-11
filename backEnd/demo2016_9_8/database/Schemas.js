var mongoose = require ('mongoose') ;

var Schema = mongoose.Schema ;

//用户建模
exports.userSchema = new Schema ({
	apikey :  {type : String }  ,
	email :  {type : String  , required : true}  ,
	password :  {type : String , required : true} ,
	md5Password : {type : String , require : true }
}) ;

exports.deviceSchema = new Schema ({
	title :  {type : String , required : true }  ,
	about : {type : String } ,
	about : {type : String } ,
	tags : {type : Array} ,
	location : {type : JSON } ,
	apikey : {type : String} ,

}) ;

//传感器建模
exports.sensorSchema = new Schema ({
	sensor_type :  {type : String}  ,
	apikey :  {type : String}  ,
	device_id  : {type : String}  ,
	title  : {type : String}
})
