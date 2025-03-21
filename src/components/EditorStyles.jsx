import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';

// Define the keyframes for the rotating animation
const rotate = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`;

const fadeIn = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;

// Styled components
export const EditorContainer = styled.div`
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
    width: 70%;
    height: 85%;
    background-color: var(--background-light);
    border-radius: 8px;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
    overflow: hidden;
    position: relative;
    transition: all 0.3s ease;
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

export const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
    padding-bottom: 15px;
    text-align: center;
    border-bottom: 1px solid rgba(0, 0, 0, 0.03);
`;

export const EntryDatetime = styled.div`
    font-size: 0.9rem;
    color: var(--text-muted);
    font-weight: 400;
    letter-spacing: 0.5px;
`;

export const EmojiDisplay = styled.div`
    font-size: 1.5em;
    margin-left: 10px;
    animation: ${fadeIn} 0.3s ease;
`;

export const TextAreaContainer = styled.div`
    position: relative;
    flex: 1;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    overflow: hidden;
`;

export const TextArea = styled.textarea`
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    font-size: 1.3rem;
    line-height: 1.8;
    background: transparent;
    resize: none;
    overflow-y: auto;
    color: var(--text-dark);
    background-image: linear-gradient(transparent, transparent calc(1.8rem - 1px), rgba(0, 0, 0, 0.05) 0px);
    background-size: 100% 1.8rem;
    caret-color: var(--primary);
    padding: 0;

    &::placeholder {
        color: rgba(0, 0, 0, 0.2);
    }

    &:focus {
        outline: none;
    }
`;

export const LoadingMessage = styled.div`
    margin-top: 10px;
    font-size: 1rem;
    color: var(--primary);
    display: flex;
    align-items: center;
    opacity: 0.9;
    border-radius: 8px;
    padding: 12px 20px;
    background-color: rgba(100, 108, 255, 0.08);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

export const LoadingText = styled.span`
    margin-right: 12px;
    font-weight: 500;
`;

// Styled component for the rotating circle
export const RotatingCircle = styled.div`
    border: 3px solid rgba(100, 108, 255, 0.2);
    border-top: 3px solid var(--primary);
    border-radius: 50%;
    width: 22px;
    height: 22px;
    animation: ${rotate} 1s linear infinite;
`;

export const ToggleContainer = styled.div`
    position: absolute;
    top: 20px;
    right: 20px;
    z-index: 10;
    display: flex;
    gap: 15px;
    align-items: center;
`;

export const ToolbarContainer = styled.div`
    display: flex;
    align-items: center;
    padding: 10px 0;
    justify-content: space-between;
    width: 100%;
`;

export const SwitchContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;

export const SwitchLabel = styled.span`
    color: rgba(255, 255, 255, 0.8);
    font-size: 0.9rem;
    font-weight: 500;
`;

export const SaveButton = styled.button`
    background-color: var(--primary);
    color: white;
    border: none;
    border-radius: 6px;
    padding: 8px 16px;
    cursor: pointer;
    font-size: 0.9em;
    font-weight: 500;
    transition: all 0.2s ease;
    box-shadow: 0 2px 8px rgba(100, 108, 255, 0.3);
    display: flex;
    align-items: center;
    gap: 6px;
    
    &:hover {
        background-color: var(--primary-hover);
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(100, 108, 255, 0.4);
    }
    
    &:active {
        transform: translateY(1px);
        box-shadow: 0 1px 3px rgba(100, 108, 255, 0.4);
    }

    .save-icon {
        font-size: 16px;
    }
`;

export const CenteredEmojiContainer = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1000;
    pointer-events: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: rgba(255, 255, 255, 0.9);
    border-radius: 100%;
    width: 120px;
    height: 120px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    
    .emoji {
        font-size: 4rem;
    }
    
    .emotion-label {
        margin-top: 8px;
        font-size: 1rem;
        font-weight: 500;
        color: var(--text-muted);
    }
`;

export const AnimatedEmoji = styled(motion.div)`
    font-size: 4rem;
    line-height: 1;
`;
