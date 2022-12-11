import React from "react";
import { useState } from "react";
import ".//profileUpdate.css";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile, loadUser } from "../../actions/userAction";
import { useNavigate } from "react-router";
import Loader from "../layout/loader/loader";

function ProfileUpdate() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loading = useSelector((state) => state.userProfileUpdate.loading);

  const user = useSelector((state) => state.loadUserReducer.user);

  var image,name,email;
  if (user) {
    if (user.user) {
      name=user.user.name;
      email=user.user.email;
      if (user.user.avatar) {
        image = user.user.avatar.url;
      }
    }
  }

  const [updateName, setupdateName] = useState(name);
  const [updateEmail, setupdateEmail] = useState(email);
  const [avatarPreview, setAvatarPreview] = useState(image);
  const [avatar, setavatar] = useState(image);

  const submitUpdate = async () => {
    await dispatch(updateProfile(updateName, updateEmail, avatar));
    dispatch(loadUser());
    navigate("/account");
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="update_profile_main">
          <div className="signup_heading">
            <div className="logo">
              <i className="fa-solid fa-mortar-pestle"></i>
              <h2>Medinicks</h2>
            </div>
          </div>
          <div className="update_profile">
            <h3>update profile</h3>
            <div className="update_name">
              <i class="fa-solid fa-circle-user"></i>
              <input
                type="text"
                placeholder="Name"
                value={updateName}
                onChange={(e) => {
                  setupdateName(e.target.value);
                }}
              ></input>
            </div>
            <div className="update_email">
              <i class="fa-solid fa-envelope"></i>
              <input
                type="Email"
                placeholder="Email"
                value={updateEmail}
                onChange={(e) => {
                  setupdateEmail(e.target.value);
                }}
              ></input>
            </div>
            <div className="signup_img update_useImage">
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
            <div className="update_confirm_btn">
              <button onClick={submitUpdate}>update</button>
            </div>
          </div>
          
        </div>
      )}
    </>
  );
}

export default ProfileUpdate;
