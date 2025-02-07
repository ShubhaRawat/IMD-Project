import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "./components/Header";
import PredictionMap from "./components/PredictionMap";
import "./Prediction.css";

const Prediction = () => {
  const { state } = useLocation();
  const { stations } = state || {};

  // 🔍 Debugging: Check if state exists
  useEffect(() => {
    console.log("Prediction.jsx Mounted!");
    console.log("State received from Home:", state);
    console.log("Stations data:", stations);
  }, [state]);

  return (
    <div className="prediction-container">
      <Header showSidebarToggle={false} />
      <div className="main-content">
        <PredictionMap selectedStations={stations} />
      </div>
    </div>
  );
};

export default Prediction;
