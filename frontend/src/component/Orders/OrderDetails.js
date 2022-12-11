import React from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getOrderDetails } from "../../actions/orderAction";
import { useSelector } from "react-redux";
import Loader from "../layout/loader/loader";
import "../Orders/OrderDetails.css";
function OrderDetails() {
  const dispatch = useDispatch();
  let { orderID } = useParams();
  const loading = useSelector((state) => state.orderDetails.loading);
  const orderDetails = useSelector((state) => state.orderDetails.orderDetails);
  var totalPrice, shippingInfo, user, status, orderDate, items, paymentInfo;
  if (orderDetails) {
    totalPrice = orderDetails.totalPrice;
    shippingInfo = orderDetails.shippingInfo;
    user = orderDetails.user;
    status = orderDetails.orderStatus;
    orderDate = orderDetails.createdAt.slice(0, 10);
    items = orderDetails.orderItems;
    paymentInfo = orderDetails.paymentInfo;
  }

  useEffect(() => {
    dispatch(getOrderDetails(orderID));
  }, [dispatch, orderID]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="order_details_main">
            <div className="order_details_main_shipping_address">
              <h3>Shipping Address</h3>
              <p>{user && user.name}</p>
              <p>
                {shippingInfo && shippingInfo.address},
                {shippingInfo && shippingInfo.city}
              </p>
              <p>
                {shippingInfo && shippingInfo.state},{" "}
                {shippingInfo && shippingInfo.country},{" "}
                {shippingInfo && shippingInfo.pinCode}
              </p>
              <p>{shippingInfo && shippingInfo.phoneNo}</p>
            </div>
            <div className="order_details_payment_info">
              <h3>Payment Info</h3>
              <div>
                <p>Payment status :</p>
                {/* to be change when cod option will be added */}
                <p style={{
                  textTransform :"capitalize"
                }}>paid</p>
              </div>
              <div>
                <p>PayMent Id :</p>
                <p  style={{
                  textTransform :"capitalize"
                }}  className="payment_id_details">{paymentInfo&&paymentInfo.id}</p>
              </div>
            </div>
          </div>
          {/* single order detail*/}{" "}
          {orderDetails ? (
            <div className="single_order_main">
              <div className="single_order_header">
                <h4>Order #{orderID}</h4>
                <h4>order placed on {orderDate}</h4>
                <h4 className="order_status">{status}</h4>
              </div>
              <div className="single_order_hr"></div>
              <div className="single_order_item_main">
                {items.map((i) => (
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
              <h4 className="single_order_total_price">
                Total pice :₹{totalPrice}
              </h4>
            </div>
          ) : (
            ""
          )}
        </>
      )}
    </>
  );
}

export default OrderDetails;