// src/components/Editor.jsx
import React, { useContext, useCallback, useEffect, useRef } from 'react';

import { debounce } from 'lodash';
import { checkText } from '../mlUtils';
import { formatDatetime } from '../uiUtils';
import { EditorContext } from '../context/EditorContext';
import useShortcut from '../hooks/useShortcut';
import * as Styles from './EditorStyles';

const Editor = ({ loading, progress, worker }) => {
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
      if (worker.current) {
        worker.current.postMessage({ text: newText });
      }
    }, 300),
    [worker]
  );

  // Listen to the worker's messages
  useEffect(() => {
    if (worker.current) {
      worker.current.onmessage = (event) => {
        if (event.data.status === 'complete') {
          console.log('Received classification output:', event.data.output);
          const output = event.data.output[0];
          setResultText(output.label);
          setEmoji(output.label === 'POSITIVE' ? '😊' : '😢');
        }
      };
    }
  }, [worker, setResultText, setEmoji]);

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