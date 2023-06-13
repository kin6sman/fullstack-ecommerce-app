import React, { useState } from 'react'
import Layout from '../../components/Layouts/Layout'

const Register = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');

  // form function
  const handleSubmit = (e) => {
      e.preventDefault();
      console.log(name, email, phone, address, password);
  }
  return (
    <>
      <Layout title="Register - Ecommerce">
        <div className='register'>
          <h1>Register Page</h1>
          <form className='mt-4' onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-control"
                id="exampleInputEmail1"            
                placeholder='Enter Your Name'
                required
              />
            
            </div>

            <div className="mb-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
                id="exampleInputEmail1"            
                placeholder='Enter Your Email'
                required
              />
            
            </div>
            <div className="mb-3">
              <input
                type="number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="form-control"
                id="exampleInputEmail1"            
                placeholder='Enter Your Phone Number'
                required
              />
            
            </div>
            <div className="mb-3">
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="form-control"
                id="exampleInputEmail1"            
                placeholder='Enter Your Address'
                required
              />
            
            </div>

            <div className="mb-3">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
                id="exampleInputPassword1"
                placeholder='Enter Your Password'
                required
              />
            </div>
            
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>

        </div>

      </Layout>
    </>
  )
}

export default Register