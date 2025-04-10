import { useEffect, useRef } from "react";
import { Parallax } from "react-parallax"; // Import the Parallax component from react-parallax
import "./Home.css"; // Import your CSS file
import {Link} from "react-router-dom"

const Home = () => {
  const sectionsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("slide-in");
          }
        });
      },
      { threshold: 0.3 }
    );

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div>
      {/* Parallax Sections */}
      <div id="parallax-world">
        {/* Hero Section */}
        {/* About Carely Section */}
<section className="about-carely" ref={(el) => sectionsRef.current.push(el)}>
  <div className="about-content">
    <h2>About Carely</h2>
    <p>
      Carely is your trusted health partner, offering AI-powered assistance, 
      medication reminders, and expert medical insights. Whether you need 
      symptom-based guidance or health notifications, we've got you covered.
    </p>
    <Link to="/auth">
      <button className="learn-more">Get Started</button>
    </Link>
  </div>
</section>

        <Parallax
          className="parallax-section"
          bgImage="images/first-img.jpg"
          strength={200} // Adjust the strength for the parallax effect
        >
          <section className="parallax-content">
            <h2>Welcome to Carely</h2>
          </section>
        </Parallax>
        <section className="content-section" ref={(el) => sectionsRef.current.push(el)}>
  <h3>Explore Diseases & Treatments</h3>
  <p>
    <span className="first-character">E</span>xplore detailed information about various diseases, their symptoms, causes, and available treatment options.
  </p>
  <Link to="/explore">
    <button className="demo-button">Explore Now</button>
  </Link>
</section>

     

        {/* Explore Parallax Section */}
        <Parallax
          className="parallax-section"
          bgImage="images/explore-img.jpg"
          strength={150}
        >
          <section className="parallax-content">
            <h2>Explore</h2>
          </section>
        </Parallax>

        {/* MediBot Section */}
        <section className="content-section" ref={(el) => sectionsRef.current.push(el)}>
          <h3>AI-Powered Assistance</h3>
          <p>
            <span className="first-character ny">M</span>ediBot helps you with quick medical information based on your symptoms.
          </p>
          <Link to="/medibot">
          <button className="demo-button">Try MediBot</button>
          </Link>
        </section>

        {/* MediBot Parallax Section */}
        <Parallax
          className="parallax-section"
          bgImage="images/assist-img.jpg"
          strength={150}
        >
          <section className="parallax-content">
            <h2>MediBot</h2>
          </section>
        </Parallax>

        {/* MediNotify Section */}
        <section className="content-section" ref={(el) => sectionsRef.current.push(el)}>
          <h3>Medication Reminders</h3>
          <p>
            <span className="first-character atw">S</span>et up notifications for your medication and health check-ups. Carely ensures you never miss an important dose.
          </p>
          <div className="reminder-card">
            <h4>Never miss a dose!</h4>
            <p>Your daily medication reminder is just a click away.</p>
            <Link to="/mediNotify">
            <button className="cta-button">Set Reminder</button>
            </Link>
          </div>
        </section>

        {/* MediNotify Parallax Section */}
        <Parallax
          className="parallax-section"
          bgImage="images/medinotify-img.jpg"
          strength={150}
        >
          <section className="parallax-content">
            <h2>MediNotify</h2>
          </section>
        </Parallax>
      </div>

 
    </div>
  );
};

export default Home;
