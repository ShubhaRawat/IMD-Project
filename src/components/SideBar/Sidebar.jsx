import PropTypes from "prop-types";
import RadiusFilter from "./utils/RadiusFilter";
import ElevationFilter from "./utils/ElevationFilter";
import TopologyFilter from "./utils/TopologyFilter";
import "../../styles/Sidebar.css";
import { useCallback } from "react";

const Sidebar = (props) => {
    const { sidebarOpen, selectedOptions, setSelectedOptions, onApply, onNext }  = props;
    
    const onChangeHandle = useCallback((e) => {
      const { name, value } = e.target;
      
      setSelectedOptions((prevSelectedOptions) => ({
          ...prevSelectedOptions,
          [name]: value,
      }));
  }, [setSelectedOptions]);
    
    return (
    <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
    <div className="sidebar-content">
      <h3>Radius (Km)</h3>
      <RadiusFilter name="radius" value={selectedOptions.radius} onChange={onChangeHandle} />

      <h3>Elevation</h3>
      <ElevationFilter name="elevation" value={selectedOptions.elevation} onChange={onChangeHandle} />

      <h3>Topologies</h3>
      <TopologyFilter name="topology" value={selectedOptions.topology} onChange={onChangeHandle} />

      <button className="apply-button" onClick={onApply}>
        Apply
      </button>

      <div className="selected-options">
        <h3>Selected Stations:</h3>
        {selectedOptions.stations.length === 0 ? (
          <p>No stations selected</p>
        ) : (
          <ul>
            {selectedOptions.stations.map((station, index) => (
              <li key={index}>{station}</li>
            ))}
          </ul>
        )}
      </div>

      <button className="next-button" onClick={onNext}>
        Next
      </button>
    </div>
  </div>
    )
}

Sidebar.propTypes = {
  sidebarOpen: PropTypes.bool.isRequired,
  selectedOptions: PropTypes.shape({
    radius: PropTypes.string.isRequired,
    elevation: PropTypes.string.isRequired,
    topology: PropTypes.string.isRequired,
    stations: PropTypes.arrayOf(PropTypes.string), 
  }).isRequired,
  setSelectedOptions: PropTypes.func.isRequired,
  onApply: PropTypes.func.isRequired,
}

export default Sidebar

