var mongoose = require("mongoose"),
    ObjectID = mongoose.Schema.Types.ObjectId,
    UserSchema = mongoose.Schema({
        surname : String,
        name : String,
        patronymic : String,
        email : String,
        busket : [{type : ObjectID, ref : "Book"}]
    }),
    User = mongoose.model("User", UserSchema);
module.exports = User;