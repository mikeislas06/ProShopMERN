import React from "react";
import { Link, useParams } from "react-router-dom";
import { Row, Col } from "react-bootstrap";

// Actions
import { useGetProductsQuery } from "../slices/productsApiSlice";

// Components
import Product from "../components/Product";
import Loader from "../components/Loader";
import Paginate from "../components/Paginate";
import Message from "../components/Message";
import ProductCarousel from "../components/ProductCarousel";
import Meta from "../components/Meta";

const HomeScreen = () => {
  const { pageNumber, keyword } = useParams();
  const { data, isLoading, error } = useGetProductsQuery({ keyword, pageNumber });

  return (
    <>
      {keyword ? (
        <Link to="/" className="btn btn-light mb-4">
          Go Back
        </Link>
      ) : (
        <ProductCarousel />
      )}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error?.data?.message || error?.error}</Message>
      ) : (
        <>
          <Meta />
          <h1>Latest Products</h1>
          <Row>
            {data.products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={data.pages}
            page={data.page}
            keyword={keyword ? keyword : ""}
          />
        </>
      )}
    </>
  );
};

export default HomeScreen;