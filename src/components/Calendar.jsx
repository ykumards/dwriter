// src/components/Calendar.jsx

import { useState, useEffect, useContext } from 'react';
import 'react-calendar/dist/Calendar.css';
import { getMostFrequentEmoji, getEmotionByEmoji } from '../uiUtils';
import * as Styles from './CalendarStyles';
import { EditorContext } from '../context/EditorContext';
import { getStorage } from '../storage';

const CalendarComponent = () => {
    const [date, setDate] = useState(new Date());
    const [entries, setEntries] = useState([]);
    const [activeStartDate, setActiveStartDate] = useState(new Date());
    const [isLoading, setIsLoading] = useState(true);
    const { theme } = useContext(EditorContext);

    // Load entries from PouchDB
    useEffect(() => {
        const loadEntries = async () => {
            try {
                setIsLoading(true);
                const storage = getStorage();
                await storage.initialize();
                const allEntries = await storage.getEntries();
                setEntries(allEntries);
            } catch (error) {
                console.error('Error loading entries:', error);
            } finally {
                setIsLoading(false);
            }
        };

        loadEntries();

        // Set up a listener to reload entries when storage changes
        const handleStorageChange = () => {
            loadEntries();
        };

        // Add event listener
        window.addEventListener('storage-changed', handleStorageChange);

        // Clean up
        return () => {
            window.removeEventListener('storage-changed', handleStorageChange);
        };
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

    // Filter entries for the selected date
    const filteredEntries = entries.filter(entry => {
        // Handle both string datetime and Date objects
        const entryDate = typeof entry.datetime === 'string' 
            ? new Date(entry.datetime) 
            : entry.datetime;
        
        return entryDate.toDateString() === date.toDateString();
    });

    const mostFrequentEmoji = getMostFrequentEmoji(filteredEntries);

    return (
        <Styles.CalendarPageContainer theme={theme}>
            <Styles.CalendarContainer>
                <Styles.CustomCalendar
                    onChange={handleDateChange}
                    value={date}
                    activeStartDate={activeStartDate}
                    onActiveStartDateChange={handleActiveStartDateChange}
                    theme={theme}
                />
                <Styles.TodayButton onClick={handleTodayClick} theme={theme}>Today</Styles.TodayButton>
            </Styles.CalendarContainer>
            <Styles.EntriesContainer>
                <Styles.EntriesHeader theme={theme}>
                    Entries for {date.toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })}
                </Styles.EntriesHeader>
                {isLoading ? (
                    <Styles.NoEntriesMessage theme={theme}>Loading entries...</Styles.NoEntriesMessage>
                ) : filteredEntries.length > 0 ? (
                    <>
                        <Styles.OverallEntry theme={theme}>
                            <Styles.EntryTime>Overall</Styles.EntryTime>
                            <Styles.EmojiSpan title={getEmotionByEmoji(mostFrequentEmoji)}>{mostFrequentEmoji}</Styles.EmojiSpan>
                        </Styles.OverallEntry>
                        <Styles.EntriesList>
                            {filteredEntries.map((entry, index) => (
                                <Styles.EntryItem key={entry.id || index} theme={theme}>
                                    <Styles.EntryTime>
                                        {new Date(entry.datetime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </Styles.EntryTime>
                                    <Styles.EmojiSpan title={getEmotionByEmoji(entry.emoji)}>{entry.emoji}</Styles.EmojiSpan>
                                </Styles.EntryItem>
                            ))}
                        </Styles.EntriesList>
                    </>
                ) : (
                    <Styles.NoEntriesMessage theme={theme}>No entries for this date.</Styles.NoEntriesMessage>
                )}
            </Styles.EntriesContainer>
        </Styles.CalendarPageContainer>
    );
};

export default CalendarComponent;