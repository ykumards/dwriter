import React, { useContext, useCallback, useRef, useEffect, useState } from 'react';
import { debounce } from 'lodash';
import { motion } from 'framer-motion';
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
    saveToLocalStorage,
    showEmoji,
    setShowEmoji,
  } = useContext(EditorContext);
  const textAreaRef = useRef(null);
  const [triggerAnimation, setTriggerAnimation] = useState(false);
  const [showCenteredEmoji, setShowCenteredEmoji] = useState(false);

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
    surprise: '😲',
  };

  const debouncedCheckText = useCallback(
    debounce((newText) => {
      if (worker.current) {
        worker.current.postMessage({ text: newText });
      }
    }, 300),
    [worker]
  );

  useEffect(() => {
    if (worker.current) {
      worker.current.onmessage = (event) => {
        if (event.data.status === 'complete') {
          const output = event.data.output[0];
          setResultText(output.label);
          setEmoji(emojiMap[output.label.toLowerCase()] || '😐');
        }
      };
    }
  }, [worker, setResultText, setEmoji]);

  const triggerEmojiAnimation = () => {
    setTriggerAnimation(true);
    setShowCenteredEmoji(true); // Show centered emoji
    setTimeout(() => {
      setTriggerAnimation(false);
      setShowCenteredEmoji(false); // Hide centered emoji after animation
    }, 1000); // Matches the duration of the animation
  };

  const handleSaveAndAnimate = () => {
    // Trigger the animation first, then save and reset
    triggerEmojiAnimation();
    setTimeout(() => {
      saveToLocalStorage(); // Save after the animation
    }, 1000);
  };

  useShortcut('ctrl+enter', handleSaveAndAnimate);
  useShortcut('cmd+enter', handleSaveAndAnimate);

  return (
    <Styles.EditorContainer>
      <Styles.ToggleContainer>
        <Styles.ToggleSwitch>
          <input
            type="checkbox"
            checked={showEmoji}
            onChange={() => setShowEmoji(!showEmoji)}
          />
          <span className="slider round"></span>
          <span className="tooltip">Toggle Live Emotion Emoji</span>
        </Styles.ToggleSwitch>
      </Styles.ToggleContainer>
      {loading ? (
        <Styles.LoadingMessage>
          <Styles.LoadingText>Loading Model</Styles.LoadingText>
          <Styles.RotatingCircle />
        </Styles.LoadingMessage>
      ) : (
        <>
          <Styles.Header>
            <Styles.EntryDatetime>{formatDatetime(entryDatetime)}</Styles.EntryDatetime>
            {showEmoji && (
              <Styles.EmojiDisplay title={resultText}>{emoji}</Styles.EmojiDisplay>
            )}
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

      {showCenteredEmoji && (
        <Styles.CenteredEmojiContainer>
          <motion.div
            animate={{ scale: [1, 1.5, 1], opacity: [1, 0.8, 1] }}
            transition={{ duration: 0.5 }}
          >
            <Styles.EmojiDisplay title={resultText}>{emoji}</Styles.EmojiDisplay>
          </motion.div>
        </Styles.CenteredEmojiContainer>
      )}
    </Styles.EditorContainer>
  );
};

export default Editor;