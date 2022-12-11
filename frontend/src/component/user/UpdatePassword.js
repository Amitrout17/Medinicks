import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../layout/loader/loader";
import "./updatePassword.css";
import { updateUserPassword } from "../../actions/userAction";
import { Link } from "react-router-dom";

function UpdatePassword() {
  const dispatch = useDispatch();

  const updatePasswordState = useSelector((state) => state.userProfileUpdate);

  const [oldPassword, setoldPassword] = useState("");
  const [newPassword, setnewPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");

  var updatePasswordError, loading, isUpdated;

  if (updatePasswordState) {
    updatePasswordError = updatePasswordState.error;
    loading = updatePasswordState.loading;
    isUpdated = updatePasswordState.isUpdated;
  }

  const submitUpdatePassword = () => {
    dispatch(updateUserPassword(oldPassword, newPassword, confirmPassword));
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="update_password_main">
          <div className="signup_heading">
            <div className="logo">
              <i className="fa-solid fa-mortar-pestle"></i>
              <h2>Medinicks</h2>
            </div>
          </div>
          <h3>update password</h3>
          <form onSubmit={submitUpdatePassword}>
            <div className="update_password">
              <div className="oldPassword">
                <i class="fa-solid fa-key"></i>
                <input
                  type="password"
                  placeholder="old password"
                  onChange={(e) => {
                    setoldPassword(e.target.value);
                  }}
                  required="true"
                ></input>
              </div>
              <div className="newPassword">
                <i class="fa-solid fa-unlock"></i>
                <input
                  type="password"
                  placeholder="new password"
                  onChange={(e) => {
                    setnewPassword(e.target.value);
                  }}
                  required="true"
                  minLength={5}
                ></input>
              </div>
              <div className="confirmPassword">
                <i class="fa-solid fa-lock"></i>
                <input
                  type="password"
                  placeholder="confirm password"
                  onChange={(e) => {
                    setconfirmPassword(e.target.value);
                  }}
                  required="true"
                ></input>
              </div>
              <input
                type="submit"
                submit
                style={{
                  background: "white",
                  border: "none",
                  width: "97%",
                  marginTop: "11px",
                  borderRadius: "6px",
                  textTransform:"uppercase",
                  letterSpacing:"2px",
                  height: "24px",
                  cursor:"pointer"
                }}
              ></input>
            </div>
          </form>

          {updatePasswordError ? <h5>{updatePasswordError}</h5> : ""}
          {isUpdated ? <h5>password updated</h5> : ""}
          <div className="forgetPassword_redirect_btn">
            <Link to={"/"}>
              <button>Home</button>
            </Link>
            <Link to={"/account"}>
              <button>Profile</button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

export default UpdatePassword;
