import React from 'react';

import { Header, Footer, Tokenomics, Games, Features, Vision } from './containers';
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
        <Vision />
        <Features />
        <Games />
        <CTA />
        <Tokenomics />
        <Footer />
    </div>
  )
}

export default App;