document.addEventListener('DOMContentLoaded', () => {
  chrome.runtime.sendMessage({ message: "get_windows" }, (response) => {
    const windowListElement = document.getElementById('windowList');
    windowListElement.innerHTML = ''; // Clear the loading message
    response.forEach(winInfo => {
      const div = document.createElement('div');
      div.textContent = `${winInfo.name}: ${winInfo.tabCount} tabs`;
      windowListElement.appendChild(div);
    });
  });
});
