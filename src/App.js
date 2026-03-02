import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { ShoppingCart, Bell, User, Leaf, Import } from 'lucide-react';
import './index.css';
import './App.css';
import RegistrationPage from './components/RegistrationPage';
import RestaurantForm from './components/RestaurantForm';
import RestaurantFoodPage from './components/RestaurantFoodPage';
import FoodBankForm from './components/FoodBankForm';
import HomePage from './components/HomePage';
import DeliveryPage from './components/DeliveryPage';
import DontWasteFoodPage from './components/DontWasteFoodPage';
import ContactPage from './components/ContactPage';
import AboutPage from './components/AboutPage';
import AvailableFoodBanks from './components/AvailableFoodBanks';
import FoodBankDetails from './components/FoodBankDetails';
import MealConnectApp from './components/MealConnectApp';
import OrderConfirmation from './components/OrderConfirmation';
import FoodBankDashboard from './components/FoodBankDashboard';
import RestaurantDashboard from './components/RestaurantDashboard';
import MealConnectDashboard from './components/MealConnectDashboard';
import { Link } from 'react-router-dom';



const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    const response = await fetch("https://meal-connect-updated.onrender.com/api/auth/login", { // Adjust the endpoint as necessary
      method: "POST", // Use POST for login
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    console.log(response);


    if (response.ok) {
      const data = await response.json();
      // Handle successful login (e.g., save token, redirect user)
      console.log(data);
      navigate('/restaurant-form'); // Navigate to home page on successful login
    } else {
      // Handle error (e.g., display error message)
      console.error("Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <nav className="border-b shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <div className="flex items-center">
                <Leaf className="w-5 h-5 text-green-500" />
                <span className="text-xl font-bold ml-1">
                  <span>Meal</span>
                  <span className="text-green-500">Connect</span>
                </span>
              </div>
              <div className="flex space-x-6">
              <div className="flex space-x-6">
                  <Link to="/home-page" className="hover:text-gray-600">Home</Link>
                  <Link to="/Delivery-Page" className="hover:text-gray-600">Delivery</Link>
                  <Link to="/about" className="hover:text-gray-600">About</Link>
                  <Link to="/contact" className="hover:text-gray-600">Contact</Link>
              </div>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <div className="flex items-center text-green-500">
                <ShoppingCart className="w-5 h-5" />
                <span className="ml-2">Your Cart (0)</span>
              </div>
              <User className="w-5 h-5" />
              <Bell className="w-5 h-5" />
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-medium leading-relaxed">
            <span className="text-blue-900">"Delicious Meals</span>
            <span className="text-gray-400">, Generous Hearts</span>
            <span className="text-gray-400">,</span>
            <br />
            <span className="text-gray-400">Together We Can </span>
            <span className="text-blue-900">End Hunger"</span>
          </h1>
        </div>

        <div className="grid md:grid-cols-2 gap-8 bg-blue-50 rounded-3xl p-8">
          <div className="relative">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="rounded-3xl overflow-hidden">
                <img
                  src="/images/VolunteersImage.jpg"
                  alt="Volunteers packing food"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-3xl overflow-hidden">
                <img
                  src="/images/Donations.jpg"
                  alt="Donations"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="rounded-3xl overflow-hidden">
              <img
                src="/images/FoodDonation.jpg"
                alt="Food distribution"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="bg-white p-8 rounded-3xl shadow-lg">
            <div className="mb-8 flex items-center">
              <Leaf className="w-5 h-5 text-green-500 mr-1" />
              <h2 className="text-2xl font-bold">
                <span>Meal</span>
                <span className="text-green-500">Connect</span>
              </h2>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Type your email here..."
                  className="w-full px-4 py-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Type your password here..."
                  className="w-full px-4 py-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="mr-2"
                  />
                  <span className="text-sm">Remember me</span>
                </label>
                <a href="#" className="text-sm text-blue-600 hover:underline">
                  Forgot Password?
                </a>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-900 text-white py-3 rounded-full hover:bg-blue-800 transition-colors"
              >
                Login
              </button>
              <div className="text-center text-sm">
                <span className="text-gray-600">Don't have an account? </span>
                <Link to="/register" className="text-blue-600 hover:underline">
                  Create an account
                </Link>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
};


const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const isAuthenticated = true;

  if (!isAuthenticated) {
    navigate('/');
    return null;
  }

  return children;
};

const MainApp = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/register"
          element={
            <ProtectedRoute>
              <RegistrationPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/restaurant-form"
          element={
            <ProtectedRoute>
              <RestaurantForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/order-confirmation"
          element={
            <ProtectedRoute>
              <OrderConfirmation />
            </ProtectedRoute>
          }
        />
        
         <Route
          path="/meal-connect-app"
          element={
            <ProtectedRoute>
              <MealConnectApp />
            </ProtectedRoute>
          }
        />
        <Route
          path="/food-bank-details"
          element={
            <ProtectedRoute>
              <FoodBankDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/food-bank-dashboard"
          element={
            <ProtectedRoute>
              <FoodBankDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/restaurant-dashboard"
          element={
            <ProtectedRoute>
              <RestaurantDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/meal-connect-dashboard"
          element={
            <ProtectedRoute>
              <MealConnectDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/available-food-banks"
          element={
            <ProtectedRoute>
              <AvailableFoodBanks />
            </ProtectedRoute>
          }
        />
        <Route
          path="/contact"
          element={
            <ProtectedRoute>
              <ContactPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/about"
          element={
            <ProtectedRoute>
              <AboutPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/foodbank-form"
          element={
            <ProtectedRoute>
              <FoodBankForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/home-page"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Delivery-Page"
          element={
            <ProtectedRoute>
              <DeliveryPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/restaurant-food-page"
          element={
            <ProtectedRoute>
              <RestaurantFoodPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dont-waste-food"
          element={
            <ProtectedRoute>
              <DontWasteFoodPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default MainApp;
