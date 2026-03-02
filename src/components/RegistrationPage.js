import React, { useState } from 'react';
import { Leaf } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const RegistrationPage = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState('restaurant');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    
    if (!name || !email || !password || !address) {
      setError('Please fill in all fields');
      return;
    }

   // Prepare the registration data
   const registrationData = {
    name,
    email,
    password,
    role: userType, // Assuming role is determined by userType
    address: {
      street: address, // Assuming address is a single string; adjust as needed
      city: '', // You can add more fields for address if needed
      state: '',
      zip: ''
    }
  };

  try {
    const response = await fetch("https://meal-connect-updated.onrender.com/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registrationData),
    });

    // if (!response.ok) {
    //   const errorData = await response.json();
    //   setError(errorData.errors ? errorData.errors.map(err => err.msg).join(', ') : 'Registration failed');
    //   return;
    // }

    // const data = await response.json();
    // Handle successful registration (e.g., save token, redirect user)
    // console.log(data);
    navigate('/home-page'); // Navigate to home page or another page on successful registration
  } catch (error) {
    console.error("Registration failed:", error);
    setError('Registration failed. Please try again.');
  }
};
  return (
    <div className="min-h-screen bg-white flex justify-center items-center">
      <div className="w-full max-w-md bg-white p-8 shadow-lg rounded-b-3xl">
        <div className="mb-8 flex items-center">
          <Leaf className="w-5 h-5 text-green-500 mr-1" />
          <h2 className="text-2xl font-bold">
            <span>Meal</span>
            <span className="text-green-500">Connect</span>
          </h2>
        </div>
        <h1 className="text-3xl font-medium mb-6">Register Now As</h1>
        <div className="flex justify-center space-x-4 mb-8">
          <button
            className={`px-6 py-2 rounded-full transition-colors ${
              userType === 'restaurant'
                ? 'bg-blue-900 text-white hover:bg-blue-800'
                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
            }`}
            onClick={() => setUserType('restaurant')}
          >
            Restaurant
          </button>
          <button
            className={`px-6 py-2 rounded-full transition-colors ${
              userType === 'foodBank'
                ? 'bg-blue-900 text-white hover:bg-blue-800'
                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
            }`}
            onClick={() => setUserType('foodBank')}
          >
            Food Bank
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 text-sm text-red-500 bg-red-50 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Restaurant / Food Bank Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full px-4 py-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            placeholder="E-Mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-blue-900 text-white py-3 rounded-full hover:bg-blue-800 transition-colors"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationPage;
