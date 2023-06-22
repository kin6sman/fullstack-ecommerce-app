 import React from 'react'
import Header from './Header'
import Footer from './Footer'
import  { Toaster } from 'react-hot-toast';

 
 const Layout = ({ children }) => {
   return (
     <div>

      <Header/>
        <main style={{minHeight: '80vh'}}>
          <Toaster />

          <h1>{children}</h1>
        </main>
      <Footer/>
     </div>
   )
 }
 
 export default Layout