import styled from 'styled-components';
import ReactCalendar from 'react-calendar';

export const CalendarPageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    height: 100%;
    padding: 20px;
    overflow-y: auto;
    background-color: var(--background-dark);
    color: var(--text-light);

    @media (min-width: 768px) {
        flex-direction: row;
        align-items: flex-start;
        justify-content: center;
        gap: 30px;
    }
`;

export const CalendarContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 400px;
    margin-bottom: 20px;
    background-color: rgba(255, 255, 255, 0.03);
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);

    @media (min-width: 768px) {
        width: 45%;
        margin-bottom: 0;
    }
`;

export const CustomCalendar = styled(ReactCalendar)`
    width: 100%;
    background-color: transparent;
    border: none;
    padding: 10px;
    
    /* Navigation styles */
    .react-calendar__navigation {
        display: flex;
        margin-bottom: 15px;

        button {
            min-width: 44px;
            background: none;
            font-size: 16px;
            color: var(--text-light);
            border-radius: 8px;
            padding: 8px;
            border: 1px solid rgba(255, 255, 255, 0.1);
            
            &:enabled:hover, &:enabled:focus {
                background-color: rgba(255, 255, 255, 0.1);
            }
            
            &[disabled] {
                opacity: 0.5;
            }
        }
        
        .react-calendar__navigation__label {
            font-weight: bold;
            flex-grow: 1;
        }
    }
    
    /* Month view styles */
    .react-calendar__month-view__weekdays {
        text-align: center;
        text-transform: uppercase;
        font-weight: 600;
        font-size: 0.8em;
        margin-bottom: 8px;
        
        abbr {
            text-decoration: none;
            color: var(--text-muted);
        }
    }
    
    /* Tile styles */
    .react-calendar__tile {
        padding: 10px;
        background: none;
        text-align: center;
        line-height: 18px;
        border-radius: 8px;
        color: var(--text-light);
        position: relative;
        overflow: visible;
        
        &:enabled:hover, &:enabled:focus {
            background-color: rgba(255, 255, 255, 0.08);
        }
        
        &--active, &--active:enabled:hover, &--active:enabled:focus {
            background-color: var(--primary);
            color: white;
        }
        
        &--now {
            background-color: rgba(100, 108, 255, 0.1);
            
            &:enabled:hover, &:enabled:focus {
                background-color: rgba(100, 108, 255, 0.2);
            }
        }
        
        abbr {
            font-size: 14px;
            position: relative;
            z-index: 2;
        }

        /* Style for dates with entries */
        &.has-entries:not(.react-calendar__tile--active) {
            font-weight: bold;
            
            &::after {
                content: "";
                display: block;
                width: 6px;
                height: 6px;
                background-color: var(--primary);
                border-radius: 50%;
                position: absolute;
                bottom: 4px;
                left: 50%;
                transform: translateX(-50%);
                z-index: 1;
            }
        }
        
        /* Neutral, specific emotion, or multi-emotion colors */
        &.emotion-joy {
            background-color: rgba(255, 220, 0, 0.15);
        }
        
        &.emotion-sadness {
            background-color: rgba(0, 112, 192, 0.15);
        }
        
        &.emotion-anger {
            background-color: rgba(192, 0, 0, 0.15);
        }
        
        &.emotion-fear {
            background-color: rgba(112, 48, 160, 0.15);
        }
        
        &.emotion-disgust {
            background-color: rgba(0, 176, 80, 0.15);
        }
        
        &.emotion-surprise {
            background-color: rgba(255, 153, 0, 0.15);
        }
        
        &.emotion-neutral {
            background-color: rgba(166, 166, 166, 0.15);
        }
        
        &.emotion-mixed {
            background-color: rgba(255, 255, 255, 0.1);
            
            &::before {
                content: "";
                display: block;
                width: 80%;
                height: 80%;
                position: absolute;
                top: 10%;
                left: 10%;
                border: 1px dashed rgba(255, 255, 255, 0.3);
                border-radius: 6px;
                z-index: 0;
            }
        }
    }
`;

export const ButtonsContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 16px;
    gap: 10px;
`;

export const TodayButton = styled.button`
    background-color: rgba(255, 255, 255, 0.1);
    color: var(--text-light);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 6px;
    padding: 8px 16px;
    cursor: pointer;
    font-size: 0.9em;
    transition: all 0.2s ease;
    
    &:hover {
        background-color: rgba(255, 255, 255, 0.15);
    }
`;

export const ExportButton = styled.button`
    background-color: var(--primary);
    color: white;
    border: none;
    border-radius: 6px;
    padding: 8px 16px;
    cursor: pointer;
    font-size: 0.9em;
    transition: all 0.2s ease;
    box-shadow: 0 2px 8px rgba(100, 108, 255, 0.3);
    
    &:hover {
        background-color: var(--primary-hover);
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(100, 108, 255, 0.4);
    }
    
    &:active {
        transform: translateY(1px);
        box-shadow: 0 1px 3px rgba(100, 108, 255, 0.4);
    }
`;

export const EntriesContainer = styled.div`
    background-color: rgba(255, 255, 255, 0.03);
    border-radius: 12px;
    padding: 20px;
    height: fit-content;
    min-height: 400px;
    width: 100%;
    max-width: 400px;
    margin-bottom: 20px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);

    @media (min-width: 768px) {
        width: 45%;
        margin-bottom: 0;
    }
`;

export const EntriesHeader = styled.h2`
    font-size: 1.2rem;
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    color: var(--text-light);
`;

export const OverallEntry = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 16px;
    margin-bottom: 20px;
    background-color: rgba(100, 108, 255, 0.08);
    border-radius: 8px;
    border-left: 3px solid var(--primary);
`;

export const EntriesList = styled.div`
    max-height: 300px;
    overflow-y: auto;
    
    /* Custom scrollbar */
    &::-webkit-scrollbar {
        width: 8px;
    }
    
    &::-webkit-scrollbar-track {
        background: rgba(255, 255, 255, 0.05);
        border-radius: 4px;
    }
    
    &::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.2);
        border-radius: 4px;
    }
    
    &::-webkit-scrollbar-thumb:hover {
        background: rgba(255, 255, 255, 0.3);
    }
`;

export const EntryItem = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 16px;
    margin-bottom: 8px;
    border-radius: 8px;
    background-color: rgba(255, 255, 255, 0.05);
    transition: all 0.2s ease;
    
    &:hover {
        background-color: rgba(255, 255, 255, 0.08);
        transform: translateY(-1px);
    }
    
    &:last-child {
        margin-bottom: 0;
    }
`;

export const EntryTime = styled.div`
    font-size: 0.9rem;
    color: var(--text-muted);
`;

export const EmojiSpan = styled.span`
    font-size: 1.5rem;
    cursor: help;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.05);
    transition: transform 0.2s ease;
    
    &:hover {
        transform: scale(1.1);
    }
`;

export const NoEntriesMessage = styled.div`
    text-align: center;
    padding: 40px 0;
    color: var(--text-muted);
    font-style: italic;
`;
