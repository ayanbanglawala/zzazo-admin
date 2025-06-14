"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { Plus, Search, Filter, Edit, Trash2, Eye, Users, ChevronLeft, ChevronRight, Upload } from "lucide-react"

const AddStudents = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  const [newStudent, setNewStudent] = useState({
    firstName: "",
    lastName: "",
    class: "",
    section: "",
    rollNumber: "",
    dob: "",
    shift: "",
    bloodGroup: "",
    fatherName: "",
    motherName: "",
    fatherContact: "",
    motherContact: "",
    address: "",
    city: "",
    pincode: "",
    email: "",
  })

  const [editingStudent, setEditingStudent] = useState({
    _id: "",
    firstName: "",
    lastName: "",
    class: "",
    section: "",
    rollNumber: "",
    dob: "",
    shift: "",
    bloodGroup: "",
    fatherName: "",
    motherName: "",
    fatherContact: "",
    motherContact: "",
    address: "",
    city: "",
    pincode: "",
    email: "",
  })

  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalStudents, setTotalStudents] = useState(0)
  const [limit, setLimit] = useState(10)

  // Excel upload states
  const [isExcelModalOpen, setIsExcelModalOpen] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadStatus, setUploadStatus] = useState(null)

  const token = localStorage.getItem("token")

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(
          `http://145.223.20.218:2002/api/user/getuserByschool/684a819ea8c7f1bdd04732f8?page=${currentPage}&limit=${limit}&search=${searchTerm}&role=PARENT`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        setStudents(response.data.data.users)
        console.log(response.data.data.users)

        setTotalPages(response.data.data.totalPages)
        setTotalStudents(response.data.data.total)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching students:", error)
        setLoading(false)
      }
    }

    fetchStudents()
  }, [currentPage, limit, searchTerm])

  const registerStudent = async (studentData) => {
    try {
      // Structure the data according to API requirements
      const apiData = {
        parentData: {
          firstName: studentData.fatherName,
          lastName: studentData.lastName,
          email: studentData.email,
          dob: studentData.dob, // You might want to use parent's DOB here
          fatherName: studentData.fatherName,
          motherName: studentData.motherName,
          fatherMobile: studentData.fatherContact,
          motherMobile: studentData.motherContact,
          address: studentData.address,
          pinCode: studentData.pincode,
          shift: studentData.shift,
        },
        studentData: {
          firstName: studentData.firstName,
          lastName: studentData.lastName,
          dob: studentData.dob,
          class: studentData.class,
          section: studentData.section,
          rollNumber: studentData.rollNumber,
          shift: studentData.shift,
          bloodGroup: studentData.bloodGroup,
          isActive: true,
        },
      }

      const response = await axios.post(
        "http://145.223.20.218:2002/api/student/add-student/684a819ea8c7f1bdd04732f8",
        apiData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      )

      // Refresh the students list after adding a new one
      const studentsResponse = await axios.get(
        `http://145.223.20.218:2002/api/user/getuserByschool/684a819ea8c7f1bdd04732f8?page=${currentPage}&limit=${limit}&search=${searchTerm}&role=PARENT`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      setStudents(studentsResponse.data.data.users)
      setTotalPages(studentsResponse.data.data.totalPages)
      setTotalStudents(studentsResponse.data.data.total)

      return response.data
    } catch (error) {
      console.error("Error adding student:", error)
      throw error
    }
  }

  const fetchStudentDetails = async (studentId) => {
    try {
      const response = await axios.get(`http://145.223.20.218:2002/api/student/get/${studentId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return response.data.data
    } catch (error) {
      console.error("Error fetching student details:", error)
      throw error
    }
  }

  const updateStudent = async (studentId, studentData) => {
    try {
      const response = await axios.put(`http://145.223.20.218:2002/api/student/update/${studentId}`, studentData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })

      // Refresh the students list after updating
      const studentsResponse = await axios.get(
        `http://145.223.20.218:2002/api/user/getuserByschool/684a819ea8c7f1bdd04732f8?page=${currentPage}&limit=${limit}&search=${searchTerm}&role=PARENT`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      setStudents(studentsResponse.data.data.users)
      setTotalPages(studentsResponse.data.data.totalPages)
      setTotalStudents(studentsResponse.data.data.total)

      return response.data
    } catch (error) {
      console.error("Error updating student:", error)
      throw error
    }
  }

  const deleteStudent = async (studentId) => {
    try {
      await axios.delete(`http://145.223.20.218:2002/api/student/delete/${studentId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      // Refresh the students list after deleting
      const studentsResponse = await axios.get(
        `http://145.223.20.218:2002/api/user/getuserByschool/684a819ea8c7f1bdd04732f8?page=${currentPage}&limit=${limit}&search=${searchTerm}&role=PARENT`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      setStudents(studentsResponse.data.data.users)
      setTotalPages(studentsResponse.data.data.totalPages)
      setTotalStudents(studentsResponse.data.data.total)
    } catch (error) {
      console.error("Error deleting student:", error)
      throw error
    }
  }

  const handleEditClick = async (studentId) => {
    try {
      const studentDetails = await fetchStudentDetails(studentId)
      setEditingStudent(studentDetails)
      setIsEditModalOpen(true)
    } catch (error) {
      console.error("Error preparing edit:", error)
      alert("Failed to load student details for editing.")
    }
  }

  const handleToggleStatus = async (studentId, currentStatus) => {
    try {
      // Update the student status locally first for immediate UI feedback
      setStudents((prevStudents) =>
        prevStudents.map((student) => (student._id === studentId ? { ...student, isActive: !currentStatus } : student)),
      )

      // Here you would make an API call to update the status
      // await updateStudent(studentId, { isActive: !currentStatus });
    } catch (error) {
      // Revert the local change if API call fails
      setStudents((prevStudents) =>
        prevStudents.map((student) => (student._id === studentId ? { ...student, isActive: currentStatus } : student)),
      )
      console.error("Error updating student status:", error)
      alert("Failed to update student status.")
    }
  }

  const getStatusColor = (status) => {
    return status ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
  }

  const filteredStudents = students.filter((student) => {
    if (!student) return false

    const matchesSearch =
      (student.firstName?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (student.lastName?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (student.class?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      student.rollNumber?.toString().includes(searchTerm)

    return matchesSearch
  })

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage)
    }
  }

  const handleLimitChange = (e) => {
    setLimit(Number(e.target.value))
    setCurrentPage(1)
  }

  const handleExcelUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file first")
      return
    }

    const formData = new FormData()
    formData.append("file", selectedFile)

    try {
      setUploadStatus(null)
      setUploadProgress(0)

      const response = await axios.post(
        "http://145.223.20.218:2002/api/student/excel-upload/684a819ea8c7f1bdd04732f8",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            setUploadProgress(percentCompleted)
          },
        },
      )

      setUploadStatus("success")
      // Refresh students list after successful upload
      const studentsResponse = await axios.get(
        `http://145.223.20.218:2002/api/user/getuserByschool/684a819ea8c7f1bdd04732f8?page=${currentPage}&limit=${limit}&search=${searchTerm}&role=PARENT`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      setStudents(studentsResponse.data.data.users)

      // Reset after 3 seconds
      setTimeout(() => {
        setIsExcelModalOpen(false)
        setSelectedFile(null)
        setUploadProgress(0)
        setUploadStatus(null)
      }, 3000)
    } catch (error) {
      console.error("Error uploading file:", error)
      setUploadStatus("error")
    }
  }

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  return (
    <div className="space-y-6 animate-slide-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Student Management</h1>
          <p className="text-gray-600 mt-1">Manage student records and information.</p>
        </div>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <button
            onClick={() => setIsExcelModalOpen(true)}
            className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-2 rounded-xl hover:scale-105 transition-all duration-300 flex items-center space-x-2"
          >
            <Upload className="w-5 h-5" />
            <span>Upload Excel</span>
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-6 py-2 rounded-xl hover:scale-105 transition-all duration-300 flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Add Student</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Total Students", count: totalStudents, color: "blue" },
          { label: "Active Students", count: students.filter((s) => s.isActive).length, color: "green" },
          { label: "Inactive Students", count: students.filter((s) => !s.isActive).length, color: "red" },
        ].map((card, i) => (
          <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="flex items-center">
              <div className={`p-2 bg-${card.color}-100 rounded-xl`}>
                <Users className={`w-6 h-6 text-${card.color}-600`} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{card.label}</p>
                <p className="text-2xl font-bold text-gray-900">{card.count}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                setCurrentPage(1)
              }}
              className="pl-10 pr-4 py-2 w-full md:w-96 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Filter className="w-5 h-5 text-gray-400" />
          <span className="text-sm text-gray-600">{filteredStudents.length} students found</span>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto max-w-full">
          <table className="w-full min-w-max">
            <thead className="bg-gray-50 border-b border-gray-200 sticky top-0">
              <tr>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-center min-w-[80px]">
                  Sr. No
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-center min-w-[80px]">
                  Shift
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-center min-w-[150px]">
                  Father Name
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-center min-w-[120px]">
                  Father Contact
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-center min-w-[150px]">
                  Mother Name
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-center min-w-[120px]">
                  Mother Contact
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-center min-w-[250px]">
                  Address
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-center min-w-[120px]">
                  Pin Code
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-center min-w-[200px]">
                  E-Mail
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-center">
                  Change Status
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-center min-w-[80px]">
                  Status
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-center min-w-[120px]">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredStudents.map((student, index) => (
                <tr key={student._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                    {(currentPage - 1) * limit + index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">{student.shift}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                    {student.fatherName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                    {student.fatherMobile}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                    {student.motherName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                    {student.motherMobile}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">{student.address}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">{student.pinCode}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">{student.email}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-center">
                    <button
                      onClick={() => handleToggleStatus(student._id, student.isActive)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        student.isActive ? "bg-green-600" : "bg-gray-300"
                      }`}
                      title="Click to toggle status"
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          student.isActive ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-center">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(student.isActive)}`}
                    >
                      {student.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2 justify-center">
                      <button className="text-blue-600 hover:text-blue-900">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleEditClick(student._id)}
                        className="text-green-600 hover:text-green-900"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={async () => {
                          if (window.confirm("Are you sure you want to delete this student?")) {
                            try {
                              await deleteStudent(student._id)
                            } catch (error) {
                              alert("Failed to delete student.")
                            }
                          }
                        }}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">Rows per page:</span>
          <select
            value={limit}
            onChange={handleLimitChange}
            className="border border-gray-300 rounded-md px-2 py-1 text-sm"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600">
            Showing {(currentPage - 1) * limit + 1} to {Math.min(currentPage * limit, totalStudents)} of {totalStudents}{" "}
            entries
          </span>
          <div className="flex space-x-1">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`p-1 rounded-md ${currentPage === 1 ? "text-gray-400 cursor-not-allowed" : "text-gray-700 hover:bg-gray-100"}`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum
              if (totalPages <= 5) {
                pageNum = i + 1
              } else if (currentPage <= 3) {
                pageNum = i + 1
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i
              } else {
                pageNum = currentPage - 2 + i
              }
              return (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  className={`w-8 h-8 rounded-md ${currentPage === pageNum ? "bg-primary-500 text-white" : "text-gray-700 hover:bg-gray-100"}`}
                >
                  {pageNum}
                </button>
              )
            })}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`p-1 rounded-md ${currentPage === totalPages ? "text-gray-400 cursor-not-allowed" : "text-gray-700 hover:bg-gray-100"}`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Add Student Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center !mt-0">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4">Add New Student</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                <input
                  type="text"
                  placeholder="First Name"
                  value={newStudent.firstName}
                  onChange={(e) => setNewStudent({ ...newStudent, firstName: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <input
                  type="text"
                  placeholder="Last Name"
                  value={newStudent.lastName}
                  onChange={(e) => setNewStudent({ ...newStudent, lastName: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Class</label>
                <input
                  type="text"
                  placeholder="Class"
                  value={newStudent.class}
                  onChange={(e) => setNewStudent({ ...newStudent, class: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Section</label>
                <input
                  type="text"
                  placeholder="Section"
                  value={newStudent.section}
                  onChange={(e) => setNewStudent({ ...newStudent, section: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Roll Number</label>
                <input
                  type="text"
                  placeholder="Roll Number"
                  value={newStudent.rollNumber}
                  onChange={(e) => setNewStudent({ ...newStudent, rollNumber: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                <input
                  type="date"
                  placeholder="DOB"
                  value={newStudent.dob}
                  onChange={(e) => setNewStudent({ ...newStudent, dob: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Shift</label>
                <select
                  value={newStudent.shift}
                  onChange={(e) => setNewStudent({ ...newStudent, shift: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="">Select Shift</option>
                  <option value="Morning">Morning</option>
                  <option value="Afternoon">Afternoon</option>
                  <option value="Evening">Evening</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Blood Group</label>
                <select
                  value={newStudent.bloodGroup}
                  onChange={(e) => setNewStudent({ ...newStudent, bloodGroup: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="">Select Blood Group</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Father's Name</label>
                <input
                  type="text"
                  placeholder="Father's Name"
                  value={newStudent.fatherName}
                  onChange={(e) => setNewStudent({ ...newStudent, fatherName: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mother's Name</label>
                <input
                  type="text"
                  placeholder="Mother's Name"
                  value={newStudent.motherName}
                  onChange={(e) => setNewStudent({ ...newStudent, motherName: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Father's Contact</label>
                <input
                  type="tel"
                  placeholder="Father's Contact"
                  value={newStudent.fatherContact}
                  onChange={(e) => setNewStudent({ ...newStudent, fatherContact: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mother's Contact</label>
                <input
                  type="tel"
                  placeholder="Mother's Contact"
                  value={newStudent.motherContact}
                  onChange={(e) => setNewStudent({ ...newStudent, motherContact: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <input
                  type="text"
                  placeholder="Address"
                  value={newStudent.address}
                  onChange={(e) => setNewStudent({ ...newStudent, address: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                <input
                  type="text"
                  placeholder="City"
                  value={newStudent.city}
                  onChange={(e) => setNewStudent({ ...newStudent, city: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Pincode</label>
                <input
                  type="text"
                  placeholder="Pincode"
                  value={newStudent.pincode}
                  onChange={(e) => setNewStudent({ ...newStudent, pincode: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  placeholder="Email"
                  value={newStudent.email}
                  onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  try {
                    await registerStudent(newStudent)
                    setIsModalOpen(false)
                    setNewStudent({
                      firstName: "",
                      lastName: "",
                      class: "",
                      section: "",
                      rollNumber: "",
                      dob: "",
                      shift: "",
                      bloodGroup: "",
                      fatherName: "",
                      motherName: "",
                      fatherContact: "",
                      motherContact: "",
                      address: "",
                      city: "",
                      pincode: "",
                      email: "",
                    })
                    alert("Student added successfully!")
                  } catch (error) {
                    alert("Failed to add student. Please check all required fields.")
                  }
                }}
                className="px-4 py-2 rounded-lg bg-primary-500 text-white hover:bg-primary-600"
              >
                Add Student
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Student Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center !mt-0">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4">Edit Student</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                <input
                  type="text"
                  placeholder="First Name"
                  value={editingStudent.firstName}
                  onChange={(e) => setEditingStudent({ ...editingStudent, firstName: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <input
                  type="text"
                  placeholder="Last Name"
                  value={editingStudent.lastName}
                  onChange={(e) => setEditingStudent({ ...editingStudent, lastName: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Class</label>
                <input
                  type="text"
                  placeholder="Class"
                  value={editingStudent.class}
                  onChange={(e) => setEditingStudent({ ...editingStudent, class: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Section</label>
                <input
                  type="text"
                  placeholder="Section"
                  value={editingStudent.section}
                  onChange={(e) => setEditingStudent({ ...editingStudent, section: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Roll Number</label>
                <input
                  type="text"
                  placeholder="Roll Number"
                  value={editingStudent.rollNumber}
                  onChange={(e) => setEditingStudent({ ...editingStudent, rollNumber: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                <input
                  type="date"
                  placeholder="DOB"
                  value={editingStudent.dob}
                  onChange={(e) => setEditingStudent({ ...editingStudent, dob: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Shift</label>
                <select
                  value={editingStudent.shift}
                  onChange={(e) => setEditingStudent({ ...editingStudent, shift: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="">Select Shift</option>
                  <option value="Morning">Morning</option>
                  <option value="Afternoon">Afternoon</option>
                  <option value="Evening">Evening</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Blood Group</label>
                <select
                  value={editingStudent.bloodGroup}
                  onChange={(e) => setEditingStudent({ ...editingStudent, bloodGroup: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="">Select Blood Group</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Father's Name</label>
                <input
                  type="text"
                  placeholder="Father's Name"
                  value={editingStudent.fatherName}
                  onChange={(e) => setEditingStudent({ ...editingStudent, fatherName: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mother's Name</label>
                <input
                  type="text"
                  placeholder="Mother's Name"
                  value={editingStudent.motherName}
                  onChange={(e) => setEditingStudent({ ...editingStudent, motherName: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Father's Contact</label>
                <input
                  type="tel"
                  placeholder="Father's Contact"
                  value={editingStudent.fatherContact}
                  onChange={(e) => setEditingStudent({ ...editingStudent, fatherContact: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mother's Contact</label>
                <input
                  type="tel"
                  placeholder="Mother's Contact"
                  value={editingStudent.motherContact}
                  onChange={(e) => setEditingStudent({ ...editingStudent, motherContact: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <input
                  type="text"
                  placeholder="Address"
                  value={editingStudent.address}
                  onChange={(e) => setEditingStudent({ ...editingStudent, address: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                <input
                  type="text"
                  placeholder="City"
                  value={editingStudent.city}
                  onChange={(e) => setEditingStudent({ ...editingStudent, city: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Pincode</label>
                <input
                  type="text"
                  placeholder="Pincode"
                  value={editingStudent.pincode}
                  onChange={(e) => setEditingStudent({ ...editingStudent, pincode: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  placeholder="Email"
                  value={editingStudent.email}
                  onChange={(e) => setEditingStudent({ ...editingStudent, email: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  try {
                    await updateStudent(editingStudent._id, editingStudent)
                    setIsEditModalOpen(false)
                    alert("Student updated successfully!")
                  } catch (error) {
                    alert("Failed to update student.")
                  }
                }}
                className="px-4 py-2 rounded-lg bg-primary-500 text-white hover:bg-primary-600"
              >
                Update Student
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Excel Upload Modal */}
      {isExcelModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center !mt-0">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Upload Students via Excel</h2>

            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <input
                  type="file"
                  id="excel-upload"
                  accept=".xlsx, .xls, .csv"
                  onChange={(e) => setSelectedFile(e.target.files[0])}
                  className="hidden"
                />
                <label
                  htmlFor="excel-upload"
                  className="cursor-pointer flex flex-col items-center justify-center space-y-2"
                >
                  <Upload className="w-10 h-10 text-gray-400" />
                  <p className="text-sm text-gray-600">
                    {selectedFile ? selectedFile.name : "Click to select Excel file (.xlsx, .xls, .csv)"}
                  </p>
                  {selectedFile && (
                    <p className="text-xs text-gray-500">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                  )}
                </label>
              </div>

              {uploadProgress > 0 && (
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className={`h-2.5 rounded-full ${
                      uploadStatus === "error"
                        ? "bg-red-500"
                        : uploadStatus === "success"
                          ? "bg-green-500"
                          : "bg-blue-500"
                    }`}
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
              )}

              {uploadStatus === "success" && (
                <div className="p-3 bg-green-100 text-green-700 rounded-lg text-sm">File uploaded successfully!</div>
              )}

              {uploadStatus === "error" && (
                <div className="p-3 bg-red-100 text-red-700 rounded-lg text-sm">
                  Error uploading file. Please try again.
                </div>
              )}
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => {
                  setIsExcelModalOpen(false)
                  setSelectedFile(null)
                  setUploadProgress(0)
                  setUploadStatus(null)
                }}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleExcelUpload}
                disabled={!selectedFile || uploadStatus === "success"}
                className={`px-4 py-2 rounded-lg text-white ${
                  !selectedFile || uploadStatus === "success"
                    ? "bg-blue-300 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600"
                }`}
              >
                {uploadStatus === "success" ? "Uploaded" : "Upload"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AddStudents
