import React, { useEffect, useState, useRef, useContext } from 'react';
import { 
    FaBars, 
    FaEdit, 
    FaCalendarAlt, 
    FaChevronLeft,
    FaChevronRight,
    FaFileExport
} from 'react-icons/fa';
import { AnimatePresence } from 'framer-motion';
import { writeTextFile } from '@tauri-apps/api/fs';
import { save } from '@tauri-apps/api/dialog';

import Editor from './components/Editor';
import Calendar from './components/Calendar';
import BottomToolbar from './components/BottomToolbar';
import ThemeSettings from './components/ThemeSettings';
import useToggleShortcut from './hooks/useToggleShortcut';
import { EditorContext } from './context/EditorContext';
import * as Styles from './AppStyles';

const App = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [currentComponent, setCurrentComponent] = useState('editor');
    const [isExporting, setIsExporting] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const { showEmoji, setShowEmoji, saveToLocalStorage, theme } = useContext(EditorContext);

    // Model-related states
    const [loading, setLoading] = useState(true);
    const [progress, setProgress] = useState(0);
    const [classification, setClassification] = useState(null);
    const workerRef = useRef(null);

    useEffect(() => {
        const workerInstance = new Worker(new URL('./modelWorker.js', import.meta.url), { type: 'module' });
        workerRef.current = workerInstance;

        workerInstance.onmessage = (event) => {
            switch (event.data.status) {
                case 'initiate':
                    console.log('Model loading initiated');
                    break;
                case 'progress':
                    setProgress(event.data.progress * 100); // Convert to percentage
                    break;
                case 'ready':
                    console.log('Model loaded successfully');
                    setLoading(false);
                    setProgress(100);
                    break;
                case 'complete':
                    setClassification(event.data.output[0].label);
                    break;
                case 'error':
                    console.error('Error loading model:', event.data.error);
                    setLoading(false);
                    setProgress(0);
                    break;
                default:
                    console.log('Worker message:', event.data);
            }
        };

        workerInstance.postMessage({ text: 'initialization' });

        return () => {
            workerInstance.terminate();
        };
    }, []);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const handleNavClick = (component) => {
        if (component === 'settings') {
            setShowSettings(true);
        } else {
            setCurrentComponent(component);
        }
    };

    useToggleShortcut(';', () => {
        setCurrentComponent((prevComponent) => (prevComponent === 'editor' ? 'calendar' : 'editor'));
    });

    const handleSaveClick = () => {
        saveToLocalStorage();
    };

    const handleExportClick = async () => {
        try {
            setIsExporting(true);
            console.log('Exporting entries...');
            const storedEntries = localStorage.getItem('entries');
            if (storedEntries) {
                // Open a save dialog and let the user choose where to save the file
                const currentDate = new Date().toISOString().split('T')[0];
                const defaultFileName = `emotion-entries-${currentDate}.json`;
                const filePath = await save({
                    defaultPath: defaultFileName,
                    filters: [{
                        name: 'JSON Files',
                        extensions: ['json']
                    }]
                });

                if (filePath) {
                    await writeTextFile(filePath, storedEntries);
                    console.log(`File saved as ${filePath}`);
                } else {
                    console.log('Save operation was cancelled.');
                }
            } else {
                console.log('No entries found to export.');
            }
        } catch (error) {
            console.error('Failed to export emotions:', error);
        } finally {
            setIsExporting(false);
        }
    };

    return (
        <Styles.AppContainer>
            {/* Removed sidebar since we're using the bottom toolbar */}
            {/* </Styles.Sidebar> */}
            
            <Styles.ContentFullWidth>
                {currentComponent === 'editor' && (
                    <Editor
                        loading={loading}
                        progress={progress}
                        worker={workerRef}
                    />
                )}
                {currentComponent === 'calendar' && <Calendar />}
                {/* Removed shortcut hint as it's no longer needed with the bottom toolbar */}
            </Styles.ContentFullWidth>
            
            <BottomToolbar 
                currentComponent={currentComponent}
                onNavClick={handleNavClick}
                showEmoji={showEmoji}
                setShowEmoji={setShowEmoji}
                onSave={handleSaveClick}
                onExport={handleExportClick}
                isExporting={isExporting}
                theme={theme}
            />
            
            <AnimatePresence>
                {showSettings && (
                    <ThemeSettings onClose={() => setShowSettings(false)} />
                )}
            </AnimatePresence>
        </Styles.AppContainer>
    );
};

export default App;