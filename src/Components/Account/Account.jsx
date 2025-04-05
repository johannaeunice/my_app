import React, { useState, useEffect } from 'react';
import { UserCircle, Mail, Calendar, MapPin, Phone, Edit, Save, Camera, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';
import NavBar from '../navBar/NavBar';

const AccountPage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    birthdate: '',
    location: '',
    bio: '',
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = sessionStorage.getItem('token');
        if (!token) {
          throw new Error('Authentication token not found');
        }

        const response = await fetch('https://rrn24.techchantier.site/malingo/public/api/user', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error(`Error fetching user data: ${response.statusText}`);
        }

        const data = await response.json();
        setUser(data);
        setFormData({
          name: data.name || '',
          email: data.email || '',
          phone: data.phone || '',
          birthdate: data.birthdate || '',
          location: data.location || '',
          bio: data.bio || '',
        });
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSave = async () => {
    try {
      const token = sessionStorage.getItem('token');
      const response = await fetch('https://rrn24.techchantier.site/malingo/public/api/api/user/update', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error(`Error updating user data: ${response.statusText}`);
      }

      const updatedUser = await response.json();
      setUser(updatedUser);
      setEditMode(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    window.location.href = '/login';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-white">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error! </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-3xl mx-auto mt-10 bg-white rounded-xl shadow-md overflow-hidden">
        {/* Header with background */}
        <NavBar/>
        <div className="h-32 bg-gradient-to-r from-blue-500 to-blue-700 relative">
          <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative"
            >
              <div className="h-32 w-32 rounded-full bg-white p-1 shadow-lg">
                {user?.profile_picture ? (
                  <img 
                    src={user.profile_picture} 
                    alt="Profile" 
                    className="h-full w-full rounded-full object-cover"
                  />
                ) : (
                  <div className="h-full w-full rounded-full bg-gray-200 flex items-center justify-center">
                    <UserCircle size={64} className="text-gray-400" />
                  </div>
                )}
              </div>
              {editMode && (
                <button className="absolute bottom-0 right-0 bg-blue-500 p-2 rounded-full text-white shadow-md hover:bg-blue-600 transition">
                  <Camera size={18} />
                </button>
              )}
            </motion.div>
          </div>
        </div>

        {/* User info section */}
        <div className="pt-20 px-6 pb-8">
          <div className="flex justify-end mb-4">
            {editMode ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSave}
                className="flex items-center text-white bg-blue-500 px-4 py-2 rounded-md hover:bg-blue-600 transition"
              >
                <Save size={18} className="mr-2" />
                Save
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setEditMode(true)}
                className="flex items-center text-white bg-blue-500 px-4 py-2 rounded-md hover:bg-blue-600 transition"
              >
                <Edit size={18} className="mr-2" />
                Edit Profile
              </motion.button>
            )}
          </div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-8"
          >
            {editMode ? (
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="text-2xl font-bold text-center w-full border-b-2 border-gray-300 focus:border-blue-500 outline-none"
              />
            ) : (
              <h1 className="text-2xl font-bold">{user?.name || 'User Name'}</h1>
            )}
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="space-y-4"
            >
              <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                <Mail className="text-blue-500 mr-3" size={22} />
                {editMode ? (
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="flex-1 bg-transparent outline-none border-b border-gray-300 focus:border-blue-500"
                    placeholder="Email"
                  />
                ) : (
                  <span>{user?.email || 'Email not provided'}</span>
                )}
              </div>
              
              <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                <Phone className="text-blue-500 mr-3" size={22} />
                {editMode ? (
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="flex-1 bg-transparent outline-none border-b border-gray-300 focus:border-blue-500"
                    placeholder="Phone Number"
                  />
                ) : (
                  <span>{user?.phone || 'Phone not provided'}</span>
                )}
              </div>
            </motion.div>

            <motion.div 
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="space-y-4"
            >
              <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                <Calendar className="text-blue-500 mr-3" size={22} />
                {editMode ? (
                  <input
                    type="date"
                    name="birthdate"
                    value={formData.birthdate}
                    onChange={handleInputChange}
                    className="flex-1 bg-transparent outline-none border-b border-gray-300 focus:border-blue-500"
                  />
                ) : (
                  <span>{user?.birthdate || 'Birth date not provided'}</span>
                )}
              </div>
              
              <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                <MapPin className="text-blue-500 mr-3" size={22} />
                {editMode ? (
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="flex-1 bg-transparent outline-none border-b border-gray-300 focus:border-blue-500"
                    placeholder="Location"
                  />
                ) : (
                  <span>{user?.location || 'Location not provided'}</span>
                )}
              </div>
            </motion.div>
          </div>

          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8"
          >
            <h2 className="text-lg font-semibold mb-3">About Me</h2>
            {editMode ? (
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                className="w-full min-h-24 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Tell us about yourself..."
              />
            ) : (
              <p className="p-3 bg-gray-50 rounded-lg min-h-24">
                {user?.bio || 'No bio provided yet.'}
              </p>
            )}
          </motion.div>

          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-8 pt-6 border-t border-gray-200"
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Member since</h3>
                <p className="mt-1 text-sm text-gray-900">{user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'Unknown'}</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
                className="flex items-center text-white bg-red-500 px-4 py-2 rounded-md hover:bg-red-600 transition"
              >
                <LogOut size={18} className="mr-2" />
                Logout
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Activity stats */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="max-w-3xl mx-auto mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4"
      >
        <div className="bg-white p-4 rounded-xl shadow-md text-center">
          <p className="text-gray-500 text-sm">Activities Created</p>
          <p className="text-2xl font-bold text-blue-500">{user?.activities_created || 0}</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-md text-center">
          <p className="text-gray-500 text-sm">Activities Joined</p>
          <p className="text-2xl font-bold text-blue-500">{user?.activities_joined || 0}</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-md text-center">
          <p className="text-gray-500 text-sm">Connections</p>
          <p className="text-2xl font-bold text-blue-500">{user?.connections || 0}</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-md text-center">
          <p className="text-gray-500 text-sm">Reviews</p>
          <p className="text-2xl font-bold text-blue-500">{user?.reviews || 0}</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AccountPage;