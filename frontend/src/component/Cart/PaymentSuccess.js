import React from "react";
import "./PaymentSucess.css";
import { Link } from "react-router-dom";
import {useDispatch} from "react-redux"
import { myOrder } from "../../actions/orderAction";
export default function PaymentSuccess() {
  const dispatch=useDispatch();
  const viewOrder=()=>{
    dispatch(myOrder());
  }
  return (
    <div className="payment_sucess_main">
      <div class="success-animation">
        <svg
          class="checkmark"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 52 52"
        >
          <circle
            class="checkmark__circle"
            cx="26"
            cy="26"
            r="25"
            fill="none"
          />
          <path
            class="checkmark__check"
            fill="none"
            d="M14.1 27.2l7.1 7.2 16.7-16.8"
          />
        </svg>
      </div>
      <h1>Order placed sucessfully</h1>
      <div class="contanier_animation">
        <div class="main_animation">
          <div class="road_animation">
            <ul className="ul_animation">
              <li className="li_animation"></li>
              <li className="li_animation"></li>
              <li className="li_animation"></li>
              <li className="li_animation"></li>
              <li className="li_animation"></li>
              <li className="li_animation"></li>
              <li className="li_animation"></li>
              <li className="li_animation"></li>
              <li className="li_animation"></li>
              <li className="li_animation"></li>
              <li className="li_animation"></li>
            </ul>
            <div class="bus_animation">
              <div class="back_animation">
                <div class="back1door_animation"></div>
                <div class="back2door_animation"></div>
                <div class="join_animation"></div>
              </div>
              <div class="front_animation">
                <div class="black_animation"></div>
                <div class="light1_animation"></div>
                <div class="light2_animation"></div>
              </div>
            </div>
            <div class="gift_animation"></div>
          </div>
        </div>
      </div>
      <Link to={"/orders"}>
        <button onClick={viewOrder}>view Order</button>
      </Link>
    </div>
  );
}
