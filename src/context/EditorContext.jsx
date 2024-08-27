// src/context/EditorContext.jsx
import React, { createContext, useState } from 'react';

import { formatDatetime } from '../uiUtils';

export const EditorContext = createContext();

export const EditorProvider = ({ children }) => {
  const [text, setText] = useState('');
  const [emoji, setEmoji] = useState('😐');
  const [resultText, setResultText] = useState('');
  const [entryDatetime, setEntryDatetime] = useState(new Date());

  // Reset editor state
  const resetEditor = () => {
    setText('');
    setEmoji('😐');
    setResultText('');
    setEntryDatetime(new Date());
  };

  const saveToLocalStorage = (triggerAnimation) => {
    triggerAnimation();

    // Delay the reset to allow the animation to complete
    setTimeout(() => {
      const datetime = formatDatetime(entryDatetime);
      const newEntry = { datetime, emoji };

      const existingEntries = JSON.parse(localStorage.getItem('entries')) || [];
      const updatedEntries = [...existingEntries, newEntry];

      localStorage.setItem('entries', JSON.stringify(updatedEntries));
      resetEditor();
    }, 500); // Adjust the delay to match the duration of the animation
  };

  return (
    <EditorContext.Provider
      value={{
        text,
        setText,
        emoji,
        setEmoji,
        resultText,
        setResultText,
        entryDatetime,
        setEntryDatetime,
        saveToLocalStorage
      }}
    >
      {children}
    </EditorContext.Provider>
  );
};