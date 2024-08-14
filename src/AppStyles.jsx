import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import styled from 'styled-components';

export const AppContainer = styled.div`
  display: flex;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background-color: #242424;
  color: rgba(255, 255, 255, 0.87);
  position: relative;
`;

export const HamburgerIcon = styled(motion.div)`
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

export const FloatingNav = styled.nav`
  position: absolute;
  top: 20px;
  left: 60px;
  background-color: #2b2b2b;
  padding: 5px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
`;

export const StyledNavLink = styled(NavLink)`
  display: block;
  padding: 12px;
  margin-bottom: 10px;
  background-color: #2b2b2b; /* Dark background color */
  color: rgba(255, 255, 255, 0.87);
  text-decoration: none;
  border: none;
  border-radius: 8px; /* Rounded corners */
  text-align: left;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease; /* Smooth transitions */

  &.active {
    background-color: #242424;
    color: white;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3); /* Subtle shadow for active state */
  }

  &:hover {
    background-color: #535ac8; /* Slightly darker shade on hover */
    color: white;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3); /* Add shadow on hover */
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(100, 108, 255, 0.6); /* Focus ring similar to macOS */
  }
`;

export const Content = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;