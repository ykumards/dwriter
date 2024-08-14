// src/components/Calendar.jsx

import React, { useState, useEffect } from 'react';
import 'react-calendar/dist/Calendar.css';

import { getMostFrequentEmoji } from '../uiUtils';
import * as Styles from './CalendarStyles';


const CalendarComponent = () => {
  const [date, setDate] = useState(new Date());
  const [entries, setEntries] = useState([]);
  const [activeStartDate, setActiveStartDate] = useState(new Date());

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

  const filteredEntries = entries.filter(
    (entry) => new Date(entry.datetime).toDateString() === date.toDateString()
  );

  const mostFrequentEmoji = getMostFrequentEmoji(filteredEntries);

  return (
    <Styles.CalendarPageContainer>
      <Styles.CalendarContainer>
        <Styles.CustomCalendar
          onChange={handleDateChange}
          value={date}
          activeStartDate={activeStartDate}
          onActiveStartDateChange={handleActiveStartDateChange}
        />
        <Styles.TodayButton onClick={handleTodayClick}>Today</Styles.TodayButton>
      </Styles.CalendarContainer>
      <Styles.EntriesContainer>
        <Styles.EntriesHeader>
          Entries for {date.toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })}
        </Styles.EntriesHeader>
        {filteredEntries.length > 0 ? (
          <>
            <Styles.OverallEntry>
              <Styles.EntryTime>Overall</Styles.EntryTime>
              <Styles.EmojiSpan>{mostFrequentEmoji}</Styles.EmojiSpan>
            </Styles.OverallEntry>
            <Styles.EntriesList>
              {filteredEntries.map((entry, index) => (
                <Styles.EntryItem key={index}>
                  <Styles.EntryTime>{new Date(entry.datetime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Styles.EntryTime>
                  <Styles.EmojiSpan>{entry.emoji}</Styles.EmojiSpan>
                </Styles.EntryItem>
              ))}
            </Styles.EntriesList>
          </>
        ) : (
          <Styles.NoEntriesMessage>No entries for this date.</Styles.NoEntriesMessage>
        )}
      </Styles.EntriesContainer>
    </Styles.CalendarPageContainer>
  );
};

export default CalendarComponent;