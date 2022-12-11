import React from "react";
import "./UserProfile.css";
import { useRef } from "react";
import { useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function UserProfile({ user }) {
  const focusPoint = useRef(null);
  const secondPoint = useRef(null);
  const role = user.role;

  const changeRole = async (e) => {
    var role = e.target.innerHTML;
    try {
      const { data } = await axios.put(`/api/v1/admin/users/${user._id}`, {
        role,
      });

      toast.success("Role Updated Successfully", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } catch (error) {
      toast.success("some error occured", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  const DeleteUser =async () => {
    try {
     await axios.delete(`/api/v1/admin/users/${user._id}`)
     window.location.reload();
    } catch (error) {
      toast.error(error.response.data.message, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  useEffect(() => {
    if (role === "admin") {
      focusPoint.current.style.backgroundColor = "#0a1727";
      focusPoint.current.style.color = "white";
    } else {
      secondPoint.current.style.backgroundColor = "#0a1727";
      secondPoint.current.style.color = "white";
    }
  }, [role]);

  return (
    <>
      <div className="userProfile_main">
        <div className="user_image">
          <img src={user.avatar.url} alt="" />
        </div>
        <div className="user_data">
          <p>User Name: {user.name}</p>
          <p>Joining date: {user.createdAt.slice(0, 10)}</p>

          <div className="update_role_button">
            <button ref={secondPoint} onClick={changeRole}>
              user
            </button>
            <button ref={focusPoint} onClick={changeRole}>
              admin
            </button>
            <i class="fa-solid fa-trash" onClick={DeleteUser}></i>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default UserProfile;
