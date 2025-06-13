import { useState, useEffect } from "react";
import axios from "axios";
import { Plus, Search, Filter, Edit, Trash2, Eye, Users, ChevronLeft, ChevronRight, Upload } from "lucide-react";

const SchoolManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [newSchool, setNewSchool] = useState({
    schoolName: "",
    address: "",
    email: "",
    phoneNumber: "",
  });
  const [editingSchool, setEditingSchool] = useState({
    _id: "",
    schoolName: "",
    address: "",
    email: "",
    phoneNumber: "",
  });
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalSchools, setTotalSchools] = useState(0);
  const [limit, setLimit] = useState(10);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const response = await axios.get(`http://145.223.20.218:2002/api/school/getall?page=${currentPage}&limit=${limit}&search=${searchTerm}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSchools(response.data.data.schools);
        setTotalPages(response.data.data.totalPages);
        setTotalSchools(response.data.data.total);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching schools:", error);
        setLoading(false);
      }
    };

    fetchSchools();
  }, [currentPage, limit, searchTerm]);

  const registerSchool = async (schoolData) => {
    try {
      const response = await axios.post("http://145.223.20.218:2002/api/school/register", schoolData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      // Refresh the schools list after adding a new one
      const schoolsResponse = await axios.get(`http://145.223.20.218:2002/api/school/getall?page=${currentPage}&limit=${limit}&search=${searchTerm}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSchools(schoolsResponse.data.data.schools);
      setTotalPages(schoolsResponse.data.data.totalPages);
      setTotalSchools(schoolsResponse.data.data.total);

      return response.data;
    } catch (error) {
      console.error("Error adding school:", error);
      throw error;
    }
  };

  const fetchSchoolDetails = async (schoolId) => {
    try {
      const response = await axios.get(`http://145.223.20.218:2002/api/school/get/${schoolId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.data;
    } catch (error) {
      console.error("Error fetching school details:", error);
      throw error;
    }
  };

  const updateSchool = async (schoolId, schoolData) => {
    try {
      const response = await axios.put(`http://145.223.20.218:2002/api/school/update/${schoolId}`, schoolData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      // Refresh the schools list after updating
      const schoolsResponse = await axios.get(`http://145.223.20.218:2002/api/school/getall?page=${currentPage}&limit=${limit}&search=${searchTerm}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSchools(schoolsResponse.data.data.schools);
      setTotalPages(schoolsResponse.data.data.totalPages);
      setTotalSchools(schoolsResponse.data.data.total);

      return response.data;
    } catch (error) {
      console.error("Error updating school:", error);
      throw error;
    }
  };

  const deleteSchool = async (schoolId) => {
    try {
      await axios.delete(`http://145.223.20.218:2002/api/school/delete/${schoolId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Refresh the schools list after deleting
      const schoolsResponse = await axios.get(`http://145.223.20.218:2002/api/school/getall?page=${currentPage}&limit=${limit}&search=${searchTerm}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSchools(schoolsResponse.data.data.schools);
      setTotalPages(schoolsResponse.data.data.totalPages);
      setTotalSchools(schoolsResponse.data.data.total);
    } catch (error) {
      console.error("Error deleting school:", error);
      throw error;
    }
  };

  const handleEditClick = async (schoolId) => {
    try {
      const schoolDetails = await fetchSchoolDetails(schoolId);
      setEditingSchool(schoolDetails);
      setIsEditModalOpen(true);
    } catch (error) {
      console.error("Error preparing edit:", error);
      alert("Failed to load school details for editing.");
    }
  };

  const handleToggleStatus = async (schoolId, currentStatus) => {
    try {
      // Update the school status locally first for immediate UI feedback
      setSchools(prevSchools =>
        prevSchools.map(school =>
          school._id === schoolId
            ? { ...school, isActive: !currentStatus }
            : school
        )
      );

      // Here you would make an API call to update the status
      // await updateSchool(schoolId, { isActive: !currentStatus });

    } catch (error) {
      // Revert the local change if API call fails
      setSchools(prevSchools =>
        prevSchools.map(school =>
          school._id === schoolId
            ? { ...school, isActive: currentStatus }
            : school
        )
      );
      console.error("Error updating school status:", error);
      alert("Failed to update school status.");
    }
  };

  const getStatusColor = (status) => {
    return status ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800";
  };

  const filteredSchools = schools.filter((school) => {
    const matchesSearch = school.schoolName.toLowerCase().includes(searchTerm.toLowerCase()) || school.address.toLowerCase().includes(searchTerm.toLowerCase()) || school.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleLimitChange = (e) => {
    setLimit(Number(e.target.value));
    setCurrentPage(1);
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="space-y-6 animate-slide-in">
      {/* Header */}
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">School Management</h1>
          <p className="text-gray-600 mt-1">Manage schools and their transportation requirements.</p>
        </div>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-6 py-2 rounded-xl hover:scale-105 transition-all duration-300 flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Add School</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Total Schools", count: totalSchools, color: "blue" },
          { label: "Active Schools", count: schools.filter((s) => s.isActive).length, color: "green" },
          { label: "Inactive Schools", count: schools.filter((s) => !s.isActive).length, color: "red" },
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
            <input type="text" placeholder="Search schools..." value={searchTerm} onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }} className="pl-10 pr-4 py-2 w-full md:w-96 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent" />
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Filter className="w-5 h-5 text-gray-400" />
          <span className="text-sm text-gray-600">{filteredSchools.length} schools found</span>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-center">Sr. No</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-center">School Name</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-center">Address</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-center">E-Mail</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-center">Phone Number</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-center">Change Status</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-center">Status</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredSchools.map((school, index) => (
                <tr key={school._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">{(currentPage - 1) * limit + index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                        {school.schoolName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900 text-center">{school.schoolName}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">{school.address}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">{school.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">{school.phoneNumber}</td>
                  <td className="px-8 py-4 whitespace-nowrap text-center">
                    <button
                      onClick={() => handleToggleStatus(school._id, school.isActive)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${school.isActive ? 'bg-green-600' : 'bg-gray-200'
                        }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${school.isActive ? 'translate-x-6' : 'translate-x-1'
                          }`}
                      />
                    </button>
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-center">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(school.isActive)}`}>{school.isActive ? "Active" : "Inactive"}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2 justify-center">
                      <button className="text-blue-600 hover:text-blue-900">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleEditClick(school._id)} className="text-green-600 hover:text-green-900">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={async () => {
                          if (window.confirm("Are you sure you want to delete this school?")) {
                            try {
                              await deleteSchool(school._id);
                            } catch (error) {
                              alert("Failed to delete school.");
                            }
                          }
                        }}
                        className="text-red-600 hover:text-red-900">
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
          <select value={limit} onChange={handleLimitChange} className="border border-gray-300 rounded-md px-2 py-1 text-sm">
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600">
            Showing {(currentPage - 1) * limit + 1} to {Math.min(currentPage * limit, totalSchools)} of {totalSchools} entries
          </span>
          <div className="flex space-x-1">
            <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className={`p-1 rounded-md ${currentPage === 1 ? "text-gray-400 cursor-not-allowed" : "text-gray-700 hover:bg-gray-100"}`}>
              <ChevronLeft className="w-5 h-5" />
            </button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }
              return (
                <button key={pageNum} onClick={() => handlePageChange(pageNum)} className={`w-8 h-8 rounded-md ${currentPage === pageNum ? "bg-primary-500 text-white" : "text-gray-700 hover:bg-gray-100"}`}>
                  {pageNum}
                </button>
              );
            })}
            <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className={`p-1 rounded-md ${currentPage === totalPages ? "text-gray-400 cursor-not-allowed" : "text-gray-700 hover:bg-gray-100"}`}>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Add School Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center !mt-0">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Add New School</h2>
            <div className="space-y-4">
              <input type="text" placeholder="School Name" value={newSchool.schoolName} onChange={(e) => setNewSchool({ ...newSchool, schoolName: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent" />
              <input type="text" placeholder="Address" value={newSchool.address} onChange={(e) => setNewSchool({ ...newSchool, address: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent" />
              <input type="email" placeholder="Email" value={newSchool.email} onChange={(e) => setNewSchool({ ...newSchool, email: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent" />
              <input type="text" placeholder="Phone Number" value={newSchool.phoneNumber} onChange={(e) => setNewSchool({ ...newSchool, phoneNumber: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent" />
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100">
                Cancel
              </button>
              <button
                onClick={async () => {
                  try {
                    await registerSchool(newSchool);
                    setIsModalOpen(false);
                    setNewSchool({ schoolName: "", address: "", email: "", phoneNumber: "" });
                  } catch (error) {
                    alert("Failed to add school.");
                  }
                }}
                className="px-4 py-2 rounded-lg bg-primary-500 text-white hover:bg-primary-600">
                Add School
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit School Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center !mt-0">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Edit School</h2>
            <div className="space-y-4">
              <input type="text" placeholder="School Name" value={editingSchool.schoolName} onChange={(e) => setEditingSchool({ ...editingSchool, schoolName: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent" />
              <input type="text" placeholder="Address" value={editingSchool.address} onChange={(e) => setEditingSchool({ ...editingSchool, address: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent" />
              <input type="email" placeholder="Email" value={editingSchool.email} onChange={(e) => setEditingSchool({ ...editingSchool, email: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-5f00 focus:border-transparent" />
              <input type="text" placeholder="Phone Number" value={editingSchool.phoneNumber} onChange={(e) => setEditingSchool({ ...editingSchool, phoneNumber: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent" />
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button onClick={() => setIsEditModalOpen(false)} className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100">
                Cancel
              </button>
              <button
                onClick={async () => {
                  try {
                    await updateSchool(editingSchool._id, editingSchool);
                    setIsEditModalOpen(false);
                  } catch (error) {
                    alert("Failed to update school.");
                  }
                }}
                className="px-4 py-2 rounded-lg bg-primary-500 text-white hover:bg-primary-600">
                Update School
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SchoolManagement;

// https://grey-moon-879537.postman.co/workspace/Projects-All~547efedb-e485-42fa-80b9-d9cc2615e266/request/24285490-45794b52-a89b-4a83-a290-b9de224cbb40