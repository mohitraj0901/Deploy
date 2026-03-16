import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FoodBankForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    bankName: '',
    address: '',
    phone: '',
    website: '',
    socialMedia: '',
    daysOfOperation: '',
    openingTimes: '',
    closingTimes: '',
    contactName: '',
    contactInfo: '',
    email: '',
    position: '',
    foodItems: '',
    quantityLimits: '',
    storageFacilities: '',
    handlingProtocols: '',
    preferredTime: '',
    pickupContactPerson: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Food Bank form submitted:', formData);
    navigate('/food-bank-details'); // Navigate to the Food Bank Details page
  };
  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Food Bank Registration</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Food Bank Details Section */}
        <div className="bg-orange-100 p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Food Bank Details</h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              className="w-full p-2 border rounded"
              value={formData.bankName}
              onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
            />
            <input
              type="text"
              placeholder="Address"
              className="w-full p-2 border rounded"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            />
            <input
              type="text"
              placeholder="Phone"
              className="w-full p-2 border rounded"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
            <input
              type="text"
              placeholder="Website"
              className="w-full p-2 border rounded"
              value={formData.website}
              onChange={(e) => setFormData({ ...formData, website: e.target.value })}
            />
            <input
              type="text"
              placeholder="Social Media Handles"
              className="w-full p-2 border rounded"
              value={formData.socialMedia}
              onChange={(e) => setFormData({ ...formData, socialMedia: e.target.value })}
            />
            <input
              type="text"
              placeholder="Days of Operation"
              className="w-full p-2 border rounded"
              value={formData.daysOfOperation}
              onChange={(e) => setFormData({ ...formData, daysOfOperation: e.target.value })}
            />
            <input
              type="text"
              placeholder="Opening Times"
              className="w-full p-2 border rounded"
              value={formData.openingTimes}
              onChange={(e) => setFormData({ ...formData, openingTimes: e.target.value })}
            />
            <input
              type="text"
              placeholder="Closing Times"
              className="w-full p-2 border rounded"
              value={formData.closingTimes}
              onChange={(e) => setFormData({ ...formData, closingTimes: e.target.value })}
            />
          </div>
        </div>

        {/* Contact Person Details Section */}
        <div className="bg-purple-100 p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Contact Person Details</h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Contact Name"
              className="w-full p-2 border rounded"
              value={formData.contactName}
              onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
            />
            <input
              type="text"
              placeholder="Position"
              className="w-full p-2 border rounded"
              value={formData.position}
              onChange={(e) => setFormData({ ...formData, position: e.target.value })}
            />
            <input
              type="text"
              placeholder="Contact Info"
              className="w-full p-2 border rounded"
              value={formData.contactInfo}
              onChange={(e) => setFormData({ ...formData, contactInfo: e.target.value })}
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full p-2 border rounded"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
        </div>

        {/* Food Acceptance Details Section */}
        <div className="bg-green-100 p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Food Acceptance Details</h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Food Items"
              className="w-full p-2 border rounded"
              value={formData.foodItems}
              onChange={(e) => setFormData({ ...formData, foodItems: e.target.value })}
            />
            <input
              type="text"
              placeholder="Quantity Limits"
              className="w-full p-2 border rounded"
              value={formData.quantityLimits}
              onChange={(e) => setFormData({ ...formData, quantityLimits: e.target.value })}
            />
          </div>
        </div>

        {/* Storage and Handling Section */}
        <div className="bg-blue-100 p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Storage and Handling</h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Storage Facilities"
              className="w-full p-2 border rounded"
              value={formData.storageFacilities}
              onChange={(e) => setFormData({ ...formData, storageFacilities: e.target.value })}
            />
            <input
              type="text"
              placeholder="Handling Protocols"
              className="w-full p-2 border rounded"
              value={formData.handlingProtocols}
              onChange={(e) => setFormData({ ...formData, handlingProtocols: e.target.value })}
            />
          </div>
        </div>

        {/* Pickup Scheduling Section */}
        <div className="bg-yellow-100 p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Pickup Scheduling</h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Preferred Time"
              className="w-full p-2 border rounded"
              value={formData.preferredTime}
              onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
            />
            <input
              type="text"
              placeholder="Contact Person for Pickup"
              className="w-full p-2 border rounded"
              value={formData.pickupContactPerson}
              onChange={(e) => setFormData({ ...formData, pickupContactPerson: e.target.value })}
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 mt-6 md:col-span-2"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default FoodBankForm;
