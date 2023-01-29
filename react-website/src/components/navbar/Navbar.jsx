import React, { useState } from 'react';
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import './navbar.css';
import logo from '../../assets/adv3nture-logo.png';

const Menu = () => (
  <>
    <p><a href="#home">Home</a></p>
    <p><a href="#vision">Vision</a></p>
    <p><a href="#features">Features</a></p>
    <p><a href="#games">Community Games</a></p>
    <p><a href="#tokenomics">Tokenomics</a></p>
  </>
)

// The CSS naming convention used here is:
// BEM -> Block Element Modifier
// https://sparkbox.com/foundry/bem_by_example

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <div className="adv3__navbar">
      <div className="adv3__navbar-links">
        <div className="adv3__navbar-links_logo">
          <img src={logo} alt="logo" />
        </div>
        <div className="adv3__navbar-links_container">
          <Menu />
        </div>
      </div>
      <div className="adv3__navbar-sign">
        <button type="button"><a href="https://docs.adv3nture.xyz/" target="_blank" rel="noopener noreferrer">Documentation</a></button>
      </div>
      <div className="adv3__navbar-menu">
        {toggleMenu 
          ? <RiCloseLine color="#fff" size={27} onClick={() => setToggleMenu(false)} />
          : <RiMenu3Line color="#fff" size={27} onClick={() => setToggleMenu(true)} />
        }
        {/* only if toggleMenu is true, render below */}
        {toggleMenu && (
          <div className="adv3__navbar-menu_container scale-up-center">
            <div    className="adv3__navbar-menu_container-links">
              <Menu /> 
              <div className="adv3__navbar-menu_container-links-sign">
                <button type="button"><a href="https://docs.adv3nture.xyz/" target="_blank" rel="noopener noreferrer">Docs</a></button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar;
