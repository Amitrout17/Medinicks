const User = require("../models/userModel");
const JWT = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail.js");
const cloudinary = require("cloudinary");

exports.regiserUser = async (req, res, next) => {
  try {
    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "userImages",
      width: 150,
      crop: "scale",
    });

    //Using bycrypt for hashing
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);

    //Add later
    //condition check for valid name and email

    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: secPass,
      avatar: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
    });

    const jwtData = {
      id: user._id,
    };

    const token = JWT.sign(jwtData, process.env.JWT_SECRET);
    res.status(201).cookie("token", token).json({
      sucess: true,
      user,
      JWT_Token: token,
    });
  } catch (error) {
    res.status(400).json({
      sucess: false,
      message: "Some error occured, can not register user",
      error_msg: error.message,
    });
  }
};

//Login user

exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  //checking if user has give email or password
  if (!email || !password) {
    return res.status(400).json({
      message: "Plz Enter Email & Password",
    });
  }

  const user = await User.findOne({ email: email }).select("+password");

  if (!user) {
    return res.status(401).json({
      message: "User Does not exist, Please SignUp",
    });
  } else {
    //Now checking the password with the hash using bycrypt
    const passwordCheck = bcrypt.compareSync(req.body.password, user.password);

    //if the password and hash does not mathces

    if (!passwordCheck) {
      return res.status(401).json({ message: "Invalid Password" });
    }

    //if the password and the hash matches then just send the jwt token
    const jwtData = {
      id: user._id,
    };
    const token = JWT.sign(jwtData, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });

    res.status(201).cookie("token", token).json({
      sucess: true,
      user,
      JWT_Token: token,
    });
  }
};

//Logout user
exports.logout = async (req, res, next) => {
  try {
    res.cookie("token", "logout");

    res.status(200).json({
      sucess: true,
      message: "Logged Out sucessfully",
    });
  } catch (error) {
    error;
  }
};

//Forgot password

exports.forgetPassword = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({
        message: "user with this email does not exist",
      });
    }

    //Get reset password token from userModel method

    const resetToken = user.getResetPasswordToken();

    //now saving user due to new values added to model

    await user.save({ validateBeforeSave: false });

    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/password/reset/${resetToken}`;

    const message = `Click on the following link to reset your Password :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;

    try {
      //now sending email
      await sendEmail({
        email: user.email,
        subject: `password Recovery `,
        message,
      });

      res.status(200).json({
        sucess: true,
        message: `Email sent to ${user.email} sucessfully`,
      });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;

      //now need to save it because due to the above change in database

      await user.save({ validateBeforeSave: false });

      return res.status(500).json({
        sucess: false,
        error,
        error_message: error.message,
        message: "SOME ERROR OCCURED",
      });
    }
  } catch (error) {
    res.json({
      sucess: false,
      message: "Some error occured, ",
      error: error,
      error_msg: error.message,
    });
  }
};

//Reset password

exports.resetPassword = async (req, res, next) => {
  // creating token hash
  try {
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(401).json({
        sucess: false,
        message: "user does not exist",
      });

      next();
    }

    if (req.body.password !== req.body.confirmPassword) {
      return res.status(401).json({
        sucess: false,
        message: "password and confirm password does not match",
      });
      next();
    }

    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);

    await user.updateOne({ password: secPass });
    await user.updateOne({ resetPasswordToken: null });
    await user.updateOne({ resetPasswordExpire: null });

    const jwtData = {
      id: user._id,
    };
    const token = JWT.sign(jwtData, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });

    res.status(200).cookie("token", token).json({
      sucess: true,
      message: "password reset sucessfull",
      /*  user, */
      JWT_Token: token,
    });
  } catch (error) {
    res.json({
      sucess: false,
      message: "Some error occured, can not reset password",
      error,
      error_msg: error.message,
    });
  }
};

//Get user details

exports.getUserDetails = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    res.status(200).json({
      sucess: true,
      user,
    });
  } catch (error) {
    res.status(400).json({
      sucess: false,
      message: "Some error occured, can not get user details",
      error,
    });
  }
};

//update user password

exports.updateUserPassword = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("+password");
    const passwordCheck = bcrypt.compareSync(
      req.body.oldPassword,
      user.password
    );

    if (!passwordCheck) {
      return res.status(401).json({
        sucess: false,
        message: "Old password is incorrect",
      });
      next();
    }

    if (req.body.newPassword !== req.body.confirmPassword) {
      return res.status(400).json({
        sucess: false,
        message: "New password and confirm password does not match",
      });
    }

    //creting hash of new password and storing it

    const salt = await bcrypt.genSalt(10);
    const newPasswordSec = await bcrypt.hash(req.body.newPassword, salt);

    await user.updateOne({ password: newPasswordSec });

    //now sending token
    await user.save();
    const jwtData = {
      id: user._id,
    };
    const token = JWT.sign(jwtData, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });

    res.status(200).cookie("token", token).json({
      sucess: true,
      message: "password updated sucessfully",
      user,
      JWT_Token: token,
    });
  } catch (error) {
    res.status(400).json({
      sucess: false,
      message: "Some error occured, can not update password",
      error,
    });
  }
};

//update profile
exports.updateProfile = async (req, res, next) => {
  try {
    var newUserData;
    if (req.body.avatar) {
      const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "userImages",
        width: 150,
        crop: "scale",
      });

      newUserData = {
        name: req.body.name,
        email: req.body.email,
        avatar: {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        },
      };
    } else {
      newUserData = {
        name: req.body.name,
        email: req.body.email,
      };
    }

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
      new: true,
      runValidator: true,
      useFindAndMondify: false,
    });

    res.status(200).json({
      sucess: true,
      message: "sucessfully updated profile",
      user,
    });
  } catch (error) {
    res.status(400).json({
      sucess: false,
      message: "Some error occured, can not update profile",
      error,
    });
  }
};

//Get all users (admin)
exports.getAllUser = async (req, res, next) => {
  try {
    const user = await User.find();

    res.status(200).json({
      sucess: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      sucess: false,
      message: "Some error occured, can not fetch users",
      error,
    });
  }
};

//Get single user (admin)

exports.getSingleUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        sucess: false,
        message: `user with tis id :${req.params.id} does not exist`,
      });
      next();
    }

    res.status(200).json({
      sucess: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      sucess: false,
      message: "some error occured can not get user",
      error,
    });
  }
};

//update user role --admin
exports.updateUserRole = async (req, res, next) => {
  try {
    const newUserData = {
      role: req.body.role,
    };
    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
      new: true,
      runValidator: true,
      useFindAndMondify: false,
    });

    if (!user) {
      return res.status(404).json({
        sucess: false,
        message: "user not found",
      });
      next();
    }

    res.status(200).json({
      sucess: true,
      message: "Role Updated",
      user,
    });
  } catch (error) {
    res.status(500).json({
      sucess: false,
      message: "some error occured can not update role",
      error: error.message,
    });
  }
};

//Delete user --admin

exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        message: `user does not exist with id: ${req.params.id}`,
      });
      next();
    }
    await user.remove();
    res.status(200).json({
      sucess: true,
      message: "Deleted user sucessfully",
    });
  } catch (error) {
    res.status(500).json({
      sucess: false,
      message: "some error occured can not delete user",
      error,
    });
  }
};
