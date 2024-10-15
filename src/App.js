import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import { Carousel, Container, Row, Col, Form, Button } from "react-bootstrap";
import CardItem from "./components/CardItem";
import SelectedItemsPopup from "./components/SelectedItemsPopup";
import LoginModal from "./components/LoginModal";
import { loginUser, fetchProducts } from "./services/api";

function App() {
  const [cartItems, setCartItems] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  const [showPopup, setShowPopup] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? true : false;
  });
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    if (isLoggedIn) {
      loadProducts();
    }
  }, [isLoggedIn]);

  const addToCart = (item) => {
    setCartItems((prevCartItems) => {
      const existingItem = prevCartItems.find(
        (cartItem) => cartItem.id === item.id
      );
      if (existingItem) {
        return prevCartItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevCartItems, { ...item, quantity: 1 }];
      }
    });
  };

  const updateQuantity = (itemId, delta) => {
    setCartItems((prevCartItems) =>
      prevCartItems
        .map((cartItem) =>
          cartItem.id === itemId
            ? { ...cartItem, quantity: cartItem.quantity + delta }
            : cartItem
        )
        .filter((cartItem) => cartItem.quantity > 0)
    );
  };

  const handleLoginClick = () => {
    setShowLogin(true);
  };

  const handleLoginSuccess = async (credentials) => {
    setLoading(true);
    setLoginError("");
    try {
      const data = await loginUser(credentials);
      setUser(data.user);
      setIsLoggedIn(true);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Clear the cart when the user logs in
      setCartItems([]); // Clear the cart
      localStorage.removeItem("cart"); // Optional: remove the cart from local storage

      setLoading(false);
      return data.user;
    } catch (error) {
      setLoginError(error.message);
      setLoading(false);
      throw error;
    }
  };

  const loadProducts = async () => {
    try {
      const fetchedProducts = await fetchProducts();
      setProducts(fetchedProducts);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem("user");
    // Optionally, remove the token if stored
    // localStorage.removeItem("token");
  };

  return (
    <div className="bg-dark">
      <Header
        cartItemCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        onCartClick={() => setShowPopup(true)}
        onLoginClick={handleLoginClick}
        isLoggedIn={isLoggedIn}
        user={user}
        onLogout={logout}
      />

      {/* Carousel Section */}
      <Row className="col-lg-12 mb-5">
        <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="./images/pizza1.jpg"
              alt="First slide"
            />
            <Carousel.Caption>
              <h5>First Slide Label</h5>
              <p>
                Some representative placeholder content for the first slide.
              </p>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img
              className="d-block w-100"
              src="./images/pizza2.jpg"
              alt="Second slide"
            />
            <Carousel.Caption>
              <h5>Second Slide Label</h5>
              <p>
                Some representative placeholder content for the second slide.
              </p>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img
              className="d-block w-100"
              src="./images/pizza3.jpg"
              alt="Third slide"
            />
            <Carousel.Caption>
              <h5>Third Slide Label</h5>
              <p>
                Some representative placeholder content for the third slide.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </Row>

      {/* Products Section */}
      <div className="container mb-4">
        <h2 className="text-white">Our Menu</h2>
        <div className="row">
          {products.length > 0 ? (
            products.map((product) => (
              <CardItem
                key={product.id}
                item={{
                  id: product.id,
                  title: product.title,
                  price: product.price,
                  salePrice: product.salePrice,
                  image: product.image,
                }}
                addToCart={addToCart}
              />
            ))
          ) : (
            <p className="text-white">Loading products...</p>
          )}
        </div>
      </div>

      {/* Cart Popup */}
      <SelectedItemsPopup
        show={showPopup}
        onHide={() => setShowPopup(false)}
        cartItems={cartItems}
        updateQuantity={updateQuantity}
      />

      {/* Login Modal */}
      <LoginModal
        show={showLogin}
        onHide={() => setShowLogin(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Book Your Table Section */}
      <div className="col-lg-12 pb-5">
        <Container>
          <Row>
            <h2 className="text-center text-white">Book Your Table</h2>
          </Row>
          <Row className="mb-3">
            <Col>
              <Form.Group controlId="formName">
                <Form.Control
                  type="text"
                  placeholder="Your Name *"
                  aria-label="Your Name *"
                  required
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formEmail">
                <Form.Control
                  type="email"
                  placeholder="Your Email *"
                  aria-label="Your Email *"
                  required
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formService">
                <Form.Select aria-label="Select a Service..." required>
                  <option value="">Select a Service...</option>
                  <option value="1">Service 1</option>
                  <option value="2">Service 2</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <Form.Group controlId="formComment">
                <Form.Control
                  as="textarea"
                  rows={5}
                  placeholder="Please write your comment"
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button variant="warning" className="text-white">
                Send Message
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default App;
