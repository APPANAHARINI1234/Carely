import React from "react";
import "./Blog.css";

const PCOSBlog = () => {
  return (
    <div className="blog-container">
      <h1>Understanding PCOS</h1>
      <p>
        Polycystic Ovary Syndrome (PCOS) is a condition in which a woman's 
        ovaries produce excessive androgens, leading to hormonal imbalances.
      </p>

      <h2>Causes</h2>
      <ul>
        <li>Genetics</li>
        <li>Insulin resistance</li>
        <li>Unhealthy lifestyle</li>
      </ul>

      <h2>Effective Treatments</h2>
      <p>
        Maintaining a healthy diet, engaging in regular exercise, 
        and consulting a doctor for medication can help manage PCOS.
      </p>
    </div>
  );
};

export default PCOSBlog;
