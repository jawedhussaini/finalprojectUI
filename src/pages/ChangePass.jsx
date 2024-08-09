import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Importing eye icons
import { getToken } from '../utill/helpers';

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState(null);
  const [newPassword, setNewPassword] = useState(null);
  const [passwordConfirmation, setPasswordConfirmation] = useState(null);
  const [message, setMessage] = useState(null);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);
   const [loading,setLoading]=useState(false)

  const API = process.env.REACT_APP_API;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== passwordConfirmation) {
      setMessage('New passwords do not match.');
      return;
    }
    setLoading(true)

    try {
      const token = getToken();

      // Make sure the token is present
      if (!token) {
        setMessage('User not authenticated.');
        return;
      }

      const response = await fetch(`${API}/auth/change-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Corrected token usage
        },
        body: JSON.stringify({
          currentPassword,
          password: newPassword,
          passwordConfirmation,
        }),
        cache: 'no-cache',
      });

      if (response.status === 200) {
        setLoading(false)
        setMessage('Password changed successfully.');
      } else {
        setLoading(false)
        const data = await response.json();
        console.log('Response data:', data);
        setMessage(data.message || 'Failed to change password.');
      }
    } catch (error) {
      console.error('Error changing password:', error);
      setLoading(false)
    }
     finally {
      setLoading(false); // Reset loading state regardless of success or failure
    }
  };

  const toggleVisibility = (setVisibility) => {
    setVisibility((prevVisibility) => !prevVisibility);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4 text-center">Change Password</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Current Password:</label>
          <div className="relative">
            <input
              type={showCurrentPassword ? 'text' : 'password'}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
              className="w-full p-2 border rounded"
            />
            <button
              type="button"
              onClick={() => toggleVisibility(setShowCurrentPassword)}
              className="absolute right-2 top-2 text-sm"
            >
              {showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">New Password:</label>
          <div className="relative">
            <input
              type={showNewPassword ? 'text' : 'password'}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="w-full p-2 border rounded"
            />
            <button
              type="button"
              onClick={() => toggleVisibility(setShowNewPassword)}
              className="absolute right-2 top-2 text-sm"
            >
              {showNewPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Confirm New Password:</label>
          <div className="relative">
            <input
              type={showPasswordConfirmation ? 'text' : 'password'}
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              required
              className="w-full p-2 border rounded"
            />
            <button
              type="button"
              onClick={() => toggleVisibility(setShowPasswordConfirmation)}
              className="absolute right-2 top-2 text-sm"
            >
              {showPasswordConfirmation ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 p-2 rounded mt-2 hover:bg-blue-600"
        >
        {loading ? "Changing Password ..." : "Change Password"}  
        </button>
      </form>
      {message && <p className="mt-4 text-center text-red-500">{message}</p>}
    </div>
  );
};

export default ChangePassword;
