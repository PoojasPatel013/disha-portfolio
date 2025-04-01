import React, { useState, useEffect } from 'react';
import FlowingMenu from './components/Components/FlowingMenu/FlowingMenu';
import CustomCursor from './components/CustomCursor';
import Ribbons from './components/Animations/Ribbons/Ribbons';
import './App.css';

function App() {
  const [menuItems] = useState([
    {
      text: "About",
      link: "#about",
      image: "https://via.placeholder.com/400x600"
    },
    {
      text: "Expertise",
      link: "#expertise",
      image: "https://via.placeholder.com/400x600"
    },
    {
      text: "Credentials",
      link: "#credentials",
      image: "https://via.placeholder.com/400x600"
    },
    {
      text: "Services",
      link: "#services",
      image: "https://via.placeholder.com/400x600"
    },
    {
      text: "Contact",
      link: "#contact",
      image: "https://via.placeholder.com/400x600"
    }
  ]);

  return (
    <div className="app">
      <CustomCursor />
      <div className="ribbons-wrapper">
        <Ribbons />
      </div>
      
      <header className="header">
        <div className="logo">DP</div>
        <FlowingMenu items={menuItems} />
      </header>
      
      <main>
        <section id="hero" className="hero">
          <div className="container">
            <div className="hero-content">
              <div className="name-container">
                <h1 className="name">Disha<br/>Patel</h1>
                <div className="underline"></div>
              </div>
              <div className="title-container">
                <h2 className="title">CHARTERED ACCOUNTANT</h2>
                <p className="subtitle">FINANCIAL EXPERT<br/>BASED IN INDIA</p>
                <div className="cta-container">
                  <a href="#contact" className="cta-button">
                    Let's Talk
                    <i className="arrow-icon">→</i>
                  </a>
                  <a href="#expertise" className="secondary-button">
                    Explore Services
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="about">
          <div className="container">
            <h2 className="section-title">About</h2>
            <div className="about-content">
              <div className="about-image">
                <div className="image-frame">
                  <div className="image-placeholder">
                    <i className="user-icon">👤</i>
                  </div>
                </div>
                <div className="experience-badge">
                  <span className="years">3+</span>
                  <span className="text">Years<br/>Experience</span>
                </div>
              </div>
              <div className="about-text-container">
                <p className="about-text">
                  I'm a <span className="highlight">Chartered Accountant finalist</span> with a passion for financial analysis, 
                  tax planning, and corporate finance. With a strong foundation in accounting principles 
                  and practical experience, I help businesses optimize their financial operations and 
                  make informed decisions.
                </p>
                <p className="about-text">
                  My approach combines technical expertise with clear communication, 
                  ensuring complex financial matters are accessible to all stakeholders.
                </p>
                <div className="about-stats">
                  <div className="stat">
                    <span className="stat-number">50+</span>
                    <span className="stat-label">Clients Served</span>
                  </div>
                  <div className="stat">
                    <span className="stat-number">100%</span>
                    <span className="stat-label">Client Satisfaction</span>
                  </div>
                  <div className="stat">
                    <span className="stat-number">30+</span>
                    <span className="stat-label">Projects Completed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Additional sections would go here */}
      </main>
      
      <div className="background-shapes">
        <div className="shape circle-1" data-speed="0.05"></div>
        <div className="shape circle-2" data-speed="0.08"></div>
        <div className="shape circle-3" data-speed="0.03"></div>
        <div className="shape dot-1" data-speed="0.1"></div>
        <div className="shape dot-2" data-speed="0.12"></div>
      </div>
    </div>
  );
}

export default App;
