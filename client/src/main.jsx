import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.scss';
import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="1078913117846-5aang8csbu553bno6o9rmmtn1m6ga18j.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>
);
