// src/GlobalStyles.jsx

import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
    @font-face {
        font-family: 'Open Sans';
        src: url('/assets/fonts/Open_Sans/static/OpenSans-Regular.ttf') format('truetype');
        font-weight: 400;
        font-style: normal;
    }

    @font-face {
        font-family: 'Open Sans';
        src: url('/assets/fonts/Open_Sans/static/OpenSans-Bold.ttf') format('truetype');
        font-weight: 700;
        font-style: normal;
    }

    @font-face {
        font-family: 'Open Sans';
        src: url('/assets/fonts/Open_Sans/static/OpenSans-Italic.ttf') format('truetype');
        font-weight: 400;
        font-style: italic;
    }

    :root {
        /* Color palette - light theme (default) */
        --background-dark: #242424;
        --background-light: #fcfcfa; /* Subtle cream color for paper-like feel */
        --text-dark: #333333;
        --text-light: rgba(255, 255, 255, 0.87);
        --text-muted: #888888;
        --primary: #646cff;
        --primary-hover: #535bf2;
        --accent: rgba(100, 108, 255, 0.08);
        --border: rgba(0, 0, 0, 0.1);
        --shadow: rgba(0, 0, 0, 0.1);
        --toolbar-bg: #fafafa;
        --toolbar-border: #e0e0e0;
        --button-bg: #f5f5f5;
        --button-hover: #eaeaea;
        --button-text: #666;
        --button-border: #e0e0e0;
        --tooltip-bg: rgba(0, 0, 0, 0.8);
        --tooltip-text: white;
        
        /* Calendar light theme variables */
        --calendar-bg: rgba(255, 255, 255, 0.9);
        --calendar-border: rgba(0, 0, 0, 0.05);
        --calendar-text: #333333;
        --calendar-muted: #888888;
        --calendar-tile-hover: rgba(0, 0, 0, 0.05);
        --calendar-tile-active: var(--primary);
        --calendar-tile-now: rgba(100, 108, 255, 0.1);
        --calendar-emotion-joy: rgba(255, 220, 0, 0.15);
        --calendar-emotion-sadness: rgba(0, 112, 192, 0.15);
        --calendar-emotion-anger: rgba(192, 0, 0, 0.15);
        --calendar-emotion-fear: rgba(112, 48, 160, 0.15);
        --calendar-emotion-disgust: rgba(0, 176, 80, 0.15);
        --calendar-emotion-surprise: rgba(255, 153, 0, 0.15);
        --calendar-emotion-neutral: rgba(166, 166, 166, 0.15);
        --calendar-emotion-mixed: rgba(0, 0, 0, 0.05);
        
        /* Typography */
        font-family: 'Open Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
        line-height: 1.6;
        font-weight: 400;
        font-size: 16px;

        /* Theme */
        color-scheme: light dark;
        color: var(--text-dark);
        background-color: var(--background-dark);

        /* Font rendering */
        font-synthesis: none;
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        
        /* Transitions */
        --transition-standard: 0.2s ease;
    }

    /* Paper texture (subtle) */
    .paper-texture {
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
        background-repeat: repeat;
    }

    a {
        font-weight: 500;
        color: var(--primary);
        text-decoration: none;
        transition: color var(--transition-standard);
    }
    a:hover {
        color: var(--primary-hover);
    }

    /* Dark theme variables */
[data-theme="dark"] {
    --background-dark: #121212;
    --background-light: #242424;
    --text-dark: rgba(255, 255, 255, 0.87);
    --text-light: rgba(255, 255, 255, 0.87);
    --text-muted: rgba(255, 255, 255, 0.6);
    --border: rgba(255, 255, 255, 0.1);
    --shadow: rgba(0, 0, 0, 0.3);
    --toolbar-bg: #242424;
    --toolbar-border: #333333;
    --button-bg: #333333;
    --button-hover: #404040;
    --button-text: rgba(255, 255, 255, 0.87);
    --button-border: #444444;
    
    /* Calendar dark theme variables */
    --calendar-bg: rgba(36, 36, 36, 0.9);
    --calendar-border: rgba(255, 255, 255, 0.05);
    --calendar-text: rgba(255, 255, 255, 0.87);
    --calendar-muted: rgba(255, 255, 255, 0.6);
    --calendar-tile-hover: rgba(255, 255, 255, 0.08);
    --calendar-tile-active: var(--primary);
    --calendar-tile-now: rgba(100, 108, 255, 0.2);
    --calendar-emotion-joy: rgba(255, 220, 0, 0.2);
    --calendar-emotion-sadness: rgba(0, 112, 192, 0.2);
    --calendar-emotion-anger: rgba(192, 0, 0, 0.2);
    --calendar-emotion-fear: rgba(112, 48, 160, 0.2);
    --calendar-emotion-disgust: rgba(0, 176, 80, 0.2);
    --calendar-emotion-surprise: rgba(255, 153, 0, 0.2);
    --calendar-emotion-neutral: rgba(166, 166, 166, 0.2);
    --calendar-emotion-mixed: rgba(255, 255, 255, 0.08);
}

