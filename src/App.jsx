// src/App.jsx
import React, { useState } from 'react';
import { FaBars } from 'react-icons/fa';

import Editor from './components/Editor';
import Calendar from './components/Calendar';
import useToggleShortcut from './hooks/useToggleShortcut';
import * as Styles from './AppStyles';



const App = () => {
  const [showNav, setShowNav] = useState(false);
  const [currentComponent, setCurrentComponent] = useState('editor');

  const toggleNav = () => {
    setShowNav(!showNav);
  };

  useToggleShortcut(';', () => {
    setCurrentComponent((prevComponent) => (prevComponent === 'editor' ? 'calendar' : 'editor'));
  });

  return (
    <Styles.AppContainer>
      <Styles.HamburgerIcon
        onClick={toggleNav}
        animate={{ rotate: showNav ? 90 : 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      >
        <FaBars />
      </Styles.HamburgerIcon>
      {showNav && (
        <Styles.FloatingNav>
          <Styles.StyledNavLink to="/" onClick={toggleNav}>
            Editor
          </Styles.StyledNavLink>
          <Styles.StyledNavLink to="/calendar" onClick={toggleNav}>
            Calendar
          </Styles.StyledNavLink>
        </Styles.FloatingNav>
      )}
      <Styles.Content>
        {currentComponent === 'editor' && <Editor />}
        {currentComponent === 'calendar' && <Calendar />}
      </Styles.Content>
    </Styles.AppContainer>
  );
};

export default App;