let manual = true;

const handleError = (message) => {
    $("#errorMessage").text(message);
};
  
const sendAjax = (action, data) => {
  // console.log("sendAjax()");
  // console.log(data);
  $.ajax({
    cache: false,
    type: "POST",
    url: action,
    data: data,
    dataType: 'html',
    success: (result, status, xhr) => {
      console.log("result: " + result);

      if(result.redirect) {
        window.location = result.redirect;
      }

      document.open();
      document.write(result);
      document.close();
    },
    error: (xhr, status, error) => {
      console.log(xhr.responseText);
      const messageObj = JSON.parse(xhr.responseText);

      handleError(messageObj.error);
    }
  });        
};

const updatePage = () => {
  console.log("updatePage()");
  $.ajax({
    cache: true,
    type: "GET",
    url: '/getWords',
    dataType: "html",
    success: (result, status, xhr) => {
      if(result.redirect) {
        window.location = result.redirect;
      }
    },
  });        
};

// Submits data for the manual form
const manualSubmit = (e) => {
  e.preventDefault();

  let inputValue = $("#inputValue").val();

  // console.log(inputValue);

  const pattern = /(0|1){8}/; // regex pattern

  if(inputValue == '') {
    handleError("Input is required for submission");
    return false;
  }
  else if (inputValue.length != 8){
    handleError("At least 8 binary digits (0 or 1) are required for submission");
    return false;
  }
  else if(pattern.test(inputValue) == false) {
    handleError("Input must consist of 0 or 1 only!");
    return false;
  }

  sendAjax($("#manualForm").attr("action"), $("#manualForm").serialize());

  updatePage();

  return false;
};

// Submits data for the efficient form
// const efficientSubmit = (e) => {
//   e.preventDefault();

//   let inputValue = $("#inputValue").val();

//   if(inputValue == '') {
//     handleError("Input is required for submission");
//     return false;
//   }
//   else if (inputValue.length != 8){
//     handleError("At least 8 binary digits (0 or 1) are required for submission");
//     return false;
//   }
//   else if(pattern.test(inputValue) == false) {
//     handleError("Input must consist of 0 or 1 only!");
//     return false;
//   }
  
//   sendAjax($("#efficientForm").attr("action"), $("#efficientForm").serialize());

//   return false;
// };

const zeroClick = () => {
  console.log("zero clicked");
  const input = $('#inputValue');
  let inputValue = input.val();

  // If length < 8, append
  if(inputValue.length < 8) {
    input.val(inputValue.concat("0"));
  }
  else { 
    // else, reset the value
    input.val("");
  }
};

const oneClick = () => {
  console.log("one clicked");
  const input = $('#inputValue');
  let inputValue = $('#inputValue').val();

  // If length < 8, append
  if(inputValue.length < 8) {
    input.val(inputValue.concat("1"));
  }
  else { 
    // else, reset the value
    input.val("");
  }
};
  
$(document).ready(() => {
  // Setup default event handlers
  $("#manualForm").on("submit", manualSubmit);
  $("#zeroButton").click(zeroClick);
  $("#oneButton").click(oneClick);

  // // Changes between displaying the manual and the efficient forms on the page
  // $("#changeFormButton").click(() => {
  //   // console.log("change button clicked");
  //   // console.log(manual);
  //   if(manual) {
  //     $('#changeFormButton').val("Do It the Easy Way");
  //     manual = false;

  //     $('#input').html(`<h1>The Efficient Way:</h1>
  //     <form id="efficientForm" name="efficientForm" action="/appendValue" method="POST">
  //       <label for="inputValue">Enter 8 Binary Digits: </label>
  //       <input id="inputValue" type="number" name="inputValue" value="" size="8">
  //       <input class="formSubmit" type="submit" value="Send Data">
  //     </form>`);

  //     // Attach event handler for the efficient form
  //     $("#efficientForm").on("submit", efficientSubmit);

  //     $("#zeroButton").click(zeroClick);

  //     $("#oneButton").click(oneClick);
  //   }
  //   else {
  //     $('#changeFormButton').val("Do It the Hard Way");
  //     manual = true;

  //     $('#input').html(`<h1>The Intended Way:</h1>
  //     <form id="manualForm" name="manualForm" action="/appendValue" method="POST">
  //       <input id="zeroButton" type="button" value="0">
  //       <input id="oneButton" type="button" value="1">
  //       <label for="inputValue">Enter 8 Binary Digits: </label>
  //       <input id="inputValue" type="number" name="inputValue" value="00000000" size="8" disabled>
  //       <input class="formSubmit" type="submit" value="Send Data">
  //     </form>`);

  //     // Attach event handler for the manual form
  //     $("#manualForm").on("submit", manualSubmit);
      
  //     $("#zeroButton").click(zeroClick);

  //     $("#oneButton").click(oneClick);
  //   }
  // });
});