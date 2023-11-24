// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

let saveButton = $('.saveBtn');
let timeBlock = $('.time-block');

$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  // Add click event listener for save buttons
  saveButton.on('click', function () {
    // selects the textarea element next to the clicked button (this) and retrieves its value.
    let text = $(this).siblings('.description').val();
    console.log(text);
    // gets the ID attribute of the parent element (time-block) containing the clicked button.
    let blockId = $(this).parent().attr('id');
    console.log(blockId);
    // Save the text to local storage using the ID as the key
    localStorage.setItem(blockId, text);

  });

  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  // Loop through each div with the class name 'time-block'

  // Declaring the current time
  let currentHour = dayjs().hour();
  console.log(currentHour)

  timeBlock.each(function () {
    // Extract the hour number from the div's ID attribute
    // $(this) refers to the current element being iterated over in the loop 
    // (each .time-block div in this case).
    // .attr('id') retrieves the value of the id attribute of the current element.
    //  .split('-') splits the ID attribute value into an array using  "-"" as a separator. 
    // If the ID is "hour-9",  it would result in an array ['hour', '9'].
    // [1] is second element of the array  
    // parseInt() converts the string the hour into an integer. 
    // This makes that  hour as a number rather than a string the string '9' to the integer 9.

    let blockHour = parseInt($(this).attr('id').split('-')[1]);

    // Compare blockHour with currentHour to determine past, present, or future
    if (blockHour < currentHour) {
      $(this).removeClass('present future').addClass('past');
    } else if (blockHour === currentHour) {
      $(this).removeClass('past future').addClass('present');
    } else {
      $(this).removeClass('past present').addClass('future');
    }
  });

  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?

  timeBlock.each(function () {
    // .attr('id') is used to retrieve the value of the id attribute of the current element.
    // gets the ID attribute value of the current element in the loop. 
    // if $(this) represents one of the .time-block div elements, 
    // this line retrieves the value of the id attribute associated with that particular div.


    let blockId = $(this).attr('id');
    let savedInput = localStorage.getItem(blockId);

    // Check if there is saved text for this block
    if (savedInput !== null) {
      $(this).find('.description').val(savedInput);
    }
  });

  // TODO: Add code to display the current date in the header of the page.
  // current date in the header of the page.
  function displayTime() {
    let rightNow = dayjs().format('MMMM DD, YYYY  hh:mm:ss a');
    $('#currentDay').text(rightNow);
  }
  setInterval(displayTime, 1000);


});
