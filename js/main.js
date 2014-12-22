function doPlayList(listID, playerID) {
    var player = document.getElementById(playerID);
    var video = player.getElementsByTagName("video")[0];
    var source = video.getElementsByTagName("source")[0];
    video.src = source.src;
    video.setAttribute("data-count", 0);

    video.addEventListener("ended", function(e) {
        e.preventDefault();
        var c = parseInt(this.getAttribute("data-count")) + 1;
        var item = document.getElementById("video" + c);
        if (item === null) {
            item = document.getElementById("video0");
            c = 0;
            video.pause();
            return;
        }
        video.src = item.getAttribute("data-loc");
        this.setAttribute("data-count", c);
        this.setAttribute("autoplay", "autoplay");
        this.load();
        this.play();
    });

    var list = document.getElementById(listID);
    var items = list.getElementsByTagName("li");
    for (var i = 0; i < items.length; i++) {
        var item = items[i];
        item.id = "video" + i;
        item.addEventListener("click", function (e) {
            e.preventDefault();
            video.src = this.getAttribute("data-loc");
            video.setAttribute("data-count", this.id.substr(5));
            video.setAttribute("autoplay", "autoplay");
            video.load();
            video.play();
        });
    }
}

$(document).ready(function () {
   doPlayList("playlist", "html5videoplayer");
   $('#mc-embedded-subscribe').on('click', function() {
      ga('send', 'event', 'button', 'click', 'subscribe', 1);
   });
});
