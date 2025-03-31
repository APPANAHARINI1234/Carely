import React from 'react';
import { useState } from 'react';
import { useSpring, animated } from 'react-spring'; // import from react-spring
import { Link } from 'react-router-dom'; // For routing links
import './Home.css'; // Your custom styles

const Carousel = () => {
  const [isHovered, setIsHovered] = useState(false);

  // Animation for continuous scrolling effect
  const props = useSpring({
    from: { transform: 'translateX(0%)' },
    to: { transform: 'translateX(-100%)' },
    reset: true,
    reverse: isHovered,
    loop: true,
    config: { duration: 5000 }, // Time to complete one loop
  });

  return (
    <section className="cards-section">
      <h3>Discover More</h3>
      <div className="card-container">
        <animated.div
          style={props}
          className="card-wrapper"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="card">
            <img src="images/ibs.png" alt="Diseases" />
            <h4>Diseases</h4>
            <p>Learn about various diseases, their symptoms, and causes.</p>
            <Link to="/diseases" className="learn-more">Explore</Link>
          </div>
          <div className="card">
            <img src="images/asthma.png" alt="Treatment Options" />
            <h4>Treatment Options</h4>
            <p>Explore the best treatment options for various conditions.</p>
            <Link to="/treatments" className="learn-more">Explore</Link>
          </div>
          <div className="card">
            <img src="images/copd.png" alt="Symptoms" />
            <h4>Symptoms</h4>
            <p>Understand the symptoms of common diseases and conditions.</p>
            <Link to="/symptoms" className="learn-more">Explore</Link>
          </div>
        </animated.div>
      </div>
    </section>
  );
};

export default Carousel;
