// import React from 'react'
// import { Link } from 'react-router-dom'

// const Footer = () => {
//   return (
//     <div className='footer'>
//       <h4 className='text-center'>All Right reserved &copy; Rahul Sharma</h4>
//       <p className='text-center mt-3'>
//           <Link to="/about">About</Link>
//           <Link to="/contact">Contact</Link>
//           <Link to="/policy">Policy</Link>
//       </p>

//     </div>
//   )
// }

// export default Footer

import React from "react";

const Footer = () => (
  <>
    <>
      {/* Remove the container if you want to extend the Footer to full width. */}
      <div>
        {/* Footer */}
        <footer
          className='text-center text-white'
          style={{ backgroundColor: "#1d202e" }}
        >
          {/* Grid container */}
          <div className='container'>
            {/* Section: Links */}
            <section className='mt-5'>
              {/* Grid row*/}
              <div className='row text-center d-flex justify-content-center pt-5'>
                {/* Grid column */}
                <div className='col-md-2'>
                  <h6 className='text-uppercase font-weight-bold'>
                    <a href='#!' className='text-white'>
                      About us
                    </a>
                  </h6>
                </div>
                {/* Grid column */}
                {/* Grid column */}
                <div className='col-md-2'>
                  <h6 className='text-uppercase font-weight-bold'>
                    <a href='#!' className='text-white'>
                      Products
                    </a>
                  </h6>
                </div>
                {/* Grid column */}
                {/* Grid column */}
                <div className='col-md-2'>
                  <h6 className='text-uppercase font-weight-bold'>
                    <a href='#!' className='text-white'>
                      Awards
                    </a>
                  </h6>
                </div>
                {/* Grid column */}
                {/* Grid column */}
                <div className='col-md-2'>
                  <h6 className='text-uppercase font-weight-bold'>
                    <a href='#!' className='text-white'>
                      Help
                    </a>
                  </h6>
                </div>
                {/* Grid column */}
                {/* Grid column */}
                <div className='col-md-2'>
                  <h6 className='text-uppercase font-weight-bold'>
                    <a href='#!' className='text-white'>
                      Contact
                    </a>
                  </h6>
                </div>
                {/* Grid column */}
              </div>
              {/* Grid row*/}
            </section>
            {/* Section: Links */}
            <hr className='my-5' />
            {/* Section: Text */}
            <section className='mb-5'>
              <div className='row d-flex justify-content-center'>
                <div className='col-lg-8'>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Sunt distinctio earum repellat quaerat voluptatibus placeat
                    nam, commodi optio pariatur est quia magnam eum harum
                    corrupti dicta, aliquam sequi voluptate quas.
                  </p>
                </div>
              </div>
            </section>

            {/* Section: Social */}
          </div>
          {/* Grid container */}
          {/* Copyright */}
          <div
            className='text-center p-3'
            style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
          >
            <p className='text-white'>© 2023 Copyright: Rahul Sharma</p>
          </div>
          {/* Copyright */}
        </footer>
        {/* Footer */}
      </div>
      {/* End of .container */}
    </>
  </>
);

export default Footer;
