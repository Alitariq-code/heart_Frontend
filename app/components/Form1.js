'use client';
import React, { useState } from 'react';

const HealthForm = ({ bgChange }) => {
  const [prediction, setPrediction] = useState('');
  const [formData, setFormData] = useState({
    age: '',
    prevalentHyp: '0', // Changed to '0' (No) as default
    diabetes: '0', // Changed to '0' (No) as default
    sysBP: '',
    diaBP: '',
    glucose: '',
  });
  console.log(bgChange);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Update the state on every change
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the form data before sending it to the API
    if (
      formData.age >= 32 &&
      formData.age <= 70 &&
      (formData.prevalentHyp === '0' || formData.prevalentHyp === '1') &&
      (formData.diabetes === '0' || formData.diabetes === '1') &&
      formData.sysBP >= 83.5 &&
      formData.sysBP <= 295.0 &&
      formData.diaBP >= 48.0 &&
      formData.diaBP <= 142.5 &&
      formData.glucose >= 40.0 &&
      formData.glucose <= 394.0
    ) {
      // Log the form data before sending it to the API
      console.log(formData);

      // Prepare the JSON data for the backend
      const requestData = {
        age: parseInt(formData.age),
        prevalentHyp: parseInt(formData.prevalentHyp),
        diabetes: parseInt(formData.diabetes),
        sysBP: parseInt(formData.sysBP),
        diaBP: parseInt(formData.diaBP),
        glucose: parseInt(formData.glucose),
      };

      try {
        // Make the API call using fetch
        const response = await fetch('http://127.0.0.1:8000/api/Pre1/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestData),
        });

        // Check if the request was successful (status code 2xx)
        if (response.ok) {
          // Parse and log the response body
          const responseData = await response.json();
          console.log(responseData);
          if (responseData.prediction) {
            setPrediction('Yes');
            bgChange('/danger.jpg');
          } else {
            bgChange('/happy.jpeg');
            setPrediction('No');
          }

          console.log('Data sent successfully!');
        } else {
          console.error('Failed to send data. Please try again.');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    } else {
      // Show an alert for invalid values
      alert('Please enter valid values within the specified range.');
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="container mx-auto mt-8 bg-white p-8 rounded-lg shadow-md opacity-90"
    >
      <div className="mb-4">
        <label
          htmlFor="age"
          className="block text-sm font-medium text-gray-600"
        >
          Age (32-70)
        </label>
        <input
          type="number"
          className="form-input mt-1 block w-full rounded-md text-black border border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          id="age"
          name="age"
          value={formData.age}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="prevalentHyp"
          className="block text-sm font-medium text-gray-600"
        >
          Prevalent Hypertension ( No, Yes)
        </label>
        <select
          className="form-select mt-1 block w-full rounded-md bg-white text-black border border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          id="prevalentHyp"
          name="prevalentHyp"
          value={formData.prevalentHyp}
          onChange={handleChange}
        >
          <option value="0">No</option>
          <option value="1">Yes</option>
        </select>
      </div>

      <div className="mb-4">
        <label
          htmlFor="diabetes"
          className="block text-sm font-medium text-gray-600"
        >
          Diabetes ( No, Yes)
        </label>
        <select
          className="form-select mt-1 block w-full rounded-md bg-white text-black border border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          id="diabetes"
          name="diabetes"
          value={formData.diabetes}
          onChange={handleChange}
        >
          <option value="0">No</option>
          <option value="1">Yes</option>
        </select>
      </div>

      <div className="mb-4">
        <label
          htmlFor="sysBP"
          className="block text-sm font-medium text-gray-600"
        >
          Systolic Blood Pressure (83.5-295.0)
        </label>
        <input
          type="number"
          className="form-input mt-1 block w-full rounded-md text-black border border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          id="sysBP"
          name="sysBP"
          value={formData.sysBP}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="diaBP"
          className="block text-sm font-medium text-gray-600"
        >
          Diastolic Blood Pressure (48.0-142.5)
        </label>
        <input
          type="number"
          className="form-input mt-1 block w-full rounded-md text-black border border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          id="diaBP"
          name="diaBP"
          value={formData.diaBP}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="glucose"
          className="block text-sm font-medium text-gray-600"
        >
          Glucose (40.0-394.0)
        </label>
        <input
          type="number"
          className="form-input mt-1 block w-full rounded-md text-black border border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          id="glucose"
          name="glucose"
          value={formData.glucose}
          onChange={handleChange}
          required
        />
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200 focus:ring-opacity-50"
      >
        Submit
      </button>
      {prediction ? (
        <h1 className="text-black mt-2">
          <strong>Predection:</strong>
          {prediction}
        </h1>
      ) : null}
    </form>
  );
};

export default HealthForm;
