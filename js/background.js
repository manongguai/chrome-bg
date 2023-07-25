chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.get("active", (budget) => {
    chrome.action.setBadgeText({
      text: budget.active || "OFF",
    });
  });
});
let tabMap = new Map();
// 当用户点击图标时
chrome.action.onClicked.addListener((tab) => {
  chrome.storage.sync.get("active", async (budget) => {
    let preActive = budget.active || "OFF";
    let nextActive = preActive == "OFF" ? "ON" : "OFF";
    chrome.action.setBadgeText({
      text: nextActive,
    });
    chrome.storage.sync.set({
      active: nextActive,
    });
    // ON 的时候，为当前标签页嵌入一个Js文件
    // if (nextActive === "ON") {
    //   if (!tabMap.has(tab.id)) {
    //     await chrome.scripting.executeScript({
    //       target: {
    //         tabId: tab.id,
    //       },
    //       files: ["js/content-script.js"],
    //     });
    //     tabMap.set(tab.id, true);
    //   }
    // }
    chrome.tabs.sendMessage(tab.id, {
      extension: nextActive,
    });
  });
});

chrome.tabs.onActivated.addListener(async function (details) {
  // if (!tabMap.has(details.tabId)) {
  //   await chrome.scripting.executeScript({
  //     target: {
  //       tabId: details.tabId,
  //     },
  //     files: ["js/content-script.js"],
  //   });
  //   tabMap.set(details.tabId, true);
  // }
  setTimeout(() => {
    chrome.storage.sync.get("active", (budget) => {
      chrome.tabs.sendMessage(details.tabId, {
        extension: budget.active || "OFF",
      });
    });
  }, 1000);
});

chrome.tabs.onUpdated.addListener(async function (tabId, changeInfo, tab) {
  if (changeInfo.status == "complete") {
    await chrome.scripting.executeScript({
      target: {
        tabId: tabId,
      },
      files: ["js/content-script.js"],
    });
    tabMap.set(tabId, true);
    setTimeout(() => {
      chrome.storage.sync.get("active", (budget) => {
        chrome.tabs.sendMessage(tabId, {
          extension: budget.active || "OFF",
        });
      });
    }, 1000);
  }
});
