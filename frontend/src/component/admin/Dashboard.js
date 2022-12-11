import React from "react";
import Sidebar from "./Sidebar";
import "./dashboard.css";
import { Doughnut, Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { useEffect } from "react";
import { allOrdersDetails } from "../../actions/orderAction";
import { allUser } from "../../actions/userAction";
import { getAllProducts } from "../../actions/productAction";
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
function Dashboard() {
  const dispatch = useDispatch();
  const focusPoint = useRef(null);
  const secondPoint = useRef(null);

  //Redux data starts ------------------------------------------------------------------------------

  const userReducer = useSelector((state) => state.allUsers);
  var totalUsers;
  if (userReducer) {
    if (userReducer.users) {
      totalUsers = userReducer.users.length;
    }
  }

  const productReducer = useSelector((state) => state.allProducts);
  var totalProducts,
    outOfStock = 0;
  if (productReducer) {
    if (productReducer.products) {
      totalProducts = productReducer.products.products.length;
      const products = productReducer.products.products;
      products.map((i) => {
        if (i.Stock === 0) {
          outOfStock++;
        }
      });
    }
  }

  const orderReducer = useSelector((state) => state.allOrders);
  var totalOrders, totalAmount;
  if (orderReducer) {
    if (orderReducer.orders) {
      totalOrders = orderReducer.orders.order.length;
      totalAmount = orderReducer.orders.Total_price;
    }
  }
  //Redux section ends------------------------------------------------------------------------------

  //graph section starts ---------------------------------------------------------------------------
  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["#8862e0"],
        hoverBackgroundColor: ["#8862e0"],
        data: [0, totalAmount],
      },
    ],
  };
  const doughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#2196f3", "#ffaf00"],
        data: [outOfStock, totalProducts - outOfStock],
      },
    ],
  };
  //graph section ends ------------------------------------------------------------------------------

  useEffect(() => {
    dispatch(allOrdersDetails());
    dispatch(getAllProducts());
    dispatch(allUser());
  }, [dispatch]);

  const showSidebar = () => {
    if (focusPoint.current.style.display === "none") {
      focusPoint.current.style.display = "block";
    } else {
      focusPoint.current.style.display = "none";
      secondPoint.current.style.width = "100%";
    }
  };

  return (
    <>
      <div className="dashboard_main">
        <div ref={focusPoint}>
          <Sidebar />
        </div>
        <div className="dashboard" ref={secondPoint}>
          <h3 className="show_slide_bar1">dashboard</h3>
          <h3 className="show_sidebar">
            <i class="fa-solid fa-bars" onClick={showSidebar} /> dashbord
          </h3>
          <div className="dashbord_data">
            <div className="dashboard_total_amount">
              <div>
                <h5>Total income</h5>
                <p>₹ {totalAmount}</p>
              </div>
              <i class="fa-solid fa-dollar-sign"></i>
            </div>
            <div className="dashbord_total_poduct">
              <div>
                <h5>total products</h5>
                <p>{totalProducts}</p>
              </div>
              <i class="fa-solid fa-boxes-stacked"></i>
            </div>
            <div className="dashbord_total_user">
              <div>
                <h5>total user</h5>
                <p>{totalUsers}</p>
              </div>
              <i class="fa-solid fa-person"></i>
            </div>
            <div className="total_orders">
              <div>
                <h5>total orders</h5>
                <p>{totalOrders}</p>
              </div>
              <i class="fa-solid fa-bag-shopping"></i>
            </div>
          </div>
          <div className="dashboard_amount_earned_graph">
            <Line data={lineState} />
          </div>
          <h3>product stocks</h3>
          <div className="dashbord_donugh">
            <Doughnut data={doughnutState} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
