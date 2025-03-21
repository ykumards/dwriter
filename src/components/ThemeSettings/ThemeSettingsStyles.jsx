import styled from 'styled-components';
import { motion } from 'framer-motion';

export const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(3px);
`;

export const ModalContent = styled(motion.div)`
  background-color: var(--background-light);
  border-radius: 12px;
  width: 400px;
  max-width: 90vw;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid var(--border);
`;

export const ModalTitle = styled.h2`
  margin: 0;
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--text-dark);
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  color: var(--text-muted);
  cursor: pointer;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: var(--accent);
    color: var(--text-dark);
  }
`;

export const ModalBody = styled.div`
  padding: 20px;
`;

export const ThemeOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const ThemeOption = styled.button`
  display: flex;
  align-items: center;
  padding: 12px 16px;
  background-color: ${props => props.$isActive ? 'var(--primary)' : 'var(--button-bg)'};
  color: ${props => props.$isActive ? 'white' : 'var(--text-dark)'};
  border: 1px solid ${props => props.$isActive ? 'transparent' : 'var(--border)'};
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${props => props.$isActive ? 'var(--primary-hover)' : 'var(--button-hover)'};
  }
`;

export const OptionLabel = styled.span`
  flex: 1;
`;

export const Section = styled.div`
  margin-bottom: 24px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

export const SectionTitle = styled.h3`
  font-size: 1rem;
  margin: 0 0 12px 0;
  color: var(--text-dark);
`;
