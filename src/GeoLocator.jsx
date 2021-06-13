import React, { useState, useEffect } from "react";
import SimpleMap from "./SimpleMap";
let placeholderValue = "Search for any IP address or domain";
const GeoLocator = () => {
  const [address, setAddress] = useState("");

  // Send requrest to APi to retrieve data about the ip address that was entered
  const searchAddress = async () => {
    const res = await fetch(
      `https://geo.ipify.org/api/v1?apiKey=${process.env.REACT_APP_KEY}&ipAddress=${address}`
    );
    const data = await res.json();
    console.log(data);
  };

  return (
    <div className="App">
      <div className="top-part">
        <div className="app-title">IP Address Tracker</div>
        <div className="geo-form">
          <input
            type="text"
            className="geo-input"
            placeholder={placeholderValue}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <button className="geo-btn" onClick={() => searchAddress()}>
            {">"}
          </button>
        </div>
      </div>
      <div id="mapid">
        <SimpleMap />
      </div>
    </div>
  );
};

export default GeoLocator;
