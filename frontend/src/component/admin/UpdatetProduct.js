import React from "react";
import Sidebar from "./Sidebar";
import "./UpdateProduct.css";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../layout/loader/loader";
import { useState, useRef, useEffect } from "react";
import { getProductDetails } from "../../actions/productAction";
import { useParams } from "react-router-dom";
import { updateProduct } from "../../actions/productAction";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function UpdatetProduct() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const focusPoint = useRef(null);
  const secondPoint = useRef(null);

  const product = useSelector((state) => state.productDetailsReducer.product);
  const loading = useSelector((state) => state.updated.loading);
  const success = useSelector((state) => state.updated.success);

  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");
  const [image, setavatar] = useState("/Profile.png");
  const [name, setName] = useState("");
  const [price, setprice] = useState("");
  const [description, setdesc] = useState("");
  const [category, setcategory] = useState("");
  const [Stock, setstock] = useState("");

  const showSidebar = () => {
    if (focusPoint.current.style.display === "none") {
      focusPoint.current.style.display = "block";
    } else {
      focusPoint.current.style.display = "none";
      secondPoint.current.style.width = "100%";
    }
  };

  function categoryOpt(e) {
    setcategory(e.target.value);
  }

  const update = async () => {
    await dispatch(
      updateProduct(id, name, price, description, Stock, category, image)
    );
    toast.success("Product Updated Successfully", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  useEffect(() => {
    if (product && product._id !== id) {
      dispatch(getProductDetails(id));
    } else {
      setName(product.name);
      setavatar(product.images[0].url);
      setavatar(product.images[0].url);
      setcategory(product.category);
      setprice(product.price);
      setstock(product.Stock);
      setdesc(product.description);
    }
  }, [dispatch, id, product]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="dashboard_main">
          <div ref={focusPoint}>
            <Sidebar />
          </div>
          <div
            className="dashboard"
            ref={secondPoint}
            style={{ height: "100vh" }}
          >
            <h3 className="show_slide_bar1">update product</h3>
            <h3 className="show_sidebar">
              <i class="fa-solid fa-bars" onClick={showSidebar} /> update
              product
            </h3>

            <div className="create_product_main">
              <div className="create_product">
                <div className="product_name">
                  <i class="fa-sharp fa-solid fa-file-signature"></i>
                  <input
                    type="text"
                    placeholder="New Name"
                    value={name}
                    onChange={(event) => {
                      setName(event.target.value);
                    }}
                    required="true"
                  ></input>
                </div>
                <div className="product_price">
                  <i class="fa-solid fa-indian-rupee-sign"></i>
                  <input
                    type="number"
                    placeholder="New price"
                    value={price}
                    onChange={(e) => {
                      setprice(e.target.value);
                    }}
                  />
                </div>
                <div className="product_desc">
                  <i class="fa-solid fa-file"></i>
                  <input
                    type="text"
                    placeholder="New Description"
                    value={description}
                    onChange={(e) => {
                      setdesc(e.target.value);
                    }}
                  />
                </div>
                <div className="product_stock">
                  <i class="fa-solid fa-boxes-stacked"></i>
                  <input
                    type="number"
                    placeholder="New Stock"
                    value={Stock}
                    onChange={(e) => {
                      setstock(e.target.value);
                    }}
                  />
                </div>
                <div className="product_category">
                  <label for="cars">Choose a Category :</label>
                  <select name="cars" id="cars" onClick={categoryOpt}>
                    <option value="General">General</option>
                    <option value="Dibetics">Dibetics</option>
                    <option value="Gastric">Gastric</option>
                    <option value="Cold">Cold</option>
                    <option value="Skin Care">Skin Care</option>
                    <option value="Hair Care">Hair Care</option>
                    <option value="Fitness">Fitness</option>
                    <option value="Homeopathy">Homeopathy</option>
                  </select>
                </div>
                <div className="signup_img">
                  <img src={avatarPreview} alt="Avatar Preview" />
                  <label class="custom-file-upload" name="file">
                    <input
                      type="file"
                      name="avatar"
                      accept="image/*"
                      onChange={(event) => {
                        const file = new FileReader();
                        file.onload = () => {
                          if (file.readyState === 2) {
                            setAvatarPreview(file.result);
                            setavatar(file.result);
                          }
                        };
                        //read file as a url so the result will be in form of a url
                        file.readAsDataURL(event.target.files[0]);
                      }}
                      required="true"
                    />
                  </label>
                </div>
                <button onClick={update}>Update</button>
              </div>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </>
  );
}

export default UpdatetProduct;
