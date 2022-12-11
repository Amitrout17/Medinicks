import React from "react";
import { useState } from "react";
import { useRef } from "react";
import Sidebar from "./Sidebar";
import "./createProduct.css";
import { useDispatch, useSelector } from "react-redux";
import { newProduct } from "../../actions/productAction";
import Loader from "../layout/loader/loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
function CreateProduct() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");
  const [image, setavatar] = useState("/Profile.png");
  const [name, setName] = useState("");
  const [price, setprice] = useState("");
  const [desc, setdesc] = useState("");
  const [category, setcategory] = useState("General");
  const [Stock, setstock] = useState(1);

  const focusPoint = useRef(null);
  const secondPoint = useRef(null);

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
  const loading = useSelector((state) => state.createProduct.loading);
  const Issuccess = useSelector((state) => state.createProduct.success);
  const createProduct = async () => {
    await dispatch(newProduct(name, price, desc, category, image, Stock));
    navigate("/admin/products");
  };

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
            <h3 className="show_slide_bar1">Create product</h3>
            <h3 className="show_sidebar">
              <i class="fa-solid fa-bars" onClick={showSidebar} /> Create
              product
            </h3>

            <div className="create_product_main">
              <div className="create_product">
                <div className="product_name">
                  <i class="fa-sharp fa-solid fa-file-signature"></i>
                  <input
                    type="text"
                    placeholder="Product Name"
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
                    placeholder="Product price"
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
                    placeholder="Product Description"
                    value={desc}
                    onChange={(e) => {
                      setdesc(e.target.value);
                    }}
                  />
                </div>
                <div className="product_stock">
                  <i class="fa-solid fa-boxes-stacked"></i>
                  <input
                    type="number"
                    placeholder="Product Stock"
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
                <button onClick={createProduct}>Create</button>
              </div>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </>
  );
}

export default CreateProduct;
