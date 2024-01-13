// Loading.js

import React, { useState, useEffect } from 'react';

const Loading = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(prevCount => ( prevCount + 1));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed h-full w-full flex flex-col items-center justify-center h-screen">
      <div className="border-t-8 bg-white p-1 border-blue-500 border-solid rounded-full w-16 h-16 animate-spin mb-4"></div>
      <p className="text-gray-700 ">
        Loading... {count}%
      </p>
    </div>
  );
};

export default Loading;
