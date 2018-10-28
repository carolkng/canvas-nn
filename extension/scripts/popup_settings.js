document.addEventListener('DOMContentLoaded', function() {
  var input = document.getElementById('blind-option');
  var names = document.getElementById('blinded');
  var button = document.getElementById('blinded_save');

  chrome.storage.sync.get("blind_messenger", function(data){
    input.checked = data["blind_messenger"];
  });

  chrome.storage.sync.get("blind_names", function(data) {
    names.value = data["blind_names"].join("\n");
  });

  input.addEventListener("change", function() {
    chrome.storage.sync.set({"blind_messenger": input.checked});
  }, false);

  button.addEventListener("click", function() {
    var escaped = false;
    var escaped_names = names.value.split("\n").map(function(ob) {
      escaped = true;
      var rob = ob.replace(/[^0-9a-zA-Z.]/gi, '');
      return rob;
    }).filter(function(ob){ return ob.length > 1; });
    chrome.storage.sync.set({"blind_names": escaped_names}, function() {
      if (escaped) {
        names.value = escaped_names.join("\n");
      }
      button.innerHTML = "Saved!";
      button.disabled = true;
      setTimeout(function() {
        button.innerHTML = "Save";
        button.disabled = false;
      }, 1500);
    });
  }, false);

});
