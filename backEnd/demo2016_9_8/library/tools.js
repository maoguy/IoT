var mongoose = require ('mongoose') ;

var isValidateObjectId = function (id) {
  return mongoose.Types.ObjectId.isValid (id) ;
}
