import React, { useContext, useCallback, useRef, useEffect, useState } from 'react';
import { debounce } from 'lodash';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSave, FaKeyboard } from 'react-icons/fa';
import * as Switch from '@radix-ui/react-switch';
import * as Tooltip from '@radix-ui/react-tooltip';
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
    const [showKeyboardHint, setShowKeyboardHint] = useState(true);

    // Hide keyboard hint after 5 seconds
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowKeyboardHint(false);
        }, 5000);
        
        return () => clearTimeout(timer);
    }, []);

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

    // Auto-focus the textarea when the component mounts
    useEffect(() => {
        if (textAreaRef.current && !loading) {
            textAreaRef.current.focus();
        }
    }, [loading]);

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
            <Tooltip.Provider delayDuration={300}>
                {/* Removed top toolbar since we're using bottom toolbar */}

                {loading ? (
                    <Styles.LoadingMessage>
                        <Styles.LoadingText>Loading emotion model...</Styles.LoadingText>
                        <Styles.RotatingCircle />
                    </Styles.LoadingMessage>
                ) : (
                    <Styles.PaperContainer className="paper-texture">
                        <Styles.PaperContent>
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
                        </Styles.PaperContent>
                    </Styles.PaperContainer>
                )}

                <AnimatePresence>
                    {showCenteredEmoji && (
                        <Styles.CenteredEmojiContainer>
                            <Styles.AnimatedEmoji
                                initial={{ scale: 0.5, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 1.5, opacity: 0 }}
                                transition={{ duration: 0.5, type: 'spring', stiffness: 200, damping: 20 }}
                                className="emoji"
                            >
                                {emoji}
                            </Styles.AnimatedEmoji>
                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ delay: 0.1 }}
                                className="emotion-label"
                            >
                                {resultText}
                            </motion.div>
                        </Styles.CenteredEmojiContainer>
                    )}
                </AnimatePresence>

                <AnimatePresence>
                    {showKeyboardHint && (
                        <motion.div
                            style={{
                                position: 'absolute',
                                bottom: '20px',
                                left: '50%',
                                transform: 'translateX(-50%)',
                                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                                color: 'white',
                                padding: '8px 16px',
                                borderRadius: '20px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                                fontSize: '0.9rem',
                                zIndex: 5
                            }}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.3 }}
                        >
                            <FaKeyboard style={{ fontSize: '1rem' }} />
                            <span>Press <kbd style={{ 
                                backgroundColor: 'rgba(255, 255, 255, 0.2)', 
                                padding: '2px 5px', 
                                borderRadius: '4px', 
                                margin: '0 2px' 
                            }}>⌘</kbd> + <kbd style={{ 
                                backgroundColor: 'rgba(255, 255, 255, 0.2)', 
                                padding: '2px 5px', 
                                borderRadius: '4px', 
                                margin: '0 2px' 
                            }}>;</kbd> to toggle Calendar view</span>
                        </motion.div>
                    )}
                </AnimatePresence>
            </Tooltip.Provider>
        </Styles.EditorContainer>
    );
};

export default Editor;