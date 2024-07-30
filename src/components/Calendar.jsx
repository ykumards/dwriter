// src/components/Calendar.jsx

import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styled from 'styled-components';

const CalendarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.87);
  background-color: #242424;
  width: 100%;
  height: 100vh;
`;

const EntriesContainer = styled.div`
  margin-top: 20px;
  width: 100%;
  max-width: 600px;
`;

const EntriesHeader = styled.h3`
  margin-bottom: 10px;
`;

const EntriesList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const EntryItem = styled.li`
  padding: 5px 0;
  border-bottom: 1px solid #ddd;
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
    <CalendarContainer>
      <Calendar onChange={handleDateChange} value={date} />
      <EntriesContainer>
        <EntriesHeader>Entries for {date.toDateString()}</EntriesHeader>
        <EntriesList>
          {entries
            .filter((entry) => new Date(entry.datetime).toDateString() === date.toDateString())
            .map((entry, index) => (
              <EntryItem key={index}>
                {entry.datetime}: {entry.emoji}
              </EntryItem>
            ))}
        </EntriesList>
      </EntriesContainer>
    </CalendarContainer>
  );
};

export default CalendarComponent;