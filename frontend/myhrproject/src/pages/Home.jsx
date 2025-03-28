import { Home as HomeIcon } from '@mui/icons-material'; // Import MUI icon
import React from 'react';
import homeImage from '../assets/tadeprofile.jpg'; // Make sure the image exists in the assets folder
import './Home.css';
import {NavSkill} from '../portfolio/NavSkill';

const Home = () => {
  return (<>
    <div className="home-container">
      <HomeIcon  style={{paddingRight:'20px', width:'500px', height:'500px'}} className="home-icon" fontSize="large" />
      <img src={homeImage} alt="Employee Management" className="home-image" />
      <h1 style={{backgroundColor:'rgb(3,100,89)', color:'green'}}>Welcome to the Employee Management System</h1>
      <p>
        Efficiently manage employees, 
        departments, branches, and 
        leave records
        with our integrated platform.
      </p>
    </div>
    
    <div>
      <NavSkill />
    </div>
    </>
  );
};

export default Home;
