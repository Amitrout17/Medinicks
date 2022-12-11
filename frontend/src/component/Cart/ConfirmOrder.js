import React from "react";
import "./confirmOrder.css";
import { useSelector } from "react-redux";
import YourCartitems from "./YourCartItems";
import { useNavigate } from "react-router-dom";
function ConfirmOrder() {
  const navigate=useNavigate();
  const name = useSelector((state) => state.cart.shippingInfo.name);
  const number = useSelector((state) => state.cart.shippingInfo.phoneNo);
  const street = useSelector((state) => state.cart.shippingInfo.address);
  const city = useSelector((state) => state.cart.shippingInfo.city);
  const pinCode = useSelector((state) => state.cart.shippingInfo.pinCode);
  //pricing details
  const item = useSelector((state) => state.cart.cartItems);
  var finalPrice = 0;
  var productCount = 0;
  var shippingCharges = 50;
  item.map((i) => (finalPrice += i.price * i.quantity));
  item.map((i) => (productCount += i.quantity));
  if (finalPrice > 500) {
    shippingCharges = 0;
  }
  const discount = Math.round(finalPrice / 10);
  const totalAmount = Math.round(finalPrice + shippingCharges - discount);
  //pricing details close
  const addrerss = street + " " + city + " Odisha India " + pinCode;
  const continueShopping=()=>{
    navigate("/")
  }
  const amount={
    "totalAmount":totalAmount
  }
  const payment=()=>{
    
    navigate("/payment")
    sessionStorage.setItem("totalAmount",JSON.stringify(amount))
  }
  return (
    <>
      <div className="confirmOrder_main">
        <div className="shipping_info">
          <h3>Shipping Info</h3>
          <div className="shipping_info_details">
            <div className="shipping_info_name">
              <h5>name :</h5>
              <p>{name}</p>
            </div>
            <div className="shipping_info_number">
              <h5>Phone No : </h5>
              <p>{number}</p>
            </div>
            <div className="shipping_info_address">
              <h5>Address :</h5>
              <p>{addrerss.slice(0,48)}...</p>
            </div>
            <div className="shipping_details_total_amount">
              <h5>Total Amout :</h5>
              <p>₹{totalAmount}</p>
            </div>
            <div className="shpping_details_confirm_button">
                <button onClick={payment}>proceed to payment</button>
                <button onClick={continueShopping}>Continue shopping</button>
            </div>
          </div>
        </div>
        <div className="your_cart">
          <h3>Your cart item</h3>
          <div className="cart_component_main_shipping">
            <div>
              {item.map((i) => (
                <YourCartitems item={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ConfirmOrder;
