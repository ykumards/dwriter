// src/storage/interface.js
// Common interface for all storage implementations

export class StorageInterface {
  async initialize() {
    throw new Error('Not implemented');
  }
  
  async getEntries(options = {}) {
    throw new Error('Not implemented');
  }
  
  async saveEntry(entry) {
    throw new Error('Not implemented');
  }
  
  async getSettings() {
    throw new Error('Not implemented');
  }
  
  async updateSettings(settings) {
    throw new Error('Not implemented');
  }
  
  async exportData() {
    throw new Error('Not implemented');
  }
  
  async importData(data) {
    throw new Error('Not implemented');
  }
  
  async changeStorageLocation() {
    throw new Error('Not implemented');
  }
}
