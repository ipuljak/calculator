var mainDisplay = '';
var backDisplay = '';
var equal = false;

$(document).ready(function() {

	// Set initial values

	$("#mainDisplay").text("0");
	$("#backDisplay").text("0");

	// On click events

	$(".digit").on("click", function() {
		if (mainDisplay.length < 8) {
			if (isNaN(parseInt(mainDisplay[0]))) {
				mainDisplay = "";
				$("#mainDisplay").text(mainDisplay);
			}
			if (mainDisplay != "0") {
				var curVal = $(this).text();
				mainDisplay += curVal;
				backDisplay += curVal;
				$("#mainDisplay").text(mainDisplay);
				$("#backDisplay").text(backDisplay);
			}
		} else {
			mainDisplay = '';
			backDisplay = '';
			$("#mainDisplay").text('0');
			$("#backDisplay").text("Max digit limit reached");
		}
	});

	$(".function").on("click", function() {
		if (mainDisplay !== "0") {
			mainDisplay = $(this).text();
			if (backDisplay.indexOf("=") === -1) {
				backDisplay += $(this).text();
			} else {
				backDisplay = backDisplay.replace(/^(.)*(\=)/, '');
				backDisplay += $(this).text();
			}

			$("#mainDisplay").text(mainDisplay);
			$("#backDisplay").text(backDisplay);
		}
	});

	$("#decimal").on("click", function() {
		if (mainDisplay.length < 8 && mainDisplay.indexOf(".") === -1) {
			if (!isNaN(parseInt(mainDisplay))) {
				mainDisplay += '.';
				backDisplay += '.';
				$("#mainDisplay").text(mainDisplay);
				$("#backDisplay").text(backDisplay);
			} else {
				mainDisplay = "0.";
				backDisplay += "0.";
				$("#mainDisplay").text(mainDisplay);
				$("#backDisplay").text(backDisplay);
			}
		}
	});

	$("#CE").on("click", function() {
		equals = false;
		var elements = backDisplay.split(/([^0-9])/g);
		mainDisplay = '';
		$("#mainDisplay").text('0');
		if (elements.length > 0) {
			if (!isNaN(parseInt(elements[elements.length-1]))) {
				var newBack = elements.slice(0, elements.length - 1);
			} else {
				var newBack = elements.slice(0, elements.length - 3);
			}
			backDisplay = newBack.join("");
			$("#backDisplay").text(backDisplay);
		} else {
			$("#backDisplay").text("0");
		}
	});

	$("#AC").on("click", function() {
		mainDisplay = '';
		backDisplay = '';
		equals = false;
		$("#mainDisplay").text('0');
		$("#backDisplay").text('0');
	});

	$("#equals").on("click", function() {
		var currentDisplay = $("#backDisplay").text();
		if (currentDisplay.length > 2 && !isNaN(parseInt(currentDisplay.slice(-1)))) {
			var answer = $("#backDisplay").text();
			answer = answer.replace(/\xF7/g, '/').replace(/x/g, '*');
			answer = roundToTwo(eval(answer));
			mainDisplay = answer.toString();
			backDisplay += "=" + answer.toString();
			$("#mainDisplay").text(mainDisplay);
			$("#backDisplay").text(backDisplay);
			equals = true;
		}
	});
});

function roundToTwo(num) {    
    return +(Math.round(num + "e+2")  + "e-2");
}