body {
    margin: 0;
    display: flex;
    justify-content: center;
    min-width: 500px;
    min-height: 100vh;
    overflow-x: hidden;
    background-color: var(--background-dark);
}

    h1, h2, h3, h4 {
        font-weight: 700;
        line-height: 1.2;
        margin-top: 0;
    }

    h1 {
        font-size: 2.5rem;
    }

    p {
        margin: 0 0 1.5em 0;
    }

    button {
        font-family: inherit;
        border-radius: 6px;
        border: 1px solid transparent;
        padding: 0.6em 1.2em;
        font-size: 1em;
        font-weight: 500;
        background-color: #f0f0f0;
        cursor: pointer;
        transition: all var(--transition-standard);
        box-shadow: 0 1px 2px var(--shadow);
    }
    
    button:hover {
        background-color: #e8e8e8;
    }
    
    button:focus {
        outline: 2px solid var(--primary);
        outline-offset: 2px;
    }

    .visually-hidden {
        border: 0;
        clip: rect(0 0 0 0);
        height: 1px;
        margin: -1px;
        overflow: hidden;
        padding: 0;
        position: absolute;
        width: 1px;
    }

    /* Transitions */
    .fade-enter {
        opacity: 0;
    }
    .fade-enter-active {
        opacity: 1;
        transition: opacity 300ms;
    }
    .fade-exit {
        opacity: 1;
    }
    .fade-exit-active {
        opacity: 0;
        transition: opacity 300ms;
    }

    ::selection {
        background-color: var(--accent);
        color: var(--primary);
    }

    /* Radix UI Switch styling */
    .SwitchRoot {
        width: 46px;
        height: 26px;
        background-color: rgba(0, 0, 0, 0.1);
        border-radius: 9999px;
        position: relative;
        box-shadow: 0 2px 5px var(--shadow);
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        cursor: pointer;
        transition: all var(--transition-standard);
        border: 1px solid transparent;
    }

    .SwitchRoot:focus {
        outline: none;
        box-shadow: 0 0 0 2px rgba(100, 108, 255, 0.3);
    }

    .SwitchRoot[data-state='checked'] {
        background-color: var(--primary);
    }

    .SwitchThumb {
        display: block;
        width: 20px;
        height: 20px;
        background-color: white;
        border-radius: 9999px;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
        transition: transform var(--transition-standard);
        transform: translateX(3px);
        will-change: transform;
        margin-top: 2px;
    }

    .SwitchThumb[data-state='checked'] {
        transform: translateX(22px);
    }

    /* Toast styling */
    .ToastViewport {
        position: fixed;
        bottom: 0;
        right: 0;
        display: flex;
        flex-direction: column;
        padding: 25px;
        gap: 10px;
        width: 390px;
        max-width: 100vw;
        margin: 0;
        list-style: none;
        z-index: 2147483647;
        outline: none;
    }

    .ToastRoot {
        background-color: white;
        border-radius: 8px;
        box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.08);
        padding: 15px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 15px;
        border-left: 4px solid var(--primary);
        animation: slideIn 150ms cubic-bezier(0.16, 1, 0.3, 1);
    }

    .ToastTitle {
        font-weight: 500;
        color: var(--text-dark);
        font-size: 14px;
    }

    .ToastAction {
        flex-shrink: 0;
        background: transparent;
        border: none;
        cursor: pointer;
    }

    @keyframes slideIn {
        from {
            transform: translateX(calc(100% + 25px));
        }
        to {
            transform: translateX(0);
        }
    }

    /* Tooltip styling */
    .TooltipContent {
        background-color: rgba(0, 0, 0, 0.8);
        color: white;
        border-radius: 4px;
        padding: 8px 12px;
        font-size: 13px;
        max-width: 180px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        z-index: 1000;
    }

    .TooltipContent .Tooltip-arrow {
        fill: rgba(0, 0, 0, 0.8);
    }
`;

export default GlobalStyles;