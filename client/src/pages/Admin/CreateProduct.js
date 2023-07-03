import React, { useEffect, useState } from "react";
import Layout from "../../components/Layouts/Layout";
import AdminMenu from "../../components/Layouts/AdminMenu";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";

const CreateProduct = () => {
  const { Option } = Select;
  const navigate = useNavigate();

  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");

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
      toast.error("Somenthing went wrong in getting toast");
    }
  };

  // create new Product
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("price", price);
      productData.append("description", description);
      productData.append("quantity", quantity);
      productData.append("category", category);
      productData.append("photo", photo);
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/create-product`,
        productData
      );
      if (data?.success) {
        toast.success("Product created successfully");
        navigate("/dashboard/admin/products");
      } else {
        toast.error("data?.message");
      }
    } catch (error) {}
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <>
      <Layout>
        <div className='container-fluid m-3 p-3'>
          <div className='row'>
            <div className='col-md-3'>
              <AdminMenu />
            </div>
            <div className='col-md-9'>
              <h1>Create Product</h1>
              <div className='m-1 w-75'>
                <Select
                  bordered={false}
                  placeholder='Selec a category'
                  size='large'
                  showSearch
                  className='form-select mb-3'
                  onChange={(value) => {
                    setCategory(value);
                  }}
                >
                  {categories?.map((c) => (
                    <Option key={c._id} value={c.id}>
                      {c.name}
                    </Option>
                  ))}
                </Select>

                <div className='mb-3'>
                  <label className='btn btn-outline-secondary'>
                    {photo ? photo.name : "Upload Photo"}
                    <input
                      type='file'
                      name='photo'
                      accept='image/*'
                      onChange={(e) => setPhoto(e.target.files[0])}
                      hidden
                    ></input>
                  </label>
                </div>
                <div className='mb-3'>
                  {photo && (
                    <div className='text-center'>
                      <img
                        src={URL.createObjectURL(photo)}
                        alt='productPHoto'
                        height={"200px"}
                        className='img img-responsive'
                      />
                    </div>
                  )}
                </div>
                <div className='mb-3'>
                  <input
                    type='text'
                    value={name}
                    placeholder='write a name'
                    className='form-control'
                    onChange={(e) => setName(e.target.value)}
                  ></input>
                </div>

                <div className='mb-3'>
                  <textarea
                    type='text'
                    value={description}
                    placeholder='write a description'
                    className='form-control'
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                <div className='mb-3'>
                  <input
                    type='number'
                    value={price}
                    placeholder='write a Price'
                    className='form-control'
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
                <div className='mb-3'>
                  <input
                    type='number'
                    value={quantity}
                    placeholder='write a quantity'
                    className='form-control'
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>
                <div className='mb-3'>
                  <Select
                    bordered={false}
                    placeholder='Select Shipping '
                    size='large'
                    showSearch
                    className='form-select mb-3'
                    onChange={(value) => {
                      setShipping(value);
                    }}
                  >
                    <Option value='0'>No</Option>
                    <Option value='1'>Yes</Option>
                  </Select>
                </div>
                <div className='mb-3'>
                  <button className='btn btn-primary' onClick={handleCreate}>
                    CREATE PRODUCT
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default CreateProduct;
