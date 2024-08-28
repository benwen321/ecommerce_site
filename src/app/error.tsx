// src/app/error.tsx

"use client"; // Add this line at the top

import React from 'react';

const ErrorPage: React.FC = () => {
  return (
    <div>
      <h1>Something went wrong!</h1>
      <p>We are sorry for the inconvenience. Please try again later.</p>
    </div>
  );
};

export default ErrorPage;
