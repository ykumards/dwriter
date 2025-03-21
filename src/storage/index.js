// src/storage/index.js
import { isTauri } from '../utils/environment';
import BrowserStorage from './browserStorage';
import DesktopStorage from './desktopStorage';

// Factory function to create the appropriate storage implementation
export function createStorage() {
  if (isTauri()) {
    // Use desktop storage if running in Tauri
    return new DesktopStorage();
  } else {
    // Use browser storage for web app
    return new BrowserStorage();
  }
}

// Singleton instance
let storageInstance = null;

// Get storage instance (singleton pattern)
export function getStorage() {
  if (!storageInstance) {
    storageInstance = createStorage();
  }
  return storageInstance;
}

// Export interface for reference
export { StorageInterface } from './interface';
