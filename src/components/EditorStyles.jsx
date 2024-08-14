import styled from 'styled-components';


// Styled components
export const EditorContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 80%;
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