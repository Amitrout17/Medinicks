import React, { useRef } from "react";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import "./Payment.css";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import EventIcon from "@material-ui/icons/Event";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createOrder } from "../../actions/orderAction";
import { useDispatch, useSelector } from "react-redux";

function Payment() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const stripe = useStripe();

  //cart items in state
  const cartItems = useSelector((state) => state.cart.cartItems);

  //for tracking your order

  const orderProducts = [{}];

  cartItems.map((i) => {
    const obj = {
      product: i.product_id,
      name: i.name,
      price: i.price,
      quantity: i.quantity,
      image: i.image,
    };
    orderProducts.push(obj);
  });

  orderProducts.shift();

  const amount =
    JSON.parse(sessionStorage.getItem("totalAmount")).totalAmount * 100;
  const deliveryCharges = amount > 500 ? 0 : 50;
  const shippingInfo = JSON.parse(localStorage.getItem("shippingInfo"));
  const elements = useElements();
  const payBtn = useRef(null);
  const { user } = useSelector((state) => state.loadUserReducer);
  var userEmail;
  if (user) {
    if (user.user) {
      userEmail = user.user.email;
    }
  }

  //payment

  async function submitHandler(e) {
    e.preventDefault();
    payBtn.current.disabled = true;
    toast.info(
      "Please wait while processing your payment, Don't close or refresh this page.",
      {
        position: "top-center",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      }
    );
    try {
      const { data } = await axios.post("/api/v1/payment/process", { amount });
      console.log(data);
      if (data.sucess === false) {
        toast.error("Some Error Occured", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
      const client_secret = data.client_secret;
      if (!stripe || !elements) {
        return;
      } //to wait untill stripe loads up

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            email: userEmail,
            name: shippingInfo.name,
            phone: shippingInfo.phoneNo,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pinCode,
              country: "IN",
            },
          },
        },
      });

      if (result.error) {
        payBtn.current.disabled = false;
        toast.error(result.error.message, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else {
        if (result.paymentIntent.status === "succeeded") {
          //order data for making a order
          const order = {
            itemPrice: amount / 100 - deliveryCharges,
            texPrice: (amount * 18) / 118,
            shippingPrice: deliveryCharges,
            totalPrice: amount / 100,
            orderItems: orderProducts,
            paymentInfo: {
              id: result.paymentIntent.id,
              status: result.paymentIntent.status,
            },
            shippingInfo: {
              address: shippingInfo.address,
              city: shippingInfo.city,
              state: "Odisha",
              country: "India",
              pinCode: shippingInfo.pinCode,
              phoneNo: shippingInfo.phoneNo,
            },
          };
          dispatch(createOrder(order));
          navigate("/payment/success");
        } else {
          toast.error("some error occured while processing payment", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }
      }
    } catch (error) {
      payBtn.current.disabled = false;
      toast.error(error.response.data.message, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  }

  return (
    <>
      <div className="paymentContainer">
        <div className="payment_heading">
          <h4>Payment</h4>
        </div>
        <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
          <div>
            <CreditCardIcon />
            <CardNumberElement className="paymentInput" />
          </div>
          <div>
            <EventIcon />
            <CardExpiryElement className="paymentInput" />
          </div>
          <div>
            <VpnKeyIcon />
            <CardCvcElement className="paymentInput" />
          </div>
          <input
            type="submit"
            value={`Pay - ₹${amount / 100}`}
            ref={payBtn}
            className="paymentFormBtn"
          />
        </form>
      </div>
      <h5
        style={{
          textTransform: "uppercase",
          fontWeight: "100",
          letterSpacing: "2px",
          textAlign:"center"
        }}
      >
        use sample card - 4242 4242 4242 4242
      </h5>
      <ToastContainer />
    </>
  );
}

export default Payment;
