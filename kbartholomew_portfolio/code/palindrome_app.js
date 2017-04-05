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
$(document).ready(function(){
	$("#palindrome-submit").click(function () {
        palindrome();
    });
});