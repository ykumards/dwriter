// src/components/Calendar.styles.js

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styled from 'styled-components';

export const CalendarPageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start; /* Align items to the top */
    color: ${props => props.theme === 'light' ? '#242424' : 'rgba(255, 255, 255, 0.87)'};
    background-color: ${props => props.theme === 'light' ? '#ffffff' : '#242424'};
    width: 100%;
    height: 100vh;
    padding: 20px;
    box-sizing: border-box;
    max-width: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    transition: background-color 0.3s, color 0.3s;
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
    background-color: ${props => props.theme === 'light' ? '#f8f9fa' : '#2b2b2b'};
    color: ${props => props.theme === 'light' ? '#242424' : '#fff'};
    border-radius: 10px;
    padding: 10px;
    box-shadow: ${props => props.theme === 'light' 
        ? '0 4px 8px rgba(0, 0, 0, 0.1)' 
        : '0 4px 8px rgba(0, 0, 0, 0.3)'};
    transition: background-color 0.3s, color 0.3s, box-shadow 0.3s;

    .react-calendar__navigation button {
        color: ${props => props.theme === 'light' ? '#242424' : 'white'};
        &:hover {
            background-color: ${props => props.theme === 'light' ? '#e9ecef' : '#3a3a3a'};
        }
    }

    .react-calendar__tile {
        border-radius: 5px;
        &:hover {
            background-color: ${props => props.theme === 'light' ? '#e9ecef' : '#3a3a3a'};
            box-shadow: ${props => props.theme === 'light' 
                ? '0 0 5px rgba(0, 0, 0, 0.2)' 
                : '0 0 5px rgba(0, 0, 0, 0.5)'};
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
        color: ${props => props.theme === 'light' ? '#242424' : 'white'};
        border: 2px solid #ffc107; /* Add a box around the current date */
        border-radius: 5px; /* Rounded corners for the box */
    }

    .react-calendar__month-view__days__day--neighboringMonth {
        color: ${props => props.theme === 'light' ? '#adb5bd' : '#555'} !important;
    }

    .react-calendar__tile--active:enabled:hover,
    .react-calendar__tile--active:enabled:focus {
        background-color: ${props => props.theme === 'light' ? '#535ac8' : '#3a3a3a'};
    }

    .react-calendar__navigation button[disabled] {
        background-color: ${props => props.theme === 'light' ? '#dee2e6' : '#444'};
    }

    /* Custom styles for weekends and weekdays within the current month */
    .react-calendar__month-view__days__day--weekend {
        color: ${props => props.theme === 'light' ? '#d63031' : '#ff6961'};
    }

    .react-calendar__month-view__days__day {
        &.react-calendar__month-view__days__day--weekend {
            color: ${props => props.theme === 'light' ? '#d63031' : '#ff6961'};
        }
        &:not(.react-calendar__month-view__days__day--weekend) {
            color: ${props => props.theme === 'light' ? '#343a40' : '#dcdcdc'};
        }
    }

    .react-calendar__month-view__weekdays__weekday abbr {
        font-family: 'Arial', sans-serif;
        font-weight: bold;
        font-size: 0.875em;
        text-decoration: none;
        color: ${props => props.theme === 'light' ? '#6c757d' : '#dcdcdc'};
    }
`;

export const TodayButton = styled.button`
    background-color: ${props => props.theme === 'light' ? '#e9ecef' : '#312f2f'};
    color: ${props => props.theme === 'light' ? '#343a40' : 'white'};
    border: ${props => props.theme === 'light' ? '1px solid #ced4da' : 'none'};
    border-radius: 4px;
    padding: 10px 20px;
    margin: 10px 0;
    cursor: pointer;
    font-size: 1em;
    transition: background-color 0.3s, color 0.3s, box-shadow 0.3s;
    &:hover {
        background-color: ${props => props.theme === 'light' ? '#dee2e6' : '#535353'};
        box-shadow: ${props => props.theme === 'light' 
            ? '0 0 5px rgba(0, 0, 0, 0.2)' 
            : '0 0 5px rgba(0, 0, 0, 0.5)'};
    }
`;

export const ExportButton = styled.button`
    position: absolute;
    top: 20px;
    right: 70px;
    background-color: ${props => props.theme === 'light' ? '#e9ecef' : '#312f2f'};
    color: ${props => props.theme === 'light' ? '#343a40' : 'white'};
    border: ${props => props.theme === 'light' ? '1px solid #ced4da' : 'none'};
    border-radius: 4px;
    padding: 10px 20px;
    cursor: pointer;
    font-size: 0.8em;
    z-index: 10;
    transition: background-color 0.3s, color 0.3s;
    &:hover {
        background-color: ${props => props.theme === 'light' ? '#dee2e6' : '#535353'};
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
    color: ${props => props.theme === 'light' ? '#343a40' : 'inherit'};
`;

export const EntriesList = styled.ul`
    list-style-type: none;
    padding: 0;
    margin: 0;
    height: 200px; /* Set a fixed height */
    overflow-y: auto; /* Enable vertical scrolling */
`;

export const OverallEntry = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    background-color: ${props => props.theme === 'light' ? '#f8f9fa' : '#3a3a3a'};
    border: ${props => props.theme === 'light' ? '1px solid #dee2e6' : 'none'};
    border-radius: 8px;
    font-size: 1.1em;
    margin-bottom: 20px;
    transition: background-color 0.3s;
`;

export const EntryItem = styled.li`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    border-bottom: 1px solid ${props => props.theme === 'light' ? '#dee2e6' : '#444'};
    font-size: 0.7em;
    width: 80%;
    margin: 0 auto;
    color: ${props => props.theme === 'light' ? '#6c757d' : '#aaa'};
    transition: border-color 0.3s, color 0.3s;
`;

export const EntryTime = styled.span`
    margin-right: 20px;
`;

export const EmojiSpan = styled.span`
    font-size: 1.5em;
`;

export const NoEntriesMessage = styled.p`
    margin-top: 20px;
    text-align: center;
    color: ${props => props.theme === 'light' ? 'rgba(0, 0, 0, 0.6)' : 'rgba(255, 255, 255, 0.7)'};
    transition: color 0.3s;
`;