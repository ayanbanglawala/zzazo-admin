"use client"

import { useState } from "react"
import { Plus, Search, Filter, Edit, Trash2, Eye, Phone, Mail } from "lucide-react"

const DriverManagement = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  const drivers = [
    {
      id: 1,
      name: "John Smith",
      phone: "+1 234-567-8901",
      email: "john@zzazo.com",
      license: "DL123456789",
      bus: "BUS-001",
      route: "Route A",
      status: "active",
      experience: "5 years",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      phone: "+1 234-567-8902",
      email: "sarah@zzazo.com",
      license: "DL987654321",
      bus: "BUS-002",
      route: "Route B",
      status: "active",
      experience: "3 years",
    },
    {
      id: 3,
      name: "Mike Wilson",
      phone: "+1 234-567-8903",
      email: "mike@zzazo.com",
      license: "DL456789123",
      bus: "BUS-003",
      route: "Route C",
      status: "on_leave",
      experience: "7 years",
    },
    {
      id: 4,
      name: "Emily Davis",
      phone: "+1 234-567-8904",
      email: "emily@zzazo.com",
      license: "DL789123456",
      bus: "BUS-004",
      route: "Route D",
      status: "active",
      experience: "2 years",
    },
  ]

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

  const filteredDrivers = drivers.filter((driver) => {
    const matchesSearch =
      driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      driver.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      driver.phone.includes(searchTerm)
    const matchesFilter = filterStatus === "all" || driver.status === filterStatus
    return matchesSearch && matchesFilter
  })

  return (
    <div className="space-y-6 animate-slide-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Driver Management</h1>
          <p className="text-gray-600 mt-1">Manage your bus drivers and their assignments.</p>
        </div>
        <button className="mt-4 md:mt-0 bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-6 py-2 rounded-xl hover:shadow-lg transition-shadow flex items-center space-x-2">
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

      {/* Driver Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDrivers.map((driver) => (
          <div
            key={driver.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white font-semibold">
                  {driver.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{driver.name}</h3>
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(driver.status)}`}
                  >
                    {driver.status.replace("_", " ")}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Phone className="w-4 h-4" />
                <span>{driver.phone}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Mail className="w-4 h-4" />
                <span>{driver.email}</span>
              </div>
              <div className="text-sm text-gray-600">
                <span className="font-medium">License:</span> {driver.license}
              </div>
              <div className="text-sm text-gray-600">
                <span className="font-medium">Bus:</span> {driver.bus}
              </div>
              <div className="text-sm text-gray-600">
                <span className="font-medium">Route:</span> {driver.route}
              </div>
              <div className="text-sm text-gray-600">
                <span className="font-medium">Experience:</span> {driver.experience}
              </div>
            </div>

            <div className="flex justify-end space-x-2 mt-4 pt-4 border-t border-gray-200">
              <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-xl">
                <Eye className="w-4 h-4" />
              </button>
              <button className="p-2 text-green-600 hover:bg-green-50 rounded-xl">
                <Edit className="w-4 h-4" />
              </button>
              <button className="p-2 text-red-600 hover:bg-red-50 rounded-xl">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DriverManagement
