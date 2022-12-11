import React from "react";
import "./SingleOrders.css";
import { useNavigate } from "react-router-dom";
function SingleOrders({ order }) {
  const navigate = useNavigate();
  const orderDate = order.createdAt.slice(0, 10);
  const price = order.totalPrice;
  const orderItems = order.orderItems;
  const orderStatus = order.orderStatus;
  const orderId = order._id;

  const viewOrder = () => {
    navigate(`/orders/${orderId}`);
  };

  return (
    <>
      <div className="single_order_main">
        <div className="single_order_header">
          <h4>Order #{orderId}</h4>
          <h4>order placed on {orderDate}</h4>
          <h4 className="order_status">{orderStatus}</h4>
          <button onClick={viewOrder}>view Order</button>
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
    </>
  );
}

export default SingleOrders;
