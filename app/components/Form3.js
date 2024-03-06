// HealthForm2.js
'use client';
import React, { useState } from 'react';

const HealthForm3 = ({ bgChange }) => {
  const [prediction, setPrediction] = useState('');
  const [formData, setFormData] = useState({
    Chest_pain_type: '',
    Max_HR: '',
    Exercise_angina: 'false',
    ST_depression: '',
    Number_of_vessels_fluro: '',
    Thallium: '',
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
      formData.Chest_pain_type >= 1 &&
      formData.Chest_pain_type <= 4 &&
      (formData.Exercise_angina === 'false' ||
        formData.Exercise_angina === 'true') &&
      formData.Max_HR >= 71 &&
      formData.Max_HR <= 202 &&
      formData.ST_depression >= 0.0 &&
      formData.ST_depression <= 6.2 &&
      formData.Number_of_vessels_fluro >= 0 &&
      formData.Number_of_vessels_fluro <= 3 &&
      formData.Thallium >= 3 &&
      formData.Thallium <= 7
    ) {
      // Log the form data before sending it to the API
      console.log(formData);

      // Prepare the JSON data for the backend
      const requestData = {
        'Chest pain type': parseInt(formData.Chest_pain_type),
        'Max HR': parseInt(formData.Max_HR),
        'Exercise angina': formData.Exercise_angina === 'true' ? 1 : 0,
        'ST depression': parseFloat(formData.ST_depression),
        'Number of vessels fluro': parseInt(formData.Number_of_vessels_fluro),
        Thallium: parseInt(formData.Thallium),
      };

      try {
        // Make the API call using fetch
        const response = await fetch('http://127.0.0.1:8000/api/Pre3/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestData),
        });

        // Check if the request was successful (status code 2xx)
        if (response.ok) {
          const responseData = await response.json();
          console.log(responseData.prediction);
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
    <>
      <form
        onSubmit={handleSubmit}
        className="container mx-auto mt-8 bg-white p-8 rounded-lg shadow-md opacity-90"
      >
        <div className="mb-4">
          <label
            htmlFor="Chest_pain_type"
            className="block text-sm font-medium text-gray-600"
          >
            Chest Pain Type (1-4)
          </label>
          <input
            type="number"
            className="form-input mt-1 block w-full rounded-md bg-white text-black border border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            id="Chest_pain_type"
            name="Chest_pain_type"
            value={formData.Chest_pain_type}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="Max_HR"
            className="block text-sm font-medium text-gray-600"
          >
            Maximum Heart Rate Achieved (71-202)
          </label>
          <input
            type="number"
            className="form-input mt-1 block w-full rounded-md bg-white text-black border border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            id="Max_HR"
            name="Max_HR"
            value={formData.Max_HR}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="Exercise_angina"
            className="block text-sm font-medium text-gray-600"
          >
            Exercise Induced Angina (Yes:No)
          </label>
          <select
            className="form-select mt-1 block w-full rounded-md bg-white text-black border border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            id="Exercise_angina"
            name="Exercise_angina"
            value={formData.Exercise_angina}
            onChange={handleChange}
          >
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
        </div>

        <div className="mb-4">
          <label
            htmlFor="ST_depression"
            className="block text-sm font-medium text-gray-600"
          >
            ST Depression (0.0-6.2)
          </label>
          <input
            type="number"
            className="form-input mt-1 block w-full rounded-md bg-white text-black border border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            id="ST_depression"
            name="ST_depression"
            value={formData.ST_depression}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="Number_of_vessels_fluro"
            className="block text-sm font-medium text-gray-600"
          >
            Number of vessels fluro(0-3)
          </label>
          <input
            type="number"
            className="form-input mt-1 block w-full rounded-md bg-white text-black border border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            id="Number_of_vessels_fluro"
            name="Number_of_vessels_fluro"
            value={formData.Number_of_vessels_fluro}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="ca"
            className="block text-sm font-medium text-gray-600"
          >
            Thallium (3-7)
          </label>
          <input
            type="number"
            className="form-input mt-1 block w-full rounded-md bg-white text-black border border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            id="Thallium"
            name="Thallium"
            value={formData.Thallium}
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
    </>
  );
};

export default HealthForm3;
