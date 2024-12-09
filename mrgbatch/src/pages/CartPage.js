// CartPage.js
import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import './index.css'; // Your custom CSS

const CartPage = () => {
  const { cartItems, removeFromCart, addToCart } = useOutletContext(); // Accessing context

  const handleRemoveClick = (item) => {
    if (item.quantity > 1) {
      // Decrement quantity if more than one
      addToCart({...item, quantity: item.quantity - 1});
    } else {
      // Remove the item if quantity is 1
      removeFromCart(item);
    }
  };

  const totalPrice = cartItems.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0); // Total price

  return (
    <div>
      <h2>Your Cart</h2>
      {cartItems.length > 0 ? (
        <div className="cart-items">
          {cartItems.map((item, index) => (
            <div className="cart-item" key={index}>
              <img src={item.src} alt={item.name} className="cart-item-image" />
              <div className="cart-item-details">
                <h3>{item.name} (x{item.quantity || 1})</h3>
                <p>${(item.price * (item.quantity || 1)).toFixed(2)}</p> {/* Display total price for that item */}
                <button onClick={() => handleRemoveClick(item)}>
                  Remove <FaTrash />
                </button>
              </div>
            </div>
          ))}
          <h3>Total: ${totalPrice.toFixed(2)}</h3> {/* Display total cart price */}
        </div>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
};

export default CartPage;