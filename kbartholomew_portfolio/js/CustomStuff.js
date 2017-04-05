//For Weather App Modle

//Random Color Array
var colorsWeather = ["violet", "darkcyan", "cornflowerblue", "grey", "coral", "indigo", "mediumaquamarine", "seagreen", "steelblue", "goldenrod", "navy"];

function getWeather() {
    var randomColor = colorsWeather[Math.floor(Math.random() * colorsWeather.length)];
    $("#weather-app").css("background-color", randomColor);
    $("#metric").css("color", randomColor);
    $("#imperial").css("color", randomColor);
    //This gets the info about the ip address
    $.getJSON("http://ip-api.com/json", function (json) {
        var lat = json.lat;
        var lon = json.lon;
        var city = json.city;
        var state = json.region;
        //    $("#data").html("latitude: " + lat + "<br>longitude: " + lon + "<br>City: " + city + "<br>State: " + state);
        //This sets up the API for the weather website.
        var api = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&units=metric&APPID=36d7f8efb104e8c3fb26c18d337c1055";
        //This calls the API from the weather website.
        $.getJSON(api, function (json) {
            //  $("#weather").html(JSON.stringify(json));
            //Auto-select Units
            var country = json.sys.country;
            if (country == "US") {
                $("#temp").css("display", "none");
                $("#tempF").css("display", "block");
                $("#wind").css("display", "none");
                $("#windF").css("display", "block");
            };
            var iconNum = json.weather[0].icon;
            var mainForcast = json.weather[0].main;
            var forcast = json.weather[0].description;
            var temp = Math.round(json.main.temp);
            var tempF = Math.round((temp * (9 / 5)) + 32);
            var windSpeed = json.wind.speed;
            var windSpeedF = Math.round((windSpeed * 2.23694) * 100) / 100;
            var cloudy = json.clouds.all;
            var windDir = json.wind.deg;
            if (windDir >= 337.50 && windDir <= 360) {
                windDir = "N";
            } else if (windDir >= 0 && windDir < 22.50) {
                windDir = "N";
            } else if (windDir >= 22.50 && windDir < 67.50) {
                windDir = "NE";
            } else if (windDir >= 67.50 && windDir < 112.50) {
                windDir = "E";
            } else if (windDir >= 112.50 && windDir < 157.50) {
                windDir = "SE";
            } else if (windDir >= 157.50 && windDir < 202.50) {
                windDir = "S";
            } else if (windDir >= 202.50 && windDir < 247.50) {
                windDir = "SW";
            } else if (windDir >= 247.50 && windDir < 292.50) {
                windDir = "W";
            } else if (windDir >= 292.50 && windDir < 337.50) {
                windDir = "NW";
            };
            var humid = json.main.humidity;
            //      $("#weather").prepend(temp + "&deg C <br>" + tempF + "&deg F <br>" + windSpeed + " M/s <br>" + windSpeedF + " Mil/hr " + windDir + " <br>" + cloudy + "% Cloudy <br>" + humid +"% humidity<br>");
            $("#local").html(city + ", " + state + ", " + country);
            $("#forcast").html(mainForcast);
            $("#icon").attr("src", "http://openweathermap.org/img/w/" + iconNum + ".png");
            $("#forcast-detail").html(forcast);
            $("#temp").html(temp + "&deg C");
            $("#tempF").html(tempF + "&deg F");
            $("#humid").html(humid + "% humidity");
            $("#wind").html(windSpeed + " m/s " + windDir);
            $("#windF").html(windSpeedF + " mph " + windDir);
            $("#cloudy").html(cloudy + "% Cloudy");
        });
    }
  )
};

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

