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
    width: "100vw",
    height: "70vh",
    zoom: 10,
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
    let newViewPort = { ...viewport };
    newViewPort.latitude = data.location.lat;
    newViewPort.longitude = data.location.lng;
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
      <div>
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
