import styled from 'styled-components';
import { motion } from 'framer-motion';

const Container = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60px;
  background: #fafafa;
  border-top: 1px solid #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  z-index: 100;
  overflow: visible; /* Ensure tooltips aren't cut off */
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);
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
  background: ${props => props.isActive ? '#6b7ff7' : '#f5f5f5'};
  color: ${props => props.isActive ? '#fff' : '#666'};
  border: 1px solid ${props => props.isActive ? 'transparent' : '#e0e0e0'};
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
    background: ${props => props.isActive ? '#6b7ff7' : '#eaeaea'};
  }
`;

const Label = styled.span`
  font-size: 14px;
  color: #555;
  font-weight: 500;
  white-space: nowrap;
`;

const ToggleButton = styled(motion.button)`
  height: 36px;
  background: ${props => props.isActive ? '#6b7ff7' : '#f0f0f0'};
  color: ${props => props.isActive ? 'white' : '#555'};
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
    background: ${props => props.isActive ? '#586ce0' : '#e4e4e4'};
  }
`;

const SaveButton = styled(motion.button)`
  height: 36px;
  background: #6b7ff7;
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
    background: #586ce0;
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