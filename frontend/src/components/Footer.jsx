import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4 mt-auto">
      <div className="container text-center">
        <p className="mb-2">&copy; 2024 YourHR. All rights reserved.</p>
        <div className="mb-0">
          <span className="text-white text-decoration-none mx-2">Privacy Policy</span>
          |
          <span className="text-white text-decoration-none mx-2">Terms of Service</span>
          |
          <span className="text-white text-decoration-none mx-2">Contact Us</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
