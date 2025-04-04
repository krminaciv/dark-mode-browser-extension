function applyDarkMode() {
    const style = document.createElement('style');
    style.id = 'dark-mode-style';
    style.textContent = `
      html, body, div, span, applet, object, iframe,
      h1, h2, h3, h4, h5, h6, p, blockquote, pre,
      a, abbr, acronym, address, big, cite, code,
      del, dfn, em, img, ins, kbd, q, s, samp,
      small, strike, strong, sub, sup, tt, var,
      b, u, i, center,
      dl, dt, dd, ol, ul, li,
      fieldset, form, label, legend,
      table, caption, tbody, tfoot, thead, tr, th, td,
      article, aside, canvas, details, embed, 
      figure, figcaption, footer, header, hgroup, 
      menu, nav, output, ruby, section, summary,
      time, mark, audio, video {
        background-color: #1a1a1a !important;
        color: #e0e0e0 !important;
      }
      input, textarea, select, button {
        background-color: #2a2a2a !important;
        color: #e0e0e0 !important;
        border-color: #444 !important;
      }
      a {
        color: #4d8be8 !important;
      }
      :disabled {
        opacity: 0.7 !important;
      }
    `;
    document.head.appendChild(style);
  }

  checkDarkModeState();

  function checkDarkModeState() {
    chrome.storage.sync.get(['darkModeEnabled'], (result) => {
      const isEnabled = result.darkModeEnabled !== false;
      
      if (isEnabled) {
        applyDarkMode();
      } else {
        removeDarkMode();
      }
    });
  }
  
  function removeDarkMode() {
    const style = document.getElementById('dark-mode-style');
    if (style) {
      style.remove();
    }
  }
  
  chrome.storage.sync.get(['darkModeEnabled'], (result) => {
    if (result.darkModeEnabled !== false) {
      applyDarkMode();
    }
  });
  
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'toggleDarkMode') {
      if (request.enabled) {
        applyDarkMode();
      } else {
        removeDarkMode();
      }
    }
  });