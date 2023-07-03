import React from "react";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  return (
    <>
      <div className='text-center mt-2'>
        <div className='list-group'>
          <NavLink
            to='/dashboard/admin/create-category'
            className='list-group-item list-group-item-action fs-3'
          >
            Create Category
          </NavLink>
          <NavLink
            to='/dashboard/admin/create-product'
            className='list-group-item list-group-item-action fs-3'
          >
            Create Product
          </NavLink>
          <NavLink
            to='/dashboard/admin/products'
            className='list-group-item list-group-item-action fs-3'
          >
            Products
          </NavLink>
          <NavLink
            to='/dashboard/admin/users'
            className='list-group-item list-group-item-action fs-3'
          >
            Users
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default AdminMenu;
