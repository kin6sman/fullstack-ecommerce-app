import React, { useEffect, useState } from "react";
import Layout from "../components/Layouts/Layout";
import { useAuth } from "../context/auth";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Utilities/Prices";
import { useNavigate } from "react-router-dom";

const productPerRow = 1;

const HomePage = () => {
  const [auth, setAuth] = useAuth();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [next, setNext] = useState(productPerRow);
  const navigate = useNavigate();

  const handleMoreProduct = () => {
    setNext(next + productPerRow);
  };

  // get all categories
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-category`
      );

      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // get products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product`
      );

      setProducts(data.product);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  // filter by category
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((category) => category !== id);
    }
    setChecked(all);
  };

  useEffect(() => {
    getAllCategories();
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checked, radio]);

  // filter product from backend
  const filterProduct = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/product-filters`,
        { checked, radio }
      );
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={"Best Offers"}>
      <div className='row mt-3'>
        <div className='col-md-2 '>
          {/* Filter by Category */}
          <h6 className='text-center'>Filter By Category</h6>
          <div className='d-flex flex-column ms-2'>
            {categories?.map((c) => (
              <>
                <Checkbox
                  key={c.id}
                  onChange={(e) => handleFilter(e.target.checked, c._id)}
                >
                  {c.name}
                </Checkbox>
              </>
            ))}
          </div>

          {/* Price filter */}
          <h6 className='text-center mt-3'>Filter By Prices</h6>
          <div className='d-flex flex-column ms-2'>
            <Radio.Group onChange={(event) => setRadio(event.target.value)}>
              {Prices?.map((product) => (
                <div key={product._id}>
                  <Radio value={product.array}>{product.name}</Radio>
                </div>
              ))}
            </Radio.Group>
            {/* reset button */}
            <div className='d-flex flex-column mt-3'>
              <button
                className='btn btn-danger'
                onClick={() => window.location.reload()}
              >
                Reset Filter
              </button>
            </div>
          </div>
        </div>

        {/* Product Page */}
        <div className='col-md-9 '>
          <h1 className='text-center'>All Products</h1>
          <div className='d-flex flex-wrap'>
            {products?.slice(0, next)?.map((p) => (
              <div className='card m-2' style={{ width: "18rem" }}>
                <img
                  src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                  className='card-img-top'
                  alt={p.name}
                />
                <div className='card-body'>
                  <h5 className='card-title fs-3'>{p.name}</h5>
                  <p className='card-text fs-6'>
                    {p.description.substring(0, 30)}
                  </p>
                  <p className='card-text fs-6'>${p.price}</p>
                  <button
                    className='btn btn-secondary'
                    onClick={() => navigate(`/product/${p.slug}`)}
                  >
                    More Details
                  </button>
                  <button className='btn btn-primary ms-4'>Add to Cart</button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className='d-flex justify-content-center'>
          {next < products?.length && (
            <button
              className='btn btn-outline-secondary mt-4 '
              onClick={handleMoreProduct}
            >
              Load more....
            </button>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
