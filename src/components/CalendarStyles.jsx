// src/components/CalendarStyles.jsx

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;

export const CalendarPageContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    min-width: 500px;
    background-color: var(--background-dark);
    margin: 0;
    position: relative;
`;

export const PaperContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 800px;
    max-width: 90%;
    height: 85%;
    margin: 60px auto 0;
    background-color: var(--background-light);
    border-radius: 8px;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
    overflow: hidden;
    position: relative;
    transition: all 0.3s ease, background-color 0.3s;
    animation: ${fadeIn} 0.5s ease;
`;

export const PaperContent = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    padding: 30px;
    position: relative;
    overflow: hidden;
`;

export const CalendarContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 380px;
    margin: 0 auto;
`;

export const CustomCalendar = styled(Calendar)`
    background-color: ${props => props.theme === 'light' ? '#fdfdfd' : '#1e1e1e'};
    color: ${props => props.theme === 'light' ? '#4a4a4a' : '#e0e0e0'};
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    border: none;
    width: 100%;
    margin-bottom: 10px;
    font-size: 0.9em;
    
    .react-calendar__tile {
        background: ${props => props.theme === 'light' ? '#fdfdfd' : '#2a2a2a'};
        color: ${props => props.theme === 'light' ? '#4a4a4a' : '#e0e0e0'};
        &:hover {
            background: ${props => props.theme === 'light' ? '#f0f0f0' : '#3a3a3a'};
        }
    }
    .react-calendar__tile--active {
        background: ${props => props.theme === 'light' ? '#dcdcdc' : '#444444'};
        color: ${props => props.theme === 'light' ? '#333333' : '#ffffff'};
    }

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

    .react-calendar__month-view__days__day--neighboringMonth {
        color: ${props => props.theme === 'light' ? '#c0c0c0' : '#555555'} !important;
    }

    .react-calendar__navigation {
        background-color: ${props => props.theme === 'light' ? '#f0f0f0' : 'inherit'};
    }

    .react-calendar__month-view__weekdays {
        background-color: ${props => props.theme === 'light' ? '#f0f0f0' : 'inherit'};
    }
`;

export const TodayButton = styled.button`
    background-color: var(--primary);
    color: white;
    border: none;
    border-radius: 18px;
    padding: 0 20px;
    height: 36px;
    margin: 0 0 15px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: all 0.2s ease;
    &:hover {
        background: var(--primary-hover);
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
    }
`;

export const ExportButton = styled.button`
    position: absolute;
    top: 20px;
    right: 70px;
    background-color: var(--primary);
    color: white;
    border: none;
    border-radius: 18px;
    padding: 0 20px;
    height: 36px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    z-index: 10;
    transition: all 0.2s ease;
    &:hover {
        background: var(--primary-hover);
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
    }
`;

// New styled components for the timeline design
export const EntriesContainer = styled.div`
    width: 100%;
    max-width: 380px;
    margin: 0 auto;
`;

export const HeaderCard = styled.div`
    background-color: ${props => props.theme === 'light' ? '#f8f9fa' : '#3a3a3a'};
    border-radius: 8px;
    padding: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const DateSection = styled.div`
    display: flex;
    flex-direction: column;
`;

export const DateText = styled.h3`
    margin: 0;
    font-size: 22px;
    font-weight: 600;
    color: ${props => props.theme === 'light' ? '#343a40' : 'inherit'};
`;

export const EntryCountText = styled.span`
    font-size: 14px;
    color: ${props => props.theme === 'light' ? 'rgba(0, 0, 0, 0.6)' : 'rgba(255, 255, 255, 0.7)'};
    margin-top: 5px;
`;

export const HeaderEmoji = styled.div`
    font-size: 48px;
    line-height: 1;
`;

export const EntriesHeader = styled.h3`
    margin: 5px 0 12px;
    text-align: center;
    color: ${props => props.theme === 'light' ? '#343a40' : 'inherit'};
    font-size: 0.95rem;
