// src/components/Calendar.jsx

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaCalendarDay, FaFileExport } from 'react-icons/fa';
import { writeTextFile } from '@tauri-apps/api/fs';
import { save } from '@tauri-apps/api/dialog';
import * as Tooltip from '@radix-ui/react-tooltip';
import { getMostFrequentEmoji, getEmotionByEmoji } from '../uiUtils';
import * as Styles from './CalendarStyles';

const CalendarComponent = () => {
    const [date, setDate] = useState(new Date());
    const [entries, setEntries] = useState([]);
    const [activeStartDate, setActiveStartDate] = useState(new Date());
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const storedEntries = JSON.parse(localStorage.getItem('entries')) || [];
        setEntries(storedEntries);
    }, []);

    const handleDateChange = (newDate) => {
        setDate(newDate);
    };

    const handleTodayClick = () => {
        const today = new Date();
        setDate(today);
        setActiveStartDate(today);
    };

    const handleActiveStartDateChange = ({ activeStartDate }) => {
        setActiveStartDate(activeStartDate);
    };

    const handleExportClick = async () => {
        try {
            setIsLoading(true);
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
            setIsLoading(false);
        }
    };

    const filteredEntries = entries.filter(
        (entry) => new Date(entry.datetime).toDateString() === date.toDateString()
    );

    const mostFrequentEmoji = getMostFrequentEmoji(filteredEntries);

    // Function to add emotion classes to tile content based on entries
    const tileClassName = ({ date, view }) => {
        if (view === 'month') {
            const dateEntries = entries.filter(
                (entry) => new Date(entry.datetime).toDateString() === date.toDateString()
            );
            
            if (dateEntries.length > 0) {
                const mostFrequentEmoji = getMostFrequentEmoji(dateEntries);
                const emotion = getEmotionByEmoji(mostFrequentEmoji);
                
                if (dateEntries.length > 1) {
                    // Check if there are multiple different emotions
                    const uniqueEmotions = new Set(dateEntries.map(entry => getEmotionByEmoji(entry.emoji)));
                    if (uniqueEmotions.size > 1) {
                        return `has-entries emotion-mixed`;
                    }
                }
                
                return `has-entries emotion-${emotion}`;
            }
        }
        return null;
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.3 } }
    };

    return (
        <Tooltip.Provider delayDuration={300}>
            <Styles.CalendarPageContainer>
                {/* Removed top toolbar since we're using bottom toolbar */}

                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                    style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                >
                    <Styles.CalendarContainer>
                        <Styles.CustomCalendar
                            onChange={handleDateChange}
                            value={date}
                            activeStartDate={activeStartDate}
                            onActiveStartDateChange={handleActiveStartDateChange}
                            tileClassName={tileClassName}
                        />
                        <Styles.ButtonsContainer>
                            <Tooltip.Root>
                                <Tooltip.Trigger asChild>
                                    <Styles.TodayButton onClick={handleTodayClick}>
                                        <FaCalendarDay style={{ marginRight: '6px' }} />
                                        Today
                                    </Styles.TodayButton>
                                </Tooltip.Trigger>
                                <Tooltip.Portal>
                                    <Tooltip.Content
                                        sideOffset={5}
                                        style={{
                                            backgroundColor: 'rgba(0, 0, 0, 0.8)',
                                            color: 'white',
                                            borderRadius: '4px',
                                            padding: '8px 12px',
                                            fontSize: '13px',
                                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
                                        }}
                                    >
                                        Jump to today's date
                                        <Tooltip.Arrow style={{ fill: 'rgba(0, 0, 0, 0.8)' }} />
                                    </Tooltip.Content>
                                </Tooltip.Portal>
                            </Tooltip.Root>
                        </Styles.ButtonsContainer>
                    </Styles.CalendarContainer>

                    <Styles.EntriesContainer>
                        <Styles.EntriesHeader>
                            Entries for {date.toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })}
                        </Styles.EntriesHeader>
                        {filteredEntries.length > 0 ? (
                            <>
                                <Styles.OverallEntry>
                                    <Styles.EntryTime>Overall Mood</Styles.EntryTime>
                                    <Tooltip.Root>
                                        <Tooltip.Trigger asChild>
                                            <Styles.EmojiSpan>{mostFrequentEmoji}</Styles.EmojiSpan>
                                        </Tooltip.Trigger>
                                        <Tooltip.Portal>
                                            <Tooltip.Content
                                                sideOffset={5}
                                                style={{
                                                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                                                    color: 'white',
                                                    borderRadius: '4px',
                                                    padding: '8px 12px',
                                                    fontSize: '13px',
                                                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
                                                }}
                                            >
                                                {getEmotionByEmoji(mostFrequentEmoji)}
                                                <Tooltip.Arrow style={{ fill: 'rgba(0, 0, 0, 0.8)' }} />
                                            </Tooltip.Content>
                                        </Tooltip.Portal>
                                    </Tooltip.Root>
                                </Styles.OverallEntry>
                                <Styles.EntriesList>
                                    {filteredEntries.map((entry, index) => (
                                        <Styles.EntryItem key={index}>
                                            <Styles.EntryTime>
                                                {new Date(entry.datetime).toLocaleTimeString([], { 
                                                    hour: '2-digit', 
                                                    minute: '2-digit' 
                                                })}
                                            </Styles.EntryTime>
                                            <Tooltip.Root>
                                                <Tooltip.Trigger asChild>
                                                    <Styles.EmojiSpan>{entry.emoji}</Styles.EmojiSpan>
                                                </Tooltip.Trigger>
                                                <Tooltip.Portal>
                                                    <Tooltip.Content
                                                        sideOffset={5}
                                                        style={{
                                                            backgroundColor: 'rgba(0, 0, 0, 0.8)',
                                                            color: 'white',
                                                            borderRadius: '4px',
                                                            padding: '8px 12px',
                                                            fontSize: '13px',
                                                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
                                                        }}
                                                    >
                                                        {getEmotionByEmoji(entry.emoji)}
                                                        <Tooltip.Arrow style={{ fill: 'rgba(0, 0, 0, 0.8)' }} />
                                                    </Tooltip.Content>
                                                </Tooltip.Portal>
                                            </Tooltip.Root>
                                        </Styles.EntryItem>
                                    ))}
                                </Styles.EntriesList>
                            </>
                        ) : (
                            <Styles.NoEntriesMessage>
                                No entries for this date.
                            </Styles.NoEntriesMessage>
                        )}
                    </Styles.EntriesContainer>
                </motion.div>
            </Styles.CalendarPageContainer>
        </Tooltip.Provider>
    );
};

export default CalendarComponent;