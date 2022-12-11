import React from "react";
import SingleOrders from "../Orders/SingleOrders";
import { useEffect } from "react";
import { allOrdersDetails } from "../../actions/orderAction";
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import Sidebar from "./Sidebar";
import IndividualOrder from "./IndividualOrder";
import "./OrderList.css"
function OrderList() {
  const focusPoint = useRef(null);
  const secondPoint = useRef(null);

  const dispatch = useDispatch();

  const orderReducer = useSelector((state) => state.allOrders);
  var order, totalAmount;
  if (orderReducer) {
    if (orderReducer.orders) {
      order = orderReducer.orders.order;
      totalAmount = orderReducer.orders.Total_price;
    }
  }

  useEffect(() => {
    dispatch(allOrdersDetails());
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
        <div ref={focusPoint} style={{ zindex: "5" }}>
          <Sidebar />
        </div>
        <div className="dashboard" ref={secondPoint} style={{ height: "100%" }}>
          <h3 className="show_slide_bar1" style={{ zindex: "5" }}>Orders List</h3>
          <h3 className="show_sidebar" style={{ zindex: "5" }}>
            <i class="fa-solid fa-bars" onClick={showSidebar} /> Order List
          </h3>
          <div className="order_list">
            {order && order.map((i) => <IndividualOrder order={i} />)}
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderList;
