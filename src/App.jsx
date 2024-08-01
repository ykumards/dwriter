import React, { useEffect, useState, useRef, useCallback } from 'react';
import { FaBars } from 'react-icons/fa';

import Editor from './components/Editor';
import Calendar from './components/Calendar';
import useToggleShortcut from './hooks/useToggleShortcut';
import { AppContainer, HamburgerIcon, FloatingNav, StyledNavLink, Content } from './App.styles.jsx';

const App = () => {
  const [showNav, setShowNav] = useState(false);
  const [currentComponent, setCurrentComponent] = useState('editor');
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [classification, setClassification] = useState('');
  const workerRef = useRef(null);

  // useEffect(() => {
  //   if (!workerRef.current) {
  //     // Create the worker if it does not yet exist.
  //     workerRef.current = new Worker(new URL('./modelWorker.js', import.meta.url), {
  //       type: 'module'
  //     });
  //   }

  //   // Create a callback function for messages from the worker thread.
  //   const onMessageReceived = (e) => {
  //     switch (e.data.status) {
  //       case 'initiate':
  //         setReady(false);
  //         break;
  //       case 'ready':
  //         setReady(true);
  //         break;
  //       case 'complete':
  //         setResult(e.data.output[0])
  //         break;
  //     }
  //   };

  //   // Attach the callback function as an event listener.
  //   workerRef.current.addEventListener('message', onMessageReceived);

  //   // Define a cleanup function for when the component is unmounted.
  //   return () => workerRef.current.removeEventListener('message', onMessageReceived);
  // });

  // const classify = useCallback((text) => {
  //   if (workerRef.current) {
  //     workerRef.current.postMessage({ text });
  //   }
  // }, []);

  // // Hardcoded example sentence for classification
  // const sampleText = "I am feeling really happy today!";
  // console.log('Classifying:', sampleText);
  // console.log(classify(sampleText));

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

    // // Hardcoded example sentence for classification
    // const sampleText = "I am feeling really happy today!";
    // workerRef.current.postMessage({ text: sampleText });

    return () => {
      workerInstance.terminate();
    };
  }, []);

  const sendMessageToWorker = (message, callback) => {
    console.log('Sending message to worker:', message);
    console.log('Worker:', workerRef.current);
    if (workerRef.current) {
      workerRef.current.callback = callback;
      workerRef.current.postMessage(message);
    }
  };

  const toggleNav = () => {
    setShowNav(!showNav);
  };

  useToggleShortcut(';', () => {
    setCurrentComponent((prevComponent) => (prevComponent === 'editor' ? 'calendar' : 'editor'));
  });

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
        {currentComponent === 'editor' && (
          <Editor
            loading={loading}
            progress={progress}
            sendMessageToWorker={sendMessageToWorker}
          />
        )}
        {currentComponent === 'calendar' && <Calendar />}
        {/* {!loading && <div>Classification Result: {classification}</div>} */}
      </Content>
    </AppContainer>
  );
};

export default App;