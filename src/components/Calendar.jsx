// src/components/Calendar.jsx
import { useState, useEffect, useContext } from 'react';
import 'react-calendar/dist/Calendar.css';
import { FaTrash, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { getMostFrequentEmoji, getEmotionByEmoji } from '../uiUtils';
import * as Styles from './CalendarStyles';
import { EditorContext } from '../context/EditorContext';
import { getStorage } from '../storage';

const CalendarComponent = () => {
    const [date, setDate] = useState(new Date());
    const [entries, setEntries] = useState([]);
    const [activeStartDate, setActiveStartDate] = useState(new Date());
    const [isLoading, setIsLoading] = useState(true);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [entryToDelete, setEntryToDelete] = useState(null);
    const [showEntries, setShowEntries] = useState(false);
    const { theme } = useContext(EditorContext);

    // Load entries from PouchDB
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

    // Initial load of entries
    useEffect(() => {
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
        setShowEntries(true); // Automatically expand entries when a new date is selected
    };

    const handleTodayClick = () => {
        const today = new Date();
        setDate(today);
        setActiveStartDate(today);
        setShowEntries(true); // Automatically expand entries when Today is clicked
    };

    const handleActiveStartDateChange = ({ activeStartDate }) => {
        setActiveStartDate(activeStartDate);
    };

    const handleDeleteClick = (entry) => {
        setEntryToDelete(entry);
        setShowDeleteConfirm(true);
    };

    const confirmDelete = async () => {
        if (!entryToDelete) return;
        
        try {
            const storage = getStorage();
            await storage.deleteEntry(entryToDelete.id);
            
            // Reload entries
            await loadEntries();
            
            // Dispatch event to notify other components
            window.dispatchEvent(new CustomEvent('storage-changed'));
        } catch (error) {
            console.error('Error deleting entry:', error);
        } finally {
            setShowDeleteConfirm(false);
            setEntryToDelete(null);
        }
    };

    const cancelDelete = () => {
        setShowDeleteConfirm(false);
        setEntryToDelete(null);
    };

    // Toggle entries visibility
    const toggleEntries = () => {
        setShowEntries(!showEntries);
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
    const formattedDate = date.toLocaleDateString('en-GB', { 
        day: '2-digit', 
        month: 'long', 
        year: 'numeric' 
    });

    return (
        <Styles.CalendarPageContainer theme={theme}>
            <Styles.PaperContainer>
                <Styles.PaperContent>
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
                        {/* New header card with date and large emoji */}
                        <Styles.HeaderCard theme={theme}>
                            <Styles.DateSection>
                                <Styles.DateText theme={theme}>{formattedDate}</Styles.DateText>
                                <Styles.EntryCountText theme={theme}>
                                    {filteredEntries.length} {filteredEntries.length === 1 ? 'entry' : 'entries'}
                                </Styles.EntryCountText>
                            </Styles.DateSection>
                            <Styles.HeaderEmoji title={getEmotionByEmoji(mostFrequentEmoji)}>
                                {mostFrequentEmoji}
                            </Styles.HeaderEmoji>
                        </Styles.HeaderCard>
                        
                        {/* Toggle button */}
                        <Styles.ToggleButton onClick={toggleEntries}>
                            {showEntries ? (
                                <>Hide Details <FaChevronUp style={{ marginLeft: '5px' }} /></>
                            ) : (
                                <>View Details <FaChevronDown style={{ marginLeft: '5px' }} /></>
                            )}
                        </Styles.ToggleButton>
                        
                        {/* Timeline entries section */}
                        <Styles.TimelineContainer $isExpanded={showEntries}>
                            
                            {isLoading ? (
                                <Styles.NoEntriesMessage theme={theme}>Loading entries...</Styles.NoEntriesMessage>
                            ) : filteredEntries.length > 0 ? (
                                <Styles.EntriesList>
                                    {filteredEntries.map((entry, index) => (
                                        <Styles.EntryItem key={entry.id || index} theme={theme}>
                                            <Styles.EntryTime theme={theme}>
                                                {new Date(entry.datetime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </Styles.EntryTime>
                                            <Styles.EmojiSpan 
                                                title={getEmotionByEmoji(entry.emoji)}
                                                className="emoji-span"
                                            >
                                                {entry.emoji}
                                            </Styles.EmojiSpan>
                                            <Styles.DeleteButton 
                                                onClick={() => handleDeleteClick(entry)}
                                                theme={theme}
                                                title="Delete this entry"
                                                className="delete-button"
                                            >
                                                <FaTrash size={14} />
                                            </Styles.DeleteButton>
                                        </Styles.EntryItem>
                                    ))}
                                </Styles.EntriesList>
                            ) : (
                                <Styles.NoEntriesMessage theme={theme}>No entries for this date.</Styles.NoEntriesMessage>
                            )}
                        </Styles.TimelineContainer>
                    </Styles.EntriesContainer>
                </Styles.PaperContent>
            </Styles.PaperContainer>
            
            {/* Delete Confirmation Modal */}
            {showDeleteConfirm && (
                <Styles.ConfirmDialog theme={theme}>
                    <Styles.ConfirmContent>
                        <h3>Delete Entry</h3>
                        <p>Are you sure you want to delete this entry?</p>
                        <p>
                            <strong>Time:</strong> {entryToDelete && new Date(entryToDelete.datetime).toLocaleTimeString()}
                            <br />
                            <strong>Emotion:</strong> {entryToDelete && entryToDelete.emoji} {entryToDelete && getEmotionByEmoji(entryToDelete.emoji)}
                        </p>
                        <Styles.ButtonContainer>
                            <Styles.CancelButton onClick={cancelDelete} theme={theme}>
                                Cancel
                            </Styles.CancelButton>
                            <Styles.DeleteConfirmButton onClick={confirmDelete} theme={theme}>
                                Delete
                            </Styles.DeleteConfirmButton>
                        </Styles.ButtonContainer>
                    </Styles.ConfirmContent>
                </Styles.ConfirmDialog>
            )}
        </Styles.CalendarPageContainer>
    );
};

export default CalendarComponent;