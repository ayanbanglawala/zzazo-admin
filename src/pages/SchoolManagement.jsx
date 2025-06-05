"use client"

import { useState } from "react"
import { Plus, Search, Filter, Edit, Trash2, Eye, MapPin, Phone, Mail, Users } from "lucide-react"

const SchoolManagement = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")

  const schools = [
    {
      id: 1,
      name: "Main Street Elementary",
      type: "Elementary",
      address: "123 Main Street, Downtown",
      phone: "+1 234-567-8901",
      email: "admin@mainstreet.edu",
      principal: "Dr. Sarah Wilson",
      students: 485,
      routes: ["Route A", "Route B"],
      status: "active",
    },
    {
      id: 2,
      name: "Pine Road Elementary",
      type: "Elementary",
      address: "456 Pine Road, Westside",
      phone: "+1 234-567-8902",
      email: "office@pineroad.edu",
      principal: "Mr. John Davis",
      students: 320,
      routes: ["Route C"],
      status: "active",
    },
    {
      id: 3,
      name: "Cedar Lane Middle School",
      type: "Middle School",
      address: "789 Cedar Lane, Northside",
      phone: "+1 234-567-8903",
      email: "info@cedarlane.edu",
      principal: "Ms. Emily Johnson",
      students: 650,
      routes: ["Route A", "Route D"],
      status: "active",
    },
    {
      id: 4,
      name: "Oakwood High School",
      type: "High School",
      address: "321 Oak Avenue, Eastside",
      phone: "+1 234-567-8904",
      email: "contact@oakwood.edu",
      principal: "Dr. Michael Brown",
      students: 1200,
      routes: ["Route B", "Route C", "Route E"],
      status: "active",
    },
  ]

  const getTypeColor = (type) => {
    switch (type) {
      case "Elementary":
        return "bg-blue-100 text-blue-800"
      case "Middle School":
        return "bg-green-100 text-green-800"
      case "High School":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredSchools = schools.filter((school) => {
    const matchesSearch =
      school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      school.principal.toLowerCase().includes(searchTerm.toLowerCase()) ||
      school.address.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterType === "all" || school.type === filterType
    return matchesSearch && matchesFilter
  })

  return (
    <div className="space-y-6 animate-slide-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">School Management</h1>
          <p className="text-gray-600 mt-1">Manage schools and their transportation requirements.</p>
        </div>
        <button className="mt-4 md:mt-0 bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-6 py-2 rounded-xl hover:shadow-lg transition-shadow flex items-center space-x-2">
          <Plus className="w-5 h-5" />
          <span>Add School</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-xl">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Schools</p>
              <p className="text-2xl font-bold text-gray-900">15</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-xl">
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Elementary</p>
              <p className="text-2xl font-bold text-gray-900">8</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-xl">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Middle Schools</p>
              <p className="text-2xl font-bold text-gray-900">4</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-xl">
              <Users className="w-6 h-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">High Schools</p>
              <p className="text-2xl font-bold text-gray-900">3</p>
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
                placeholder="Search schools..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full md:w-80 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Types</option>
              <option value="Elementary">Elementary</option>
              <option value="Middle School">Middle School</option>
              <option value="High School">High School</option>
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <span className="text-sm text-gray-600">{filteredSchools.length} schools found</span>
          </div>
        </div>
      </div>

      {/* School Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredSchools.map((school) => (
          <div
            key={school.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 mb-1">{school.name}</h3>
                <span
                  className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getTypeColor(school.type)}`}
                >
                  {school.type}
                </span>
              </div>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>{school.address}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Phone className="w-4 h-4" />
                <span>{school.phone}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Mail className="w-4 h-4" />
                <span>{school.email}</span>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Principal:</span>
                <span className="text-sm text-gray-900">{school.principal}</span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Students:</span>
                <span className="text-sm text-gray-900">{school.students.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Routes:</span>
                <div className="flex space-x-1">
                  {school.routes.map((route, index) => (
                    <span key={index} className="inline-flex px-2 py-1 text-xs bg-primary-100 text-primary-800 rounded">
                      {route}
                    </span>
                  ))}
                </div>
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

export default SchoolManagement
