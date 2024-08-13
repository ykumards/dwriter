import React, { useContext, useCallback, useRef, useEffect, useState } from 'react';
import { debounce } from 'lodash';
import { formatDatetime } from '../uiUtils';
import { EditorContext } from '../context/EditorContext';
import useShortcut from '../hooks/useShortcut';
import * as Styles from './EditorStyles';

const moodToEmoji = {
  positive: '😊',
  negative: '😢',
  neutral: '😐',
};

const Editor = ({ loading, progress, sendMessageToWorker }) => {
  const {
    text,
    setText,
    emoji,
    setEmoji,
    resultText,
    setResultText,
    entryDatetime,
    saveToLocalStorage,
  } = useContext(EditorContext);
  const [prediction, setPrediction] = useState(null);
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

  const sendMessageToWorkerAsync = (message) => {
    return new Promise((resolve, reject) => {
      sendMessageToWorker(message, (response) => {
        console.log('Received response from worker:', response);
        if (response) {
          resolve(response);
        } else {
          reject(new Error('Worker response is null'));
        }
      });
    });
  };

  const debouncedCheckText = useCallback(
    debounce(async (sampleText) => {
      try {
        console.log('Sending text to worker:', sampleText);
        const response = await sendMessageToWorkerAsync({ text: sampleText });
        const mood = response[0].label;
        setPrediction(response);
        setEmoji(moodToEmoji[mood]);
        setResultText(mood);
      } catch (error) {
        console.error('Error in worker response:', error);
      }
    }, 300),
    [sendMessageToWorker]
  );

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
          {prediction && <div>Prediction: {prediction}</div>}
        </>
      )}
    </Styles.EditorContainer>
  );
};

export default Editor;