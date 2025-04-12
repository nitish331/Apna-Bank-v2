import React from "react";
import "./Home.css";
const Home = () => {
  return (
    <div className="home position-relative" style={{ marginTop: "4rem" }}>
      <div
        className="card position-absolute"
        style={{
          width: "28rem",
          backgroundColor: "transparent",
          top: "15%",
          left: "7%",
        }}
      >
        <div className="card-body">
          <h1
            className="card-title text-center text-white"
            style={{ fontSize: "3.5rem" }}
          >
            We're building on belief
          </h1>
          <p
            className="card-text text-center text-white"
            style={{ fontSize: "1rem" }}
          >
            By combining the power of innovation,technology and knowledge,we
            strive to improve the future of individuals,enterprise and sociteies
          </p>
          <button className="btn text-white d-block m-auto">
            Explore Our World
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
