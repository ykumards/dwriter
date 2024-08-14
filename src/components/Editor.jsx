// src/components/Editor.jsx
import React, { useContext, useCallback, useEffect, useRef } from 'react';

import { debounce } from 'lodash';
import { checkText } from '../mlUtils';
import { formatDatetime } from '../uiUtils';
import { EditorContext } from '../context/EditorContext';
import useShortcut from '../hooks/useShortcut';
import * as Styles from './EditorStyles';

const Editor = ({ loading, progress, sendMessageToWorker }) => {
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
    <Styles.EditorContainer>
      <Styles.Header>
        <Styles.EntryDatetime>{formatDatetime(entryDatetime)}</Styles.EntryDatetime>
        <Styles.EmojiDisplay title={resultText}>{emoji}</Styles.EmojiDisplay>
      </Styles.Header>
      <Styles.TextAreaContainer>
        <Styles.TextArea
          ref={textAreaRef}
          value={text}
          onChange={handleTextChange}
          className="editor-textarea"
          placeholder="Start typing..."
          autoFocus
        />
      </Styles.TextAreaContainer>
    </Styles.EditorContainer>
  );
};

export default Editor;