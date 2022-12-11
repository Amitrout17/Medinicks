import React from "react";
import { useSelector } from "react-redux";
import "./cart.css";
import CartItem from "./CartItem";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Cart() {
  const navigate = useNavigate();
  const item = useSelector((state) => state.cart.cartItems);
  const user = useSelector((state) => state.loadUserReducer);
  var isAuthenticated;
  if (user) {
    isAuthenticated = user.isAuthenticated;
  }
  console.log(user);
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

  const checkout = () => {
    if (isAuthenticated) {
      navigate("/shipping");
    } else {
      toast.error("Please Login First", {
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

  return (
    <>
      <div className="cart_heading_1">
        <p>product</p>
        <p>quantity</p>
        <p>remove</p>
        <p className="cart_heading_1_price">price</p>
        <p>price details</p>
      </div>
      <div className="cart_heading_2">
        <p>my cart</p>
      </div>
      <div className="cart_component_and_pricing">
        <div className="cart_component_main">
          <div>
            {item.reverse().map((i) => (
              <CartItem item={i} />
            ))}
          </div>
        </div>
        <div className="cart_total_price">
          <div className="total_items">
            <p>total items </p>
            <p>{productCount}</p>
          </div>
          <div className="total_price_101">
            <p>total Price </p>
            <p>₹{finalPrice}</p>
          </div>
          <div className="discount">
            <p>discount </p>
            <p className="discount_price">- ₹{discount}</p>
          </div>
          <div className="dilevry_charges">
            <p>Delivery Charges </p>
            <p>₹ {shippingCharges}</p>
          </div>
          <div className="hr"></div>
          <div className="final_price">
            <p>Total Amount </p>
            <p>₹{totalAmount}</p>
          </div>
          <div className="checkout_button">
            <Link to={"/"}>
              <button>continue shopping</button>
            </Link>
            <button onClick={checkout}>checkout</button>
          </div>
        </div>
      </div>
      <div className="cart_total_price_2">
        <div className="total_items">
          <p>total items </p>
          <p>{productCount}</p>
        </div>
        <div className="total_price_101">
          <p>total Price </p>
          <p>₹{finalPrice}</p>
        </div>
        <div className="discount">
          <p>discount </p>
          <p className="discount_price">- ₹{discount}</p>
        </div>
        <div className="dilevry_charges">
          <p>Delivery Charges </p>
          <p>₹ {shippingCharges}</p>
        </div>
        <div className="hr"></div>
        <div className="final_price">
          <p>Total Amount </p>
          <p>₹{totalAmount}</p>
        </div>
        <div className="checkout_button">
          <Link to={"/"}>
            <button>continue shopping</button>
          </Link>
          <button onClick={checkout}>checkout</button>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default Cart;
