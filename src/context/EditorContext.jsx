// src/context/EditorContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import { getStorage } from '../storage';

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
    const [isInitialized, setIsInitialized] = useState(false);

    // Initialize storage and load settings
    useEffect(() => {
        const initializeStorage = async () => {
            try {
                const storage = getStorage();
                await storage.initialize();
                
                // Load settings
                const settings = await storage.getSettings();
                
                if (settings.showEmoji !== undefined) {
                    setShowEmoji(settings.showEmoji);
                }
                
                if (settings.theme) {
                    setTheme(settings.theme);
                    document.documentElement.setAttribute('data-theme', settings.theme);
                }
                
                if (settings.fontFamily) {
                    setFontFamily(settings.fontFamily);
                    document.documentElement.style.setProperty('--font-family', settings.fontFamily);
                }
                
                if (settings.fontSize) {
                    setFontSize(settings.fontSize);
                    document.documentElement.style.setProperty('--font-size', getFontSizeValue(settings.fontSize));
                }
                
                setIsInitialized(true);
            } catch (error) {
                console.error('Error initializing storage:', error);
            }
        };
        
        initializeStorage();
    }, []);

    // Update settings in storage when they change
    useEffect(() => {
        if (!isInitialized) return;
        
        const updateSetting = async () => {
            try {
                const storage = getStorage();
                await storage.updateSettings({ showEmoji });
            } catch (error) {
                console.error('Error saving showEmoji setting:', error);
            }
        };
        
        updateSetting();
    }, [showEmoji, isInitialized]);
    
    useEffect(() => {
        if (!isInitialized) return;
        
        document.documentElement.setAttribute('data-theme', theme);
        
        const updateSetting = async () => {
            try {
                const storage = getStorage();
                await storage.updateSettings({ theme });
            } catch (error) {
                console.error('Error saving theme setting:', error);
            }
        };
        
        updateSetting();
    }, [theme, isInitialized]);
    
    useEffect(() => {
        if (!isInitialized) return;
        
        document.documentElement.style.setProperty('--font-family', fontFamily);
        
        const updateSetting = async () => {
            try {
                const storage = getStorage();
                await storage.updateSettings({ fontFamily });
            } catch (error) {
                console.error('Error saving fontFamily setting:', error);
            }
        };
        
        updateSetting();
    }, [fontFamily, isInitialized]);
    
    useEffect(() => {
        if (!isInitialized) return;
        
        document.documentElement.style.setProperty('--font-size', getFontSizeValue(fontSize));
        
        const updateSetting = async () => {
            try {
                const storage = getStorage();
                await storage.updateSettings({ fontSize });
            } catch (error) {
                console.error('Error saving fontSize setting:', error);
            }
        };
        
        updateSetting();
    }, [fontSize, isInitialized]);
    
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

    const saveEntry = async (callback) => {
        try {
            const storage = getStorage();
            const datetime = entryDatetime.toLocaleString();
            const newEntry = { 
                datetime, 
                emoji,
                text,
                resultText 
            };
            
            await storage.saveEntry(newEntry);
            
            // Dispatch an event to notify other components (like Calendar) that storage has changed
            window.dispatchEvent(new CustomEvent('storage-changed'));
            
            resetEditor();
            
            if (callback) {
                callback();
            }
        } catch (error) {
            console.error('Error saving entry:', error);
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
                saveEntry,
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