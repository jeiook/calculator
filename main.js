/*"add calc/widget" feature*/
/*"store in var" feature*/
/*graph feature*/
/*history (of calculations) feature*/

//--------------function definitions--------------
function translate_key(keycode) {//not sure if there is an alternative to this (other than adding a lib)
	var digit;
	var which_button;
	switch(keycode) {
		case 48:
			digit = "0";
			which_button = $(".digit-0");
			break;
		case 49:
			digit = "1";
			which_button = $(".digit-1");
			break;
		case 50:
			digit = "2";
			which_button = $(".digit-2");
			break;
		case 51:
			digit = "3";
			which_button = $(".digit-3");
			break;
		case 52:
			digit = "4";
			which_button = $(".digit-4");
			break;
		case 53:
			digit = "5";
			which_button = $(".digit-5");
			break;
		case 54:
			digit = "6";
			which_button = $(".digit-6");
			break;
		case 55:
			digit = "7";
			which_button = $(".digit-7");
			break;
		case 56:
			digit = "8";
			which_button = $(".digit-8");
			break;
		case 57:
			digit = "9";
			which_button = $(".digit-9");
			break;
	}
	return {"digit": digit, "button": which_button};
}

//--------------variable definitions--------------
var default_calc = "standard";
var current_calc = default_calc;
var number = "0"; //string of the current (typed) number, without commas
var number_array = ["0"]; //string array of number (so with commas)
var cal_string = ""; //string displaying the current calculations being made
var calc_number = 0; // the actual value of calculations made (should take/give values from/to number)


//--------------core functions--------------
function add_comma() {
	if (number === "0") {
		number_array = ["0"];
	} else {
		number_array = [];
		var digits_from_right = 0;
		for (var copy_digit = number.length - 3; copy_digit >= 0; copy_digit-=3) {
			number_array.unshift(number.slice(copy_digit, copy_digit+3));
			digits_from_right += 3;
		}
		if (digits_from_right < number.length) {
			var difference = number.length - digits_from_right;
			number_array.unshift(number.slice(0,difference));
		}
	}
}

function calculate() {
	/*something*/
}

//--------------------main code--------------------
$(document).ready(function() {
	//choose which calculator to display
	$("body").children().css({"display": "none"});

	function refresh_number() {
		add_comma();
		$(".current-number").text(number_array);
	}

	function choose_calc() {
		if (current_calc === "standard") {
			$("#standard").css({"display": "block"});
		}
		number = "0";
		refresh_number();
	}

	choose_calc();//initialize

	//when a key is pressed...
	$("body").keydown(function(e) {
		if ((e.keyCode>=48 && e.keyCode<=57)) {
			//so if key input is a number
			if (e.shiftKey) {//if shift is held
				if (e.keyCode == 56) {// shift + 8 = *
					cal_string += number + " " + "&#215;";

					$(".calculation").html(cal_string);

					number = "";
				}
			}
			else {// if it is a number
				if (number === "0") {
					number = "";
				}
				var key = translate_key(e.keyCode);
				number += key.digit;
				refresh_number();
				key.button.addClass("temp-grey");
			}
		} else {//if it's not a number...
			if (e.keyCode == 8) {//if it's backspace
				if (number.length == 1) {
					number = "0";
				} else {
					number = number.slice(0,number.length-1);
				}
				refresh_number();
			} else if (e.keyCode == 27) {// if it's Esc
				$(".calculation").html(""); //clear the screen
				number = "0";
				cal_string = "";
				refresh_number();
			} else if (e.keyCode == 13) {//if it's enter
				calculate();
			}
		}
		console.log(e.keyCode);
	});

	//remove any style changes after key is up
	$("body").keyup(function() {
		$(".buttons").removeClass("temp-grey");
	});

	//clicking buttons
	$(".digit-1").click(function() {
		if (number === "0") {
			number = "";
		}
		number += "1";
		refresh_number();
	});
	$(".digit-2").click(function() {
		if (number === "0") {
			number = "";
		}
		number += "2";
		refresh_number();
	});
	$(".digit-3").click(function() {
		if (number === "0") {
			number = "";
		}
		number += "3";
		refresh_number();
	});
	$(".digit-4").click(function() {
		if (number === "0") {
			number = "";
		}
		number += "4";
		refresh_number();
	});
	$(".digit-5").click(function() {
		if (number === "0") {
			number = "";
		}
		number += "5";
		refresh_number();
	});
	$(".digit-6").click(function() {
		if (number === "0") {
			number = "";
		}
		number += "6";
		refresh_number();
	});
	$(".digit-7").click(function() {
		if (number === "0") {
			number = "";
		}
		number += "7";
		refresh_number();
	});
	$(".digit-8").click(function() {
		if (number === "0") {
			number = "";
		}
		number += "8";
		refresh_number();
	});
	$(".digit-9").click(function() {
		if (number === "0") {
			number = "";
		}
		number += "9";
		refresh_number();
	});
	$(".digit-0").click(function() {
		if (number === "0") {
			number = "";
		}
		number += "0";
		refresh_number();
	});
	$("#backspace").click(function() {
		if (number.length == 1) {
			number = "0";
		} else {
			number = number.slice(0,number.length-1);
		}
		refresh_number();
	});

});

/*calculate by typing*/
/*calculate by buttons*/