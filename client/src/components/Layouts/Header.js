import React from "react";
import { NavLink, Link } from "react-router-dom";
import { AiFillShop } from "react-icons/ai";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import SearchInput from "../Form/SearchInput.js";
import { useCart } from "../../context/cart";
import { Badge } from "antd";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };

  return (
    <>
      <nav className='navbar navbar-expand-lg bg-body-tertiary header '>
        <div className='container-fluid'>
          <button
            className='navbar-toggler'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#navbarTogglerDemo01'
            aria-controls='navbarTogglerDemo01'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <span className='navbar-toggler-icon' />
          </button>
          <div className='collapse navbar-collapse ' id='navbarTogglerDemo01'>
            <Link to='/' className='navbar-brand text-light'>
              <AiFillShop /> Rahul Store
            </Link>
            <ul className='navbar-nav ms-auto mb-2 mb-lg-0'>
              <SearchInput />
              <li className='nav-item'>
                <NavLink
                  to='/'
                  className='nav-link active text-light'
                  aria-current='page'
                  href='#'
                >
                  Home
                </NavLink>
              </li>
              {/* <li className='nav-item'>
                <NavLink to='/category' className='nav-link' href='#'>
                  Category
                </NavLink>
              </li> */}
              {!auth.user ? (
                <>
                  <li className='nav-item'>
                    <NavLink
                      to='/register'
                      className='nav-link text-light'
                      href='#'
                    >
                      Register
                    </NavLink>
                  </li>
                  <li className='nav-item'>
                    <NavLink
                      to='/login'
                      className='nav-link text-light'
                      href='#'
                    >
                      Login
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className='nav-item dropdown'>
                    <NavLink
                      className='nav-link dropdown-toggle text-light'
                      role='button'
                      data-bs-toggle='dropdown'
                      aria-expanded='false'
                    >
                      {auth?.user?.name}
                    </NavLink>
                    <ul className='dropdown-menu'>
                      <li>
                        <NavLink
                          to={`/dashboard/${
                            auth?.user?.role === 1 ? "admin" : "user"
                          }`}
                          className='dropdown-item text-dark'
                        >
                          Dashboard
                        </NavLink>
                      </li>
                      <li className='nav-item'>
                        <NavLink
                          to='/login'
                          onClick={handleLogout}
                          className='nav-link text-dark'
                          href='#'
                        >
                          Logout
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                </>
              )}
              <li className='nav-item'>
                <Badge count={cart?.length} showZero>
                  <NavLink to='/cart' className='nav-link text-light' href='#'>
                    Cart
                  </NavLink>
                </Badge>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
