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
$(document).ready(function(){
	$("#fizzbuzz-submit").click(function () {
		fizzBuzz();
	});
});