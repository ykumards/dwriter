import React, { useEffect, useState, useRef } from 'react';
import { FaBars } from 'react-icons/fa';

import Editor from './components/Editor';
import Calendar from './components/Calendar';
import useToggleShortcut from './hooks/useToggleShortcut';
import * as Styles from './AppStyles';

const App = () => {
  const [showNav, setShowNav] = useState(false);
  const [currentComponent, setCurrentComponent] = useState('editor');
  const navRef = useRef(null); // Ref for the nav menu
  const hamburgerRef = useRef(null); // Ref for the hamburger icon

  // Model-related states
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [classification, setClassification] = useState(null);
  const workerRef = useRef(null);

  useEffect(() => {
    const workerInstance = new Worker(new URL('./modelWorker.js', import.meta.url), { type: 'module' });
    workerRef.current = workerInstance;

    workerInstance.onmessage = (event) => {
      switch (event.data.status) {
        case 'initiate':
          console.log('Model loading initiated');
          break;
        case 'progress':
          setProgress(event.data.progress * 100); // Convert to percentage
          break;
        case 'ready':
          console.log('Model loaded successfully');
          setLoading(false);
          setProgress(100);
          break;
        case 'complete':
          setClassification(event.data.output[0].label);
          break;
        case 'error':
          console.error('Error loading model:', event.data.error);
          setLoading(false);
          setProgress(0);
          break;
        default:
          console.log('Worker message:', event.data);
      }
    };

    workerInstance.postMessage({ text: 'initialization' });

    return () => {
      workerInstance.terminate();
    };
  }, []);

  const toggleNav = () => {
    setShowNav(!showNav);
  };

  const handleNavClick = (component) => {
    setCurrentComponent(component);
    setShowNav(false); // Close the nav after selection
  };

  useToggleShortcut(';', () => {
    setCurrentComponent((prevComponent) => (prevComponent === 'editor' ? 'calendar' : 'editor'));
  });

  // Hide nav when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        navRef.current &&
        !navRef.current.contains(event.target) &&
        hamburgerRef.current &&
        !hamburgerRef.current.contains(event.target)
      ) {
        setShowNav(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [navRef, hamburgerRef]);

  return (
    <Styles.AppContainer>
      <Styles.HamburgerIcon
        ref={hamburgerRef} // Assign the ref to the hamburger icon
        onClick={toggleNav}
        animate={{ rotate: showNav ? 90 : 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      >
        <FaBars />
      </Styles.HamburgerIcon>
      {showNav && (
        <Styles.FloatingNav ref={navRef}> {/* Assign the ref to the nav menu */}
          <Styles.StyledNavLink onClick={() => handleNavClick('editor')}>
            Editor
          </Styles.StyledNavLink>
          <Styles.StyledNavLink onClick={() => handleNavClick('calendar')}>
            Calendar
          </Styles.StyledNavLink>
        </Styles.FloatingNav>
      )}
      <Styles.Content>
        {currentComponent === 'editor' && (
          <Editor
            loading={loading}
            progress={progress}
            worker={workerRef}
          />
        )}
        {currentComponent === 'calendar' && <Calendar />}
      </Styles.Content>
    </Styles.AppContainer>
  );
};

export default App;