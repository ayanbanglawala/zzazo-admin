"use client"

import { useState } from "react"
import { Plus, Search, Filter, Edit, Trash2, Eye, MapPin, Clock, Users } from "lucide-react"

const RouteManagement = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  const routes = [
    {
      id: 1,
      name: "Route A",
      description: "Downtown Elementary Circuit",
      bus: "BUS-001",
      driver: "John Smith",
      students: 45,
      stops: 8,
      duration: "45 min",
      distance: "12.5 km",
      status: "active",
      startTime: "7:30 AM",
      endTime: "8:15 AM",
    },
    {
      id: 2,
      name: "Route B",
      description: "Westside Schools Route",
      bus: "BUS-002",
      driver: "Sarah Johnson",
      students: 38,
      stops: 6,
      duration: "35 min",
      distance: "9.8 km",
      status: "active",
      startTime: "7:45 AM",
      endTime: "8:20 AM",
    },
    {
      id: 3,
      name: "Route C",
      description: "Northside Express",
      bus: "BUS-003",
      driver: "Mike Wilson",
      students: 52,
      stops: 10,
      duration: "50 min",
      distance: "15.2 km",
      status: "maintenance",
      startTime: "7:15 AM",
      endTime: "8:05 AM",
    },
    {
      id: 4,
      name: "Route D",
      description: "Eastside Elementary",
      bus: "BUS-004",
      driver: "Emily Davis",
      students: 29,
      stops: 5,
      duration: "30 min",
      distance: "8.1 km",
      status: "active",
      startTime: "8:00 AM",
      endTime: "8:30 AM",
    },
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "maintenance":
        return "bg-yellow-100 text-yellow-800"
      case "inactive":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredRoutes = routes.filter((route) => {
    const matchesSearch =
      route.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      route.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      route.driver.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === "all" || route.status === filterStatus
    return matchesSearch && matchesFilter
  })

  return (
    <div className="space-y-6 animate-slide-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Route Management</h1>
          <p className="text-gray-600 mt-1">Manage bus routes and optimize transportation efficiency.</p>
        </div>
        <button className="mt-4 md:mt-0 bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-6 py-2 rounded-xl hover:shadow-lg transition-shadow flex items-center space-x-2">
          <Plus className="w-5 h-5" />
          <span>Create Route</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-xl">
              <MapPin className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Routes</p>
              <p className="text-2xl font-bold text-gray-900">12</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-xl">
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Students</p>
              <p className="text-2xl font-bold text-gray-900">485</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-xl">
              <Clock className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Avg Duration</p>
              <p className="text-2xl font-bold text-gray-900">42 min</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-xl">
              <MapPin className="w-6 h-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Distance</p>
              <p className="text-2xl font-bold text-gray-900">156 km</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search routes..."
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
              <option value="maintenance">Maintenance</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <span className="text-sm text-gray-600">{filteredRoutes.length} routes found</span>
          </div>
        </div>
      </div>

      {/* Route Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredRoutes.map((route) => (
          <div
            key={route.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">{route.name}</h3>
                <p className="text-gray-600 text-sm">{route.description}</p>
              </div>
              <span
                className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(route.status)}`}
              >
                {route.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">{route.students} students</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">{route.stops} stops</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">{route.duration}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">{route.distance}</span>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Bus:</span>
                <span className="text-sm text-gray-900">{route.bus}</span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Driver:</span>
                <span className="text-sm text-gray-900">{route.driver}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Schedule:</span>
                <span className="text-sm text-gray-900">
                  {route.startTime} - {route.endTime}
                </span>
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

export default RouteManagement
