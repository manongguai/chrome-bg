$(function () {
  chrome.storage.sync.get("bgUrl", (budget) => {
    $("#bgUrl").val(budget.bgUrl || "https://files.catbox.moe/1uoq0w.png");
  });
  chrome.storage.sync.get("bgOpacity", (budget) => {
    $("#bgOpacity").val(budget.bgOpacity || 40);
    $("#opacityValue").text(budget.bgOpacity || 40);
  });

  $("#bgOpacity").change((e) => {
    $("#opacityValue").text(e.target.value);
  });
  $("#save").click(() => {
    var bgUrl = $("#bgUrl").val();
    var bgOpacity = $("#bgOpacity").val();
    if (bgUrl) {
      chrome.storage.sync.set(
        {
          bgUrl: bgUrl,
          bgOpacity: Number(bgOpacity),
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
        bgOpacity: 40,
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
