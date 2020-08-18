import React from 'react';
import Footer from '../Footer/Footer';
import Toolbar from '../Toolbar/Toolbar';

function PageDefault({ children }) {
  return (
    <>
      <Toolbar/>
      <div className="main">
        { children }
      </div>
      <Footer />
    </>
  );
}

export default PageDefault;