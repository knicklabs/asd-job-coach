chrome.sidePanel
  .setPanelBehavior({
    openPanelOnActionClick: true,
  })
  .catch((error) => console.error(error))

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'asdJobCoach',
    title: 'ASD Job Coach',
    contexts: ['page'],
  })
})

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'asdJobCoach') {
    chrome.sidePanel.open({ windowId: tab.windowId })
  }
})
