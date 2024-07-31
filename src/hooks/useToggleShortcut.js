// src/hooks/useToggleShortcut.js
import { useEffect } from 'react';

const useToggleShortcut = (key, callback) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key === key) {
        event.preventDefault();
        callback();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [key, callback]);
};

export default useToggleShortcut;