// HealthForm2.js
'use client';
import React, { useState } from 'react';

const HealthForm2 = ({ bgChange }) => {
  const [prediction, setPrediction] = useState('');
  const [formData, setFormData] = useState({
    cp: '',
    thalach: '',
    exang: 'false',
    oldpeak: '',
    slope: '',
    ca: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the form data before sending it to the API
    if (
      formData.cp >= 0 &&
      formData.cp <= 3 &&
      (formData.exang === 'false' || formData.exang === 'true') &&
      formData.thalach >= 71 &&
      formData.thalach <= 202 &&
      formData.oldpeak >= 0.0 &&
      formData.oldpeak <= 6.2 &&
      formData.slope >= 0 &&
      formData.slope <= 2 &&
      formData.ca >= 0 &&
      formData.ca <= 4
    ) {
      // Log the form data before sending it to the API
      console.log(formData);

      // Prepare the JSON data for the backend
      const requestData = {
        cp: parseInt(formData.cp),
        thalach: parseInt(formData.thalach),
        exang: formData.exang === 'true' ? 1 : 0,
        oldpeak: parseFloat(formData.oldpeak),
        slope: parseInt(formData.slope),
        ca: parseInt(formData.ca),
      };

      try {
        // Make the API call using fetch
        const response = await fetch('http://127.0.0.1:8000/api/Pre2/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestData),
        });

        // Check if the request was successful (status code 2xx)
        if (response.ok) {
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
        <label htmlFor="cp" className="block text-sm font-medium text-gray-600">
          Chest Pain Type (0-3)
        </label>
        <input
          type="number"
          className="form-input mt-1 block w-full rounded-md bg-white text-black border border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          id="cp"
          name="cp"
          value={formData.cp}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="thalach"
          className="block text-sm font-medium text-gray-600"
        >
          Maximum Heart Rate Achieved (71-202)
        </label>
        <input
          type="number"
          className="form-input mt-1 block w-full rounded-md bg-white text-black border border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          id="thalach"
          name="thalach"
          value={formData.thalach}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="exang"
          className="block text-sm font-medium text-gray-600"
        >
          Exercise Induced Angina (Yes:No)
        </label>
        <select
          className="form-select mt-1 block w-full rounded-md bg-white text-black border border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          id="exang"
          name="exang"
          value={formData.exang}
          onChange={handleChange}
        >
          <option value="false">No</option>
          <option value="true">Yes</option>
        </select>
      </div>

      <div className="mb-4">
        <label
          htmlFor="oldpeak"
          className="block text-sm font-medium text-gray-600"
        >
          ST Depression Induced by Exercise Relative to Rest (0.0-6.2)
        </label>
        <input
          type="number"
          className="form-input mt-1 block w-full rounded-md bg-white text-black border border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          id="oldpeak"
          name="oldpeak"
          value={formData.oldpeak}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="slope"
          className="block text-sm font-medium text-gray-600"
        >
          Slope of the Peak Exercise ST Segment (0-2)
        </label>
        <input
          type="number"
          className="form-input mt-1 block w-full rounded-md bg-white text-black border border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          id="slope"
          name="slope"
          value={formData.slope}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="ca" className="block text-sm font-medium text-gray-600">
          Number of Major Vessels Colored by Fluoroscopy (0-4)
        </label>
        <input
          type="number"
          className="form-input mt-1 block w-full rounded-md bg-white text-black border border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          id="ca"
          name="ca"
          value={formData.ca}
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

export default HealthForm2;
