// Instantiate the values for the main and back display screens
var mainDisplay = '';
var backDisplay = '';

$(document).ready(function () {
  // Set initial values for the display to be 0
  $("#mainDisplay").text("0");
  $("#backDisplay").text("0");

  // On click events for the digit buttons
  $(".digit").on("click", function () {
    // Check that the value can fit in the screen
    if (mainDisplay.length < 8) {
      // If the leading value in the display is not a number, then clear it
      if (isNaN(parseInt(mainDisplay[0]))) {
        mainDisplay = "";
        $("#mainDisplay").text(mainDisplay);
      }
      // If the display is not just a 0, then add in the number to the screens
      if (mainDisplay != "0") {
        var curVal = $(this).text();
        mainDisplay += curVal;
        backDisplay += curVal;
        $("#mainDisplay").text(mainDisplay);
        $("#backDisplay").text(backDisplay);
      }
    } else {
      // Clear the displays and throw a warning saying the limit was reached
      mainDisplay = '';
      backDisplay = '';
      $("#mainDisplay").text('0');
      $("#backDisplay").text("Max digit limit reached");
    }
  });

  // Click events for the function buttons (add, divide, etc)
  $(".function").on("click", function () {
    // Check that the value is not a 0
    if (mainDisplay !== "0") {
      mainDisplay = $(this).text();
      // Check that the expression was not just evaluated
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

  // Click event for the decimal button
  $("#decimal").on("click", function () {
    // Add a decimal to the screen if it fits and already doesn't exist
    if (mainDisplay.length < 8 && mainDisplay.indexOf(".") === -1) {
      // Check to see if the display is a number
      if (!isNaN(parseInt(mainDisplay))) {
        mainDisplay += '.';
        backDisplay += '.';
        $("#mainDisplay").text(mainDisplay);
        $("#backDisplay").text(backDisplay);
      } else {
        // Otherwise add a leading 0 with the decimal
        mainDisplay = "0.";
        backDisplay += "0.";
        $("#mainDisplay").text(mainDisplay);
        $("#backDisplay").text(backDisplay);
      }
    }
  });

  // Click event for the CE button (clears only the last entry)
  $("#CE").on("click", function () {
    // Clear the main display (reset to 0)
    mainDisplay = '';
    $("#mainDisplay").text('0');
    // Separate the elements of the back dislpay
    var elements = backDisplay.split(/([^0-9])/g);
    // If elements exist, delete the last one
    if (elements.length > 0) {
      if (!isNaN(parseInt(elements[elements.length - 1]))) {
        var newBack = elements.slice(0, elements.length - 1);
      } else {
        var newBack = elements.slice(0, elements.length - 3);
      }
      backDisplay = newBack.join("");
      $("#backDisplay").text(backDisplay);
    } else {
      // Otherwise clear the back display (reset to 0)
      $("#backDisplay").text("0");
    }
  });

  // Click event for the AC button (clear everything)
  $("#AC").on("click", function () {
    // Clear all of the displays (reset them to 0)
    mainDisplay = '';
    backDisplay = '';
    $("#mainDisplay").text('0');
    $("#backDisplay").text('0');
  });

  // Click event for the equals button
  $("#equals").on("click", function () {
    var currentDisplay = $("#backDisplay").text();
    // Make sure there is a valid number in the input
    if (currentDisplay.length > 2 && !isNaN(parseInt(currentDisplay.slice(-1)))) {
      var answer = $("#backDisplay").text();
      // Replace the division and multiplication symbols with a readable string
      answer = answer.replace(/\xF7/g, '/').replace(/x/g, '*');
      // Evaluate the expression and display the results
      answer = roundToTwo(eval(answer));
      mainDisplay = answer.toString();
      backDisplay += "=" + answer.toString();
      $("#mainDisplay").text(mainDisplay);
      $("#backDisplay").text(backDisplay);
    }
  });
});

// Return a number rounded to the nearest two decimal points
function roundToTwo(num) {
  return +(Math.round(num + "e+2") + "e-2");
}
