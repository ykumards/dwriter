// src/App.jsx
import React, { useEffect, useState, useRef } from 'react';
import { FaBars } from 'react-icons/fa';

import Editor from './components/Editor';
import Calendar from './components/Calendar';
import useToggleShortcut from './hooks/useToggleShortcut';
import * as Styles from './AppStyles';


const App = () => {
  const [showNav, setShowNav] = useState(false);
  const [currentComponent, setCurrentComponent] = useState('editor');

  // model dl related
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
          // Handle classification result
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
      console.log('Terminating worker');
      workerInstance.terminate();
    };
  }, []);

  const toggleNav = () => {
    setShowNav(!showNav);
  };

  useToggleShortcut(';', () => {
    setCurrentComponent((prevComponent) => (prevComponent === 'editor' ? 'calendar' : 'editor'));
  });

  const handleNavClick = (component) => {
    setCurrentComponent(component);
    setShowNav(false); // Close the nav after selection
  };

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