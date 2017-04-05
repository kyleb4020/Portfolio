//Wikipedia Search Function
function getSearch() {
    var user = $("#srch").val();
    if (user != "") {
        $("#search").css("display", "none");
        $("#return-wiki").css("display", "block");
        var api = "https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=" + user + "&srprop=snippet&srlimit=20&format=json&callback=?";
        // $.getJSON(api, function(json) {
        // Using jQuery
        $.ajax({
            type: "GET",
            url: api,
            contentType: "application/json; charset=utf-8",
            async: false,
            dataType: "json",
            success: function (json) {
                //    $("#data").html(JSON.stringify(json));
                for (var i = 0; i < json.query.search.length; i++) {
                    $("#data").append("<a href='https://en.wikipedia.org/wiki/" + json.query.search[i].title + "'><div id='result'><div id='title-wiki'>" + json.query.search[i].title + "</div><div id='snippet'" + json.query.search[i].snippet + "</div></div></a><br>");
                };
                //$("#data").html(results);
            },
            error: function () {
                $("#data").html("it's not working");
            }
        });
    } else {
        window.open("https://en.wikipedia.org/wiki/Special:Random");
    }
};

$(document).ready(function(){
	$("#srch-btn").click(function () {
        getSearch();
    });
    $("#new-btn").click(function () {
        $("#data").empty();
        $("#return-wiki").css("display", "none");
        $("#search").css("display", "block");
    });
});