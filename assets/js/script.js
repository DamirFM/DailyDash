// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.


let saveButton = $('.saveBtn');


$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?

  // Add click event listener for save buttons
  saveButton.on('click', function() {
    // Get the text from the textarea within the same time-block
    let text = $(this).siblings('.description').val();
    console.log(text);
    // Get the ID of the parent time-block element
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
  let currentHour = dayjs().hour();
  $('.time-block').each(function() {
    // Extract the hour number from the div's ID attribute
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






  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?

  // Reads projects from local storage and returns array of project objects.
  // Returns an empty array ([]) if there aren't any projects.




  // TODO: Add code to display the current date in the header of the page.

 
  console.log(currentHour);

  function displayTime() {
    let rightNow = dayjs().format('MMMM DD, YYYY  hh:mm:ss a');
    $('#currentDay').text(rightNow);
  }
  setInterval(displayTime, 1000);


});
