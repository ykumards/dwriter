import styled, { keyframes } from 'styled-components';

// Define the keyframes for the rotating animation
const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

// Styled components
export const EditorContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 80%;
  min-width: 500px;
  background-color: #f5f5f5;
  margin: 0;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

export const EntryDatetime = styled.div`
  font-size: 0.8rem;
  color: #888;
  margin-right: 10px;
`;

export const EmojiDisplay = styled.div`
  font-size: 2em;
`;

export const TextAreaContainer = styled.div`
  position: relative;
  width: 80%;
  height: 80%;
  background: none;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden; /* Prevent overflow outside the container */
`;

export const TextArea = styled.textarea`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
  height: auto;
  max-height: 100%; /* Limit the height of the textarea */
  border: none;
  outline: none;
  font-size: 1.5rem;
  line-height: 1.6;
  background: none;
  resize: none;
  overflow-y: auto; /* Allow vertical scrolling */
  color: black;

  ::placeholder {
    color: #ccc;
  }
`;

export const LoadingMessage = styled.div`
  margin-top: 10px;
  font-size: 1rem;
  color: #646cff;
  display: flex;
  align-items: center;
`;

export const LoadingText = styled.span`
  margin-right: 10px;
`;

// Styled component for the rotating circle
export const RotatingCircle = styled.div`
  border: 4px solid rgba(100, 100, 100, 0.1);
  border-top: 4px solid #646cff;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  animation: ${rotate} 1s linear infinite;
`;

export const ToggleContainer = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 10;
`;

export const ToggleSwitch = styled.label`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;

  & input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  & .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    transition: .4s;
    border-radius: 34px;
  }

  & .slider:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: .4s;
    border-radius: 50%;
  }

  input:checked + .slider {
    background-color: #646cff;
  }

  input:checked + .slider:before {
    transform: translateX(26px);
  }

  & .slider.round {
    border-radius: 34px;
  }

  & .slider.round:before {
    border-radius: 50%;
  }
`;