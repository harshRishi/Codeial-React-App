import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import { App } from './components';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider, PostsProvider } from './providers';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* Using create context we can pass state without passing props */}
    {/* wrap the whole application uner AuthProvider */}
    <AuthProvider>
      <Router>
        <PostsProvider>
          <App />
        </PostsProvider>
      </Router>
    </AuthProvider>
  </React.StrictMode>
);
