import React from "react";
import Sidebar from "./Sidebar";
import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {  useEffect } from "react";
import { allUser } from "../../actions/userAction";
import UserProfile from "./UserProfile";

function AllUsersAdmin() {
  const dispatch = useDispatch();
  const focusPoint = useRef(null);
  const secondPoint = useRef(null);

  const showSidebar = () => {
    if (focusPoint.current.style.display === "none") {
      focusPoint.current.style.display = "block";
    } else {
      focusPoint.current.style.display = "none";
      secondPoint.current.style.width = "100%";
    }
  };

  const user = useSelector((state) => state.allUsers.users);

  useEffect(() => {
    dispatch(allUser());
  }, [dispatch]);

  return (
    <>
      <div className="dashboard_main">
        <div ref={focusPoint}>
          <Sidebar />
        </div>
        <div
          className="dashboard"
          ref={secondPoint}
          style={{ height: "100vh", overflow: "scroll" }}
        >
          <h3 className="show_slide_bar1">All users</h3>
          <h3 className="show_sidebar">
            <i class="fa-solid fa-bars" onClick={showSidebar} /> All users
          </h3>
          <div className="all_user_main">
            {user && user.map((i) => <UserProfile user={i} />)}
          </div>
        </div>
      </div>
    </>
  );
}

export default AllUsersAdmin;
