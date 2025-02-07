import { useState, useEffect } from "react";
import { GoogleMap, Marker, Polyline, useLoadScript } from "@react-google-maps/api";
import TopologyConstants from "../constants/TopologyConstants"; // ✅ Fixed Import

const PredictionMap = ({ selectedStations }) => {
  const { isLoaded } = useLoadScript({ googleMapsApiKey: "YOUR_GOOGLE_MAPS_API_KEY" });

  const [selectedTopology, setSelectedTopology] = useState(null);
  const [radius, setRadius] = useState(0);
  const [elevation, setElevation] = useState(0);
  const [filteredStations, setFilteredStations] = useState([]);
  const [lines, setLines] = useState([]);

  // Function to calculate the distance between two points (Haversine Formula)
  const getDistance = (lat1, lng1, lat2, lng2) => {
    const R = 6371; // Radius of Earth in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLng = ((lng2 - lng1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
  };

  // Handle filtering locations based on user input
  useEffect(() => {
    if (!selectedTopology || radius <= 0) return;

    console.log("Selected Topology:", selectedTopology);
    console.log("Radius:", radius);
    console.log("Elevation:", elevation);

    const filtered = Object.entries(AWSLocations).filter(([name, data]) => {
      return data.elevation >= elevation;
    });

    console.log("Filtered Stations:", filtered.map(([name]) => name));

    setFilteredStations(filtered.map(([name, data]) => ({ name, ...data })));
  }, [selectedTopology, radius, elevation]);

  // Generate polyline connections
  useEffect(() => {
    if (filteredStations.length < 2) return;

    const newLines = [];
    for (let i = 0; i < filteredStations.length - 1; i++) {
      for (let j = i + 1; j < filteredStations.length; j++) {
        if (getDistance(filteredStations[i].lat, filteredStations[i].lng, filteredStations[j].lat, filteredStations[j].lng) <= radius) {
          newLines.push([
            { lat: filteredStations[i].lat, lng: filteredStations[i].lng },
            { lat: filteredStations[j].lat, lng: filteredStations[j].lng }
          ]);
        }
      }
    }

    console.log("Generated Lines:", newLines);
    setLines(newLines);
  }, [filteredStations, radius]);

  if (!isLoaded) return <div>Loading Map...</div>;

  return (
    <div className="map-container">
      <div className="controls">
        <label>Radius (km):</label>
        <input type="number" value={radius} onChange={(e) => setRadius(Number(e.target.value))} />
        
        <label>Elevation (m):</label>
        <input type="number" value={elevation} onChange={(e) => setElevation(Number(e.target.value))} />

        <label>Topology:</label>
        <select onChange={(e) => setSelectedTopology(e.target.value)} value={selectedTopology || ""}>
          <option value="">Select Topology</option>
          {Object.values(TopologyConstants).map((topology) => (
            <option key={topology} value={topology}>{topology}</option>
          ))}
        </select>
      </div>

      <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={10}>
        {filteredStations.map((station, index) => (
          <Marker key={index} position={{ lat: station.lat, lng: station.lng }} label={station.name} />
        ))}

        {lines.map((path, index) => (
          <Polyline key={index} path={path} options={{ strokeColor: "#FF0000", strokeWeight: 2 }} />
        ))}
      </GoogleMap>
    </div>
  );
};

export default PredictionMap;
