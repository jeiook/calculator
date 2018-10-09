var default_calc = "standard";
var current_calc = default_calc;

$(document).ready(function() {
	$("body").children().css({"display": "none"});
	//choose which calculator to display
	function choose_calc() {
		if (current_calc === "standard") {
			$("#standard").css("display", "block");
		}
	}
	choose_calc();
});