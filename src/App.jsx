// src/App.jsx
import React, { useState, useEffect } from 'react';
import { Routes, Route, NavLink, useNavigate } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import { motion } from 'framer-motion';
import styled from 'styled-components';

import Editor from './components/Editor';
import Calendar from './components/Calendar';
import ErrorPage from './components/ErrorPage';

const AppContainer = styled.div`
  display: flex;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background-color: #242424;
  color: rgba(255, 255, 255, 0.87);
  position: relative;
`;

const HamburgerIcon = styled(motion.div)`
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
  padding: 5px;
  border-radius: 4px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
`;

const StyledNavLink = styled(NavLink)`
  display: block;
  padding: 10px;
  margin-bottom: 10px;
  background-color: transparent;
  color: rgba(255, 255, 255, 0.87);
  text-decoration: none;
  border: none;
  text-align: left;
  cursor: pointer;

  &.active {
    background-color: #646cff;
    color: white;
  }

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

const App = () => {
  const [showNav, setShowNav] = useState(false);
  const navigate = useNavigate();

  const toggleNav = () => {
    setShowNav(!showNav);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === ';') {
        navigate('/calendar');
      }
      if ((e.ctrlKey || e.metaKey) && e.key === "'") {
        navigate('/');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [navigate]);

  return (
    <AppContainer>
      <HamburgerIcon
        onClick={toggleNav}
        animate={{ rotate: showNav ? 90 : 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      >
        <FaBars />
      </HamburgerIcon>
      {showNav && (
        <FloatingNav>
          <StyledNavLink to="/" onClick={toggleNav}>
            Editor
          </StyledNavLink>
          <StyledNavLink to="/calendar" onClick={toggleNav}>
            Calendar
          </StyledNavLink>
        </FloatingNav>
      )}
      <Content>
        <Routes>
          <Route path="/" element={<Editor />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Content>
    </AppContainer>
  );
};

export default App;