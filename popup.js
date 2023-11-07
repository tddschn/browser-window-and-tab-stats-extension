document.addEventListener('DOMContentLoaded', () => {
  chrome.windows.getCurrent({ populate: true }, currentWindow => {
    chrome.windows.getAll({ populate: true }, (windows) => {
      const windowListElement = document.getElementById('windowList');
      const totalWindowsElement = document.getElementById('totalWindows');
      const totalTabsElement = document.getElementById('totalTabs');
      let totalTabs = 0;
      let totalWindows = 0;

      // Clear the existing contents of windowList
      windowListElement.innerHTML = '';

      // Sort windows by tab count in descending order
      const sortedWindows = windows.sort((a, b) => b.tabs.length - a.tabs.length);

      sortedWindows.forEach(win => {
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

      // Set the total counts in the totalWindows and totalTabs elements
      totalWindowsElement.textContent = totalWindows;
      totalTabsElement.textContent = totalTabs;
    });
  });
});
// ... existing code ...

// Function to update the UI with tab group information
function updateTabGroups() {
  chrome.tabGroups.query({}, (groups) => {
    const tabGroupsElement = document.getElementById('tabGroupsList');
    let totalGroups = 0;

    // Clear existing contents
    tabGroupsElement.innerHTML = '';

    // Sort groups by tab count in descending order
    const sortedGroups = groups.sort((a, b) => b.tabCount - a.tabCount);

    sortedGroups.forEach(group => {
      totalGroups++;

      // Create a new row for each tab group
      const tr = document.createElement('tr');
      tr.className = 'tabGroupItem';
      tr.innerHTML = `
        <td class='groupName'>${group.title}</td>
        <td>${group.tabCount} tabs</td>
      `;
      tabGroupsElement.appendChild(tr);
    });
  });
}

// Call the new function within the DOMContentLoaded listener
document.addEventListener('DOMContentLoaded', () => {
  // ... existing code ...
  updateTabGroups(); // Add this line to update tab groups
});
