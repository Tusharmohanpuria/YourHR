import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 text-center">
          <h1 className="display-3 fw-bold mb-4">Welcome to YourHR</h1>
          <p className="lead mb-4 text-muted">Discover your ideal job role tailored to your qualifications and preferences.</p>
          <div className="d-flex justify-content-center gap-3">
            <Link to="/signup" className="btn btn-primary btn-lg shadow-sm">Sign Up</Link>
            <Link to="/login" className="btn btn-outline-primary btn-lg shadow-sm">Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
