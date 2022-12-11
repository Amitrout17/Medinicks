import React from "react";
import { useSelector,useDispatch } from "react-redux";
import "./Shipping.css";
import { useState } from "react";
import { saveShippingInfo } from "../../actions/cartAction";
import {useNavigate} from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Shipping() {
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

  const dispatch=useDispatch()
  const navigate=useNavigate()

  const [name, setName] = useState("");
  const [phoneNo, setphoneNo] = useState("");
  const [address, setaddress] = useState("");
  const [city, setcity] = useState("");
  const [pinCode, setpinCode] = useState("");
  const [state, setstate] = useState("Odisha")
  const [country, setcountry] = useState("India")

  const shippingClick=()=>{
    if(name.length===0 || phoneNo.length===0 || city.length===0 || address.length===0 || pinCode.length===0){
      toast.error('Missing Address Details', {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored"
        });
    }else
    if(phoneNo.length!==10 || isNaN(phoneNo)){
      toast.error('Invalid Phone No', {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored"
        });
    }else if(pinCode.length!==6 || isNaN(pinCode)){
      toast.error('Invalid Pin Code', {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored"
        });
    }
    else{
      dispatch(saveShippingInfo({name,phoneNo,address,city,pinCode,state,country}))
      navigate("/confirmOrder")  
    }
  }

  return (
    <>
      <div className="shipping_main">
        <div className="shipping_address">
          <div className="shipping_address_heading">
            <p>Delivery address</p>
          </div>
          <div className="shipping_address_form">
            <div className="name_number">
              <div className="name">
                <i class="fa-solid fa-user"></i>
                <input
                  type="text"
                  placeholder="Name"
                  onChange={(event) => {
                    setName(event.target.value);
                  }}
                />
              </div>
              <div className="number">
                <i class="fa-sharp fa-solid fa-phone"></i>
                <input
                  type="numbers"
                  placeholder="Phone Number"
                  onChange={(event) => {
                    setphoneNo(event.target.value);
                  }}
                />
              </div>
            </div>
            <div className="address">
              <i class="fa-solid fa-map-location-dot"></i>
              <input
                type="text"
                placeholder="Address"
                onChange={(event) => {
                  setaddress(event.target.value);
                }}
              />
            </div>
            <div className="city_pincode">
              <div className="city">
                <i class="fa-solid fa-city"></i>
                <input
                  type="text"
                  placeholder="City"
                  onChange={(event) => {
                    setcity(event.target.value);
                  }}
                />
              </div>
              <div className="pincode">
                <i class="fa-solid fa-location-pin"></i>
                <input
                  type="numbers"
                  placeholder="Pin Code"
                  onChange={(event) => {
                    setpinCode(event.target.value);
                  }}
                />
              </div>
            </div>
            <div className="state_country">
              <div className="country">
                <i class="fa-solid fa-globe"></i>
                <input type="text" value="india" />
              </div>
              <div className="state">
                <i class="fa-solid fa-map"></i>{" "}
                <input type="text" value="Odisha" />
              </div>
            </div>
          </div>
        </div>
        <div className="cart_total_price cart_total_price_shipping">
          <h6>Price Details</h6>
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
            <button onClick={shippingClick} className="checkout_button_continue">continue</button>
          </div>
        </div>
      </div>
      <ToastContainer/>
    </>
  );
}

export default Shipping;
