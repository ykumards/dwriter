import React, { useState, useCallback } from 'react';
import { debounce } from 'lodash';
import { checkText } from '../mlUtils';
import './Editor.css';

const Editor = () => {
  const [text, setText] = useState('');
  const [emoji, setEmoji] = useState('');
  const [resultText, setResultText] = useState('');

  const handleChange = (e) => {
    const newText = e.target.value;
    setText(newText);
    debouncedCheckText(newText);
  };

  const debouncedCheckText = useCallback(
    debounce((newText) => {
      const result = checkText(newText);
      setResultText(result);
      setEmoji(result === 'yay' ? '😊' : '😢');
    }, 300),
    []
  );

  return (
    <div className="editor-container">
      <textarea
        value={text}
        onChange={handleChange}
        className="editor-textarea"
        placeholder="Start typing..."
        autoFocus
      />
      <div className="emoji-display" title={resultText}>{emoji}</div>
    </div>
  );
};

export default Editor;