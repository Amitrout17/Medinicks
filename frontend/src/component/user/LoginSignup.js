import React, { Fragment, useRef, useEffect, useState } from "react";
import "./loginSignup.css";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, signupUser } from "../../actions/userAction";
import Loader from "../layout/loader/loader";
import { useNavigate } from "react-router";
import {Link} from 'react-router-dom'

function LoginSignUp() {
  let navigate = useNavigate();

  const one = useRef(0);
  const two = useRef(0);
  const signup = useRef(0);
  const login = useRef(0);

  const [loginEmail, setloginEmail] = useState("");
  const [loginPassword, setloginPassword] = useState("");
  const [userName, setname] = useState("");
  const [userEmail, setemail] = useState("");
  const [userPassword, setpassword] = useState("");
  const [avatar, setavatar] = useState("/Profile.png");
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

  const loginClick = () => {
    one.current.style.backgroundColor = "white";
    two.current.style.backgroundColor = "";
    signup.current.style.display = "none";
    login.current.style.display = "flex";
  };

  const signupClick = () => {
    one.current.style.backgroundColor = "";
    two.current.style.backgroundColor = "white";
    login.current.style.display = "none";
    signup.current.style.display = "flex";
  };

  const dispatch = useDispatch();

  const loginError = useSelector((state) => state.userReducerLogin.error);
  const loading = useSelector((state) => state.userReducerLogin.loading);
  const isAuthenticated = useSelector(
    (state) => state.userReducerLogin.isAuthenticated
  );

  const signupLoading = useSelector((state) => state.userReducerSignup.loading);
  const isAuthenticatedSignup = useSelector(
    (state) => state.userReducerSignup.isAuthenticated
  );
  const statusCode = useSelector((state) => state.userReducerSignup.error);

  const isAuthenticatedLoadUser = useSelector(
    (state) => state.loadUserReducer.isAuthenticated
  );

  const LoginSubmit = async (event) => {
    event.preventDefault();
    dispatch(loginUser(loginEmail, loginPassword));
  };

  const signupSubmit = (event) => {
    event.preventDefault();
    dispatch(signupUser(userName, userEmail, userPassword, avatar));
  };

  useEffect(() => {
    one.current.style.backgroundColor = "white";
    signup.current.style.display = "none";
  }, []);

  useEffect(() => {
    if (isAuthenticated || isAuthenticatedLoadUser || isAuthenticatedSignup) {
      navigate("/account");
    }
  }, [
    isAuthenticated,
    navigate,
    isAuthenticatedLoadUser,
    isAuthenticatedSignup,
  ]);

  return (
    <Fragment>
      {loading || signupLoading ? (
        <Loader />
      ) : (
        <div className="login_signup">
          <div className="signup_heading">
            <div className="logo">
              <i className="fa-solid fa-mortar-pestle"></i>
              <h2>Medinicks</h2>
            </div>
          </div>
          <div className="options">
            <p onClick={loginClick} ref={one} className="loginP">
              login
            </p>
            <p onClick={signupClick} ref={two}>
              Signup
            </p>
          </div>
          <div className="login" ref={login}>
            <div className="email">
              <i class="fa-solid fa-envelope"></i>
              <input
                type="text"
                placeholder="Email"
                value={loginEmail}
                onChange={(event) => {
                  setloginEmail(event.target.value);
                }}
              ></input>
            </div>
            <div className="password">
              <i class="fa-solid fa-lock"></i>
              <input
                type="password"
                placeholder="Password"
                value={loginPassword}
                onChange={(e) => {
                  setloginPassword(e.target.value);
                }}
              ></input>
            </div>
            <Link to={"/password/forgot"}>
              <p>forgot password</p>
            </Link>
            <button onClick={LoginSubmit}>
              <p>login</p>
            </button>
            {loginError ? <h5>{loginError}</h5> : ""}
          </div>
          <form onSubmit={signupSubmit}>
            <div className="signup" ref={signup}>
              <div className="signup_name">
                <i class="fa-solid fa-circle-user"></i>
                <input
                  type="text"
                  placeholder="Name"
                  value={userName}
                  onChange={(event) => {
                    setname(event.target.value);
                  }}
                  name="name"
                  required="true"
                  minLength={5}
                ></input>
              </div>
              <div className="signup_email">
                <i class="fa-solid fa-envelope"></i>
                <input
                  type="email"
                  placeholder="Email"
                  value={userEmail}
                  onChange={(event) => {
                    setemail(event.target.value);
                  }}
                  name="email"
                  required="true"
                ></input>
              </div>
              <div className="signup_password">
                <i class="fa-solid fa-lock"></i>
                <input
                  type="password"
                  placeholder="Password"
                  value={userPassword}
                  onChange={(event) => {
                    setpassword(event.target.value);
                  }}
                  name="password"
                  required="true"
                  minLength={6}
                ></input>
              </div>
              <div className="signup_img">
                <img src={avatarPreview} alt="Avatar Preview" />
                <label class="custom-file-upload" name="file">
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={(event) => {
                      const file = new FileReader();
                      file.onload = () => {
                        if (file.readyState === 2) {
                          setAvatarPreview(file.result);
                          setavatar(file.result);
                        }
                      };
                      //read file as a url so the result will be in form of a url
                      file.readAsDataURL(event.target.files[0]);
                    }}
                    required="true"
                  />
                </label>
              </div>
              <input type="submit" submit className="submit_input" />
            </div>
          </form>
          <div className="signup_error">
            {statusCode ? (
              statusCode.response.status === 413 ? (
                <h5>
                  profile pic size should be less than 2mb<br></br> please
                  signup again
                </h5>
              ) : (
                ""
              )
            ) : (
              ""
            )}
          </div>
        </div>
      )}
    </Fragment>
  );
}
export default LoginSignUp;
