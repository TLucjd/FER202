import React from "react";
import { Modal, Button, ListGroup } from "react-bootstrap";

const SelectedItemsPopup = ({ show, onHide, cartItems, updateQuantity }) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Your Cart</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <ListGroup>
            {cartItems.map((item) => (
              <ListGroup.Item
                key={item.id}
                className="d-flex justify-content-between align-items-center"
              >
                <div>
                  <h5>{item.name}</h5>
                  <p>
                    ${item.price} x {item.quantity}
                  </p>
                </div>
                <div>
                  <Button
                    variant="outline-dark"
                    className="ms-1"
                    onClick={() => updateQuantity(item.id, 1)}
                  >
                    +
                  </Button>
                  <Button
                    variant="outline-dark"
                    className="ms-1"
                    onClick={() => updateQuantity(item.id, -1)}
                  >
                    -
                  </Button>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SelectedItemsPopup;
