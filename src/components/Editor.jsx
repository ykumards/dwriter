import React, { useState, useCallback } from 'react';
import { debounce } from 'lodash';
import { checkText } from '../mlUtils';
import './Editor.css';

const Editor = () => {
  const [text, setText] = useState('');
  const [emoji, setEmoji] = useState('');
  const [resultText, setResultText] = useState('');
  const [entryDatetime, setEntryDatetime] = useState(null);

  const handleChange = (e) => {
    const newText = e.target.value;
    setText(newText);

    if (!entryDatetime) {
      setEntryDatetime(new Date());
    }

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

  const formatDatetime = (datetime) => {
    if (!datetime) return '';
    const options = { day: '2-digit', month: 'long', year: 'numeric' };
    const date = datetime.toLocaleDateString('en-GB', options);
    const time = datetime.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
    return `${date}, ${time}`;
  };

  return (
    <div className="editor-container">
      <div className="header">
        <div className="entry-datetime">{formatDatetime(entryDatetime)}</div>
        <div className="emoji-display" title={resultText}>{emoji}</div>
      </div>
      <textarea
        value={text}
        onChange={handleChange}
        className="editor-textarea"
        placeholder="Start typing..."
        autoFocus
      />
    </div>
  );
};

export default Editor;