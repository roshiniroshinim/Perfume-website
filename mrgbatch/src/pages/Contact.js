import React, { useState } from 'react';
import './index.css'; 
import ContactForm from './Contact'; // Assuming this import is necessary for your project structure

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    product: '', // New field for product name
    totalRate: 0 // New field for total rate
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit formData to your server or API
    console.log('Form Data:', formData);

    // Alert box for categories and product details
    alert(`You selected the following categories: Perfume, Create, Products\nProduct: ${formData.product}\nTotal Rate: $${formData.totalRate}`);

    // Reset the form after submission
    setFormData({
      name: '',
      email: '',
      message: '',
      product: '', // Resetting the product field
      totalRate: 0 // Resetting total rate
    });
  };

  return (
    <div className="contact-form-container">
      <h2>Contact Us</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="product">Product Name</label>
          <input
            type="text"
            id="product"
            name="product"
            value={formData.product}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="totalRate">Total Rate ($)</label>
          <input
            type="number"
            id="totalRate"
            name="totalRate"
            value={formData.totalRate}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Send Message</button>
      </form>
    </div>
  );
};

export default Contact;