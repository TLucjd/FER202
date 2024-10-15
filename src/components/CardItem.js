import React from "react";
import { Card, Button } from "react-bootstrap";
import "../styles/CardItem.scss"; // Assuming you will create this CSS file for additional styles

const CardItem = ({ item, addToCart }) => {
  return (
    <div className="col-md-3 mb-4">
      <Card className="h-100 position-relative">
        {item.salePrice && (
          <span className="badge sale-badge">Sale</span>
        )}
        <Card.Img variant="top" src={item.image} alt={item.title} />
        <Card.Body className="d-flex flex-column">
          <Card.Title>{item.title}</Card.Title>
          <div className="price-section">
            {item.salePrice ? (
              <>
                <span className="original-price">${item.price.toFixed(2)}</span>
                <span className="sale-price">${item.salePrice.toFixed(2)}</span>
              </>
            ) : (
              <span>${item.price.toFixed(2)}</span>
            )}
          </div>
          <Button variant="dark" className="mt-auto" onClick={() => addToCart(item)}>
            Buy
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CardItem;