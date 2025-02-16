import React from 'react';
import ReactDOM from 'react-dom/client'; // For React 18+
import './index.css'; // Optional, for global styles
import App from './App'; // The root component of your app

// Create the root element and render the App component into it
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
