import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Profile = () => {
  const [userData, setUserData] = useState(null)

  const token = localStorage.getItem('token')

  const fetchUser = async () => {
    try {
      const response = await axios.get(
        `http://145.223.20.218:2002/api/user/get/683869f26a9429895cd17a17`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      setUserData(response.data.data)
    } catch (err) {
      console.error("Failed to fetch user:", err)
    }
  }

  useEffect(() => {
    fetchUser()
  }, [])

  const handleToggleStatus = () => {
    setUserData(prev => ({
      ...prev,
      isActive: !prev.isActive
    }))
    // You can send an API request here if needed
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '60px' }}>
      <div style={{
        backgroundColor: '#fefefe',
        padding: '30px 40px',
        borderRadius: '16px',
        boxShadow: '0 6px 20px rgba(0,0,0,0.1)',
        maxWidth: '480px',
        width: '100%',
        fontFamily: 'Segoe UI, sans-serif'
      }}>
        <h2 style={{ marginBottom: '25px', color: '#2c3e50', fontSize: '24px' }}>
          👤 User Profile
        </h2>
        {userData && (
          <>
            <div style={{ marginBottom: '15px' }}>
              <strong>Name:</strong> {userData.name}
            </div>
            <div style={{ marginBottom: '15px' }}>
              <strong>Email:</strong> {userData.email}
            </div>
            <div style={{ marginBottom: '15px' }}>
              <strong>Role:</strong> {userData.role}
            </div>
            <div style={{ marginBottom: '15px', display: 'flex', alignItems: 'center' }}>
              <strong style={{ marginRight: '10px' }}>Active:</strong>
              <label className="inline-flex relative items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={userData.isActive}
                  onChange={handleToggleStatus}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:bg-green-500 relative after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full" />
              </label>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Profile
