// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import GlobalStyles from './GlobalStyles.jsx';
import { EditorProvider } from './context/EditorContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GlobalStyles />
    <BrowserRouter>
      <EditorProvider>
        <App />
      </EditorProvider>
    </BrowserRouter>
  </React.StrictMode>
);