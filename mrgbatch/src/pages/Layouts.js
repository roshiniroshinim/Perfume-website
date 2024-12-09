// Layouts.js
import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { 
  Navbar, 
  Nav, 
  Container, 
  Offcanvas, 
  Badge 
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { 
  FaShoppingCart, 
  FaHome, 
  FaUtensils, 
  FaInfoCircle, 
  FaSignInAlt, 
  FaEnvelope,
  FaBars 
} from 'react-icons/fa';
import './index.css'; // Custom CSS file

const Layouts = () => {
  const [cartItems, setCartItems] = useState([]);
  const [show, setShow] = useState(false);
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
    setShow(false);
  }, [location]);

  // Add to cart function
  const addToCart = (item) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(i => i.name === item.name);
      if (existingItem) {
        return prevItems.map(i => 
          i.name === item.name 
            ? { ...i, quantity: (i.quantity || 1) + 1 } 
            : i
        );
      } else {
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
  };

  // Remove from cart function
  const removeFromCart = (itemToRemove) => {
    setCartItems(cartItems.filter(item => item.name !== itemToRemove.name));
  };

  // Calculate cart count
  const cartCount = cartItems.reduce((total, item) => total + (item.quantity || 1), 0);

  // Toggle mobile menu
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      {/* Navbar */}
      <Navbar 
        expand="lg" 
        className={`custom-navbar ${isScrolled ? 'scrolled' : ''}`}
        sticky="top"
      >
        <Container fluid>
          {/* Brand Logo */}
          <Navbar.Brand as={Link} to="/" className="navbar-brand">
            My Website
          </Navbar.Brand>

          {/* Mobile Menu Toggle */}
          <div className="mobile-menu-icons">
            {/* Cart Icon for Mobile */}
            <Nav.Link as={Link} to="/cart" className="cart-icon d-lg-none">
              <FaShoppingCart />
              {cartCount > 0 && (
                <Badge bg="danger" className="cart-count">
                  {cartCount}
                </Badge>
              )}
            </Nav.Link>

            {/* Mobile Menu Toggle */}
            <Navbar.Toggle 
              onClick={handleShow} 
              aria-controls="offcanvasNavbar"
            >
              <FaBars />
            </Navbar.Toggle>
          </div>

          {/* Desktop Navigation */}
          <Navbar.Collapse className="justify-content-center d-none d-lg-flex">
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

            {/* Desktop Cart Icon */}
            <Nav>
              <Nav.Link as={Link} to="/cart" className="cart-icon">
                <FaShoppingCart />
                {cartCount > 0 && (
                  <Badge bg="danger" className="cart-count">
                    {cartCount}
                  </Badge>
                )}
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>

          {/* Mobile Offcanvas Menu */}
          <Offcanvas 
            show={show} 
            onHide={handleClose} 
            placement="end"
            className="mobile-menu"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Menu</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="flex-column">
                <Nav.Link as={Link} to="/" onClick={handleClose}>
                  <FaHome /> Home
                </Nav.Link>
                <Nav.Link as={Link} to="/menu" onClick={handleClose}>
                  <FaUtensils /> Products
                </Nav.Link>
                <Nav.Link as={Link} to="/loginpage" onClick={handleClose}>
                  <FaSignInAlt /> Login
                </Nav.Link>
                <Nav.Link as={Link} to="/contact" onClick={handleClose}>
                  <FaEnvelope /> Contact
                </Nav.Link>
              </Nav>
            </Offcanvas.Body>
          </Offcanvas>
        </Container>
      </Navbar>

      {/* Outlet for rendering child routes */}
      <Outlet context={{ addToCart, removeFromCart, cartItems }} />
    </>
  );
};

export default Layouts;