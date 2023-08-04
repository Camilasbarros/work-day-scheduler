      // Wait for the DOM to be ready
      $(document).ready(function () {
        // Display the current day on top of the calendar
        $("#currentDay").text(dayjs().format("dddd, MMMM D"));

        // Function to dynamically create time blocks for standard business hours
        function createCalendar() {
          // Get the current hour in 24-hour format
          var currentHour = dayjs().hour();

          // Clear the container div before creating new time blocks
          $(".container").empty();

          // Loop through each hour from 9 AM to 11 PM
          for (var hour = 9; hour <= 23; hour++) {
            // Create a new row for each hour
            var rowEl = $("<div>").addClass("row time-block");

            // Create a new hour column and set its content
            var hourEl = $("<div>")
              .addClass("col-1 hour")
              .text(dayjs().hour(hour).format("h A"));

            // Create a new textarea for the event description
            var descriptionEl = $("<textarea>").addClass("col-10 description");

            // Set the description El's background color based on the past, present, or future
            if (hour < currentHour) {
              descriptionEl.addClass("past");
            } else if (hour === currentHour) {
              descriptionEl.addClass("present");
            } else {
              descriptionEl.addClass("future");
            }

            // Load saved event from local storage, if any
            var savedEvent = localStorage.getItem("event-" + hour);
            if (savedEvent) {
              descriptionEl.val(savedEvent);
            }

            // Create a new save button
            var saveBtnEl = $("<button>")
              .addClass("col-1 saveBtn")
              .html('<i class="fas fa-save"></i>');

            // Append the elements to the row
            rowEl.append(hourEl, descriptionEl, saveBtnEl);

            // Append the row to the container div
            $(".container").append(rowEl);
          }
        }

        // Call the create Calendar function to initially populate the calendar
        createCalendar();

        // Save the event to local storage when the save button is clicked
        $(".saveBtn").on("click", function () {
          // Get the event description from the textarea
          var eventDescription = $(this).siblings(".description").val();

          // Get the corresponding hour for the event
          var eventHour = $(this).siblings(".hour").text();

          // Save the event to local storage using the hour as the key
          localStorage.setItem(
            "event-" + dayjs(eventHour, "h A").hour(),
            eventDescription
          );
        });

        // Update the calendar every minute to handle the current hour changes
        setInterval(createCalendar, 60000);
      });