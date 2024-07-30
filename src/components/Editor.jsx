import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { debounce } from 'lodash';
import { checkText } from '../mlUtils';
import { formatDatetime } from '../uiUtils';

// Styled components
const EditorContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 80%;
    background-color: #f5f5f5;
    margin: 0;
`;

const Header = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 10px;
`;

const EntryDatetime = styled.div`
    font-size: 0.8rem;
    color: #888;
    margin-right: 10px;
`;

const EmojiDisplay = styled.div`
    font-size: 2em;
`;

const TextArea = styled.textarea`
    width: 80%;
    height: 80%;
    border: none;
    outline: none;
    font-size: 1.5rem;
    line-height: 1.6;
    background: none;
    resize: none;
    overflow-y: auto;
    font-family: 'Menlo', Courier, monospace;
    color: black;

    ::placeholder {
        color: #ccc;
    }
`;


const Editor = () => {
    const [text, setText] = useState('');
    const [emoji, setEmoji] = useState('');
    const [resultText, setResultText] = useState('');
    const [entryDatetime, setEntryDatetime] = useState(null);

    const resetEditor = () => {
        setText('');
        setEmoji('');
        setResultText('');
        setEntryDatetime(null);
    };

    const handleTextChange = (e) => {
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

  const saveToLocalStorage = () => {
    const datetime = formatDatetime(entryDatetime);
    const newEntry = { datetime, emoji };

    // Get existing entries from local storage
    const existingEntries = JSON.parse(localStorage.getItem('entries')) || [];

    // Append the new entry
    const updatedEntries = [...existingEntries, newEntry];

    // Save the updated entries back to local storage
    localStorage.setItem('entries', JSON.stringify(updatedEntries));

    resetEditor();
  };

  const handleKeyDown = (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      saveToLocalStorage();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [text, emoji, entryDatetime]);

  return (
    <EditorContainer>
      <Header>
        <EntryDatetime>{formatDatetime(entryDatetime)}</EntryDatetime>
        <EmojiDisplay title={resultText}>{emoji}</EmojiDisplay>
      </Header>
      <TextArea
        value={text}
        onChange={handleTextChange}
        className="editor-textarea"
        placeholder="Start typing..."
        autoFocus
      />
    </EditorContainer>
  );
};

export default Editor;