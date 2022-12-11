import "./cartItem.css";
import ReactStars from "react-rating-stars-component";
import { useState } from "react";
import { addItemsToCart } from "../../actions/cartAction";
import { useDispatch } from "react-redux";
import { removeItemFromCart } from "../../actions/cartAction";

function CartItem({ item }) {
  const dispatch = useDispatch();
  const stock = item.stock;
  const [quantity, setquantity] = useState(item.quantity);

  const options = {
    count: 5,
    size: 24,
    activeColor: "#ffff",
    color1: "#ffff",
    edit: false,
    value: item.rating,
    isHalf: true,
  };

  const increaseQuantity = async () => {
    if (quantity < stock) {
      await setquantity(quantity + 1);
      await dispatch(addItemsToCart(item.product_id, quantity + 1));
    }
  };

  const reduceQuantity = async () => {
    if (quantity > 1) {
      await setquantity(quantity - 1);
      await dispatch(addItemsToCart(item.product_id, quantity - 1));
    }
  };

  const removeFromCart = () => {
    dispatch(removeItemFromCart(item.product_id));
  };

  const totalPrice = item.price * quantity;

  return (
    <>
      <div className="cart_item">
        <div className="cart_product">
          <img src={item.image} alt="" />
          <div className="cart_product_description">
            <h4>{item.name}</h4>
            <h5>price: ₹ {item.price}</h5>
            <ReactStars {...options} />
          </div>
        </div>
        <div className="cart_quantity">
          <div className="quantity">
            <button className="pluse" onClick={reduceQuantity}>
              -
            </button>
            <input type="number" value={quantity} readOnly={true} />
            <button className="minus" onClick={increaseQuantity}>
              +
            </button>
          </div>
        </div>
        <div className="cart_remove">
          <button onClick={removeFromCart}>x</button>
        </div>
        <div className="total_price">
          <h4>₹ {totalPrice}</h4>
        </div>
      </div>

      <div className="cart_item_2">
        <div className="cart_item_2_cart_product">
          <img src={item.image} alt="" />
        </div>
        <div className="cart_product_2">
          <div className="cart_product_description">
            <h4>{item.name}</h4>
          </div>
          <div className="cart_product_2_quantity">
            <button className="pluse" onClick={reduceQuantity}>
              -
            </button>
            <input type="number" value={quantity} readOnly={true} />
            <button className="minus" onClick={increaseQuantity}>
              +
            </button>
          </div>
          <div className="cart_product_2_cart_remove">
            <button onClick={removeFromCart}>remove</button>
          </div>
          <div className="cart_product_2_total_price">
            <h4>PRICE : ₹ {totalPrice}</h4>
          </div>
        </div>
      </div>
    </>
  );
}

export default CartItem;
