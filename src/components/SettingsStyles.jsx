// src/components/SettingsStyles.jsx
import styled from 'styled-components';
import * as Switch from '@radix-ui/react-switch';

export const SettingsContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: ${props => props.theme === 'dark' ? '#2a2a2a' : props.theme === 'sepia' ? '#f8f0e0' : '#ffffff'};
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

export const SettingsHeader = styled.h2`
  color: ${props => props.theme === 'dark' ? '#ffffff' : props.theme === 'sepia' ? '#5d4037' : '#333333'};
  margin-bottom: 30px;
  padding-bottom: 10px;
  border-bottom: 1px solid ${props => props.theme === 'dark' ? '#444' : props.theme === 'sepia' ? '#d7c9b6' : '#eee'};
`;

export const SettingsSection = styled.div`
  margin-bottom: 30px;
`;

export const SettingTitle = styled.h3`
  color: ${props => props.theme === 'dark' ? '#e0e0e0' : props.theme === 'sepia' ? '#5d4037' : '#444444'};
  margin-bottom: 20px;
`;

export const SettingRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;

export const SettingLabel = styled.label`
  flex: 1;
  font-size: 16px;
  color: ${props => props.theme === 'dark' ? '#cccccc' : props.theme === 'sepia' ? '#6d5347' : '#555555'};
`;

export const SelectInput = styled.select`
  padding: 8px 12px;
  border-radius: 4px;
  border: 1px solid ${props => props.theme === 'dark' ? '#555' : props.theme === 'sepia' ? '#d7c9b6' : '#ddd'};
  background-color: ${props => props.theme === 'dark' ? '#3a3a3a' : props.theme === 'sepia' ? '#f8f4ea' : '#f9f9f9'};
  color: ${props => props.theme === 'dark' ? '#ffffff' : props.theme === 'sepia' ? '#5d4037' : '#333333'};
  font-size: 14px;
  width: 200px;
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme === 'dark' ? '#888' : props.theme === 'sepia' ? '#b89f81' : '#aaa'};
  }
`;

export const ToggleSwitch = styled(Switch.Root)`
  width: 42px;
  height: 25px;
  background-color: #ddd;
  border-radius: 9999px;
  position: relative;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  cursor: pointer;
  
  &[data-state='checked'] {
    background-color: #4caf50;
  }
`;

export const ToggleThumb = styled(Switch.Thumb)`
  display: block;
  width: 21px;
  height: 21px;
  background-color: white;
  border-radius: 9999px;
  transition: transform 100ms;
  transform: translateX(2px);
  will-change: transform;
  
  &[data-state='checked'] {
    transform: translateX(19px);
  }
`;

export const Button = styled.button`
  padding: 8px 16px;
  background-color: ${props => props.theme === 'dark' ? '#555' : props.theme === 'sepia' ? '#b89f81' : '#4285f4'};
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: ${props => props.theme === 'dark' ? '#666' : props.theme === 'sepia' ? '#c9af91' : '#5294ff'};
  }
  
  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

export const FileInputWrapper = styled.div`
  position: relative;
  overflow: hidden;
`;

export const FileInput = styled.input`
  position: absolute;
  font-size: 100px;
  right: 0;
  top: 0;
  opacity: 0;
  cursor: pointer;
  
  &:disabled {
    cursor: not-allowed;
  }
`;

export const LocationDisplay = styled.div`
  padding: 8px 12px;
  border-radius: 4px;
  border: 1px solid ${props => props.theme === 'dark' ? '#555' : props.theme === 'sepia' ? '#d7c9b6' : '#ddd'};
  background-color: ${props => props.theme === 'dark' ? '#3a3a3a' : props.theme === 'sepia' ? '#f8f4ea' : '#f9f9f9'};
  color: ${props => props.theme === 'dark' ? '#ffffff' : props.theme === 'sepia' ? '#5d4037' : '#333333'};
  font-size: 14px;
  width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
