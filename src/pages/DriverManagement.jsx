"use client"

import { useEffect, useState } from "react"
import { Plus, Search, Filter, Edit, Trash2, Eye } from "lucide-react"
import axios from "axios"

const DriverManagement = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [drivers, setDrivers] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false) // ✅ Added missing state

  //post aip
const [newDriver, setNewDriver] = useState({
  name: "",
  shift: "",
  email: "",
  mobile: ""
})
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4Mzg2OWYyNmE5NDI5ODk1Y2QxN2ExNyIsInJvbGUiOiJTQ0hPT0xfQURNSU4iLCJpYXQiOjE3NDk3OTU4MzUsImV4cCI6MTc1MDQwMDYzNX0.13Pap9O4pK96K_2kF0O50EOm7X1ksjJA9xOKqiYVzxE"

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const params = new URLSearchParams({
          page: 1,
          limit: 10,
          role: "DRIVER",
          search: searchTerm || "",
          status: filterStatus !== "all" ? filterStatus : "",
        })

        const response = await axios.get(
          `http://145.223.20.218:2002/api/user/getuserByschool/683869f26a9429895cd17a15?${params.toString()}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )

        const data = response.data?.data
        if (Array.isArray(data)) {
          setDrivers(data)
        } else if (Array.isArray(data?.users)) {
          setDrivers(data.users)
        } else {
          setDrivers([])
        }
      } catch (error) {
        console.error("Failed to fetch drivers:", error)
        setDrivers([])
      }
    }

    fetchDrivers()
  }, [searchTerm, filterStatus])

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "on_leave":
        return "bg-yellow-100 text-yellow-800"
      case "inactive":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredDrivers = Array.isArray(drivers)
    ? drivers.filter((driver) => {
      const matchesSearch =
        driver.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        driver.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        driver.phone?.includes(searchTerm)

      const matchesFilter = filterStatus === "all" || driver.status === filterStatus

      return matchesSearch && matchesFilter
    })
    : []

  const registerSchool = async (schoolData) => {
    // Placeholder - implement actual API call if needed
    console.log("Registering new school", schoolData)
    alert("School registered (mock)")
  }


  const registerDriver = async (driverData) => {
  try {
    const response = await axios.post(
      "http://145.223.20.218:2002/api/user/add-driver/684a819ea8c7f1bdd04732f8",
      driverData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      }
    )
    alert("Driver added successfully!")
    return response.data
  } catch (error) {
    console.error("Failed to add driver:", error)
    throw error
  }
}


  return (
    <div className="space-y-6 animate-slide-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Driver Management</h1>
          <p className="text-gray-600 mt-1">Manage your bus drivers and their assignments.</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="mt-4 md:mt-0 bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-6 py-2 rounded-xl hover:shadow-lg transition-shadow flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Add Driver</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search drivers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full md:w-80 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="on_leave">On Leave</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <span className="text-sm text-gray-600">{filteredDrivers.length} drivers found</span>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-center">Sr. No</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-center">Name</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-center">Phone</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-center">Email</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-center">Shift</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-center">Bus</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-center">Route</th>
                {/* <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-center">Experience</th> */}
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-center">Status</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredDrivers.map((driver, index) => (
                <tr key={driver.id || index} className="hover:bg-gray-50 text-center">
                  <td className="px-6 py-4 text-sm text-gray-900">{index + 1}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{driver.name || "N/A"}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{driver.mobile || "N/A"}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{driver.email || "N/A"}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{driver.shift || "N/A"}</td>
                  {/* <td className="px-6 py-4 text-sm text-gray-900">{driver.bus || "N/A"}</td> */}
                  <td className="px-6 py-4 text-sm text-gray-900">{driver.route || "N/A"}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{driver.experience || "N/A"}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(driver.isActive ? "active" : "inactive")}`}>
                      {driver.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2 justify-center">
                      <button className="text-blue-600 hover:text-blue-900"><Eye className="w-4 h-4" /></button>
                      <button className="text-green-600 hover:text-green-900"><Edit className="w-4 h-4" /></button>
                      <button className="text-red-600 hover:text-red-900"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
   {isModalOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center !mt-0">
    <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
      <h2 className="text-xl font-semibold mb-4">Add New Driver</h2>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Name"
          value={newDriver.name}
          onChange={(e) => setNewDriver({ ...newDriver, name: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <input
          type="text"
          placeholder="Shift (e.g. Morning)"
          value={newDriver.shift}
          onChange={(e) => setNewDriver({ ...newDriver, shift: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <input
          type="email"
          placeholder="Email"
          value={newDriver.email}
          onChange={(e) => setNewDriver({ ...newDriver, email: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <input
          type="text"
          placeholder="Mobile"
          value={newDriver.mobile}
          onChange={(e) => setNewDriver({ ...newDriver, mobile: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>
      <div className="mt-6 flex justify-end space-x-3">
        <button
          onClick={() => setIsModalOpen(false)}
          className="px-4 py-2 border rounded-lg"
        >
          Cancel
        </button>
        <button
          onClick={async () => {
            try {
              await registerDriver(newDriver)
              setIsModalOpen(false)
              setNewDriver({ name: "", shift: "", email: "", mobile: "" })
            } catch {
              alert("Failed to add driver.")
            }
          }}
          className="px-4 py-2 bg-primary-500 text-white rounded-lg"
        >
          Add Driver
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  )
}

export default DriverManagement
