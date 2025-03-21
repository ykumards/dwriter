// src/storage/browserStorage.js
import { StorageInterface } from './interface';

export default class BrowserStorage extends StorageInterface {
  constructor() {
    super();
    this.entriesDB = null;
    this.settingsDB = null;
    this.isInitialized = false;
  }
  
  async initialize() {
    // Make sure PouchDB is available
    if (!window.PouchDB) {
      console.error('PouchDB is not available. Make sure it is properly loaded.');
      throw new Error('PouchDB not available');
    }
    
    // Create/open databases
    this.entriesDB = new window.PouchDB('dwriter-entries');
    this.settingsDB = new window.PouchDB('dwriter-settings');
    
    // Migrate any existing localStorage data if needed
    await this.migrateFromLocalStorage();
    
    this.isInitialized = true;
    return true;
  }
  
  async migrateFromLocalStorage() {
    // Check if we've already migrated
    try {
      const migrated = await this.settingsDB.get('localStorage_migrated');
      if (migrated) return;
    } catch (error) {
      // Document doesn't exist, continue with migration
    }
    
    // Migrate entries
    try {
      const entriesJson = localStorage.getItem('entries');
      if (entriesJson) {
        const entries = JSON.parse(entriesJson);
        for (const entry of entries) {
          // Create a unique ID for each entry
          const id = `entry_${new Date(entry.datetime).getTime()}`;
          await this.entriesDB.put({
            _id: id,
            ...entry
          });
        }
      }
      
      // Migrate settings
      const settingsToMigrate = ['theme', 'fontFamily', 'fontSize', 'showEmoji'];
      const settings = {};
      
      for (const key of settingsToMigrate) {
        const value = localStorage.getItem(key);
        if (value !== null) {
          try {
            settings[key] = JSON.parse(value);
          } catch (e) {
            // If not valid JSON, store as string
            settings[key] = value;
          }
        }
      }
      
      if (Object.keys(settings).length > 0) {
        await this.updateSettings(settings);
      }
      
      // Mark as migrated
      await this.settingsDB.put({
        _id: 'localStorage_migrated',
        migrated: true,
        migratedAt: new Date().toISOString()
      });
      
      console.log('Successfully migrated data from localStorage to PouchDB');
    } catch (error) {
      console.error('Error migrating from localStorage:', error);
    }
  }
  
  async getEntries(options = {}) {
    if (!this.isInitialized) {
      await this.initialize();
    }
    
    const result = await this.entriesDB.allDocs({
      include_docs: true,
      attachments: false
    });
    
    const entries = result.rows
      .filter(row => !row.id.startsWith('_'))
      .map(row => ({
        id: row.id,
        ...row.doc
      }));
    
    // Sort by datetime (newest first)
    return entries.sort((a, b) => {
      return new Date(b.datetime) - new Date(a.datetime);
    });
  }
  
  async saveEntry(entry) {
    if (!this.isInitialized) {
      await this.initialize();
    }
    
    // Generate ID from current timestamp
    const id = `entry_${new Date().getTime()}`;
    
    await this.entriesDB.put({
      _id: id,
      ...entry
    });
    
    return id;
  }
  
  async deleteEntry(id) {
    if (!this.isInitialized) {
      await this.initialize();
    }
    
    try {
      // First, get the document to retrieve its _rev value
      const doc = await this.entriesDB.get(id);
      
      // Then delete it
      await this.entriesDB.remove(doc);
      
      return true;
    } catch (error) {
      console.error(`Error deleting entry with id ${id}:`, error);
      throw error;
    }
  }
  
  async getSettings() {
    if (!this.isInitialized) {
      await this.initialize();
    }
    
    try {
      const settings = await this.settingsDB.get('app-settings');
      return settings.data || {};
    } catch (error) {
      if (error.name === 'not_found') {
        // Return default settings
        return {
          theme: 'light',
          fontFamily: 'Open Sans',
          fontSize: 'medium',
          showEmoji: true,
          storageLocation: 'Browser Storage (IndexedDB)'
        };
      }
      throw error;
    }
  }
  
  async updateSettings(newSettings) {
    if (!this.isInitialized) {
      await this.initialize();
    }
    
    try {
      let doc;
      try {
        doc = await this.settingsDB.get('app-settings');
      } catch (error) {
        if (error.name === 'not_found') {
          doc = {
            _id: 'app-settings',
            data: {}
          };
        } else {
          throw error;
        }
      }
      
      const updatedDoc = {
        ...doc,
        data: {
          ...doc.data,
          ...newSettings
        }
      };
      
      await this.settingsDB.put(updatedDoc);
      return true;
    } catch (error) {
      console.error('Error updating settings:', error);
      throw error;
    }
  }
  
  async exportData() {
    if (!this.isInitialized) {
      await this.initialize();
    }
    
    const entries = await this.getEntries();
    const settings = await this.getSettings();
    
    return {
      entries,
      settings,
      exportDate: new Date().toISOString(),
      version: 1
    };
  }
  
  async importData(data) {
    if (!this.isInitialized) {
      await this.initialize();
    }
    
    if (!data.entries || !data.settings) {
      throw new Error('Invalid import data format');
    }
    
    // Clear existing databases
    await this.entriesDB.destroy();
    this.entriesDB = new window.PouchDB('dwriter-entries');
    
    // Import entries
    for (const entry of data.entries) {
      // Extract the ID if present, otherwise create new
      const { id, _id, _rev, ...entryData } = entry;
      await this.saveEntry(entryData);
    }
    
    // Import settings
    await this.updateSettings(data.settings);
    
    return true;
  }
  
  // In browser environment, we can't change the physical storage location
  // But we implement for API compatibility and provide export/import instead
  async changeStorageLocation() {
    alert("In the web app, the database is stored in your browser's built-in storage. For custom storage locations, please use the desktop app or use the Export/Import feature to backup your data.");
    return false;
  }
}
