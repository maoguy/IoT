var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var models = require("./Models");
/*
for(var m in models){
	mongoose.model(m,new Schema(models[m]));
}
*/
/*
mongoose.model('user' , new Schema ({
	apikey :  {type : String }  ,
	email :  {type : String}  ,
	password :  {type : String}
})) ;



module.exports = {
	getModel: function(type){
		return _getModel(type);
	}
};

var _getModel = function(type){
	return mongoose.model(type);
};
*/
