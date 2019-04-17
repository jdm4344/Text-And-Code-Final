"use strict";

var manual = true;

var handleError = function handleError(message) {
  $("#errorMessage").text(message);
};

var sendAjax = function sendAjax(action, data) {
  $.ajax({
    cache: false,
    type: "POST",
    url: action,
    data: data,
    dataType: "json",
    success: function success(result, status, xhr) {

      window.location = result.redirect;
    },
    error: function error(xhr, status, _error) {
      var messageObj = JSON.parse(xhr.responseText);

      handleError(messageObj.error);
    }
  });
};

// Submits data for the manual form
var manualSubmit = function manualSubmit(e) {
  e.preventDefault();

  if ($("#inputValue").val() == '') {
    handleError("Input is required for submission");
    return false;
  }

  // TODO: validation/conversion  

  sendAjax($("#manualForm").attr("action"), $("#manualForm").serialize());

  return false;
};

// Submits data for the efficient form
var efficientSubmit = function efficientSubmit(e) {
  e.preventDefault();

  if ($("#inputValue").val() == '') {
    handleError("Input is required for submission");
    return false;
  }

  // TODO: validation/conversion

  sendAjax($("#efficientForm").attr("action"), $("#efficientForm").serialize());

  return false;
};

var zeroClick = function zeroClick() {
  console.log("zero clicked");
  var input = $('#inputValue');
  var inputValue = input.val();

  // If length < 8, append
  if (inputValue.length < 8) {
    input.val(inputValue.concat("0"));
  } else {
    // else, reset the value
    input.val("");
  }
};

var oneClick = function oneClick() {
  console.log("one clicked");
  var input = $('#inputValue');
  var inputValue = $('#inputValue').val();

  // If length < 8, append
  if (inputValue.length < 8) {
    input.val(inputValue.concat("1"));
  } else {
    // else, reset the value
    input.val("");
  }
};

$(document).ready(function () {
  // Setup default event handler for the manual submission form
  $("#manualForm").on("submit", manualSubmit);

  // Changes between displaying the manual and the efficient forms on the page
  $("#changeFormButton").click(function () {
    // console.log("change button clicked");
    // console.log(manual);
    if (manual) {
      $('#changeFormButton').val("Do It the Easy Way");
      manual = false;

      $('#input').html("<h1>The Efficient Way:</h1>\n      <form id=\"efficientForm\" name=\"efficientForm\" action=\"/appendValue\" method=\"POST\">\n        <label for=\"inputValue\">Enter 8 Binary Digits: </label>\n        <input id=\"inputValue\" type=\"number\" name=\"inputValue\" value=\"\" size=\"8\">\n        <input class=\"formSubmit\" type=\"submit\" value=\"Send Data\">\n      </form>");

      // Attach event handler for the efficient form
      $("#efficientForm").on("submit", efficientSubmit);

      $("#zeroButton").click(zeroClick);

      $("#oneButton").click(oneClick);
    } else {
      $('#changeFormButton').val("Do It the Hard Way");
      manual = true;

      $('#input').html("<h1>The Intended Way:</h1>\n      <form id=\"manualForm\" name=\"manualForm\" action=\"/appendValue\" method=\"POST\">\n        <input id=\"zeroButton\" type=\"button\" value=\"0\">\n        <input id=\"oneButton\" type=\"button\" value=\"1\">\n        <label for=\"inputValue\">Enter 8 Binary Digits: </label>\n        <input id=\"inputValue\" type=\"number\" name=\"inputValue\" value=\"00000000\" size=\"8\" disabled>\n        <input class=\"formSubmit\" type=\"submit\" value=\"Send Data\">\n      </form>");

      // Attach event handler for the manual form
      $("#manualForm").on("submit", manualSubmit);

      $("#zeroButton").click(zeroClick);

      $("#oneButton").click(oneClick);
    }
  });
});
