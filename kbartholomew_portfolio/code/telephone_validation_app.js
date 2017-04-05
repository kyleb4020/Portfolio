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

$(document).ready(function(){
	$("#telephone-submit").click(function () {
        telephoneCheck($("#telephone-input").val());
    });
});