import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import styled from 'styled-components';

export const AppContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100%;
    max-width: 1200px;
    min-width: 500px;
    background-color: var(--background-dark);
    color: var(--text-light);
    position: relative;
    overflow-x: hidden;
    margin: 0 auto;
`;

export const Sidebar = styled(motion.div)`
    width: ${props => props.isOpen ? '220px' : '60px'};
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.2);
    border-right: 1px solid rgba(255, 255, 255, 0.05);
    display: flex;
    flex-direction: column;
    align-items: ${props => props.isOpen ? 'flex-start' : 'center'};
    padding-top: 20px;
    transition: width 0.3s ease;
    overflow-x: hidden;
`;

export const SidebarHeader = styled.div`
    padding: 0 20px;
    margin-bottom: 30px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: ${props => props.isOpen ? 'space-between' : 'center'};
`;

export const Logo = styled.div`
    font-size: 1.3rem;
    font-weight: 700;
    color: var(--text-light);
    display: ${props => props.isOpen ? 'block' : 'none'};
`;

export const HamburgerIcon = styled(motion.div)`
    background: none;
    border: none;
    color: var(--text-light);
    font-size: 20px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border-radius: 6px;
    transition: background-color 0.2s ease;
    
    &:hover {
        background-color: rgba(255, 255, 255, 0.1);
    }
`;

export const NavItems = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 0 10px;
`;

export const StyledNavItem = styled.div`
    display: flex;
    align-items: center;
    padding: ${props => props.isOpen ? '12px 15px' : '12px'};
    margin-bottom: 10px;
    color: var(--text-light);
    text-decoration: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.2s ease;
    
    &.active {
        background-color: rgba(255, 255, 255, 0.1);
        font-weight: 500;
    }

    &:hover {
        background-color: rgba(255, 255, 255, 0.07);
    }
    
    .nav-icon {
        font-size: 20px;
        margin-right: ${props => props.isOpen ? '12px' : '0'};
    }
    
    .nav-text {
        display: ${props => props.isOpen ? 'block' : 'none'};
        white-space: nowrap;
    }
`;

export const Content = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    position: relative;
`;

export const ContentFullWidth = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    height: calc(100vh - 60px); /* Adjust for bottom toolbar */
    width: 100%;
    position: relative;
    overflow: auto;
    padding-bottom: 60px; /* Match the height of the bottom toolbar */
    box-sizing: border-box;
`;

export const ShortcutHint = styled.div`
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    background-color: rgba(0, 0, 0, 0.6);
    color: white;
    padding: 8px 16px;
    border-radius: 20px;
    font-size: 0.8rem;
    opacity: 0.5;
    transition: opacity 0.2s ease;
    
    &:hover {
        opacity: 0.9;
    }
    
    .shortcut-key {
        display: inline-block;
        background-color: rgba(255, 255, 255, 0.2);
        padding: 2px 6px;
        border-radius: 4px;
        margin: 0 2px;
    }
`;
