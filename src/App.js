import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import { Carousel } from "react-bootstrap";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import CardItem from "./components/CardItem";
import SelectedItemsPopup from "./components/SelectedItemsPopup";

function App() {
  const [cartItems, setCartItems] = useState(() => {
    // Khởi tạo giỏ hàng từ localStorage nếu có
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Lưu giỏ hàng vào localStorage mỗi khi giỏ hàng thay đổi
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item) => {
    setCartItems((prevCartItems) => {
      const existingItem = prevCartItems.find(
        (cartItem) => cartItem.id === item.id
      );
      if (existingItem) {
        // Nếu đã có trong giỏ hàng, tăng số lượng
        return prevCartItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        // Nếu chưa có, thêm vào giỏ hàng
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

  return (
    <div className="bg-dark">
      <Header
        cartItemCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        onCartClick={() => setShowPopup(true)}
      />
      <Row className="col-lg-12 mb-5">
        <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="./images/pizza1.jpg"
              alt="First slide"
            />
            <Carousel.Caption>
              <h5>First slide label</h5>
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
              <h5>Second slide label</h5>
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
              <h5>Third slide label</h5>
              <p>
                Some representative placeholder content for the third slide.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </Row>
      <div className="container mb-4">
        <h2 className="text-white">Our Menu</h2>
        <div className="row">
          <CardItem
            item={{
              id: 1,
              name: "Margherita Pizza",
              price: 24,
              imgSrc: "./images/menu1.jpg",
            }}
            addToCart={addToCart}
          />
          <CardItem
            item={{
              id: 2,
              name: "Mushroom Pizza",
              price: 25,
              imgSrc: "./images/menu2.jpg",
            }}
            addToCart={addToCart}
          />
          <CardItem
            item={{
              id: 3,
              name: "Hawaiian Pizza",
              price: 30,
              imgSrc: "./images/menu3.jpg",
            }}
            addToCart={addToCart}
          />
          <CardItem
            item={{
              id: 4,
              name: "Pesto Pizza",
              price: 35,
              imgSrc: "./images/menu4.jpg",
            }}
            addToCart={addToCart}
          />
        </div>
      </div>
      <SelectedItemsPopup
        show={showPopup}
        onHide={() => setShowPopup(false)}
        cartItems={cartItems}
        updateQuantity={updateQuantity}
      />
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
                  placeholder="Your name *"
                  aria-label="Your name *"
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formEmail">
                <Form.Control
                  type="email"
                  placeholder="Your Email *"
                  aria-label="Your Email *"
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formService">
                <Form.Select aria-label="Select a Service...">
                  <option>Select a Service...</option>
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
