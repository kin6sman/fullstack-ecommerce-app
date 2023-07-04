import React, { useState, useEffect } from "react";
import Layout from "../components/Layouts/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
// import "../styles/ProductDetailsStyles.css";

const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});

  //initalp details
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);
  //getProduct
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className='row container product-details mt-4'>
        <div className='col-md-6 mt-4'>
          <img
            src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`}
            className='card-img-top'
            alt={product.name}
            height='600px'
            width={"350px"}
          />
        </div>
        <div className='col-md-6 product-details-info'>
          <h1 className='text-center'>Product Details</h1>
          <hr />
          <h6>Name : {product.name}</h6>
          <h6>Description : {product.description}</h6>
          <h6>
            Price :
            {product?.price?.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </h6>
          <h6>Category : {product?.category?.name}</h6>
          <button class='btn btn-secondary ms-1'>ADD TO CART</button>
        </div>
      </div>
      <hr />
    </Layout>
  );
};

export default ProductDetails;