//Twitch App
/*function getAPIs() {
    var channels = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "BeyondTheSummit", "LPL1", "Faker", "brunofin", "comster404"]
    var varAPI = ["users", "channels", "streams"];
    var channelsAPI = new Array();
    for (l = 0; l < channels.length; l++) {
        channelsAPI.push(new Array());
    };
    var i = 0;
    var j = 0;
    //This populates my array of objects
    $.getJSON('https://wind-bow.gomix.me/twitch-api/' + varAPI[j] + '/' + channels[i] + '?callback=?', function (result) {
        channelsAPI[i].push(result);
        j++
        if (j === (varAPI.length)) {
            j = 0;
            if (channelsAPI[i][0]["error"] == "Unprocessable Entity") {
                $("#api").append("<div class='row'><div class='col-md-3'></div><div class='col-md-2' id='grid'>" + channels[i] + "</div><div class='col-md-4' id='fail'>UNAVAILABLE</div><div class='col-md-3'></div></div>");
            } else if (channelsAPI[i][0]["bio"] != null && channelsAPI[i][2]["stream"] != null) {
                $("#api").append("<div class='row'><div class='col-md-3'></div><div class='col-md-2' id='grid'><a href='" + channelsAPI[i][1]["url"] + "'>" + channelsAPI[i][1]["display_name"] + "</a><br>" + "<img id='logo' src='" + channelsAPI[i][1]["logo"] + "'/></div><div class='col-md-4' id='" + channelsAPI[i][0]["name"] + "'>" + channelsAPI[i][0]["bio"].slice(0, 60) + "... <br>" + "<b><u>LIVE NOW:</b></u> " + channelsAPI[i][2]["stream"]["channel"]["status"] + "</div><div class='col-md-3'></div></div>");
                $("#" + channelsAPI[i][0]["name"]).css("background-color", "#4d5d64");
                //$("#" + channelsAPI[i][0]["name"]).css("border-radius", "15px");
                $("#" + channelsAPI[i][0]["name"]).css("margin", "2px 0px 0px 0px");
                $("#" + channelsAPI[i][0]["name"]).css("padding", "30px 10px");
            } else if (channelsAPI[i][0]["bio"] == null && channelsAPI[i][2]["stream"] != null) {
                $("#api").append("<div class='row'><div class='col-md-3'></div><div class='col-md-2' id='grid'><a href='" + channelsAPI[i][1]["url"] + "'>" + channelsAPI[i][1]["display_name"] + "</a><br>" + "<img id='logo' src='" + channelsAPI[i][1]["logo"] + "'/></div><div class='col-md-4' id='" + channelsAPI[i][0]["name"] + "'><b><u>LIVE NOW:</b></u> " + channelsAPI[i][2]["stream"]["channel"]["status"] + "</div><div class='col-md-3'></div></div>");
                $("#" + channelsAPI[i][0]["name"]).css("background-color", "#4d5d64");
                //$("#" + channelsAPI[i][0]["name"]).css("border-radius", "15px");
                $("#" + channelsAPI[i][0]["name"]).css("margin", "2px 0px 0px 0px");
                $("#" + channelsAPI[i][0]["name"]).css("padding", "40px 10px");
            } else if (channelsAPI[i][0]["bio"] != null && channelsAPI[i][2]["stream"] == null) {
                $("#api").append("<div class='row'><div class='col-md-3'></div><div class='col-md-2' id='grid'><a href='" + channelsAPI[i][1]["url"] + "'>" + channelsAPI[i][1]["display_name"] + "</a><br>" + "<img id='logo' src='" + channelsAPI[i][1]["logo"] + "'/></div><div class='col-md-4' id='grid1'>" + channelsAPI[i][0]["bio"].slice(0, 60) + "...</div><div class='col-md-3'></div></div>");
            } else {
                $("#api").append("<div class='row'><div class='col-md-3'></div><div class='col-md-2' id='grid'><a href='" + channelsAPI[i][1]["url"] + "'>" + channelsAPI[i][1]["display_name"] + "</a><br>" + "<img id='logo' src='" + channelsAPI[i][1]["logo"] + "'/></div><div class='col-md-4' id='grid1'>Offline<br></div><div class='col-md-3'></div></div>");
            }
            i++
        };
        if (i < channelsAPI.length) {
            getAPIs();
        }
    });
}*/


