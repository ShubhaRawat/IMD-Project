import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import Sidebar from "./components/SideBar/Sidebar"
import Header from "./components/Header"
import MapContainer from "./components/MapContainer"
import "./Home.css"



const Home = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedOptions, setSelectedOptions] = useState({
    radius: "20",
    elevation: "300-800",
    topology: "All",
    stations: [],
  })
  const [appliedOptions, setAppliedOptions] = useState(selectedOptions)
  const [isFiltered, setIsFiltered] = useState(false)
  const navigate = useNavigate()

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const handleApply = () => {
    setAppliedOptions(selectedOptions)
    setIsFiltered(true)
  }

  const handleNext = () => {
    navigate("/Prediction", { state: { stations: appliedOptions.stations || [] } })
  }

  return (
      <div className="home-container">
        <Header toggleSidebar={toggleSidebar} />
        <div className="main-content">
        <MapContainer sidebarOpen={sidebarOpen} selectedOptions={appliedOptions} setSelectedOptions={setSelectedOptions} isFiltered={isFiltered} />
          <Sidebar
            sidebarOpen={sidebarOpen}
            selectedOptions={selectedOptions}
            setSelectedOptions={setSelectedOptions}
            onApply={handleApply}
            onNext={handleNext}
          />
        </div>
      </div>
  )
}

export default Home

