import React from 'react';
import { Card, Button } from 'react-bootstrap';

const CardItem = ({ item, addToCart }) => {
  return (
    <div className="col-md-3 mb-4">
      <Card>
        <Card.Img variant="top" src={item.imgSrc} />
        <Card.Body>
          <Card.Title>{item.name}</Card.Title>
          <Card.Text>${item.price.toFixed(2)}</Card.Text>
          <Button variant="dark" className="w-100" onClick={() => addToCart(item)}>Buy</Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CardItem;
