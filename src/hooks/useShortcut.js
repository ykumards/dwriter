// src/hooks/useShortcut.js
import { useEffect } from 'react';

const useShortcut = (shortcut, callback) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      const keys = shortcut.split('+');
      const ctrl = keys.includes('ctrl') && (e.ctrlKey || e.metaKey);
      const shift = keys.includes('shift') && e.shiftKey;
      const alt = keys.includes('alt') && e.altKey;
      const key = keys[keys.length - 1].toLowerCase();

      if (ctrl && (!shift || e.shiftKey) && (!alt || e.altKey) && e.key.toLowerCase() === key) {
        e.preventDefault();
        console.log(`Shortcut triggered: ${shortcut}`);
        callback();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [shortcut, callback]);
};

export default useShortcut;