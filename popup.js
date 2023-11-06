document.addEventListener('DOMContentLoaded', () => {
  chrome.windows.getCurrent({ populate: true }, currentWindow => {
    chrome.windows.getAll({ populate: true }, (windows) => {
      const windowListElement = document.getElementById('windowList');
      const totalCountsElement = document.getElementById('totalCounts');
      let totalTabs = 0;

      // Clear the loading message
      windowListElement.innerHTML = '';
      totalCountsElement.innerHTML = '';

      // Calculate total number of windows and tabs
      const totalWindows = windows.length;
      windows.forEach(win => totalTabs += win.tabs.length);

      // Display total counts
      totalCountsElement.textContent = `Windows: ${totalWindows} | Tabs: ${totalTabs}`;

      // Iterate over the windows to display their details
      windows.forEach(win => {
        const div = document.createElement('div');
        div.className = 'windowItem';
        div.textContent = `${win.title}: ${win.tabs.length} tabs`;

        // Highlight the current window
        if (win.id === currentWindow.id) {
          div.classList.add('current');
        }

        // Create a span for the window name to make it bold
        const span = document.createElement('span');
        span.className = 'windowName';
        span.textContent = win.title.split(' - ')[0] || `Window ${win.id}`;
        div.textContent = ''; // Clear the textContent before appending the child elements
        div.appendChild(span);
        div.appendChild(document.createTextNode(`: ${win.tabs.length} tabs`));

        windowListElement.appendChild(div);
      });
    });
  });
});