`;

export const ToggleButton = styled.button`
    background-color: var(--primary);
    color: white;
    border: none;
    border-radius: 18px;
    padding: 0 15px;
    height: 30px;
    margin: 0 auto 10px;
    display: block;
    cursor: pointer;
    font-size: 12px;
    font-weight: 500;
    transition: all 0.2s ease;
    
    &:hover {
        background: var(--primary-hover);
    }
`;

export const TimelineContainer = styled.div`
    position: relative;
    overflow: hidden;
    max-height: ${props => props.$isExpanded ? '180px' : '0'};
    transition: max-height 0.3s ease;
`;

export const Timeline = styled.div`
    position: absolute;
    left: 10px;
    top: 0;
    bottom: 0;
    width: 2px;
    background-color: var(--primary);
`;

export const TimelineDot = styled.div`
    position: absolute;
    left: 6px;
    top: 15px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: var(--primary);
`;

export const EntriesList = styled.ul`
    list-style-type: none;
    padding: 0;
    margin: 0;
    height: auto;
    max-height: 180px;
    overflow-y: auto;
`;

export const EntryItem = styled.li`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 10px 8px 15px;
    background-color: ${props => props.theme === 'light' ? '#f0f0f0' : '#2a2a2a'};
    border-radius: 4px;
    margin-bottom: 10px;
    position: relative;
    
    &:hover {
        .delete-button {
            opacity: 0.6;
        }
        
        .emoji-span {
            transform: translateX(-20px);
        }
    }
`;

export const EntryTime = styled.span`
    margin-right: 20px;
    font-size: 14px;
    color: ${props => props.theme === 'light' ? '#6c757d' : '#aaa'};
`;

export const EmojiSpan = styled.span`
    font-size: 22px;
    transition: transform 0.2s ease-in-out;
    margin-left: auto;
    
    &.emoji-span {
        transform: translateX(0);
    }
`;

export const DeleteButton = styled.button`
    background: none;
    border: none;
    color: ${props => props.theme === 'light' ? '#dc3545' : '#ff6b6b'};
    cursor: pointer;
    opacity: 0;
    transition: opacity 0.2s, background-color 0.2s;
    padding: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    position: absolute;
    right: 8px;
    
    &:hover {
        opacity: 1 !important;
        background-color: ${props => props.theme === 'light' ? 'rgba(220, 53, 69, 0.1)' : 'rgba(255, 107, 107, 0.2)'};
    }
    
    &.delete-button {
        opacity: 0;
    }
`;

export const NoEntriesMessage = styled.p`
    margin-top: 20px;
    text-align: center;
    color: ${props => props.theme === 'light' ? 'rgba(0, 0, 0, 0.6)' : 'rgba(255, 255, 255, 0.7)'};
    transition: color 0.3s;
`;

// Confirmation Dialog Styles
export const ConfirmDialog = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
`;

export const ConfirmContent = styled.div`
    background-color: ${props => props.theme === 'light' ? 'white' : '#333'};
    padding: 20px;
    border-radius: 8px;
    width: 80%;
    max-width: 400px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

    h3 {
        margin-top: 0;
        color: ${props => props.theme === 'light' ? '#dc3545' : '#ff6b6b'};
    }

    p {
        margin-bottom: 20px;
        color: ${props => props.theme === 'light' ? '#333' : '#eee'};
    }
`;

export const ButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 20px;
`;

export const CancelButton = styled.button`
    padding: 8px 15px;
    background-color: ${props => props.theme === 'light' ? '#6c757d' : '#555'};
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    
    &:hover {
        background-color: ${props => props.theme === 'light' ? '#5a6268' : '#444'};
    }
`;

export const DeleteConfirmButton = styled.button`
    padding: 8px 15px;
    background-color: ${props => props.theme === 'light' ? '#dc3545' : '#c82333'};
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    
    &:hover {
        background-color: ${props => props.theme === 'light' ? '#c82333' : '#bd2130'};
    }
`;