//Number Sense App
function numSense(){
    $("#numLeast").empty();
    $("#numGreatest").empty();
    $("#numSum").empty();
    $("#numMean").empty();
    $("#numProduct").empty();
    $("#results-head").css("display","block");
    var numbersArray = [];
    for(i=1;i<=5;i++){
        numbersArray.push($("#num"+i).val());
    };
    //Test for commas
    var testNums=numbersArray;
    for(i=0;i<numbersArray.length;i++){
        testNums[i]=testNums[i].toString();
        if(/,/g.test(testNums[i])){
            numbersArray[i]="COMMA";
        }
        if(/\.{2,}/g.test(testNums[i]) || /\d*\.\d{1,}\./g.test(testNums[i])){
            numbersArray[i]="PERIOD"
        }
        if(/^\./.test(testNums[i])){
            numbersArray[i]="0"+numbersArray[i];
        }
        if(/\s{1,}/.test(testNums[i])){
            testNums[i]= testNums[i].replace(/\s/g,'');
            numbersArray[i]=testNums[i];
            $("#results-head").html("<u>Results*</u>");
            $("#results-footer").css("display","block");
            $("#results-footer").html("*You included spaces in one or more of your inputs. These were removed and the numbers were concatenated. If you didn't want this to happen, please re-enter your numbers.");
        }
    };
    //Make sure it's all numbers
    var numString = numbersArray.toString();
    if(/[a-zA-Z]/.test(numbersArray)){
        $("#results-footer").css("display","block");
        $("#results-footer").html("<p>You must be trying to break me because you didn't enter a number in one or more of the inputs.</p><p>If you think you are seeing this message by mistake, double-check your numbers for letters or commas.</p>");
    } else {
        for(i=0;i<numbersArray.length;i++){
            numbersArray[i]=parseFloat(numbersArray[i]);
        };
        //sort inputted numbers
        numbersArray.sort(function(a, b){return a - b});
        //a. Determine which number is the least
        var least = numbersArray[0];
        $("#numLeast").append("<p>The least number is: " + least);
        //b. Determine which number is the greatest
        var greatest = numbersArray[4];
        $("#numGreatest").append("<p>The greatest number is: " + greatest);
        //d. Determine the sum of all the numbers
        var sum = 0;
        for(i=0;i<numbersArray.length;i++){
            sum += parseFloat(numbersArray[i]);
        }
        $("#numSum").append("<p>The sum of the numbers is: " + sum);
        //c. Determine the mean of the numbers
        var average = sum/numbersArray.length;
        $("#numMean").append("<p>The mean of the numbers is: " + average);
        //e. Determine the product of all the numbers
        var product = 1;
        for(i=0;i<numbersArray.length;i++){
            product *= parseFloat(numbersArray[i]);
            if(product>1000000000000000000000000000000000000000000000000 && i<4){
                $("#numProduct").html("<p>The product of the numbers is too big for my memory to calculate! However, for "+numbersArray[0]+" through "+numbersArray[i-1]+": ");
                break;
            }
        }
        var adjProduct = (Math.floor(product*1000))/1000
        $("#numProduct").append("<p>The product is: " + adjProduct);
    }
};

//Factorial App
function newFactorial() {
    var newNum = $("#factorial-num").val();
    if (/\./.test(newNum)) {
        $("#fact-result").html("Error: Make sure you enter an integer (no decimals)");
    }
    else if (newNum > 170) {
        $("#fact-result").html("Whoa there! That number got way too big too fast! Pick a smaller number and try again.");
    }
    else {
        var fact = 1;
        for (i = newNum; i > 0; i--) {
            fact *= i;
        }
        $("#fact-result").html("Result: " + fact);
    }
};

//FizzBuzz App
function fizzBuzz() {
    var fizz = $("#fizzbuzz-num1").val();
    var buzz = $("#fizzbuzz-num2").val();
    if (!(/\./.test(fizz)) && !(/\./.test(buzz))) {
        var counting = [];
        for (i = 1; i <= 100; i++) {
            if (i % fizz == 0 && i % buzz == 0) {
                counting.push("FizzBuzz");
            }
            else if (i % fizz == 0 && i % buzz != 0) {
                counting.push("Fizz");
            }
            else if (i % fizz != 0 && i % buzz == 0) {
                counting.push("Buzz");
            }
            else {
                counting.push(i);
            }
        }
        var countStr = counting.toString();
        countStr = countStr.replace(/,/g, ", ");
        $("#fizzbuzz-result").html("<p>" + countStr + "</p>");
    }
    else {
        $("#fizzbuzz-result").html("<p>Error: Please use only integers.</p>");
    }
};

//Palindrome App
function palindrome() {
    var pal = $("#palindrome-text").val();
    pal = pal.toLowerCase();
    pal = pal.replace(/\s/, "");
    if (pal == pal.split("").reverse().join("")) {
        $("#palindrome-result").html("Yes! That is a palindrome!");
    }
    else {
        $("#palindrome-result").html("Nope, that is not a palindrome.");
    }
};

