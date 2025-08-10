import React from 'react';
import { Card, Button } from 'react-bootstrap';

const ProductCard = ({ product, addToCart }) => {
  return (
    <Card className="product-card h-100">
      <Card.Img variant="top" src={product.image} alt={product.name} />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="product-title">{product.name}</Card.Title>
        <Card.Text className="product-description">{product.description}</Card.Text>
        <div className="mt-auto">
          <div className="product-price">${product.price.toFixed(2)}</div>
          <Button 
            className="btn-coffee w-100" 
            onClick={() => addToCart(product)}
          >
            Agregar al Carrito
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;