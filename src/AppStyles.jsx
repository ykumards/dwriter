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
  background-color: #1a1a1a;
  padding: 5px;
  border-radius: 4px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
`;

export const StyledNavLink = styled(NavLink)`
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

export const Content = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;
