import React from "react";
import { Modal, Button, ListGroup } from "react-bootstrap";
import { FaPlus, FaMinus } from "react-icons/fa"; // Add icons for buttons

const SelectedItemsPopup = ({ show, onHide, cartItems, updateQuantity }) => {
  const totalPrice = cartItems
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2); // Calculate total price

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Your Cart</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {cartItems.length === 0 ? (
          <p className="text-center">Your cart is empty.</p>
        ) : (
          <>
            <ListGroup>
              {cartItems.map((item) => (
                <ListGroup.Item
                  key={item.id}
                  className="d-flex justify-content-between align-items-center"
                >
                  <div className="d-flex align-items-center">
                    <img
                      src={item.imgSrc} // Use imgSrc for the product image
                      alt={item.name}
                      style={{
                        width: "50px", // Set a width for the image
                        height: "50px", // Set a height for the image
                        borderRadius: "4px", // Optional: add border radius for rounded corners
                        marginRight: "10px", // Add space between image and text
                      }}
                    />
                    <div className="me-auto">
                      <h5 className="mb-0">{item.name}</h5>
                      <p className="mb-0">
                        ${item.price} x {item.quantity}
                      </p>
                    </div>
                  </div>
                  <div className="d-flex align-items-center">
                    <Button
                      variant="outline-primary"
                      className="ms-1"
                      onClick={() => updateQuantity(item.id, 1)}
                    >
                      <FaPlus />
                    </Button>
                    <Button
                      variant="outline-danger"
                      className="ms-1"
                      onClick={() => updateQuantity(item.id, -1)}
                    >
                      <FaMinus />
                    </Button>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
            <div className="mt-3">
              <h5>Total Price: ${totalPrice}</h5>
            </div>
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="success" onClick={onHide}>
          Proceed to Checkout
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SelectedItemsPopup;
