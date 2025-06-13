import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Layout from "./components/Layout"
import Dashboard from "./pages/Dashboard"
import BusManagement from "./pages/BusManagement"
import DriverManagement from "./pages/DriverManagement"
import StudentManagement from "./pages/StudentManagement"
import RouteManagement from "./pages/RouteManagement"
import SchoolManagement from "./pages/SchoolManagement"
import LiveTracking from "./pages/LiveTracking"
import Reports from "./pages/Reports"
import Settings from "./pages/Settings"
import Login from "./pages/Login"
import TEST from "./pages/TEST"
import "./index.css"
import SchoolList from "./pages/SchoolList"
import AddStudents from "./pages/AddStudents"
import ConductorManagement from "./pages/ConductorManagement"
import Changepassword from "./pages/Changepassword"
import Profile from "./pages/Profile"

// 145.223.20.218:2002/api

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="buses" element={<BusManagement />} />
          <Route path="drivers" element={<DriverManagement />} />
          <Route path="conductor" element={<ConductorManagement />} />
          <Route path="students" element={<StudentManagement />} />
          <Route path="routes" element={<RouteManagement />} />
          <Route path="schools" element={<SchoolManagement />} />
          <Route path="addStudents" element={<AddStudents />} />
          <Route path="tracking" element={<LiveTracking />} />
          <Route path="reports" element={<Reports />} />
          <Route path="schoollist" element={<SchoolList />} />
          <Route path="settings" element={<Settings />} />
          <Route path="changepassword" element={<Changepassword />} />
          <Route path="profile" element={<Profile />} />
          <Route path="TEST" element={<TEST />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
