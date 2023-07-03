import React, { useEffect, useState } from "react";
import Layout from "../components/Layouts/Layout";
import { useAuth } from "../context/auth";
import axios from "axios";
import { Checkbox } from "antd";

const HomePage = () => {
  const [auth, setAuth] = useAuth();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState([]);
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
    getAllProducts();
  }, []);
  return (
    <Layout title={"Best Offers"}>
      <div className='row mt-3'>
        <div className='col-md-2 '>
          <h6 className='text-center'>Filter By Category</h6>
          <div className='d-flex flex-column'>
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
        </div>
        <div className='col-md-9'>
          {JSON.stringify(checked, null, 4)}
          <h1 className='text-center'>All Products</h1>
          <div className='d-flex flex-wrap'>
            {products?.map((p) => (
              <div className='card m-2' style={{ width: "18rem" }}>
                <img
                  src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                  className='card-img-top'
                  alt={p.name}
                />
                <div className='card-body'>
                  <h5 className='card-title fs-3'>{p.name}</h5>
                  <p className='card-text fs-6'>{p.description}</p>
                  <button className='btn btn-secondary'>More Details</button>
                  <button className='btn btn-primary ms-4'>Add to Cart</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
