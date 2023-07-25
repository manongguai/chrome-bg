$(function () {
  chrome.storage.sync.get("bgUrl", (budget) => {
    $("#bgUrl").val(budget.bgUrl || "https://files.catbox.moe/1uoq0w.png");
  });

  $("#save").click(() => {
    var bgUrl = $("#bgUrl").val();
    if (bgUrl) {
      chrome.storage.sync.set(
        {
          bgUrl: bgUrl,
        },
        () => {
          close();
        }
      );
    }
  });
  $("#reset").click(() => {
    chrome.storage.sync.set(
      {
        bgUrl: "https://files.catbox.moe/1uoq0w.png",
      },
      () => {
        close();
      }
    );
  });

  $("#cancel").click(() => {
    close();
  });
});
