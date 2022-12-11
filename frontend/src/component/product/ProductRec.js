import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "../layout/loader/loader";
function ProductRec() {
  const product = useSelector((state) => state.cartRecomandation.cartRec);
  const loading = useSelector((state) => state.recProduct.loading);
  var recProducts1 = [];
  for (let i = 0; i < 3; i++) {
    product && recProducts1.push(product[i]);
  }
  function goToTop(){
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
  }
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="recomandation_main">
            <h1>product based on cart items</h1>
            {recProducts1 &&
              recProducts1.map(
                (i) =>
                  i && (
                    <div className="product border_non">
                      <Link to={`/product/${i._id}`} className="product_card" onClick={goToTop}>
                        <img src={i.images[0].url} alt="" />
                        <div className="product_details">
                          <h2>{i.name.slice(0,20)}</h2>
                          <h3>{i.description.slice(0, 57)}...</h3>
                          <div className="rating_div">
                            <p>{i.numOfReviews} Reviews</p>
                          </div>
                          <h4>₹ {i.price} /-</h4>
                          <div className="buttons">
                            <button>
                              <i className="fa-solid fa-bag-shopping"></i>Buy
                              Now{" "}
                            </button>
                          </div>
                        </div>
                      </Link>
                    </div>
                  )
              )}
          </div>
        </>
      )}
    </>
  );
}

export default ProductRec;
