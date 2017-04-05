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

$(document).ready(function(){
	$("#fact-submit").click(function(){
        newFactorial();
    });
});