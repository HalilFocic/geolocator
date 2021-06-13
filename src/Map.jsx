import React, { useState } from "react";
import ReactMapGL, { Marker } from "react-map-gl";
const Map = () => {
  const [viewport, setViewport] = useState({
    latitude: 45.4211,
    longitude: -75.6903,
    width: "100vw",
    height: "70vh",
    zoom: 10,
  });
  return (
    <>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_KEY}
        onViewportChange={(viewport) => {
          setViewport(viewport);
        }}
      >
        <Marker latitude={viewport.latitude} longitude={viewport.longitude}>
          {" "}
          PIZDUN
        </Marker>
      </ReactMapGL>
    </>
  );
};

export default Map;
