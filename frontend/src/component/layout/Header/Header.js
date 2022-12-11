import React from "react";
import "./style.css";
import "./media.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../../actions/userAction";
import { clearUserData } from "../../../actions/userAction";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MyOrders from "../../Orders/MyOrders";

export default function Header({ user }) {
  const dispatch=useDispatch()
  const [key, setKey] = useState("");
  function changeKey(event) {
    setKey(event.target.value);
  }

  //initializing url such that if product without anything is searched then it should go to home page
  const url = key ? `/products/${key}` : "/";
  var userName, userRole;

  if (user) {
    if (user.user) {
      userName = user.user.name;
      userRole = user.user.role;
    }
  }
  const logoutUser=()=>{
    dispatch(logout())
    dispatch(clearUserData())
    toast.success("Logout Sucessfully", {
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
  return (
    <>
      <div className="Navbar">
        <Link to={"/"}>
          <div className="logo">
            <i className="fa-solid fa-mortar-pestle"></i>
            <h2>Medinicks</h2>
          </div>
        </Link>
        <div className="searchbar">
          <form action="">
            <input
              type="text"
              placeholder="  Search Products....."
              value={key}
              onChange={changeKey}
            />
            <Link to={url}>
              <button>
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
            </Link>
          </form>
        </div>
        <div className="login_cart_cc">
          <ul>
            <li>
              <div className="dropdown">
                <button className="dropbtn">
                  <Link to={userName ? "" : "/loginSignup"}>
                    <i className="fa-solid fa-user-plus"></i>
                    <p>{userName ? userName : "Login/Signup"}</p>
                  </Link>
                </button>
                {userName ? (
                  <div className="dropdown-content">
                    <Link to={"/account"}>Profile</Link>
                    <Link to={"/"} onClick={logoutUser}>Logout</Link>
                    <Link to={"/orders"} onClick={()=>{<MyOrders/>}}>Orders</Link>
                    {userRole === "admin" ? (
                      <Link to={"/admin/dashbord"}>Dashboard</Link>
                    ) : (
                      ""
                    )}
                  </div>
                ) : (
                  ""
                )}
              </div>
            </li>
            <li>
              <Link to={"/cart"}>
                <i className="fa-solid fa-cart-shopping"></i>
                <p>Cart</p>
              </Link>
            </li>
            <li>
              <Link to={"/cc"}>
                <i className="fa-solid fa-headset"></i>
                <p>Customer Support</p>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <ToastContainer/>
    </>
  );
}
