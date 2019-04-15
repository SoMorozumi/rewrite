function copyTextToClipboard(textVal){
  var copyFrom = document.createElement("textarea");
  copyFrom.textContent = textVal;
  var bodyElm = document.getElementsByTagName("body")[0];
  bodyElm.appendChild(copyFrom);
  copyFrom.select();
  var retVal = document.execCommand('copy');
  bodyElm.removeChild(copyFrom);
  return retVal;
}

function getParam(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

$('.copy').each(function() {
  $(this).on("click", function(){
    var text = $(this).text();
    copyTextToClipboard(text);
  });
});

var items;
$.getJSON("./files.json", function(data){
  items = data;

  items.forEach(item => {
    $("#player-selecter").append('<option value="'+item["name"]+'">'+item["name"]+'</option>');
  });

  update();
});

$("#player-selecter").change(function() {
  history.pushState(null, null, window.location.pathname+"?name="+$(this).val());
  update();
});

function update() {
  $("#no-player.hide").removeClass("hide");
  $("#player-container").addClass("hide");
  var name = getParam("name");
  items.forEach(item => {
    if (name == item["name"]) {
      $("#no-player").addClass("hide");
      $("#player-container.hide").removeClass("hide");

      $("#player").attr("src", item["url"]);
      $("#new-tab").attr("href", item["url"]);
      $("#single-download").attr("href", item["url"]);
      $("#single-download").attr("download", item["name"]+".mp3");
      $("#single-download-link").text(item["url"]);
      $("#single-download-md5").text(item["md5"]);
    }
  });
}