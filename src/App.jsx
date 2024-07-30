// src/App.jsx

import React, { useState, useEffect } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { FaBars } from 'react-icons/fa';
import styled from 'styled-components';


import Editor from './components/Editor';
import Calendar from './components/Calendar';
import ErrorPage from "./error-page";
// import './App.css';

const AppContainer = styled.div`
  display: flex;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background-color: #242424;
  color: rgba(255, 255, 255, 0.87);
  position: relative;
`;

const HamburgerIcon = styled.button`
  position: absolute;
  top: 20px;
  left: 20px;
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.87);
  font-size: 24px;
  cursor: pointer;
  &:hover {
    color: #646cff;
  }
`;

const FloatingNav = styled.nav`
  position: absolute;
  top: 20px;
  left: 60px;
  background-color: #1a1a1a;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
`;

const NavLink = styled.a`
  display: block;
  padding: 10px;
  margin-bottom: 10px;
  background-color: transparent;
  color: rgba(255, 255, 255, 0.87);
  text-decoration: none;
  border: none;
  text-align: left;
  cursor: pointer;

  &:hover {
    background-color: #646cff;
    color: white;
  }
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const router = createBrowserRouter([
  {
    path: "/",
    element: <Editor />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/calendar",
    element: <Calendar />,
    errorElement: <ErrorPage />,
  },
]);

const App = () => {
  const [showNav, setShowNav] = useState(false);

  const toggleNav = () => {
    setShowNav(!showNav);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'c') {
        window.location.pathname = '/calendar';
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'e') {
        window.location.pathname = '/';
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <AppContainer>
      <HamburgerIcon onClick={toggleNav}>
        <FaBars />
      </HamburgerIcon>
      {showNav && (
        <FloatingNav>
          <NavLink href="/" onClick={toggleNav}>Home</NavLink>
          <NavLink href="/calendar" onClick={toggleNav}>Calendar</NavLink>
        </FloatingNav>
      )}
      <Content>
        <RouterProvider router={router} />
      </Content>
    </AppContainer>
  );
};

export default App;