 import React from 'react'
import Header from './Header'
import Footer from './Footer'
 
 const Layout = ({ children }) => {
   return (
     <div>

      <Header/>
        <main style={{minHeight: '80vh'}}>
          <h1>{children}</h1>
        </main>
      <Footer/>
     </div>
   )
 }
 
 export default Layout