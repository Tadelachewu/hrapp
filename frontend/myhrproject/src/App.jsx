import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { AuthProvider } from './AuthContext'; // Import the AuthProvider
import AuthPage from './pages/AuthPage'; // Login page
import Branches from './pages/Branches';
import Department from './pages/Department';
import Employees from './pages/Employees';
import Home from './pages/Home';
import Leave from './pages/Leave';
import NavBar from './pages/NavBar';
import ProtectedRoute from './pages/ProtectedRoute'; // Protected Route Component

import About from './portfolio/About';
import Achievements from './portfolio/Achievements';
import Skills from './portfolio/Skills';
import Posts from './portfolio/Posts';
import Bios from './portfolio/Bios';
import Challenges from './portfolio/Challenges';

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthProvider>
        <NavBar />
      </AuthProvider>
    ),
    children: [
      { path: "/", element: <Home />,
        children:[
          {path:"/about", element:<About />},
          {path:'/skills', element:<Skills />},
          {path:'/posts', element:<Posts/>},
          {path:'/challenges', element:<Challenges />},
          {path:'/bios', element:<Bios />},
          {path:"/achievements", element:<Achievements />},
        ],
       },
      {
        path: "employees",
        element: (
          <ProtectedRoute>
            <Employees />
          </ProtectedRoute>
        ),
      },
      {
        path: "departments",
        element: (
          <ProtectedRoute>
            <Department />
          </ProtectedRoute>
        ),
      },
      {
        path: "branches",
        element: (
          <ProtectedRoute>
            <Branches />
          </ProtectedRoute>
        ),
      },
      {
        path: "leave",
        element: (
          <ProtectedRoute>
            <Leave />
          </ProtectedRoute>
        ),
      },
      { path: "/login", element: <AuthPage /> }, // Login route
    ],
  },
]);
