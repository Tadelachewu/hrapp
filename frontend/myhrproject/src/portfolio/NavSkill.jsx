import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import styles from './nav.module.css'; // Ensure this is actually a CSS Module

export const NavSkill = () => {
  return (
    <div className={styles.container} style={{ backgroundColor: 'rgb(60, 105, 7)', padding: '20px' }}>
      <nav>
        <ul className={styles.navList}>
          <li>
            <Link to="/about" className={styles.link}> About </Link>
          </li>
          <li>
            <Link to="/skills" className={styles.link}> Skills </Link>
          </li>
          <li>
            <Link to="/achievements" className={styles.link}> Achievements </Link>
          </li>
          <li>
            <Link to="/posts" className={styles.link}> Posts </Link>
          </li>
          <li>
            <Link to="/challenges" className={styles.link}> Challenges </Link>
          </li>
          <li>
            <Link to="/bios" className={styles.link}> Bios </Link>
          </li>
        </ul>
      </nav>
      
      <div className={styles.outletContainer}>
        <Outlet />
      </div>
    </div>
  );
};
