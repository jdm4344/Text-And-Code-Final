"use strict";

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

$(document).ready(function () {
    // Submits data for the manual form
    $("#manualForm").on("submit", function (e) {
        e.preventDefault();

        if ($("#inputValue").val() == '') {
            handleError("Input is required for submission");
            return false;
        }

        sendAjax($("#manualForm").attr("action"), $("#manualForm").serialize());

        return false;
    });

    // Submits data for the efficient form
    $("#efficientForm").on("submit", function (e) {
        e.preventDefault();

        if ($("#inputValue").val() == '') {
            handleError("Input is required for submission");
            return false;
        }

        sendAjax($("#efficientForm").attr("action"), $("#efficientForm").serialize());

        return false;
    });

    // Changes between displaying the manual and the efficient forms on the page
    $("#changeFormButton").on('click', function (e) {
        $('#changeFormButton').text = "Do It the Hard Way";
        $('#changeFormButton').text = "Do It the Easy Way";
    });

    $("#zeroButton").on('click', function (e) {});

    $("#oneButton").on('click', function (e) {});
});
