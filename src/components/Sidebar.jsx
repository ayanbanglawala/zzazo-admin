"use client"
import { Link, useLocation } from "react-router-dom"
import { LayoutDashboard, Bus, Users, GraduationCap, Map, School, MapPin, FileText, Settings, X } from "lucide-react"

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation()

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/" },
    // { icon: Bus, label: "Bus Management", path: "/buses" },
    { icon: Users, label: "Driver Management", path: "/drivers" },
    // { icon: GraduationCap, label: "Student Management", path: "/students" },
    // { icon: Map, label: "Route Management", path: "/routes" },
    { icon: School, label: "School Management", path: "/schools" },
    { icon: Users, label: "Add Students", path: "/addStudents" },
    // { icon: MapPin, label: "Live Tracking", path: "/tracking" },
    // { icon: FileText, label: "Reports", path: "/reports" },
    // { icon: FileText, label: "School List", path: "/schoollist" },
    // { icon: Settings, label: "Settings", path: "/settings" },
  ]

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && <div className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden" onClick={onClose} />}

      {/* Sidebar */}
      <div
        className={`
        fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:inset-0
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        {/* Logo */}
        <div className="flex items-center justify-between h-16 px-6 gradient-primary">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-white rounded-xl flex items-center justify-center">
              <Bus className="w-5 h-5 text-secondary-500" />
            </div>
            <span className="text-xl font-bold text-white">ZZAZO</span>
          </div>
          <button onClick={onClose} className="lg:hidden text-white hover:text-gray-200">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-8 px-4">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.path

              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    onClick={onClose}
                    className={`
                      flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors duration-200
                      ${
                        isActive
                          ? "bg-primary-100 text-primary-700 border-r-4 border-primary-500"
                          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                      }
                    `}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-0">
          <div className="bg-gradient-to-r text-secondary-500 bg-primary-500 rounded-xl p-4 text-center">
            <p className="text-sm font-bold">ZZAZO Admin Panel</p>
            <p className="text-xs opacity-80 font-bold">Version 1.0.0</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Sidebar
