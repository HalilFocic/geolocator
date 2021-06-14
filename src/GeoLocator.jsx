import React, { useState } from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import markerIcon from "./images/marker.svg";
let placeholderValue = "Search for any IP address or domain";
const GeoLocator = () => {
  const [hasSearched, setHasSearched] = useState(false);
  const [address, setAddress] = useState("");
  const [viewport, setViewport] = useState({
    latitude: 45.4211,
    longitude: -75.6903,
    width: "100%",
    height: "65vh",
    zoom: 10,
  });
  const [result, setResult] = useState({
    ipAdress: "",
    location: "",
    isp: "",
    timezone: "",
  });
  const [markerData, setMarkerData] = useState({
    lat: 45.4211,
    lng: -75.6903,
  });
  const searchAddress = async () => {
    const res = await fetch(
      `https://geo.ipify.org/api/v1?apiKey=${process.env.REACT_APP_ADRESS_KEY}&ipAddress=${address}`
    );
    const data = await res.json();
    console.log(data);
    let newViewPort = { ...viewport };
    newViewPort.latitude = data.location.lat;
    newViewPort.longitude = data.location.lng;
    setResult({
      location: data.location.city,
      isp: data.isp,
      ipAdress: data.ip,
      timezone: data.location.timezone,
    });
    setMarkerData({ lat: data.location.lat, lng: data.location.lng });
    setHasSearched(true);
    setViewport(newViewPort);
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
      {result.ipAdress && (
        <div className="result">
          <div className="result-item">
            <div className="result-title">IP ADRESS</div>
            <div className="result-text">{result.ipAdress}</div>
          </div>
          <div className="result-item">
            <div className="result-title">LOCATION</div>
            <div className="result-text">{result.location}</div>
          </div>
          <div className="result-item">
            <div className="result-title">TIMEZONE</div>
            <div className="result-text">{result.timezone}</div>
          </div>
          <div className="result-item">
            <div className="result-title">ISP</div>
            <div className="result-text">{result.isp}</div>
          </div>
        </div>
      )}
      <div className="mapid">
        <ReactMapGL
          {...viewport}
          mapboxApiAccessToken={process.env.REACT_APP_KEY}
          onViewportChange={(newPort) => {
            setViewport(newPort);
          }}
          mapStyle="mapbox://styles/halilfocic/ckpvdhjl40tef18q67obqvn6t"
        >
          {hasSearched && (
            <Marker latitude={markerData.lat} longitude={markerData.lng}>
              <img src={markerIcon} alt="markercic" width="30px" />
            </Marker>
          )}
        </ReactMapGL>
      </div>
    </div>
  );
};

export default GeoLocator;
