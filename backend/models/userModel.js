const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const userScheema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter a Email"],
    maxLength: [30, "Name should not exceed more than 30 characters"],
    minLength: [4, "Name shoule be more than 4 characters"],
  },
  email: {
    type: String,
    required: [true, "Please Enter a Email"],
    unique: true, //to make it unique in database
    validate: [validator.isEmail, "Please Enter a valid Email"],
  },
  password: {
    type: String,
    required: [true, "Please Enter the Password"],
    minLength: [8, "password should be more than 8 characters"],
    select: false,
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  role: {
    type: String,
    default: "user",
  },
  createdAt:{
    type: Date,
    default: Date.now,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

//Hasing the password with bycrypt.js
/* userScheema.pre("save",async function(next){

  if(!this.isModified("password")){
    next();
  }

  this.password= await bcrypt.hash(this.password,10)
})
 */
//JWT TOKEN

//creating a method fof user scheema

//generating password Reset token

userScheema.methods.getResetPasswordToken = function () {
  //generating token
  const resetToken = crypto.randomBytes(20).toString("hex");

  //now storing the token hash value in database

  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  return resetToken;
};

module.exports = mongoose.model("user", userScheema);
