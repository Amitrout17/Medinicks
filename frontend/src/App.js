import "./App.css";
import { useState } from "react";
import axios from "axios";
import Header from "./component/layout/Header/Header";
import Home from "./component/Home/Home.js";
import Search from "./component/product/Search.js";
import ProductDetails from "./component/product/ProductDetails.js";
import Profile from "./component/user/Profile";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginSignup from "./component/user/LoginSignup";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./actions/userAction";
import ProfileUpdate from "./component/user/ProfileUpdate";
import UpdatePassword from "./component/user/UpdatePassword";
import ForgetPassword from "./component/user/ForgetPassword";
import ResetPassword from "./component/user/ResetPassword.js";
import Cart from "./component/Cart/Cart.js";
import Shipping from "./component/Cart/Shipping";
import ConfirmOrder from "./component/Cart/ConfirmOrder";
import Payment from "./component/Cart/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentSuccess from "./component/Cart/PaymentSuccess.js";
import MyOrders from "./component/Orders/MyOrders.js";
import OrderDetails from "./component/Orders/OrderDetails";
import Dashboard from "./component/admin/Dashboard";
import PageNotFound from "./component/alert/PageNotFound";
import ProductList from "./component/admin/ProductList";
import CreateProduct from "./component/admin/CreateProduct";
import UpdatetProduct from "./component/admin/UpdatetProduct";
import OrderList from "./component/admin/OrderList";
import AllUsersAdmin from "./component/admin/AllUsersAdmin";
import Reviews from "./component/admin/Reviews";
import ChatBot from "./component/CustomerCare/ChatBot";
export default function App() {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.loadUserReducer);
  var role;
  if (user) {
    if (user.user) {
      role = user.user.role;
    }
  }

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");
    setStripeApiKey(data.stripeApiKey);
  }
  useEffect(() => {
    dispatch(loadUser());
    getStripeApiKey();
  }, [dispatch]);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="*"
          element={
            <>
              <PageNotFound />
            </>
          }
        />
        <Route
          exact
          path="/"
          element={
            <>
              <Header user={user} />
              <Home />
            </>
          }
        />
        <Route
          exact
          path="/cc"
          element={
            <>
              <Header user={user} />
              <ChatBot />
            </>
          }
        />
        <Route
          exact
          path="/product/:id"
          element={
            <>
              <Header user={user} />
              <ProductDetails />
            </>
          }
        />
        <Route
          path="/products/:keyword"
          element={
            <>
              <Header user={user} />
              <Search />
            </>
          }
        />
        <Route
          path="/products/"
          element={
            <>
              <Header user={user} />
              <Home />
            </>
          }
        />
        <Route exact path="/loginSignup" element={<LoginSignup />} />
        <Route
          exact
          path="/account"
          element={
            <>
              <Profile />
            </>
          }
        />
        {user ? (
          <Route
            exact
            path="/me/update"
            element={
              <>
                <ProfileUpdate />
              </>
            }
          />
        ) : (
          ""
        )}
        {user ? (
          <Route
            exact
            path="/password/update"
            element={
              <>
                <UpdatePassword />
              </>
            }
          />
        ) : (
          ""
        )}
        <Route
          exact
          path="/password/forgot"
          element={
            <>
              <ForgetPassword />
            </>
          }
        />
        <Route
          exact
          path="/password/reset/:token"
          element={<ResetPassword />}
        />
        <Route
          exact
          path="/cart"
          element={
            <>
              <Header user={user} />
              <Cart />
            </>
          }
        />
        {user ? (
          <Route
            exact
            path="/shipping"
            element={
              <>
                <Header user={user} />
                <Shipping />
              </>
            }
          />
        ) : (
          ""
        )}
        {user ? (
          <Route
            exact
            path="/confirmOrder"
            element={
              <>
                <Header user={user} />
                <ConfirmOrder />
              </>
            }
          />
        ) : (
          ""
        )}

        {user ? (
          <Route
            exact
            path="/payment"
            element={
              <>
                <Elements stripe={loadStripe(stripeApiKey)}>
                  <Header user={user} />
                  <Payment />
                </Elements>
              </>
            }
          />
        ) : (
          ""
        )}
        {user ? (
          <Route
            exact
            path="/payment/success"
            element={
              <>
                <PaymentSuccess />
              </>
            }
          />
        ) : (
          ""
        )}
        {user ? (
          <Route
            exact
            path="/orders"
            element={
              <>
                <Header user={user} />
                <MyOrders />
              </>
            }
          />
        ) : (
          ""
        )}
        {user ? (
          <Route
            exact
            path="/orders/:orderID"
            element={
              <>
                <Header user={user} />
                <OrderDetails />
              </>
            }
          />
        ) : (
          ""
        )}

        {role === "admin" ? (
          <Route
            exact
            path="/admin/dashbord"
            element={
              <>
                <Dashboard />
              </>
            }
          />
        ) : (
          ""
        )}

        {role === "admin" ? (
          <Route
            exact
            path="/admin/products"
            element={
              <>
                <ProductList />
              </>
            }
          />
        ) : (
          ""
        )}
        {role === "admin" ? (
          <Route
            exact
            path="/admin/products/newProduct"
            element={
              <>
                <CreateProduct />
              </>
            }
          />
        ) : (
          ""
        )}
        {role === "admin" ? (
          <Route
            exact
            path="/admin/products/:id"
            element={
              <>
                <UpdatetProduct />
              </>
            }
          />
        ) : (
          ""
        )}
        {role === "admin" ? (
          <Route
            exact
            path="/admin/orders"
            element={
              <>
                <OrderList />
              </>
            }
          />
        ) : (
          ""
        )}
        {role === "admin" ? (
          <Route
            exact
            path="/admin/users"
            element={
              <>
                <AllUsersAdmin />
              </>
            }
          />
        ) : (
          ""
        )}
        {role === "admin" ? (
          <Route
            exact
            path="/admin/reviews"
            element={
              <>
                <Reviews />
              </>
            }
          />
        ) : (
          ""
        )}
      </Routes>
    </BrowserRouter>
  );
}
