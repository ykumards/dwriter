// src/components/Calendar.styles.js

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styled from 'styled-components';

export const CalendarPageContainer = styled.div`
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

export const CalendarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 20px;
`;

export const CustomCalendar = styled(Calendar)`
  border: none;
  background-color: #2b2b2b;
  color: #fff;
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);

  .react-calendar__navigation button {
    color: white;
    &:hover {
      background-color: #3a3a3a; /* Subtle gray hover highlight */
    }
  }

  .react-calendar__tile {
    border-radius: 5px;
    &:hover {
      background-color: #3a3a3a;
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
    }
  }

  .react-calendar__tile--active {
    background-color: #646cff;
    color: white;
    border-radius: 5px;
    border: 2px solid #535ac8; /* Different border for selected date */
  }

  .react-calendar__tile--now {
    background-color: transparent; /* Remove existing highlight */
    color: white;
    border: 2px solid #ffc107; /* Add a box around the current date */
    border-radius: 5px; /* Rounded corners for the box */
  }

  .react-calendar__month-view__days__day--neighboringMonth {
    color: #555 !important; /* Darker color for days from neighboring months */
  }

  .react-calendar__tile--active:enabled:hover,
  .react-calendar__tile--active:enabled:focus {
    background-color: #3a3a3a;
  }

  .react-calendar__navigation button[disabled] {
    background-color: #444;
  }

  /* Custom styles for weekends and weekdays within the current month */
  .react-calendar__month-view__days__day--weekend {
    color: #ff6961; /* Adjusted red color for weekends */
  }

  .react-calendar__month-view__days__day {
    &.react-calendar__month-view__days__day--weekend {
      color: #ff6961;
    }
    &:not(.react-calendar__month-view__days__day--weekend) {
      color: #dcdcdc; /* Light gray color for weekdays */
    }
  }

  .react-calendar__month-view__weekdays__weekday abbr {
    font-family: 'Arial', sans-serif; /* Change to your desired font */
    font-weight: bold; /* Make the font bold */
    font-size: 0.875em; /* Adjust the size as needed */
    text-decoration: none; /* Remove underline */
  }
`;

export const TodayButton = styled.button`
  background-color: #312f2f;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  margin: 10px 0;
  cursor: pointer;
  font-size: 1em;
  &:hover {
    background-color: #535353;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  }
`;

export const EntriesContainer = styled.div`
  margin-top: 20px; /* Ensure spacing between calendar and entries */
  width: 100%;
  max-width: 300px;
`;

export const EntriesHeader = styled.h3`
  margin-bottom: 10px;
  text-align: center;
`;

export const EntriesList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0; /* Ensure no margin is added by default */
`;

export const OverallEntry = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background-color: #3a3a3a;
  border-radius: 8px;
  font-size: 1.2em;
  margin-bottom: 20px;
`;

export const EntryItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #444; /* Cleaner underline */
  font-size: 1em;
  width: 80%; /* Added width to control the length of the underline */
  margin: 0 auto; /* Center the underline */
  color: #aaa; /* Subtle color for individual entries */
`;

export const EntryTime = styled.span`
  margin-right: 20px; /* Increase spacing between time and emoji */
`;

export const EmojiSpan = styled.span`
  font-size: 1.5em;
`;

export const NoEntriesMessage = styled.p`
  margin-top: 20px;
  text-align: center;
  color: rgba(255, 255, 255, 0.7);
`;