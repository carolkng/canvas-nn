function startBlock() {
  "use strict";
  chrome.storage.sync.get("blind_messenger", function(data) {
    if (data["blind_messenger"]) {
      chrome.storage.sync.get("blind_names", function(data) {
        var list = document.getElementsByClassName("_4sp8")[0].getElementsByClassName("_2il3");
        data = data["blind_names"].map(function(ob) { return ob.toLowerCase(); });
        var chatList = document.querySelector("._3rh8 + div");

        var obr = new MutationObserver(function(mutation) {
            var i;
            var j;
            var data_href;
            for (i=0; i < data.length; i++) {
              for (j=0; j < list.length; j++) {
                data_href = list[j].getAttribute("data-href").toLowerCase();
                if (data_href === "https://www.messenger.com/t/" + data[i] ||
                    data_href === "http://www.messenger.com/t/" + data[i]) {
                  list[j].parentElement.parentElement.remove();
                  break;
                }
              }
          }
        });

        var config = { attributes: true, childList: true };
        obr.observe(chatList, config);
      });
    }
  });
}

function tryMe() {
  if (document.getElementsByClassName("_4sp8").length < 1) {
    window.requestAnimationFrame(tryMe);
  } else {
    startBlock();
  }
}
tryMe();
