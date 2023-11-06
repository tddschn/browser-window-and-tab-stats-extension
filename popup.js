document.addEventListener('DOMContentLoaded', () => {
  chrome.windows.getCurrent({ populate: true }, currentWindow => {
    chrome.windows.getAll({ populate: true }, (windows) => {
      const windowListElement = document.getElementById('windowList');
      const totalWindowsElement = document.getElementById('totalWindows');
      const totalTabsElement = document.getElementById('totalTabs');
      let totalTabs = 0;
      let totalWindows = 0;

      // Clear the existing table contents except for the header
      windowListElement.innerHTML = '';

      windows.forEach(win => {
        totalTabs += win.tabs.length;
        totalWindows++;

        const activeTab = win.tabs.find(tab => tab.active);
        const windowName = activeTab ? activeTab.title : `Window ${win.id}`;

        // Create a new row for each window
        const tr = document.createElement('tr');
        tr.className = `windowItem ${win.id === currentWindow.id ? 'current' : ''}`;
        tr.innerHTML = `
          <td class='windowName'>${windowName}</td>
          <td>${win.tabs.length} tabs</td>
        `;
        windowListElement.appendChild(tr);
      });

      // Set the total counts in the table header
      totalWindowsElement.textContent = totalWindows;
      totalTabsElement.textContent = totalTabs;
    });
  });
});
