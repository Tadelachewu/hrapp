import React from 'react';
import homeImage from '../assets/tadeprofile.jpg'; // Make sure to add an image in the assets folder
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <img src={homeImage} alt="Employee Management" className="home-image" />
      <h1>Welcome to the Employee Management System</h1>
      <p>
        Efficiently manage employees, departments, branches, and leave records
        with our integrated platform.
      </p>
    </div>
  );
};

export default Home;
