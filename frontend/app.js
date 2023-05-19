$(document).ready(function () {
  // Get the goal form element
  const goalForm = document.getElementById("goalForm");

  // Add event listener for form submit
  goalForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission

    // Get the form inputs
    const targetInput = document.getElementById("target");
    const dateInput = document.getElementById("date");
    var user = localStorage.getItem("userID");
    // console.log(user);

    // Create an object with the form data
    const formData = {
      user: user,
      target: targetInput.value,
      date: dateInput.value,
    };

    $.ajax({
      url: "http://localhost:5000/goals",
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify(formData),
      success: function (response) {
        alert("Goal saved successfully");
        fetchGoals();
        $("#goalForm")[0].reset(); // Reset the form
      },
      error: function (xhr, status, error) {
        console.error("Failed to save goal:", error);
        // Handle the error case
      },
    });
  });

  // Function to fetch and display goals
  var user = localStorage.getItem("userID");
  function fetchGoals() {
    $.ajax({
      url: `http://localhost:5000/goals?id=${user}`,
      method: "GET",
      success: function (response) {
        // Clear the exercise list
        // $("#exerciseList").empty();

        // Check if any exercises exist
        if (response.length === 0) {
          $("#goalList").html("<p>No goal recorded</p>");
        } else {
          // Loop through the exercises and display them
          for (let i = 0; i < response.length; i++) {
            const exercise = response[i];
            const exerciseItem = `
              <div class="card mb-2">
                <div class="card-body">
                  <h5 class="card-title">${exercise.target}</h5>
                  <p class="card-text">Duration: ${exercise.date} minutes</p>
                  <p class="card-text">Duration: ${exercise.achieved} minutes</p>
                </div>
              </div>
            `;
            $("#goalList").append(exerciseItem);
          }
        }
      },
      error: function (xhr, status, error) {
        console.error("Failed to fetch exercises:", error);
        // Handle the error case
      },
    });
  }
});
