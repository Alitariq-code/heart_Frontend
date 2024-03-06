// BackgroundContext.js
import React, { createContext, useContext, useState } from 'react';

const BackgroundContext = createContext();

export const useBackground = () => {
  return useContext(BackgroundContext);
};

export const BackgroundProvider = ({ children }) => {
  const [backgroundImage, setBackgroundImage] = useState('');

  const changeBackground = (imageUrl) => {
    setBackgroundImage(imageUrl);
  };

  return (
    <BackgroundContext.Provider value={{ backgroundImage, changeBackground }}>
      {children}
    </BackgroundContext.Provider>
  );
};
