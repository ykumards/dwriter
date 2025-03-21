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
    const [fontFamily, setFontFamily] = useState('Open Sans'); // Default font family
    const [fontSize, setFontSize] = useState('medium'); // Default font size

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
        
        const savedFontFamily = localStorage.getItem('fontFamily');
        if (savedFontFamily !== null) {
            setFontFamily(savedFontFamily);
        }
        
        const savedFontSize = localStorage.getItem('fontSize');
        if (savedFontSize !== null) {
            setFontSize(savedFontSize);
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
    
    useEffect(() => {
        localStorage.setItem('fontFamily', fontFamily);
        document.documentElement.style.setProperty('--font-family', fontFamily);
    }, [fontFamily]);
    
    useEffect(() => {
        localStorage.setItem('fontSize', fontSize);
        document.documentElement.style.setProperty('--font-size', getFontSizeValue(fontSize));
    }, [fontSize]);
    
    // Convert fontSize option to actual CSS value
    const getFontSizeValue = (size) => {
        switch (size) {
            case 'small': return '14px';
            case 'large': return '18px';
            case 'medium':
            default: return '16px';
        }
    };

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
                fontFamily,
                setFontFamily,
                fontSize,
                setFontSize,
            }}
        >
            {children}
        </EditorContext.Provider>
    );
};