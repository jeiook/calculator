/*"add calc/widget" feature*/
/*"store in var" feature*/
/*graph feature*/
/*history (of calculations) feature*/

//--------------function definitions--------------
function translate_key(keycode) {
	var digit;
	var which_button;
	switch(keycode) {
		case 48:
		case 96:
			digit = "0";
			which_button = $(".digit-0");
			break;
		case 49:
		case 97:
			digit = "1";
			which_button = $(".digit-1");
			break;
		case 50:
		case 98:
			digit = "2";
			which_button = $(".digit-2");
			break;
		case 51:
		case 99:
			digit = "3";
			which_button = $(".digit-3");
			break;
		case 52:
		case 100:
			digit = "4";
			which_button = $(".digit-4");
			break;
		case 53:
		case 101:
			digit = "5";
			which_button = $(".digit-5");
			break;
		case 54:
		case 102:
			digit = "6";
			which_button = $(".digit-6");
			break;
		case 55:
		case 103:
			digit = "7";
			which_button = $(".digit-7");
			break;
		case 56:
		case 104:
			digit = "8";
			which_button = $(".digit-8");
			break;
		case 57:
		case 105:
			digit = "9";
			which_button = $(".digit-9");
			break;
	}
	return {"digit": digit, "button": which_button};
}

//--------------variable definitions--------------
var default_calc = "standard";
var current_calc = default_calc;
var digit_list = ["0"];
function number() {
	var temp_number;
	digit_list.forEach(function(index, value) {
		temp_number += value;
	});
	return temp_number;
} 

//--------------------main code--------------------
$(document).ready(function() {
	$("body").children().css({"display": "none"});
	//choose which calculator to display
	function choose_calc() {
		if (current_calc === "standard") {
			$("#standard").css({"display": "block"});
		}
	}
	choose_calc();
	$("body").keypress(function(e) {
		if ((e.keyCode >= 48 && e.keyCode <= 57)||(e.keyCode >= 96 && e.keyCode <= 105)) {
			//so if it's a number...
			var key = translate_key(e.keyCode);
			digit_list.push(key.digit);//push adds to beginning or nah
			//need static var
			$(".result").innerHTML += number();
			key.button.addClass("temp-grey");
		} else if (e.keyCode) {//if it's not a number...
			/*something*/
		}
	});
	$("body").keyup(function() {
		$(".digits").removeClass("temp-grey");
	});
});


/*
how do you delete digits from the number
*/

/*
get keybord input
feed number into an array
display the array (still with append(?))
*/

/*
There are three possible cases that lead to a zero:
-the very beginning (checked)
-backspaced to the end
-escaped (ESC)
*/

/*calculate by typing*/
/*calculate by buttons*/