/* eslint-disable react/prop-types */
import { useSelector, useDispatch } from 'react-redux';
import { addItem, removeItem, updateQuantity } from '../../state/CartSlice';

import './CartItem.css';

const CartItem = ({ onContinueShopping, setAddedToCart }) => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleCheckoutShopping = (e) => {
    e.preventDefault();
    alert('Functionality to be added for future reference');
  };

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    let totalPrice = 0;

    cart.forEach((item) => {
      const cost = parseInt(item.cost.slice(1));
      totalPrice += cost * item.quantity;
    });
    return totalPrice;
  };

  const handleIncrement = (item) => {
    dispatch(addItem(item));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity(item));
    } else {
      dispatch(removeItem(item));
      setAddedToCart((prevState) => ({
        ...prevState,
        [item.name]: false,
      }));
    }
  };

  const handleRemove = (item) => {
    console.log('clicked');
    dispatch(removeItem(item));
    setAddedToCart((prevState) => ({
      ...prevState,
      [item.name]: false,
    }));
  };

  // Calculate total cost based on quantity for an item
  // const calculateTotalCost = (item) => {};

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map((item) => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>
                  -
                </button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>
                  +
                </button>
              </div>
              <div className="cart-item-total">Total: {item.totalPricePerItem}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className="total_cart_amount"></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={onContinueShopping}>
          Continue Shopping
        </button>
        <br />
        <button className="get-started-button1" onClick={(e) => handleCheckoutShopping(e)}>
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartItem;
