import React from 'react';
import Footer from '../partial/footer';
import Navbar from '../partial/navbar';

const Layout = (props) => {
  return (
    <div>
      <Navbar/>
      {props.children}
      <Footer/>
    </div>
  )
}

export default Layout;
