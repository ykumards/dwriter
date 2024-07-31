// src/components/Editor.jsx
import React, { useContext, useCallback, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { debounce } from 'lodash';
import { checkText } from '../mlUtils';
import { formatDatetime } from '../uiUtils';
import { EditorContext } from '../context/EditorContext';
import useShortcut from '../hooks/useShortcut';

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

const TextAreaContainer = styled.div`
  position: relative;
  width: 80%;
  height: 80%;
  background: none;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden; /* Prevent overflow outside the container */
`;

const TextArea = styled.textarea`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
  height: auto;
  max-height: 100%; /* Limit the height of the textarea */
  border: none;
  outline: none;
  font-size: 1.5rem;
  line-height: 1.6;
  background: none;
  resize: none;
  overflow-y: auto; /* Allow vertical scrolling */
  color: black;

  ::placeholder {
    color: #ccc;
  }
`;

const Editor = () => {
  const {
    text,
    setText,
    emoji,
    setEmoji,
    resultText,
    setResultText,
    entryDatetime,
    setEntryDatetime,
    saveToLocalStorage, // Use the saveToLocalStorage function from the context
  } = useContext(EditorContext);
  const textAreaRef = useRef(null);

  // Handle text change and trigger debounce function
  const handleTextChange = (e) => {
    const newText = e.target.value;
    setText(newText);

    debouncedCheckText(newText);
    adjustTextareaHeight();
  };

  // Adjust textarea height to keep cursor in the middle
  const adjustTextareaHeight = () => {
    const textArea = textAreaRef.current;
    if (textArea) {
      textArea.style.height = 'auto';
      textArea.style.height = `${textArea.scrollHeight}px`;

      // Scroll the text area to keep the cursor in the middle
      textArea.scrollTop = textArea.scrollHeight / 2 - textArea.clientHeight / 2;
    }
  };

  // Debounce function to check text
  const debouncedCheckText = useCallback(
    debounce((newText) => {
      const result = checkText(newText);
      setResultText(result);
      setEmoji(result === 'yay' ? '😊' : '😢');
    }, 300),
    []
  );

  // Use custom hook to handle keyboard shortcuts
  useShortcut('ctrl+enter', saveToLocalStorage);
  useShortcut('cmd+enter', saveToLocalStorage); // For Mac users

  return (
    <EditorContainer>
      <Header>
        <EntryDatetime>{formatDatetime(entryDatetime)}</EntryDatetime>
        <EmojiDisplay title={resultText}>{emoji}</EmojiDisplay>
      </Header>
      <TextAreaContainer>
        <TextArea
          ref={textAreaRef}
          value={text}
          onChange={handleTextChange}
          className="editor-textarea"
          placeholder="Start typing..."
          autoFocus
        />
      </TextAreaContainer>
    </EditorContainer>
  );
};

export default Editor;