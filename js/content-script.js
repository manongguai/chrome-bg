const getDom = function () {
  return new Promise((res) => {
    chrome.storage.sync.get(
      {
        bgUrl: "https://files.catbox.moe/1uoq0w.png",
        bgOpacity: 40,
      },
      (budget) => {
        let bgUrl = budget.bgUrl || "https://files.catbox.moe/1uoq0w.png";
        let bgOpacity = budget.bgOpacity || 40;
        const dom = `<div 
        style="width:100vw;height:100vh;
        position:fixed;
        z-index:9999;
        left:0;top:0;
        opacity:${bgOpacity / 100};
        user-select: none;
        pointer-events: none;
        ">
        <img src="${bgUrl}" style="width:100vw;height:100vh;object-fit:cover" />
    </div>`;
        let div = document.createElement("div");
        div.setAttribute("id", "kirk-bg");
        div.innerHTML = dom;
        res(div);
      }
    );
  });
};
{
  /* <video style="width:100vw;height:100vh;"  muted="true"  loop autoplay="true" src="https://kirk.wang/usr/uploads/2023/07/848813935.mp4"></video> */
}
/* <img src="https://files.catbox.moe/1uoq0w.png" style="width:100vw;height:100vh;object-fit:cover" /> */

chrome.storage.sync.get("active", async (budget) => {
  let dl = document.querySelectorAll("#kirk-bg");
  if (dl) {
    dl.forEach((d) => {
      document.body.removeChild(d);
    });
  }
  if (budget.active == "ON") {
    let dom = await getDom();
    document.body.appendChild(dom);
  }
});
chrome.runtime.onMessage.addListener(async (message) => {
  console.log(message, 111);
  let dl = document.querySelectorAll("#kirk-bg");
  if (dl) {
    dl.forEach((d) => {
      document.body.removeChild(d);
    });
  }
  if (message.extension == "ON") {
    let dom = await getDom();
    document.body.appendChild(dom);
  }
});
window.addEventListener("load", function () {
  console.log(1111);
  chrome.storage.sync.get("active", async (budget) => {
    let dl = document.querySelectorAll("#kirk-bg");
    if (dl) {
      dl.forEach((d) => {
        document.body.removeChild(d);
      });
    }
    if (budget.active == "ON") {
      let dom = await getDom();
      document.body.appendChild(dom);
    }
  });
});
console.log(22222);
