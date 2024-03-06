'use client';
import React, { useEffect, useState } from 'react';
import HealthForm from './components/Form1';
import HealthForm2 from './components/Form2';
import HealthForm3 from './components/Form3';

const Home = () => {
  const [bgImage, setbgImage] = useState('/human.webp');
  const changeBg = (imageUrl) => {
    setbgImage(imageUrl);
  };

  return (
    <div
      className="min-h-screen min-w-screen flex items-center justify-center"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        height: '100vh',
        width: '100vw',
      }}
    >
      <div className="flex flex-col md:flex-row gap-4">
        {/* Adjust the opacity using the bg-opacity utility class */}
        <HealthForm bgChange={changeBg} />

        <HealthForm2 bgChange={changeBg} />

        <HealthForm3 bgChange={changeBg} />
      </div>
    </div>
  );
};

export default Home;
