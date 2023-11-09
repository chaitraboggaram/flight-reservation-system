import React from 'react';
import { Link } from 'react-router-dom';
const GoogleAuth = lazy(() => import("./googleauth"));

const isAuthenticated = true; // Replace with your authentication logic

const Home = () => {
  return (
    <div className="home-container">
      <header className="navbar">
        <Link to="/book">Book</Link>
        <Link to="/manage">Manage</Link>
        <Link to="/help">Help</Link>
        {isAuthenticated ? (
          <Link to="/account">Account</Link>
        ) : (
          <Link to="/googleauth">Login</Link>
        )}
      </header>

      <main className="content">
        {/* Your main content for the Home page */}
        <p>Welcome to our website</p>
      </main>
    </div>
  );
};

export default Home;
