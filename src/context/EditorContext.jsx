// src/context/EditorContext.jsx
import React, { createContext, useState, useEffect } from 'react';

export const EditorContext = createContext();

export const EditorProvider = ({ children }) => {
    const [text, setText] = useState('');
    const [emoji, setEmoji] = useState('😐');
    const [resultText, setResultText] = useState('');
    const [entryDatetime, setEntryDatetime] = useState(new Date());
    const [showEmoji, setShowEmoji] = useState(true);
    const [theme, setTheme] = useState('light'); // Default theme is light

    // Load the persisted states from localStorage when the component mounts
    useEffect(() => {
        const savedShowEmoji = localStorage.getItem('showEmoji');
        if (savedShowEmoji !== null) {
            setShowEmoji(JSON.parse(savedShowEmoji));
        }
        
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme !== null) {
            setTheme(savedTheme);
        }
    }, []);

    // Save states to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem('showEmoji', JSON.stringify(showEmoji));
    }, [showEmoji]);
    
    useEffect(() => {
        localStorage.setItem('theme', theme);
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    const resetEditor = () => {
        setText('');
        setEmoji('😐');
        setResultText('');
        setEntryDatetime(new Date());
    };

    const saveToLocalStorage = (callback) => {
        const datetime = entryDatetime.toLocaleString();
        const newEntry = { datetime, emoji };

        const existingEntries = JSON.parse(localStorage.getItem('entries')) || [];
        const updatedEntries = [...existingEntries, newEntry];

        localStorage.setItem('entries', JSON.stringify(updatedEntries));
        resetEditor();

        if (callback) {
            callback();
        }
    };

    return (
        <EditorContext.Provider
            value={{
                text,
                setText,
                emoji,
                setEmoji,
                resultText,
                setResultText,
                entryDatetime,
                setEntryDatetime,
                saveToLocalStorage,
                showEmoji,
                setShowEmoji,
                theme,
                setTheme,
            }}
        >
            {children}
        </EditorContext.Provider>
    );
};