//Telephone Validation App
function response(val) {
    if (val === true) {
        $("#telephone-result").html("That is a valid US telephone number");
    } else {
        $("#telephone-result").html("That is <u>NOT</u> a valid US telephone number. Please try again.");
    }
}

function telephoneCheck(str) {
    for (i = 0; i < str.length; i++) {
        str = str.replace(/\s/, '');
    }
    var seq = str.replace(/[^0-9()-]/, '**************');

    for (i = 0; i < seq.length; i++) {
        seq = seq.replace(/\d/, '#');
    }

    if (seq.length > 14) {
        response(false);
    }

    else if (seq.length === 14) {
        if (str[0] === '1') {
            if (seq[1] === '(' && seq[5] === ')' && seq[9] === '-') {
                if (seq[2] === '#' && seq[3] === '#' && seq[4] === '#' && seq[6] === '#' && seq[7] === '#' && seq[8] === '#' && seq[10] === '#' && seq[11] === '#' && seq[12] === '#' && seq[13] === '#') {
                    response(true);
                } else {
                    response(false);
                }
            } else {
                response(false);
            }
        } else {
            response(false);
        }
    }

    else if (seq.length === 13) {
        if (str[0] === '1') {
            if (seq[4] === '-' && seq[8] === '-') {
                if (seq[1] === '#' && seq[2] === '#' && seq[3] === '#' && seq[5] === '#' && seq[6] === '#' && seq[7] === '#' && seq[9] === '#' && seq[10] === '#' && seq[11] === '#' && seq[12] === '#') {
                    response(true);
                } else {
                    response(false);
                }
            } else if (seq[1] === '(' && seq[5] === ')') {
                if (seq[2] === '#' && seq[3] === '#' && seq[4] === '#' && seq[6] === '#' && seq[7] === '#' && seq[8] === '#' && seq[9] === '#' && seq[10] === '#' && seq[11] === '#' && seq[12] === '#') {
                    response(true);
                } else {
                    response(false);
                }
            } else {
                response(false);
            }
        }
        else if (seq[0] === '(' && seq[4] === ')' && seq[8] === '-') {
            if (seq[1] === '#' && seq[2] === '#' && seq[3] === '#' && seq[5] === '#' && seq[6] === '#' && seq[7] === '#' && seq[9] === '#' && seq[10] === '#' && seq[11] === '#' && seq[12] === '#') {
                response(true);
            } else {
                response(false);
            }
        } else {
            response(false);
        }
    }

    else if (seq.length === 12) {
        if (seq[3] === '-' && seq[7] === '-') {
            if (seq[0] === '#' && seq[1] === '#' && seq[2] === '#' && seq[4] === '#' && seq[5] === '#' && seq[6] === '#' && seq[8] === '#' && seq[9] === '#' && seq[10] === '#' && seq[11] === '#') {
                response(true);
            } else {
                response(false);
            }
        }
        else if (seq[0] === '(' && seq[4] === ')') {
            if (seq[1] === '#' && seq[2] === '#' && seq[3] === '#' && seq[5] === '#' && seq[6] === '#' && seq[7] === '#' && seq[8] === '#' && seq[9] === '#' && seq[10] === '#' && seq[11] === '#') {
                response(true);
            } else {
                response(false);
            }
        } else {
            response(false);
        }
    }

    else if (seq.length === 11) {
        if (str[0] === '1') {
            if (seq[0] === '#' && seq[1] === '#' && seq[2] === '#' && seq[3] === '#' && seq[4] === '#' && seq[5] === '#' && seq[6] === '#' && seq[7] === '#' && seq[8] === '#' && seq[9] === '#' && seq[10] === '#') {
                response(true);
            } else {
                response(false);
            }
        } else if (seq[0] === '#' && seq[1] === '#' && seq[2] === '#' && seq[3] === '#' && seq[4] === '#' && seq[5] === '#' && seq[6] === '-' && seq[7] === '#' && seq[8] === '#' && seq[9] === '#' && seq[10] === '#') {
            response(true);
        } else {
            response(false);
        }
    }

    else if (seq.length === 10 && seq[0] === '#' && seq[1] === '#' && seq[2] === '#' && seq[3] === '#' && seq[4] === '#' && seq[5] === '#' && seq[6] === '#' && seq[7] === '#' && seq[8] === '#' && seq[9] === '#') {
        response(true);
    } else {
        response(false);
    }

}


