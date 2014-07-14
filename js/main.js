function doPlayList(listID, playerID) {
    var player = document.getElementById(playerID);
    var video = player.getElementsByTagName("video")[0];
    video.src = null;
    video.setAttribute("data-count", 0);
    video.addEventListener("ended", function (e) {
        e.preventDefault();
        var s = this.getElementsByTagName("source")[0];
        var c = parseInt(this.getAttribute("data-count")) + 1;
        var item = document.getElementById("video" + c);
        if (item === null) {
            item = document.getElementById("video0");
            c = 0;
        }
        s.src = item.getAttribute("data-loc");
        s.type = item.getAttribute("data-type");
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
            var p = document.getElementById("html5videoplayer");
            var v = p.getElementsByTagName("video")[0];
            var s = p.getElementsByTagName("source")[0];
            s.src = this.getAttribute("data-loc");
            s.setAttribute("type", this.getAttribute("data-type"));
            v.setAttribute("data-count", this.id.substr(5));
            v.setAttribute("autoplay", "autoplay");
            v.load();
            v.play();
        });
    }
}
document.onready = doPlayList("playlist", "html5videoplayer");

