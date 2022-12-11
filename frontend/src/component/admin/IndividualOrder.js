import React from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
function IndividualOrder({ order }) {
  const [status, setStatus] = useState(order.orderStatus);
  const orderDate = order.createdAt.slice(0, 10);
  const price = order.totalPrice;
  const orderItems = order.orderItems;
  const orderId = order._id;

  const changeStatus = async (e) => {
    const status = e.target.value;
    if (status === "Delete") {
      try {
        const { data } = await axios.delete(`/api/v1/admin/orders/${orderId}`);
        toast.success(data.message, {
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
    } else {
      try {
        const { data } = await axios.put(`/api/v1/admin/orders/${orderId}`, {
          status,
        });
        setStatus(e.target.value);
        toast.success(data.message, {
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
    }
  };

  return (
    <>
      <div className="single_order_main">
        <div className="single_order_header">
          <h4>Order #{orderId}</h4>
          <h4>order placed on {orderDate}</h4>
          <h4 className="order_status">{status}</h4>
          <label for="cars">Edit Dilevery status:</label>
          <select name="cars" id="cars" onChange={changeStatus}>
            <option value="Processing">Processing</option>
            <option value="shipped">shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Delete">Delete</option>
          </select>
        </div>
        <div className="single_order_hr"></div>
        <div className="single_order_item_main">
          {orderItems.map((i) => (
            <div className="single_order_items">
              <img src={i.image} alt="" />
              <h5>
                {i.name.slice(0, 15)} {i.name.length > 15 ? "..." : ""}
              </h5>
              <h5 className="single_order_id">ID :#{i.product}</h5>
              <h5>Quantity: {i.quantity}</h5>
              <h5>₹{i.price}</h5>
            </div>
          ))}
        </div>

        <div className="single_order_hr"></div>
        <h4 className="single_order_total_price">Total pice :₹{price}</h4>
      </div>
      <ToastContainer />
    </>
  );
}

export default IndividualOrder;
