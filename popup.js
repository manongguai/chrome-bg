$(function () {
  var limit = 2000;
  chrome.storage.sync.get("total", (budget) => {
    $("#total").text(budget.total || 0);
  });
  chrome.storage.sync.get("limit", (budget) => {
    $("#limit").text(budget.limit || 2000);
    limit = budget.limit || 2000;
  });
  $("#add").click(function () {
    // 1.从浏览器获取存储的金额
    chrome.storage.sync.get("total", (budget) => {
      var totalAmount = 0;
      if (budget.total) {
        totalAmount = parseFloat(budget.total);
      }
      // 2.存储本地金额
      var amount = $("#amount").val();
      if (amount) {
        totalAmount += parseFloat(amount);
        if (totalAmount > limit) {
          return alert("超出了预算");
        }
        chrome.storage.sync.set({
          total: totalAmount,
        });
      }
      // 3.更新显示
      $("#total").text(totalAmount);
      $("#amount").val("");
    });
  });
});
