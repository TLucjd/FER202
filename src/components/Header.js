// src/components/Header.js
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "bootstrap/dist/js/bootstrap.bundle";
import React from "react";
import {
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
  Container,
  NavDropdown,
} from "react-bootstrap";
import "../styles/Header.scss"; // Adding custom styles

const Header = ({
  cartItemCount,
  onCartClick,
  onLoginClick,
  isLoggedIn,
  user,
  onLogout,
}) => {
  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#">Pizza House</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarSupportedContent" />
          <Navbar.Collapse id="navbarSupportedContent">
            <Nav className="me-auto">
              <Nav.Link href="#" active>
                Home
              </Nav.Link>
              <Nav.Link href="#">About Us</Nav.Link>
              <Nav.Link href="#">Contact</Nav.Link>
            </Nav>

            <Form className="d-flex">
              <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="danger">
                <i className="fa fa-search"></i>
              </Button>
            </Form>

            {/* Conditional Rendering based on authentication status */}
            {isLoggedIn ? (
              <Nav className="ms-4">
                <NavDropdown
                  title={`Welcome, ${user?.name || "User"}`}
                  id="user-nav-dropdown"
                >
                  <NavDropdown.Item onClick={onLogout}>
                    <i className="fa fa-sign-out-alt me-2"></i> Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            ) : (
              <Button
                variant="outline-light"
                className="ms-4"
                onClick={onLoginClick}
              >
                <i className="fa fa-sign-in-alt"></i> Login
              </Button>
            )}

            {/* Cart Button */}
            <Button
              variant="outline-light"
              className="ms-3 cart-button" // Added custom class
              onClick={onCartClick}
            >
              <i className="fa fa-shopping-cart"></i>
              <span className="ms-1">Cart</span>
              {cartItemCount > 0 && (
                <span className="badge rounded-pill bg-danger cart-badge">
                  {cartItemCount}
                </span>
              )}
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
