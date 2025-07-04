// background.js

chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
    if (req.action === "notify") {
      chrome.notifications.create({
        type: "basic",
        iconUrl: "icons/icon.png",
        title: req.title,
        message: req.message,
        priority: 2
      });
    }
  });
  