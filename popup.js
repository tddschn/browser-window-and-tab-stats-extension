document.addEventListener('DOMContentLoaded', () => {
  chrome.windows.getCurrent({ populate: true }, currentWindow => {
    chrome.windows.getAll({ populate: true }, (windows) => {
      const windowListElement = document.getElementById('windowList');
      const totalCountsElement = document.getElementById('totalCounts');
      let totalTabs = 0;
      let totalWindows = 0;

      windowListElement.innerHTML = '';
      totalCountsElement.innerHTML = '';

      windows.forEach(win => {
        totalTabs += win.tabs.length;
        totalWindows++;

        const activeTab = win.tabs.find(tab => tab.active);
        const windowName = activeTab ? activeTab.title : `Window ${win.id}`;

        const div = document.createElement('div');
        div.className = `windowItem ${win.id === currentWindow.id ? 'current' : ''}`;
        div.innerHTML = `<span class='windowName'>${windowName}</span>: ${win.tabs.length} tabs`;
        windowListElement.appendChild(div);
      });

      totalCountsElement.textContent = `Windows: ${totalWindows} | Tabs: ${totalTabs}`;
    });
  });
});
