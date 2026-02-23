const mongoose = require("mongoose");
const { Schema } = mongoose;
const userSchema = new Schema({
  fullName: String,
  email: String,
  password: String,
  role : {
    type : String,
    enum : ["BUYER" , "SELLER"]
  }
}
,{
  timestamps : true
});
const User = mongoose.model("User", userSchema);
module.exports = {
  User,
};