$(document).ready(function () {
    getWeather();
    newQuote();
    $("#img-kyle").addClass("img-base");
    $("#img-kyle").removeClass("img-start");

    var w = window, d = document, e = d.documentElement, g = d.getElementsByTagName('body')[0], x = w.innerWidth || e.clientWidth || g.clientWidth, y = w.innerHeight || e.clientHeight || g.clientHeight;
    if(x < 800){
        $("#img-kyle-tiny").css("display", "none");
        $(".nav-title").css("left", "0px");
    }

    $(".resume-button").click(function(){
        $("#resume-display").html('<button type="button" class="btn btn-default"><a href="/pdf/Kyle Bartholomew.pdf" target="_blank" id="resume-button"><i class="fa fa-download"></i> Download PDF</a></button><object data="/pdf/Kyle Bartholomew.pdf" type="application/pdf" width="100%" height="800" id="resume-object"><iframe src="/pdf/Kyle Bartholomew.pdf" style="border: none;">This browser does not support PDFs. Please download the PDF to view it: <a href="/pdf/Kyle Bartholomew.pdf">Download PDF</a></iframe></object><button type="button" class="btn btn-default" data-dismiss="modal"><i class="fa fa-times"></i> Close</button>')
    });

    $(window).scroll(function () {
        if ($(document).scrollTop() > 100) {
            $("#img-kyle-tiny").addClass("img-grow")
        }
        else {
            $("#img-kyle-tiny").removeClass("img-grow")
        }
    }); 
    $("#imperial").click(function () {
        $("#temp").css("display", "none");
        $("#tempF").css("display", "block");
        $("#wind").css("display", "none");
        $("#windF").css("display", "block");
    });
    $("#metric").click(function () {
        $("#temp").css("display", "block");
        $("#tempF").css("display", "none");
        $("#wind").css("display", "block");
        $("#windF").css("display", "none");
    });
    $("#weather-code-button").click(function () {
        $("#weather-code").animate({
            height: "toggle"
        });
    });


    $("#activation, #twitter").hover(function () {
        $(this).css("opacity", 0.7);
    }, function () {
        $(this).css("opacity", 1);
    });
    $('#activation').on('click', function () {
        $("#quote, #author").remove();
        newQuote();
    });
    $('#twitter').on('click', function () {
        window.open('https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text= "' + encodeURIComponent(twitterQuote + '" ~' + twitterAuthor))
    });
    $("#rq-code-button").click(function () {
        $("#rq-code").animate({
            height: "toggle"
        });
    });

    $("#srch-btn").click(function () {
        getSearch();
    });
    $("#new-btn").click(function () {
        $("#data").empty();
        $("#return-wiki").css("display", "none");
        $("#search").css("display", "block");
    });
    $("#wiki-code-button").click(function () {
        $("#wiki-code").animate({
            height: "toggle"
        });
    });

    /*$("#twitch-button").click(function () {
        getAPIs();
        $("#weather-app").css("display", "none");
        $("#random-quote").css("display", "none");
        $("#wiki-app").css("display", "none");
        $("#twitch-app").css("display", "block");
        $("#num-sense-app").css("display", "none");
        //$("#weather-app").css("display", "block");
        //$("#weather-app").css("display", "block");
        //$("#weather-app").css("display", "block");    
    });*/
    
    $("#submit").click(function(){
        numSense();
    });
    $("#numinfo-code-button").click(function () {
        $("#number-code").animate({
            height: "toggle"
        });
    });
    
    
    $("#fact-submit").click(function(){
        newFactorial();
    });
    $("#fact-code-button").click(function () {
        $("#fact-code").animate({
            height: "toggle"
        });
    });

    
    $("#fizzbuzz-submit").click(function () {
        fizzBuzz()
    });
    $("#fizz-code-button").click(function () {
        $("#fizz-code").animate({
            height: "toggle"
        });
    });

    
    $("#palindrome-submit").click(function () {
        palindrome();
    });
    $("#palindrome-code-button").click(function () {
        $("#palindrome-code").animate({
            height: "toggle"
        });
    });

    
    $("#telephone-submit").click(function () {
        telephoneCheck($("#telephone-input").val());
    });
    $("#telephone-code-button").click(function () {
        $("#telephone-code").animate({
        height: "toggle"
        });
    });
});