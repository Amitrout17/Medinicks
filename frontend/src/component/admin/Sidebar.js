import React from "react";
import { Link } from "react-router-dom";
function Sidebar() {
  return (
    <>
      <div className="sidebar_main">
        <Link to={"/"}>
          <div className="logo">
            <i className="fa-solid fa-mortar-pestle"></i>
            <h2>Medinicks</h2>
          </div>
        </Link>
        <ul>
          <Link to={"/admin/dashbord"}>
            <li>
              <i
                class="fa-solid fa-list"
                style={{
                  paddingRight: "5px",
                }}
              ></i>{" "}
              Dashboard
            </li>
          </Link>
          <li>
            products <i class="fa-solid fa-caret-down"></i>
            <ul
              className="slidebar_products"
              style={{
                paddingLeft: "30px",
              }}
            >
              <Link to={"/admin/products/newProduct"}>
                <li
                  style={{
                    listStyleType: "circle",
                  }}
                >
                  <i
                    class="fa-solid fa-plus"
                    style={{
                      paddingRight: "5px",
                    }}
                  ></i>
                  create
                </li>
              </Link>

              <Link to={"/admin/products"}>
                <li
                  style={{
                    listStyleType: "circle",
                  }}
                >
                  <i
                    class="fa-solid fa-eye"
                    style={{
                      paddingRight: "5px",
                    }}
                  ></i>
                  view All
                </li>
              </Link>
            </ul>
          </li>
          <Link to={"/admin/users"}>
            <li>
              <i
                class="fa-solid fa-user"
                style={{
                  paddingRight: "5px",
                }}
              ></i>
              users
            </li>
          </Link>
          <Link to={"/admin/reviews"}>
            <li>
              <i
                class="fa-solid fa-pen-to-square"
                style={{
                  paddingRight: "5px",
                }}
              ></i>
              Reviews
            </li>
          </Link>

          <Link to={"/admin/orders"}>
            <li>
              <i
                class="fa-solid fa-cart-shopping"
                style={{
                  paddingRight: "5px",
                }}
              ></i>
              Orders
            </li>
          </Link>
        </ul>
      </div>
    </>
  );
}

export default Sidebar;
