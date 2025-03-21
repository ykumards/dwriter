import React, { useEffect, useState, useRef } from 'react';
import { 
    FaBars, 
    FaEdit, 
    FaCalendarAlt, 
    FaChevronLeft,
    FaChevronRight
} from 'react-icons/fa';

import Editor from './components/Editor';
import Calendar from './components/Calendar';
import useToggleShortcut from './hooks/useToggleShortcut';
import * as Styles from './AppStyles';

const App = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [currentComponent, setCurrentComponent] = useState('editor');

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
        setCurrentComponent(component);
    };

    useToggleShortcut(';', () => {
        setCurrentComponent((prevComponent) => (prevComponent === 'editor' ? 'calendar' : 'editor'));
    });

    return (
        <Styles.AppContainer>
            <Styles.Sidebar
                isOpen={sidebarOpen}
                initial={false}
                animate={{ width: sidebarOpen ? '220px' : '60px' }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
            >
                <Styles.SidebarHeader isOpen={sidebarOpen}>
                    {sidebarOpen && <Styles.Logo>DWriter</Styles.Logo>}
                    <Styles.HamburgerIcon onClick={toggleSidebar}>
                        {sidebarOpen ? <FaChevronLeft /> : <FaChevronRight />}
                    </Styles.HamburgerIcon>
                </Styles.SidebarHeader>
                
                <Styles.NavItems>
                    <Styles.StyledNavItem 
                        isOpen={sidebarOpen}
                        className={currentComponent === 'editor' ? 'active' : ''}
                        onClick={() => handleNavClick('editor')}
                    >
                        <FaEdit className="nav-icon" />
                        <span className="nav-text">Editor</span>
                    </Styles.StyledNavItem>
                    
                    <Styles.StyledNavItem 
                        isOpen={sidebarOpen}
                        className={currentComponent === 'calendar' ? 'active' : ''}
                        onClick={() => handleNavClick('calendar')}
                    >
                        <FaCalendarAlt className="nav-icon" />
                        <span className="nav-text">Calendar</span>
                    </Styles.StyledNavItem>
                </Styles.NavItems>
            </Styles.Sidebar>
            
            <Styles.Content>
                {currentComponent === 'editor' && (
                    <Editor
                        loading={loading}
                        progress={progress}
                        worker={workerRef}
                    />
                )}
                {currentComponent === 'calendar' && <Calendar />}
                
                <Styles.ShortcutHint>
                    Switch views: <span className="shortcut-key">⌘</span>+<span className="shortcut-key">;</span>
                </Styles.ShortcutHint>
            </Styles.Content>
        </Styles.AppContainer>
    );
};

export default App;