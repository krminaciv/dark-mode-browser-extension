// Background script to manage extension state
chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ darkModeEnabled: true });
  });