import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "../../actions/userAction";
import { Link } from "react-router-dom";
import "./Profile.css";
import Loader from "../layout/loader/loader";
import { logout, clearUserData } from "../../actions/userAction";
import { useNavigate } from "react-router-dom";

function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.loadUserReducer.user);
  const loading = useSelector((state) => state.loadUserReducer.loading);
  const userProfile = useSelector((state) => state.userProfileUpdate);
  var statusCode;
  if (userProfile) {
    statusCode = userProfile.state;
  }
  const password = useSelector((state) => state.userProfileUpdate);
  var userName, userEmail, image, joiningDate;

  if (user) {
    if (user.user) {
      userName = user.user.name;
      userEmail = user.user.email;
      joiningDate = user.user.createdAt;
      if (user.user.avatar) {
        image = user.user.avatar.url;
      }
    }
  }

  const userLogout = () => {
    dispatch(logout());
    dispatch(clearUserData());
    navigate("/");
  };

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);
  var message;
  if (password) {
    if (password.isUpdated) {
      message = password.isUpdated.message;
    }
  }
  return (
    <>
      {loading ? (
        <Loader />
      ) : userEmail ? (
        <div className="myprofile">
          <div className="profile_right">
            <div className="signup_heading">
              <div
                className="logo"
                style={{
                  marginBottom: "30px",
                }}
              >
                <i className="fa-solid fa-mortar-pestle"></i>
                <h2
                  className="profile_logo_name"
                  style={{
                    textTransform: "capitalize",
                    fontWeight: "600",
                    textDecoration: "none",
                  }}
                >
                  Medinicks
                </h2>
              </div>
            </div>
            <div className="profile_name">
              <h2>Name</h2>
              <h3>{userName}</h3>
            </div>
            <div className="profile_email">
              <h2>Email</h2>
              <h3>{userEmail}</h3>
              <h2>Joined At</h2>
              <h3>{joiningDate.substr(0, 10)}</h3>
            </div>
            <div className="myorders_password">
              <Link to={"/orders"}>
                <button className="myorders">myorders</button>
              </Link>
              <Link to={"/password/update"}>
                <button className="change_password">change password</button>
              </Link>
            </div>
          </div>
          <div className="profile_left">
            <h2>my profile</h2>
            <div className="profile_img">
              <img src={image} alt="" />
            </div>
            <Link to={"/me/update"}>
              <button>Edit profile</button>
            </Link>
            <Link to={"/"}>
              <button>Go to home</button>
            </Link>
            <button onClick={userLogout}>logout</button>
          </div>
          <div className="signup_error">
            {statusCode ? (
              statusCode.response.status === 413 ? (
                <h5>
                  profile pic size should be less than 70kb<br></br> can not
                  update, try again
                </h5>
              ) : (
                <h5>
                  user already registered <br /> Plz signup with a different
                  email
                </h5>
              )
            ) : (
              ""
            )}
          </div>
        </div>
      ) : (
        <>
          <h2 className="loginFailMessage">
            plz login or signup to acess this page
          </h2>
          <div className="login_fail_message_button">
            <Link to={"/"}>
              <button>go to home</button>
            </Link>
            <Link to={"/loginSignup"}>
              <button>Login/Signup</button>
            </Link>
          </div>
        </>
      )}
    </>
  );
}

export default Profile;
