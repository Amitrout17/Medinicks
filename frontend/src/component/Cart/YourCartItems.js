import React from "react";
import "./yourCartItems.css";

function YourCartItems({ item }) {
  const price = item.price * item.quantity;
  return (
    <>
      <div className="your_Cart_items">
        <div className="your_cart_item_image">
          <img src={item.image} alt="" />
        </div>
        <div className="your_cart_item_details">
          <h5>{item.name}</h5>
          <h5>quantity : {item.quantity}</h5>
          <h5>Total Price : ₹{price}</h5>
        </div>
      </div>
    </>
  );
}

export default YourCartItems;
