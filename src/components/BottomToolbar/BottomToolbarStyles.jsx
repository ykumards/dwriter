import styled from 'styled-components';
import { motion } from 'framer-motion';

const Container = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60px;
  background: var(--toolbar-bg);
  border-top: 1px solid var(--toolbar-border);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  z-index: 100;
  overflow: visible; /* Ensure tooltips aren't cut off */
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);
  transition: background-color 0.3s, border-color 0.3s;
`;

const ToolbarContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 1200px;
  padding: 0 20px;
  box-sizing: border-box;
  position: relative;
`;

const LeftControls = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const CenterControls = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
`;

const RightControls = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const IconButton = styled(motion.button)`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: ${props => props.isActive ? 'var(--primary)' : 'var(--button-bg)'};
  color: ${props => props.isActive ? '#fff' : 'var(--button-text)'};
  border: 1px solid ${props => props.isActive ? 'transparent' : 'var(--button-border)'};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 16px;
  padding: 0;
  margin: 0 5px;
  
  & > svg {
    width: 20px;
    height: 20px;
  }
  
  &:hover {
    background: ${props => props.isActive ? 'var(--primary-hover)' : 'var(--button-hover)'};
  }
`;

const Label = styled.span`
  font-size: 14px;
  color: var(--button-text);
  font-weight: 500;
  white-space: nowrap;
  transition: color 0.3s;
`;

const ToggleButton = styled(motion.button)`
  height: 36px;
  background: ${props => props.isActive ? 'var(--primary)' : 'var(--button-bg)'};
  color: ${props => props.isActive ? 'white' : 'var(--button-text)'};
  border: none;
  border-radius: 18px;
  padding: 0 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease;
  
  &:hover {
    background: ${props => props.isActive ? 'var(--primary-hover)' : 'var(--button-hover)'};
  }
`;

const SaveButton = styled(motion.button)`
  height: 36px;
  background: var(--primary);
  color: white;
  border: none;
  border-radius: 18px;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
  
  &:hover {
    background: var(--primary-hover);
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  }
  
  &:disabled {
    background: #a0a0a0;
    cursor: not-allowed;
    opacity: 0.7;
    box-shadow: none;
  }
  
  & > svg {
    width: 16px;
    height: 16px;
  }
`;

export const BottomToolbarStyles = {
  Container,
  ToolbarContent,
  LeftControls,
  CenterControls,
  RightControls,
  IconButton,
  Label,
  SaveButton,
  ToggleButton
};