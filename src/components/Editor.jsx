import React, { useContext, useCallback, useRef, useEffect, useState } from 'react';
import { debounce } from 'lodash';
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
    saveToLocalStorage,
  } = useContext(EditorContext);
  const textAreaRef = useRef(null);

  const handleTextChange = (e) => {
    const newText = e.target.value;
    setText(newText);
    debouncedCheckText(newText);
    adjustTextareaHeight();
  };

  const adjustTextareaHeight = () => {
    const textArea = textAreaRef.current;
    if (textArea) {
      textArea.style.height = 'auto';
      textArea.style.height = `${textArea.scrollHeight}px`;
      textArea.scrollTop = textArea.scrollHeight / 2 - textArea.clientHeight / 2;
    }
  };

  const emojiMap = {
    anger: '🤬',
    disgust: '🤢',
    fear: '😨',
    joy: '😀',
    neutral: '😐',
    sadness: '😭',
    surprise: '😲'
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
          setEmoji(emojiMap[output.label.toLowerCase()] || '😐'); // Default to neutral if not found
        }
      };
    }
  }, [worker, setResultText, setEmoji, loading]);

  useShortcut('ctrl+enter', saveToLocalStorage);
  useShortcut('cmd+enter', saveToLocalStorage);

  return (
    <Styles.EditorContainer>
      {loading ? (
        <Styles.LoadingMessage>
          <Styles.LoadingText>Loading Model</Styles.LoadingText>
          <Styles.RotatingCircle />
        </Styles.LoadingMessage>
      ) : (
        <>
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
        </>
      )}
    </Styles.EditorContainer>
  );
};

export default Editor;