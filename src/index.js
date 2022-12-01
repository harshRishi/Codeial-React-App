import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import { App } from './components';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './providers/AuthProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  {/* Using create context we can pass state without passing props */}
  {/* wrap the whole application uner AuthProvider */}
    <AuthProvider> 
      <Router>
        <App />
      </Router>
    </AuthProvider>
  </React.StrictMode>
);
