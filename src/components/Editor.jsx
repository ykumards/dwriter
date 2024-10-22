import React, { useContext, useCallback, useRef, useEffect, useState } from 'react';
import { debounce } from 'lodash';
import { motion } from 'framer-motion';
import { formatDatetime, getEmojiByEmotion, getEmotionByEmoji } from '../uiUtils';
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

    const debouncedCheckText = useCallback(
        debounce((newText) => {
            if (worker.current) {
                worker.current.postMessage({ text: newText });
            }
        }, 100),
        [worker]
    );

    useEffect(() => {
        if (worker.current) {
            worker.current.onmessage = (event) => {
                if (event.data.status === 'complete') {
                    const output = event.data.output[0];
                    setResultText(output.label);
                    setEmoji(getEmojiByEmotion(output.label));
                }
            };
        }
    }, [worker, setResultText, setEmoji, loading]);

    const triggerEmojiAnimation = (currentEmoji) => {
        setTriggerAnimation(true);
        setShowCenteredEmoji(true); // Show centered emoji
        setTimeout(() => {
            setTriggerAnimation(false);
            setShowCenteredEmoji(false); // Hide centered emoji after animation
        }, 1000); // Matches the duration of the animation
    };

    const handleSaveAndAnimate = () => {
        // Trigger the animation with the current emoji before resetting the editor
        triggerEmojiAnimation(emoji);
        setTimeout(() => {
            saveToLocalStorage(); // Save and reset after the animation
        }, 1000); // Delay save to match animation duration
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
                    <span className="tooltip">Toggle live emotion</span>
                </Styles.ToggleSwitch>
                <Styles.SaveButton onClick={handleSaveAndAnimate}>
                    Save
                </Styles.SaveButton>
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
                            <Styles.EmojiDisplay title={getEmotionByEmoji(emoji)}>{emoji}</Styles.EmojiDisplay>
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