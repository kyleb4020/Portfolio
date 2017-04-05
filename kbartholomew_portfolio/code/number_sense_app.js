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

$(document).ready(function(){
	$("#submit").click(function(){
        numSense();
    });
});