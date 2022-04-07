import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "./map.css";
import { showDataOnMap } from "./util";

function MapView({ countries, center }) {
  return (
    <MapContainer center={center} zoom={3}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='$copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {showDataOnMap(countries, "cases")}
    </MapContainer>
  );
}

export default MapView;
