// src/components/Loader.jsx
import React from 'react';
import '../styles/loader.css';

export default function Loader() {
  return (
    <div className="loader">
      <div className="spinner"></div>
      <p>Generating lesson content, please wait...</p>
    </div>
  );
}