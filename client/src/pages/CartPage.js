import React, { useState, useEffect } from "react";
import Layout from "../components/Layouts/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import toast from "react-hot-toast";
// import "../styles/CartStyles.css";

const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  //total price
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {
      console.log(error);
    }
  };
  //detele item
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className=' cart-page'>
        <div className='row'>
          <div className='col-md-12'>
            <h1 className='text-center bg-light p-2 mb-1'>
              {!auth?.user
                ? "Hello Guest"
                : `Hello  ${auth?.token && auth?.user?.name}`}
              <p className='text-center'>
                {cart?.length
                  ? `You Have ${cart.length} items in your cart ${
                      auth?.token ? "" : "please login to checkout !"
                    }`
                  : " Your Cart Is Empty"}
              </p>
            </h1>
          </div>
        </div>
        <div className='container '>
          <div className='row '>
            <div className='col col-md-7  p-0 m-0 '>
              {cart?.map((p) => (
                <div className='row card flex-row mt-2' key={p._id}>
                  <div className='col-md-4'>
                    <img
                      src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                      className='card-img-top'
                      alt={p.name}
                      width='100%'
                      height={"230px"}
                    />
                  </div>
                  <div className='col-md-4'>
                    <p className='fs-3'>{p.name}</p>
                    <p className='fs-5'>{p.description.substring(0, 30)}</p>
                    <p className='fs-3'>Price : ${p.price}</p>
                  </div>
                  <div className='col-md-4 cart-remove-btn'>
                    <button
                      className='btn btn-danger'
                      onClick={() => removeCartItem(p._id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className='col-md-5 cart-summary '>
              <h2 className='ms-5'>Cart Summary</h2>
              <p className='ms-5'>Total | Checkout | Payment</p>
              <hr />
              <h4 className='ms-5'>Total : {totalPrice()} </h4>
              {auth?.user?.address ? (
                <>
                  <div className='mb-3'>
                    <h4 className='ms-5'>Current Address</h4>
                    <h5 className='ms-5'>{auth?.user?.address}</h5>
                    <button
                      className='btn btn-outline-primary ms-5'
                      onClick={() => navigate("/dashboard/user/profile")}
                    >
                      Update Address
                    </button>
                  </div>
                </>
              ) : (
                <div className='mb-3'>
                  {auth?.token ? (
                    <button
                      className='btn btn-outline-warning'
                      onClick={() => navigate("/dashboard/user/profile")}
                    >
                      Update Address
                    </button>
                  ) : (
                    <button
                      className='btn btn-outline-warning'
                      onClick={() =>
                        navigate("/login", {
                          state: "/cart",
                        })
                      }
                    >
                      Plase Login to checkout
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
