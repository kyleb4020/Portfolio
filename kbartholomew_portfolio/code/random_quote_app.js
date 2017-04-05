//Random Quotes App
//Random Color Array
var colorsQuote = ["violet", "lightgreen", "lightblue", "grey", "coral", "indigo", "mediumaquamarine", "seagreen", "springgreen", "steelblue", "goldenrod"];

//Get a New Quote Function
function newQuote() {
    //This gets the new random quote
    $.ajax({
        url: "http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1",
        //If the URL is successful, then it executes the function with json being the object retrieved from the URL.
        success: function (json) {
            //Select random color
            var randomColor = colorsQuote[Math.floor(Math.random() * colorsQuote.length)];
            //Set quote
            var quote = "<p id='quote'>" + json[0].content.replace("<p>", "");
            twitterQuote = json[0].content.replace(/<p>|<\/p>|\n/g, "");
            //Set author
            var author = "<p id='author'>~" + json[0].title + "</p>";
            twitterAuthor = json[0].title;
            //Put new quote and author in div
            $("#div1").prepend(quote, author);
            //Change colors with new quote
            $("#random-quote").css("background-color", randomColor);
            $("#activation").css("background-color", randomColor);
            $("#div1").css("color", randomColor);
            $("#twitter").css("background-color", randomColor);
        },
        //In case the apex doesn't work
        error: function () {
            $("#div1").empty();
            $("#div1").append("There was an error");
        },
        //I read on a reddit post that this will allow a new quote to be generated.
        cache: false
    });
};

$(document).ready(function () {
    newQuote();
    $("#activation, #twitter").hover(function () { $(this).css("opacity", 0.7); }, function () { $(this).css("opacity", 1); });
    $('#activation').on('click', function () {
        $("#quote, #author").remove();
        newQuote();
    });
	$('#twitter').on('click', function () {
        window.open('https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text= "' + encodeURIComponent(twitterQuote + '" ~' + twitterAuthor))
    });
}