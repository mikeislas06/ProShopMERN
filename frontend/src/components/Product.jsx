import React from "react";
import { Link } from "react-router-dom";
import { Card, OverlayTrigger, Tooltip } from "react-bootstrap";

import Rating from "./Rating";

const Product = ({ product }) => {
  const tooltip = (
    <Tooltip id="tooltip">
      <strong>{product.name}</strong>
    </Tooltip>
  );

  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant="top" />
      </Link>
      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <OverlayTrigger placement="top" overlay={tooltip}>
            <Card.Title as="div" className="product-title">
              <strong>{product.name}</strong>
            </Card.Title>
          </OverlayTrigger>
        </Link>
        <Card.Text as="div">
          <Rating value={product.rating} text={`${product.numReviews} reviews`} />
        </Card.Text>
        <Card.Text as="h3">${product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
