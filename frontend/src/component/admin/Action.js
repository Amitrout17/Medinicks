import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Action({ id }) {
  const deleteProduct = async () => {
    try {
      const { data } = await axios.delete(`/api/v1/admin/product/${id}`);
      if (data.success) {
        window.location.reload();
      }
    } catch (error) {
      toast.error(error.response.data.message, {
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
      <div className="actions_i">
        <Link to={`/admin/products/${id}`}>
          <i class="fa-solid fa-pen-to-square"></i>
        </Link>
        <i class="fa-solid fa-trash" onClick={deleteProduct}></i>
      </div>
      <ToastContainer />
    </>
  );
}

export default Action;
