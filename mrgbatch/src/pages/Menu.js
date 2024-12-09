// ProductsPage.js
import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { FaShoppingCart, FaHeart, FaTrash } from 'react-icons/fa';
import './index.css'; // Separate CSS file recommended
import img7 from './image2/img7.jpg';
import img6 from './image2/img6.jpg';
import img5 from './image2/img5.jpg';
import images5 from './image2/images5.jpg';
import images6 from './image2/images6.jpg';
import image9 from './image2/image9.jpg';

const ProductsPage = () => {
  const { addToCart, cartItems, removeFromCart } = useOutletContext();
  const [wishlist, setWishlist] = useState([]);

  const products = [
    { id: 1, src: img7, name: 'Classic Perfume', price: 250 },
    { id: 2, src: img6, name: 'Elegant Scent', price: 200 },
    { id: 3, src: images6, name: 'Luxury Fragrance', price: 420 },
    { id: 4, src: images5, name: 'Modern Essence', price: 310 },
    { id: 5, src: img5, name: 'Delicate Aroma', price: 350 },
    { id: 6, src: image9, name: 'Premium Blend', price: 400 },
  ];

  const toggleWishlist = (product) => {
    setWishlist(prevWishlist => 
      prevWishlist.some(item => item.id === product.id)
        ? prevWishlist.filter(item => item.id !== product.id)
        : [...prevWishlist, product]
    );
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price, 0).toFixed(2);
  };

  return (
    <div className="products-container">
      <section className="products-section">
        <h1>Our Perfume Collection</h1>
        <div className="product-gallery">
          {products.map((product) => (
            <div className="product-card" key={product.id}>
              <div className="product-image-container">
                <img 
                  src={product.src} 
                  alt={product.name} 
                  className="product-image" 
                />
                <div className="product-actions">
                  <button 
                    className="btn btn-cart" 
                    onClick={() => addToCart(product)}
                  >
                    <FaShoppingCart /> Add to Cart
                  </button>
                  <button 
                    className={`btn btn-wishlist ${
                      wishlist.some(item => item.id === product.id) ? 'active' : ''
                    }`}
                    onClick={() => toggleWishlist(product)}
                  >
                    <FaHeart /> Wishlist
                  </button>
                </div>
              </div>
              <div className="product-details">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-price">${product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="cart-section">
        <h2>Shopping Cart</h2>
        {cartItems.length > 0 ? (
          <div className="cart-summary">
            <div className="cart-items">
              {cartItems.map((item) => (
                <div className="cart-item" key={item.id}>
                  <img 
                    src={item.src} 
                    alt={item.name} 
                    className="cart-item-image" 
                  />
                  <div className="cart-item-details">
                    <h3>{item.name}</h3>
                    <p>${item.price}</p>
                    <button 
                      className="btn btn-remove" 
                      onClick={() => removeFromCart(item)}
                    >
                      <FaTrash /> Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="cart-total">
              <h3>Total: ${calculateTotal()}</h3>
              <button className="btn btn-checkout">Proceed to Checkout</button>
            </div>
          </div>
        ) : (
          <p className="empty-cart-message">Your cart is empty</p>
        )}
      </section>
    </div>
  );
};

export default ProductsPage;