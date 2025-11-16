import React, { useState, useEffect } from "react";
import "./home.css";

const images = [
  "https://media.vanguardcommunications.net/Hospital-exterior.jpg",
  "https://img.buzzfeed.com/buzzfeed-static/static/2021-04/28/23/asset/b7ebaef67849/sub-buzz-627-1619652518-9.jpg",
  "https://risingstarhostel.com/wp-content/uploads/2023/06/ASH_5873-scaled.jpg",
  "http://www.insplosion.com/blog/wp-content/uploads/2020/12/The-Top-5-Most-Beautiful-Restaurants-in-Toronto-1.jpg"
];

function Slider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="slider-container">
      <img src={images[index]} alt="slide" className="slide-image" />
    </div>
  );
}

export default Slider;