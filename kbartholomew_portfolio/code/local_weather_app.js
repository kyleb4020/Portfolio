//Local Weather App

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
            //Auto-select Units based on Country
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
			//This converts the wind direction from degrees into sensible compass points.
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

$(document).ready(function () {
    getWeather();
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
}