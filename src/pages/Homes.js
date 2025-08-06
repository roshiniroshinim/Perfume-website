import React, { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom'; 
import Navbar from './Navbar'; 
import p8 from './image2/p8.jpg';
import p12 from './image2/p12.jpg';
import p11 from './image2/p11.jpg';
import images1 from './image2/images1.jpg';
import images2 from './image2/images2.jpg';
import images3 from './image2/images3.jpg';
import images4 from './image2/images4.jpg';
import images5 from './image2/images5.jpg';
import images6 from './image2/images6.jpg';
import img1 from './image2/img1.jpg';
import img2 from './image2/img2.jpg';
import img3 from './image2/img3.jpg';
import img5 from './image2/img5.jpg';
import img6 from './image2/img6.jpg';
import img7 from './image2/img7.jpg';
import image9 from './image2/image9.jpg';
import p4 from './image2/p4.jpg';
import p5 from './image2/p5.jpg';
import review from './image2/review.jpg';
import aboutImage from './image2/about-image.jpg'; 
import { FaInfoCircle, FaShoppingCart } from 'react-icons/fa'; 
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import './index.css';

const Homes = () => {
  const [visibleImages, setVisibleImages] = useState(6);
  const [cartItems, setCartItems] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', product: '' });
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate();
  const { addToCart }= useOutletContext();

  const images = [
    { id: 1, src: img7, name: 'Classic Perfume', stars: 4, price: 250 },
        { id: 2, src: img6, name: 'Elegant Scent', stars: 5, price: 200 },
        { id: 3, src: images6, name: 'Luxury Fragrance', stars: 3, price: 420 },
        { id: 4, src: images5, name: 'Modern Essence', stars:5 , price: 310 },
        { id: 5, src: img5, name: 'Delicate Aroma', stars: 4 , price: 350 },
        { id: 6, src: image9, name: 'Premium Blend', stars: 5, price: 400 },
  ];

  const productCategories = [
    { name: 'Category 1', images: [images1, images2, images3, images4] },
    { name: 'Category 2', images: [images5, images6, images1, images2] },
    { name: 'Category 3', images: [img1, img2, img3, images6] },
  ];

  const perfumeImages = [
    { src: img1, name: 'Perfume 1', properties: 'Fruity, Sweet, Floral' },
    { src: img2, name: 'Perfume 2', properties: 'Spicy, Warm, Exotic' },
    { src: img3, name: 'Perfume 3', properties: 'Fresh, Clean, Citrus' },
    { src: img6, name: 'Perfume 4', properties: 'Woody, Musky' },
    { src: img5, name: 'Perfume 5', properties: 'Citrus, Fruity' },
    { src: img7, name: 'Perfume 6', properties: 'Floral, Elegant' },
  ];

  const addToCart1 = (image, name, rating, price) => {
    const newItem = { image, name, rating, price };
    setCartItems(prevItems => [...prevItems, newItem]);
    alert(`${name} has been added to your cart!`);
  };

  const totalCartPrice = cartItems.reduce((total, item) => total + item.price, 0);
  const cartCount = cartItems.length;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    
    if (name === 'product') {
      const productIndex = parseInt(value.split(' ')[1]) - 1;
      setSelectedProduct(images[productIndex]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Order submitted for ${form.product}!\nName: ${form.name}\nEmail: ${form.email}`);
    setForm({ name: '', email: '', product: '' });
    setSelectedProduct(null);
  };

  const imageGallery = [images4, images5, images6, images1, images2, images4, images5, images6, images1, images2];

  return (
    <div>
      <Navbar cartCount={cartCount} totalPrice={totalCartPrice} />

      {/* Carousel */}
      <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src={p4} className="d-block w-100" alt="First slide" />
          </div>
          <div className="carousel-item">
            <img src={p11} className="d-block w-100" alt="Second slide" />
          </div>
          <div className="carousel-item">
            <img src={p5} className="d-block w-100" alt="Third slide" />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* Product Categories */}
      <div className="categories-section">
        <h2>Product Categories</h2>
        <div className="categories-container">
          {productCategories.map((category, idx) => (
            <div className="category-box" key={idx}>
              <h3>{category.name}</h3>
              <div className="category-images">
                {category.images.map((img, index) => (
                  <div className="image-container" key={index}>
                    <img src={img} alt={`Category ${category.name} Image ${index + 1}`} className="rounded-image" />
                    <div className="image-overlay">
                      <p>Perfume categories {category.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

     {/* Product Gallery */}


<div className="container">
  <h1>Products</h1>
  <div className="product-gallery">
    {images.slice(0, visibleImages).map((image, index) => {
      const isInCart = cartItems.some((item) => item.src === image.src);

      return (
        <div key={index} className="product-card">
          <img src={image.src} alt={`Perfume ${index + 1}`} className="product-image" />
          <h3 className="product-name">{`Product ${index + 1}`}</h3>
          <div className="product-rating">
            {[...Array(5)].map((_, starIndex) => (
              <span key={starIndex} className={starIndex < image.stars ? 'star filled' : 'star'}>★</span>
            ))}
          </div>
          <p className="product-price">${image.price.toFixed(2)}</p>

          {/* Button to Add or Indicate In-Cart */}
          <button
            className={`buy-button ${isInCart ? 'in-cart' : 'add-to-cart'}`}
            onClick={() =>
              isInCart
                ? alert('This item is already in your cart!')
                : addToCart(image)
            }
          >
            {isInCart ? (
              <>
                <FaShoppingCart className="icon" /> In Cart
              </>
            ) : (
              <>
                <FaShoppingCart className="icon" /> Add to Cart
              </>
            )}
          </button>
        </div>
      );
    })}
  </div>
</div>


      {/* Features Section */}
      <div className="features-section">
        <h2>Why Choose Us?</h2>
        <div className="features-container">
          {[
            { icon: 'fas fa-shipping-fast', title: 'Free Shipping', description: 'Enjoy free shipping on all orders over $50.' },
            { icon: 'fas fa-tags', title: 'All Brands', description: 'Shop from a variety of brands available.' },
            { icon: 'fas fa-clock', title: 'Fast Delivery', description: 'Quick delivery within 3-5 business days.' },
            { icon: 'fas fa-credit-card', title: 'Easy Payment', description: 'Secure and easy payment options available.' },
          ].map((feature, index) => (
            <div className="feature-box" key={index}>
              <i className={feature.icon}></i>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* About Section */}
      <div className="about-section">
        <div className="about-content">
          <h2>About Us</h2>
          <p>
            <strong>Need something that pops and grabs attention? These catchy perfume quotes and captions will do the trick:</strong>
            <br />
            1. Leave a trail of fragrance wherever you go. #ScentSational
            <br />
            2. People don’t need to see me, they can smell me.
            <br />
            3. Dare to be different, dare to smell irresistible.
            <br />
            4. I don’t go for chocolate testing. My thing is perfume testing. #ScentExploration
            <br />
            5. When I feel dull, I need a bottle of mist, no coffee, please.
            <br />
            6. The only way to remember the past is perfumes.
            <br />
            7. I might forget you, but never your smell.
            <br />
            8. Smelling divinely is my goal in life.
            <br />
            9. Feeling a little dull? Spray perfumes all over you!
            <br />
            10. I feel incomplete without a little perfume.
          </p>
          <button className="about-button" onClick={() => navigate('/about')}>Learn More</button>
        </div>
        <div className="about-image">
          <img src={aboutImage} alt="About Us" />
        </div>
      </div>

      {/* Perfume Gallery Section */}
      <div className="perfume-gallery-section">
        <h2>Perfume Gallery</h2>
        <div className="perfume-gallery">
          {perfumeImages.map((item, index) => (
            <div className="perfume-item" key={index}>
              <img src={item.src} alt={item.name} className="perfume-image" />
              <div className="overlay">
                <p classNamhgvbvve="perfume-caption">{item.name}</p>
                <div className="icon">
                  <FaInfoCircle title="View Properties" />
                </div>
                <div className="icon" onClick={() => addToCart1(item.src, item.name, 5, 100)}>
                  <FaShoppingCart title="Add to Cart" />
                </div>
                <p className="properties">{item.properties}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Order Form */}
      <div className="order-form-wrapper">
        <h2>Place Your Order</h2>
        <form onSubmit={handleSubmit} className="order-form">
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="product">Product:</label>
            <select
              id="product"
              name="product"
              value={form.product}
              onChange={handleChange}
              required
            >
              <option value="">Select a product</option>
              {images.map((_, index) => (
                <option key={index} value={`Product ${index + 1}`}>{`Product ${index + 1}`}</option>
              ))}
            </select>
          </div>

          {selectedProduct && (
            <div className="selected-product-details">
              <img src={selectedProduct.src} alt="Selected Product" className="selected-product-image" />
              <p><strong>Price:</strong> ${selectedProduct.price && selectedProduct.price.toFixed(2)}</p>
              <p><strong>Stars:</strong>
                {[...Array(5)].map((_, starIndex) => (
                  <span key={starIndex} className={starIndex < selectedProduct.stars ? 'star filled' : 'star'}>
                    ★
                  </span>
                ))}
              </p>
            </div>
          )}

          <button type="submit" className="submit-button">Submit Order</button>
        </form>
      </div>

    {/* Image Gallery */}
    <div className="container1 horizontal-gallery-container1">
        <h2>Image Gallery</h2>
        <div className="image-gallery1 horizontal-scroll-gallery1">
          {imageGallery.map((src, index) => (
            <div className="image-box1" key={index}>
              <img src={src} alt={`Gallery Image ${index + 1}`} className="gallery-image1" />
            </div>
          ))}
        </div>
      </div>

      {/* Footer Section */}
      <footer className="footer">
        <div className="footer-content">
          <h2>Stay Connected</h2>
          <p>Join us for the latest news and perfume tips.</p>

          {/* Navigation Links */}
          <ul className="footer-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About Us</a></li>
            <li><a href="#products">Products</a></li>
            <li><a href="#contact">Contact</a></li>
            <li><a href="#privacy">Privacy Policy</a></li>
            <li><a href="#terms">Terms of Service</a></li>
            <li><a href="#faq">FAQs</a></li>
            <li><a href="#returns">Return Policy</a></li>
          </ul>
          
    <div className="social-media">
      <a
        href="https://facebook.com"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Facebook"
      >
        <FaFacebook />
      </a>
      <a
        href="https://instagram.com"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram"
      >
        <FaInstagram />
      </a>
      <a
        href="https://twitter.com"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Twitter"
      >
        <FaTwitter />
      </a>
    </div>

          <p>© {new Date().getFullYear()} Perfume Heaven. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Homes;