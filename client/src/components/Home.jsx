import { useEffect, useRef } from "react";
import "./Home.css"; // Import your CSS file
import Navbar from "./Navbar";
const Home = () => {
  useEffect(() => {
    let nextDom = document.getElementById("next");
    let prevDom = document.getElementById("prev");
    let carouselDom = document.querySelector(".carousel");
    let SliderDom = document.querySelector(".carousel .list");
    let thumbnailBorderDom = document.querySelector(".carousel .thumbnail");
    let timeRunning = 3000;
    let timeAutoNext = 7000;

    if (!nextDom || !prevDom || !carouselDom || !SliderDom || !thumbnailBorderDom) return;

    nextDom.onclick = function () {
      showSlider("next");
    };

    prevDom.onclick = function () {
      showSlider("prev");
    };

    let runTimeOut;
    let runNextAuto = setTimeout(() => {
      nextDom.click();
    }, timeAutoNext);

    function showSlider(type) {
      let SliderItemsDom = document.querySelectorAll(".carousel .list .item");
      let thumbnailItemsDom = document.querySelectorAll(".carousel .thumbnail .item");

      if (SliderItemsDom.length === 0 || thumbnailItemsDom.length === 0) return;

      if (type === "next") {
        SliderDom.appendChild(SliderItemsDom[0]);
        thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
        carouselDom.classList.add("next");
      } else {
        SliderDom.prepend(SliderItemsDom[SliderItemsDom.length - 1]);
        thumbnailBorderDom.prepend(thumbnailItemsDom[thumbnailItemsDom.length - 1]);
        carouselDom.classList.add("prev");
      }

      clearTimeout(runTimeOut);
      runTimeOut = setTimeout(() => {
        carouselDom.classList.remove("next");
        carouselDom.classList.remove("prev");
      }, timeRunning);

      clearTimeout(runNextAuto);
      runNextAuto = setTimeout(() => {
        nextDom.click();
      }, timeAutoNext);
    }
  }, []);

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
      {/* Carousel */}
      <div className="carousel">
        {/* List item */}
      
        <div className="list">
          <div className="item">
            <video src="/videos/cells.mp4" controls autoPlay muted loop></video>
            <div className="content">
              <div className="author">LUNDEV</div>
              <div className="title">DESIGN SLIDER</div>
              <div className="topic">ANIMAL</div>
              <div className="des">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit...
              </div>
              <div className="buttons">
                <button>SEE MORE</button>
                <button>SUBSCRIBE</button>
              </div>
            </div>
          </div>
          <div className="item">
            <video src="/videos/advising.mp4" controls autoPlay muted loop></video>
            <div className="content">
              <div className="author">LUNDEV</div>
              <div className="title">SLIDER 2</div>
              <div className="topic">NATURE</div>
              <div className="des">Another great video description...</div>
              <div className="buttons">
                <button>SEE MORE</button>
                <button>SUBSCRIBE</button>
              </div>
            </div>
          </div>
          <div className="item">
            <video src="/videos/heart-beat.mp4" controls autoPlay muted loop></video>
            <div className="content">
              <div className="author">LUNDEV</div>
              <div className="title">SLIDER 3</div>
              <div className="topic">OCEAN</div>
              <div className="des">Some description about the ocean video...</div>
              <div className="buttons">
                <button>SEE MORE</button>
                <button>SUBSCRIBE</button>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <button id="prev" className="prev">
          &lt;
        </button>
        <button id="next" className="next">
          &gt;
        </button>

        {/* Thumbnails */}
        <div className="thumbnail">
          <div className="item">
            <video src="/videos/cells.mp4" muted></video>
          </div>
          <div className="item">
            <video src="/videos/advising.mp4" muted></video>
          </div>
          <div className="item">
            <video src="/videos/heart-beat.mp4" muted></video>
          </div>
        </div>
      </div>

      {/* Parallax Sections */}
      <div id="parallax-world">
        {/* Hero Section */}
        <section className="hero">
          <h1>Welcome to Carely</h1>
          <p>Your one-stop medical assistant.</p>
        </section>

        {/* Explore Section */}
        <section className="parallax-section parallax-one" ref={(el) => sectionsRef.current.push(el)}>
          <h2>Explore</h2>
        </section>
        <section className="content-section" ref={(el) => sectionsRef.current.push(el)}>
          <h3>Discover More</h3>
          <p>
            <span className="first-character sc">C</span>arely provides medical assistance at your fingertips.
            Browse through diseases, their causes, and treatment options.
          </p>
        </section>

        {/* MediBot Section */}
        <section className="parallax-section parallax-two" ref={(el) => sectionsRef.current.push(el)}>
          <h2>MediBot</h2>
        </section>
        <section className="content-section" ref={(el) => sectionsRef.current.push(el)}>
          <h3>AI-Powered Assistance</h3>
          <p>
            <span className="first-character ny">M</span>ediBot helps you with quick medical information based
            on your symptoms. Get fast and accurate responses anytime.
          </p>
        </section>

        {/* MediNotify Section */}
        <section className="parallax-section parallax-three" ref={(el) => sectionsRef.current.push(el)}>
          <h2>MediNotify</h2>
        </section>
        <section className="content-section" ref={(el) => sectionsRef.current.push(el)}>
          <h3>Medication Reminders</h3>
          <p>
            <span className="first-character atw">S</span>et up notifications for your medication and health
            check-ups. Carely ensures you never miss an important dose.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Home;
