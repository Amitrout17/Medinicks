const express = require("express");
const {
  regiserUser,
  loginUser,
  logout,
  forgetPassword,
  resetPassword,
  getUserDetails,
  updateUserPassword,
  updateProfile,
  getAllUser,
  getSingleUser,
  updateUserRole,
  deleteUser,
} = require("../controllers/userController");
const router = express.Router();

const isAuthenticated = require("../middleware/auth");
const authrole = require("../middleware/authRole");

router.route("/register").post(regiserUser);

router.route("/loginUser").post(loginUser);

router.route("/logout").get(logout);

router.route("/password/forgot").post(forgetPassword);

router.route("/password/reset/:token").put(resetPassword);

router.route("/me").get(isAuthenticated, getUserDetails);

router.route("/password/update").put(isAuthenticated, updateUserPassword);

router.route("/me/update").put(isAuthenticated, updateProfile);

router.route("/admin/users").get(isAuthenticated, authrole, getAllUser);

router
  .route("/admin/users/:id")
  .get(isAuthenticated, authrole, getSingleUser)
  .put(isAuthenticated, authrole, updateUserRole)
  .delete(isAuthenticated, authrole, deleteUser);

module.exports = router;
