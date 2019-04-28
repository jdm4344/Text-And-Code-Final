"use strict";

var manual = true;

var handleError = function handleError(message) {
  $("#errorMessage").text(message);
};

var sendAjax = function sendAjax(action, data) {
  // console.log("sendAjax()");
  // console.log(data);
  $.ajax({
    cache: false,
    type: "POST",
    url: action,
    data: data,
    dataType: 'html',
    success: function success(result, status, xhr) {
      console.log("result: " + result);

      if (result.redirect) {
        window.location = result.redirect;
      }

      document.open();
      document.write(result);
      document.close();
    },
    error: function error(xhr, status, _error) {
      console.log(xhr.responseText);
      var messageObj = JSON.parse(xhr.responseText);

      handleError(messageObj.error);
    }
  });
};

// Submits data for the manual form
var manualSubmit = function manualSubmit(e) {
  e.preventDefault();

  var inputValue = $("#inputValue").val();

  // console.log(inputValue);

  var pattern = /(0|1){8}/; // regex pattern

  if (inputValue == '') {
    handleError("Input is required for submission");
    return false;
  } else if (inputValue.length != 8) {
    handleError("At least 8 binary digits (0 or 1) are required for submission");
    return false;
  } else if (pattern.test(inputValue) == false) {
    handleError("Input must consist of 0 or 1 only!");
    return false;
  }

  sendAjax($("#manualForm").attr("action"), $("#manualForm").serialize());

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
  // Setup default event handlers
  $("#manualForm").on("submit", manualSubmit);
  $("#zeroButton").click(zeroClick);
  $("#oneButton").click(oneClick);
});
