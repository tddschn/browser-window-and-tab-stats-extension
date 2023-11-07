document.addEventListener("DOMContentLoaded", () => {
  chrome.windows.getCurrent({ populate: true }, (currentWindow) => {
    chrome.windows.getAll({ populate: true }, (windows) => {
      const windowListElement = document.getElementById("windowList");
      const totalWindowsElement = document.getElementById("totalWindows");
      const totalTabsElement = document.getElementById("totalTabs");
      let totalTabs = 0;
      let totalWindows = 0;

      // Clear the existing contents of windowList
      windowListElement.innerHTML = "";

      // Sort windows by tab count in descending order
      const sortedWindows = windows.sort(
        (a, b) => b.tabs.length - a.tabs.length
      );

      sortedWindows.forEach((win) => {
        totalTabs += win.tabs.length;
        totalWindows++;

        const activeTab = win.tabs.find((tab) => tab.active);
        const windowName = activeTab ? activeTab.title : `Window ${win.id}`;

        // Create a new row for each window
        const tr = document.createElement("tr");
        tr.className = `windowItem ${
          win.id === currentWindow.id ? "current" : ""
        }`;
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
function updateTabGroups() {
  chrome.tabGroups.query({}, (groups) => {
    const tabGroupsElement = document.getElementById("tabGroupsList");

    // Clear existing contents
    tabGroupsElement.innerHTML = "";

    // Loop over each group to find tabs within it
    groups.forEach((group) => {
      chrome.tabs.query({ groupId: group.id }, (tabsInGroup) => {
        // Create a new row for each tab group
        const tr = document.createElement("tr");
        tr.className = "tabGroupItem";
        tr.innerHTML = `
          <td class='groupName'>${group.title || "Group " + group.id}</td>
          <td>${tabsInGroup.length} tabs</td> 
        `;
        tabGroupsElement.appendChild(tr);
      });
    });
  });
}

// Make sure to call this function when the popup is loaded
document.addEventListener("DOMContentLoaded", () => {
  updateTabGroups(); // This will populate the tab groups when the popup is displayed
});
