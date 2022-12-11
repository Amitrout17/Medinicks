import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { myOrder } from "../../actions/orderAction";
import SingleOrders from "./SingleOrders";
import Loader from "../layout/loader/loader";
import "./Myorders.css";
function MyOrders() {
  const dispatch = useDispatch();
  const Myorders = useSelector((state) => state.myOrder);
  const loading = useSelector((state) => state.myOrder.loading);
  var orders;
  if (Myorders) {
    orders = Myorders.orders;
  }

  useEffect(() => {
    dispatch(myOrder());
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="my_orders_main">
          <div className="my_order_header">
            <h3>My Orders</h3>
          </div>
          <div className="my_orders">
            {orders && orders.reverse().map((i) => <SingleOrders order={i} />)}
          </div>
        </div>
      )}
    </>
  );
}

export default MyOrders;
