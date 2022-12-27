import React from 'react';

import { Header, Footer, Blog, Possibility, Features, WhatGPT3 } from './containers';
import { Navbar, Brand, CTA } from './components';
import './App.css';

const App = () => {
  return (
    <div className="App">
        <div className="gradient__bg">
          <Navbar />
          <Header />
        </div>
        <Brand />
        <WhatGPT3 />
        <Features />
        <Possibility />
        <CTA />
        <Blog />
        <Footer />
    </div>
  )
}

export default App;