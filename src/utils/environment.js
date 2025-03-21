// src/utils/environment.js

// Check if running in Tauri desktop app
export const isTauri = () => {
  return window.__TAURI__ !== undefined;
};

// Check if running in development mode
export const isDevelopment = () => {
  return process.env.NODE_ENV === 'development';
};
