// src/components/Calendar.jsx

import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styled from 'styled-components';

const CalendarPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start; /* Align items to the top */
  color: rgba(255, 255, 255, 0.87);
  background-color: #242424;
  width: 100%;
  height: 100vh; /* Full height of the viewport */
  padding: 20px;
  box-sizing: border-box;
  overflow-y: auto; /* Enable vertical scrolling */
`;

const CalendarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 20px;
`;

const CustomCalendar = styled(Calendar)`
  border: none;
  align-items: center;
  justify-content: center;
`;

const EntriesContainer = styled.div`
  margin-top: 20px; /* Ensure spacing between calendar and entries */
  width: 100%;
  max-width: 600px;
`;

const EntriesHeader = styled.h3`
  margin-bottom: 10px;
  text-align: center;
`;

const EntriesList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0; /* Ensure no margin is added by default */
`;

const EntryItem = styled.li`
  padding: 5px 0;
  border-bottom: 1px solid #ddd;
  text-align: center;
  font-size: 1.2em;
  width: 80%; /* Added width to control the length of the underline */
  margin: 0 auto; /* Center the underline */
`;

const EmojiSpan = styled.span`
  font-size: 1.5em;
`;

const NoEntriesMessage = styled.p`
  margin-top: 20px;
  text-align: center;
  color: rgba(255, 255, 255, 0.7);
`;

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
    <CalendarPageContainer>
      <CalendarContainer>
        <CustomCalendar onChange={handleDateChange} value={date} />
      </CalendarContainer>
      <EntriesContainer>
        <EntriesHeader>
          Entries for {date.toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })}
        </EntriesHeader>
        {entries.length > 0 ? (
          <EntriesList>
            {entries
              .filter((entry) => new Date(entry.datetime).toDateString() === date.toDateString())
              .map((entry, index) => (
                <EntryItem key={index}>
                  {new Date(entry.datetime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  <EmojiSpan>{entry.emoji}</EmojiSpan>
                </EntryItem>
              ))}
          </EntriesList>
        ) : (
          <NoEntriesMessage>No entries for this date.</NoEntriesMessage>
        )}
      </EntriesContainer>
    </CalendarPageContainer>
  );
};

export default CalendarComponent;