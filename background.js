chrome.runtime.onInstalled.addListener(() => {
  // When the extension is installed, set up the necessary event listeners
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === "get_windows") {
    chrome.windows.getAll({ populate: true }, (windows) => {
      const windowInfo = windows.map(win => ({
        name: `Window ${win.id}`,
        tabCount: win.tabs.length
      })).sort((a, b) => b.tabCount - a.tabCount);
      sendResponse(windowInfo);
    });
    return true; // Return true to indicate you wish to send a response asynchronously
  }
});
