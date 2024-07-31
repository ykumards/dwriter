// src/context/EditorContext.jsx
import React, { createContext, useState } from 'react';

export const EditorContext = createContext();

export const EditorProvider = ({ children }) => {
  const [text, setText] = useState('');
  const [emoji, setEmoji] = useState('😐');
  const [resultText, setResultText] = useState('');
  const [entryDatetime, setEntryDatetime] = useState(new Date());

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
      }}
    >
      {children}
    </EditorContext.Provider>
  );
};