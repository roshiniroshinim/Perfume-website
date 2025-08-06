import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import './index.css';
import {
  Navbar,
  Nav,
  Container,
  Badge,
  Dropdown,
  Modal,
  Button,
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  FaShoppingCart,
  FaHome,
  FaUtensils,
  FaSignInAlt,
  FaEnvelope,
  FaBars,
  FaTrash,
} from 'react-icons/fa';

const Layouts = () => {
  const [cartItems, setCartItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [itemToRemove, setItemToRemove] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setShowModal(false);
  }, [location]);

  // Add to cart function
  const addToCart = (item) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.name === item.name);

      if (existingItem) {
        return prevItems.map((i) =>
          i.name === item.name
            ? { ...i, quantity: (i.quantity || 0) + 1 }
            : i
        );
      } else {
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
  };

  // Handle remove button click
  const confirmRemove = (item) => {
    setItemToRemove(item);
    setShowModal(true);
  };

  // Remove from cart
  const removeFromCart = () => {
    setCartItems(cartItems.filter((item) => item.name !== itemToRemove.name));
    setItemToRemove(null);
    setShowModal(false);
  };

  // Cancel remove action
  const cancelRemove = () => {
    setItemToRemove(null);
    setShowModal(false);
  };

  console.log(cartItems.length)
  // Calculate cart count and total price
  // const cartCount = cartItems.reduce(
  //   (total, item) => total + (item.quantity || 0),
  //   0
  // );
  const cartCount = cartItems.length;
  const totalPrice = cartItems.reduce(
    (total, item) => total + (item.price * (item.quantity || 1)),
    0
  );

  return (
    <>
      {/* Navbar */}
      <Navbar
        expand="lg"
        className={`custom-navbar ${isScrolled ? 'scrolled' : ''}`}
        sticky="top"
      >
        <Container fluid>
          <Navbar.Brand as={Link} to="/" className="navbar-brand">
            My Website
          </Navbar.Brand>
          <Nav className="mx-auto">
            <Nav.Link as={Link} to="/" className="nav-link">
              <FaHome /> Home
            </Nav.Link>
            <Nav.Link as={Link} to="/menu" className="nav-link">
              <FaUtensils /> Products
            </Nav.Link>
            <Nav.Link as={Link} to="/loginpage" className="nav-link">
              <FaSignInAlt /> Login
            </Nav.Link>
            <Nav.Link as={Link} to="/contact" className="nav-link">
              <FaEnvelope /> Contact
            </Nav.Link>
          </Nav>
          <Dropdown align="end" className="cart-dropdown">
            <Dropdown.Toggle variant="link" className="cart-icon">
              <FaShoppingCart className="cart-icon-color" />
              {cartCount > 0 && <Badge className="cart-count">{cartCount}</Badge>}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {cartItems.length > 0 ? (
                <>
                  {cartItems.map((item) => (
                    <Dropdown.Item key={item.name} className="cart-item">
                      <div className="cart-item-details">
                        <img
                          src={item.src}
                          alt={item.name}
                          className="cart-thumbnail"
                        />
                        <div>
                          <p>{item.name}</p>
                          <p>${item.price} x {item.quantity}</p>
                        </div>
                        <button
                          className="btn btn-remove"
                          onClick={() => confirmRemove(item)}
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </Dropdown.Item>
                  ))}
                  <Dropdown.Item className="cart-total">
                    <strong>Total: ${totalPrice}</strong>
                  </Dropdown.Item>
                </>
              ) : (
                <Dropdown.Item>Your cart is empty</Dropdown.Item>
              )}
            </Dropdown.Menu>
          </Dropdown>
        </Container>
      </Navbar>

     {/* Confirmation Modal */}
<Modal
  show={showModal}
  onHide={cancelRemove}
  centered
>
  <Modal.Header closeButton>
    <Modal.Title>Remove Item</Modal.Title>
  </Modal.Header>
  <Modal.Body className="text-center">
    {itemToRemove?.src && (
      <img
        src={itemToRemove.src}
        alt={itemToRemove.name}
        className="modal-item-image"
        style={{ maxWidth: '100px', marginBottom: '10px', borderRadius: '8px' }}
      />
    )}
    <p>
      Are you sure you want to remove <strong>{itemToRemove?.name}</strong> from the cart?
    </p>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={cancelRemove}>
      Cancel
    </Button>
    <Button variant="danger" onClick={removeFromCart}>
      Remove
    </Button>
  </Modal.Footer>
</Modal>
<Outlet context={{ addToCart, confirmRemove, cartItems }} />
    </>
  );
};
export default Layouts;