// src/components/Settings.jsx
import React, { useContext, useState, useEffect } from 'react';
import { EditorContext } from '../context/EditorContext';
import { getStorage } from '../storage';
import { isTauri } from '../utils/environment';
import * as Styles from './SettingsStyles';

const Settings = () => {
    const {
        showEmoji,
        setShowEmoji,
        theme,
        setTheme,
        fontFamily,
        setFontFamily,
        fontSize,
        setFontSize,
    } = useContext(EditorContext);

    const [dbLocation, setDbLocation] = useState('Browser Storage');
    const [isExporting, setIsExporting] = useState(false);
    const [isImporting, setIsImporting] = useState(false);
    
    // Load database location (only relevant for Tauri desktop app)
    useEffect(() => {
        const loadDbLocation = async () => {
            if (isTauri()) {
                try {
                    const storage = getStorage();
                    const settings = await storage.getSettings();
                    if (settings.storageLocation) {
                        setDbLocation(settings.storageLocation);
                    }
                } catch (error) {
                    console.error('Error loading storage location:', error);
                }
            }
        };
        
        loadDbLocation();
    }, []);
    
    const handleThemeChange = (e) => {
        setTheme(e.target.value);
    };
    
    const handleFontFamilyChange = (e) => {
        setFontFamily(e.target.value);
    };
    
    const handleFontSizeChange = (e) => {
        setFontSize(e.target.value);
    };
    
    const handleEmojiToggle = () => {
        setShowEmoji(!showEmoji);
    };
    
    const handleChangeDbLocation = async () => {
        if (!isTauri()) {
            alert('Changing database location is only available in the desktop app');
            return;
        }
        
        try {
            const storage = getStorage();
            const success = await storage.changeStorageLocation();
            
            if (success) {
                const settings = await storage.getSettings();
                setDbLocation(settings.storageLocation || 'Custom Location');
                alert('Database location changed successfully!');
            }
        } catch (error) {
            console.error('Error changing database location:', error);
            alert('Failed to change database location');
        }
    };
    
    const handleExportData = async () => {
        try {
            setIsExporting(true);
            const storage = getStorage();
            const data = await storage.exportData();
            
            // Convert to a downloadable file
            const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            
            // Create download link
            const a = document.createElement('a');
            a.href = url;
            a.download = `dwriter-export-${new Date().toISOString().slice(0, 10)}.json`;
            document.body.appendChild(a);
            a.click();
            
            // Clean up
            setTimeout(() => {
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
                setIsExporting(false);
            }, 100);
        } catch (error) {
            console.error('Error exporting data:', error);
            alert('Failed to export data');
            setIsExporting(false);
        }
    };
    
    const handleImportData = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        
        try {
            setIsImporting(true);
            
            // Read the file
            const reader = new FileReader();
            reader.onload = async (event) => {
                try {
                    const data = JSON.parse(event.target.result);
                    const storage = getStorage();
                    await storage.importData(data);
                    
                    // Notify the app that storage has changed
                    window.dispatchEvent(new CustomEvent('storage-changed'));
                    
                    alert('Data imported successfully!');
                } catch (error) {
                    console.error('Error importing data:', error);
                    alert('Failed to import data. Invalid file format.');
                } finally {
                    setIsImporting(false);
                }
            };
            
            reader.readAsText(file);
        } catch (error) {
            console.error('Error processing import file:', error);
            alert('Failed to process import file');
            setIsImporting(false);
        }
    };

    return (
        <Styles.SettingsContainer theme={theme}>
            <Styles.SettingsHeader theme={theme}>Settings</Styles.SettingsHeader>
            
            <Styles.SettingsSection>
                <Styles.SettingTitle theme={theme}>Appearance</Styles.SettingTitle>
                
                <Styles.SettingRow>
                    <Styles.SettingLabel theme={theme}>Theme</Styles.SettingLabel>
                    <Styles.SelectInput 
                        value={theme} 
                        onChange={handleThemeChange}
                        theme={theme}
                    >
                        <option value="light">Light</option>
                        <option value="dark">Dark</option>
                        <option value="sepia">Sepia</option>
                    </Styles.SelectInput>
                </Styles.SettingRow>
                
                <Styles.SettingRow>
                    <Styles.SettingLabel theme={theme}>Font</Styles.SettingLabel>
                    <Styles.SelectInput 
                        value={fontFamily} 
                        onChange={handleFontFamilyChange}
                        theme={theme}
                    >
                        <option value="Open Sans">Open Sans</option>
                        <option value="Roboto">Roboto</option>
                        <option value="Lato">Lato</option>
                        <option value="Montserrat">Montserrat</option>
                        <option value="Georgia">Georgia</option>
                        <option value="Times New Roman">Times New Roman</option>
                    </Styles.SelectInput>
                </Styles.SettingRow>
                
                <Styles.SettingRow>
                    <Styles.SettingLabel theme={theme}>Font Size</Styles.SettingLabel>
                    <Styles.SelectInput 
                        value={fontSize} 
                        onChange={handleFontSizeChange}
                        theme={theme}
                    >
                        <option value="small">Small</option>
                        <option value="medium">Medium</option>
                        <option value="large">Large</option>
                    </Styles.SelectInput>
                </Styles.SettingRow>
                
                <Styles.SettingRow>
                    <Styles.SettingLabel theme={theme}>Show Emoji</Styles.SettingLabel>
                    <Styles.ToggleSwitch 
                        checked={showEmoji} 
                        onChange={handleEmojiToggle}
                    />
                </Styles.SettingRow>
            </Styles.SettingsSection>
            
            <Styles.SettingsSection>
                <Styles.SettingTitle theme={theme}>Data Storage</Styles.SettingTitle>
                
                <Styles.SettingRow>
                    <Styles.SettingLabel theme={theme}>Storage Location</Styles.SettingLabel>
                    <Styles.LocationDisplay theme={theme}>
                        {dbLocation}
                    </Styles.LocationDisplay>
                </Styles.SettingRow>
                
                <Styles.SettingRow>
                    <Styles.SettingLabel theme={theme}></Styles.SettingLabel>
                    <Styles.Button 
                        onClick={handleChangeDbLocation}
                        disabled={!isTauri()}
                        theme={theme}
                    >
                        {isTauri() ? 'Change Location' : 'Desktop App Only'}
                    </Styles.Button>
                </Styles.SettingRow>
                
                <Styles.SettingRow>
                    <Styles.SettingLabel theme={theme}>Export Data</Styles.SettingLabel>
                    <Styles.Button 
                        onClick={handleExportData}
                        disabled={isExporting}
                        theme={theme}
                    >
                        {isExporting ? 'Exporting...' : 'Export'}
                    </Styles.Button>
                </Styles.SettingRow>
                
                <Styles.SettingRow>
                    <Styles.SettingLabel theme={theme}>Import Data</Styles.SettingLabel>
                    <Styles.FileInputWrapper theme={theme}>
                        <Styles.Button
                            as="label"
                            htmlFor="import-file"
                            disabled={isImporting}
                            theme={theme}
                        >
                            {isImporting ? 'Importing...' : 'Import'}
                        </Styles.Button>
                        <Styles.FileInput 
                            id="import-file"
                            type="file" 
                            accept=".json"
                            onChange={handleImportData}
                            disabled={isImporting}
                        />
                    </Styles.FileInputWrapper>
                </Styles.SettingRow>
            </Styles.SettingsSection>
        </Styles.SettingsContainer>
    );
};

export default Settings;