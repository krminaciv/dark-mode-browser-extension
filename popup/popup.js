document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('toggle');
    const status = document.getElementById('status');

    const updateAllTabs = (isEnabled) => {
        chrome.tabs.query({}, (tabs) => {
          tabs.forEach(tab => {
            if (tab.url && tab.url.startsWith('http')) {
              chrome.tabs.sendMessage(tab.id, {
                action: 'toggleDarkMode',
                enabled: isEnabled
              }, () => {
                if (chrome.runtime.lastError) {
                  console.log('Tab not ready:', tab.id);
                }
              });
            }
          });
        });
      };
    
    // Get current state
    chrome.storage.sync.get(['darkModeEnabled'], (result) => {
      const isEnabled = result.darkModeEnabled !== false;
      toggle.checked = isEnabled;
      status.textContent = isEnabled ? 'Enabled' : 'Disabled';
    });
    
    // Toggle dark mode
    toggle.addEventListener('change', () => {
      const isEnabled = toggle.checked;
      chrome.storage.sync.set({ darkModeEnabled: isEnabled });
      status.textContent = isEnabled ? 'Enabled' : 'Disabled';

      
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, {
          action: 'toggleDarkMode',
          enabled: isEnabled
        });
      });
      
      //updateAllTabs(isEnabled);
    });
  });