import "./App.css";
import React, { useState, useEffect } from "react";
import LineChart from "./components/LineChart";
import MapView from "./components/MapView";

function App() {
  const [countryInfo, setCountryInfo] = useState({});
  const mapCenter = { lat: 34.80746, lng: -40.4796 };
  const [mapCountries, setMapCountries] = useState([]);

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          setMapCountries(data);
        });
    };
    getCountriesData();
  }, []);

  return (
    <div className="App">
      <div className="chartContainer">
        <div className="chart">
          <LineChart />
        </div>
      </div>
      <h2 class="mapHeader">Covid Map View</h2>
      <div className="map">
        <MapView countries={mapCountries} center={mapCenter} />
      </div>
    </div>
  );
}

export default App;
