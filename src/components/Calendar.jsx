// src/components/Calendar.jsx

import React, { useState, useEffect } from 'react';
import 'react-calendar/dist/Calendar.css';

import * as Styles from './CalendarStyles';


const CalendarComponent = () => {
  const [date, setDate] = useState(new Date());
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const storedEntries = JSON.parse(localStorage.getItem('entries')) || [];
    setEntries(storedEntries);
  }, []);

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  return (
    <Styles.CalendarPageContainer>
      <Styles.CalendarContainer>
        <Styles.CustomCalendar onChange={handleDateChange} value={date} />
      </Styles.CalendarContainer>
      <Styles.EntriesContainer>
        <Styles.EntriesHeader>
          Entries for {date.toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })}
        </Styles.EntriesHeader>
        {entries.length > 0 ? (
          <Styles.EntriesList>
            {entries
              .filter((entry) => new Date(entry.datetime).toDateString() === date.toDateString())
              .map((entry, index) => (
                <EntryItem key={index}>
                  {new Date(entry.datetime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  <EmojiSpan>{entry.emoji}</EmojiSpan>
                </EntryItem>
              ))}
          </Styles.EntriesList>
        ) : (
          <Styles.NoEntriesMessage>No entries for this date.</Styles.NoEntriesMessage>
        )}
      </Styles.EntriesContainer>
    </Styles.CalendarPageContainer>
  );
};

export default CalendarComponent;